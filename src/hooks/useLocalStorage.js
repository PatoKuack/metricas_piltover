import React, {useState, useEffect} from 'react';

function useLocalStorage(itemName, initialItemValue) {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(initialItemValue);

  useEffect(() => {
    try {
      const localStorageItem = localStorage.getItem(itemName);
      let parsedItem;
      if(!localStorageItem) {
        localStorage.setItem(itemName, JSON.stringify(initialItemValue));
        parsedItem = initialItemValue;
      } else {
        parsedItem = JSON.parse(localStorageItem);
      }
      setItem(parsedItem);
      setLoading(false);
    } catch(error) {
      setError(error);
    }
  });
  
  const saveItem = (newItem) => {
    try {
      const stringifyItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifyItem);
      setItem(newItem);
    } catch(error) {
      setError(error);
    }
  }

  return{
    item,
    saveItem,
    loading,
    error
  }
}
  
export default useLocalStorage;