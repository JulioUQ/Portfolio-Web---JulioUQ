// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://juliouq.github.io',
  base: process.env.PUBLIC_PORTFOLIO_PUBLISHED === 'true' ? '/Portfolio-Web---JulioUQ' : '/',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
