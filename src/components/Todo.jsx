import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from './Checkbox';
import moment from 'moment/moment';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoReducer } from '../redux/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Todo(props) {
  const { id, isCompleted, task, hora } = { ...props };
  const [localHour, setLocalHour] = useState(new Date(hora));

  const todos = useSelector((state) => state.todos.todos);
  const dispach = useDispatch();

  const handleDeleteTodo = async () => {
    dispach(deleteTodoReducer(id));
    try {
      await AsyncStorage.setItem(
        '@Todos',
        JSON.stringify(todos.filter((todo) => todo.id !== id))
      );
      console.log('Todo deleted correctly');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container} key={id}>
      <Checkbox {...props} />
      <View style={styles.textContainer}>
        <Text
          style={
            isCompleted
              ? [
                  styles.text,
                  { textDecorationLine: 'line-through', color: '#73737370' },
                ]
              : styles.text
          }>
          Tarea : {task}
        </Text>
        <Text
          style={
            isCompleted
              ? [
                  styles.hora,
                  { textDecorationLine: 'line-through', color: '#73737370' },
                ]
              : styles.hora
          }>
          Hora :{moment(localHour).format('LT')}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDeleteTodo}>
        <MaterialIcons
          name='delete-outline'
          size={24}
          color='#73737340'
          style={styles.delete}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Todo;

// Estilos
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e5e5e5',
    borderWidth: 2,
    borderRadius: 10,
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  text: {
    fontSize: 15,
    fontWeight: '500',
    color: '#737373',
    flexWrap: 'wrap',
  },

  hora: {
    fontSize: 13,
    color: '#a3a3a3',
    fontWeight: '500',
  },
});
