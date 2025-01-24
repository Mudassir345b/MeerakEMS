import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Modal,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Ionicons } from '@expo/vector-icons';

export default function ManageEmployees() {
    const [employees, setEmployees] = useState([
        {
            id: '1',
            name: 'John Doe',
            position: 'Manager',
            password: 'password123',
            status: 'Active',
            gender: 'Male',
            location: 'A',
            whatsapp: '1234567890',
            image: '',
        },
        {
            id: '2',
            name: 'Jane Smith',
            position: 'Assistant',
            password: 'mypassword',
            status: 'Inactive',
            gender: 'Female',
            location: 'B',
            whatsapp: '9876543210',
            image: '',
        },
        {
            id: '3',
            name: 'Jane Smith',
            position: 'Assistant',
            password: 'mypassword',
            status: 'Inactive',
            gender: 'Female',
            location: 'B',
            whatsapp: '9876543210',
            image: '',
        },
        {
            id: '4',
            name: 'Jane Smith',
            position: 'Assistant',
            password: 'mypassword',
            status: 'Inactive',
            gender: 'Female',
            location: 'B',
            whatsapp: '9876543210',
            image: '',
        },
        {
            id: '5',
            name: 'Jane Smith',
            position: 'Assistant',
            password: 'mypassword',
            status: 'Inactive',
            gender: 'Female',
            location: 'B',
            whatsapp: '9876543210',
            image: '',
        },
        {
            id: '6',
            name: 'Jane Smith',
            position: 'Assistant',
            password: 'mypassword',
            status: 'Inactive',
            gender: 'Female',
            location: 'B',
            whatsapp: '9876543210',
            image: '',
        },
        {
            id: '7',
            name: 'Jane Smith',
            position: 'Assistant',
            password: 'mypassword',
            status: 'Inactive',
            gender: 'Female',
            location: 'B',
            whatsapp: '9876543210',
            image: '',
        },
        {
            id: '8',
            name: 'Jane Smith',
            position: 'Assistant',
            password: 'mypassword',
            status: 'Inactive',
            gender: 'Female',
            location: 'B',
            whatsapp: '9876543210',
            image: '',
        },
        {
            id: '9',
            name: 'Jane Smith',
            position: 'Assistant',
            password: 'mypassword',
            status: 'Inactive',
            gender: 'Female',
            location: 'B',
            whatsapp: '9876543210',
            image: '',
        },
        
    ]);

    const [filter, setFilter] = useState('All');
    const [modalVisible, setModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [editedDetails, setEditedDetails] = useState({
        name: '',
        position: '',
        password: '',
        whatsapp: '',
        status: 'Active',
        gender: '',
        location: 'A',
        image: '',
    });
    const [viewDetails, setViewDetails] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const filteredEmployees =
        filter === 'All'
            ? employees
            : employees.filter((employee) => employee.status === filter);

    const openImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Please allow access to your photo library.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setEditedDetails({ ...editedDetails, image: result.assets[0].uri });
        }
    };

    const saveEmployee = () => {
        if (editMode) {
            setEmployees((prevEmployees) =>
                prevEmployees.map((employee) =>
                    employee.id === editedDetails.id ? editedDetails : employee
                )
            );
            Alert.alert('Success', 'Employee updated successfully!');
        } else {
            setEmployees([...employees, { ...editedDetails, id: String(Date.now()) }]);
            Alert.alert('Success', 'Employee added successfully!');
        }
        setModalVisible(false);
        setEditedDetails({
            name: '',
            position: '',
            password: '',
            whatsapp: '',
            status: 'Active',
            gender: '',
            location: 'A',
            image: '',
        });
        setEditMode(false);
    };

    const deleteEmployee = (id) => {
        Alert.alert(
            'Delete Employee',
            'Are you sure you want to delete this employee?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setEmployees((prevEmployees) =>
                            prevEmployees.filter((employee) => employee.id !== id)
                        );
                        Alert.alert('Success', 'Employee deleted successfully!');
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Manage Employees</Text>
            </View>

            <View style={styles.filterContainer}>
                {['All', 'Active', 'Inactive'].map((status) => (
                    <TouchableOpacity
                        key={status}
                        style={[styles.filterButton, filter === status && styles.activeFilter]}
                        onPress={() => setFilter(status)}
                    >
                        <Text
                            style={[styles.filterText, filter === status && styles.activeFilterText]}
                        >
                            {status}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredEmployees}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.employeeCard}
                        onPress={() => {
                            setViewDetails(item);
                            setViewModalVisible(true);
                        }}
                    >
                        <Image
                            source={{ uri: item.image || 'https://via.placeholder.com/60' }}
                            style={styles.employeeImage}
                        />
                        <View style={styles.employeeDetailsContainer}>
                            <Text style={styles.employeeName}>{item.name}</Text>
                            <Text style={styles.employeePosition}>{item.position}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setEditedDetails(item);
                                setEditMode(true);
                                setModalVisible(true);
                            }}
                            style={styles.editButton}
                        >
                            <Ionicons name="create" size={20} color="#3a2721" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => deleteEmployee(item.id)}
                            style={styles.deleteButton}
                        >
                            <Ionicons name="trash" size={20} color="#fff" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.employeeList}
                ListEmptyComponent={<Text style={styles.emptyText}>No employees found</Text>}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                    setEditMode(false);
                    setEditedDetails({
                        name: '',
                        position: '',
                        password: '',
                        whatsapp: '',
                        status: 'Active',
                        gender: '',
                        location: 'A',
                        image: '',
                    });
                    setModalVisible(true);
                }}
            >
                <Ionicons name="add" size={22} color="#fff" />
                <Text style={styles.addButtonText}>Add Employee</Text>
            </TouchableOpacity>

            {/* View Employee Modal */}
            <Modal visible={viewModalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, styles.viewModalContent]}>
                        <Text style={styles.modalTitle}>{viewDetails.name}</Text>
                        {viewDetails.image && (
                            <Image
                                source={{ uri: viewDetails.image }}
                                style={styles.modalImage}
                            />
                        )}
                        <Text style={styles.viewDetailText}>Position: {viewDetails.position}</Text>
                        <Text style={styles.viewDetailText}>WhatsApp: {viewDetails.whatsapp}</Text>
                        <View style={styles.passwordContainer}>
                            <Text style={styles.viewDetailText}>Password: </Text>
                            <Text style={styles.viewDetailText}>
                                {showPassword ? viewDetails.password : '********'}
                            </Text>
                            <TouchableOpacity
                                onPress={() => setShowPassword((prev) => !prev)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={20}
                                    color="#3a2721"
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setViewModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={modalVisible} transparent animationType="slide" >
              
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalContainer}
                >
                     <View style={{width:'95%', marginLeft:'8%'}}>
                    <ScrollView contentContainerStyle={styles.modalContent}>
                        <Text style={styles.modalTitle}>{editMode ? 'Edit Employee' : 'Create Employee'}</Text>

                        {editedDetails.image && (
                            <Image
                                source={{ uri: editedDetails.image }}
                                style={styles.modalImage}
                            />
                        )}

                        <Text style={styles.inputLabel}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={editedDetails.name}
                            editable={true}
                            onChangeText={(text) => setEditedDetails({ ...editedDetails, name: text })}
                        />

                        <Text style={styles.inputLabel}>Position</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Position"
                            value={editedDetails.position}
                            editable={true}
                            onChangeText={(text) => setEditedDetails({ ...editedDetails, position: text })}
                        />

                        <Text style={styles.inputLabel}>Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="Password"
                                secureTextEntry={!showPassword}
                                value={editedDetails.password}
                                editable={true}
                                onChangeText={(text) => setEditedDetails({ ...editedDetails, password: text })}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword((prev) => !prev)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={20}
                                    color="#3a2721"
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.inputLabel}>WhatsApp</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="WhatsApp"
                            value={editedDetails.whatsapp}
                            editable={true}
                            onChangeText={(text) => setEditedDetails({ ...editedDetails, whatsapp: text })}
                        />

                        <Text style={styles.inputLabel}>Gender</Text>
                        <TextInput
                            placeholder="Gender (e.g., Male or Female)"
                            value={editedDetails.gender}
                            editable={true}
                            onChangeText={(text) => setEditedDetails({ ...editedDetails, gender: text })}
                            style={styles.input}
                        />

                        <Text style={styles.inputLabel}>Location</Text>
                        <TextInput
                            placeholder="Location"
                            value={editedDetails.location}
                            editable={true}
                            onChangeText={(text) => setEditedDetails({ ...editedDetails, location: text })}
                            style={styles.input}
                        />

                        <TouchableOpacity style={styles.uploadButton} onPress={openImagePicker}>
                            <Text style={styles.uploadButtonText}>Upload Profile Image</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={saveEmployee}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    </View>
                </KeyboardAvoidingView>
                
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
   
        container: { flex: 1, backgroundColor: '#F5F5F5' },
        header: { backgroundColor: '#3a2721', paddingVertical: 50, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginBottom: 15 },
        headerText: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        
        marginBottom: 15,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
    },
    activeFilter: {
        backgroundColor: '#3a2721',
    },
    filterText: {
        color: '#505050',
        fontWeight: '600',
    },
    activeFilterText: {
        color: '#FFFFFF',
    },
    employeeList: {
        paddingBottom: 80,
    },
    employeeCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        alignItems: 'center',
    },
    employeeImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    employeeDetailsContainer: {
        flex: 1,
    },
    employeeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    employeePosition: {
        fontSize: 14,
        color: '#666',
    },
    editButton: {
        padding: 8,
        marginRight: 5,
    },
    deleteButton: {
        padding: 8,
        backgroundColor: '#FF3B30',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalImage: {
        width: 200,
        height:200,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '90%',
    },
    viewModalContent: {
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        borderRadius: 5,
    },
    inputLabel: {
        fontSize: 14,
        color: '#505050',
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    uploadButton: {
        backgroundColor: '#3a2721',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    uploadButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    saveButton: {
        backgroundColor: '#28A745',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#FF3B30',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    addButton: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#3a2721',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
        elevation: 5,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    eyeIcon: {
        marginLeft: 10,
    },
});
