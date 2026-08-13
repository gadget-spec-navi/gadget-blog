// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 公開URL（サイトマップ・OGP・canonical に使用）
  site: 'https://www.gadget-spec-navi.com',
  // sitemap-index.xml / sitemap-0.xml を dist/ に生成する
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
