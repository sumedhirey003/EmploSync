import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const CardPaySlip = ({ user }) => {
  const { width, height } = Dimensions.get('window');

  const FormatDate = (data) => {
    let dateTimeString =
      data.getDate() +
      '/' +
      (data.getMonth() + 1) +
      '/' +
      data.getFullYear() +
      ' ';

    var hours = data.getHours();
    var minutes = data.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    dateTimeString = dateTimeString + hours + ':' + minutes + ' ' + ampm;

    return dateTimeString;
  };

  return (
    <View
      style={{
        borderRadius: 10,
      }}
    >
      <Pressable
        style={{
          margin: 15,
          flexDirection: 'row',
          backgroundColor: 'white',
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: { width: 10, height: 20 },
        }}
      >
        <View style={{ padding: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
            Id : {user?.id}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
              Date : {user?.date}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
              Time : {user?.time}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ width: 150 }}>Name : {user?.name}</Text>
            <Text style={{ width: 150 }}>Email : {user?.email}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ width: 150 }}>
              Total Hrs : {user?.totalWorkingHours.toFixed(2)}
            </Text>
            <Text style={{ width: 150 }}>
              Total Salary : ₹{user?.totalSalary.toFixed(2)}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CardPaySlip;
