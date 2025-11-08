import { Component, type ErrorInfo, type ReactNode } from 'react';
import ErrorPage from '@/pages/error-page';
import { type ErrorType } from '@/components/atoms/error-state';
import { handleVercelError } from '@/utils/vercel-error-handler';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorType?: ErrorType;
}

class VercelErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error, 
      errorType: handleVercelError(error) 
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('VercelErrorBoundary caught an error:', error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      // If a fallback component is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Otherwise, show our custom error page
      return (
        <ErrorPage 
          error={this.state.error} 
          errorType={this.state.errorType}
          showRetryButton={true}
          onRetry={() => window.location.reload()}
        />
      );
    }

    return this.props.children;
  }
}

export default VercelErrorBoundary;