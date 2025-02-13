import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userAuth = localStorage.getItem('token');

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('header.title')}</a>
        {userAuth ? (<button type="button" className="btn btn-primary" onClick={logout}>{t('header.button')}</button>) : null}
      </div>
    </nav>
  );
};

export default Header;
