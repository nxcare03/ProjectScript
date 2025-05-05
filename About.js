import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window'); 

export default function About({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/home3.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>ติดต่อเรา</Text>
      </View>

      {/* Contact Information */}
      <View style={styles.contactCard}>
        <Text style={styles.contactLabel}>เบอร์โทรศัพท์:</Text>
        <Text style={styles.contactText}>044223000 หรือ 044224070</Text>

        <Text style={styles.contactLabel}>อีเมล:</Text>
        <Text style={styles.contactText}>sut@sut.ac.th</Text>

        <Text style={styles.contactLabel}>ที่อยู่:</Text>
        <Text style={styles.contactText}>111 ถนนมหาวิทยาลัย ตำบลสุรนารี
        อำเภอเมือง จังหวัดนครราชสีมา 30000</Text>

        <Text style={styles.contactText}>โครงงานนี้ทำเพื่อรับเกรดจากอาจารย์เท่านั้น ใครไม่รู้เรื่องช่าง</Text>
      </View>

      {/* Add the image at the bottom of the screen */}
      <Image source={require('./assets/Results1.png')} style={styles.footerImage} />
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
    justifyContent: 'space-between',
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
    textAlign: 'center',
    marginBottom: 6,
    flex: 1,
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  contactLabel: {
    fontSize: 18,
    color: '#5e2a8c',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#5E095E',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerImage: {
    width: width, // ให้รูปเต็มความกว้างของหน้าจอ
    height: 300, // ความสูงของรูปที่คุณต้องการ
    resizeMode: 'cover', // ทำให้รูปขยายให้พอดีกับขนาด
    marginTop: 20,
    flex: 1,
  },
});
