import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import Todo from './Todo';

function TodoList({ todoData }) {
  return (
    <FlatList
      data={todoData} // datos que va a renderizar la FlatList
      keyExtractor={(item) => item.id.toString()} //identificador unico de cada item de la Flatlista
      // ItemSeparatorComponent={() => <Text>++++++++</Text>}
      renderItem={({ item: todo }) => <Todo {...todo}></Todo>} //renderizado de los item (todo)
    />
  );
}
export default TodoList;
