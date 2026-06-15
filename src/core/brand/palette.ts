export const palette = {
  // Primary
  primary50:  '#f5f3ff',
  primary100: '#ede9fe',
  primary200: '#ddd6fe',
  primary300: '#c4b5fd',
  primary400: '#a78bfa',
  primary500: '#8b5cf6',
  primary600: '#7c3aed',
  primary700: '#6d28d9',
  primary800: '#5b21b6',
  primary900: '#4c1d95',

  // Neutral
  neutral0:   '#ffffff',
  neutral50:  '#f9fafb',
  neutral100: '#f3f4f6',
  neutral200: '#e5e7eb',
  neutral300: '#d1d5db',
  neutral400: '#9ca3af',
  neutral500: '#6b7280',
  neutral600: '#4b5563',
  neutral700: '#374151',
  neutral800: '#1f2937',
  neutral900: '#111827',

  // Semantic
  success:    '#22c55e',
  warning:    '#f59e0b',
  error:      '#ef4444',
  info:       '#3b82f6',

  // Role badge colors
  roleAdmin:  '#7c3aed',
  roleEditor: '#2563eb',
  roleViewer: '#059669',
  roleGuest:  '#9ca3af',
} as const

export type PaletteKey = keyof typeof palette
