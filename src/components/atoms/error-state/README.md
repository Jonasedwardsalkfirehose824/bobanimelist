# ErrorState Component

Interactive and animated error state component with 3D effects and multiple error type support.

## Features

- 🎨 **Multiple Error Types**: Pre-configured for 404, 500, network, timeout, unauthorized, forbidden, and generic errors
- 🌈 **Dynamic Theming**: Full support for light/dark mode
- 📱 **Fully Responsive**: Optimized for all device sizes (mobile, tablet, desktop)
- ✨ **3D Parallax Effect**: Interactive mouse-driven 3D animation
- 🎭 **Smooth Animations**: Built with Framer Motion for fluid transitions
- ♿ **Accessible**: ARIA labels and reduced motion support
- 🎯 **Customizable**: Override titles, messages, and actions

## Usage

### Basic Usage

```tsx
import ErrorState from '@/components/atoms/error-state/ErrorState';

// Simple 404 error
<ErrorState type="404" />

// Network error with custom message
<ErrorState 
  type="network" 
  message="Unable to connect to server. Please check your connection."
/>
```

### With Navigation

```tsx
<ErrorState
  type="404"
  navigateTo="/"
  navigateButtonText="Go Home"
  showRetryButton={false}
/>
```

### With Retry Action

```tsx
<ErrorState
  type="500"
  onRetry={() => window.location.reload()}
  retryButtonText="Try Again"
  showRetryButton={true}
/>
```

### Custom Error

```tsx
<ErrorState
  type="generic"
  title="Custom Error Title"
  message="This is a custom error message."
  onRetry={handleRetry}
  navigateTo="/dashboard"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `ErrorType` | `'generic'` | Type of error: '404', '500', 'network', 'timeout', 'unauthorized', 'forbidden', 'generic' |
| `title` | `string` | (auto) | Custom error title (overrides default) |
| `message` | `string` | (auto) | Custom error message (overrides default) |
| `onRetry` | `() => void` | - | Callback function for retry action |
| `showRetryButton` | `boolean` | `true` | Show/hide retry button |
| `retryButtonText` | `string` | `'Try Again'` | Text for retry button |
| `navigateTo` | `string` | - | Navigation path for the navigate button |
| `navigateButtonText` | `string` | `'Go Home'` | Text for navigate button |
| `className` | `string` | - | Additional CSS classes |
| `role` | `string` | `'alert'` | ARIA role for accessibility |

## Error Types

Each error type has pre-configured emoji/image, colors, and messages:

- **404**: 🖼️ Shocked GIF Animation - Page Not Found (Blue)
- **500**: ⚠️ Server Error (Red)
- **network**: 📡 Connection Lost (Orange)
- **timeout**: ⏱️ Request Timeout (Purple)
- **unauthorized**: 🔒 Unauthorized (Pink)
- **forbidden**: 🚫 Access Forbidden (Dark Red)
- **generic**: 😔 Something Went Wrong (Indigo)

> **Note**: The 404 error uses a custom animated GIF (`shocked-min.gif`) instead of an emoji for a more engaging visual experience.

## Animations

- Entry animation with fade and slide up
- 3D parallax effect on hover (desktop only)
- Pulsing glow effect around icon
- Animated particles in background
- Button hover and tap animations

All animations respect `prefers-reduced-motion` setting.

## Theme Support

The component automatically adapts to the application's theme context:
- Light mode: Lighter backgrounds and darker text
- Dark mode: Darker backgrounds and lighter text
- Uses semantic color tokens for consistency

## Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support
- Focus visible states
- Reduced motion support
- High contrast compatible
