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
    // const newNotification = ApplicationStore().getStorage('notificationDetails');
    const moduleConfig = crudConfig[moduleToAccess.toLowerCase()];
    const userAccess = moduleConfig[userDetails.userRole.toLowerCase()];
    return userAccess;
  };

  return (
    <UserAccessContext.Provider value={requestAccess}>
      {children}
    </UserAccessContext.Provider>
  );
}
