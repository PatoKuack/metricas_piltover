import React, {useContext} from 'react';
import AppContext from '../context/AppContext.js';

const LineBarGraphics = () => {
  const {
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
    championList,
    setChampionList,
    currentChampionImg,
    setCurrentChampionImg,
    stats,
    setStats
  } = useContext(AppContext);
  return (
    <React.Fragment>
      
    </React.Fragment>
  )
}

export default LineBarGraphics;