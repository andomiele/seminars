import React from 'react';
import { useTranslation } from 'react-i18next';
import errorImg from '../../assets/404-D_FLHmTM.svg';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-25" src={errorImg} />
      <h1 className="h4 text-muted">{t('notFoundPage.notFound')}</h1>
      <p className="text-muted">
        {t('notFoundPage.canGoTo')}
        {' '}
        <a href="/">{t('notFoundPage.generalPage')}</a>
      </p>
    </div>
  );
};

export default ErrorPage;
