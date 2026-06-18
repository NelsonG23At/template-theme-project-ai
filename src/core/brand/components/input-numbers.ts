import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const inputNumberTokens: OverrideToken['InputNumber'] = {
  hoverBorderColor:  palette.primary500,
  activeBorderColor: palette.primary600,
  handleBg:          palette.neutral0,
  handleActiveBg:    palette.neutral100,
  handleHoverColor:  palette.primary600,
  paddingInline:     12,
  paddingBlock:      6,
  handleWidth:       22,
}
