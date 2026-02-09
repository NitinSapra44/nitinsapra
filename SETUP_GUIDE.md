# Portfolio CMS - Complete Setup Guide

This guide will walk you through setting up your complete portfolio CMS from scratch.

## 📦 What You're Getting

A fully functional portfolio website with:
- ✅ Beautiful dark-themed homepage
- ✅ Admin dashboard for content management
- ✅ WYSIWYG editor for rich text content
- ✅ Support for web & mobile projects
- ✅ Client testimonials with ratings
- ✅ Skills management with categories
- ✅ Contact form submissions tracking

## 🎯 Step-by-Step Setup

### Step 1: Set Up Supabase (5 minutes)

1. **Create Account**
   - Go to https://supabase.com
   - Sign up for a free account
   - Click "New Project"
   - Choose an organization name

2. **Create Project**
   - Enter project name (e.g., "portfolio-cms")
   - Create a strong database password (save this!)
   - Select closest region to you
   - Click "Create new project"
   - Wait ~2 minutes for provisioning

3. **Run Database Schema**
   - In Supabase dashboard, go to "SQL Editor" (left sidebar)
   - Click "New query"
   - Open `supabase-schema.sql` from your project files
   - Copy ALL the contents
   - Paste into Supabase SQL editor
   - Click "Run" button
   - You should see "Success. No rows returned"

4. **Create Storage Buckets** (Optional but recommended)
   - Go to "Storage" in left sidebar
   - Click "New bucket"
   - Create these buckets (make them PUBLIC):
     * `profile-images`
     * `project-images`
     * `skill-icons`
     * `testimonial-avatars`
   - For each bucket, click the three dots → "Make public"

5. **Get Your Credentials**
   - Go to "Project Settings" (gear icon in left sidebar)
   - Click "API" in the settings menu
   - You'll see:
     * **Project URL** (e.g., `https://xxxxx.supabase.co`)
     * **anon/public** key (long string starting with `eyJ...`)
   - Keep this tab open!

### Step 2: Install Node.js (If Not Installed)

1. Check if you have Node.js:
   ```bash
   node --version
   ```
   
2. If not installed, download from: https://nodejs.org
   - Get the LTS version (v18 or higher)
   - Run the installer
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

### Step 3: Set Up Project (5 minutes)

1. **Extract Project Files**
   - Extract all files from `portfolio-cms.zip`
   - Open terminal/command prompt
   - Navigate to the project folder:
     ```bash
     cd portfolio-cms
     ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This will take 2-3 minutes to install all packages.

3. **Configure Environment**
   - Copy `.env.local.example` to `.env.local`:
     ```bash
     cp .env.local.example .env.local
     ```
   - Open `.env.local` in a text editor
   - Replace with your Supabase credentials:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
     NEXT_PUBLIC_SITE_URL=http://localhost:3000
     ADMIN_EMAIL=your-email@example.com
     ```

### Step 4: Launch the Application

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Open Your Portfolio**
   - Go to: http://localhost:3000
   - You should see your homepage with default data!

3. **Access Admin Dashboard**
   - Go to: http://localhost:3000/admin
   - You should see the admin dashboard

## 🎨 Customizing Your Portfolio

### Update Your Profile (Start Here!)

1. Go to http://localhost:3000/admin/about
2. Update:
   - Your name and title
   - Bio (use the rich text editor!)
   - Profile image URL (upload to Supabase Storage or use external URL)
   - Location, email, social links
   - Years of experience, total projects, clients
3. Click "Save Changes"

### Add Your Skills

1. Go to http://localhost:3000/admin/skills
2. Click "Add Skill"
3. Enter skill name
4. Add an emoji icon (e.g., ⚛️ for React)
5. Select category (frontend, backend, etc.)
6. Set proficiency level (1-5)
7. Set display order
8. Click "Add Skill"

**Example Skills:**
- Name: React, Icon: ⚛️, Category: Frontend, Proficiency: 5
- Name: Node.js, Icon: 💚, Category: Backend, Proficiency: 5
- Name: MongoDB, Icon: 🍃, Category: Database, Proficiency: 4

### Add Your Projects

1. Go to http://localhost:3000/admin/projects
2. Click "Add Project"
3. Fill in:
   - Title (e.g., "E-commerce Platform")
   - Subtitle (e.g., "Company Name")
   - Description (use rich text editor for formatting)
   - Project Type: Web or Mobile
   - Tech Stack: Add tags like "React", "Node.js", "MongoDB"
   - Live Demo URL (if available)
   - Code URL (GitHub link)
   - Project Image URL
   - Toggle "Featured" to show on homepage
