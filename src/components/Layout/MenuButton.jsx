import MenuIcon from '@mui/icons-material/Menu';
import { LayoutContext } from '~/contexts/LayoutContext';
import { useContext } from 'react';

export const MenuButton = () => {
  const { handleMenu } = useContext(LayoutContext);

  return (
    <button
      className="text-lg text-gray-400 hover:text-white focus:ring-2 focus:ring-gray-600 focus:outline-none sm:hidden"
      onClick={handleMenu}
    >
      <MenuIcon
        className="cursor-pointer hover:text-white"
        titleAccess="Enviar Imagem"
        fontSize="medium"
      />
    </button>
  );
};
