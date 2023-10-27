import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';

export default function Profile() {
  const nav = useNavigation();
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [payslips, setPayslips] = useState([]);

  const getLeaves = async () => {
    try {
      const res = await axios.get(
        `https://employsyncapi.onrender.com/leave/${user?.id}`
      );
      console.log('Leaves:', res?.data);
      setLeaves(res?.data?.filter((leave) => leave?.id === user?.id));
      console.log(leaves);
    } catch (error) {
      console.log(error);
    }
  };

  const getPayslips = async () => {
    try {
      const res = await axios.get(
        `https://employsyncapi.onrender.com/payslip/${user?.id}`
      );
      // console.log('Payslips:', res?.data);
      setPayslips(res?.data?.payslip?.entries);
    } catch (error) {
      console.log(error);
    }
  };

  const generatePayslip = async () => {
    try {
      const res = await axios.post(
        `https://employsyncapi.onrender.com/payslip`,
        {
          id: user?.id,
          name: user?.name,
          email: user?.email,
        }
      );
      console.log('Payslips:', res?.data);
      getPayslips();
    } catch (error) {
      console.log(error);
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
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 50,
            marginLeft: 30,
            marginRight: 30,
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
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Image
              source={{
                uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
              }}
              style={{ width: 80, height: 80, borderRadius: 50 }}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                    marginRight: 60,
                  },
                ]}
              >
                {user?.name}
              </Text>
              <Text
                style={[
                  styles.caption,
                  {
                    textAlign: 'left',
                    marginBottom: 5,
                    marginRight: 60,
                  },
                ]}
              >
                ID: {user?.id}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            {/* <Icon name="map-marker-radius" color="#777777" size={20} /> */}
            <Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}
              >
                Email
              </Text>
              : {user?.email}
            </Text>
          </View>
          <View style={styles.row}>
            {/* <Icon name="map-marker-radius" color="#777777" size={20} /> */}
            <Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}
              >
                Phone
              </Text>
              : {user?.number || 'Not Specified'}
            </Text>
          </View>
          <View style={styles.row}>
            {/* <Icon name="map-marker-radius" color="#777777" size={20} /> */}
            <Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}
              >
                Designation
              </Text>
              : {user?.designation || 'Not Specified'}
            </Text>
          </View>
          <View style={styles.row}>
            {/* <Icon name="map-marker-radius" color="#777777" size={20} /> */}
            <Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}
              >
                DOB
              </Text>
              : {user?.dob || 'Not Specified'}
            </Text>
          </View>
          <View style={styles.row}>
            {/* <Icon name="map-marker-radius" color="#777777" size={20} /> */}
            <Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}
              >
                Adahar Number
              </Text>
              : {user?.adahar || 'Not Specified'}
            </Text>
          </View>
          <View style={styles.row}>
            {/* <Icon name="map-marker-radius" color="#777777" size={20} /> */}
            <Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}
              >
                PAN Details
              </Text>
              : {user?.pan || 'Not Specified'}
            </Text>
          </View>
        </View>

        {/* <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: '#dddddd',
              borderRightWidth: 1,
            },
          ]}
        >
          <Text>₹140.50</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>12</Text>
        </View> */}
        {/* </View> */}

        <View style={styles.menuWrapper}>
          <TouchableOpacity
            onPress={() => {
              getLeaves();
            }}
          >
            <View style={styles.menuItem}>
              {/* <Icon name="heart-outline" color="#FF6347" size={25} /> */}
              <Text style={styles.menuItemText}>View My Leaves</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginHorizontal: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
          >
            {leaves?.map((leave) => (
              <View
                key={leave?.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 30,
                }}
              >
                <Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    Start Date
                  </Text>
                  : {leave?.startDate}
                </Text>
                <Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    End Date
                  </Text>
                  : {leave?.endDate}
                </Text>
                <Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    Reason
                  </Text>
                  : {leave?.reason}
                </Text>
                <Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    Status
                  </Text>
                  : {leave?.status}
                </Text>
                {/* // horizontal line */}
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    width: '100%',
                    marginVertical: 10,
                  }}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableOpacity
            onPress={() => {
              getPayslips();
              setVisible(true);
            }}
          >
            <View style={styles.menuItem}>
              {/* <Icon name="heart-outline" color="#FF6347" size={25} /> */}
              <Text style={styles.menuItemText}>View My Pay Slip</Text>
            </View>
          </TouchableOpacity>
          {payslips?.length > 0 && (
            <View
              style={{
                marginHorizontal: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}
            >
              {payslips?.map((pay, idx) => (
                <View
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#90c8da',
                    borderRadius: 10,
                    marginVertical: 10,
                    marginLeft: 20,
                    padding: 10,
                    color: '#fff',
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        marginRight: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        ID
                      </Text>
                      : {pay?.id}
                    </Text>
                    <Text>
                      <Text
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        Date
                      </Text>
                      : {pay?.date}
                    </Text>
                  </View>
                  <Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      Name
                    </Text>
                    : {pay?.name}
                  </Text>
                  <Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      time
                    </Text>
                    : {pay?.time}
                  </Text>
                  <Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      Total Hours
                    </Text>
                    : {pay?.totalWorkingHours?.toFixed(2)}
                  </Text>
                  <Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      Total Pay
                    </Text>
                    : ₹{pay?.totalSalary?.toFixed(2)}
                  </Text>
                  {/* // horizontal line */}
                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      width: '100%',
                      marginVertical: 10,
                    }}
                  />
                </View>
              ))}
            </View>
          )}
          {visible ? (
            <View
              style={{
                marginHorizontal: 20,
                marginLeft: 50,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginBottom: 50,
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  generatePayslip();
                }}
              >
                <Text style={{ color: 'blue' }}>
                  Generate New Payslip{' '}
                  <Entypo name="new-message" size={20} color="black" />
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5fef2',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
