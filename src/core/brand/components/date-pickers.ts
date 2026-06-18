import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const datePickerTokens: OverrideToken['DatePicker'] = {
  cellHoverBg:          palette.neutral100,
  cellActiveWithRangeBg: palette.primary50,
  cellHoverWithRangeBg:  palette.primary100,
  hoverBorderColor:     palette.primary500,
  activeBorderColor:    palette.primary600,
  zIndexPopup:          1050,
}
