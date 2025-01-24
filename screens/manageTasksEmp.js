import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Modal, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function EmployeeTasks() {
    const navigation = useNavigation(); // Hook to use navigation
    const [tasks, setTasks] = useState([
        { id: '1', title: 'Fix Bug', description: 'Resolve critical bug in production', status: 'Pending', createdAt: '2025-01-01', assignedTo: 'John Doe', image: null },
        { id: '2', title: 'Design UI', description: 'Create wireframes for new feature', status: 'In Progress', createdAt: '2025-01-02', assignedTo: 'John Doe', image: null },
        { id: '3', title: 'Database Migration', description: 'Migrate database to new schema', status: 'Completed', createdAt: '2025-01-03', assignedTo: 'John Doe', image: null },
    ]);
    const [filter, setFilter] = useState('All');
    const [selectedTask, setSelectedTask] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [imageUri, setImageUri] = useState(null);

    const filteredTasks = filter === 'All' ? tasks : tasks.filter((task) => task.status === filter);

    const openTaskDetails = (task) => {
        setSelectedTask(task);
        setImageUri(task.image || null);
        setModalVisible(true);
    };

    const handleAcceptTask = () => {
        if (selectedTask) {
            const updatedTasks = tasks.map((task) =>
                task.id === selectedTask.id ? { ...task, status: 'In Progress' } : task
            );
            setTasks(updatedTasks);
            Alert.alert('Success', 'Task accepted successfully!');
            setModalVisible(false);
        }
    };

    const handleCompleteTask = () => {
        if (selectedTask) {
            const updatedTasks = tasks.map((task) =>
                task.id === selectedTask.id ? { ...task, status: 'In Review', image: imageUri } : task
            );
            setTasks(updatedTasks);
            Alert.alert('Success', 'Task marked as In Review!');
            setModalVisible(false);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.uri);
        }
    };

    const captureImage = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.uri);
        }
    };

    const renderTask = ({ item }) => (
        <TouchableOpacity style={styles.taskCard} onPress={() => openTaskDetails(item)}>
            <View style={styles.taskDetailsContainer}>
                <Text style={styles.taskTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                <Text style={[styles.taskStatus, getStatusStyle(item.status)]}>{item.status}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>My Tasks</Text>
            </View>

            <View style={{ height: 75 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.filterContainer}>
                        {['All', 'Pending', 'In Progress', 'Completed', 'In Review'].map((status) => (
                            <TouchableOpacity
                                key={status}
                                style={[styles.filterButton, filter === status && styles.activeFilter]}
                                onPress={() => setFilter(status)}
                            >
                                <Text style={[styles.filterText, filter === status && styles.activeFilterText]}>
                                    {status}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>

            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                renderItem={renderTask}
                contentContainerStyle={styles.taskList}
                ListEmptyComponent={<Text style={styles.emptyText}>No tasks assigned to you.</Text>}
            />

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedTask?.title}</Text>
                        <Text style={styles.modalText}><Text style={styles.bold}>Description:</Text> {selectedTask?.description}</Text>
                        <Text style={styles.modalText}><Text style={styles.bold}>Created At:</Text> {selectedTask?.createdAt}</Text>
                        <Text style={styles.modalText}><Text style={styles.bold}>Assigned To:</Text> {selectedTask?.assignedTo}</Text>
                        <Text style={styles.modalText}><Text style={styles.bold}>Status:</Text> {selectedTask?.status}</Text>

                        {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}

                        {selectedTask?.status === 'Pending' && (
                            <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptTask}>
                                <Text style={styles.acceptButtonText}>Accept Task</Text>
                            </TouchableOpacity>
                        )}

                        {selectedTask?.status === 'In Progress' && (
                            <View>
                                <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                                    <Text style={styles.imageButtonText}>Upload from Gallery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.imageButton} onPress={captureImage}>
                                    <Text style={styles.imageButtonText}>Capture Image</Text>
                                </TouchableOpacity>
                                {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}
                                <TouchableOpacity style={styles.completeButton} onPress={handleCompleteTask}>
                                    <Text style={styles.completeButtonText}>Mark as In Review</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            
        </View>
    );
}

const getStatusStyle = (status) => {
    switch (status) {
        case 'Pending': return { color: '#FFA500' };
        case 'In Progress': return { color: '#007AFF' };
        case 'Completed': return { color: '#28A745' };
        case 'In Review': return { color: '#FF8C00' };
        default: return { color: '#000' };
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#3a2721',
        paddingVertical: 50,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    filterButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    activeFilter: {
        backgroundColor: '#3a2721',
    },
    filterText: {
        color: '#3a2721',
        fontWeight: '600',
        fontSize: 14,
    },
    activeFilterText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    taskList: {
        padding: 20,
    },
    taskCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    taskDetailsContainer: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#3a2721',
    },
    taskStatus: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 5,
        color: '#3a2721',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        padding: 25,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#3a2721',
        marginBottom: 15,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#3a2721',
    },
    bold: {
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#3a2721',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    acceptButton: {
        backgroundColor: '#FFA500',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    acceptButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    imageButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    imageButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    previewImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
    },
    completeButton: {
        backgroundColor: '#28A745',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    completeButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#AAA',
    },
    manageTasksButton: {
        backgroundColor: '#3a2721',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    manageTasksButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
