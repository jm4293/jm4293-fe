export default function useStorage() {
  const setSessionStorage = (key: string, value: string) => {
    try {
      sessionStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  };

  const getSessionStorage = (key: string) => {
    try {
      return sessionStorage.getItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  const removeSessionStorage = (key: string) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  const clearSessionStorage = () => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };

  const setLocalStorage = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  };

  const getLocalStorage = (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  const removeLocalStorage = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  const clearLocalStorage = () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage,
    clearSessionStorage,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    clearLocalStorage,
  };
}
