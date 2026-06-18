import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const paginationTokens: OverrideToken['Pagination'] = {
  itemBg:          palette.translucentSurface32,
  itemActiveBg:    palette.paginationActiveBg,
  itemActiveColor: palette.neutral0,
  itemSize:        32,
  itemSizeSM:      24,
}
