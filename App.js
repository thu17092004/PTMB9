import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import AuthProvider và useAuth

const Stack = createStackNavigator();

const SignInScreen = () => {
  const [number, setNumber] = React.useState('');
  const navigation = useNavigation();
  const { setPhoneNumber } = useAuth(); // Sử dụng setPhoneNumber từ AuthContext

  const formatPhoneNumber = (input) => {
    const cleaned = input.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return `${match[1]}${match[2] ? '-' : ''}${match[2]}${match[3] ? '-' : ''}${match[3]}`;
    }
    return input;
  };

  const handleInputChange = (text) => {
    const formattedText = formatPhoneNumber(text);
    setNumber(formattedText);
  };

  const handleSubmit = () => {
    if (number.length < 10) {
      Alert.alert('Lỗi', 'Vui lòng nhập đủ 10 số điện thoại.');
    } else {
      setPhoneNumber(number); // Lưu số điện thoại vào Context
      Alert.alert('Thông báo', 'Đang tiến hành đăng nhập với số điện thoại: ' + number);
      navigation.navigate('Home'); // Điều hướng đến HomeScreen
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Đăng nhập</Text>
      </View>
      <Text style={styles.label}>Nhập số điện thoại</Text>
      <Text style={styles.description}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={handleInputChange}
        value={number}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="phone-pad"
        maxLength={13}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const HomeScreen = () => {
  const { phoneNumber } = useAuth(); // Lấy thông tin số điện thoại từ AuthContext

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chào mừng đến với trang chính!</Text>
      <Text style={styles.phoneNumber}>Số điện thoại đăng nhập: {phoneNumber}</Text>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <AuthProvider> {/* Bao bọc toàn bộ ứng dụng bằng AuthProvider */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen 
            name="SignIn" 
            component={SignInScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: true, title: 'Trang chính' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f2f2f2',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  phoneNumber: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default App;
