// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // 公開URL（サイトマップ・OGP・canonical に使用）
  site: 'https://www.gadget-spec-navi.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
