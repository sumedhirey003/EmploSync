import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function Settings() {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkModeEnabled((prevValue) => !prevValue);
  };

  return (
    <SafeAreaView
      style={[styles.container, isDarkModeEnabled && styles.darkModeContainer]}
    >
      <Text
        style={[styles.heading, isDarkModeEnabled && styles.darkModeHeading]}
      >
        Settings
      </Text>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Notifications</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Enable Notifications</Text>
          <View style={styles.switchContainer}>
            <Switch />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Notification Sound</Text>
          <View style={styles.switchContainer}>
            <Switch />
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Account</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Change Password</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Appearance</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Dark Mode</Text>
            <View style={styles.switchContainer}>
              <Switch
                value={isDarkModeEnabled}
                onValueChange={toggleDarkMode}
              />
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>About</Text>
          <Text style={styles.aboutText}>
            This is the about section. Add your about content here.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1FFEE',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
  switchContainer: {
    marginLeft: 'auto',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
