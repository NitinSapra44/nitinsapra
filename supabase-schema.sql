-- =====================================================
-- PORTFOLIO CMS DATABASE SCHEMA
-- =====================================================

-- Create tables for the portfolio CMS

-- About/Profile Information
CREATE TABLE about (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL, -- Will store HTML from WYSIWYG editor
  profile_image_url TEXT,
  location VARCHAR(255),
  email VARCHAR(255),
  linkedin_url TEXT,
  github_url TEXT,
  resume_url TEXT,
  years_experience INTEGER DEFAULT 0,
  total_projects INTEGER DEFAULT 0,
  total_clients INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Skills
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon TEXT, -- Emoji or icon identifier
  icon_url TEXT, -- Optional image URL for skill icon
  category VARCHAR(100), -- e.g., 'frontend', 'backend', 'database', 'tools'
  proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 5), -- 1-5 rating
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Projects
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255), -- e.g., company/project name
  description TEXT NOT NULL, -- HTML from WYSIWYG
  project_type VARCHAR(50) NOT NULL CHECK (project_type IN ('web', 'mobile')),
  tech_stack JSONB DEFAULT '[]'::jsonb, -- Array of tech tags
  live_demo_url TEXT,
  code_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false, -- Show on homepage
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  role VARCHAR(255),
  testimonial_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  display_order INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false, -- Show on homepage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Contact Form Submissions (Optional - for storing contact form data)
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_skills_order ON skills(display_order);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_projects_order ON projects(display_order);
CREATE INDEX idx_projects_type ON projects(project_type);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_testimonials_order ON testimonials(display_order);
CREATE INDEX idx_testimonials_featured ON testimonials(featured);
CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PUBLIC READ POLICIES (for portfolio visitors)
-- =====================================================

CREATE POLICY "Allow public read access to about" 
  ON about FOR SELECT USING (true);

CREATE POLICY "Allow public read access to skills" 
  ON skills FOR SELECT USING (true);

CREATE POLICY "Allow public read access to projects" 
  ON projects FOR SELECT USING (true);

CREATE POLICY "Allow public read access to testimonials" 
  ON testimonials FOR SELECT USING (true);

-- =====================================================
-- AUTHENTICATED USER POLICIES (for admin/CMS)
-- =====================================================

-- About policies
CREATE POLICY "Allow authenticated users to insert about" 
  ON about FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  
CREATE POLICY "Allow authenticated users to update about" 
  ON about FOR UPDATE USING (auth.role() = 'authenticated');
  
CREATE POLICY "Allow authenticated users to delete about" 
  ON about FOR DELETE USING (auth.role() = 'authenticated');

-- Skills policies
CREATE POLICY "Allow authenticated users to insert skills" 
  ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  
CREATE POLICY "Allow authenticated users to update skills" 
  ON skills FOR UPDATE USING (auth.role() = 'authenticated');
  
CREATE POLICY "Allow authenticated users to delete skills" 
  ON skills FOR DELETE USING (auth.role() = 'authenticated');

-- Projects policies
CREATE POLICY "Allow authenticated users to insert projects" 
  ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  
CREATE POLICY "Allow authenticated users to update projects" 
  ON projects FOR UPDATE USING (auth.role() = 'authenticated');
  
CREATE POLICY "Allow authenticated users to delete projects" 
  ON projects FOR DELETE USING (auth.role() = 'authenticated');

-- Testimonials policies
CREATE POLICY "Allow authenticated users to insert testimonials" 
  ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  
CREATE POLICY "Allow authenticated users to update testimonials" 
  ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');
  
CREATE POLICY "Allow authenticated users to delete testimonials" 
  ON testimonials FOR DELETE USING (auth.role() = 'authenticated');

-- Contact submissions policies
CREATE POLICY "Allow anyone to insert contact submissions" 
  ON contact_submissions FOR INSERT WITH CHECK (true);
  
CREATE POLICY "Allow authenticated users to read contact submissions" 
  ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
  
CREATE POLICY "Allow authenticated users to update contact submissions" 
  ON contact_submissions FOR UPDATE USING (auth.role() = 'authenticated');

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to update updated_at
CREATE TRIGGER update_about_updated_at BEFORE UPDATE ON about
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SEED DATA
-- =====================================================

