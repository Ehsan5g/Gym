import React, {FunctionComponent, JSX, useCallback} from 'react';
import useStateStorage from '../hooks/useStateStorage';
import {User} from '../types/types';
import {tokenKey, userKey} from '../constants/localStorsge';

type UserContextParam = {
  user: User | null;
  setUser: (newValue: User | null) => Promise<void>;
  token: string | null;
  setToken: (newValue: string | null) => Promise<void>;
  logout: () => Promise<void>;
};

const UserContext = React.createContext<UserContextParam | undefined>(
  undefined,
);

const UserProvider: FunctionComponent<{children: JSX.Element}> = ({
  children,
}) => {
  const [user, setUser] = useStateStorage<User | null>(userKey, null);

  const [token, setToken] = useStateStorage<string | null>(tokenKey, null);

  const logout = useCallback(async () => {
    await Promise.all([setUser(null), setToken(null)]);
  }, [setUser, setToken]);

  return (
    <UserContext.Provider
      value={{
        logout,
        user,
        setUser,
        setToken,
        token,
      }}>
      {children}
    </UserContext.Provider>
  );
};

function useUser(): UserContextParam {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}

export {UserProvider, useUser};
