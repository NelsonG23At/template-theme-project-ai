import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const radioTokens: OverrideToken['Radio'] = {
  buttonCheckedBg:        palette.primary50,
  buttonSolidCheckedBg:   palette.primary600,
  buttonSolidCheckedColor: palette.neutral0,
  radioSize:              16,
  buttonPaddingInline:    12,
}
