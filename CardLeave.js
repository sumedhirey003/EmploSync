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

const CardLeave = ({ user, approveLeave, rejectLeave }) => {
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
            Id : {user?.empId}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
            Status : {user?.status}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ width: 150 }}>
              Start Date : {FormatDate(new Date(user?.startDate))}
            </Text>
            <Text style={{ width: 150 }}>
              End Date : {FormatDate(new Date(user?.endDate))}
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
              Reason : {user?.reason || 'Not Provided'}
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
                rejectLeave(user?.id);
              }}
            >
              <Text style={{ color: 'white' }}>Reject Leave</Text>
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
                approveLeave(user?.id);
              }}
            >
              <Text style={{ color: 'white' }}>Approve Leave</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CardLeave;

const styles = StyleSheet.create({});
