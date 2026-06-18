# Antd Token Reference (generated from antd@6.4.4)

Generated from `node_modules/antd/es/theme/interface/` and each component's own `style/token.d.ts` / `style/index.d.ts`. This is the validation source for `figma-translate-theme-url`: a candidate token name is only written to `src/core/brand/` if it appears in this file for that component (or in the Global Tokens section, which is valid as an override on *any* component per Ant Design's `OverrideToken = ComponentToken & AliasToken` composition).

**Regenerate this file whenever `antd` is upgraded in `package.json`** — token names, deprecations, and additions change between major versions.

## Global Tokens

Valid as a token override on any component (scoped under that component's key in `theme.components`), or globally under `theme.token`.

### Brand & Status Colors

| Token | Type | Description |
|---|---|---|
| `colorPrimary` | string | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. |
| `colorSuccess` | string | Used to represent the token sequence of operation success, such as Result, Progress and other components will use these map tokens. |
| `colorWarning` | string | Used to represent the warning map token, such as Notification, Alert, etc. Alert or Control component(like Input) will use these map tokens. |
| `colorError` | string | Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc. |
| `colorInfo` | string | Used to represent the operation information of the Token sequence, such as Alert, Tag, Progress, and other components use these map tokens. |
| `colorLink` | string | Control the color of hyperlink. |
| `colorPrimaryBg` | string | Light background color of primary color, usually used for weak visual level selection state. |
| `colorPrimaryBgHover` | string | The hover state color corresponding to the light background color of the primary color. |
| `colorPrimaryBorder` | string | The stroke color under the main color gradient, used on the stroke of components such as Slider. |
| `colorPrimaryBorderHover` | string | The hover state of the stroke color under the main color gradient, which will be used when the stroke Hover of components such as Slider and Button. |
| `colorPrimaryHover` | string | Hover state under the main color gradient. |
| `colorPrimaryActive` | string | Dark active state under the main color gradient. |
| `colorPrimaryTextHover` | string | Hover state of text color under the main color gradient. |
| `colorPrimaryText` | string | Text color under the main color gradient. |
| `colorPrimaryTextActive` | string | Active state of text color under the main color gradient. |
| `colorSuccessBg` | string | Light background color of success color, used for Tag and Alert success state background color |
| `colorSuccessBgHover` | string | Light background color of success color, but antd does not use this token currently |
| `colorSuccessBorder` | string | Border color of success color, used for Tag and Alert success state border color |
| `colorSuccessBorderHover` | string | Hover state color of success color border |
| `colorSuccessHover` | string | Hover state color of dark success color |
| `colorSuccessActive` | string | Active state color of dark success color |
| `colorSuccessTextHover` | string | Hover state color of success color text |
| `colorSuccessText` | string | Default state color of success color text |
| `colorSuccessTextActive` | string | Active state color of success color text |
| `colorWarningBg` | string | The background color of the warning state. |
| `colorWarningBgHover` | string | The hover state background color of the warning state. |
| `colorWarningBorder` | string | The border color of the warning state. |
| `colorWarningBorderHover` | string | The hover state border color of the warning state. |
| `colorWarningHover` | string | The hover state of the warning color. |
| `colorWarningActive` | string | The active state of the warning color. |
| `colorWarningTextHover` | string | The hover state of the text in the warning color. |
| `colorWarningText` | string | The default state of the text in the warning color. |
| `colorWarningTextActive` | string | The active state of the text in the warning color. |
| `colorInfoBg` | string | Light background color of information color. |
| `colorInfoBgHover` | string | Hover state of light background color of information color. |
| `colorInfoBorder` | string | Border color of information color. |
| `colorInfoBorderHover` | string | Hover state of border color of information color. |
| `colorInfoHover` | string | Hover state of dark color of information color. |
| `colorInfoActive` | string | Active state of dark color of information color. |
| `colorInfoTextHover` | string | Hover state of text color of information color. |
| `colorInfoText` | string | Default state of text color of information color. |
| `colorInfoTextActive` | string | Active state of text color of information color. |
| `colorErrorBg` | string | The background color of the error state. |
| `colorErrorBgHover` | string | The hover state background color of the error state. |
| `colorErrorBgFilledHover` | string | The wrong color fills the background color of the suspension state, which is currently only used in the hover effect of the dangerous filled button. |
| `colorErrorBgActive` | string | The active state background color of the error state. |
| `colorErrorBorder` | string | The border color of the error state. |
| `colorErrorBorderHover` | string | The hover state border color of the error state. |
| `colorErrorHover` | string | The hover state of the error color. |
| `colorErrorActive` | string | The active state of the error color. |
| `colorErrorTextHover` | string | The hover state of the text in the error color. |
| `colorErrorText` | string | The default state of the text in the error color. |
| `colorErrorTextActive` | string | The active state of the text in the error color. |
| `colorLinkHover` | string | Control the color of hyperlink when hovering. |
| `colorLinkActive` | string | Control the color of hyperlink when clicked. |

### Neutral Text & Border Colors

| Token | Type | Description |
|---|---|---|
| `colorTextBase` | string | Used to derive the base variable of the text color gradient. In v5, we added a layer of text color derivation algorithm to produce gradient variables of text color gradient. But please do not use this Seed Token directly in the code! |
| `colorText` | string | Default text color which comply with W3C standards, and this color is also the darkest neutral color. |
| `colorTextSecondary` | string | The second level of text color is generally used in scenarios where text color is not emphasized, such as label text, menu text selection state, etc. |
| `colorTextTertiary` | string | The third level of text color is generally used for descriptive text, such as form supplementary explanation text, list descriptive text, etc. |
| `colorTextQuaternary` | string | The fourth level of text color is the lightest text color, such as form input prompt text, disabled color text, etc. |
| `colorBorder` | string | Default border color, used to separate different elements, such as: form separator, card separator, etc. |
| `colorBorderSecondary` | string | Slightly lighter than the default border color, this color is the same as `colorSplit`. Solid color is used. |
| `colorBorderDisabled` | string | Control the border color of the element in the disabled state. |
| `colorFill` | string | The darkest fill color is used to distinguish between the second and third level of fill color, and is currently only used in the hover effect of Slider. |
| `colorFillSecondary` | string | The second level of fill color can outline the shape of the element more clearly, such as Rate, Skeleton, etc. It can also be used as the Hover state of the third level of fill color, such as Table, etc. |
| `colorFillTertiary` | string | The third level of fill color is used to outline the shape of the element, such as Slider, Segmented, etc. If there is no emphasis requirement, it is recommended to use the third level of fill color as the default fill color. |
| `colorFillQuaternary` | string | The weakest level of fill color is suitable for color blocks that are not easy to attract attention, such as zebra stripes, color blocks that distinguish boundaries, etc. |
| `colorFillContentHover` | string | Control the style of background color of content area when mouse hovers over it. |
| `colorFillAlter` | string | Control the alternative background color of element. |
| `colorFillContent` | string | Control the background color of content area. |
| `colorBorderBg` | string | Control the color of background border of element. |
| `colorTextPlaceholder` | string | Control the color of placeholder text. |
| `colorTextDisabled` | string | Control the color of text in disabled state. |
| `colorTextHeading` | string | Control the font color of heading. |
| `colorTextLabel` | string | Control the font color of text label. |
| `colorTextDescription` | string | Control the font color of text description. |
| `colorTextLightSolid` | string | Control the highlight color of text with background color, such as the text in Primary Button components. |

### Background Colors

| Token | Type | Description |
|---|---|---|
| `colorBgBase` | string | Used to derive the base variable of the background color gradient. In v5, we added a layer of background color derivation algorithm to produce map token of background color. But PLEASE DO NOT USE this Seed Token directly in the code! |
| `colorBgLayout` | string | This color is used for the background color of the overall layout of the page. This token will only be used when it is necessary to be at the B1 visual level in the page. Other usages are wrong. |
| `colorBgContainer` | string | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. |
| `colorBgElevated` | string | Container background color of the popup layer, in dark mode the color value of this token will be a little brighter than `colorBgContainer`. E.g: modal, pop-up, menu, etc. |
| `colorBgSpotlight` | string | This color is used to draw the user's strong attention to the background color, and is currently only used in the background color of Tooltip. |
| `colorBgBlur` | string | Control the background color of frosted glass container, usually transparent. |
| `colorBgSolid` | string | Solid background color, currently only used for the default solid button background color. |
| `colorBgSolidActive` | string | Solid background color active state, currently only used in the active effect of the default solid button. |
| `colorBgSolidHover` | string | Solid background color hover state, currently only used in the hover effect of the default solid button. |
| `colorBgMask` | string | The background color of the mask, used to cover the content below the mask, Modal, Drawer, Image and other components use this token |
| `colorBgContainerDisabled` | string | Control the background color of container in disabled state. |
| `colorBgTextHover` | string | Control the background color of text in hover state. |
| `colorBgTextActive` | string | Control the background color of text in active state. |

### Elevation (Shadows)

| Token | Type | Description |
|---|---|---|
| `boxShadow` | string | Control the box shadow style of an element. |
| `boxShadowSecondary` | string | Control the secondary box shadow style of an element. |
| `boxShadowTertiary` | string | Control the tertiary box shadow style of an element. |

### Border & Line

| Token | Type | Description |
|---|---|---|
| `lineWidth` | number | Border width of base components |
| `lineType` | string | Border style of base components |
| `borderRadius` | number | Border radius of base components |
| `lineWidthFocus` | number | Control the width of the line when the component is in focus state. |
| `lineWidthBold` | number | The default line width of the outline class components, such as Button, Input, Select, etc. |
| `borderRadiusXS` | number | XS size border radius, used in some small border radius components, such as Segmented, Arrow and other components with small border radius. |
| `borderRadiusSM` | number | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size |
| `borderRadiusLG` | number | LG size border radius, used in some large border radius components, such as Card, Modal and other components. |
| `borderRadiusOuter` | number | Outer border radius |

### Spacing (Padding/Margin)

| Token | Type | Description |
|---|---|---|
| `paddingXXS` | number | Control the extra extra small padding of the element. |
| `paddingXS` | number | Control the extra small padding of the element. |
| `paddingSM` | number | Control the small padding of the element. |
| `padding` | number | Control the padding of the element. |
| `paddingMD` | number | Control the medium padding of the element. |
| `paddingLG` | number | Control the large padding of the element. |
| `paddingXL` | number | Control the extra large padding of the element. |
| `paddingContentHorizontalLG` | number | Control the horizontal padding of content element, suitable for large screen devices. |
| `paddingContentHorizontal` | number | Control the horizontal padding of content element. |
| `paddingContentHorizontalSM` | number | Control the horizontal padding of content element, suitable for small screen devices. |
| `paddingContentVerticalLG` | number | Control the vertical padding of content element, suitable for large screen devices. |
| `paddingContentVertical` | number | Control the vertical padding of content element. |
| `paddingContentVerticalSM` | number | Control the vertical padding of content element, suitable for small screen devices. |
| `marginXXS` | number | Control the margin of an element, with the smallest size. |
| `marginXS` | number | Control the margin of an element, with a small size. |
| `marginSM` | number | Control the margin of an element, with a medium-small size. |
| `margin` | number | Control the margin of an element, with a medium size. |
| `marginMD` | number | Control the margin of an element, with a medium-large size. |
| `marginLG` | number | Control the margin of an element, with a large size. |
| `marginXL` | number | Control the margin of an element, with an extra-large size. |
| `marginXXL` | number | Control the margin of an element, with the largest size. |

### Sizing & Control Height

| Token | Type | Description |
|---|---|---|
| `sizeUnit` | number | The unit of size change, in Ant Design, our base unit is 4, which is more fine-grained control of the size step |
| `sizeStep` | number | The base step of size change, the size step combined with the size change unit, can derive various size steps. By adjusting the step, you can get different layout modes, such as the size step of the compact mode of V5 is 2 |
| `sizePopupArrow` | number | The size of the component arrow |
| `controlHeight` | number | The height of the basic controls such as buttons and input boxes in Ant Design |
| `controlInteractiveSize` | number | Control the interactive size of control component. |
| `sizeXXL` | number | Largest size |
| `sizeXL` | number | Extra-large size |
| `sizeLG` | number | Large size |
| `sizeMD` | number | Medium-large size |
| `sizeMS` | number | Same as `size`, but could be larger in compact mode |
| `size` | number | Medium size |
| `sizeSM` | number | Medium-small size |
| `sizeXS` | number | Small size |
| `sizeXXS` | number | Smallest size |
| `controlHeightXS` | number | XS component height |
| `controlHeightSM` | number | SM component height |
| `controlHeightLG` | number | LG component height |

### Typography

| Token | Type | Description |
|---|---|---|
| `fontFamily` | string | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. |
| `fontFamilyCode` | string | Code font, used for code, pre and kbd elements in Typography |
| `fontSize` | number | The most widely used font size in the design system, from which the text gradient will be derived. |
| `fontSizeIcon` | number | Control the font size of operation icon in Select, Cascader, etc. Normally same as fontSizeSM. |
| `fontWeightStrong` | number | Control the font weight of heading components (such as h1, h2, h3) or selected item. |
| `fontSizeSM` | number | Small font size |
| `fontSizeLG` | number | Large font size |
| `fontSizeXL` | number | Super large font size |
| `fontSizeHeading1` | number or string | Font size of h1 tag. |
| `fontSizeHeading2` | number or string | Font size of h2 tag. |
| `fontSizeHeading3` | number or string | Font size of h3 tag. |
| `fontSizeHeading4` | number or string | Font size of h4 tag. |
| `fontSizeHeading5` | number or string | Font size of h5 tag. |
| `lineHeight` | number | Line height of text. |
| `lineHeightLG` | number | Line height of large text. |
| `lineHeightSM` | number | Line height of small text. |
| `lineHeightHeading1` | number | Line height of h1 tag. |
| `lineHeightHeading2` | number | Line height of h2 tag. |
| `lineHeightHeading3` | number | Line height of h3 tag. |
| `lineHeightHeading4` | number | Line height of h4 tag. |
| `lineHeightHeading5` | number | Line height of h5 tag. |

### Motion, Z-Index & Misc

| Token | Type | Description |
|---|---|---|
| `zIndexBase` | number | The base Z axis value of all components, which can be used to control the level of some floating components based on the Z axis value, such as BackTop, Affix, etc. |
| `zIndexPopupBase` | number | Base zIndex of component like FloatButton, Affix which can be cover by large popup |
| `opacityImage` | number | Control image opacity |
| `motionUnit` | number | The unit of animation duration change |
| `motionBase` | number | Animation Base Duration. |
| `motionEaseOutCirc` | string | Preset motion curve. |
| `motionEaseInOutCirc` | string | Preset motion curve. |
| `motionEaseInOut` | string | Preset motion curve. |
| `motionEaseOutBack` | string | Preset motion curve. |
| `motionEaseInBack` | string | Preset motion curve. |
| `motionEaseInQuint` | string | Preset motion curve. |
| `motionEaseOutQuint` | string | Preset motion curve. |
| `motionEaseOut` | string | Preset motion curve. |
| `wireframe` | boolean | Used to change the visual effect of the component to wireframe, if you need to use the V4 effect, you need to enable the configuration item |
| `motion` | boolean | Used to configure the motion effect, when it is `false`, the motion is turned off |
| `colorWhite` | string | Pure white color don't changed by theme |
| `colorSplit` | string | Used as the color of separator, this color is the same as colorBorderSecondary but with transparency. |
| `colorIcon` | string | Weak action. Such as `allowClear` or Alert close button |
| `colorIconHover` | string | Weak action hover color. Such as `allowClear` or Alert close button |
| `colorHighlight` | string | Control the color of page element when highlighted. |
| `controlOutline` | string | Control the outline color of input component. |
| `colorWarningOutline` | string | Control the outline color of input component in warning state. |
| `colorErrorOutline` | string | Control the outline color of input component in error state. |
| `colorErrorAffix` | string | Control the color of form control prefix/suffix in error state. |
| `colorWarningAffix` | string | Control the color of form control prefix/suffix in warning state. |
| `controlOutlineWidth` | number | Control the outline width of input component. |
| `controlItemBgHover` | string | Control the background color of control component item when hovering. |
| `controlItemBgActive` | string | Control the background color of control component item when active. |
| `controlItemBgActiveHover` | string | Control the background color of control component item when hovering and active. |
| `controlItemBgActiveDisabled` | string | Control the background color of control component item when active and disabled. |

### Other

| Token | Type | Description |
|---|---|---|
| `opacityLoading` | number | Control the opacity of the loading state. |
| `linkDecoration` | React.CSSProperties['textDecoration'] | Control the text decoration style of a link. |
| `linkHoverDecoration` | React.CSSProperties['textDecoration'] | Control the text decoration style of a link on mouse hover. |
| `linkFocusDecoration` | React.CSSProperties['textDecoration'] | Control the text decoration style of a link on focus. |
| `controlPaddingHorizontal` | number | Control the horizontal padding of an element. |
| `controlPaddingHorizontalSM` | number | Control the horizontal padding of an element with a small-medium size. |
| `screenXS` | number | Control the screen width of extra small screens. |
| `screenXSMin` | number | Control the minimum width of extra small screens. |
| `screenXSMax` | number | Control the maximum width of extra small screens. |
| `screenSM` | number | Control the screen width of small screens. |
| `screenSMMin` | number | Control the minimum width of small screens. |
| `screenSMMax` | number | Control the maximum width of small screens. |
| `screenMD` | number | Control the screen width of medium screens. |
| `screenMDMin` | number | Control the minimum width of medium screens. |
| `screenMDMax` | number | Control the maximum width of medium screens. |
| `screenLG` | number | Control the screen width of large screens. |
| `screenLGMin` | number | Control the minimum width of large screens. |
| `screenLGMax` | number | Control the maximum width of large screens. |
| `screenXL` | number | Control the screen width of extra large screens. |
| `screenXLMin` | number | Control the minimum width of extra large screens. |
| `screenXLMax` | number | Control the maximum width of extra large screens. |
| `screenXXL` | number | Control the screen width of extra extra large screens. |
| `screenXXLMin` | number | Control the minimum width of extra extra large screens. |
| `screenXXLMax` | number | Control the maximum width of extra extra large screens. |
| `screenXXXL` | number | Control the screen width of XXXL screens. |
| `screenXXXLMin` | number | Control the minimum width of XXXL screens. |
| `controlTmpOutline` | string | Default style outline color. |


## Component-Specific Tokens

Valid only under that specific component's key in `theme.components.<Name>`. Combine with the Global Tokens above when validating a candidate mapping — a component's effective valid key set is its own table here **plus** every Global Token.

### Button

| Token | Type | Description |
|---|---|---|
| `fontWeight` | CSSProperties['fontWeight'] | Font weight of text |
| `iconGap` | CSSProperties['gap'] | Gap between icon and text |
| `defaultShadow` | string | Shadow of default button |
| `primaryShadow` | string | Shadow of primary button |
| `dangerShadow` | string | Shadow of danger button |
| `primaryColor` | string | Text color of primary button |
| `defaultColor` | string | Text color of default button |
| `defaultBg` | string | Background color of default button |
| `defaultBorderColor` | string | Border color of default button |
| `dangerColor` | string | Text color of danger button |
| `defaultHoverBg` | string | Background color of default button when hover |
| `defaultHoverColor` | string | Text color of default button when hover |
| `defaultHoverBorderColor` | string | Border color of default button |
| `defaultActiveBg` | string | Background color of default button when active |
| `defaultActiveColor` | string | Text color of default button when active |
| `defaultActiveBorderColor` | string | Border color of default button when active |
| `borderColorDisabled` *(deprecated)* | string | Border color of disabled button |
| `defaultGhostColor` | string | Text color of default ghost button |
| `ghostBg` | string | Background color of ghost button |
| `defaultGhostBorderColor` | string | Border color of default ghost button |
| `solidTextColor` | string | Default text color for solid buttons. |
| `textTextColor` | string | Default text color for text buttons |
| `textTextHoverColor` | string | Default text color for text buttons on hover |
| `textTextActiveColor` | string | Default text color for text buttons on active |
| `paddingInline` | CSSProperties['paddingInline'] | Horizontal padding of button |
| `paddingInlineLG` | CSSProperties['paddingInline'] | Horizontal padding of large button |
| `paddingInlineSM` | CSSProperties['paddingInline'] | Horizontal padding of small button |
| `paddingBlock` *(deprecated)* | CSSProperties['paddingBlock'] | Vertical padding of button |
| `paddingBlockLG` *(deprecated)* | CSSProperties['paddingBlock'] | Vertical padding of large button |
| `paddingBlockSM` *(deprecated)* | CSSProperties['paddingBlock'] | Vertical padding of small button |
| `onlyIconSize` | number or string | Icon size of button which only contains icon |
| `onlyIconSizeLG` | number or string | Icon size of large button which only contains icon |
| `onlyIconSizeSM` | number or string | Icon size of small button which only contains icon |
| `linkHoverBg` | string | Background color of link button when hover |
| `textHoverBg` | string | Background color of text button when hover |
| `contentFontSize` | number | Font size of button content |
| `contentFontSizeLG` | number | Font size of large button content |
| `contentFontSizeSM` | number | Font size of small button content |
| `contentLineHeight` *(deprecated)* | number | Line height of button content |
| `contentLineHeightLG` *(deprecated)* | number | Line height of large button content |
| `contentLineHeightSM` *(deprecated)* | number | Line height of small button content |
| `defaultBgDisabled` | string |  |
| `dashedBgDisabled` | string |  |

### Card

| Token | Type | Description |
|---|---|---|
| `headerBg` | string | Background color of card header |
| `headerFontSize` | number or string | Font size of card header |
| `headerFontSizeSM` | number or string | Font size of small card header |
| `headerHeight` | number or string | Height of card header |
| `headerHeightSM` | number or string | Height of small card header |
| `bodyPaddingSM` | number | Padding of small card body |
| `headerPaddingSM` | number | Padding of small card head |
| `bodyPadding` | number | Padding of card body |
| `headerPadding` | number | Padding of card head |
| `actionsBg` | string | Background color of card actions |
| `actionsLiMargin` | string | Margin of each item in card actions |
| `tabsMarginBottom` | number | Margin bottom of tabs component |
| `extraColor` | string | Text color of extra area |

### Input

| Token | Type | Description |
|---|---|---|
| `paddingInline` | number | Horizontal padding of input |
| `paddingInlineSM` | number | Horizontal padding of small input |
| `paddingInlineLG` | number | Horizontal padding of large input |
| `paddingBlock` | number | Vertical padding of input |
| `paddingBlockSM` | number | Vertical padding of small input |
| `paddingBlockLG` | number | Vertical padding of large input |
| `addonBg` | string | Background color of addon |
| `hoverBorderColor` | string | Hover border color |
| `activeBorderColor` | string | Active border color |
| `activeShadow` | string | Box-shadow when active |
| `errorActiveShadow` | string | Box-shadow when active in error status |
| `warningActiveShadow` | string | Box-shadow when active in warning status |
| `hoverBg` | string | Background color when the input box hovers |
| `activeBg` | string | Background color when the input box is activated |
| `inputFontSize` | number | Font size |
| `inputFontSizeLG` | number | Font size of large |
| `inputFontSizeSM` | number | Font size of small |

### Select

| Token | Type | Description |
|---|---|---|
| `multipleItemBg` | string | Background color of multiple tag |
| `multipleItemBorderColor` | string | Border color of multiple tag |
| `multipleItemHeight` | number | Height of multiple tag |
| `multipleItemHeightSM` | number | Height of multiple tag with small size |
| `multipleItemHeightLG` | number | Height of multiple tag with large size |
| `multipleSelectorBgDisabled` | string | Background color of multiple selector when disabled |
| `multipleItemColorDisabled` | string | Text color of multiple tag when disabled |
| `multipleItemBorderColorDisabled` | string | Border color of multiple tag when disabled |
| `zIndexPopup` | number | z-index of dropdown |
| `optionSelectedColor` | string | Text color when option is selected |
| `optionSelectedFontWeight` | CSSProperties['fontWeight'] | Font weight when option is selected |
| `optionSelectedBg` | string | Background color when option is selected |
| `optionActiveBg` | string | Background color when option is active |
| `optionPadding` | CSSProperties['padding'] | Padding of option |
| `optionFontSize` | number | Font size of option |
| `optionLineHeight` | CSSProperties['lineHeight'] | Line height of option |
| `optionHeight` | number | Height of option |
| `selectorBg` | string | Background color of selector |
| `clearBg` | string | Background color of clear button |
| `singleItemHeightLG` | number | Height of single selected item with large size |
| `showArrowPaddingInlineEnd` | number | Inline end padding of arrow |
| `hoverBorderColor` | string | Hover border color |
| `activeBorderColor` | string | Active border color |
| `activeOutlineColor` | string | Active outline color |

### Table

| Token | Type | Description |
|---|---|---|
| `headerBg` | string | Background of table header |
| `headerColor` | string | Color of table header text |
| `headerSortActiveBg` | string | Background color of table header when sorted |
| `headerSortHoverBg` | string | Background color of table header when sorted and hovered |
| `bodySortBg` | string | Background color of table sorted column |
| `rowHoverBg` | string | Background color of table hovered row |
| `rowSelectedBg` | string | Background color of table selected row |
| `rowSelectedHoverBg` | string | Background color of table selected row when hovered |
| `rowExpandedBg` | string | Background color of table expanded row |
| `cellPaddingBlock` | number | Vertical padding of table cell |
| `cellPaddingInline` | number | Horizontal padding of table cell (large size by default) |
| `cellPaddingBlockMD` | number | Vertical padding of table cell (middle size) |
| `cellPaddingInlineMD` | number | Horizontal padding of table cell (middle size) |
| `cellPaddingBlockSM` | number | Vertical padding of table cell (small size) |
| `cellPaddingInlineSM` | number | Horizontal padding of table cell (small size) |
| `borderColor` | string | Border color of table |
| `headerBorderRadius` | number | Border radius of table header |
| `footerBg` | string | Background of footer |
| `footerColor` | string | Color of footer text |
| `cellFontSize` | number | Font size of table cell (large size by default) |
| `cellFontSizeMD` | number | Font size of table cell (middle size) |
| `cellFontSizeSM` | number | Font size of table cell (small size) |
| `headerSplitColor` | string | Split border color of table header |
| `fixedHeaderSortActiveBg` | string | Background color of fixed table header when sorted |
| `headerFilterHoverBg` | string | Background color of table header filter button when hovered |
| `filterDropdownMenuBg` | string | Background of filter dropdown menu item |
| `filterDropdownBg` | string | Color of filter dropdown |
| `expandIconBg` | string | Background of expand button |
| `selectionColumnWidth` | number or string | Width of selection column |
| `stickyScrollBarBg` | string | Background of sticky scrollbar |
| `stickyScrollBarBorderRadius` | number | Border radius of sticky scrollbar |

### Form

| Token | Type | Description |
|---|---|---|
| `labelRequiredMarkColor` | string | Required mark color |
| `labelColor` | string | Label color |
| `labelFontSize` | number | Label font size |
| `labelHeight` | number or string | Label height |
| `labelColonMarginInlineStart` | number | Label colon margin-inline-start |
| `labelColonMarginInlineEnd` | number | Label colon margin-inline-end |
| `itemMarginBottom` | number | Form item margin bottom |
| `inlineItemMarginBottom` | number | Inline layout form item margin bottom |
| `verticalLabelPadding` | CSSProperties['padding'] | Vertical layout label padding |
| `verticalLabelMargin` | CSSProperties['margin'] | Vertical layout label margin |

### Typography

| Token | Type | Description |
|---|---|---|
| `titleMarginTop` | number or string | Margin top of title |
| `titleMarginBottom` | number or string | Margin bottom of title |

### Tag

| Token | Type | Description |
|---|---|---|
| `defaultBg` | string | Default background color |
| `defaultColor` | string | Default text color |
| `solidTextColor` | string | Default text color for solid tag. |

### Alert

| Token | Type | Description |
|---|---|---|
| `defaultPadding` | CSSProperties['padding'] | Default padding |
| `withDescriptionPadding` | CSSProperties['padding'] | Padding with description |
| `withDescriptionIconSize` | number or string | Icon size with description |

### Spin

| Token | Type | Description |
|---|---|---|
| `contentHeight` | number or string | Height of content area |
| `dotSize` | number | Loading icon size |
| `dotSizeSM` | number | Small loading icon size |
| `dotSizeLG` | number | Large loading icon size |

### Layout

| Token | Type | Description |
|---|---|---|
| `colorBgHeader` *(deprecated)* | string |  |
| `colorBgBody` *(deprecated)* | string |  |
| `colorBgTrigger` *(deprecated)* | string |  |
| `bodyBg` | string | Background Color of body |
| `headerBg` | string | Background Color of header |
| `headerHeight` | number or string | Height of header |
| `headerPadding` | CSSProperties['padding'] | Padding of header |
| `headerColor` | string | Text color of header |
| `footerPadding` | CSSProperties['padding'] | Padding of footer |
| `footerBg` | string | Background Color of footer |
| `siderBg` | string | Background Color of sider |
| `triggerHeight` | number or string | Height of sider trigger |
| `triggerBg` | string | Background Color of sider trigger |
| `triggerColor` | string | Color of sider trigger |
| `zeroTriggerWidth` | number | Width of sider trigger when collapse is 0 |
| `zeroTriggerHeight` | number | Height of sider trigger when collapse is 0 |
| `lightSiderBg` | string | Background Color of light theme sider |
| `lightTriggerBg` | string | Background Color of light theme sider trigger |
| `lightTriggerColor` | string | Color of light theme sider trigger |

### Pagination

| Token | Type | Description |
|---|---|---|
| `itemBg` | string | Background color of Pagination item |
| `itemSize` | number | Size of Pagination item |
| `itemSizeSM` | number | Size of small Pagination item |
| `itemSizeLG` | number | Size of large Pagination item |
| `itemActiveBg` | string | Background color of active Pagination item |
| `itemActiveColor` | string | Text color of active Pagination item |
| `itemActiveColorHover` | string | Text color of active Pagination item hover |
| `itemLinkBg` | string | Background color of Pagination item link |
| `itemActiveBgDisabled` | string | Background color of disabled active Pagination item |
| `itemActiveColorDisabled` | string | Text color of disabled active Pagination item |
| `itemInputBg` | string | Background color of input |
| `miniOptionsSizeChangerTop` | number | Top of Pagination size changer |

### Radio

| Token | Type | Description |
|---|---|---|
| `radioSize` | number | Radio size |
| `dotSize` | number | Size of Radio dot |
| `dotColorDisabled` | string | Color of disabled Radio dot |
| `buttonBg` | string | Background color of Radio button |
| `buttonCheckedBg` | string | Background color of checked Radio button |
| `buttonColor` | string | Color of Radio button text |
| `buttonPaddingInline` | number | Horizontal padding of Radio button |
| `buttonCheckedBgDisabled` | string | Background color of checked and disabled Radio button |
| `buttonCheckedColorDisabled` | string | Color of checked and disabled Radio button text |
| `buttonSolidCheckedColor` | string | Color of checked solid Radio button text |
| `buttonSolidCheckedBg` | string | Background color of checked solid Radio button text |
| `buttonSolidCheckedHoverBg` | string | Background color of checked solid Radio button text when hover |
| `buttonSolidCheckedActiveBg` | string | Background color of checked solid Radio button text when active |
| `wrapperMarginInlineEnd` | number | Margin right of Radio button |

### Checkbox

_No component-specific tokens — styled entirely by global tokens (`colorPrimary`, `colorBorder`, `borderRadius`, etc.)._

### Modal

| Token | Type | Description |
|---|---|---|
| `headerBg` | string | Background color of header |
| `titleLineHeight` | number or string | Line height of title |
| `titleFontSize` | number or string | Font size of title |
| `titleColor` | string | Font color of title |
| `contentBg` | string | Background color of content |
| `footerBg` | string | Background color of footer |

### Drawer

| Token | Type | Description |
|---|---|---|
| `zIndexPopup` | number | z-index of drawer |
| `footerPaddingBlock` | number | Vertical padding of footer |
| `footerPaddingInline` | number | Horizontal padding of footer |
| `draggerSize` | number | Size of resize handle |

### Tabs

| Token | Type | Description |
|---|---|---|
| `zIndexPopup` | number | z-index of dropdown menu |
| `cardBg` | string | Background color of card tab |
| `cardHeight` | number | Height of card tab |
| `cardHeightSM` | number | Height of small card tab |
| `cardHeightLG` | number | Height of large card tab |
| `cardPadding` | string | Padding of card tab |
| `cardPaddingSM` | string | Padding of small card tab |
| `cardPaddingLG` | string | Padding of large card tab |
| `titleFontSize` | number | Font size of title |
| `titleFontSizeLG` | number | Font size of large title |
| `titleFontSizeSM` | number | Font size of small title |
| `inkBarColor` | string | Color of indicator |
| `horizontalMargin` | string | Horizontal margin of horizontal tab |
| `horizontalItemGutter` | number | Horizontal gutter of horizontal tab |
| `horizontalItemMargin` | string | Horizontal margin of horizontal tab item |
| `horizontalItemMarginRTL` | string | Horizontal margin of horizontal tab item (RTL) |
| `horizontalItemPadding` | string | Horizontal padding of horizontal tab item |
| `horizontalItemPaddingLG` | string | Horizontal padding of large horizontal tab item |
| `horizontalItemPaddingSM` | string | Horizontal padding of small horizontal tab item |
| `verticalItemPadding` | string | Vertical padding of vertical tab item |
| `verticalItemMargin` | string | Vertical margin of vertical tab item |
| `itemColor` | string | Text color of tab |
| `itemActiveColor` | string | Text color of active tab |
| `itemHoverColor` | string | Text color of hover tab |
| `itemSelectedColor` | string | Text color of selected tab |
| `cardGutter` | number | Gutter of card tab |

### Menu

| Token | Type | Description |
|---|---|---|
| `dropdownWidth` | number or string | Width of popup menu |
| `zIndexPopup` | number | z-index of popup menu |
| `colorGroupTitle` *(deprecated)* | string |  |
| `groupTitleColor` | string | Color of group title text |
| `groupTitleLineHeight` | string or number | line-height of group title |
| `groupTitleFontSize` | number | font-size of group title |
| `radiusItem` *(deprecated)* | number |  |
| `itemBorderRadius` | number | Radius of menu item |
| `radiusSubMenuItem` *(deprecated)* | number |  |
| `subMenuItemBorderRadius` | number | Radius of sub-menu item |
| `colorItemText` *(deprecated)* | string |  |
| `itemColor` | string | Color of menu item text |
| `colorItemTextHover` *(deprecated)* | string |  |
| `itemHoverColor` | string | Hover color of menu item text |
| `colorItemTextHoverHorizontal` *(deprecated)* | string |  |
| `horizontalItemHoverColor` | string | Hover color of horizontal menu item text |
| `colorItemTextSelected` *(deprecated)* | string |  |
| `itemSelectedColor` | string | Color of selected menu item text |
| `subMenuItemSelectedColor` | string | Color of submenu title when submenu has selected item |
| `colorItemTextSelectedHorizontal` *(deprecated)* | string |  |
| `horizontalItemSelectedColor` | string | Color of selected horizontal menu item text |
| `colorItemTextDisabled` *(deprecated)* | string |  |
| `itemDisabledColor` | string | Color of disabled menu item text |
| `colorDangerItemText` *(deprecated)* | string |  |
| `dangerItemColor` | string | Color of danger menu item text |
| `colorDangerItemTextHover` *(deprecated)* | string |  |
| `dangerItemHoverColor` | string | Hover color of danger menu item text |
| `colorDangerItemTextSelected` *(deprecated)* | string |  |
| `dangerItemSelectedColor` | string | Color of selected danger menu item text |
| `colorDangerItemBgActive` *(deprecated)* | string |  |
| `dangerItemActiveBg` | string | Background color of danger menu item when active |
| `colorDangerItemBgSelected` *(deprecated)* | string |  |
| `dangerItemSelectedBg` | string | Background color of selected danger menu item |
| `colorItemBg` *(deprecated)* | string |  |
| `itemBg` | string |  |
| `colorItemBgHover` *(deprecated)* | string |  |
| `itemHoverBg` | string | Background color of menu item when hover |
| `colorSubItemBg` *(deprecated)* | string |  |
| `subMenuItemBg` | string | Background color of sub-menu item |
| `colorItemBgActive` *(deprecated)* | string |  |
| `itemActiveBg` | string | Background color of menu item when active |
| `colorItemBgSelected` *(deprecated)* | string |  |
| `itemSelectedBg` | string | Background color of menu item when selected |
| `colorItemBgSelectedHorizontal` *(deprecated)* | string |  |
| `horizontalItemSelectedBg` | string | Background color of horizontal menu item when selected |
| `colorActiveBarWidth` *(deprecated)* | number or string |  |
| `activeBarWidth` | number or string | Width of menu item active bar |
| `colorActiveBarHeight` *(deprecated)* | number |  |
| `activeBarHeight` | number | Height of menu item active bar |
| `colorActiveBarBorderSize` *(deprecated)* | number |  |
| `activeBarBorderWidth` | number or string | Border width of menu item active bar |
| `itemMarginInline` | number | Horizontal margin of menu item |
| `horizontalItemHoverBg` | string | Background color of horizontal menu item when hover |
| `horizontalItemBorderRadius` | number | Border radius of horizontal menu item |
| `itemHeight` | number or string | Height of menu item |
| `collapsedWidth` | number or string | Width when collapsed |
| `popupBg` | string | Background color of popup |
| `itemMarginBlock` | CSSProperties['marginBlock'] | margin-block of menu item |
| `itemPaddingInline` | CSSProperties['paddingInline'] | padding-inline of menu item |
| `horizontalLineHeight` | CSSProperties['lineHeight'] | LineHeight of horizontal menu item |
| `iconMarginInlineEnd` | CSSProperties['marginInlineEnd'] | Spacing between icon and text |
| `iconSize` | number | Size of icon |
| `collapsedIconSize` | number | Size of icon when collapsed |
| `darkPopupBg` | string | The background color of the overlay menu in dark mode. |
| `darkItemColor` | string | Color of menu item text in dark mode |
| `darkDangerItemColor` | string | Color of danger menu item text in dark mode |
| `darkItemBg` | string | Background of menu item in dark mode |
| `darkSubMenuItemBg` | string | Background of submenu item in dark mode |
| `darkItemSelectedColor` | string | Color of selected menu item in dark mode |
| `darkItemSelectedBg` | string | Background of active menu item in dark mode |
| `darkItemHoverBg` | string | Background of hovered menu item in dark mode |
| `darkGroupTitleColor` | string | Color of group title text in dark mode |
| `darkItemHoverColor` | string | Color of hovered menu item in dark mode |
| `darkItemDisabledColor` | string | Color of disabled menu item in dark mode |
| `darkDangerItemSelectedBg` | string | Background of active danger menu item in dark mode |
| `darkDangerItemHoverColor` | string | Background of hovered danger menu item in dark mode |
| `darkDangerItemSelectedColor` | string | Color of selected danger menu item in dark mode |
| `darkDangerItemActiveBg` | string | Background of active danger menu item in dark mode |

### Badge

| Token | Type | Description |
|---|---|---|
| `indicatorZIndex` | number or string | z-index of badge |
| `indicatorHeight` | number or string | Height of badge |
| `indicatorHeightSM` | number or string | Height of small badge |
| `dotSize` | number | Size of dot badge |
| `textFontSize` | number | Font size of badge text |
| `textFontSizeSM` | number | Font size of small badge text |
| `textFontWeight` | number or string | Font weight of badge text |
| `statusSize` | number | Size of status badge |
| `paddingInline` | number or string | Inline padding of multiple words badge |

### Avatar

| Token | Type | Description |
|---|---|---|
| `containerSize` | number | Size of Avatar |
| `containerSizeLG` | number | Size of large Avatar |
| `containerSizeSM` | number | Size of small Avatar |
| `textFontSize` | number | Font size of Avatar |
| `textFontSizeLG` | number | Font size of large Avatar |
| `textFontSizeSM` | number | Font size of small Avatar |
| `iconFontSize` | number | Font size of Avatar icon |
| `iconFontSizeLG` | number or string | Font size of large Avatar icon |
| `iconFontSizeSM` | number | Font size of small Avatar icon |
| `groupSpace` | number | Spacing between avatars in a group |
| `groupOverlapping` | number | Overlapping of avatars in a group |
| `groupBorderColor` | string | Border color of avatars in a group |

### Tooltip

| Token | Type | Description |
|---|---|---|
| `maxWidth` | number | Max width of tooltip |
| `zIndexPopup` | number | z-index of tooltip |

### Switch

| Token | Type | Description |
|---|---|---|
| `trackHeight` | number or string | Height of Switch |
| `trackHeightSM` | number or string | Height of small Switch |
| `trackMinWidth` | number or string | Minimum width of Switch |
| `trackMinWidthSM` | number or string | Minimum width of small Switch |
| `trackPadding` | number | Padding of Switch |
| `handleBg` | string | Background color of Switch handle |
| `handleShadow` | string | Shadow of Switch handle |
| `handleSize` | number | Size of Switch handle |
| `handleSizeSM` | number | Size of small Switch handle |
| `innerMinMargin` | number | Minimum margin of content area |
| `innerMaxMargin` | number | Maximum margin of content area |
| `innerMinMarginSM` | number | Minimum margin of content area of small Switch |
| `innerMaxMarginSM` | number | Maximum margin of content area of small Switch |

### Dropdown

| Token | Type | Description |
|---|---|---|
| `zIndexPopup` | number | z-index of dropdown |
| `paddingBlock` | CSSProperties['paddingBlock'] | Vertical padding of dropdown |

### DatePicker

| Token | Type | Description |
|---|---|---|
| `paddingInline` | number | Horizontal padding of input |
| `paddingInlineSM` | number | Horizontal padding of small input |
| `paddingInlineLG` | number | Horizontal padding of large input |
| `paddingBlock` | number | Vertical padding of input |
| `paddingBlockSM` | number | Vertical padding of small input |
| `paddingBlockLG` | number | Vertical padding of large input |
| `hoverBorderColor` | string | Hover border color |
| `activeBorderColor` | string | Active border color |
| `activeShadow` | string | Box-shadow when active |
| `errorActiveShadow` | string | Box-shadow when active in error status |
| `warningActiveShadow` | string | Box-shadow when active in warning status |
| `hoverBg` | string | Background color when the input box hovers |
| `activeBg` | string | Background color when the input box is activated |
| `inputFontSize` | number | Font size |
| `inputFontSizeLG` | number | Font size of large |
| `inputFontSizeSM` | number | Font size of small |
| `cellHoverBg` | string | Background color of cell hover state |
| `cellActiveWithRangeBg` | string | Background color of cell in range |
| `cellHoverWithRangeBg` | string | Background color of hovered cell in range |
| `cellBgDisabled` | string | Background color of disabled cell |
| `cellRangeBorderColor` | string | Border color of cell in range when picking |
| `timeColumnWidth` | number | Width of time column |
| `timeColumnHeight` | number | Height of time column |
| `timeCellHeight` | number | Height of time cell |
| `cellHeight` | number | Height of cell |
| `cellWidth` | number | Width of cell |
| `textHeight` | number | Height of cell text |
| `withoutTimeCellHeight` | number | Height of decade/year/quarter/month/week cell |
| `presetsWidth` | number | Width of preset area |
| `presetsMaxWidth` | number | Max width of preset area |
| `zIndexPopup` | number | z-index of popup |

### InputNumber

| Token | Type | Description |
|---|---|---|
| `paddingInline` | number | Horizontal padding of input |
| `paddingInlineSM` | number | Horizontal padding of small input |
| `paddingInlineLG` | number | Horizontal padding of large input |
| `paddingBlock` | number | Vertical padding of input |
| `paddingBlockSM` | number | Vertical padding of small input |
| `paddingBlockLG` | number | Vertical padding of large input |
| `addonBg` | string | Background color of addon |
| `hoverBorderColor` | string | Hover border color |
| `activeBorderColor` | string | Active border color |
| `activeShadow` | string | Box-shadow when active |
| `errorActiveShadow` | string | Box-shadow when active in error status |
| `warningActiveShadow` | string | Box-shadow when active in warning status |
| `hoverBg` | string | Background color when the input box hovers |
| `activeBg` | string | Background color when the input box is activated |
| `inputFontSize` | number | Font size |
| `inputFontSizeLG` | number | Font size of large |
| `inputFontSizeSM` | number | Font size of small |
| `controlWidth` | number | Width of input |
| `handleWidth` | number | Width of control button |
| `handleFontSize` | number | Icon size of control button |
| `handleVisible` | 'auto' or true | Handle visible |
| `handleBg` | string | Background color of handle |
| `handleActiveBg` | string | Active background color of handle |
| `handleHoverColor` | string | Hover color of handle |
| `handleBorderColor` | string | Border color of handle |
| `filledHandleBg` | string | Background color of handle in filled variant |

### Descriptions

| Token | Type | Description |
|---|---|---|
| `labelBg` | string | Background color of label |
| `labelColor` | string | Text color of label |
| `titleColor` | string | Text color of title |
| `titleMarginBottom` | number | Bottom margin of title |
| `itemPaddingBottom` | number | Bottom padding of item |
| `itemPaddingEnd` | number | End padding of item |
| `colonMarginRight` | number | Right margin of colon |
| `colonMarginLeft` | number | Left margin of colon |
| `contentColor` | string | Text color of content |
| `extraColor` | string | Text color of extra area |
