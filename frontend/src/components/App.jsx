import { BrowserRouter, Routes, Route } from 'react-router';
import LoginPage from './login/page';
import PrivateRoute from './PrivateRoute';
import Header from './Header';
import MainPage from './MainPage.jsx';
import ErrorPage from './NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);
export default App;
