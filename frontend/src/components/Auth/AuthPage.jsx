import { useTranslation } from 'react-i18next';
import AuthForm from './AuthForm';

const AuthPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <AuthForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('authForm.dontHaveAccount')}</span>
                {' '}
                <a href="/signup">{t('authForm.registrationLink')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
