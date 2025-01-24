import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function Setting() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [reportType, setReportType] = useState(null);
    const [timeFrame, setTimeFrame] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [employees] = useState([
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Alice Smith' },
        { id: '3', name: 'Michael Brown' },
        { id: '4', name: 'Chris Johnson' },
        { id: '5', name: 'Patricia Adams' },
    ]);

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDownload = () => {
        if (reportType === 'task') {
            if (!timeFrame) {
                Alert.alert('Error', 'Please select a time frame for the task report.');
                return;
            }
            Alert.alert('Download', `Downloading ${timeFrame} task report.`);
        } else if (reportType === 'employee') {
            if (!timeFrame) {
                Alert.alert('Error', 'Please select a time frame for the employee report.');
                return;
            }
            Alert.alert('Download', `Downloading ${timeFrame} report for selected employee.`);
        }
        setModalVisible(false);
    };

    const getButtonStyle = (selected) => ({
        backgroundColor: selected ? '#3a2721' : '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    });

    const getButtonTextStyle = (selected) => ({
        color: selected ? '#fff' : '#3a2721',
        fontWeight: 'bold',
        marginLeft: 8,
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Settings</Text>
            </View>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AdminSetting')}>
                    <FontAwesome name="user" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Manage Admin Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                        setModalVisible(true);
                        setReportType(null);
                        setTimeFrame(null);
                    }}
                >
                    <FontAwesome name="download" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Download Report</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {!reportType ? (
                            <>
                                <Text style={styles.modalTitle}>Select Report Type</Text>
                                <TouchableOpacity
                                    style={getButtonStyle(reportType === 'task')}
                                    onPress={() => setReportType('task')}
                                >
                                    <FontAwesome name="tasks" size={20} color={reportType === 'task' ? '#fff' : '#3a2721'} />
                                    <Text style={getButtonTextStyle(reportType === 'task')}>Task Report</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={getButtonStyle(reportType === 'employee')}
                                    onPress={() => setReportType('employee')}
                                >
                                    <FontAwesome name="users" size={20} color={reportType === 'employee' ? '#fff' : '#3a2721'} />
                                    <Text style={getButtonTextStyle(reportType === 'employee')}>Employee Report</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.modalButtonText}>Close</Text>
                                </TouchableOpacity>
                            </>
                        ) : reportType === 'task' ? (
                            <>
                                <Text style={styles.modalTitle}>Select Time Frame</Text>
                                <TouchableOpacity
                                    style={getButtonStyle(timeFrame === 'daily')}
                                    onPress={() => setTimeFrame('daily')}
                                >
                                    <FontAwesome name="calendar" size={20} color={timeFrame === 'daily' ? '#fff' : '#3a2721'} />
                                    <Text style={getButtonTextStyle(timeFrame === 'daily')}>Daily</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={getButtonStyle(timeFrame === 'weekly')}
                                    onPress={() => setTimeFrame('weekly')}
                                >
                                    <FontAwesome name="calendar" size={20} color={timeFrame === 'weekly' ? '#fff' : '#3a2721'} />
                                    <Text style={getButtonTextStyle(timeFrame === 'weekly')}>Weekly</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={getButtonStyle(timeFrame === 'monthly')}
                                    onPress={() => setTimeFrame('monthly')}
                                >
                                    <FontAwesome name="calendar" size={20} color={timeFrame === 'monthly' ? '#fff' : '#3a2721'} />
                                    <Text style={getButtonTextStyle(timeFrame === 'monthly')}>Monthly</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.modalButtonText}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={getButtonStyle(true)}
                                    onPress={handleDownload}
                                >
                                    <FontAwesome name="download" size={20} color="#fff" />
                                    <Text style={getButtonTextStyle(true)}>Download</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={styles.modalTitle}>Select Employee</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Search Employee"
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                />
                                <ScrollView style={styles.employeeList}>
                                    {filteredEmployees.map((employee) => (
                                        <TouchableOpacity
                                            key={employee.id}
                                            style={getButtonStyle(searchQuery === employee.name)}
                                            onPress={() => {
                                                setSearchQuery(employee.name);
                                                setTimeFrame(null);
                                            }}
                                        >
                                            <FontAwesome name="user" size={20} color={searchQuery === employee.name ? '#fff' : '#3a2721'} />
                                            <Text style={getButtonTextStyle(searchQuery === employee.name)}>{employee.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <Text style={styles.modalTitle}>Select Time Frame</Text>
                                <TouchableOpacity
                                    style={getButtonStyle(timeFrame === 'daily')}
                                    onPress={() => setTimeFrame('daily')}
                                >
                                    <FontAwesome name="calendar" size={20} color={timeFrame === 'daily' ? '#fff' : '#3a2721'} />
                                    <Text style={getButtonTextStyle(timeFrame === 'daily')}>Daily</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={getButtonStyle(timeFrame === 'weekly')}
                                    onPress={() => setTimeFrame('weekly')}
                                >
                                    <FontAwesome name="calendar" size={20} color={timeFrame === 'weekly' ? '#fff' : '#3a2721'} />
                                    <Text style={getButtonTextStyle(timeFrame === 'weekly')}>Weekly</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={getButtonStyle(timeFrame === 'monthly')}
                                    onPress={() => setTimeFrame('monthly')}
                                >
                                    <FontAwesome name="calendar" size={20} color={timeFrame === 'monthly' ? '#fff' : '#3a2721'} />
                                    <Text style={getButtonTextStyle(timeFrame === 'monthly')}>Monthly</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.modalButtonText}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={getButtonStyle(true)}
                                    onPress={handleDownload}
                                >
                                    <FontAwesome name="download" size={20} color="#fff" />
                                    <Text style={getButtonTextStyle(true)}>Download</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    header: {
        backgroundColor: '#3a2721',
        paddingVertical: 50,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: { fontSize: 30, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
    contentContainer: { padding: 20 },
    actionButton: {
        backgroundColor: '#3a2721',
        padding: 20,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 12,
        textTransform: 'uppercase', // Added uppercase for emphasis
    },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#fff', padding: 25, borderRadius: 15, width: '85%' },
    modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#3a2721', marginBottom: 20, textAlign: 'center' },
    modalButton: { backgroundColor: '#F44336', padding: 12, borderRadius: 8, marginBottom: 12, alignItems: 'center' },
    modalButtonText: { color: '#fff', fontWeight: 'bold' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 20, backgroundColor: '#fff' },
    employeeList: { maxHeight: 180 },
});