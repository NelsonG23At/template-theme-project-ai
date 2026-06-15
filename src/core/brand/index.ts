import type { ThemeConfig } from 'antd'
import { antdTokens } from './tokens'
import { buttonTokens, cardTokens } from './components'

export const brandTheme: ThemeConfig = {
  token: antdTokens,
  components: {
    Button: buttonTokens,
    Card:   cardTokens,
  },
}

export { palette } from './palette'
export { cssVariables, tailwindTokens, antdTokens } from './tokens'
