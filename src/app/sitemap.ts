import { MetadataRoute } from 'next';
import { menuItems } from '@/lib/menu-items';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://linguaweave.app'; // Replace with your actual domain

  // Add static pages
  const staticRoutes = [
    { url: `${siteUrl}/`, lastModified: new Date() },
    { url: `${siteUrl}/login`, lastModified: new Date() },
    { url: `${siteUrl}/signup`, lastModified: new Date() },
  ];

  // Add routes from menuItems
  const dynamicRoutes = menuItems.map((item) => ({
    url: `${siteUrl}${item.href}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
