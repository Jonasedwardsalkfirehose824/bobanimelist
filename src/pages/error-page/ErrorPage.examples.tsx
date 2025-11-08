/**
 * ErrorPage Component - Usage Examples
 *
 * This file provides examples of how to use the ErrorPage component
 * in various scenarios throughout your application.
 */

import ErrorPage from './ErrorPage';

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