import {useEffect, useState} from 'react';
import axios from 'axios';

const useGetSummonerInfo = (summoner_URL) => {
  const [summonerInfo, setSummonerInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const response = await axios(summoner_URL);
    setSummonerInfo({
      summonerPuuid: response.data.puuid,
      summonerName: response.data.name,
      summonerLevel: response.data.summonerLevel,
      summonerIconId: response.data.profileIconId
    });
    setIsLoading(false);
  }, []);
  return {summonerInfo, isLoading};
}
export default useGetSummonerInfo;
