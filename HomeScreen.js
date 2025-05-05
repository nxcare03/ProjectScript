import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, Image } from 'react-native';

const { width } = Dimensions.get('window');
const PURPLE = '#A259FF';

export default function HomeScreen({ navigation }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleConfirm = () => {
    if (selectedUser) {
      navigation.navigate('Login', { userType: selectedUser }); // นำทางไปยังหน้า Login
    } else {
      alert('กรุณาเลือกผู้ใช้งานก่อน');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.curve} />
      </View>

      <View style={styles.content}>
        {/* เพิ่ม Image ที่ด้านบนสุด */}
        <Image 
          source={require('./assets/Login.png')} // ตรวจสอบเส้นทางของไฟล์ภาพ
          style={styles.loginImage} 
        />
        <Text style={styles.title}>เลือกผู้ใช้งาน</Text>
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedUser === 'teacher' && styles.selectedRole,
            ]}
            onPress={() => setSelectedUser('teacher')}
          >
            <Text
              style={[
                styles.roleText,
                selectedUser === 'teacher' && styles.selectedRoleText,
              ]}
            >
              ครู
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedUser === 'student' && styles.selectedRole,
            ]}
            onPress={() => setSelectedUser('student')}
          >
            <Text
              style={[
                styles.roleText,
                selectedUser === 'student' && styles.selectedRoleText,
              ]}
            >
              นักเรียน
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>ยืนยัน</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  topSection: {
    backgroundColor: '#5E095E',
    height: '50%',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  curve: {
    position: 'absolute',
    bottom: -60,
    left: 0,
    width: width,
    height: 120,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: -40,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 40,
  },
  roleButton: {
    backgroundColor: '#EEE',
    paddingVertical: 15,
    width: 120,
    alignItems: 'center',
    borderRadius: 10,
  },
  selectedRole: {
    backgroundColor: '#5E095E',
  },
  roleText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  selectedRoleText: {
    color: '#fff', // เมื่อเลือกปุ่ม, ข้อความจะเป็นสีขาว
  },
  confirmButton: {
    backgroundColor: '#5E095E',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  confirmText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginImage: {
    width: 350, // กำหนดขนาดของรูปภาพ
    height: 350, // กำหนดขนาดของรูปภาพ
    marginBottom: 20, // เพิ่มระยะห่างจากด้านบ
    marginTop:-275,
  },
});
