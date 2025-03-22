# KeepMe Website Architecture

## Overview
This document outlines the architecture for the new KeepMe website, which combines the current KeepMe Lifestyle website (keepme.co.uk) with the KeepMe Glass website (keepmeglass.co.uk). The new website will be built using Next.js and Sanity CMS, providing a modern, SEO-optimized platform with interactive tools for quote requests and fragrance calculations.

## Site Structure

### Main Navigation
- **Home** - Main landing page showcasing KeepMe's combined services
- **About Us** - Company information, team, and values
- **Services**
  - Fragrance Manufacturing
  - Glass & Packaging
  - Full-Service Solutions
- **Products**
  - Fragrance Components
  - Glass Collection (redirects to /glass)
  - Packaging Solutions
- **Tools**
  - Quote Sheet
  - Fragrance Calculator
- **Blog** - Industry insights and company news
- **Contact** - Contact information and form

### URL Structure
- **Home**: keepme.co.uk/
- **About Us**: keepme.co.uk/about
- **Services**: 
  - keepme.co.uk/services
  - keepme.co.uk/services/fragrance-manufacturing
  - keepme.co.uk/services/glass-packaging
  - keepme.co.uk/services/full-service-solutions
- **Glass Section**: 
  - keepme.co.uk/glass (main glass landing page)
  - keepme.co.uk/glass/product-range
  - keepme.co.uk/glass/decoration
  - keepme.co.uk/glass/gallery
- **Tools**:
  - keepme.co.uk/tools/quote-sheet
  - keepme.co.uk/tools/fragrance-calculator
- **Blog**: 
  - keepme.co.uk/blog
  - keepme.co.uk/blog/[category]/[post-slug]
- **Contact**: keepme.co.uk/contact

## Technical Architecture

### Frontend (Next.js)
- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS for responsive design
- **Components**: 
  - Reusable UI components (buttons, forms, cards)
  - Layout components (header, footer, navigation)
  - Page-specific components
  - Interactive tool components (quote sheet, calculator)

### Backend (Sanity CMS)
- **Content Types**:
  - Pages (Home, About, Services, etc.)
  - Blog Posts
  - Products
  - Services
  - Team Members
  - Testimonials
  - Case Studies
  - SEO Metadata

### Database
- **Sanity Studio**: For content management
- **Serverless Database**: For storing form submissions (quote requests, calculator results)

### APIs and Integrations
- **Form Handling**: API routes for processing form submissions
- **Email Integration**: For sending notifications on form submissions
- **Analytics**: Google Analytics for tracking user behavior

## Interactive Tools

### Quote Sheet
The quote sheet will be an interactive form that allows users to:
1. Input product specifications (quantity, dimensions, materials)
2. Select packaging options
3. Add custom requirements
4. Submit for a personalized quote

**Technical Implementation**:
- React form with validation
- API route to process submissions
- Email notifications to KeepMe team
- Secure storage of submissions in database
- Admin interface to view and respond to quote requests

### Fragrance Calculator
The fragrance calculator will allow users to:
1. Input product type (diffuser, candle, perfume)
2. Specify volume/weight
3. Select fragrance concentration
4. Calculate required fragrance amounts and estimated costs
5. Submit results for consultation

**Technical Implementation**:
- Interactive React component with real-time calculations
- Preset formulas based on product types
- Option to save/share results
- Integration with quote request system

## SEO Strategy

### On-Page SEO
- Optimized metadata for all pages
- Structured data markup
- Keyword-focused content
- Internal linking strategy

### Technical SEO
- Fast loading times
- Mobile responsiveness
- Secure HTTPS
- XML sitemap
- Robots.txt configuration

### Target Keywords
Focus on high-value keywords identified in the keyword analysis:
- Fragrance manufacturer
- Glass packaging for fragrances
- Perfume production
- Fragrance components
- Candle glass
- Luxury cosmetic packaging

## Blog Structure
The blog will be organized into categories:
- Industry Insights
- Product Innovations
- Behind the Scenes
- Case Studies
- How-To Guides

## Responsive Design
The website will be fully responsive with breakpoints for:
- Mobile devices (< 640px)
- Tablets (640px - 1024px)
- Desktops (> 1024px)
- Large screens (> 1440px)

## Migration Strategy
1. Develop the new website while keeping both existing sites live
2. Implement 301 redirects from KeepMe Glass URLs to new corresponding pages
3. Launch the new site with comprehensive testing
4. Monitor traffic and SEO performance post-launch

## Performance Optimization
- Image optimization
- Code splitting
- Server-side rendering for critical pages
- Static generation for blog and product pages
- CDN for asset delivery

## Security Measures
- HTTPS encryption
- Form validation and sanitization
- Rate limiting for form submissions
- Regular security audits

## Analytics and Tracking
- Page views and user behavior
- Form submission tracking
- Conversion rate optimization
- Heat mapping for user interaction analysis
