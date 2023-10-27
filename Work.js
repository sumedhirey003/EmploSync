import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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
export default function Work() {
  const nav = useNavigation();
  const [user, setUser] = useState(null);
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState([]);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    try {
      const user = await SecureStore.getItemAsync('user');

      await axios
        .post('https://employsyncapi.onrender.com/workdone', {
          id: JSON.parse(user)?.id,
          photo: url,
          description: description,
          date: new Date(),
          time: new Date(),
        })
        .then((response) => {
          console.log(response.data);
          if (response?.data?.status === 200) {
            alert(response?.data?.message);
            setLoading(false);
            setUrl([]);
            setDescription('');
            nav.navigate('Home');
            // reload the page
          } else {
            setLoading(false);
            alert(response?.data?.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          alert(error);
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
        aspect: [16, 9],
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
      let newUrl = url;
      setUrl((prev) => [...prev, newUrl]);
    } catch (E) {
      console.log(E);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await SecureStore.getItemAsync('user');
      setUser(JSON.parse(user));
    };
    getUser();
  }, []);

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 50,
          marginLeft: 30,
          marginRight: 30,
          marginBottom: 20,
        }}
      >
        <Feather
          name="menu"
          size={40}
          color="black"
          onPress={() => nav.toggleDrawer()}
        />
        {user?.pic ? (
          <Image
            source={{
              uri: user?.pic,
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
          />
        ) : (
          <Ionicons name="person-circle-outline" size={50} color="black" />
        )}
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
              Work Done Form
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginVertical: 20,
            }}
          >
            <View
              style={{
                gridTemplateColumns: 'repeat(3, 1fr)',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {url?.map((item, id) => {
                return (
                  <Image
                    key={id}
                    source={{ uri: item }}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 10,
                      margin: 5,
                    }}
                  />
                );
              })}
            </View>

            <Button title="Pick an image" onPress={pickImage} />

            <TextInput
              placeholder="description"
              value={description}
              onChangeText={(text) => setDescription(text)}
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
                {loading ? 'Loading...' : 'Submit'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
