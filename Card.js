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
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const Card = ({ user, approveEmployee, rejectEmployee }) => {
  const nav = useNavigation();
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
        onPress={async () => {
          nav.navigate('AllWorkDone', {
            user: {
              id: user.id,
              name: user.name,
            },
          });
        }}
        style={{
          margin: 15,
          flexDirection: 'row',
          backgroundColor: 'white',
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: { width: 10, height: 20 },
        }}
      >
        <View>
          <Image
            style={{
              height: height / 4,
              width: width - 270,
              borderTopLeftRadius: 15,
            }}
            source={{ uri: user.profilePic }}
          />
        </View>

        <View style={{ padding: 8 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <AntDesign name="user" size={15} color="black" />
            <Text style={{ width: 150 }}>{user.name}</Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                backgroundColor: '#90c8da',
                padding: 2,
                borderRadius: 5,
              }}
            >
              {user?.status}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              marginTop: 7,
              width: 160,
            }}
          >
            <MaterialIcons name="mail-outline" size={15} color="black" />
            <Text>{user.email}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              marginTop: 7,
            }}
          >
            <MaterialIcons name="phone" size={15} color="black" />
            <Text>{user?.number}</Text>
          </View>

          <Text style={{ marginTop: 4, fontSize: 15, fontWeight: '500' }}>
            DOB : {FormatDate(new Date(user?.dob))}
          </Text>

          <View style={{ marginTop: 6 }}>
            <Text style={{ fontSize: 16, color: 'gray' }}>
              Designation : {user?.designation || 'Not Provided'}
            </Text>
            <Text style={{ fontSize: 16, color: 'gray' }}>
              Adahar : {user?.Adahar || 'Not Provided'}
            </Text>
            <Text style={{ fontSize: 16, color: 'gray' }}>
              Pan : {user?.PAN || 'Not Provided'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#EE4B2B',
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
                alignItems: 'center',
              }}
              onPress={() => {
                rejectEmployee(user?.id);
              }}
            >
              <Text style={{ color: 'white' }}>Reject User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#228B22',
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
                alignItems: 'center',
              }}
              onPress={() => {
                approveEmployee(user?.id);
              }}
            >
              <Text style={{ color: 'white' }}>Approve User</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
