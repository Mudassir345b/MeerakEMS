import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Top Section: Logo */}
            <View style={styles.imageContainer}>
                <Image source={require('../assets/meerakLogo.png')} style={styles.image} />
            </View>

            {/* Bottom Section: Content */}
            <View style={styles.contentContainer}>
                <Text style={styles.heading}>Welcome to Meerak</Text>
                <Text style={styles.subheading}>Choose your role to proceed</Text>

                {/* Buttons */}
                <TouchableOpacity
                    style={[styles.button, styles.adminButton]}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('adminLogin')}
                >
                    <Text style={styles.buttonText}>Login as Admin</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.employeeButton]}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('employeeLogin')}
                >
                    <Text style={styles.buttonText}>Login as Employee</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Solid dark greenish background for the entire screen
    },
    imageContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    contentContainer: {
        flex: 3,
        backgroundColor: '#a98f77',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    subheading: {
        fontSize: 16,
        color: '#3a2721',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        borderRadius: 25,
        width: '90%',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        elevation: 3,
    },
    adminButton: {
        backgroundColor: '#FF6347', // Distinct color for Admin button
        shadowColor: '#FF6347',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    employeeButton: {
        backgroundColor: '#3a2721', // Distinct color for Employee button
        shadowColor: '#3a2721',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Welcome;