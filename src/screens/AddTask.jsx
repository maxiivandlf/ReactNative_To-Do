import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { addTodosReducer } from '../redux/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function AddTask() {
  const [show, setShow] = useState(false);
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [hora, setHora] = useState();
  const listTodos = useSelector((state) => state.todos.todos);
  const [minutos, setMinutos] = useState();
  const [isToday, setIsToday] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onChange = (event, selectedDate) => {
    setShow(!setShow);
    setDate(selectedDate);
    setHora(selectedDate.getHours());
    setMinutos(selectedDate.getMinutes());
  };

  const addTodo = async () => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      task: task,
      isCompleted: false,
      isToday: isToday,
      hora: date.toString(),
    };
    try {
      await AsyncStorage.setItem(
        '@Todos',
        JSON.stringify([...listTodos, newTodo])
      );
      dispatch(addTodosReducer(newTodo));
      console.log('TODO GUARDADO');
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDone = () => {
    if ((task !== '' && hora) || minutos) {
      Alert.alert(
        'Tarea cargada',
        `Tarea: ${task} \n Hora: ${hora}:${minutos} `,
        [
          {
            text: 'OK',
            // onPress: () => console.log('Cancelado'),
          },
        ]
      );
      addTodo();
    } else {
      Alert.alert('⚠️ Alerta ', 'Debe ingresar una tarea y un horario', [
        {
          text: 'OK',
          // onPress: () => console.log('Cancelado'),
          style: 'destructive',
        },
      ]);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Add Task</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Name</Text>
        <TextInput
          style={styles.inputText}
          placeholder='Add you task'
          placeholderTextColor='#00000050'
          onChange={(event) => {
            setTask(event.nativeEvent.text);
          }}
        />
      </View>
      <TouchableOpacity onPress={setShow} style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Hour</Text>
        <Text style={styles.inputHour}>
          {hora || minutos ? `${hora}:${minutos}` : `00:00`}
        </Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Today</Text>
        <Switch
          value={isToday}
          onValueChange={(value) => {
            setIsToday(value);
          }}
        />
      </View>

      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={'time'}
          is24Hour={true}
          style={{ width: '80%' }}
          onChange={onChange}
          display='clock'
        />
      )}
      <TouchableOpacity onPress={handleDone} style={styles.buttom}>
        <Text style={{ color: '#fff' }}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AddTask;

const styles = StyleSheet.create({
  containet: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 35,
    marginTop: 10,
  },
  inputContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
  },
  inputHour: {
    fontSize: 23,
    borderWidth: 2,
    padding: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 6,
    fontWeight: '500',
  },
  inputText: {
    borderBottomColor: '#00000030',
    borderBottomWidth: 1,
    width: '80%',
    paddingLeft: 5,
  },
  buttom: {
    margin: 30,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    height: 46,
    borderRadius: 11,
  },
});
