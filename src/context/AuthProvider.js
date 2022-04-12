import { createContext, useContext } from 'react';

const AuthContext = createContext({
  userAuthentication: '',
  setUserAuthetication: (auth) => {}
});

export default AuthContext;