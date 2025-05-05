import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function CreateClassroom({ route, navigation }) {
  const { userType } = route.params; // รับประเภทผู้ใช้จาก HomeScreen
  const [classname, setClassname] = useState('');

  // ฟังก์ชันที่ใช้ในการสร้างห้องเรียน
  const handleCreateClassroom = async () => {
    // เช็คกรอกข้อมูลให้ครบ
    if (!classname) {
      alert('กรุณากรอกชื่อห้องเรียน');
      return;
    }

    try {
      let apiUrl = 'http://10.0.2.2:3000/classrooms';  // URL สำหรับสร้างห้องเรียน
      // ส่งข้อมูลห้องเรียนไปที่ API
      const response = await axios.post(apiUrl, {
        classname,  // ส่งชื่อห้องเรียน
      });

      alert('ห้องเรียนถูกสร้างสำเร็จ!');
      navigation.navigate('Classroom', { userType });  // นำทางไปหน้า Home
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการสร้างห้องเรียน');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>สร้างห้องเรียนใหม่</Text>

      <TextInput
        style={styles.input}
        placeholder="ชื่อห้องเรียน"
        value={classname}
        onChangeText={setClassname}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateClassroom}>
        <Text style={styles.buttonText}>สร้างห้องเรียน</Text>
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
