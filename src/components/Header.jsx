import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {

  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    console.log("toggle: " + toggle);
    setToggle(!toggle);
  }

  return (
    <header className="z-10 fixed top-0 left-0 flex flex-row items-center w-full bg-gray-800 justify-between md:px-2 xl:px-4">
      <p className="p-2">MetricasPiltover</p>
      <button id="toggle" className="
        relative w-[1.8rem] h-[1.5rem] mr-2 hover:bg-gray-500 sm:hidden
        after:content-[''] after:block after:w-full after:h-1/5 after:bg-current after:absolute after:top-0
        before:content-[''] before:block before:w-full before:h-1/5 before:bg-current before:absolute before:bottom-0
      " onClick={handleToggle}>
        <div className="w-full h-1/5 bg-current absolute top-2/4 left-0 -translate-y-1/2"></div>
      </button>
      <nav id="navBar" className={`absolute top-full py-4 px-2 w-[80vw] h-screen bg-gray-800 transition-[left] duration-500 sm:relative sm:py-0 sm:px-0 sm:h-fit sm:w-fit sm:left-0 ${toggle ? 'left-0' : '-left-full'}`}>
        <ul className="flex flex-col justify-center sm:flex-row">
          <li className="block hover:bg-gray-500">
            <NavLink to={ '/' } className="block px-4 py-2">
              Login
            </NavLink>
          </li>
          <li className="block hover:bg-gray-500">
            <NavLink to={ '/championstats' } className="block px-4 py-2">
              Estadisticas por Campeón
            </NavLink>
          </li>
          {/* <li className="block hover:bg-gray-500">
            <NavLink to={ '/positionstats' } className="block px-4 py-2">
              Estadisticas por Carril
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;