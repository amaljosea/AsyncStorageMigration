/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import usePersistedState from './state/usePersistedState';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {state, setState} = usePersistedState();

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
            <Text key={i.id}>{JSON.stringify(i)}</Text>
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
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
