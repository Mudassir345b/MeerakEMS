import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    DrawerLayoutAndroid,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TaskModal from '../components/TaskModal';  // Import the TaskModal component

export default function AdminDashboard() {
    const navigation = useNavigation();

    // State for real-time data
    const [realTimeData, setRealTimeData] = useState({
        activeEmployees: 0,
        totalTasks: 0,
        pendingTasks: 0,
        completedTasks: 0,
        leaveRequests: 0,
        availableEmployees: 0,
    });

    // State for notifications
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'Task updated' },
        { id: 2, message: 'Leave request approved' },
    ]);

    // Dummy employee data
    const employees = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Michael Johnson' },
        { id: 4, name: 'Emily Davis' },
    ];

    // State for modal visibility
    const [isModalVisible, setModalVisible] = useState(false);

    // Fetch real-time data (simulated with useEffect and dummy data)
    useEffect(() => {
        const fetchData = () => {
            // Simulate fetching real-time data
            setRealTimeData({
                activeEmployees: 120,
                totalTasks: 800,
                pendingTasks: 15,
                completedTasks: 65,
                leaveRequests: 10,
                availableEmployees: 25,
            });
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // Update every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const handleNavigation = (section) => {
        Alert.alert('Navigation', `Redirecting to ${section}...`);
    };

    const addTask = ({ taskTitle, taskDescription, selectedEmployee }) => {
        // Logic for adding the task
        console.log('Task Added:', { taskTitle, taskDescription, selectedEmployee });
        setModalVisible(false); // Close modal after adding task
    };

    const drawer = useRef(null); // Initialize a ref for DrawerLayoutAndroid

    const openDrawer = () => {
        if (drawer.current) {
            drawer.current.openDrawer(); // Open the drawer
        }
    };

    const closeDrawer = () => {
        if (drawer.current) {
            drawer.current.closeDrawer(); // Close the drawer
        }
    };

    const renderDrawerContent = () => (
        <View style={styles.drawerContent}>
            <Text style={styles.drawerHeader}>Notifications</Text>
            {/* Real-time notifications */}
            {notifications.map((notification) => (
                <Text key={notification.id} style={styles.notificationItem}>
                    {notification.message}
                </Text>
            ))}
        </View>
    );

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition="right"
            renderNavigationView={renderDrawerContent}
            onDrawerClose={closeDrawer}
            onDrawerOpen={openDrawer}
        >
            <View style={styles.container}>
                {/* Header with Notification Icon */}
                <View style={styles.header}>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerText}>Welcome, Admin</Text>
                        <Text style={styles.subHeaderText}>Manage everything at your fingertips</Text>
                    </View>
                    {/* Notification Icon */}
                    <Ionicons
                        name="notifications"
                        size={30}
                        color="#fff"
                        style={styles.notificationIcon}
                        onPress={openDrawer} // Open the drawer on icon press
                    />
                </View>

                {/* Content */}
                <ScrollView contentContainerStyle={styles.content}>
                    {/* Stats Section with Buttons */}
                    <View style={styles.statsSection}>
                        <TouchableOpacity
                            style={styles.statCard}
                            onPress={() => handleNavigation('Active Employees')}>
                            <Ionicons name="person" size={24} color="#fff" />
                            <Text style={styles.statNumber}>{realTimeData.activeEmployees}</Text>
                            <Text style={styles.statLabel}>Active Employees</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.statCard}
                            onPress={() => handleNavigation('Total Tasks')}>
                            <FontAwesome5 name="tasks" size={24} color="#fff" />
                            <Text style={styles.statNumber}>{realTimeData.totalTasks}</Text>
                            <Text style={styles.statLabel}>Total Tasks</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.statCard}
                            onPress={() => handleNavigation('Pending Tasks')}>
                            <Ionicons name="time" size={24} color="#fff" />
                            <Text style={styles.statNumber}>{realTimeData.pendingTasks}</Text>
                            <Text style={styles.statLabel}>Pending Tasks</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.statCard}
                            onPress={() => handleNavigation('Completed Tasks')}>
                            <Ionicons name="checkmark-done" size={24} color="#fff" />
                            <Text style={styles.statNumber}>{realTimeData.completedTasks}</Text>
                            <Text style={styles.statLabel}>Completed Tasks</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.statCard}
                            onPress={() => navigation.navigate('LeaveAdmin')}>
                            <Ionicons name="calendar" size={24} color="#fff" />
                            <Text style={styles.statNumber}>{realTimeData.leaveRequests}</Text>
                            <Text style={styles.statLabel}>Request Leave</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.statCard}
                            onPress={() => handleNavigation('Available Employees')}>
                            <Ionicons name="people" size={24} color="#fff" />
                            <Text style={styles.statNumber}>{realTimeData.availableEmployees}</Text>
                            <Text style={styles.statLabel}>Available Employees</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Navigation Buttons for other sections */}
                    <TouchableOpacity
                        style={styles.navButton}
                        onPress={() => navigation.navigate('MngEmp')}>
                        <Ionicons name="person-circle" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.navButtonText}>Manage Users</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navButton}
                        onPress={() => navigation.navigate('MngTask')}>
                        <FontAwesome5 name="clipboard-list" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.navButtonText}>Manage Tasks</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navButton}
                        onPress={() => navigation.navigate('Setting')}>
                        <Ionicons name="settings" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.navButtonText}>Settings</Text>
                    </TouchableOpacity>

                    {/* Add Task Button */}
                    <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                        <Ionicons name="add" size={22} color="#fff" />
                        <Text style={styles.addButtonText}>Create Task</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Task Modal */}
                <TaskModal
                    isVisible={isModalVisible}
                    onClose={() => setModalVisible(false)}
                    onAddTask={addTask}
                    employees={employees}
                />
            </View>
        </DrawerLayoutAndroid>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#3a2721',
        paddingVertical: 50,
        paddingHorizontal: 15,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTextContainer: {
        flex: 1,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 20,
        marginBottom: 5,
    },
    subHeaderText: {
        fontSize: 16,
        color: '#D3D3D3',
    },
    notificationIcon: {
        marginTop: 20,
    },
    content: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
    },
    statsSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100%',
    },
    statCard: {
        backgroundColor: '#3a2721',
        borderRadius: 15,
        padding: 13,
        alignItems: 'center',
        width: '30%',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#D3D3D3',
        marginTop: 5,
        textAlign: 'center',
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3a2721',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        width: '100%',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 4,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
    icon: {
        fontSize: 24,
        color: '#fff',
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#3a2721',
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginLeft: 10,
    },
    drawerContent: {
        flex: 1,
        padding: 15,
        backgroundColor: '#3a2721',
        color: '#fff',
    },
    drawerHeader: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 10,
    },
    notificationItem: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 8,
    },
});
