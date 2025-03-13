import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar bg-white">
      <div className="container justify-content-center">
        <a className="navbar-brand" href="/">{t('header.title')}</a>
      </div>
    </nav>
  );
};

export default Header;
