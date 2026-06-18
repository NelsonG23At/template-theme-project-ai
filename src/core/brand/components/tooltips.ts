import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const tooltipTokens: OverrideToken['Tooltip'] = {
  maxWidth:            280,
  zIndexPopup:         1070,
  colorBgSpotlight:    palette.neutral0,
  colorTextLightSolid: palette.neutral900,
}
