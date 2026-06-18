import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const selectTokens: OverrideToken['Select'] = {
  optionSelectedBg:  palette.primary50,
  optionActiveBg:    palette.neutral100,
  hoverBorderColor:  palette.primary500,
  activeBorderColor: palette.primary600,
  selectorBg:        palette.neutral0,
  optionFontSize:    14,
  optionHeight:      36,
}
