import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const formTokens: OverrideToken['Form'] = {
  labelColor:            palette.neutral700,
  labelRequiredMarkColor: palette.error,
  labelFontSize:         14,
  itemMarginBottom:      20,
}
