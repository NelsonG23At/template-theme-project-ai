import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const alertTokens: OverrideToken['Alert'] = {
  defaultPadding:           '9px 16px',
  withDescriptionPadding:   '9px 16px',
  withDescriptionIconSize:  16,
  colorWarningBg:           palette.alertWarningBg,
  colorWarningBorder:       palette.alertWarningBorder,
  colorInfoBg:              palette.alertInfoBg,
  colorInfoBorder:          palette.alertInfoBorder,
  colorErrorBg:             palette.alertErrorBg,
  colorErrorBorder:         palette.alertErrorBorder,
  colorSuccessBg:           palette.alertSuccessBg,
  colorSuccessBorder:       palette.alertSuccessBorder,
  colorErrorText:           palette.alertErrorText,
  colorInfoText:            palette.alertInfoText,
}
