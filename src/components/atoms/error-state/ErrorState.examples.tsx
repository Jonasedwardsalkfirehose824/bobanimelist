/**
 * ErrorState Component - Usage Examples
 * 
 * This file provides examples of how to use the ErrorState component
 * in various scenarios throughout your application.
 */

import ErrorState from './ErrorState';

// Example 1: 404 Page Not Found
export const Example404 = () => (
  <ErrorState
    type="404"
    navigateTo="/"
    navigateButtonText="Back to Home"
    showRetryButton={false}
  />
);

// Example 2: 500 Server Error with Retry
export const Example500 = () => (
  <ErrorState
    type="500"
    onRetry={() => window.location.reload()}
    retryButtonText="Reload Page"
    showRetryButton={true}
  />
);

// Example 3: Network Connection Error
export const ExampleNetwork = () => (
  <ErrorState
    type="network"
    onRetry={() => {
      // Retry API call
      console.log('Retrying connection...');
    }}
    navigateTo="/"
    navigateButtonText="Go Home"
  />
);

// Example 4: Request Timeout
export const ExampleTimeout = () => (
  <ErrorState
    type="timeout"
    message="The request is taking longer than expected. Please try again."
    onRetry={() => {
      // Retry the request
      console.log('Retrying request...');
    }}
  />
);

// Example 5: Unauthorized Access
export const ExampleUnauthorized = () => (
  <ErrorState
    type="unauthorized"
    navigateTo="/login"
    navigateButtonText="Go to Login"
    showRetryButton={false}
  />
);

// Example 6: Forbidden Access
export const ExampleForbidden = () => (
  <ErrorState
    type="forbidden"
    message="You don't have the required permissions to view this content."
    navigateTo="/dashboard"
    navigateButtonText="Back to Dashboard"
    showRetryButton={false}
  />
);

// Example 7: Custom Error with Both Actions
export const ExampleCustom = () => (
  <ErrorState
    type="generic"
    title="Oops! Something Unexpected Happened"
    message="We encountered an issue while processing your request. Our team has been notified."
    onRetry={() => {
      // Custom retry logic
      console.log('Retrying...');
    }}
    retryButtonText="Try Again"
    navigateTo="/support"
    navigateButtonText="Contact Support"
  />
);

// Example 8: API Error with Custom Message
export const ExampleAPIError = () => {
  const handleRetry = async () => {
    try {
      // Retry API call
      const response = await fetch('/api/data');
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Retry failed:', error);
    }
  };

  return (
    <ErrorState
      type="500"
      title="Failed to Load Data"
      message="We couldn't retrieve the data you requested. Please check your connection and try again."
      onRetry={handleRetry}
      retryButtonText="Retry"
    />
  );
};

// Example 9: Minimal Error (No Actions)
export const ExampleMinimal = () => (
  <ErrorState
    type="generic"
    title="Under Maintenance"
    message="We're currently performing scheduled maintenance. Please check back soon."
    showRetryButton={false}
  />
);

// Example 10: Using in React Router Error Boundary
export const ExampleErrorBoundary = ({ error }: { error: Error }) => {
  const getErrorType = () => {
    if (error.message.includes('404')) return '404';
    if (error.message.includes('network')) return 'network';
    if (error.message.includes('timeout')) return 'timeout';
    return 'generic';
  };

  return (
    <ErrorState
      type={getErrorType()}
      title="Error Occurred"
      message={error.message}
      onRetry={() => window.location.reload()}
      navigateTo="/"
    />
  );
};

// Example 11: Vercel Deployment Blocked
export const ExampleVercelDeploymentBlocked = () => (
  <ErrorState
    type="deployment-blocked"
    title="Deployment Blocked"
    message="This deployment has been blocked. Please check your Vercel dashboard for more information."
    navigateTo="/"
    navigateButtonText="Go Home"
  />
);

// Example 12: Vercel Function Timeout
export const ExampleVercelFunctionTimeout = () => (
  <ErrorState
    type="function-timeout"
    title="Function Timeout"
    message="The serverless function took too long to execute. Please try again."
    onRetry={() => window.location.reload()}
    retryButtonText="Try Again"
  />
);

// Example 13: Vercel DNS Error
export const ExampleVercelDNSError = () => (
  <ErrorState
    type="dns-error"
    title="DNS Resolution Error"
    message="We are unable to resolve the domain name. Please check the URL or contact support."
    navigateTo="/"
    navigateButtonText="Go Home"
  />
);

// Example 14: Vercel Edge Function Error
export const ExampleVercelEdgeFunctionError = () => (
  <ErrorState
    type="edge-function-error"
    title="Edge Function Error"
    message="An error occurred while executing an edge function. Please try again later."
    onRetry={() => window.location.reload()}
    retryButtonText="Reload"
  />
);

// Example 15: Vercel Too Many Requests
export const ExampleVercelTooManyRequests = () => (
  <ErrorState
    type="too-many-requests"
    title="Too Many Requests"
    message="You have sent too many requests. Please wait before making more requests."
    onRetry={() => window.location.reload()}
    retryButtonText="Try Again Later"
  />
);
