import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  View,
  Platform,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
export default function Onboarding() {
  const nav = useNavigation();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [designation, setDesignation] = useState('');
  const [url, setUrl] = useState('');
  const [number, setNumber] = useState('');
  const [adhaar, setAdhaar] = useState('');
  const [pan, setPan] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    try {
      const user = await SecureStore.getItemAsync('user');

      await axios
        .post('https://employsyncapi.onrender.com/onboard', {
          id: JSON.parse(user)?.id,
          dob: date,
          designation: designation,
          number: number,
          profilePic: url,
          Adahar: adhaar,
          PAN: pan,
        })
        .then((response) => {
          console.log(response.data);
          if (response?.data?.status === 200) {
            SecureStore.setItemAsync('token', response.data.token);
            SecureStore.setItemAsync('isSignedIn', 'true');
            SecureStore.setItemAsync(
              'user',
              JSON.stringify(response.data.user)
            );
            alert('Onboarding Successful!');
            setLoading(false);
            // navigation.push('Home');
            // reload the page
          } else {
            setLoading(false);
            alert('Onboarding Failed!');
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });
      let localUri = result.uri;
      let filename = localUri.split('/').pop();

      let match = /\.(\w+)$/.exec(filename);
      //   let type = match ? `image/${match[1]}` : `image`;

      const path = `profile/${filename}`;
      const storageRef = ref(storage, path);
      const fileRef = storageRef;
      const response = await fetch(localUri);
      const blob = await response.blob();
      const snapshot = await uploadBytesResumable(fileRef, blob);
      console.log('Uploaded a blob or file!');
      const url = await getDownloadURL(ref(storage, path));

      console.log(url);
      setUrl(url);

      if (!result.cancelled) {
        setImage(result);
      }
    } catch (E) {
      console.log(E);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setShow(false);
  };

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginVertical: 50,
          marginHorizontal: 20,
        }}
      >
        <Feather
          name="menu"
          size={40}
          color="black"
          onPress={() => nav.toggleDrawer()}
        />
        <Ionicons name="person-circle-outline" size={40} color="black" />
      </View>
      <ScrollView
        style={{
          height: '100%',
        }}
      >
        <View
          style={{
            marginHorizontal: 20,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Onboarding Form
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginVertical: 20,
            }}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {image && (
                <Image
                  source={{ uri: image?.uri }}
                  style={{ width: 200, height: 200, borderRadius: 100 }}
                />
              )}
            </View>
            <Button title="Pick an image" onPress={pickImage} />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Date of Birth
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <Text>Date: {date.toString().substr(4, 12)}</Text>

              <Button onPress={() => setShow(true)} title="Select Date" />
            </View>
            {show ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                onChange={onChange}
              />
            ) : (
              <></>
            )}

            <TextInput
              placeholder="Designation"
              value={designation}
              onChangeText={(text) => setDesignation(text)}
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 10,
                marginTop: 20,
                margin: 2,
                padding: 20,
                backgroundColor: '#f2f2f2',
              }}
            />
            <TextInput
              placeholder="Mobile Number"
              value={number}
              onChangeText={(text) => setNumber(text)}
              textContentType="telephoneNumber"
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 10,
                marginTop: 20,
                margin: 2,
                padding: 20,
                backgroundColor: '#f2f2f2',
              }}
            />
            <TextInput
              placeholder="Adhaar Number (Optional)"
              value={adhaar}
              onChangeText={(text) => setAdhaar(text)}
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 10,
                marginTop: 20,
                margin: 2,
                padding: 20,
                backgroundColor: '#f2f2f2',
              }}
            />
            <TextInput
              placeholder="Pan Number (Optional)"
              value={pan}
              onChangeText={(text) => setPan(text)}
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 10,
                marginTop: 20,
                margin: 2,
                padding: 20,
                backgroundColor: '#f2f2f2',
              }}
            />
          </View>
          <View style={{ alignItems: 'center', paddingBottom: 50 }}>
            <TouchableOpacity
              onPress={() => login()}
              style={{
                backgroundColor: '#90c8da',
                borderRadius: 20,
                padding: 10,
                width: 200,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {loading ? 'Loading...' : 'Register'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
