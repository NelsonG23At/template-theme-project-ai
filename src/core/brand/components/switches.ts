import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const switchTokens: OverrideToken['Switch'] = {
  colorPrimary:  palette.primary600,
  handleBg:      palette.neutral0,
  handleShadow:  '0px 2px 4px 0px rgba(0, 35, 11, 0.2)',
  trackHeight:   22,
  trackHeightSM: 16,
  handleSize:    18,
  handleSizeSM:  12,
}
