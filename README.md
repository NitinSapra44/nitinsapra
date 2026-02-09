# Portfolio CMS with Next.js & Supabase

A modern, CMS-based portfolio website built with Next.js 14, Supabase, and Tailwind CSS. Features a beautiful dark theme, WYSIWYG editor, and full content management capabilities.

## 🚀 Features

- ✅ **Modern Design**: Dark theme with gradient accents and smooth animations
- ✅ **Full CMS**: Manage all content through an admin dashboard
- ✅ **WYSIWYG Editor**: Rich text editor powered by Tiptap
- ✅ **Project Types**: Separate web and mobile project categories
- ✅ **Testimonials**: Client feedback management with ratings
- ✅ **Skills Management**: Organize skills by category with proficiency levels
- ✅ **Contact Forms**: Collect and manage contact submissions
- ✅ **Responsive**: Fully responsive design for all devices
- ✅ **TypeScript**: Full type safety throughout the application
- ✅ **Real-time**: Powered by Supabase for real-time data

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works great!)
- Basic knowledge of Next.js and React

## 🛠️ Setup Instructions

### 1. Clone & Install Dependencies

```bash
cd portfolio-cms
npm install
```

### 2. Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned (takes ~2 minutes)
3. Go to **SQL Editor** in your Supabase dashboard
4. Copy the contents of `supabase-schema.sql`
5. Paste and run the SQL to create all tables, policies, and seed data

### 3. Create Storage Buckets (Optional but Recommended)

In your Supabase dashboard:

1. Go to **Storage**
2. Create the following public buckets:
   - `profile-images`
   - `project-images`
   - `skill-icons`
   - `testimonial-avatars`
3. Make sure to set them as **Public** buckets

### 4. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Get your Supabase credentials from **Project Settings** > **API**:
   - Copy the **Project URL**
   - Copy the **anon/public key**

3. Update `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ADMIN_EMAIL=your-email@example.com
   ```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 📱 Admin Dashboard

Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin)

### Admin Features:

- **Dashboard**: Overview statistics and quick actions
- **About**: Edit profile, bio (WYSIWYG), stats, and social links
- **Skills**: Add/edit/delete skills with icons and categories
- **Projects**: Manage web and mobile projects with rich descriptions
- **Testimonials**: Add client feedback with ratings
- **Contact**: View and manage contact form submissions

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```js
colors: {
  primary: '#FF1744',    // Main accent color
  secondary: '#00E5FF',  // Secondary accent
  dark: '#0a0a0a',       // Background
  light: '#fafafa',      // Text color
}
```

### Fonts

The project uses:
- **Outfit** for body text
- **JetBrains Mono** for code/accent text

To change fonts, update in `tailwind.config.js` and `src/app/globals.css`

### Homepage Sections

Edit `src/app/page.tsx` to customize:
- Hero section layout
- Skills grid columns
- Project card design
- Testimonial display
- Footer content

## 📂 Project Structure

```
portfolio-cms/
├── src/
│   ├── app/
│   │   ├── admin/           # Admin dashboard pages
│   │   │   ├── about/       # About management
│   │   │   ├── skills/      # Skills management
│   │   │   ├── projects/    # Projects management
│   │   │   ├── testimonials/# Testimonials management
│   │   │   └── layout.tsx   # Admin layout with sidebar
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/
│   │   └── RichTextEditor.tsx # WYSIWYG editor component
│   └── lib/
│       ├── supabase/        # Supabase client setup
│       └── types.ts         # TypeScript types
├── supabase-schema.sql      # Database schema
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🔒 Authentication (Optional)

For production, you should add authentication to protect the admin dashboard:

1. Enable Email Auth in Supabase: **Authentication** > **Providers** > **Email**
2. Add auth middleware to `/admin` routes
3. Create login page at `/admin/login`

Example auth check:
```tsx
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  redirect('/admin/login');
}
```

## 📝 Adding Content

### Adding a New Project

1. Go to `/admin/projects`
2. Click "Add Project"
3. Fill in details:
   - Title & subtitle
   - Description (use WYSIWYG editor)
   - Select type (Web or Mobile)
   - Add tech stack tags
   - Add demo/code URLs
   - Upload project image
   - Toggle "Featured" to show on homepage

### Adding a Skill

1. Go to `/admin/skills`
2. Click "Add Skill"
3. Enter skill name
4. Add emoji icon (e.g., ⚛️ for React)
5. Set category and proficiency
6. Set display order

### Adding a Testimonial

1. Go to `/admin/testimonials`
2. Click "Add Testimonial"
3. Fill in client details
4. Enter testimonial text
5. Set rating (1-5 stars)
6. Toggle "Featured" for homepage display

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Update Supabase URLs

After deployment, update:
1. Add your production URL to Supabase **Authentication** > **URL Configuration**
2. Update `NEXT_PUBLIC_SITE_URL` in environment variables

## 🐛 Troubleshooting

### "Failed to load data" error
- Check your Supabase credentials in `.env.local`
- Verify the schema was run successfully
- Check browser console for specific errors

### Images not loading
- Ensure storage buckets are created and public
- Check image URLs are correctly formatted
- Verify CORS settings in Supabase Storage

### RLS Policies blocking requests
- Verify RLS policies are set up correctly
- Check that you've run the complete schema file
- For testing, you can temporarily disable RLS (not recommended for production)

## 📚 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Editor**: Tiptap
- **Icons**: React Icons
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Toasts**: React Hot Toast
- **Language**: TypeScript

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🎯 Next Steps

After setup, consider:
- [ ] Add image upload functionality
- [ ] Implement authentication for admin
- [ ] Add blog section
- [ ] Create project detail pages
- [ ] Add dark/light mode toggle
- [ ] Implement search functionality
- [ ] Add analytics
- [ ] Set up email notifications for contact forms
- [ ] Add resume generation feature
- [ ] Implement multi-language support

## 📧 Support

For questions or issues, please open an issue on GitHub or contact the maintainer.

---

Built with ❤️ using Next.js and Supabase