4. Click "Add Project"

### Add Testimonials

1. Go to http://localhost:3000/admin/testimonials
2. Click "Add Testimonial"
3. Fill in:
   - Client name
   - Company
   - Role (e.g., "CEO", "Product Manager")
   - Testimonial text
   - Rating (1-5 stars)
   - Avatar URL (optional)
   - Toggle "Featured" for homepage
4. Click "Add Testimonial"

## 📸 Adding Images

### Option 1: Supabase Storage (Recommended)

1. Go to Supabase dashboard → Storage
2. Select appropriate bucket (e.g., `profile-images`)
3. Click "Upload File"
4. Select your image
5. After upload, click the image
6. Click "Get URL"
7. Copy the URL and paste in your admin form

### Option 2: External URLs

Use any image hosting service:
- Imgur
- Cloudinary
- Your own server
- Just paste the direct image URL

## 🚀 Deployment to Production

### Deploy to Vercel (Easiest)

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     * `NEXT_PUBLIC_SUPABASE_URL`
     * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     * `NEXT_PUBLIC_SITE_URL` (your vercel URL)
   - Click "Deploy"

3. **Update Supabase Settings**
   - In Supabase dashboard → Authentication → URL Configuration
   - Add your Vercel URL to "Site URL" and "Redirect URLs"

### Custom Domain (Optional)

1. In Vercel:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. Update `NEXT_PUBLIC_SITE_URL` in Vercel environment variables

## 🔒 Securing Your Admin Panel (Production)

The admin panel is currently open. For production, add authentication:

1. **Enable Email Auth in Supabase**
   - Go to Authentication → Providers
   - Enable Email provider
   - Save

2. **Add Auth to Admin Routes**
   Create middleware to protect `/admin` routes:
   ```typescript
   // middleware.ts
   import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
   import { NextResponse } from 'next/server'
   import type { NextRequest } from 'next/server'

   export async function middleware(req: NextRequest) {
     const res = NextResponse.next()
     const supabase = createMiddlewareClient({ req, res })
     const { data: { session } } = await supabase.auth.getSession()

     if (!session && req.nextUrl.pathname.startsWith('/admin')) {
       return NextResponse.redirect(new URL('/login', req.url))
     }

     return res
   }
   ```

3. **Create Login Page**
   - Create `/app/login/page.tsx`
   - Add email/password form
   - Use Supabase auth methods

## 🐛 Troubleshooting

### "Failed to load data"
**Solution:**
- Check `.env.local` has correct Supabase credentials
- Verify you ran the schema SQL in Supabase
- Check browser console for specific errors

### Images not loading
**Solution:**
- Ensure storage buckets are PUBLIC
- Verify image URLs are complete (start with https://)
- Check image file extensions are supported

### Changes not appearing
**Solution:**
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Restart development server

### npm install fails
**Solution:**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again
- Make sure Node.js v18+ is installed

## 📱 Testing Responsiveness

Test your site on different screen sizes:
1. Open browser DevTools (F12)
2. Click device toolbar icon (phone/tablet icon)
3. Test different devices:
   - Mobile: iPhone SE, iPhone 12 Pro
   - Tablet: iPad, iPad Pro
   - Desktop: Various widths

## ✅ Launch Checklist

Before going live, ensure:

- [ ] All sample/default data is removed
- [ ] Your actual projects are added
- [ ] Skills list is complete
- [ ] About section has your real bio
- [ ] Profile image is uploaded
- [ ] Social links are correct
- [ ] Contact email is your real email
- [ ] All featured flags are set correctly
- [ ] Site has been tested on mobile
- [ ] All images load correctly
- [ ] Admin panel is secured with auth (if in production)
- [ ] Custom domain is configured (if applicable)

## 🎓 Next Steps

After basic setup, consider adding:
- Email notifications for contact forms
- Blog section with CMS
- Project detail pages with more images
- Analytics (Google Analytics, Plausible)
- SEO optimization (meta tags, sitemap)
- Image optimization (next/image)
- Multi-language support
- Dark/light mode toggle

## 📞 Need Help?

If you encounter issues:
1. Check this guide again
2. Review the README.md
3. Check browser console for errors
4. Review Supabase logs
5. Search GitHub issues for similar problems

## 🎉 You're Done!

Congratulations! Your portfolio CMS is now set up and running. Start customizing it with your own content!

---

**Quick Reference:**
- Homepage: http://localhost:3000
- Admin: http://localhost:3000/admin
- Supabase Dashboard: https://supabase.com/dashboard
- Documentation: See README.md

Happy building! 🚀
