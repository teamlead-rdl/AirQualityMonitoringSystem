import { createContext } from 'react';

const AuthContext = createContext({
  userAuthentication: '',
  setUserAuthetication: () => {},
});

export default AuthContext;
