import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from '../containers/Layout.jsx';
import Login from '../containers/Login.jsx';
import ChampionStats from '../containers/ChampionStats.jsx';
import PositionStats from '../containers/PositionStats.jsx';
import ShowRiotTXT from '../pages/ShowRiotTXT.jsx';
import NotFound from '../pages/NotFound.jsx';
import AppContext from '../context/AppContext.js';
import useGetValues from '../hooks/useGetValues.js';

const App = () => {
  const initialStates = useGetValues();
  return(
    <AppContext.Provider value={initialStates}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={ <Login /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/championstats" element={ <ChampionStats /> } />
            <Route path="/positionstats" element={ <PositionStats /> } />
            <Route path="/riot.txt" element={<ShowRiotTXT />} />
            <Route path="*" element={ <NotFound /> } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;