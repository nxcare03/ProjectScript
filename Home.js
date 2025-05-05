import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Home({ route, navigation }) {
  const { userType } = route.params; // รับประเภทผู้ใช้จาก HomeScreen
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
         <Image source={require('./assets/back.png')} style={styles.settingsIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>โปรไฟล์</Text>
        <TouchableOpacity onPress={() => alert('Settings Clicked')}>
          <Image source={require('./assets/settings.png')} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Subject')}>
        <Text style={styles.cardText}>เลือกวิชา</Text>
        <Image source={require('./assets/Home.png')} style={styles.icon} resizeMode="cover"/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Classroom', { userType })}>
        <Text style={styles.cardText}>ห้องเรียน</Text>
        <Image source={require('./assets/teachings.png')} style={styles.icon2} resizeMode="cover"/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Results')}>
        <Text style={styles.cardText}>ผลคะแนน</Text>
        <Image source={require('./assets/medal.png')} style={styles.icon2} resizeMode="cover"/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('About')}>
      <Text style={styles.cardText}>เกี่ยวกับเรา</Text>
      <Image source={require('./assets/group-chat.png')} style={styles.icon2} resizeMode="cover"/>
    </TouchableOpacity>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  backText: {
    fontSize: 18,
    color: '#5e2a8c',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5e2a8c',
  },
  settingsIcon: {
    width: 30,
    height: 30,
  },
  card: {
    width: '100%', 
    height: 120,
    backgroundColor: '#A259FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center', 
    marginBottom: 20,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  icon: {
    width: 150,
    height: 163,
    marginTop: 3,
    marginLeft: 20,
  },
  icon2: {
    width: 100,
    height: 100,
    marginTop: 3,
    marginLeft: 20,
  },
  cardText: {
    fontSize: 18,
    marginRight: 10,
    color: '#333',
    fontWeight: 'bold',
  },

});
