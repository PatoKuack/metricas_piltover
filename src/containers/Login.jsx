import React, {useState, useEffect, useRef, useContext} from 'react';
import LoginConfirmation from '../components/LoginConfirmation.jsx';
import Header from '../components/Header.jsx';
import AppContext from '../context/AppContext.js';
import { ErrorResponse, getStaticContextFromError } from '@remix-run/router';
import { NavLink } from 'react-router-dom';

const Login = () => {

  // const API_KEY = `${process.env.API_KEY}`;
  // console.log(`variable de ambiente: ...${process.env.OSO}`);
  const API_KEY = 'RGAPI-f9ce70c3-0ec9-4829-bd28-1a7e8c08d054';

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
    confirmationSaveData,
    setConfirmationSaveData
  } = useContext(AppContext);

  /*
  const [API_KEY, setAPI_KEY] = useState(`${process.env.API_KEY}`);
  const getApiKey = useRef(`${process.env.API_KEY}`);
  function getKey() {
    let key = getApiKey.current.value;
    setAPI_KEY(key);
  }
  */

  const version_URL = "https://ddragon.leagueoflegends.com/api/versions.json";
  async function versionInfo() {
    try {
      const resultVersion = await fetch(version_URL);
      const dataVersion = await resultVersion.json();
      setLastVersion(dataVersion[0]);

      if(resultVersion.status !== 200) {
        console.log(`Error: ${resultVersion.status}; ${dataVersion.message}`);
      } else {
        console.log("No error getting the version");
      }
    } catch(err) { console.log(err) }
  }

  function getLSItem(itemName, itemTypeValue, itemSetState) {
    try {
      const localStorageItem = localStorage.getItem(itemName);
      let parsedItem;
      if(!localStorageItem) {
        localStorage.setItem(itemName, JSON.stringify(itemTypeValue));
        parsedItem = itemTypeValue;
      } else {
        parsedItem = JSON.parse(localStorageItem);
      }
      itemSetState(parsedItem);
    } catch(error) {
      console.log(error);
    }
  }
  
  const confirmSaveData = useRef(false);
  function changeConfirmationSaveData() {
    if(!localStorage.LOL_DATA_V2) {
      getLSItem('LOL_LIST_V2', [], setMatchIdList);
      getLSItem('LOL_DATA_V2', [], setMatchInfo);
    }
    setConfirmationSaveData(confirmSaveData.current.checked);
  }
  const saveLSItem = (itemName, newItem, itemSetState) => {
    try {
      if(confirmationSaveData) {
        const stringifyItem = JSON.stringify(newItem);
        localStorage.setItem(itemName, stringifyItem);
        itemSetState(newItem);
      }
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    versionInfo();
  }, []);
  
  const loginForm = useRef(null);
  const getFormInfo = (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm.current);
    /* Si no carga todo el nombre del campo, es decir, si carga "xox" y no "xoxo", se utilizará el useRef : */
    let currentSummonerName;
    if (inputSummonerName.current.value !== formData.get('summonerName')) {
      currentSummonerName = inputSummonerName.current.value;
    } else {
      currentSummonerName = formData.get('summonerName');
    }
    /* ----------------------------- */
    const loginData = {
      version: lastVersion,
      summonerName: currentSummonerName.toLowerCase().replaceAll(' ', ''),
      summonerRegion: formData.get('summonerRegion'),
      summonerPlatform: formData.get('summonerPlatform'),
      summonerLanguage: formData.get('summonerLanguage')
    }
    getSummonerInfo(loginData.summonerName, loginData.summonerRegion, loginData.summonerPlatform, loginData.summonerLanguage);
  }
  const getmatchesInfo = (event) => {
    event.preventDefault();
    displacement();
    if(summonerInfo.status === 200){
      setLoadingMatchInfo(true);
      if(headerToggle === false){
        setHeaderToggle(true);
        displacement();
      }
      matchesInfo();
    }
  }

  const inputSummonerName = useRef("");
  async function getSummonerInfo( sName, sRegion, sPlatform, sLanguage ) {
    try {
      const summoner_URL =`https://${sPlatform}/lol/summoner/v4/summoners/by-name/${sName}?api_key=${API_KEY}`;
      const resultSummoner = await fetch(summoner_URL);
      const dataSummoner = await resultSummoner.json();
      const summonerData = {
        version: lastVersion,
        region: sRegion,
        platform: sPlatform,
        language: sLanguage,
        puuid: dataSummoner.puuid,
        name: dataSummoner.name,
        level: dataSummoner.summonerLevel,
        iconURL: `https://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/profileicon/${dataSummoner.profileIconId}.png`,
        status: resultSummoner.status
      }

      if(resultSummoner.status !== 200) {
        console.log(`Error: ${resultSummoner.status}; ${dataSummoner.message}`);
      } else {
        console.log("No error getting summoner's data");
        setSummonerInfo(summonerData);
      }
    } catch(err) {
      console.log(err);
      clearConsole();

      const summonerData = {
        version: '',
        region: '',
        platform: '',
        language: '',
        puuid: '',
        name: '¿?',
        level: '¿?',
        iconURL: `https://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/profileicon/4368.png`,
        status: 400
      }
      setSummonerInfo(summonerData);
    }
  }
  
  async function matchesInfo() {
    try {
      const matches_URL = `https://${summonerInfo.region}/lol/match/v5/matches/by-puuid/${summonerInfo.puuid}/ids?api_key=${API_KEY}`;
      const resultMatches = await fetch(matches_URL);
      const dataMatches = await resultMatches.json();
      let addDataMatches = matchInfo;
      let addMatchId = matchIdList;
      for(let i=(dataMatches.length - 1); i>=0; i--){
        let individualMatchId = dataMatches[i];
        const match_URL = `https://${summonerInfo.region}/lol/match/v5/matches/${individualMatchId}?api_key=${API_KEY}`;
        const resultMInfo = await fetch(match_URL);
        const dataMInfo = await resultMInfo.json();
        const gameVersion = dataMInfo.info.gameVersion;
        dataMInfo.info.participants.forEach(element => { 
          if((element.puuid === summonerInfo.puuid) && (element.timePlayed > 900) && (dataMInfo.info.gameMode === "CLASSIC") && (element.gameEndedInEarlySurrender === false)){
            if(!(addMatchId.includes(`${individualMatchId}${summonerInfo.name.toLowerCase().replaceAll(' ', '')}`))) {
              addMatchId.push(`${individualMatchId}${summonerInfo.name.toLowerCase().replaceAll(' ', '')}`);
              addDataMatches.push({
                matchId: individualMatchId,
                summonerInfo: summonerInfo,
                gameVersion: gameVersion,
                championName: element.championName,
                position: element.individualPosition,
                teamPosition: element.teamPosition,
                role: element.role,
                Kills: element.kills,
                deaths: element.deaths,
                assists: element.assists,
                timeOfGame: element.timePlayed,
                timePlayed: element.timePlayed - element.totalTimeCCDealt - element.totalTimeSpentDead,
                gold: element.goldEarned,
                goldSpent: element.goldSpent,
                minions: element.totalMinionsKilled,
                firstBlood: element.firstBloodKill,
                victory: element.win,
                cCing: element.timeCCingOthers,
                physicalDamageDealt: element.physicalDamageDealtToChampions,
                magicDamageDealt: element.magicDamageDealtToChampions,
                trueDamageDealt: element.trueDamageDealtToChampions,
                healDamage: element.totalHeal,
                healDamageOnTeammates: element.totalHealsOnTeammates,
                shieldDamageOnTeammates: element.totalDamageShieldedOnTeammates,
                physicalDamageTaken: element.physicalDamageTaken,
                magicDamageTaken: element.magicDamageTaken,
                trueDamageTaken: element.trueDamageTaken,
                vision: element.visionScore,
                earlySurrender: element.gameEndedInEarlySurrender,
                selfMitigatedDamage: element.damageSelfMitigated,
                consumablesPurchased: element.consumablesPurchased,
                item0: element.item0,
                item1: element.item1,
                item2: element.item2,
                item3: element.item3,
                item4: element.item4,
                item5: element.item5,
                item6: element.item6,
                pentakills: element.pentakills,
                spell1Casts: element.summoner1Casts,
                spell1Id: element.summoner1Id,
                spell2Casts: element.summoner2Casts,
                spell2Id: element.summoner2Id
              });
              // console.log("pos: "+element.individualPosition+" teamPos: "+element.teamPosition+" role: "+element.role);
            }
            // console.log(dataMInfo.info.gameType);
          }
        });
        if(resultMInfo.status !== 200) {
          console.log(resultMInfo.status + dataMInfo.message);
        } else {
          // console.log(dataMInfo.info.participants);
          // console.log(addDataMatches);
          // console.log(match_URL);
        }
      }
      
      if(resultMatches.status !== 200) {
        console.log(resultMatches.status + dataMatches.message);
      } else{
        saveLSItem('LOL_DATA_V2', addDataMatches, setMatchInfo);
        saveLSItem('LOL_LIST_V2', addMatchId, setMatchIdList);
        // console.log(matchInfo);
        console.log("No errors getting the matches' data");
      }
    } catch(err) { 
      console.log(err);
      clearConsole();
    } finally{
      setLoadingMatchInfo(false);
      alert('Se cargaron los datos de tus partidas 5v5 que duraron más de 15 minutos. 😉');
    }
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      getFormInfo(event);
    }
  };

  function displacement() {
    // const displace = document.body.clientHeight - screen.height ;
    const displace = screen.height;
    setTimeout(() => {
      window.scroll({
        top: displace,
        left: 0,
        behavior: 'smooth'
      });
    }, 500)
  }

  function clearConsole() {
    if (typeof console._commandLineAPI !== 'undefined') {
      console.API = console._commandLineAPI;
    } else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
      console.API = console._inspectorCommandLineAPI;
    } else if (typeof console.clear !== 'undefined') {
      console.API = console;
    }

    if (console.API) {
      setTimeout(console.API.clear.bind(console));
    }
  }

  return (
    <React.Fragment>
      {headerToggle && <Header />}
      <h1 className="pt-6 text-2xl text-center sm:text-3xl">Acceso al perfil</h1>
      <p className='p-2 mx-auto my-4 text-xs text-center text-amber-200 italic bg-gradient-to-r from-gray-800 via-gray-800 rounded-md rounded-md sm:text-sm sm:max-w-[500px]'>
        Solo se cargan los datos de las últimas 20 partidas que durarón más de 15:00 minutos y que hayan sido clasicas 5v5 o clasificatorias.
      </p>
      {/* <p className='p-2 mx-auto my-4 text-xs text-center text-amber-200 italic bg-gradient-to-r from-gray-800 via-gray-800 rounded-md rounded-md sm:text-sm sm:max-w-[500px]'><b>Métricas Piltover</b> is <b>not endorsed</b> by <b>Riot Games</b> and does not reflect the views or opinions of <b>Riot Games</b> or anyone officially involved in producing or managing Riot Games properties. Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc.</p> */}
      {/* <p className='p-2 mx-auto my-4 text-xs text-center text-amber-200 italic bg-gradient-to-r from-gray-800 via-gray-800 rounded-md rounded-md sm:text-sm sm:max-w-[500px]'>
        <b>Métricas Piltover no cuenta</b> con el respaldo de <b>Riot Games</b> y <b>no refleja</b> los puntos de vista ni las opiniones de <b>Riot Games</b> ni de ninguna persona involucrada oficialmente en la producción o administración de las propiedades de Riot Games. Riot Games y todas las propiedades asociadas son marcas comerciales o marcas comerciales registradas de Riot Games, Inc.<br/>
        <button className='mt-1 border border-gray-400 border-solid rounded-md bg-teal-600 shadow-md shadow-gray-500 hover:bg-teal-700 hover:shadow-gray-600 active:bg-teal-800 active:shadow-transparent' >
          <NavLink to={ '/riot.txt' } className="block px-2 py-1">
            Ver riot.txt
          </NavLink>
        </button>
      </p> */}

      <div className="flex flex-col space-y-8 justify-center content-center items-center w-fit max-w-[100vw] mx-auto px-4 py-8 md:flex-row md:space-x-16 lg:space-x-32 md:space-y-0 sm:py-12">

        <form className="w-fit h-fit flex flex-col items-start" action="/" ref={loginForm}>
          <div className="flex flex-col w-fit sm:flex-row sm:mt-4">
            <label htmlFor="summonerName" className="w-fit mr-2">Ingresa tu nombre de jugador:</label>
            <input name="summonerName" id="summonerName" className="min-w-min max-w-fit my-2 px-1 bg-teal-100 text-teal-800 rounded-sm sm:my-0 sm:mx-2" placeholder="ej: xoxo" ref={inputSummonerName} onKeyDown={handleKeyDown} onChange={getFormInfo} />
          </div>
          <p className="text-xs max-w-[218px] px-2 py-1 italic bg-gradient-to-r from-gray-800 via-gray-800 rounded-md sm:text-sm sm:max-w-full sm:mt-1">No importa si colocas o no espacios, mayúsculas o minúsculas.</p>
          <div className="flex flex-col w-fit sm:flex-row sm:mt-4">
            <label htmlFor="summonerRegion" className="w-fit mr-2">Selecciona tu región/continente:</label>
            <select defaultValue={"americas.api.riotgames.com"} name="summonerRegion" id="summonerRegion" className="min-w-min max-w-fit my-2 px-1 bg-teal-100 text-teal-800 rounded-sm sm:my-0" onChange={getFormInfo}>
              <option value="americas.api.riotgames.com">America</option>
              <option value="asia.api.riotgames.com">Asia</option>
              <option value="europe.api.riotgames.com">Europa</option>
              <option value="sea.api.riotgames.com">Sudeste Asiático</option>
            </select>
          </div>
          <div className="flex flex-col w-fit sm:flex-row sm:mt-4">
            <label htmlFor="summonerPlatform" className="w-fit mr-2">Selecciona tu plataforma:</label>
            <select defaultValue={"la1.api.riotgames.com"} name="summonerPlatform" id="summonerPlatform" className="min-w-min max-w-fit my-2 px-1 bg-teal-100 text-teal-800 rounded-sm sm:my-0 sm:mx-2" onChange={getFormInfo}>
              <option value="br1.api.riotgames.com">Brasil</option>
              <option value="eun1.api.riotgames.com">Europa Nórdica y Este</option>
              <option value="euw1.api.riotgames.com">Europa Oeste</option>
              <option value="jp1.api.riotgames.com">Japón</option>
              <option value="kr.api.riotgames.com">República de Corea</option>
              <option value="la1.api.riotgames.com">Latinoamérica Norte</option>
              <option value="la2.api.riotgames.com">Latinoamérica Sur</option>
              <option value="na1.api.riotgames.com">Norteamérica</option>
              <option value="oc1.api.riotgames.com">Oceanía</option>
              <option value="tr1.api.riotgames.com">Turquía</option>
              <option value="ru.api.riotgames.com">Rusia</option>
            </select>
          </div>
          <div className="flex flex-col w-fit sm:flex-row sm:mt-4">
            <label htmlFor="summonerLanguage" className="w-fit mr-2">Selecciona un lenguaje:</label>
            <select defaultValue={"es_MX"} name="summonerLanguage" id="summonerLanguage" className="min-w-min max-w-fit my-2 px-1 bg-teal-100 text-teal-800 text-sm rounded-sm sm:my-0 sm:mx-2 sm:text-base" onChange={getFormInfo}>
              <option value="cs_CZ">čeština (Českoc)</option>
              <option value="el_GR">Ελληνικά (Ελλάδα)</option>
              <option value="pl_PL">Română (România)</option>
              <option value="ro_RO">Romanian (Romania)</option>
              <option value="hu_HU">Magyar (Magyarország)</option>
              <option value="en_GB">English (United Kingdom)</option>
              <option value="de_DE">Deutsch (Dytschland)</option>
              <option value="es_ES">Español (España)</option>
              <option value="it_IT">Italiano (Italia)</option>
              <option value="fr_FR">Français (France)</option>
              <option value="ja_JP">日本語 (日本)</option>
              <option value="ko_KR">한국인 (한국)</option>
              <option value="es_MX">Español (México)</option>
              <option value="es_AR">Español (Argentina)</option>
              <option value="pt_BR">Português (Brasil)</option>
              <option value="en_US">English (United States)</option>
              <option value="en_AU">English (Australia)</option>
              <option value="ru_RU">Русский (Россия)</option>
              <option value="tr_TR">Türkçe (Türkiye)</option>
              <option value="ms_MY">Melayu (Malaysia)</option>
              <option value="en_PH">Ingles (Republika ng Pilipinas)</option>
              <option value="en_SG">Englisc (Singapore)</option>
              <option value="th_TH">ไทย (ประเทศไทย)</option>
              <option value="vn_VN">Tiếng Việt (Việt Nam)</option>
              <option value="id_ID">Indonesia (Indonesia)</option>
              <option value="zh_MY">Melayu (Malaysia)</option>
              <option value="zh_CN">中文 (中國)</option>
              <option value="zh_TW">ภาษาจีนกลาง (ประเทศไต้หวัน)</option>
            </select>
          </div>
          <div className="flex flex-col w-fit sm:flex-row sm:mt-4">
            <label htmlFor="saveData" className="w-fit mr-2">Guardar datos al cargarlos: </label>
            <div className="relative w-6 h-6 px-1 py-0 mx-0 my-2 bg-teal-200 rounded-sm sm:my-0">
              <input type="checkbox" name="saveData" id="saveData" className="absolute right-0 top-0 w-6 h-6 cursor-pointer opacity-40" ref={confirmSaveData} onChange={changeConfirmationSaveData} />
            </div>
          </div>
          <p className="text-xs max-w-[218px] px-2 py-1 italic bg-gradient-to-r from-gray-800 via-gray-800 rounded-md sm:text-sm sm:max-w-full sm:mt-1">
            Esta última opción guarda los datos en tu navegador para que puedas <br/>
            visualizarlos en el futuro junto con los datos de nuevas partidas. 👀
          </p>
          {/* className="w-fit self-center mt-8 px-4 py-2 bg-teal-600 border border-solid border-current rounded-md shadow-md shadow-gray-300 hover:bg-teal-700 hover:shadow-gray-400 active:bg-teal-800 active:shadow-transparent" */}
        </form>

        <LoginConfirmation 
          status = {summonerInfo.status}
          iconURL = {summonerInfo.iconURL}
          name = {summonerInfo.name}
          level = {summonerInfo.level}
          onclick = {getmatchesInfo}
          loadingMatchInfo = {loadingMatchInfo}
        />

      </div>

        <p className={`text-center animate-[moveto_1s_cubic-bezier(.56,.85,.85,1.35)_1] md:animate-[moveto_2s_cubic-bezier(.56,.85,.85,1.35)_1] ${headerToggle ? 'block' : 'hidden'}`}><span className='block max-w-fit px-2 py-1 mx-auto bg-gradient-to-l from-gray-800 via-gray-800 rounded-md sm:inline'>Puedes ver tus estadísticas desde el menú. ☝🤓</span></p>
    </React.Fragment>
  );
}

export default Login;

// to get summoner spells name with id:
// "https://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/summoner.json"
// to get summoner spells image with name:
// "https://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/SummonerDot.png"
// to get items image with id:
// "https://ddragon.leagueoflegends.com/cdn/12.23.1/img/item/3853.png"

// "https://developer.mozilla.org/en-US/docs/Web/API/FormData
// "https://ed.team/blog/que-es-y-como-utilizar-localstorage-y-sessionstorage"


/* 
version
https://ddragon.leagueoflegends.com/api/versions.json

puuid
https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/patokuack?api_key=

matchesId
https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/BVX2rvI9w7Q4e_L6wR8rj_FF46hUzyKJYd6_qYsSYQEjSaCshX_8S1Ccvs-fFvaH2KfjA15B5ZyYCQ/ids?api_key=

matchInfo
https://americas.api.riotgames.com/lol/match/v5/matches/LA1_1350783110?api_key=

useRef, ref (hooks)
https://reactjs.org/docs/hooks-reference.html#useref
 */