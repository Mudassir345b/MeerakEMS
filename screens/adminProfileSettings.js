import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function AdminProfileSettings() {
    const [adminDetails, setAdminDetails] = useState({
        name: 'Admin Name',
        email: 'admin@example.com',
        password: '',
        profileImage: 'https://via.placeholder.com/150',
    });

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission Denied', 'You need to grant permission to access the library.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setAdminDetails({ ...adminDetails, profileImage: result.assets[0].uri });
        }
    };

    const handleSave = () => {
        if (!adminDetails.name || !adminDetails.email || !adminDetails.password) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        Alert.alert('Success', 'Profile updated successfully!');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Admin Profile Settings</Text>
            </View>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                    <Image source={{ uri: adminDetails.profileImage }} style={styles.profileImage} />
                    <View style={styles.imageOverlay}>
                        <Ionicons name="camera" size={22} color="#fff" />
                    </View>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={adminDetails.name}
                    onChangeText={(text) => setAdminDetails({ ...adminDetails, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={adminDetails.email}
                    onChangeText={(text) => setAdminDetails({ ...adminDetails, email: text })}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={adminDetails.password}
                    onChangeText={(text) => setAdminDetails({ ...adminDetails, password: text })}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    header: {
        backgroundColor: '#3a2721',
        paddingVertical: 50,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 25,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',

    },
    contentContainer: {
        paddingHorizontal: 25,
        paddingTop: 20,
        flex: 1,
        justifyContent: 'center',
    },
    imageContainer: {
        alignSelf: 'center',
        marginBottom: 30,
        position: 'relative',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#3a2721',
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#3a2721',
        padding: 8,
        borderRadius: 25,
    },
    input: {
        borderWidth: 1,
        borderColor: '#BDC3C7',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#2C3E50',
    },
    saveButton: {
        backgroundColor: '#3a2721',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});