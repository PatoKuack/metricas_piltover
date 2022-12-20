import React from 'react';
import AppContext from '../context/AppContext';

const LoginConfirmation = ({summonerInfo, onClick, loadingMatchInfo}) => {
  return (
    <section className="flex flex-col place-items-center">
      <p className="max-w-[128px] py-2 text-center text-sm">{summonerInfo.status === 0 ? 'Verifica tu perfil' : summonerInfo.status === 200 ? 'Da clic en el perfil para cargar tus datos' : 'Jugador no encontrado'}</p>
      <button type="button" onClick={onClick} className="w-fit mx-auto p-4 bg-teal-600 flex flex-col justify-center rounded md:p-8 sm:p-6">
        <img id='showSummonerImg' className={loadingMatchInfo === '' ? "w-24 h-24 mb-2 self-center border-2 border-double border-current rounded-full sm:w-32 sm:h-32" : "w-24 h-24 mb-2 self-center border-2 border-double border-current rounded-full sm:w-32 sm:h-32 animate-spin"} src={summonerInfo.iconURL} title="icono de usuario" alt="icono de usuario" />
        <p>Usuario: {summonerInfo.name}</p>
        <p className="text-teal-100">Nivel: {summonerInfo.level}</p>
      </button>
    </section>
  )
}

export default LoginConfirmation;