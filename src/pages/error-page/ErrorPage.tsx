import styles from './ErrorPage.module.scss';
import { useTranslation } from 'react-i18next';
import classNames from "classnames";
import ErrorState, { type ErrorType } from "../../components/atoms/error-state/ErrorState";

interface ErrorPageProps {
    is404?: boolean;
    isRoot?: boolean;
    errorType?: ErrorType;
}

function ErrorPage({ is404, isRoot, errorType }: ErrorPageProps) {
    const { t } = useTranslation();

    const determineErrorType = (): ErrorType => {
        if (errorType) return errorType;
        if (is404) return '404';
        return 'generic';
    };

    return (
        <div className={classNames(styles.error, { [styles['error--root']]: isRoot })}>
            <ErrorState
                type={determineErrorType()}
                title={is404 ? t('EP_404_TITLE') : t('EP_ERROR_TITLE')}
                message={is404 ? t('EP_404_DESC') : t('EP_ERROR_DESC')}
                navigateTo="/"
                navigateButtonText={t('EP_REDIRECT_TEXT')}
                showRetryButton={false}
            />
        </div>
    );
}

export default ErrorPage;