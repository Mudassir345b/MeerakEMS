import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskModal from '../components/TaskModal';

export default function ManageTasks() {
    const [tasks, setTasks] = useState([
        { id: '5', title: 'Fix Server Issue', description: 'Resolve downtime error', createdAt: '2025-01-11 10:00 AM', assignedTo: 'John Doe', startTime: null, completedAt: null, status: 'Pending' },
        { id: '2', title: 'Update Database', description: 'Migrate to new schema', createdAt: '2025-01-11 9:30 AM', assignedTo: 'Alice Smith', startTime: '2025-01-11 10:00 AM', completedAt: null, status: 'In Progress' },
        { id: '3', title: 'Deploy Web App', description: 'Deploy to production', createdAt: '2025-01-10 3:00 PM', assignedTo: 'Michael Brown', startTime: '2025-01-10 4:00 PM', completedAt: '2025-01-10 7:00 PM', status: 'Completed' },
        // Additional sample tasks
    ]);

    const [employees, setEmployees] = useState([
        { id: '1', name: 'John Doe', role: 'Backend Developer' },
        { id: '2', name: 'Alice Smith', role: 'Database Administrator' },
        { id: '3', name: 'Michael Brown', role: 'Frontend Developer' },
        { id: '4', name: 'Sophia Lee', role: 'Security Analyst' },
        { id: '5', name: 'David Wilson', role: 'Mobile App Developer' },
    ]);

    const [filter, setFilter] = useState('All');
    const [selectedTask, setSelectedTask] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const filteredTasks = filter === 'All' ? tasks : tasks.filter(task => task.status === filter);

    const openTaskDetails = (task) => {
        setSelectedTask(task);
        setModalVisible(true);
    };

    const renderTask = ({ item }) => (
        <TouchableOpacity style={styles.taskCard} onPress={() => openTaskDetails(item)}>
            <View style={styles.taskDetailsContainer}>
                <Text style={styles.taskTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                <Text style={[styles.taskStatus, getStatusStyle(item.status)]}>{item.status}</Text>
            </View>
            <View style={styles.taskActions}>
                <TouchableOpacity onPress={() => Alert.alert('Edit Task', `Editing: ${item.title}`)}>
                    <Ionicons name="create-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                    <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const deleteTask = (id) => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete', style: 'destructive', onPress: () => {
                        setTasks(tasks.filter(task => task.id !== id));
                    }
                },
            ]
        );
    };

    const addTask = ({ taskTitle, taskDescription, selectedEmployee }) => {
        const newTask = {
            id: (tasks.length + 1).toString(),
            title: taskTitle,
            description: taskDescription,
            createdAt: new Date().toLocaleString(),
            assignedTo: selectedEmployee,
            startTime: null,
            completedAt: null,
            status: 'Pending'
        };
        setTasks([...tasks, newTask]);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Manage Tasks</Text>
            </View>

            <View style={styles.filterContainer}>
                {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
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

            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                renderItem={renderTask}
                contentContainerStyle={styles.taskList}
                ListEmptyComponent={<Text style={styles.emptyText}>No tasks found</Text>}
            />

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedTask?.title}</Text>
                        <Text style={styles.modalText}><Text style={styles.bold}>Description:</Text> {selectedTask?.description}</Text>
                        <Text style={styles.modalText}><Text style={styles.bold}>Created At:</Text> {selectedTask?.createdAt}</Text>
                        <Text style={styles.modalText}><Text style={styles.bold}>Assigned To:</Text> {selectedTask?.assignedTo}</Text>
                        <Text style={styles.modalText}><Text style={styles.bold}>Start Time:</Text> {selectedTask?.startTime || 'Not Started'}</Text>
                        {selectedTask?.status === 'Completed' && (
                            <Text style={styles.modalText}><Text style={styles.bold}>Completed At:</Text> {selectedTask?.completedAt}</Text>
                        )}
                        <Text style={[styles.modalText, getStatusStyle(selectedTask?.status)]}><Text style={styles.bold}>Status:</Text> {selectedTask?.status}</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={18} color="#3a2721" />
                <Text style={{ fontSize: 16 }}>Create Task</Text>
            </TouchableOpacity>

            <TaskModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onAddTask={addTask}
                employees={employees}
            />
        </View>
    );
}

const getStatusStyle = (status) => {
    switch (status) {
        case 'Pending': return { color: '#FFA500' };
        case 'In Progress': return { color: '#007AFF' };
        case 'Completed': return { color: '#28A745' };
        default: return { color: '#000' };
    }
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    header: { backgroundColor: '#3a2721', paddingVertical: 50, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
    headerText: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
    filterContainer: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 },
    filterButton: { backgroundColor: '#ccc', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 20, marginHorizontal: 3 },
    activeFilter: { backgroundColor: '#3a2721' },
    filterText: { color: '#000', fontWeight: '600' },
    activeFilterText: { color: '#fff' },
    taskList: { padding: 20 },
    taskCard: { backgroundColor: '#3a2721', borderRadius: 12, padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    taskDetailsContainer: { flex: 1 },
    taskTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginRight: 10 },
    taskStatus: { fontSize: 14, fontWeight: '500', marginTop: 5 },
    taskActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10 },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { width: 300, backgroundColor: '#fff', padding: 20, borderRadius: 10 },
    modalTitle: { color: '#3a2721', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    modalText: { fontSize: 16, marginBottom: 5 },
    bold: { fontWeight: 'bold' },
    closeButton: { backgroundColor: '#3a2721', padding: 10, marginTop: 10, borderRadius: 5 },
    closeButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
    emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
});
