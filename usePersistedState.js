import {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {migrate} from './migrate';

function usePersistedState() {
  const [state, setState] = useState({todo: []});

  useEffect(() => {
    const syncPersistedData = async () => {
      const savedLocalStateString = await AsyncStorage.getItem('local-state');
      const savedLocalState = JSON.parse(savedLocalStateString || '[]');
      const migratedState = migrate({savedLocalState});
      await AsyncStorage.setItem('local-state', JSON.stringify(migratedState));
      setState(migratedState);
    };
    syncPersistedData();
  }, []);

  return {
    state,
    setState: async newState => {
      setState(newState);
      await AsyncStorage.setItem('local-state', JSON.stringify(newState));
    },
  };
}

export default usePersistedState;
