import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '~/hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from '~/components/Layout/Sidebar';
import { LayoutContextProvider } from '~/contexts/LayoutContext';

export const AppLayout = () => {
  const navigate = useNavigate();

  const [initialLoad, setInitialLoad] = useState(true);

  const { currentUser, fetchCurrentUser } = useAuth();

  const isAuthenticated = !!currentUser;

  useEffect(() => {
    if (!initialLoad) return;

    if (isAuthenticated) {
      setInitialLoad(false);

      return;
    }

    fetchCurrentUser()
      .then(() => {
        setInitialLoad(false);
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate, isAuthenticated, fetchCurrentUser, initialLoad]);

  if (initialLoad || !isAuthenticated) return;

  return (
    <LayoutContextProvider>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          style={{ zIndex: 9999 }}
        />

        <Sidebar />

        <div className="sm:ml-70">
          <div className="flex h-screen text-white transition-colors duration-300">
            <div className="flex flex-1 flex-col">
              {/* <Navbar handleMenu={handleMenu} /> */}

              <main className="main">
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      </div>
    </LayoutContextProvider>
  );
};
