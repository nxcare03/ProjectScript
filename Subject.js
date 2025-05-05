import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window'); // ใช้เพื่อคำนวณความกว้างของหน้าจอ

export default function SubjectScreen({ navigation }) {
  const handleSelectSubject = (subject) => {
    // คุณสามารถเพิ่มฟังก์ชันเพื่อนำทางไปยังหน้าที่เกี่ยวข้องกับวิชาที่เลือก
    console.log(`เลือกวิชา: ${subject}`);
    navigation.navigate('Classroom', { subject }); // ส่งชื่อวิชาไปยังหน้าห้องเรียน
  };

  return (
    <ScrollView contentContainerStyle={styles.container}> 
      {/* Header ส่วนบน */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>เลือกวิชา</Text>
      </View>

      {/* รูปการ์ตูนที่ด้านบน */}
      <Image source={require('./assets/Subject.png')} style={styles.imageContainer} />

      {/* การ์ดสำหรับเลือกวิชา */}
      <TouchableOpacity style={styles.subjectCard} onPress={() => handleSelectSubject('วิทยาศาสตร์')}>
        <Image source={require('./assets/Science.png')} style={styles.subjectImage} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.subjectCard} onPress={() => handleSelectSubject('คณิตศาสตร์')}>
        <Image source={require('./assets/Math.png')} style={styles.subjectImage} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.subjectCard} onPress={() => handleSelectSubject('ภาษาอังกฤษ')}>
        <Image source={require('./assets/Eng.png')} style={styles.subjectImage} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f1f8',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5e2a8c',
    marginLeft: 20,
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 30,
  },
  subjectCard: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10, // ใช้ padding เพื่อสร้างช่องว่างรอบๆ รูป
    alignItems: 'center',
    justifyContent: 'center', // จัดให้รูปอยู่ตรงกลาง
    width: width - 40, // กำหนดความกว้างของการ์ดให้เหมาะสม
    alignSelf: 'center', // ทำให้การ์ดอยู่ตรงกลาง
  },
  subjectImage: {
    width: '100%', // ทำให้รูปภาพเต็มขนาดการ์ด
    height: 150, // กำหนดความสูงของรูป
    borderRadius: 15, // เพิ่มความกลมให้ขอบรูป
  },
  subjectText: {
    fontSize: 20, // เพิ่มขนาดข้อความ
    color: '#333',
    fontWeight: 'bold',
  },
});
