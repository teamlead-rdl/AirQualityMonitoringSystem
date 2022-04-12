const ApplicationStore = () => {
  function setStorage(storageKey, storageData) {
    localStorage.setItem(storageKey, JSON.stringify(storageData));
  }

  function getStorage(storageKey) {
    const dataObject = localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : '';
    return dataObject;
  }

  function persistStorage() {
    const dataToPersist = getStorage('persisData');
    setStorage('persisData', dataToPersist);
  }

  return {
    setStorage,
    getStorage,
    persistStorage
  };
};

export default ApplicationStore;