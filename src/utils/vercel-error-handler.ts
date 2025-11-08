/**
 * Vercel Error Handler Utility
 * 
 * This utility helps handle Vercel-specific errors that may occur during deployment
 * and provides appropriate error types for the ErrorState component.
 */

import { type ErrorType } from '@/components/atoms/error-state';

export interface VercelError {
  code: string;
  statusCode: number;
  name: string;
  message: string;
}

/**
 * Maps Vercel error codes to our internal error types
 */
export const mapVercelErrorToErrorType = (error: VercelError | Error): ErrorType => {
  if (error instanceof Error && error.message) {
    const message = error.message.toLowerCase();
    
    // Check for specific error patterns in the message
    if (message.includes('404') || message.includes('not found')) {
      return '404';
    }
    if (message.includes('500') || message.includes('server error')) {
      return '500';
    }
    if (message.includes('network') || message.includes('connection')) {
      return 'network';
    }
    if (message.includes('timeout') || message.includes('timed out')) {
      return 'timeout';
    }
    if (message.includes('unauthorized') || message.includes('auth')) {
      return 'unauthorized';
    }
    if (message.includes('forbidden') || message.includes('access denied')) {
      return 'forbidden';
    }
  }
  
  // If it's a Vercel error object with a code property
  if ('code' in error && typeof error.code === 'string') {
    const errorCode = error.code.toLowerCase();
    
    // Vercel-specific error codes
    if (errorCode.includes('deployment_blocked')) {
      return 'deployment-blocked';
    }
    if (errorCode.includes('deployment_deleted')) {
      return 'deployment-deleted';
    }
    if (errorCode.includes('deployment_disabled')) {
      return 'deployment-disabled';
    }
    if (errorCode.includes('deployment_not_ready') || errorCode.includes('redirecting')) {
      return 'deployment-not-ready';
    }
    if (errorCode.includes('deployment_paused')) {
      return 'deployment-paused';
    }
    if (errorCode.includes('dns_hostname')) {
      return 'dns-error';
    }
    if (errorCode.includes('function_invocation') || errorCode.includes('edge_function')) {
      return 'edge-function-error';
    }
    if (errorCode.includes('function_timeout') || errorCode.includes('invocation_timeout')) {
      return 'function-timeout';
    }
    if (errorCode.includes('function_throttled')) {
      return 'function-throttled';
    }
    if (errorCode.includes('infinite_loop')) {
      return 'infinite-loop';
    }
    if (errorCode.includes('invalid_request') || errorCode.includes('malformed')) {
      return 'invalid-request';
    }
    if (errorCode.includes('middleware')) {
      return 'middleware-error';
    }
    if (errorCode.includes('router')) {
      return 'router-error';
    }
    if (errorCode.includes('sandbox')) {
      return 'sandbox-error';
    }
    if (errorCode.includes('too_many')) {
      return 'too-many-requests';
    }
    if (errorCode.includes('internal')) {
      return 'internal-error';
    }
  }
  
  // If it's a Vercel error with a status code
  if ('statusCode' in error && typeof error.statusCode === 'number') {
    switch (error.statusCode) {
      case 404:
        return '404';
      case 500:
        return '500';
      case 403:
        return 'forbidden';
      case 502:
        return 'router-error'; // Bad gateway often relates to routing
      case 503:
        return 'deployment-paused'; // Service unavailable
      case 504:
        return 'function-timeout'; // Gateway timeout
      case 429:
        return 'too-many-requests';
      default:
        if (error.statusCode >= 400 && error.statusCode < 500) {
          return 'invalid-request';
        } else if (error.statusCode >= 500) {
          return 'internal-error';
        }
    }
  }
  
  // Default fallback
  return 'generic';
};

/**
 * Creates a Vercel error object from an error
 */
export const createVercelErrorFromError = (error: Error | { code?: string; statusCode?: number; message?: string }): VercelError => {
  // Check if it has the expected properties
  const errorObj = error as Record<string, unknown>;
  
  return {
    code: typeof errorObj.code === 'string' 
      ? errorObj.code 
      : 'UNKNOWN_ERROR',
    statusCode: typeof errorObj.statusCode === 'number' 
      ? errorObj.statusCode 
      : 500,
    name: typeof errorObj.name === 'string' 
      ? errorObj.name 
      : 'Error',
    message: typeof errorObj.message === 'string' 
      ? errorObj.message 
      : 'An unknown error occurred'
  };
};

/**
 * Handles a Vercel error and returns the appropriate error type
 */
export const handleVercelError = (error: Error | { code?: string; statusCode?: number; message?: string }): ErrorType => {
  const vercelError = createVercelErrorFromError(error);
  return mapVercelErrorToErrorType(vercelError);
};