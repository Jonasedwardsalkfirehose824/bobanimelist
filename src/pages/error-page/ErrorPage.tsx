import styles from './ErrorPage.module.scss';
import { useTranslation } from 'react-i18next';
import classNames from "classnames";
import ErrorState, { type ErrorType } from "../../components/atoms/error-state/ErrorState";
import { handleVercelError } from '../../utils/vercel-error-handler';

interface ErrorPageProps {
    is404?: boolean;
    isRoot?: boolean;
    errorType?: ErrorType;
    error?: Error | { code?: string; statusCode?: number; message?: string };
    title?: string;
    message?: string;
    showRetryButton?: boolean;
    onRetry?: () => void;
}

function ErrorPage({ is404, isRoot, errorType, error, title, message, showRetryButton = false, onRetry }: ErrorPageProps) {
    const { t } = useTranslation();

    const determineErrorType = (): ErrorType => {
        // If we have a specific error object, try to map it to a Vercel error type
        if (error) {
            return handleVercelError(error);
        }
        
        // Otherwise use the provided error type
        if (errorType) return errorType;
        if (is404) return '404';
        return 'generic';
    };

    const currentErrorType = determineErrorType();

    return (
        <div className={classNames(styles.error, { [styles['error--root']]: isRoot })}>
            <ErrorState
                type={currentErrorType}
                title={title || (is404 ? t('EP_404_TITLE') : t('EP_ERROR_TITLE'))}
                message={message || (is404 ? t('EP_404_DESC') : t('EP_ERROR_DESC'))}
                navigateTo="/"
                navigateButtonText={t('EP_REDIRECT_TEXT')}
                showRetryButton={showRetryButton}
                onRetry={onRetry}
            />
        </div>
    );
}

export default ErrorPage;