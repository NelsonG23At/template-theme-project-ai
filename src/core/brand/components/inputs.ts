import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const inputTokens: OverrideToken['Input'] = {
  hoverBorderColor:  palette.primary500,
  activeBorderColor: palette.primary600,
  addonBg:           palette.neutral100,
  paddingInline:     12,
  paddingBlock:      6,
  inputFontSize:     14,
}
