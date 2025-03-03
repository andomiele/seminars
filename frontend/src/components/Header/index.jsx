import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/authSlice.js';
import { PAGE_LOGIN, getPage } from '../configs/configRouts.js';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const userLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate(getPage(PAGE_LOGIN));
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('header.title')}</a>
        {isAuth ? (<button type="button" className="btn btn-primary" onClick={userLogout}>{t('header.button')}</button>) : null}
      </div>
    </nav>
  );
};

export default Header;
