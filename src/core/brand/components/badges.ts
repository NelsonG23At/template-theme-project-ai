import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const badgeTokens: OverrideToken['Badge'] = {
  badgeColor:    palette.error,
  dotSize:       6,
  textFontSize:  11,
  textFontSizeSM: 10,
}
