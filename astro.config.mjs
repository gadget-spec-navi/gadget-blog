// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // 公開URLに合わせて変更してください（サイトマップ・OGP・canonical に使用）
  site: 'https://gadget-spec-navi.example.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
