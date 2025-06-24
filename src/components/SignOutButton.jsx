import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useAuth } from '~/hooks/useAuth';
import { showAPIError } from '~/core/showAPIError';

import LogoutIcon from '@mui/icons-material/Logout';

export const SignOutButton = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      toast.success('Logged out!');
      navigate('/');
    },
    onError: showAPIError,
  });

  const handleLogout = () => {
    mutate();
  };

  return (
    <button disabled={isPending} onClick={handleLogout} className="">
      <span>
        <LogoutIcon />
      </span>
    </button>
  );
};
