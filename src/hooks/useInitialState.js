import {useState} from 'react';

const initialState = {
  matchData: {},
}
const useInitialState = () => {
  const [state, setState] = useState(initialState);
  
  const addToMatchData = (dataLoad) => {
    setState({
      ...state,
      matchData: {...state.matchData, dataLoad}
    });
  }
  return {state, addToMatchData}
}

export default useInitialState;