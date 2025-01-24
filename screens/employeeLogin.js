import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons'; // For the eye icon

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigation = useNavigation();

    const handleSignIn = async () => {
    //   Alert.alert('Logged in as Employee');
    navigation.navigate('Empdash');
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image source={require('../assets/meerakLogo.png')} style={styles.logo} />

            {/* Card Section */}
            <View style={styles.card}>
                <Text style={styles.title}>Employee Login</Text>

                {/* Input Fields */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        placeholderTextColor="#B0B0B0"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.pass]}
                            placeholder="Enter your password"
                            secureTextEntry={!passwordVisible}
                            placeholderTextColor="#B0B0B0"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            <Ionicons
                                name={passwordVisible ? 'eye-off' : 'eye'}
                                size={24}
                                color="#B0B0B0"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pass: {
        width: '85%',
        height: 50,
        borderColor: '#fff', // White border for inputs
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#F5F5F5', // Light gray input field background
        color: '#3a2721',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff', // White background for the entire screen
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        marginBottom: 40,
    },
    card: {
        width: '90%',
        backgroundColor: '#3a2721', // Dark Green background for the card
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // White text for the title
        marginBottom: 25,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        color: '#fff', // White for the input labels
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderColor: '#fff', // White border for inputs
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#F5F5F5', // Light gray input field background
        color: '#3a2721', // Dark Green text color
    },
    loginButton: {
        backgroundColor: '#fff', // White button background
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    loginText: {
        color: '#3a2721', // Dark green text color for button text
        fontWeight: 'bold',
        fontSize: 16,
    },
    eyeIcon: {
        marginLeft: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 1.5,
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
        width: '100%',
    },
});
