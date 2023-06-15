import React, { useState } from 'react';
import Constants from 'expo-constants';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TodoList from '../components/TodoList';
import todoData from '../data/MOCK_DATA.json';
import { useNavigation } from '@react-navigation/native';

function Home() {
  const [localData, setLocalData] = useState(
    todoData.sort((a, b) => {
      return a.isCompleted - b.isCompleted;
    })
  );

  const [isHidden, setIsHiden] = useState(false);
  const navigation = useNavigation();

  const handleHidePress = () => {
    if (isHidden) {
      setIsHiden(false);
      setLocalData(
        todoData.sort((a, b) => {
          return a.isCompleted - b.isCompleted;
        })
      );
      return;
    }

    setIsHiden(!isHidden);
    setLocalData(localData.filter((todo) => !todo.isCompleted));
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.titleHeader}>Lista de tareas Maxi</Text>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://unavatar.io/github/maxiivandlf' }}
        />
      </View>
      <View style={styles.todoHeader}>
        <Text style={styles.title}>Today</Text>
        <TouchableOpacity style={styles.btnHidde} onPress={handleHidePress}>
          <Text style={{ color: '#FFF' }}>
            {' '}
            {isHidden ? 'Show completed' : 'Hide completed'}
          </Text>
        </TouchableOpacity>
      </View>
      <TodoList todoData={localData.filter((todo) => todo.isToday)} />
      <Text style={styles.title}>Tomorrow</Text>
      <TodoList todoData={todoData.filter((todo) => !todo.isToday)} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Add')}
        style={styles.button}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    paddingHorizontal: 15,
    position: 'relative',
  },
  titleHeader: {
    fontWeight: 'bold',
    marginBottom: 5,
    justifyContent: 'center',
    color: '#fff',
    backgroundColor: '#09f',
    textAlign: 'center',
    padding: 5,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 20,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 8,
  },

  todoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  btnHidde: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#09f',
    borderRadius: 15,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 35,
    marginTop: 10,
  },
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 50,
    right: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  plus: {
    fontSize: 40,
    color: '#fff',
    position: 'absolute',
    top: -7.5,
    left: 9.5,
  },
});
