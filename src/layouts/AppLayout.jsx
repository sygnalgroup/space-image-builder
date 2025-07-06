import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '~/hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LayoutContextProvider } from '~/contexts/LayoutContext';
import { Sidebar, SIDEBAR_WIDTH } from '~/components/Sidebar';

export const AppLayout = () => {
  const navigate = useNavigate();

  const [initialLoad, setInitialLoad] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        style={{ zIndex: 9999 }}
      />

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className="flex-1 overflow-hidden duration-300"
        style={{ marginLeft: collapsed ? '80px' : `${SIDEBAR_WIDTH}px` }}
      >
        <Outlet />
      </main>
    </LayoutContextProvider>
  );
};
