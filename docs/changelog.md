# KeepMe Website Changelog

## 23 March 2025

### Fixed
- Resolved dependency conflict between Next.js v15.2.3 and next-sanity by using `--legacy-peer-deps` flag
- Successfully installed next-sanity v8.0.0 alongside Next.js v15.2.3 despite peer dependency requirements

## 22 March 2025

### Added
- **SEO Enhancements**
  - Created structured data utility (`structuredData.js`) implementing JSON-LD for organisation, products, articles, FAQs, and breadcrumbs
  - Implemented SEO component with proper meta tags and structured data injection
  - Added support for canonical URLs and Open Graph data

- **Interactive Components**
  - Implemented Fragrance Calculator tool with real-time cost estimation
  - Created Quote Sheet tool with comprehensive form validation
  - Added interactive Process Timeline component for the How We Work page

- **New Pages**
  - Created Tools page featuring tabbed interface for interactive tools
  - Implemented How We Work page with animated timeline
  - Enhanced blog page with improved category filtering and pagination

### Fixed
- Fixed dropdown menu in Header component to remain open when hovering and clicking
- Increased size of menu items for better accessibility
- Implemented functionality to close dropdown when clicking outside of it
- Fixed blog post URL structure to ensure correct navigation
- Made blog titles clickable for improved user experience

### Technical Improvements
- Implemented Next.js App Router structure according to technical documentation
- Added Framer Motion animations for interactive elements
- Used Tailwind CSS for responsive styling
- Ensured all content follows UK English standards

## Next Steps
- Set up Sanity CMS integration
- Complete remaining pages (About, Services, Products)
- Implement Glass section pages
- Configure deployment with Vercel
- Set up analytics tracking
