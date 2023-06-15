import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Checkbox from './Checkbox';

function Todo(props) {
  const { id, isCompleted, task, hora } = props;
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
          Hora : {hora}
        </Text>
      </View>
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
