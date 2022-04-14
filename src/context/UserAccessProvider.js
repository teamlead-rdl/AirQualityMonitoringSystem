import { createContext, useContext } from 'react';
import ApplicationStore from '../utils/localStorageUtil';
import { crudConfig } from '../config/roleConfig';

const UserAccessContext = createContext();

export function useUserAccess() {
    return useContext(UserAccessContext)
}

export function UserAccessProvider({ children }) {
    const requestAccess = (moduleToAccess) => {
        const config = crudConfig;
        const { userDetails } = ApplicationStore().getStorage("userDetails");
        const moduleConfig = config[moduleToAccess.toLowerCase()];
        const userAccess = moduleConfig[userDetails.userRole.toLowerCase()];
        return userAccess;
    }

    return (
        <UserAccessContext.Provider value={requestAccess}>
            {children}
        </UserAccessContext.Provider>
    )
};