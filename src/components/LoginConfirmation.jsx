import React from 'react';

function LoginConfirmation(props) {
  return (
    <section className="flex flex-col text-center place-items-center">
      <p className="max-w-[128px] py-2 text-sm">{props.status === 0 ? 'Verifica tu perfil' : props.status === 200 ? 'Da clic en el perfil para cargar tus datos' : 'Jugador no encontrado'}</p>
      <button type="button" onClick={props.onclick} className="w-fit mx-auto p-4 bg-teal-600 flex flex-col justify-center place-items-center rounded md:p-8 sm:p-6">
        <img id='showSummonerImg' className={`w-24 h-24 mb-2 self-center border-2 border-double border-current rounded-full sm:w-32 sm:h-32 ${props.loadingMatchInfo && 'animate-spin'}`} src={props.iconURL} title="icono de usuario" alt="icono de usuario" />
        <p>{props.name}</p>
        <p className="text-teal-100">{props.level}</p>
      </button>
    </section>
  )
}

export default LoginConfirmation;