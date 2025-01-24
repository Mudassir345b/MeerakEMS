import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Modal,
    StyleSheet,
    ScrollView,
} from 'react-native';

// TaskModal Component to handle Add/Edit Task
const TaskModal = ({ isVisible, onClose, onSave, employees, taskDetails }) => {
    const [taskDetailsState, setTaskDetails] = useState(taskDetails || {
        id: null,
        title: '',
        description: '',
        assignedTo: '',
    });
    const [searchQuery, setSearchQuery] = useState('');
    
    // Filter employees based on the search query
    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSaveTask = () => {
        onSave(taskDetailsState);
        setTaskDetails({ id: null, title: '', description: '', assignedTo: '' }); // Reset task details
    };

    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        {taskDetailsState.id ? 'Edit Task' : 'Add Task'}
                    </Text>

                    {/* Task Title Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={taskDetailsState.title}
                        onChangeText={(text) => setTaskDetails({ ...taskDetailsState, title: text })}
                    />

                    {/* Task Description Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={taskDetailsState.description}
                        onChangeText={(text) => setTaskDetails({ ...taskDetailsState, description: text })}
                    />

                    {/* Search Employee Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Search Employee"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />

                    {/* Employee List */}
                    <ScrollView style={{ height: 100 }}>
                        <FlatList
                            data={filteredEmployees}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.employeeChip,
                                        taskDetailsState.assignedTo === item.name && styles.selectedEmployeeChip,
                                    ]}
                                    onPress={() => setTaskDetails({ ...taskDetailsState, assignedTo: item.name })}
                                >
                                    <Text
                                        style={[
                                            styles.employeeChipText,
                                            taskDetailsState.assignedTo === item.name && styles.selectedEmployeeChipText,
                                        ]}
                                    >
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>

                    {/* Save Button */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>

                    {/* Close/Cancel Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default TaskModal;

const styles = StyleSheet.create({
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
        width: '80%',
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
    employeeChip: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    employeeChipText: {
        fontSize: 16,
    },
    selectedEmployeeChip: {
        backgroundColor: '#4CAF50',
    },
    selectedEmployeeChipText: {
        color: '#fff',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#F44336',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
