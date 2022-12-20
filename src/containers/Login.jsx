import React, {useState, useEffect, useRef, useContext} from 'react';
import LoginConfirmation from '../components/LoginConfirmation.jsx';
import Header from '../components/Header.jsx';
import useGetVersion from '../hooks/useGetVersion.js';
import useGetSummonerInfo from '../hooks/useGetSummonerInfo.js';
import AppContext from '../context/AppContext';
import axios from 'axios';
import { ErrorResponse, getStaticContextFromError } from '@remix-run/router';

const Login = () => {
  // const API = `${process.env.API_KEY}`;
  // console.log(`1) ...${process.env.OSO}`);
  const API_KEY = 'RGAPI-a4d7cfb4-b941-4d2f-b7ea-77aa937a00ff';

  const [lastVersion, setLastVersion] = useState('');
  const [headerToggle, setHeaderToggle] = useState(false);
  const [summonerInfo, setSummonerInfo] = useState({
        version: '',
        region: '',
        platform: '',
        language: '',
        puuid: '',
        name: '',
        level: null,
        iconURL: `http://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/4368.png`,
        status: 0
  });
  const [matchIdList, setMatchIdList] = useState([]);
  const [matchInfo, setMatchInfo] = useState([]);
  const [loadingMatchInfo, setLoadingMatchInfo] = useState('');
  

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
  versionInfo();
  
  const loginForm = useRef(null);
  const getFormInfo = (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm.current);
    const loginData = {
      version: lastVersion,
      summonerName: formData.get('summonerName').toLowerCase().replaceAll(' ', ''),
      summonerRegion: formData.get('summonerRegion'),
      summonerPlatform: formData.get('summonerPlatform'),
      summonerLanguage: formData.get('summonerLanguage')
    }
    getSummonerInfo(loginData.summonerName, loginData.summonerRegion, loginData.summonerPlatform, loginData.summonerLanguage);
  }
  const getmatchesInfo = (event) => {
    event.preventDefault();
    if(summonerInfo.status === 200){
      matchesinfo();
    }
    
  }

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
        iconURL: `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/profileicon/${dataSummoner.profileIconId}.png`,
        status: resultSummoner.status
      }
      setSummonerInfo(summonerData);

      if(resultSummoner.status !== 200) {
        console.log(`Error: ${resultSummoner.status}; ${dataSummoner.message}`);
      } else {
        console.log("No error getting summoner's data");
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
        iconURL: `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/profileicon/4368.png`,
        status: 400
      }
      setSummonerInfo(summonerData);
    }
  }
  
  async function matchesinfo() {
    try {
      setLoadingMatchInfo('loading');
      const matches_URL = `https://${summonerInfo.region}/lol/match/v5/matches/by-puuid/${summonerInfo.puuid}/ids?api_key=${API_KEY}`;
      const resultMatches = await fetch(matches_URL);
      const dataMatches = await resultMatches.json();
      for(let i=0; i<dataMatches.length; i++){
        let individualMatchId = dataMatches[i];
        const match_URL = `https://${summonerInfo.region}/lol/match/v5/matches/${individualMatchId}?api_key=${API_KEY}`;
        const resultMInfo = await fetch(match_URL);
        const dataMInfo = await resultMInfo.json();
        dataMInfo.info.participants.forEach(element => { 
          if(element.puuid === summonerInfo.puuid && element.timePlayed > 1000 && dataMInfo.info.gameMode === "CLASSIC"){
            if(!(matchIdList.includes(individualMatchId))) {
              let addMatchId = matchIdList;
              addMatchId.push(individualMatchId);
              setMatchIdList(addMatchId);
              let addDataMatches = matchInfo;
              addDataMatches.push({
                matchId: individualMatchId,
                summonerInfo: summonerInfo,
                championName: element.championName,
                position: element.individualPosition,
                Kills: element.kills,
                deaths: element.deaths,
                assists: element.assists,
                timeOfGame: element.timePlayed,
                timePlayed: element.timePlayed - element.totalTimeCCDealt - element.totalTimeSpentDead,
                gold: element.goldEarned,
                minions: element.totalMinionsKilled,
                firstBlood: element.firstBloodKill,
                victory: element.win,
                cCing: element.timeCCingOthers,
                physicalDamageDealt: element.physicalDamageDealtToChampions,
                magicDamageDealt: element.magicDamageDealtToChampions,
                trueDamageDealt: element.trueDamageDealtToChampions,
                healDamage: element.totalHeal,
                physicalDamageTaken: element.physicalDamageTaken,
                magicDamageTaken: element.magicDamageTaken,
                trueDamageTaken: element.trueDamageTaken,
                vision: element.visionScore
              });
              setMatchInfo(addDataMatches);
            }
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
        console.log("No errors getting the matches' data");
      }
    } catch(err) { 
      console.log(err);
      clearConsole();
    } finally{
      if(headerToggle === false){
        setHeaderToggle(true);
        setLoadingMatchInfo('');
      }
    }
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      getFormInfo(event);
    }
  };

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
      <h1 className="pt-4 text-2xl text-center sm:pt-6 sm:text-3xl">Login</h1>
      <div className="flex flex-col space-y-8 justify-center content-center items-center px-4 py-8 md:flex-row md:space-x-16 lg:space-x-32 sm:space-y-0 sm:py-12">

        <form className="w-fit h-fit flex flex-col items-start" action="/" ref={loginForm}>
          <label className="w-fit">
            Ingresa tu nombre de jugador:
            <input name="summonerName" id="summonerName" className="my-2 px-1 bg-teal-100 text-teal-800 rounded-sm sm:my-0 sm:mx-2" onKeyDown={handleKeyDown} />
          </label>
          <i className="text-xs sm:text-sm">No importa si colocas o no espacios, mayúsculas o minúsculas.</i>
          <label className="w-fit mt-4">
            Selecciona tu region:
            <select defaultValue={"americas.api.riotgames.com"} name="summonerRegion" id="summonerRegion" className="my-2 px-1 bg-teal-100 text-teal-800 rounded-sm sm:my-0 sm:mx-2">
              <option value="americas.api.riotgames.com">America</option>
              <option value="asia.api.riotgames.com">Asia</option>
              <option value="europe.api.riotgames.com">Europa</option>
              <option value="sea.api.riotgames.com">Sudeste Asiático</option>
            </select>
          </label>
          <label className="w-fit mt-4">
            Selecciona tu plataforma:
            <select defaultValue={"la1.api.riotgames.com"} name="summonerPlatform" id="summonerPlatform" className="my-2 px-1 bg-teal-100 text-teal-800 rounded-sm sm:my-0 sm:mx-2">
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
          </label>
          <label className="w-fit mt-4">
            Selecciona un lenguaje:
            <select defaultValue={"es_MX"} name="summonerLanguage" id="summonerLanguage" className="my-2 px-1 bg-teal-100 text-teal-800 rounded-sm sm:my-0 sm:mx-2">
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
          </label>
          <button type="button" id="verifyLoginButton" className="w-fit self-center mt-8 px-4 py-2 border border-solid border-current rounded-md" onClick={getFormInfo}>Verificar</button>
        </form>

        <LoginConfirmation 
          summonerInfo = {summonerInfo}
          onClick = {getmatchesInfo}
          loadingMatchInfo = {loadingMatchInfo}
        />

      </div>
    </React.Fragment>
  );
}

export default Login;

/* https://developer.mozilla.org/en-US/docs/Web/API/FormData */