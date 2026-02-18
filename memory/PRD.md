# Urban Gold India - Product Requirements Document (PRD)

## Original Problem Statement
Build a dark + light themed, bold-typography, grid-structured website for Urban Gold India - a pre-industrial urban mining company in India. The website should feel industrial, structured, disciplined, modern, architecturally clean, and investor-ready.

## User Personas
1. **Institutional Investors**: Seeking long-term infrastructure investment opportunities
2. **Strategic Partners**: Metal refiners, technology providers, circular economy enterprises
3. **E-Waste Aggregators**: Authorized collectors looking for formal partnerships
4. **Technical Experts**: Engineers and consultants interested in collaboration
5. **General Public**: Individuals researching urban mining and circular economy

## Core Requirements (Static)
### Design System
- Typography: Hero headlines (80-96px), Section headlines (48-56px), Subheadings (24-28px), Body (16-18px)
- Font: Inter (modern grotesk)
- Layout: 12-column grid with strong margins
- Theme: Dark + Light mode toggle (default: Light mode)
- Color Palette: Warm whites, charcoal, muted metallic gold (light) / Deep graphite, brushed gold (dark)
- Responsive: Fully responsive for mobile, tablet, desktop

### Pages Structure
1. **Home**: Hero, Opportunity Bento Grid, Process Stages, Timeline, Business Model, Regional Advantages, Long-term Vision, CTA
2. **About**: Vision, Development Philosophy, Core Values, Founder Perspective, Long-term Ambition
3. **Opportunity**: Market Context, E-Waste Generation, PCB Metal Concentration, Informal Processing Gap, Infrastructure Deficit
4. **Technology**: Process Architecture, Technical Deep Dive (Accordion), Industrial Systems
5. **Roadmap**: Phased Timeline (4 years), Milestone Checklist, Risk Mitigation
6. **Governance**: Compliance Frameworks, Regulatory Authorizations, Informal Sector Integration
7. **Investors**: Investment Highlights, Revenue Model, Risk Framework, Capital Requirements, Engagement Opportunities
8. **Contact**: Contact Form (frontend mock), Contact Information, Inquiry Types

### Design Principles
- Industrial elegance with no startup hype
- Large typography and structured grids
- Bento modular sections
- No environmental cliché visuals
- Honest about development stage
- No overclaiming operational status

## What's Been Implemented (Phase 1 - February 18, 2026)

### Frontend (Completed ✓)
- ✅ Theme Context with Light/Dark mode toggle
- ✅ Responsive Navbar with mobile menu
- ✅ Footer with company info and links
- ✅ All 8 pages fully designed and responsive:
  - Home page with hero, bento grid, process stages, timeline
  - About page with vision, philosophy, values
  - Opportunity page with market analysis
  - Technology page with accordion sections
  - Roadmap page with phased timeline
  - Governance page with compliance frameworks
  - Investors page with investment details
  - Contact page with form (mock submission)
- ✅ Shadcn UI components integration (Button, Card, Input, Textarea, Label, Accordion, Toaster)
- ✅ Images curated via Vision Expert Agent (15 industrial/PCB images)
- ✅ Smooth transitions and animations
- ✅ Inter font integration
- ✅ Amber/Orange color scheme matching brand identity
- ✅ Mobile-responsive design for all screen sizes

### Mock Data
- Contact form submission (shows toast notification, no backend)

## Tech Stack
- **Frontend**: React 19, React Router, TailwindCSS, Shadcn UI
- **Backend**: FastAPI (not yet integrated with frontend)
- **Database**: MongoDB (not yet needed for frontend-only)
- **Styling**: TailwindCSS with custom design system
- **Icons**: Lucide React

## Prioritized Backlog

### P0 - Critical (Next Phase)
1. Fix preview deployment issue (appears to be Emergent platform issue, not app issue)
2. Backend API integration:
   - Contact form submission endpoint
   - Email notification system
3. Testing all pages and interactions

### P1 - Important
1. Add smooth scroll behavior for anchor links
2. Implement form validation with error messages
3. Add loading states for form submission
4. SEO optimization (meta tags, OpenGraph)
5. Performance optimization (image lazy loading)
6. Accessibility audit (ARIA labels, keyboard navigation)

### P2 - Nice to Have
1. Add animations on scroll (AOS/Framer Motion)
2. Newsletter subscription integration
3. Blog section for updates
4. Investor document download functionality
5. Multi-language support
6. Analytics integration (Google Analytics, Mixpanel)

## Next Tasks
1. Resolve preview deployment issue
2. Test all pages thoroughly (navigation, responsiveness, theme toggle)
3. Backend integration planning for contact form
4. SEO and meta tags implementation
5. Performance optimization pass

## Notes
- All pages are frontend-only with mock interactions
- Contact form does not send actual emails yet
- Images sourced from Unsplash via Vision Expert Agent
- Theme persists via localStorage
- No backend API calls implemented yet (Hello World endpoint exists but not used in pages)
