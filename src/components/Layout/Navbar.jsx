import { useAuth } from '~/hooks/useAuth';

import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = ({ handleMenu }) => {
  const { currentUser } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-2">
      <button
        className="inline-flex items-center rounded-lg text-sm text-gray-400 hover:bg-gray-700 focus:ring-2 focus:ring-gray-600 focus:outline-none sm:hidden"
        onClick={handleMenu}
      >
        <MenuIcon />
      </button>

      <h1 className="text-lg font-semibold">
        Dashboard / {currentUser.firstName}
      </h1>
    </header>
  );
};
