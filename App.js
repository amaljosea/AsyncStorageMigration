/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {migrate} from './migrate';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [state, setState] = useState({todo: []});

  useEffect(() => {
    const sync = async () => {
      const savedLocalStateString = await AsyncStorage.getItem('local-state');
      const savedLocalState = JSON.parse(savedLocalStateString || '[]');

      const migratedState = migrate({savedLocalState});
      console.log('migratedState', migratedState);

      await AsyncStorage.setItem('local-state', JSON.stringify(migratedState));
      setState(migratedState);
    };
    sync();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {state.todo.map(i => (
            <Text key={i.id}>{i.label}</Text>
          ))}
        </View>
        <Button
          title="Add todo"
          onPress={async () => {
            const newState = {
              ...state,
              todo: [
                ...state.todo,
                {id: state.todo.length + 1 + '', label: 'test'},
              ],
            };
            setState(newState);
            await AsyncStorage.setItem('local-state', JSON.stringify(newState));
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
