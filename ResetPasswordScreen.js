import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function ResetPasswordScreen({ route, navigation }) {
  const { userType } = route.params || {};

  if (!userType) {
    Alert.alert('ข้อผิดพลาด', 'ไม่พบข้อมูลประเภทผู้ใช้');
    return null;
  }

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleCheckEmail = async () => {
    if (!email) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกอีเมล');
      return;
    }

    try {
      let apiUrl = '';

      if (userType === 'teacher') {
        apiUrl = 'http://10.0.2.2:3000/teachers/check-email'; // << แก้ตรงนี้ "teachers"
      } else if (userType === 'student') {
        apiUrl = 'http://10.0.2.2:3000/students/check-email';
      }

      const response = await axios.post(apiUrl, { email });

      if (response.data.exists) {
        setIsEmailValid(true);
      } else {
        Alert.alert('แจ้งเตือน', 'ไม่พบอีเมลนี้ในระบบ');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
  };

  const handleSaveNewPassword = async () => {
    if (!newPassword) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกรหัสผ่านใหม่');
      return;
    }

    try {
      let apiUrl = '';

      if (userType === 'teacher') {
        apiUrl = 'http://10.0.2.2:3000/teachers/reset-password';
      } else if (userType === 'student') {
        apiUrl = 'http://10.0.2.2:3000/students/reset-password';
      }

      const response = await axios.put(apiUrl, { email, newPassword });

      if (response.data.success) {
        Alert.alert('สำเร็จ', 'เปลี่ยนรหัสผ่านสำเร็จ', [
          { text: 'ตกลง', onPress: () => navigation.navigate('Login', {userType}) },
        ]);
      } else {
        Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเปลี่ยนรหัสผ่านได้');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>รีเซ็ทรหัสผ่าน</Text>
      <Text style={styles.description}>กรุณากรอกอีเมลที่ใช้ลงทะเบียน</Text>

      <TextInput
        style={styles.input}
        placeholder="อีเมล"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {!isEmailValid ? (
        <TouchableOpacity style={styles.button} onPress={handleCheckEmail}>
          <Text style={styles.buttonText}>ตรวจสอบอีเมล</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="รหัสผ่านใหม่"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleSaveNewPassword}>
            <Text style={styles.buttonText}>บันทึกรหัสผ่านใหม่</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5E2A8C',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    width: '100%',
    backgroundColor: '#5E2A8C',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
