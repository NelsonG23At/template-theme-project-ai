import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const cardTokens: OverrideToken['Card'] = {
  colorBgContainer:     palette.neutral0,
  colorBorderSecondary: palette.neutral200,
  borderRadius:         8,
  paddingLG:            24,
}
