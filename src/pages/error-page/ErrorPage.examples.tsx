/**
 * ErrorPage Component - Usage Examples
 *
 * This file provides examples of how to use the ErrorPage component
 * in various scenarios throughout your application.
 */

import ErrorPage from './ErrorPage';
import { type VercelError } from '../../utils/vercel-error-handler';

// Example 1: 404 Page Not Found
export const Example404 = () => (
  <ErrorPage
    is404={true}
  />
);

// Example 2: Generic Error Page
export const ExampleGeneric = () => (
  <ErrorPage
    errorType="generic"
  />
);

// Example 3: Server Error Page
export const Example500 = () => (
  <ErrorPage
    errorType="500"
  />
);

// Example 4: Network Error Page
export const ExampleNetwork = () => (
  <ErrorPage
    errorType="network"
  />
);

// Example 5: Unauthorized Access Page
export const ExampleUnauthorized = () => (
  <ErrorPage
    errorType="unauthorized"
  />
);

// Example 6: Forbidden Access Page
export const ExampleForbidden = () => (
  <ErrorPage
    errorType="forbidden"
  />
);

// Example 7: Root Error Page (Full height without margins)
export const ExampleRoot = () => (
  <ErrorPage
    isRoot={true}
    is404={true}
  />
);

// Example 8: Custom Error Type with Root Styling
export const ExampleCustomRoot = () => (
  <ErrorPage
    isRoot={true}
    errorType="timeout"
  />
);

// Example 9: Vercel Deployment Blocked Error
export const ExampleVercelDeploymentBlocked = () => {
  const vercelError: VercelError = {
    code: 'DEPLOYMENT_BLOCKED',
    statusCode: 403,
    name: 'Deployment Blocked Error',
    message: 'This deployment has been blocked due to policy violations'
  };

  return (
    <ErrorPage
      error={vercelError}
    />
  );
};

// Example 10: Vercel Function Timeout Error
export const ExampleVercelFunctionTimeout = () => {
  const vercelError: VercelError = {
    code: 'FUNCTION_INVOCATION_TIMEOUT',
    statusCode: 504,
    name: 'Function Timeout Error',
    message: 'The serverless function took too long to execute'
  };

  return (
    <ErrorPage
      error={vercelError}
    />
  );
};

// Example 11: Vercel DNS Error
export const ExampleVercelDNSError = () => {
  const vercelError: VercelError = {
    code: 'DNS_HOSTNAME_NOT_FOUND',
    statusCode: 502,
    name: 'DNS Error',
    message: 'Could not resolve the hostname'
  };

  return (
    <ErrorPage
      error={vercelError}
    />
  );
};

// Example 12: Error Page with Retry Functionality
export const ExampleWithRetry = () => (
  <ErrorPage
    errorType="network"
    showRetryButton={true}
    onRetry={() => window.location.reload()}
  />
);

// Example 13: Custom Error with Specific Message
export const ExampleCustomMessage = () => (
  <ErrorPage
    errorType="generic"
    title="Custom Error Title"
    message="This is a custom error message for specific scenarios."
  />
);