import type { ThemeConfig } from 'antd'
import { antdTokens } from './tokens'
import {
  buttonTokens,
  cardTokens,
  inputTokens,
  selectTokens,
  tableTokens,
  formTokens,
  typographyTokens,
  tagTokens,
  alertTokens,
  spinTokens,
  layoutTokens,
  paginationTokens,
  radioTokens,
  checkboxTokens,
  modalTokens,
  drawerTokens,
  tabsTokens,
  menuTokens,
  badgeTokens,
  avatarTokens,
  tooltipTokens,
  switchTokens,
  dropdownTokens,
  datePickerTokens,
  inputNumberTokens,
  descriptionsTokens,
} from './components'

export const brandTheme: ThemeConfig = {
  token: antdTokens,
  components: {
    Button:       buttonTokens,
    Card:         cardTokens,
    Input:        inputTokens,
    Select:       selectTokens,
    Table:        tableTokens,
    Form:         formTokens,
    Typography:   typographyTokens,
    Tag:          tagTokens,
    Alert:        alertTokens,
    Spin:         spinTokens,
    Layout:       layoutTokens,
    Pagination:   paginationTokens,
    Radio:        radioTokens,
    Checkbox:     checkboxTokens,
    Modal:        modalTokens,
    Drawer:       drawerTokens,
    Tabs:         tabsTokens,
    Menu:         menuTokens,
    Badge:        badgeTokens,
    Avatar:       avatarTokens,
    Tooltip:      tooltipTokens,
    Switch:       switchTokens,
    Dropdown:     dropdownTokens,
    DatePicker:   datePickerTokens,
    InputNumber:  inputNumberTokens,
    Descriptions: descriptionsTokens,
  },
}

export default brandTheme

export { palette }                              from './palette'
export { tokens, tailwindThemeExtension, antdTokens } from './tokens'