-- Insert default about data
INSERT INTO about (
  name, 
  title, 
  bio, 
  location, 
  years_experience,
  total_projects,
  total_clients
) VALUES (
  'Nitin Sapra',
  'Full-Stack Web Developer',
  '<p>Hi, I''m Nitin Sapra — a passionate Full-Stack Web Developer with a strong focus on building scalable, user-centric digital experiences.</p><p>With hands-on expertise in the MERN stack (MongoDB, Express.js, React, Node.js), I specialize in turning ideas into fully functional web applications.</p><p>From crafting responsive user interfaces to architecting robust backend systems, I aim to deliver solutions that are not just efficient but also impactful. I thrive in dynamic environments, constantly learning and evolving with the latest technologies to provide clean, maintainable code and smooth user experiences.</p>',
  'Ludhiana, Punjab, India',
  5,
  50,
  30
);

-- Insert sample skills
INSERT INTO skills (name, icon, category, proficiency, display_order) VALUES
  ('React', '⚛️', 'frontend', 5, 1),
  ('Node.js', '📗', 'backend', 5, 2),
  ('MongoDB', '🍃', 'database', 5, 3),
  ('Express', '⚡', 'backend', 5, 4),
  ('React Native', '📱', 'mobile', 4, 5),
  ('Tailwind CSS', '🎨', 'frontend', 5, 6),
  ('TypeScript', '🔷', 'frontend', 4, 7),
  ('Next.js', '🔥', 'frontend', 4, 8),
  ('JavaScript', '💛', 'frontend', 5, 9),
  ('HTML5', '🟧', 'frontend', 5, 10),
  ('CSS3', '🔵', 'frontend', 5, 11),
  ('GitHub', '🐙', 'tools', 5, 12);

-- Insert sample projects
INSERT INTO projects (
  title, 
  subtitle, 
  description, 
  project_type, 
  tech_stack, 
  featured, 
  display_order
) VALUES
  (
    'E-commerce Store',
    'Against The Tribe',
    '<p>A fully functional e-commerce web application built using the <strong>MERN stack</strong> (MongoDB, Express.js, React.js, Node.js). This store allows users to browse products, add items to a shopping cart, and securely complete purchases with <strong>Razorpay</strong> payment integration.</p>',
    'web',
    '["React", "Node.js", "MongoDB", "Express.js", "Razorpay"]',
    true,
    1
  ),
  (
    'Inventory Manager',
    'Sapra Packers',
    '<p>A web application designed to streamline the management of stock, orders, and suppliers for a printing business. Features include real-time inventory tracking, order management, and supplier database.</p>',
    'web',
    '["React", "Node.js", "MongoDB"]',
    true,
    2
  ),
  (
    'Fitness Tracker App',
    'HealthHub',
    '<p>Cross-platform mobile app for tracking workouts, nutrition, and health metrics with social features. Users can log exercises, track calories, and connect with friends.</p>',
    'mobile',
    '["React Native", "Firebase", "Redux"]',
    true,
    3
  );

-- Insert sample testimonials
INSERT INTO testimonials (
  client_name, 
  company, 
  role, 
  testimonial_text, 
  rating, 
  featured, 
  display_order
) VALUES
  (
    'Amit Kumar',
    'Against The Tribe',
    'CEO',
    'Nitin delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made the entire process smooth.',
    5,
    true,
    1
  ),
  (
    'Rajesh Sapra',
    'Sapra Packers',
    'Owner',
    'Working with Nitin was a pleasure. He transformed our business requirements into a robust system that has improved our efficiency dramatically.',
    5,
    true,
    2
  ),
  (
    'Sarah Patel',
    'HealthHub',
    'Product Manager',
    'Excellent developer with strong problem-solving skills. The mobile app he built is intuitive, fast, and our users love it!',
    5,
    true,
    3
  );

-- =====================================================
-- STORAGE BUCKET SETUP (Run this in Supabase Dashboard)
-- =====================================================
-- Create storage buckets for images:
-- 1. profile-images (for profile photos)
-- 2. project-images (for project screenshots)
-- 3. skill-icons (for skill icons if not using emojis)
-- 4. testimonial-avatars (for client avatars)
-- 
-- Make sure to set public access for these buckets!
