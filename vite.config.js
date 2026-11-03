import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Everything in public/ (including the portfolio2019/2020/2021 archives) is copied to dist as-is.
export default defineConfig({
  plugins: [react()],
});
