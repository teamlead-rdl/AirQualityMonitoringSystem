import { createContext, useContext } from 'react';
import ApplicationStore from '../utils/localStorageUtil';
import { crudConfig } from '../config/roleConfig';

const UserAccessContext = createContext();

export function useUserAccess() {
  return useContext(UserAccessContext);
}

export function UserAccessProvider({ children }) {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const requestAccess = (moduleToAccess) => {
    const { userDetails } = ApplicationStore().getStorage('userDetails');
    const alertDetailsList = ApplicationStore().getStorage('alertDetails');
    const moduleConfig = crudConfig[moduleToAccess.toLowerCase()];
    const userAccess = moduleConfig[userDetails.userRole.toLowerCase()];
    return { userAccess, alertDetailsList };
  };

  return (
    <UserAccessContext.Provider value={requestAccess}>
      {children}
    </UserAccessContext.Provider>
  );
}
