import type { Config } from 'tailwindcss'
import { tailwindTokens } from './src/core/brand/tokens'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: tailwindTokens,
  },
  plugins: [],
}

export default config
