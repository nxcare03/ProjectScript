import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ route, navigation }) {
  const { userType } = route.params; // รับค่าจาก HomeScreen

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // ตรวจสอบว่าได้กรอกชื่อผู้ใช้และรหัสผ่านหรือไม่
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }
  
    console.log('Logging in with:', username, password);  // ดีบักข้อมูล
    try {
      const apiUrl = userType === 'teacher'
        ? 'http://192.168.1.76:3000/teachers/login'
        : 'http://192.168.1.76:3000/students/login';
  
      const response = await axios.post(apiUrl, { username, password });
      console.log('Login response:', response);  // ตรวจสอบคำตอบจากเซิร์ฟเวอร์
  
      if (response.data.success) {
        console.log('Login success!');
        navigation.navigate('HomePage', { userType });
      } else {
        Alert.alert('เข้าสู่ระบบไม่สำเร็จ', response.data.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (error) {
      console.error("Login error:", error);  // แสดงข้อผิดพลาด
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์');
    }
  };
  

  // ฟังก์ชันไปที่หน้า RegisterScreen
  const navigateToRegister = () => {
    navigation.navigate('Register', { userType });
  };

  // ฟังก์ชันไปที่หน้า ResetPasswordScreen
  const navigateToResetPassword = () => {
    navigation.navigate('ResetPassword', { userType });
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/Login.png')} 
        style={styles.loginImage} 
      />
      <Text style={styles.header}>เข้าสู่ระบบ{userType === 'teacher' ? 'ครู' : 'นักเรียน'}</Text>

      <TextInput
        style={styles.input}
        placeholder="ชื่อผู้ใช้"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={"#000000"}
      />
      <TextInput
        style={styles.input}
        placeholder="รหัสผ่าน"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={"#000000"}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={navigateToRegister}>
          <Text style={styles.footerText}>ลงทะเบียน</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToResetPassword}>
          <Text style={styles.footerText}>ลืมรหัสผ่าน</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f1f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginImage: {
    width: 350,
    height: 350,
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#5e2a8c',
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: '#eeeeee',
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    marginTop: 15,
    position: 'relative',
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: 365,
    height: 58,
    backgroundColor: '#8e24aa',
    fontSize: 17,
    fontWeight: '500',
    color: '#181818',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
  },
  footerText: {
    color: '#8e24aa',
    fontSize: 16,
  },
});
