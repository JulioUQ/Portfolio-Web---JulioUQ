// @ts-check
import { env } from 'node:process';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://juliouq.github.io',
  base: env.PUBLIC_PORTFOLIO_PUBLISHED === 'true' ? '/Portfolio-Web---JulioUQ' : '/',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
