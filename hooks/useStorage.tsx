export default function useStorage() {
  const setSessionStorage = (key: string, value: string) => sessionStorage.setItem(key, value);

  const getSessionStorage = (key: string) => sessionStorage.getItem(key);

  const removeSessionStorage = (key: string) => sessionStorage.removeItem(key);

  const clearSessionStorage = () => sessionStorage.clear();

  const setLocalStorage = (key: string, value: string) => localStorage.setItem(key, value);

  const getLocalStorage = (key: string) => localStorage.getItem(key);

  const removeLocalStorage = (key: string) => localStorage.removeItem(key);

  const clearLocalStorage = () => localStorage.clear();

  return {
    session: {
      set: setSessionStorage,
      get: getSessionStorage,
      remove: removeSessionStorage,
      clear: clearSessionStorage,
    },
    local: {
      set: setLocalStorage,
      get: getLocalStorage,
      remove: removeLocalStorage,
      clear: clearLocalStorage,
    },
  };
}
