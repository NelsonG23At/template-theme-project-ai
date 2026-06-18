import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const tagTokens: OverrideToken['Tag'] = {
  defaultBg:           palette.neutral100,
  defaultColor:        palette.neutral700,
  tagFontSize:         12,
  tagPaddingHorizontal: 8,
}
