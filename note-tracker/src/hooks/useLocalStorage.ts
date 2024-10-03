import { useEffect, useState } from "react";
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window !== undefined) {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [key]);

  const setValue = (val: T | ((val: T) => T)) => {
    try {
      const valueStored = val instanceof Function ? val(storedValue) : val;
      setStoredValue(valueStored);
      if (typeof window !== undefined) {
        window.localStorage.setItem(key, JSON.stringify(valueStored));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue] as const;
};

export { useLocalStorage };
