import React from 'react'

const ChampionStats = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col gap-y-4 justify-around w-full h-fit sm:flex-row sm:gap-x-4">
      {/* Info del campeón */}
      <section className="flex flex-col justify-center items-center text-center w-full py-4 sm:w-fit sm:px-2">
        <img src="" alt="imagen de campeón" title="imagen de campeón" id="showChampionImg" className="my-4 sm:w-36 md:w-40 sm:my-8" />
        <label htmlFor='showChampion' className="w-fit">Selecciona un campeón:</label>
        <select name="showChampion" id="showChampion" className="w-32 max-w-[150px] my-2 px-1 bg-teal-100 text-teal-800 rounded-sm md:mx-2">
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
            <polyline id="damageHealChampion" stroke-linejoin="round" stroke-dasharray="2px 2px" className="fill-none stroke-lime-200 stroke-2" />
            <polyline id="damageMagicChampion" stroke-linejoin="round" className="fill-none stroke-cyan-200 stroke-2" />
            <polyline id="damagePhysicalChampion" stroke-linejoin="round" className="fill-none stroke-rose-300 stroke-2" />
            <polyline id="damageTrueChampion" stroke-linejoin="round" className="fill-none stroke-yellow-200 stroke-2" />
          </svg>
          <div id="rangeGraphicChampion" className="absolute -top-2 left-0 h-full grid grid-cols-1 grid-rows-5 content-between text-[.6rem] sm:text-sm">
            <p id="damageChampionRangeMax"></p>
          </div>
          <p className="absolute -bottom-2 left-0 text-[.6rem] sm:text-sm">0</p>
        </div>
        <div className="flex flex-col w-fit h-fit p-2 my-4 bg-teal-700 text-xs border border-solid border-current sm:p-2 sm:text-sm md:mt-2 md:mr-2 lg:mt-8 md:absolute top-0 right-0">
          <div className="flex flex-row">
            <svg viewBox="0 0 105 16" className="w-20 h-6">
              <line className="fill-none stroke-cyan-200 stroke-2" x1="0" y1="8" x2="100" y2="8" stroke-linejoin="round" />
            </svg>
            <p>Mágico</p>
          </div>
          <div className="flex flex-row">
            <svg viewBox="0 0 105 16" className="w-20 h-6">
              <line className="fill-none stroke-rose-300 stroke-2" x1="0" y1="8" x2="100" y2="8" stroke-linejoin="round" />
            </svg>
            <p>Físico</p>
          </div>
          <div className="flex flex-row">
            <svg viewBox="0 0 105 16" className="w-20 h-6">
              <line className="fill-none stroke-yellow-200 stroke-2" x1="0" y1="8" x2="100" y2="8" stroke-linejoin="round" />
            </svg>
            <p>Verdadero</p>
          </div>
          <div className="flex flex-row">
            <svg viewBox="0 0 105 16" className="w-20 h-6">
              <line className="fill-none stroke-lime-200 stroke-2" x1="0" y1="8" x2="100" y2="8" stroke-linejoin="round" stroke-dasharray="5px 5px" />
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
            <rect id="graphicAverageKill" className="fill-orange-200" x="10" width="60" />
            <rect id="graphicAverageDeath" className="fill-purple-300" x="70" y="240" width="60" height="60" />
            <rect id="graphicAverageAssistance" className="fill-cyan-200" x="130" y="240" width="60" height="60" />
          </svg>
          <div id="rangeKDAChampion" className="absolute -top-2 left-0 h-full grid grid-cols-1 grid-rows-5 content-between text-xs sm:text-sm">
            <p id="KDAChampionRangeMax"></p>
          </div>
          <p className="absolute -bottom-2 left-0 text-sm">0</p>
          <div className="absolute -bottom-6 right-0 w-9/12 grid grid-cols-3 grid-rows-1 justify-evenly text-xs sm:text-sm">
            <p id="rangeChampionAverageK"></p>
            <p id="rangeChampionAverageD"></p>
            <p id="rangeChampionAverageA"></p>
          </div>
        </div>
      </section>
    </div>
    <div className="flex flex-col gap-y-8 w-full h-fit items-center py-4 mt-8 text-sm text-center sm:py-0 sm:mt-16 md:text-base sm:flex-row sm:gap-x-4">
      <section className="relative flex flex-col content-start place-items-center gap-y-4 w-fit mx-auto pb-4 pt-8 sm:px-2 border-2 border-solid border-current">
        <div className="absolute -top-4 inset-x-0 flex justify-center">
          <p className="w-fit text-lg bg-teal-700 px-2 sm:text-xl">Totales</p>
        </div>
        <div className="flex flex-col md:block">
          <label htmlFor="setTotHoursPlayed" className="w-fit mx-4">Tiempo jugado:</label>
          <input type="text" value="" readonly id="setTotHoursPlayed" className="w-24 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-28 md:mx-2" />
        </div>
        <div className="flex flex-col md:block">
          <label htmlFor="setTotGamesPlayed" className="w-fit mx-4">Partidas jugadas:</label>
          <input type="text" value="" readonly id="setTotGamesPlayed" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
        </div>
        <div className="flex flex-col md:block">
          <label htmlFor="setTotFirstBlood" className="w-fit mx-4">Primera sangre:</label>
          <input type="text" value="" readonly id="setTotFirstBlood" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
        </div>
        <div className="flex flex-col md:block">
          <label htmlFor="setTotVictory" className="w-fit mx-4">Vitorias:</label>
          <input type="text" value="" readonly id="setTotVictory" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
        </div>
      </section>
      <section className="relative flex flex-col content-start place-items-center gap-y-4 w-fit mx-auto pb-4 pt-8 sm:px-2 border-2 border-solid border-current">
        <div className="absolute -top-4 inset-x-0 flex justify-center">
          <p className="w-fit text-lg bg-teal-700 px-2 sm:text-xl">Máximos</p>
        </div>
        <div className="flex flex-col md:block">
          <label htmlFor="setMaxKDA" className="w-fit mx-4">K, D and A: </label>
          <input type="text" value="" readonly id="setMaxKDA" className="w-24 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-28 md:mx-2" />
        </div>
        <div className="flex flex-col md:block">
          <label htmlFor="setMaxGold" className="w-fit mx-4">Oro ganado: </label>
          <input type="text" value="" readonly id="setMaxGold" className="w-24 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-28 md:mx-2" />
        </div>
        <div className="flex flex-col md:block">
          <label htmlFor="setMaxMinions" className="w-fit mx-4">Súbditos matados: </label>
          <input type="text" value="" readonly id="setMaxMinions" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
        </div>
        <div className="flex flex-col md:block">
          <label htmlFor="setMaxVision" className="w-fit mx-4">Puntos de visión: </label>
          <input type="text" value="" readonly id="setMaxVision" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
        </div>
        <div className="flex flex-col md:block">
          <label htmlFor="setMaxControl" className="w-fit mx-4">Control de masa: </label>
          <input type="text" value="" readonly id="setMaxControl" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
        </div>
      </section>
      <section className="relative flex flex-col content-start place-items-center gap-y-4 w-fit mx-auto pb-4 pt-8 sm:px-2 border-2 border-solid border-current">
        <div className="absolute -top-4 inset-x-0 flex justify-center">
          <p className="w-fit text-lg bg-teal-700 px-2 sm:text-xl">Promedios</p>
        </div>
        <div className="flex flex-col md:block">
          <label htmlFor="setAverageGold" className="w-fit mx-4">Oro ganado: </label>
          <input type="text" value="" readonly id="setAverageGold" className="w-24 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-28 md:mx-2" />
        </div>
        <div className="flex flex-col md:block">
          <label htmlFor="setAverageMinions" className="w-fit mx-4">Súbditos matados: </label>
          <input type="text" value="" readonly id="setAverageMinions" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
        </div>
        <div className="flex flex-col md:block">
          <label htmlFor="setAverageVision" className="w-fit mx-4">Puntos de visión: </label>
          <input type="text" value="" readonly id="setAverageVision" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
        </div>
        <div className="flex flex-col md:block">
          <label htmlFor="setAverageControl" className="w-fit mx-4">Contol de masas: </label>
          <input type="text" value="" readonly id="setAverageControl" className="w-16 px-1 mx-auto bg-teal-200 text-teal-800 text-center rounded-sm md:w-20 md:mx-2" />
        </div>
      </section>
    </div>
    </React.Fragment>
  )
}

export default ChampionStats;