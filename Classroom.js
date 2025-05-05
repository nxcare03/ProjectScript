import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function Classroom({ route, navigation }) {
  const { userType } = route.params;  // รับประเภทผู้ใช้จากหน้าอื่น
  const [classrooms, setClassrooms] = useState([]); // เก็บข้อมูลห้องเรียน

  // ดึงข้อมูลห้องเรียนจาก API เมื่อหน้าโหลด
  useEffect(() => {
    axios.get('http://localhost:3000/classrooms') // ใช้ IP สำหรับ Android Emulator
      .then(response => setClassrooms(response.data)) // เก็บข้อมูลห้องเรียนใน state
      .catch(error => console.log('Error fetching classrooms:', error));
  }, []);

  // ฟังก์ชันสำหรับแสดงข้อมูลห้องเรียน
  const renderClassroom = ({ item }) => {
    return (
      <View style={styles.classroomItem}>
        <Text style={styles.classroomName}>{item.classname}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ห้องเรียนทั้งหมด</Text>

      {/* หากไม่มีห้องเรียน */}
      {classrooms.length === 0 ? (
        <Text style={styles.emptyText}>ยังไม่มีห้องเรียนในระบบ</Text>
      ) : (
        <FlatList
          data={classrooms}
          keyExtractor={item => item.id.toString()}
          renderItem={renderClassroom}
        />
      )}

      {/* ปุ่มไปยังหน้าสร้างห้องเรียนใหม่ */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateClassroom', { userType })} // ไปที่หน้าสร้างห้องเรียน
      >
        <Text style={styles.createButtonText}>สร้างห้องเรียนใหม่</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  classroomItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  classroomName: {
    fontSize: 18,
    color: '#333',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  createButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#5e2a8c',
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
