import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const menuTokens: OverrideToken['Menu'] = {
  itemColor:             palette.textTitle85,
  itemHoverColor:        palette.primary600,
  itemSelectedColor:     palette.primary600,
  itemDisabledColor:     palette.neutral400,
  groupTitleColor:       palette.neutral500,
  itemBorderRadius:      6,
  subMenuItemBorderRadius: 4,
}
