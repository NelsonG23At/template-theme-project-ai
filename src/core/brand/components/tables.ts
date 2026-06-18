import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const tableTokens: OverrideToken['Table'] = {
  headerBg:             palette.neutral50,
  headerColor:          palette.neutral700,
  headerSortActiveBg:   palette.neutral100,
  headerSortHoverBg:    palette.neutral200,
  borderColor:          palette.neutral200,
  rowHoverBg:           palette.neutral50,
  rowSelectedBg:        palette.primary50,
  rowSelectedHoverBg:   palette.primary100,
  footerBg:             palette.neutral100,
  footerColor:          palette.neutral600,
  cellPaddingBlock:     12,
  cellPaddingInline:    16,
  cellPaddingBlockMD:   8,
  cellPaddingInlineMD:  12,
  cellPaddingBlockSM:   4,
  cellPaddingInlineSM:  8,
  headerBorderRadius:   6,
}
