# Image Handling Strategy

This document outlines the image handling strategy for the KeepMe website, providing guidelines for developers and content editors.

## Overview

The website uses a hybrid approach for image management:

1. **Sanity CMS** for content-related images
2. **Static files** for UI/design elements

## Directory Structure

```
/public/images/
  /ui/         - UI elements (buttons, icons, etc.)
  /backgrounds/ - Background patterns and textures
  /icons/       - Icon sets
  /logos/       - Brand assets and logos
```

## Image Component

We've created a reusable `SanityImage` component that handles all image rendering consistently across the site. This component:

- Provides fallback UI for missing images
- Automatically adds Sanity image transformation parameters
- Ensures consistent responsive image handling
- Maintains proper image optimization

### Usage

```jsx
import SanityImage from '../components/SanityImage';

// Basic usage
<SanityImage 
  src={imageUrl} 
  alt="Image description" 
  width={800} 
  height={600} 
/>

// With fill property (for container-based sizing)
<div className="relative h-64 w-full">
  <SanityImage
    src={imageUrl}
    alt="Image description"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>

// With priority (for above-the-fold images)
<SanityImage
  src={imageUrl}
  alt="Image description"
  width={1200}
  height={600}
  priority
/>
```

## Image Guidelines

### For Developers

1. **Always use the SanityImage component** for rendering images, whether they come from Sanity or static files.

2. **Set appropriate sizes attribute** for responsive images:
   ```jsx
   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
   ```

3. **Use the priority attribute** only for above-the-fold images that are critical for LCP (Largest Contentful Paint).

4. **Provide meaningful alt text** for all images for accessibility.

5. **Use appropriate dimensions** based on the image's purpose:
   - Hero images: 1920×1080 (16:9 aspect ratio)
   - Product thumbnails: 800×800 (1:1 aspect ratio)
   - Blog featured images: 1200×675 (16:9 aspect ratio)
   - Team member photos: 400×400 (1:1 aspect ratio)

### For Content Editors (Sanity Studio)

1. **Upload optimized images** to reduce load times:
   - Use modern formats like WebP when possible
   - Compress images before uploading
   - Follow the recommended dimensions for each image type

2. **Provide descriptive alt text** for all images

3. **Use consistent aspect ratios** for similar content types

## Sanity Image URL Parameters

The SanityImage component automatically adds transformation parameters to Sanity image URLs:

- `?w=800&h=600` - Sets width and height
- `&fit=crop` - Crops the image to fit the specified dimensions
- `&auto=format` - Automatically serves the best format based on browser support

For custom transformations, you can add parameters manually:

```jsx
// Custom focal point
const imageUrl = `${sanityImageUrl}?w=800&h=600&fit=crop&crop=focalpoint&fp-x=0.3&fp-y=0.8`;

// Custom format
const imageUrl = `${sanityImageUrl}?w=800&h=600&fit=crop&fm=webp&q=80`;
```

## Performance Considerations

1. **Lazy Loading**: All images below the fold are automatically lazy-loaded.

2. **Responsive Images**: The `sizes` attribute ensures browsers download appropriately sized images.

3. **Image Dimensions**: Always specify width and height to prevent layout shifts.

4. **Format Optimization**: Sanity CDN automatically serves optimized formats like WebP when supported.

## Examples

### Blog Post Featured Image

```jsx
<SanityImage
  src={post.featuredImage}
  alt={post.title}
  width={1200}
  height={675}
  className="rounded-lg"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
/>
```

### Product Gallery Image

```jsx
<SanityImage
  src={product.image}
  alt={product.title}
  width={800}
  height={800}
  className="rounded-md"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

### Background Image

```jsx
<div className="relative h-screen">
  <SanityImage
    src={backgroundImage}
    alt=""
    fill
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
</div>
```

## Sanity Schema Recommendations

When defining image fields in Sanity schemas, include validation for dimensions and file size:

```js
// Example image field with validation
{
  name: 'featuredImage',
  title: 'Featured Image',
  type: 'image',
  options: {
    hotspot: true, // Enables UI for selecting focal point
  },
  fields: [
    {
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }
  ],
  validation: Rule => Rule.custom((value) => {
    if (!value || !value.asset) {
      return true;
    }
    // You can add custom validation here if needed
    return true;
  })
}
```

## Next Steps

1. **Update remaining components** to use the SanityImage component

2. **Add sample images** to the static directories for UI elements

3. **Enhance Sanity schemas** with proper image validation

4. **Create image optimization workflow** for content editors
