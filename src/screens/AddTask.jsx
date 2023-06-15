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
import todoData from '../data/MOCK_DATA.json';

function AddTask() {
  const [show, setShow] = useState(false);
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [hora, setHora] = useState();
  const [minutos, setMinutos] = useState();
  const [isToday, setIsToday] = useState(true);

  const onChange = (event, selectedDate) => {
    setShow(!setShow);
    setDate(selectedDate);
    setHora(selectedDate.getHours());
    setMinutos(selectedDate.getMinutes());
  };

  const handleDone = () => {
    if ((task !== '' && hora) || minutos) {
      Alert.alert(
        'Tarea cargada',
        `Tarea: ${task} \n Hora: ${hora}: ${minutos} `,
        [
          {
            text: 'OK',
            // onPress: () => console.log('Cancelado'),
          },
        ]
      );

      // const taskTemp = {
      //   id: todoData.length + 1,
      //   task: task,
      //   isCompleted: false,
      //   isToday: isToday,
      //   hora: `${hora}:${minutos}`,
      // };

      // console.log(taskTemp);

      // todoData.push(taskTemp);
      // console.log(todoData);
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
          accessibilityLanguage='Arg'
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
