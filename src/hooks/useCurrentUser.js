import { useContext } from 'react';

import { AuthContext } from '~/contexts/AuthContext';

export const useCurrentUser = () => useContext(AuthContext)?.currentUser;
