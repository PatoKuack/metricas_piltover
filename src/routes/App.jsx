import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from '../containers/Layout.jsx';
import Login from '../containers/Login.jsx';
import ChampionStats from '../containers/ChampionStats.jsx';
import PositionStats from '../containers/PositionStats.jsx';
import NotFound from '../pages/NotFound.jsx';
import AppContext from '../context/AppContext.js';
import useInitialState from '../hooks/useInitialState.js';

const App = () => {
  const initialState = useInitialState();
  return(
    <AppContext.Provider value={initialState}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={ <Login /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/championstats" element={ <ChampionStats /> } />
            <Route path="/positionstats" element={ <PositionStats /> } />
            <Route path="*" element={ <NotFound /> } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;