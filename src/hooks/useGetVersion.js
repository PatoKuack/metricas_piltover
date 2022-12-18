import {useEffect, useState} from 'react';
import axios from 'axios';

const useGetVersion = (version_URL) => {
  const [version, setVersion] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const response = await axios(version_URL);
    setVersion(response.data[0]);
    setIsLoading(false);
  }, []);

  return {version, isLoading};
}
export default useGetVersion;