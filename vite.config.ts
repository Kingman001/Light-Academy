import path from 'path';
import { writeFileSync } from 'node:fs';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { schoolConfig } from './config/school';

const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'school-site-seo-files',
    apply: 'build',
    closeBundle() {
      const sitemapUrl = siteUrl || schoolConfig.identity.canonicalUrl;
      const staticPaths = [
        '/', '/about', '/academics',
        ...(schoolConfig.features.admissions ? ['/admissions'] : []),
        '/facilities', '/student-life', '/news',
        ...(schoolConfig.features.gallery ? ['/gallery'] : []),
        '/contact', '/faq',
      ];
      const paths = [
        ...staticPaths,
        ...schoolConfig.programs.map(program => `/academics/${program.id}`),
        ...schoolConfig.articles.map(article => `/news/${article.slug}`),
        ...schoolConfig.policyPages.map(policy => `/policies/${policy.slug}`),
      ];
      const root = path.resolve(__dirname, 'dist');
      if (sitemapUrl) {
        let parsed: URL;
        try {
          parsed = new URL(sitemapUrl);
        } catch {
          throw new Error('SITE_URL must be an absolute HTTPS URL to generate the sitemap.');
        }
        if (parsed.protocol !== 'https:') throw new Error('SITE_URL must use HTTPS to generate the production sitemap.');
        const baseUrl = parsed.toString().replace(/\/$/, '');
        const urls = paths.map(route => `  <url><loc>${escapeXml(`${baseUrl}${route}`)}</loc></url>`).join('\n');
        writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
        writeFileSync(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`);
      } else {
        writeFileSync(path.join(root, 'robots.txt'), 'User-agent: *\nAllow: /\n');
      }
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), seoFiles(env.SITE_URL)],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
