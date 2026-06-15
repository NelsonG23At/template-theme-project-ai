import { palette } from './palette'

export const cssVariables = {
  '--color-primary':          palette.primary600,
  '--color-primary-hover':    palette.primary700,
  '--color-primary-light':    palette.primary50,
  '--color-bg':               palette.neutral0,
  '--color-bg-secondary':     palette.neutral50,
  '--color-text':             palette.neutral900,
  '--color-text-secondary':   palette.neutral500,
  '--color-border':           palette.neutral200,
  '--color-success':          palette.success,
  '--color-warning':          palette.warning,
  '--color-error':            palette.error,
  '--color-info':             palette.info,
} as const

export const tailwindTokens = {
  colors: {
    primary: {
      DEFAULT: palette.primary600,
      hover:   palette.primary700,
      light:   palette.primary50,
      50:      palette.primary50,
      100:     palette.primary100,
      200:     palette.primary200,
      300:     palette.primary300,
      400:     palette.primary400,
      500:     palette.primary500,
      600:     palette.primary600,
      700:     palette.primary700,
      800:     palette.primary800,
      900:     palette.primary900,
    },
    neutral: {
      50:      palette.neutral50,
      100:     palette.neutral100,
      200:     palette.neutral200,
      300:     palette.neutral300,
      400:     palette.neutral400,
      500:     palette.neutral500,
      600:     palette.neutral600,
      700:     palette.neutral700,
      800:     palette.neutral800,
      900:     palette.neutral900,
    },
    success:  palette.success,
    warning:  palette.warning,
    error:    palette.error,
    info:     palette.info,
  },
} as const

export const antdTokens = {
  colorPrimary:           palette.primary600,
  colorPrimaryHover:      palette.primary700,
  colorBgContainer:       palette.neutral0,
  colorBgLayout:          palette.neutral50,
  colorText:              palette.neutral900,
  colorTextSecondary:     palette.neutral500,
  colorBorder:            palette.neutral200,
  colorSuccess:           palette.success,
  colorWarning:           palette.warning,
  colorError:             palette.error,
  colorInfo:              palette.info,
  borderRadius:           6,
  fontFamily:             'system-ui, -apple-system, sans-serif',
}
