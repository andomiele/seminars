import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth, selectIsAuth } from '../../redux/slices/authSlice.js';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    dispatch(setAuth({
      token: '',
      username: '',
    }));
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('header.title')}</a>
        {isAuth ? (<button type="button" className="btn btn-primary" onClick={logout}>{t('header.button')}</button>) : null}
      </div>
    </nav>
  );
};

export default Header;
