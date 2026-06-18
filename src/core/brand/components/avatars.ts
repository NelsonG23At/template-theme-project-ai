import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const avatarTokens: OverrideToken['Avatar'] = {
  containerSize:    42,
  containerSizeLG:  44,
  containerSizeSM:  32,
  textFontSize:     14,
  iconFontSize:     21,
  iconFontSizeSM:   18,
  iconFontSizeLG:   32,
  colorBgContainer: palette.avatarPlaceholderBg,
}
