import { useNavigate } from 'react-router';
import UndoIcon from '@mui/icons-material/Undo';

export const BackButton = ({ icon = false, label = false }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="cursor-pointer text-gray-400 hover:text-white"
    >
      {icon && <UndoIcon />}

      {label && 'Back'}
    </button>
  );
};
