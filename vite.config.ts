import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  base: '',
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT || "3000")
  },
})