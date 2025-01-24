import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location"; // Import location module
import { useNavigation } from '@react-navigation/native';

export default function EmployeeDashboard() {
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);
    const [time, setTime] = useState(""); // Real-time clock
    const [locationPermission, setLocationPermission] = useState(false);
    const navigation = useNavigation();
    const [employee, setEmployee] = useState({
        name: "John Doe",
        position: "Software Engineer",
    });

    // Real-time clock
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().toLocaleTimeString();
            setTime(currentTime);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Request location permission
    useEffect(() => {
        const getLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === "granted") {
                setLocationPermission(true);
            } else {
                Alert.alert("Permission Denied", "Location access is required for Check-In/Check-Out.");
            }
        };
        getLocationPermission();
    }, []);

    // Handle Check-In and Check-Out
    const handleCheckIn = async () => {
        if (!locationPermission) {
            Alert.alert("Permission Denied", "Enable location services to proceed.");
            return;
        }

        const time = new Date().toLocaleTimeString();
        setCheckInTime(time);
        Alert.alert("Checked In", `You have checked in at ${time}`);
    };

    const handleCheckOut = async () => {
        if (!locationPermission) {
            Alert.alert("Permission Denied", "Enable location services to proceed.");
            return;
        }

        const time = new Date().toLocaleTimeString();
        setCheckOutTime(time);
        Alert.alert("Checked Out", `You have checked out at ${time}`);
    };

    // Feature buttons
    const features = [
        { id: "1", name: "Request Leave", icon: "calendar-remove" },
        { id: "2", name: "Assigned Tasks", icon: "clipboard-list" },
        { id: "3", name: "Completed Tasks", icon: "check-circle" },
        { id: "4", name: "Pending Tasks", icon: "clock" },
    ];

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: "https://via.placeholder.com/80" }} // Placeholder Profile Image
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.welcomeText}>Welcome, back</Text>
                        <Text style={styles.employeeName}>{employee.name}</Text>
                        <Text style={styles.employeeID}>{employee.position}</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                {/* Check-In/Check-Out Section */}
                <View style={styles.checkInOutContainer}>
                    <Text style={styles.time}>{time}</Text>
                    <Text style={styles.status}>
                        You are {checkInTime ? "checked in" : "not checked in"} today.
                    </Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.checkInButton, checkInTime ? styles.disabledButton : null]}
                            onPress={!checkInTime ? handleCheckIn : null}
                        >
                            <Text style={styles.buttonText}>Check In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.checkOutButton, !checkInTime || checkOutTime ? styles.disabledButton : null]}
                            onPress={checkInTime && !checkOutTime ? handleCheckOut : null}
                        >
                            <Text style={styles.buttonText}>Check Out</Text>
                        </TouchableOpacity>
                    </View>
                    {checkInTime && (
                        <Text style={styles.timeText}>Check-in Time: {checkInTime}</Text>
                    )}
                    {checkOutTime && (
                        <Text style={styles.timeText}>Check-out Time: {checkOutTime}</Text>
                    )}
                </View>

                {/* Action Buttons Section */}
                {(checkInTime && !checkOutTime) || (!checkInTime && !checkOutTime) || checkOutTime ? (
                    <View style={styles.buttonsContainer}>
                        {features.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.button}
                                onPress={() =>
                                    item.name === "Request Leave"
                                        ? navigation.navigate("LeaveEmp")
                                        : navigation.navigate("EmpTask")
                                }
                            >
                                <Icon name={item.icon} size={30} color="#fff" />
                                <Text style={styles.buttonText}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : null}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    header: {
        backgroundColor: "#3a2721", // App theme color
        padding: 35,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: "flex-start", // Align header content to the left
        marginBottom: 30,
        marginTop: 0, // Adjusted to move header down
    },
    welcomeText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
        borderWidth: 2,
        borderColor: "#fff", // Optional: add a border for a cleaner look
    },
    employeeName: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    employeeID: {
        color: "#FFF",
        fontSize: 14,
    },
    checkInOutContainer: {
        backgroundColor: "#FFF",
        padding: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    time: {
        color: "#FFA500",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    status: {
        color: "#3a2721",
        fontSize: 14,
        textAlign: "center",
        marginVertical: 10,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    checkInButton: {
        backgroundColor: "#28A745", // Green for Check In
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    checkOutButton: {
        backgroundColor: "#DC3545", // Red for Check Out
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    disabledButton: {
        backgroundColor: "#CCCCCC",
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    timeText: {
        color: "#3a2721",
        fontSize: 16,
        textAlign: "center",
        marginTop: 10,
    },
    buttonsContainer: {
        marginTop: 30,
        paddingHorizontal: 10,
    },
    button: {
        flexDirection: "row",
        backgroundColor: "#3a2721",
        padding: 15,
        marginBottom: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "flex-start",
        shadowColor: "#3a2721",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    buttonText: {
        marginLeft: 10,
        color: "#fff", // App theme color
        fontWeight: "bold",
        fontSize: 16,
    },
});