import React from 'react';

const Header = () => {
  return (
    <nav className="flex flex-row top-0 w-full h-fit p-2 bg-gray-800">
      <ul>
        <li className="inline px-4 py-2 hover:bg-gray-600"><a href="/">Login</a></li>
        <li className="inline px-4 py-2 hover:bg-gray-600"><a href="/">Estadisticas por Campeon</a></li>
        <li className="inline px-4 py-2 hover:bg-gray-600"><a href="/">Estadisticas por Carril</a></li>
      </ul>
    </nav>
  );
}

export default Header;