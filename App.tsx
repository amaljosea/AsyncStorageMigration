/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [todo, setTodo] = useState<string[]>([]);

  useEffect(() => {
    const sync = async () => {
      const savedLocalStateString = await AsyncStorage.getItem('local-state');
      const savedLocalState = JSON.parse(
        savedLocalStateString || '[]',
      ) as string[];
      setTodo(savedLocalState);
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
          {todo.map(i => (
            <Text key={i}>{i}</Text>
          ))}
        </View>
        <Button
          title="Add todo"
          onPress={async () => {
            const newState = [...todo, 'test'];
            setTodo(newState);
            await AsyncStorage.setItem('local-state', JSON.stringify(newState));
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
