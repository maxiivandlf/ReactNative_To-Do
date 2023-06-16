import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TodoList from '../components/TodoList';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hideComplitedReducer, setTodosReducer } from '../redux/todosSlice';

function Home() {
  const Todos = useSelector((state) => state.todos.todos);
  const [isHidden, setIsHiden] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getTodos = async () => {
      try {
        const Todos = await AsyncStorage.getItem('@Todos');
        if (Todos !== null) {
          dispatch(setTodosReducer(JSON.parse(Todos)));
        }
      } catch (e) {
        //console.log(e);
      }
    };
    getTodos();
  }, []);

  const handleHideCompleted = async () => {
    if (isHidden) {
      setIsHiden(false);
      const todos = await AsyncStorage.getItem('@Todos');
      if (todos !== null) {
        dispatch(setTodosReducer(JSON.parse(todos)));
      }

      return;
    }
    setIsHiden(!isHidden);
    dispatch(hideComplitedReducer());
    // setLocalData(localData.filter(item => item.isCompleted === false));
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
        <TouchableOpacity style={styles.btnHidde} onPress={handleHideCompleted}>
          <Text style={{ color: '#FFF' }}>
            {isHidden ? 'Show completed' : 'Hide completed'}
          </Text>
        </TouchableOpacity>
      </View>
      <TodoList todoData={Todos.filter((todo) => todo.isToday)} />
      <Text style={styles.title}>Tomorrow</Text>
      <TodoList todoData={Todos.filter((todo) => !todo.isToday)} />
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
