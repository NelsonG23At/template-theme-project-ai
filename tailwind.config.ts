import type { Config } from 'tailwindcss'
import { tailwindThemeExtension } from './src/core/brand/tokens'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: tailwindThemeExtension,
  },
  plugins: [],
}

export default config
