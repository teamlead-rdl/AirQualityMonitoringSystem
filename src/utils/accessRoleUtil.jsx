import ApplicationStore from './localStorageUtil';
import { sidebarConfig } from '../config/roleConfig';

const allowedSidebarItems = () => {
  const { userDetails } = ApplicationStore().getStorage('userDetails');
  return sidebarConfig[userDetails.userRole.toLowerCase()];
};

export default allowedSidebarItems;
