import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingBar from './FloatingBar';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="page-enter">
      <Navbar />
      <main className="pt-24 min-h-screen">
        <Outlet />
      </main>
      <FloatingBar />
      <Footer />
    </div>
  );
}
