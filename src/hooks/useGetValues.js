import {useState} from 'react';


const useGetValues = () => {

  const [lastVersion, setLastVersion] = useState('');
  const [headerToggle, setHeaderToggle] = useState(false);
  const [loadingMatchInfo, setLoadingMatchInfo] = useState(false);
  const [summonerInfo, setSummonerInfo] = useState({
        version: '',
        region: '',
        platform: '',
        language: '',
        puuid: '',
        name: 'Usuario',
        level: 'Nivel',
        iconURL: `http://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/4368.png`,
        status: 0
  });
  const [matchIdList, setMatchIdList] = useState([]);
  const [matchInfo, setMatchInfo] = useState([]);
  const [confirmationSaveData, setConfirmationSaveData] = useState(false);
  
  
  const [championList, setChampionList] = useState([]);
  const [currentChampionImg, setCurrentChampionImg] = useState([]);
  const [championSelected, setChampionSelected] = useState('');
  const [stats, setStats] = useState([]);

  return{
    lastVersion,
    setLastVersion,
    headerToggle,
    setHeaderToggle,
    loadingMatchInfo,
    setLoadingMatchInfo,
    summonerInfo,
    setSummonerInfo,
    matchIdList,
    setMatchIdList,
    matchInfo,
    setMatchInfo,
    confirmationSaveData,
    setConfirmationSaveData,

    championList,
    setChampionList,
    currentChampionImg,
    setCurrentChampionImg,
    championSelected,
    setChampionSelected,
    stats,
    setStats
  };

}

export default useGetValues;