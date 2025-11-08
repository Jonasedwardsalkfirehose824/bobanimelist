# Vercel Error Handling for Production

This document explains how the error handling system is set up for production deployment on Vercel, with special handling for Vercel-specific deployment errors.

## Overview

The error handling system consists of multiple components that work together to provide appropriate error pages when different types of errors occur:

1. **Global Error Handler**: Catches unhandled errors and promise rejections
2. **Error Boundary**: React component to catch errors in the component tree
3. **ErrorPage Component**: Full-page error display
4. **ErrorState Component**: Interactive error state display with animations

## Vercel-Specific Error Types

The system handles the following Vercel-specific error types:

- `deployment-blocked`: When a deployment is blocked
- `deployment-deleted`: When a deployment has been deleted
- `deployment-disabled`: When a deployment is disabled
- `deployment-not-ready`: When a deployment is still being prepared
- `deployment-paused`: When a deployment is paused
- `dns-error`: When DNS resolution fails
- `edge-function-error`: When an edge function fails
- `function-timeout`: When a serverless function times out
- `function-throttled`: When a function is throttled
- `infinite-loop`: When an infinite loop is detected
- `invalid-request`: When a request is invalid
- `middleware-error`: When middleware fails
- `router-error`: When the router cannot match a route
- `sandbox-error`: When the execution sandbox is unavailable
- `too-many-requests`: When there are too many requests
- `internal-error`: For internal platform errors

## Implementation Details

### Global Error Handler

In `src/main.tsx`, the `setupGlobalErrorHandler` function is called to register global error listeners:

```typescript
import { setupGlobalErrorHandler } from './error-handling';

// Setup global error handler for production
setupGlobalErrorHandler();
```

### Error Boundary

The `VercelErrorBoundary` component can be used to wrap parts of your application to catch and display errors:

```tsx
import { VercelErrorBoundary } from './error-handling';

function App() {
  return (
    <VercelErrorBoundary>
      {/* Your application components */}
    </VercelErrorBoundary>
  );
}
```

### Automatic Error Type Detection

The `handleVercelError` utility function automatically determines the appropriate error type based on:

- Error object properties (code, statusCode, message)
- Error message content
- HTTP status codes

## Configuration for Vercel

### Custom Error Pages

To ensure custom error pages work properly on Vercel, update your `vercel.json`:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "/",
      "statusCode": 404
    }
  ]
}
```

### Error Reporting

In a production environment, you may want to integrate with an error reporting service like Sentry:

```typescript
// In the error handling functions
if (process.env.NODE_ENV === 'production') {
  // Send error to Sentry or similar service
  // Sentry.captureException(error);
}
```

## Testing Error Handling

To test the error handling implementation, you can simulate different error types:

```typescript
// Example test code
import { handleVercelError } from './src/utils/vercel-error-handler';

// Test a Vercel deployment blocked error
const deploymentBlockedError = {
  code: 'DEPLOYMENT_BLOCKED',
  statusCode: 403,
  name: 'Deployment Blocked',
  message: 'This deployment has been blocked'
};

const errorType = handleVercelError(deploymentBlockedError);
console.log(errorType); // Will output: 'deployment-blocked'
```

## Best Practices for Production

1. **Monitor Error Rates**: Set up monitoring for error rates and patterns
2. **Graceful Degradation**: Ensure the app continues to work when non-critical errors occur
3. **User Communication**: Provide clear, helpful messages to users when errors occur
4. **Logging**: Log errors with sufficient context to debug issues
5. **Fallback Strategies**: Have fallbacks for when error pages themselves fail