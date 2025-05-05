import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ route, navigation }) {
  const { userType } = route.params; // รับประเภทผู้ใช้จาก HomeScreen

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setsubject] = useState(''); // ฟิลด์พิเศษสำหรับแต่ละประเภท

  // ฟังก์ชันที่ใช้ในการลงทะเบียน
  const handleRegister = async () => {
    if (!username || !password || !email) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    if (userType === 'teacher' && !subject) {
      alert('กรุณากรอกข้อมูลวิชาที่สอน');
      return;
    }

    try {
      let apiUrl = '';

      // เช็ก userType ว่าจะส่งไปตารางไหน
      if (userType === 'teacher') {
        apiUrl = 'http://192.168.1.76:3000/teachers';  // ใช้ URL ของ API ครู
      } else if (userType === 'student') {
        apiUrl = 'http://192.168.1.76:3000/students'; // ใช้ URL ของ API นักเรียน
      } else {
        alert('ไม่สามารถระบุประเภทผู้ใช้ได้');
        return;
      }

      // ส่งข้อมูลไป Backend
      const response = await axios.post(apiUrl, {
        name: username,     // Backend รอรับ name ไม่ใช่ username
        email,
        password,
        subject: userType === 'teacher' ? subject : undefined, // สำหรับครูส่งวิชาที่สอน
      });

      alert('ลงทะเบียนสำเร็จ!');
      navigation.navigate('Login', { userType });  // ส่ง userType ไปที่หน้า Login
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการลงทะเบียน');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>ลงทะเบียน {userType === 'teacher' ? 'ครู' : 'นักเรียน'} </Text>

      <TextInput
        style={styles.input}
        placeholder="ชื่อผู้ใช้"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="อีเมล์"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="รหัสผ่าน"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* ฟิลด์พิเศษที่แตกต่างกันตามประเภทผู้ใช้ */}
      {userType === 'teacher' && (
        <TextInput
          style={styles.input}
          placeholder="วิชาที่สอน"
          value={subject}
          onChangeText={setsubject}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>ลงทะเบียน</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5e2a8c',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#5e2a8c',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
