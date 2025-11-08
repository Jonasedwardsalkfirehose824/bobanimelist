# ErrorPage Component

Full-page error display component that wraps the ErrorState component for complete page error handling.

## Features

- 🎨 **Multiple Error Types**: Pre-configured for 404, 500, network, timeout, unauthorized, forbidden, and generic errors
- 🌈 **Dynamic Theming**: Full support for light/dark mode
- 📱 **Fully Responsive**: Optimized for all device sizes (mobile, tablet, desktop)
- ✨ **3D Parallax Effect**: Interactive mouse-driven 3D animation from ErrorState component
- 🎭 **Smooth Animations**: Built with Framer Motion for fluid transitions
- ♿ **Accessible**: ARIA labels and reduced motion support
- 🎯 **Customizable**: Override titles, messages, and actions

## Usage

### Basic Usage

```tsx
import { ErrorPage } from '@/pages/error-page';

// Simple 404 error page
<ErrorPage is404={true} />

// Generic error page
<ErrorPage errorType="generic" />
```

### With Custom Error Type

```tsx
<ErrorPage
  errorType="500"
/>
```

### Root Error Page (Full height)

```tsx
<ErrorPage
  isRoot={true}
  is404={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `is404` | `boolean` | `false` | Set to true for 404 error page |
| `isRoot` | `boolean` | `false` | Set to true for full viewport height without margins |
| `errorType` | `ErrorType` | `'generic'` | Type of error: '404', '500', 'network', 'timeout', 'unauthorized', 'forbidden', 'generic' |

## Internationalization

The component uses react-i18next for text content:

- `EP_404_TITLE` - Title for 404 errors
- `EP_404_DESC` - Description for 404 errors
- `EP_ERROR_TITLE` - Title for generic errors
- `EP_ERROR_DESC` - Description for generic errors
- `EP_REDIRECT_TEXT` - Text for the home navigation button

## Responsive Design

The ErrorPage component is fully responsive and adapts to all screen sizes:

- **Mobile (320px+)**: Optimized layout for small screens
- **Tablet (768px+)**: Adjusted spacing and element sizing
- **Desktop (992px+)**: Enhanced visual experience
- **Large Desktop (1200px+)**: Optimized for high-resolution displays

The component follows all responsive principles implemented in the ErrorState component while maintaining its full-page layout.

## Accessibility

- Semantic HTML structure
- Proper ARIA roles
- Reduced motion support
- Keyboard navigation support
- Screen reader friendly

## Theming

The component automatically adapts to the application's theme context using semantic color tokens from the design system.