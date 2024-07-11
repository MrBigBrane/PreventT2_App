import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Icon, TextInput } from 'react-native-paper';

export default function DatePicker({ setInputDate, value }) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    
  
    const onChange = (event, selectedDate) => {
      const currentDate = new Date(selectedDate);
      let formattedDate = currentDate.toISOString().substring(0, 10);
      setShow(false);
      setInputDate(formattedDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
  
    return (
      <View>
        {/* <Icon name="calendar" onPress={showDatepicker} /> */}
        <TextInput
          mode="outlined"
          right={<TextInput.Icon icon="calendar" onPress={showDatepicker} />}
          value={value}
          // onChangeText={(text) => setDate(text.toString())}

        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
    );
  };