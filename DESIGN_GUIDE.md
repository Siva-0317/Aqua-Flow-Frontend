# Smart Irrigation Frontend - Visual Design Guide

## Color Palette

### Status Colors
```
Normal    - Emerald: #10b981 (text), #f0fdf4 (bg)
Warning   - Amber:   #d97706 (text), #fefce8 (bg)
Critical  - Red:     #dc2626 (text), #fef2f2 (bg)
Info      - Blue:    #2563eb (text), #eff6ff (bg)
```

### Gradient Combinations
```
Primary   - from-emerald-400 to-teal-600
Secondary - from-blue-400 to-indigo-600
Accent    - from-amber-500 to-orange-600
Success   - from-emerald-500 to-teal-600
```

## Typography Scale

```
Display   - text-4xl font-black (Logo, Main Titles)
Title     - text-3xl font-bold (Page Headers)
Heading   - text-xl font-bold (Section Headers)
Subheading- text-lg font-semibold (Component Titles)
Body      - text-sm font-medium (General Text)
Small     - text-xs font-semibold (Labels, Badges)
```

## Spacing System

```
Container Padding: p-8 (32px)
Section Gap: gap-8 (32px)
Component Gap: gap-4 (16px)
Element Gap: gap-2 (8px)
```

## Border Radius

```
Containers - rounded-xl (16px)
Inputs     - rounded-lg (8px)
Badges     - rounded-full (50%)
```

## Shadows & Effects

```
Subtle   - shadow-lg
Elevated - shadow-xl
Hover    - hover:shadow-xl (add on hover)
Borders  - border-2 for emphasis, border for subtle
```

## Component Guidelines

### SensorCard
- Use gradient backgrounds based on status
- Icons have colored badges
- Values should be prominent (4xl)
- Hover effect: scale-105
- Animation: smooth transitions on status change

### MotorStatus
- Use gradient when ON (emerald-teal)
- Show activity indicator when running
- Pulse animation for engaged state
- Larger size for prominence

### Statistics
- 4-column grid (responsive to 2 on mobile)
- Each stat has unique color
- Icons with colored backgrounds
- Trending indicators

### Forms (DeviceConfig)
- Uppercase bold labels
- Larger padding in inputs (py-3)
- Focus state: ring-2 ring-emerald-200
- Error states: red borders and text
- Success animation: check icon + fade

### Cards
- Consistent use of rounded-xl
- Border-2 for emphasis on hover
- Gradient backgrounds where applicable
- Left borders for list items

## Interactive States

### Buttons
```
Default  - bg-gradient-to-r from-emerald-500 to-teal-600
Hover    - hover:shadow-xl hover:scale-105
Active   - Darker gradient shade
Disabled - opacity-50 or opacity-75
Loading  - Spinner icon with text
```

### Inputs
```
Default   - border-slate-300
Focus     - border-emerald-500 ring-2 ring-emerald-200
Error     - border-red-300
Success   - border-emerald-300
```

## Animation Patterns

### Hover Effects
- Cards: scale-105 with enhanced shadow
- Buttons: scale-105 with shadow-xl
- Icons: subtle pulse or color change

### Loading States
- Spinner: animate-spin on Loader2 icon
- Text: descriptive loading message
- Color: consistent with theme

### Status Changes
- Pulse animation for alerts: animate-pulse
- Bounce animation for indicators
- Color transitions: smooth with duration-300

## Responsive Breakpoints

```
Mobile (default):   single column, full width
Tablet (md):        2-3 columns
Desktop (lg):       3-4 columns, wider spacing
Large (xl):         4-column grid, max-width container
```

## Component Examples

### Enhanced SensorCard
```jsx
Status Colors with Gradients
- Normal: from-emerald-50 to-emerald-100
- Warning: from-amber-50 to-amber-100
- Critical: from-red-50 to-red-100
- Info: from-blue-50 to-blue-100
```

### Enhanced Navigation
```jsx
Brand Section:
- Logo: gradient background (emerald-teal)
- Title: gradient text (emerald to teal)
- Tagline: small, lighter text

Nav Buttons:
- Background: rounded-full pill shape
- Active: gradient with shadow
- Inactive: light background on hover
```

### Enhanced Statistics
```jsx
Each Card:
- Gradient background based on metric type
- Icon with colored badge background
- Large bold number (3xl)
- Small description label
- Trending indicator
```

## Best Practices

1. **Consistency**: Use the same color for the same metric across pages
2. **Hierarchy**: Size and weight indicate importance
3. **Feedback**: Every interactive element should have hover/active state
4. **Spacing**: Never leave elements touching - use consistent gaps
5. **Colors**: Use status colors purposefully (emerald=normal, amber=warning, red=critical)
6. **Animations**: Keep animations under 300ms for responsiveness
7. **Accessibility**: Maintain good contrast ratios (4.5:1 minimum)
8. **Mobile First**: Design for mobile, enhance for larger screens

## Common Tailwind Classes Used

```
Colors:
- text-emerald-600, text-amber-700, text-red-700
- bg-emerald-50, bg-amber-100, bg-red-100
- border-emerald-300, border-amber-300

Sizing:
- p-4, p-6, p-8 (padding)
- h-5, h-8, h-12 (heights)
- w-full, w-2/3 (widths)

Effects:
- shadow-lg, shadow-xl
- rounded-lg, rounded-xl
- border-2

Utilities:
- flex, items-center, justify-between
- grid, grid-cols-2, grid-cols-4
- space-y-3, gap-4, gap-6
```

---

**Design Guide for Smart Irrigation Frontend**
**Last Updated**: January 9, 2026
