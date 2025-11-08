/**
 * Test file to verify error handling functionality
 * This can be run to test that error handling works correctly
 */

import { handleVercelError, VercelError } from './src/utils/vercel-error-handler';

// Test various Vercel error scenarios
const testVercelErrors = () => {
  console.log('Testing Vercel Error Handling...\n');
  
  // Test 1: 404 error
  const error404 = { code: 'NOT_FOUND', statusCode: 404, name: 'Not Found', message: 'Page not found' };
  console.log('Test 1 - 404 Error:', handleVercelError(error404)); // Should return '404'
  
  // Test 2: 500 error
  const error500 = { code: 'INTERNAL_ERROR', statusCode: 500, name: 'Internal Error', message: 'Server error' };
  console.log('Test 2 - 500 Error:', handleVercelError(error500)); // Should return 'internal-error'
  
  // Test 3: Deployment Blocked
  const deploymentBlocked: VercelError = { 
    code: 'DEPLOYMENT_BLOCKED', 
    statusCode: 403, 
    name: 'Deployment Blocked', 
    message: 'This deployment has been blocked' 
  };
  console.log('Test 3 - Deployment Blocked:', handleVercelError(deploymentBlocked)); // Should return 'deployment-blocked'
  
  // Test 4: Function Timeout
  const functionTimeout: VercelError = { 
    code: 'FUNCTION_INVOCATION_TIMEOUT', 
    statusCode: 504, 
    name: 'Function Timeout', 
    message: 'Function took too long' 
  };
  console.log('Test 4 - Function Timeout:', handleVercelError(functionTimeout)); // Should return 'function-timeout'
  
  // Test 5: DNS Error
  const dnsError: VercelError = { 
    code: 'DNS_HOSTNAME_NOT_FOUND', 
    statusCode: 502, 
    name: 'DNS Error', 
    message: 'Hostname not found' 
  };
  console.log('Test 5 - DNS Error:', handleVercelError(dnsError)); // Should return 'dns-error'
  
  // Test 6: Edge Function Error
  const edgeFunctionError: VercelError = { 
    code: 'EDGE_FUNCTION_INVOCATION_FAILED', 
    statusCode: 500, 
    name: 'Edge Function Error', 
    message: 'Edge function failed' 
  };
  console.log('Test 6 - Edge Function Error:', handleVercelError(edgeFunctionError)); // Should return 'edge-function-error'
  
  // Test 7: Network Error (client side)
  const networkError = new Error('Network request failed');
  console.log('Test 7 - Network Error:', handleVercelError(networkError)); // Should return 'network'
  
  // Test 8: Generic Error
  const genericError = new Error('Something went wrong');
  console.log('Test 8 - Generic Error:', handleVercelError(genericError)); // Should return 'generic'
  
  console.log('\nAll tests completed!');
};

// Run the tests
testVercelErrors();