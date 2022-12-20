import React from 'react';
import { NavLink } from 'react-router-dom';
import championStats from '../containers/ChampionStats.jsx';

const Header = () => {
  return (
    <nav className="fixed top-0 flex flex-row top-0 w-full h-fit p-2 bg-gray-800">
      <ul>
        <li className="inline px-4 py-2 hover:bg-gray-600">
          <NavLink to={ '/' }>
            Login
          </NavLink>
        </li>
        <li className="inline px-4 py-2 hover:bg-gray-600">
          <NavLink to={ '/championstats' }>
            Estadisticas por Campeon
          </NavLink>
        </li>
        <li className="inline px-4 py-2 hover:bg-gray-600">
          <NavLink to={ '/championstats' }>
            Estadisticas por Carril
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;