export const sidebarConfig = {
  superadmin: ['Dashboard', 'CustomerManagement', 'UserManagement', 'ChangePassword', 'AddDevice', 'DeviceLocation'],
  systemspecialist: ['Dashboard', 'Location', 'UserManagement', 'Vendor', 'ChangePassword', 'Device', 'AddDevice', 'DeviceLocation'],
  admin: ['Dashboard', 'Location', 'UserManagement', 'Vendor', 'ChangePassword', 'AddDevice', 'DeviceLocation'],
  manager: ['Dashboard', 'Location', 'UserManagement', 'Vendor', 'ChangePassword', 'AddDevice', 'DeviceLocation'],
  user: ['Dashboard', 'Location', 'ChangePassword', 'AddDevice', 'DeviceLocation'],
};

export const crudConfig = {
  dashboard: {
    superadmin: {
      view: true,
      add: true,
      edit: true,
      delete: true,
    },
    systemspecialist: {
      view: true,
      add: true,
      edit: true,
      delete: true,
    },
    admin: {
      view: true,
      add: false,
      edit: true,
      delete: true,
    },
    manager: {
      view: true,
      add: true,
      edit: true,
      delete: false,
    },
    user: {
      view: true,
      add: false,
      edit: false,
      delete: false,
    },
  },
  location: {
    systemspecialist: {
      view: true,
      add: true,
      edit: true,
      delete: true,
    },
    admin: {
      view: true,
      add: false,
      edit: true,
      delete: false,
    },
    manager: {
      view: true,
      add: false,
      edit: false,
      delete: false,
    },
    user: {
      view: true,
      add: false,
      edit: false,
      delete: false,
    },
  },
  usermanagement: {
    superadmin: {
      view: true,
      add: true,
      edit: true,
      delete: true,
    },
    systemspecialist: {
      view: true,
      add: true,
      edit: true,
      delete: true,
    },
    admin: {
      view: true,
      add: true,
      edit: true,
      delete: true,
    },
    manager: {
      view: true,
      add: false,
      edit: true,
      delete: false,
    },
    user: {
      view: true,
      add: false,
      edit: false,
      delete: false,
    },
  },
  vendor: {
    systemspecialist: {
      view: true,
      add: true,
      edit: true,
      delete: true,
    },
    admin: {
      view: true,
      add: true,
      edit: true,
      delete: true,
    },
    manager: {
      view: true,
      add: true,
      edit: true,
      delete: false,
    },
    user: {
      view: true,
      add: false,
      edit: false,
      delete: false,
    },
  },
  changepassword: {
    superadmin: {
      view: true,
      add: true,
      edit: true,
      delete: true,
    },
    systemspecialist: {
      view: true,
      add: true,
      edit: true,
      delete: true,
    },
    admin: {
      view: true,
      add: true,
      edit: true,
      delete: true,
    },
    manager: {
      view: true,
      add: true,
      edit: true,
      delete: false,
    },
    user: {
      view: true,
      add: false,
      edit: false,
      delete: false,
    },
  },
  device: {
    superadmin: {
      view: true,
      add: true,
      edit: true,
      delete: true,
    },
    systemspecialist: {
      view: true,
      add: true,
      edit: true,
      delete: true,
    },
    admin: {
      view: true,
      add: false,
      edit: true,
      delete: true,
    },
    manager: {
      view: true,
      add: false,
      edit: true,
      delete: false,
    },
    user: {
      view: true,
      add: false,
      edit: false,
      delete: false,
    },
  },
  devicelocation: {
    systemspecialist: {
      view: true,
      add: true,
      edit: true,
      delete: true,
    },
    admin: {
      view: true,
      add: false,
      edit: true,
      delete: false,
    },
    manager: {
      view: true,
      add: false,
      edit: true,
      delete: false,
    },
    user: {
      view: true,
      add: false,
      edit: false,
      delete: false,
    },
  },
};
