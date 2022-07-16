import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ handleLogout, isRegistered, localEmail }) {
  return (
    <div className="page">
      <div className="content">
        <Header
          handleLogout={handleLogout}
          isRegistered={isRegistered}
          localEmail={localEmail}
        />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
