import { BrowserRouter, Routes, Route } from 'react-router';
import LoginPage from './login/page';
import PrivateRoute from './PrivateRoute';
import MainPage from './MainPage';
import ErrorPage from './NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <div className="d-flex flex-column h-100">
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        <button type="button" className="btn btn-primary">Выйти</button>
      </div>
    </nav>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </div>
);
export default App;
