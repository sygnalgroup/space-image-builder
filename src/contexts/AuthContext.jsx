import { createContext, useCallback, useState } from 'react';
import api, { authKey } from '~/core/api';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = useCallback(async () => {
    // const { data } = await api.get('/auth/validate_token');

    // const userData = data?.data;

    const userData = { id: 1, name: 'Mayander Caetano' };

    setCurrentUser(userData);

    return userData;
  }, []);

  const loginByEmailAndPassword = async (email, password) => {
    const { data } = await api.post('auth/sign_in', { email, password });
    const userData = data?.data;
    setCurrentUser(userData);

    return userData;
  };

  const logout = async () => {
    await api.delete('auth/sign_out');

    setCurrentUser(null);
    localStorage.removeItem(authKey);

    return null;
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, fetchCurrentUser, loginByEmailAndPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
