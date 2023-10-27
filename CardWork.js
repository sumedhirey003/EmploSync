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

const CardWork = ({ user }) => {
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ width: 150 }}>
              Date : {FormatDate(new Date(user?.date))}
            </Text>
          </View>

          <View style={{ marginTop: 6 }}>
            <Text
              style={{
                fontSize: 16,
                color: 'gray',
                maxWidth: 500,
                marginBottom: 10,
              }}
            >
              Description : {user?.description || 'Not Provided'}
            </Text>
            <View
              style={{
                gridTemplateColumns: 'repeat(3, 1fr)',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {user?.photo?.map((item, id) => {
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
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CardWork;

const styles = StyleSheet.create({});
