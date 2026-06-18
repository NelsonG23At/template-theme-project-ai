import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const checkboxTokens: OverrideToken['Checkbox'] = {
  colorPrimary:             palette.primary600,
  colorBgContainerDisabled: palette.disabledBg,
  borderRadius:             3,
}
