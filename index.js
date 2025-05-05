import 'react-native-gesture-handler';  // ต้องนำเข้าที่จุดเริ่มต้น
import { registerRootComponent } from 'expo';
import App from './App';  // นำเข้าไฟล์หลัก App.js

// ลงทะเบียนแอปโดยใช้ registerRootComponent เพื่อให้มันทำงานได้ทั้งใน Expo Go และ Native Build
registerRootComponent(App);
