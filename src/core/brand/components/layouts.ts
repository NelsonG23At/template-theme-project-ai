import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const layoutTokens: OverrideToken['Layout'] = {
  bodyBg:        palette.neutral50,
  headerBg:      palette.neutral0,
  headerColor:   palette.neutral900,
  siderBg:       palette.neutral0,
  footerBg:      palette.neutral100,
  triggerBg:     palette.neutral200,
  triggerColor:  palette.neutral700,
  headerHeight:  64,
  triggerHeight: 48,
}
