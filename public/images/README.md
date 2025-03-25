# Placeholder Images

This directory contains placeholder images for the KeepMe website. These HTML files contain SVG images that can be used for development and testing purposes.

## Directory Structure

- `/backgrounds/` - Background images for hero sections and other full-width elements
- `/icons/` - Icon assets for UI elements
- `/logos/` - Brand logos and related assets
- `/ui/` - UI elements like buttons, cards, and other interface components

## How to Use

### Viewing Placeholder Images

1. Open any HTML file in a web browser to view the SVG placeholder
2. You can take screenshots of these placeholders to use in your development environment
3. For production, replace these placeholders with actual images

### Using with SanityImage Component

For local development without Sanity images, you can use these placeholders with the SanityImage component:

```jsx
import SanityImage from '../components/SanityImage';

// Example usage with a local path
<SanityImage
  src="/images/ui/product-placeholder.html"
  alt="Product"
  width={800}
  height={800}
/>
```

## Image Dimensions

The placeholders follow the recommended dimensions for different image types:

- **Hero backgrounds**: 1920×1080px (16:9 aspect ratio)
- **Product images**: 800×800px (1:1 aspect ratio)
- **Blog featured images**: 1200×675px (16:9 aspect ratio)
- **Logo**: 200×80px
- **Icons**: 64×64px

## Converting to Production Images

When ready for production:

1. Replace these HTML placeholders with actual image files (PNG, JPG, WebP)
2. Ensure the actual images match the recommended dimensions
3. Optimize images for web using tools like ImageOptim, TinyPNG, or Squoosh
4. Update image paths in components to point to the actual image files

## Notes

- These placeholders are for development purposes only and should not be used in production
- The SVG-based placeholders are lightweight and don't require external dependencies
- For Sanity-hosted images, upload properly sized and optimized images to your Sanity studio
