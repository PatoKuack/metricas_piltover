import React, {useEffect, useState, useContext, useRef} from 'react';
import Header from '../components/Header.jsx';
import AppContext from '../context/AppContext.js';

const ChampionStats = () => {
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
    championSelected,
    setChampionSelected,
    currentChampionImg,
    setCurrentChampionImg,
    stats,
    setStats
  } = useContext(AppContext);

  let i = 0;

  function getChampionList() {
    let summonerChampionList = [];
    for( i=0 ; i<matchInfo.length ; i++ ) {
      if(!(summonerChampionList.includes(matchInfo[i].championName)) && (matchInfo[i].summonerInfo.version === lastVersion) && (matchInfo[i].summonerInfo.name === summonerInfo.name)){
        summonerChampionList.push(matchInfo[i].championName);
      }
    }
    if(summonerChampionList.length === 0) {
      summonerChampionList.push("No champs");
    }
    setChampionList(summonerChampionList);
    if(summonerChampionList !== [] || summonerChampionList[0] !== "No champs") {
      championsInfo().then(getChampionStats);
      // setChampionSelected(`${summonerChampionList[0]}`);
      // console.log("selected: " + championSelected);
    }
  }

  useEffect(() => {
    getChampionList();
  }, [loadingMatchInfo]);
  useEffect(() => {
    setCurrentChampionImg('http://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/4368.png');
    setStats({
      damageDealtMagicGPY: '-',
      damageTakenMagicGPY: '-',
      damageDealtPhysicalGPY: '-',
      damageTakenPhysicalGPY: '-',
      damageDealtTrueGPY: '-',
      damageTakenTrueGPY: '-',
      damageDealtHealGPY: '-',
      averageKill: '-',
      averageDeath: '-',
      averageAssistance: '-',
      totHoursPlayed: '-',
      totGames: '-',
      totFirstBlood: '-',
      totWin: '-',
      maxKill: '-',
      maxAssist: '-',
      maxDeath: '-',
      maxGold: '-',
      maxMinions: '-',
      maxVision: '-',
      maxCC: '-',
      averageGold: '-',
      averageMinions: '-',
      averageVision: '-',
      averageCC: '-',
      maxDamage: 0,
      maxKDA: 0,
      damageDMGPY: '0,0',
      damageDPGPY: '0,0',
      damageDTGPY: '0,0',
      damageDHGPY: '0,0',
      pointYGAKill: '0',
      pointHGAKill: '0',
      pointYGADeath: '0',
      pointHGADeath: '0',
      pointYGAAssistance: '0',
      pointHGAAssistance: '0'
    });
  }, []);

  function abrebiaturaMaxRange(abbNum) {
    if(abbNum <= 999) {
      return(`${abbNum}`);
    } else if(abbNum > 999) {
      return(`${abbNum/1000}k`);
    } else if(abbNum > 99999) {
      return(`${abbNum/1000000}M`);
    } else if(abbNum > 99999999) {
      return(`${abbNum/1000000000}MM`);
    }
  }
  function generatorGCPY(damageTypeGPY, maxGraphicChampionPoint) {
    const graphicChampionPointsY = damageTypeGPY.map(element => Math.round((200-((element*200)/maxGraphicChampionPoint))*100)/100);
    const  graphicChampionPointsX = (300 / (graphicChampionPointsY.length - 1));
    i = 0;
    let damageArray = graphicChampionPointsY.map(element => `${graphicChampionPointsX * i++},${element} `);
    let damageTypePoints = '';
    for(i=0; i<damageArray.length; i++) {
      damageTypePoints += `${damageArray[i]}`;
    }
    damageTypePoints = damageTypePoints.trim();
    if(damageTypeGPY.length === 1) {
      damageTypePoints = `140,${graphicChampionPointsY[0]} 150,${graphicChampionPointsY[0]}`;
    }
    return(`${damageTypePoints}`);
  }
  function generatorGCKDAY(averageTypeGPY, maxGraphicChampionKDA) {
    const graphicChampionKDAHeight = (averageTypeGPY*300)/maxGraphicChampionKDA;
    const graphicChampionKDAY = 300-graphicChampionKDAHeight;
    return(`${graphicChampionKDAY}`);
  }
  function generatorGCKDAH(averageTypeGPH, maxGraphicChampionKDA) {
    const graphicChampionKDAHeight = (averageTypeGPH*300)/maxGraphicChampionKDA;
    return(`${graphicChampionKDAHeight}`);
  }
  
  const champSelection = useRef(`${championList[0]}`);
  const getChampSelected = () => {
    let loginChamp = championList[0];
    if(champSelection.current.value === "") {
      loginChamp = championList[0];
    } else {
      loginChamp = champSelection.current.value;
    }
    setChampionSelected(loginChamp);
    // console.log("championSelected: " + championSelected);
    return(loginChamp);
  }
  async function championsInfo() {
    try {
      const champions_URL = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/${summonerInfo.language}/champion.json`;
      const resultChampions = await fetch(champions_URL);
      const dataChampions = await resultChampions.json();
      const championsList = Object.entries(dataChampions.data);
      const champName = getChampSelected();
      let champId;
      if(champName !== undefined) {
        for(i=0 ; i<championsList.length ; i++) {
          if((champName === championsList[i][1].id) || (champName === championsList[i][0])) {
            champId = championsList[i][1].id;
            setCurrentChampionImg(`http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/champion/${champId}.png`);
            break;
          }
        }
        // specificChampionInfo(champId);
      }

      if(resultChampions.status !== 200) {
        console.log(resultChampions.status + dataChampions.message);
      } else {
        // setChampionSelected(`${champName}`);
        // console.log("selected: " + championSelected);
        console.log("no error getting champion-id");
      }
    } catch(err) { console.log(err)}
  }
  async function specificChampionInfo(champId) {
    try {
      const specific_champion_URL = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/${summonerInfo.language}/champion/${champId}.json`;
      const resultChampion = await fetch(specific_champion_URL);
      const dataChampion = await resultChampion.json();
      console.log(specific_champion_URL);
      

      if(resultChampion.status !== 200) {
        console.log(resultChampion.status + dataChampion.message);
      } else {
        console.log("no error in champion-info");
      }
    } catch(err) { console.log(err)}
  }

  async function getChampionStats() {
    try {

      let damageDealtMagicGPY = [];
      let damageTakenMagicGPY = [];
      let damageDealtPhysicalGPY = [];
      let damageTakenPhysicalGPY = [];
      let damageDealtTrueGPY = [];
      let damageTakenTrueGPY = [];
      let damageDealtHealGPY = [];
      let averageKill = 0;
      let averageDeath = 0;
      let averageAssistance = 0;
      let totHoursPlayed = 0;
      let totGames = 0;
      let totFirstBlood = 0;
      let totWin = 0;
      let maxKill = 0;
      let maxAssist = 0;
      let maxDeath = 0;
      let maxGold = 0;
      let maxMinions = 0;
      let maxVision = 0;
      let maxCC = 0;
      let averageGold = 0;
      let averageMinions = 0;
      let averageVision = 0;
      let averageCC = 0;

      let maxDamage = 0;
      let maxKDA = 0;
      let damageDMGPY = "";
      let damageDPGPY = "";
      let damageDTGPY = "";
      let damageDHGPY = "";
      let pointYGAKill = "";
      let pointHGAKill = "";
      let pointYGADeath = "";
      let pointHGADeath = "";
      let pointYGAAssistance = "";
      let pointHGAAssistance = "";
  
      const champName = getChampSelected();
  
      for( i=0 ; i<matchInfo.length ; i++ ) {
        if((matchInfo[i].championName === champName) && (matchInfo[i].summonerInfo.version === lastVersion) && (matchInfo[i].summonerInfo.name === summonerInfo.name)){
          damageDealtMagicGPY.push(matchInfo[i].magicDamageDealt);
          damageDealtPhysicalGPY.push(matchInfo[i].physicalDamageDealt);
          damageDealtTrueGPY.push(matchInfo[i].trueDamageDealt);
          damageDealtHealGPY.push(matchInfo[i].healDamage);
          
          damageTakenMagicGPY.push(matchInfo[i].magicDamageTaken);
          damageTakenPhysicalGPY.push(matchInfo[i].physicalDamageTaken);
          damageTakenTrueGPY.push(matchInfo[i].trueDamageTaken);
          
          averageKill += matchInfo[i].Kills;
          averageDeath += matchInfo[i].deaths;
          averageAssistance += matchInfo[i].assists;
  
          totHoursPlayed += matchInfo[i].timeOfGame;
          totGames++;
          if(matchInfo[i].firstBlood) totFirstBlood++;
          if(matchInfo[i].victory) totWin++;
          if(matchInfo[i].Kills > maxKill) maxKill=matchInfo[i].Kills;
          if(matchInfo[i].assists > maxAssist) maxAssist=matchInfo[i].assists;
          if(matchInfo[i].deaths > maxDeath) maxDeath=matchInfo[i].deaths;
          if(matchInfo[i].gold > maxGold) maxGold=matchInfo[i].gold;
          if(matchInfo[i].minions > maxMinions) maxMinions=matchInfo[i].minions;
          if(matchInfo[i].vision > maxVision) maxVision=matchInfo[i].vision;
          if(matchInfo[i].cCing > maxCC) maxCC=matchInfo[i].cCing;
          averageGold += matchInfo[i].gold;
          averageMinions += matchInfo[i].minions;
          averageVision += matchInfo[i].vision;
          averageCC += matchInfo[i].cCing;
        }
      }
      averageKill = (Math.round((averageKill/totGames)*100))/100;
      averageDeath = (Math.round((averageDeath/totGames)*100))/100;
      averageAssistance = (Math.round((averageAssistance/totGames)*100))/100;
      averageGold = (Math.round((averageGold/totGames)*100))/100;
      averageMinions = (Math.round((averageMinions/totGames)*100))/100;
      averageVision = (Math.round((averageVision/totGames)*100))/100;
      averageCC = (Math.round((averageCC/totGames)*100))/100;

      // ----------------------------
      maxDamage = damageDealtMagicGPY.concat(damageDealtPhysicalGPY.concat(damageDealtTrueGPY.concat(damageDealtHealGPY)));
      maxDamage = Math.max(...maxDamage);
      maxKDA = Math.max(averageKill, averageDeath, averageAssistance);
      maxDamage = Math.ceil(maxDamage/1000) * 1000;
      maxKDA = Math.ceil(maxKDA);

      damageDMGPY = generatorGCPY(damageDealtMagicGPY, maxDamage);
      damageDPGPY = generatorGCPY(damageDealtPhysicalGPY, maxDamage);
      damageDTGPY = generatorGCPY(damageDealtTrueGPY, maxDamage);
      damageDHGPY = generatorGCPY(damageDealtHealGPY, maxDamage);

      pointYGAKill = generatorGCKDAY(averageKill, maxKDA);
      pointHGAKill = generatorGCKDAH(averageKill, maxKDA);
      pointYGADeath = generatorGCKDAY(averageDeath, maxKDA);
      pointHGADeath = generatorGCKDAH(averageDeath, maxKDA);
      pointYGAAssistance = generatorGCKDAY(averageAssistance, maxKDA);
      pointHGAAssistance = generatorGCKDAH(averageAssistance, maxKDA);
        // ---------------------
  
      await setStats({
        damageDealtMagicGPY: damageDealtMagicGPY,
        damageTakenMagicGPY: damageTakenMagicGPY,
        damageDealtPhysicalGPY: damageDealtPhysicalGPY,
        damageTakenPhysicalGPY: damageTakenPhysicalGPY,
        damageDealtTrueGPY: damageDealtTrueGPY,
        damageTakenTrueGPY: damageTakenTrueGPY,
        damageDealtHealGPY: damageDealtHealGPY,
        averageKill: averageKill,
        averageDeath: averageDeath,
        averageAssistance: averageAssistance,
        totHoursPlayed: `${Math.floor(totHoursPlayed/3600)}hr:${Math.floor((totHoursPlayed/60)%60)}m:${totHoursPlayed%60}s`,
        totGames: totGames,
        totFirstBlood: totFirstBlood,
        totWin: totWin,
        maxKill: maxKill,
        maxAssist: maxAssist,
        maxDeath: maxDeath,
        maxGold: maxGold,
        maxMinions: maxMinions,
        maxVision: maxVision,
        maxCC: maxCC,
        maxDamage: maxDamage,
        maxKDA: maxKDA,
        averageGold: averageGold,
        averageMinions: averageMinions,
        averageVision: averageVision,
        averageCC: averageCC,

        damageDMGPY: damageDMGPY,
        damageDPGPY: damageDPGPY,
        damageDTGPY: damageDTGPY,
        damageDHGPY: damageDHGPY,
        pointYGAKill: pointYGAKill,
        pointHGAKill: pointHGAKill,
        pointYGADeath: pointYGADeath,
        pointHGADeath: pointHGADeath,
        pointYGAAssistance: pointYGAAssistance,
        pointHGAAssistance: pointHGAAssistance
      });
    } catch(err) {
      console.log(err)
    }
  }

  const handleData = () => {
    championsInfo().then(getChampionStats);
  }
    
  return (
    <React.Fragment>
      <Header />
      <div className="flex flex-col gap-y-4 justify-around w-full h-fit sm:flex-row sm:gap-x-4">
        {/* Info del campeón */}
        <section className="flex flex-col justify-center items-center text-center w-full py-4 sm:w-fit sm:px-2">
          <img src={currentChampionImg} alt="imagen de campeón" title="imagen de campeón" id="currentChampionImg" className="my-4 max-w-[120px] sm:w-36 sm:max-w-[160px] md:w-40 sm:my-8" />
          <label htmlFor='currentChampion' className="w-fit">Selecciona un campeón:</label>
          <select name="currentChampion" id="currentChampion" className="w-32 max-w-[150px] my-2 px-1 bg-teal-100 text-teal-800 rounded-sm md:mx-2" placeholder="No hay campeones" onChange={handleData} ref={champSelection}>
            {championList.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </section>
        {/* Info de daño */}
        <section className="relative flex flex-col content-start place-items-center w-full max-w-[800px] text-sm sm:px-2 sm:text-base">
          <h2 className="my-4 text-lg text-center sm:my-6 md:my-8 sm:text-xl md:text-2xl">Daño</h2>
          <div className="relative flex flex-col w-full max-w-3xl pl-4 sm:pl-6 sm:mb-4">
            <svg viewBox="0 0 300 200" id="graphicChampion">
              <line className="stroke-teal-400 stroke-1" x1="0" y1="0" x2="0" y2="200" />
              <line className="stroke-teal-400 stroke-1" x1="0" y1="200" x2="300" y2="200" />
              <line className="stroke-teal-400 stroke-1" x1="0" y1="160" x2="300" y2="160" />
              <line className="stroke-teal-400 stroke-1" x1="0" y1="120" x2="300" y2="120" />
              <line className="stroke-teal-400 stroke-1" x1="0" y1="80" x2="300" y2="80" />
              <line className="stroke-teal-400 stroke-1" x1="0" y1="40" x2="300" y2="40" />
              <line className="stroke-teal-400 stroke-1" x1="0" y1="0" x2="300" y2="0" />
              <polyline id="damageHealChampion" strokeLinejoin='round' strokeDasharray='2px 2px' className="fill-none stroke-lime-200 stroke-2" points={stats.damageDHGPY} />
              <polyline id="damageMagicChampion" strokeLinejoin='round' className="fill-none stroke-cyan-200 stroke-2" points={stats.damageDMGPY} />
              <polyline id="damagePhysicalChampion" strokeLinejoin='round' className="fill-none stroke-rose-300 stroke-2" points={stats.damageDPGPY} />
              <polyline id="damageTrueChampion" strokeLinejoin='round' className="fill-none stroke-yellow-200 stroke-2" points={stats.damageDTGPY} />
            </svg>
            <div id="rangeGraphicChampion" className="absolute -top-2 left-0 h-full grid grid-cols-1 grid-rows-5 content-between text-[.6rem] sm:text-sm">
              <p id="damageChampionRangeMax">{abrebiaturaMaxRange(stats.maxDamage)}</p>
              <p>{abrebiaturaMaxRange(Math.round(((stats.maxDamage / 5) * 4)/100) * 100)}</p>
              <p>{abrebiaturaMaxRange(Math.round(((stats.maxDamage / 5) * 3)/100) * 100)}</p>
              <p>{abrebiaturaMaxRange(Math.round(((stats.maxDamage / 5) * 2)/100) * 100)}</p>
              <p>{abrebiaturaMaxRange(Math.round(((stats.maxDamage / 5) * 1)/100) * 100)}</p>
            </div>
            <p className="absolute -bottom-2 left-0 text-[.6rem] sm:text-sm">0</p>
          </div>
          <div className="flex flex-col w-fit h-fit p-2 my-4 bg-teal-700 text-xs border border-solid border-current sm:p-2 sm:text-sm md:mt-2 md:mr-2 lg:mt-8 md:absolute top-0 right-0">
            <div className="flex flex-row">
              <svg viewBox="0 0 105 16" className="w-20 h-6">
                <line className="fill-none stroke-cyan-200 stroke-2" x1="0" y1="8" x2="100" y2="8" strokeLinejoin='round' />
              </svg>
              <p>Mágico</p>
            </div>
            <div className="flex flex-row">
              <svg viewBox="0 0 105 16" className="w-20 h-6">
                <line className="fill-none stroke-rose-300 stroke-2" x1="0" y1="8" x2="100" y2="8" strokeLinejoin='round' />
              </svg>
              <p>Físico</p>
            </div>
            <div className="flex flex-row">
              <svg viewBox="0 0 105 16" className="w-20 h-6">
                <line className="fill-none stroke-yellow-200 stroke-2" x1="0" y1="8" x2="100" y2="8" strokeLinejoin='round' />
              </svg>
              <p>Verdadero</p>
            </div>
            <div className="flex flex-row">
              <svg viewBox="0 0 105 16" className="w-20 h-6">
                <line className="fill-none stroke-lime-200 stroke-2" x1="0" y1="8" x2="100" y2="8" strokeLinejoin='round' strokeDasharray='5px 5px' />
              </svg>
              <p>Curado</p>
            </div>
          </div>
        </section>
        {/* Info de KDA */}
        <section className="flex flex-col content-start place-items-center sm:px-2">
          <h2 className="my-4 text-lg text-center sm:my-6 md:my-8 sm:text-xl md:text-2xl">Promedios K/D/A</h2>
          <div className="relative flex flex-col w-full max-w-[220px] pl-4 mb-8 sm:w-[150px] md:w-[190px] lg:w-[220px] md:pl-6 md:mb-10">
            <svg viewBox="0 0 200 300" id="graphicKDAChampion">
              <line className="stroke-teal-400 stroke-1" x1="0" y1="0" x2="0" y2="300" />
              <line className="stroke-teal-400 stroke-1" x1="0" y1="300" x2="200" y2="300" />
              <line className="stroke-teal-400 stroke-1" x1="0" y1="240" x2="200" y2="240" />
              <line className="stroke-teal-400 stroke-1" x1="0" y1="180" x2="200" y2="180" />
              <line className="stroke-teal-400 stroke-1" x1="0" y1="120" x2="200" y2="120" />
              <line className="stroke-teal-400 stroke-1" x1="0" y1="60" x2="200" y2="60" />
              <line className="stroke-teal-400 stroke-1" x1="0" y1="0" x2="200" y2="0" />
              <rect id="pointGAKill" className="fill-orange-200" x="10" y={stats.pointYGAKill} width="60" height={stats.pointHGAKill} />
              <rect id="pointGADeath" className="fill-purple-300" x="70" y={stats.pointYGADeath} width="60" height={stats.pointHGADeath} />
              <rect id="pointGAAssistance" className="fill-cyan-200" x="130" y={stats.pointYGAAssistance} width="60" height={stats.pointHGAAssistance} />
            </svg>
            <div id="rangeKDAChampion" className="absolute -top-2 left-0 h-full grid grid-cols-1 grid-rows-5 content-between text-xs sm:text-sm">
              <p id="KDAChampionRangeMax">{stats.maxKDA}</p>
              <p>{Math.round(((stats.maxKDA / 5) * 4)*100)/ 100}</p>
              <p>{Math.round(((stats.maxKDA / 5) * 3)*100)/ 100}</p>
              <p>{Math.round(((stats.maxKDA / 5) * 2)*100)/ 100}</p>
              <p>{Math.round(((stats.maxKDA / 5) * 1)*100)/ 100}</p>
            </div>
            <p className="absolute -bottom-2 left-0 text-sm">0</p>
            <div className="absolute -bottom-6 right-0 w-9/12 grid grid-cols-3 grid-rows-1 justify-evenly text-xs sm:text-sm">
              <p id="rangeChampionAverageK">{stats.averageKill}</p>
              <p id="rangeChampionAverageD">{stats.averageDeath}</p>
              <p id="rangeChampionAverageA">{stats.averageAssistance}</p>
            </div>
          </div>
        </section>
      </div>
      <div className="flex flex-col gap-y-8 w-full h-fit items-center py-4 mt-8 text-sm text-center sm:py-0 sm:mt-16 md:text-base sm:flex-row sm:gap-x-4">
        {/* TOTALES */}
        <section className="relative flex flex-col content-start place-items-center gap-y-4 w-fit mx-auto pb-4 pt-8 sm:px-2 border-2 border-solid border-current">
          <div className="absolute -top-4 inset-x-0 flex justify-center">
            <p className="w-fit text-lg bg-teal-700 px-2 sm:text-xl">Totales</p>
          </div>
          <div className="flex flex-col md:block">
            <label htmlFor="setTotHoursPlayed" className="w-fit mx-4">Tiempo jugado:</label>
            <input type="text" value={stats.totHoursPlayed} readOnly id="setTotHoursPlayed" className="w-24 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-28 md:mx-2" />
          </div>
          <div className="flex flex-col md:block">
            <label htmlFor="setTotGamesPlayed" className="w-fit mx-4">Partidas jugadas:</label>
            <input type="text" value={stats.totGames} readOnly id="setTotGamesPlayed" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
          </div>
          <div className="flex flex-col md:block">
            <label htmlFor="setTotFirstBlood" className="w-fit mx-4">Primera sangre:</label>
            <input type="text" value={stats.totFirstBlood} readOnly id="setTotFirstBlood" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
          </div>
          <div className="flex flex-col md:block">
            <label htmlFor="setTotVictory" className="w-fit mx-4">Vitorias:</label>
            <input type="text" value={stats.totWin} readOnly id="setTotVictory" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
          </div>
        </section>
        {/* MAXIMOS */}
        <section className="relative flex flex-col content-start place-items-center gap-y-4 w-fit mx-auto pb-4 pt-8 sm:px-2 border-2 border-solid border-current">
          <div className="absolute -top-4 inset-x-0 flex justify-center">
            <p className="w-fit text-lg bg-teal-700 px-2 sm:text-xl">Máximos</p>
          </div>
          <div className="flex flex-col md:block">
            <label htmlFor="setMaxKDA" className="w-fit mx-4">K, D and A: </label>
            <input type="text" value={`${stats.maxKill}/${stats.maxDeath}/${stats.maxAssist}`} readOnly id="setMaxKDA" className="w-24 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-28 md:mx-2" />
          </div>
          <div className="flex flex-col md:block">
            <label htmlFor="setMaxGold" className="w-fit mx-4">Oro ganado: </label>
            <input type="text" value={stats.maxGold} readOnly id="setMaxGold" className="w-24 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-28 md:mx-2" />
          </div>
          <div className="flex flex-col md:block">
            <label htmlFor="setMaxMinions" className="w-fit mx-4">Súbditos matados: </label>
            <input type="text" value={stats.maxMinions} readOnly id="setMaxMinions" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
          </div>
          <div className="flex flex-col md:block">
            <label htmlFor="setMaxVision" className="w-fit mx-4">Puntos de visión: </label>
            <input type="text" value={stats.maxVision} readOnly id="setMaxVision" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
          </div>
          <div className="flex flex-col md:block">
            <label htmlFor="setMaxControl" className="w-fit mx-4">Control de masa: </label>
            <input type="text" value={stats.maxCC} readOnly id="setMaxControl" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
          </div>
        </section>
        {/* PROMEDIOS */}
        <section className="relative flex flex-col content-start place-items-center gap-y-4 w-fit mx-auto pb-4 pt-8 sm:px-2 border-2 border-solid border-current">
          <div className="absolute -top-4 inset-x-0 flex justify-center">
            <p className="w-fit text-lg bg-teal-700 px-2 sm:text-xl">Promedios</p>
          </div>
          <div className="flex flex-col md:block">
            <label htmlFor="setAverageGold" className="w-fit mx-4">Oro ganado: </label>
            <input type="text" value={stats.averageGold} readOnly id="setAverageGold" className="w-24 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-28 md:mx-2" />
          </div>
          <div className="flex flex-col md:block">
            <label htmlFor="setAverageMinions" className="w-fit mx-4">Súbditos matados: </label>
            <input type="text" value={stats.averageMinions} readOnly id="setAverageMinions" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
          </div>
          <div className="flex flex-col md:block">
            <label htmlFor="setAverageVision" className="w-fit mx-4">Puntos de visión: </label>
            <input type="text" value={stats.averageVision} readOnly id="setAverageVision" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
          </div>
          <div className="flex flex-col md:block">
            <label htmlFor="setAverageControl" className="w-fit mx-4">Contol de masas: </label>
            <input type="text" value={stats.averageCC} readOnly id="setAverageControl" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
          </div>
        </section>
      </div>
    </React.Fragment>
  )
}

export default ChampionStats;