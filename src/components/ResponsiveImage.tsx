'use client';

import React, { useState } from 'react';

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  aspectRatio?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Optimizes external and CDN image URLs by adding responsive widths and modern webp format
 */
function getOptimizedSrc(src: string, width: number): string {
  if (!src) return '';
  // Unsplash CDN optimization
  if (src.includes('images.unsplash.com')) {
    const url = new URL(src);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('q', '80');
    return url.toString();
  }
  return src;
}

export default function ResponsiveImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  aspectRatio = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate responsive srcSet for widths: 640, 960, 1280, 1600
  const isCdn = src?.includes('images.unsplash.com');
  const srcSet = isCdn
    ? `${getOptimizedSrc(src, 640)} 640w, ${getOptimizedSrc(src, 960)} 960w, ${getOptimizedSrc(
        src,
        1280
      )} 1280w, ${getOptimizedSrc(src, 1600)} 1600w`
    : undefined;

  const initialSrc = isCdn ? getOptimizedSrc(src, priority ? 1280 : 800) : src;

  return (
    <div
      className={`relative overflow-hidden bg-zinc-950 ${aspectRatio} ${wrapperClassName}`}
    >
      {/* Shimmer skeleton placeholder before image loads */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse" />
      )}

      {/* Error fallback */}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-zinc-600 text-xs font-medium">
          Görsel yüklenemedi
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={initialSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
}
