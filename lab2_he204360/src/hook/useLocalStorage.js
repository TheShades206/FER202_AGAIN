import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);
      if (savedValue !== null) {
        const parsedValue = JSON.parse(savedValue);

        if (Array.isArray(initialValue) && !Array.isArray(parsedValue)) {
          return initialValue;
        }

        return parsedValue;
      }
    } catch {
      // Use the initial value when saved data cannot be read.
    }

    return initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // State still works when browser storage is unavailable.
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
