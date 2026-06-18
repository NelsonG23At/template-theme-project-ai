export const palette = {
  // Primary (rebranded from Figma: Button/Type=primary gradient + hover/active states)
  primary50:  '#f1f5fe',
  primary100: '#dde9fd',
  primary200: '#bbd3fb',
  primary300: '#93b9fa',
  primary400: '#70a3fa',
  primary500: '#5c96fa',
  primary600: '#4e8dfa',
  primary700: '#2f74ed',
  primary800: '#1d59c7',
  primary900: '#1449a1',

  // Neutral
  neutral0:   '#fafbfc',
  neutral50:  '#f7f8fa',
  neutral100: '#f2f4f7',
  neutral200: '#e6e8ec',
  neutral300: '#d0d3da',
  neutral400: '#a9b0bb',
  neutral500: '#737a84',
  neutral600: '#4b5563',
  neutral700: '#454b54',
  neutral800: '#1f2937',
  neutral900: '#1a1d21',

  // Semantic
  success:    '#22c55e',
  warning:    '#e0b045',
  error:      '#ad5050',
  info:       '#3b82f6',

  // Role badge colors
  roleAdmin:  '#7c3aed',
  roleEditor: '#2563eb',
  roleViewer: '#059669',
  roleGuest:  '#9ca3af',

  // Alert accents (from Figma: Alert component set, node 755:20625)
  alertWarningBg:     '#e6be663d',
  alertWarningBorder: '#be963b4d',
  alertInfoBg:        '#5fdad23d',
  alertInfoBorder:    '#9ae8e34d',
  alertErrorBg:       '#cc5e5e3d',
  alertErrorBorder:   '#df9a9a4d',
  alertSuccessBg:     '#3cc79a3d',
  alertSuccessBorder: '#ffffff4d',
  alertErrorText:     '#5c2a2a',
  alertInfoText:      '#2b625e',

  // Recurring text styles (from Figma: "Character / Title .85" / ".25" named styles)
  textTitle85:    '#000000d9',
  textDisabled25: '#00000040',

  // Recurring muted surface (from Figma: Button/Checkbox disabled backgrounds)
  disabledBg: '#edeff2',

  // Translucent surface (from Figma: Button secondary bg / Pagination item bg)
  translucentSurface32: '#fafbfc52',

  // Pagination active/selected pill (from Figma: neutral500 at 88% opacity)
  paginationActiveBg: '#737a84e0',

  // Button secondary border (from Figma: Button/Type=secondary stroke)
  whiteAlpha30: '#ffffff4d',

  // Avatar placeholder background (from Figma: Avatar default circle bg)
  avatarPlaceholderBg: '#edeff2',

  // Pure white (from Figma: Button danger text / "Character / Primary(inverse)")
  white: '#ffffff',

  // Primary at 35% opacity (from Figma: Button secondary active border)
  primaryAlpha35: '#4e8dfa59',
} as const

export type PaletteKey = keyof typeof palette
