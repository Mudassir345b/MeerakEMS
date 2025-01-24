import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Modal, TextInput } from "react-native";

export default function LeaveManagementAdmin() {
    const [leaves, setLeaves] = useState([
        { id: "1", employeeName: "John Doe", reason: "Sick Leave", status: "Pending" },
        { id: "2", employeeName: "Jane Smith", reason: "Family Emergency", status: "Approved" },
        { id: "3", employeeName: "Mark Brown", reason: "Vacation", status: "Rejected" },
    ]);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openLeaveDetails = (leave) => {
        setSelectedLeave(leave);
        setModalVisible(true);
    };

    const handleApproveLeave = () => {
        if (selectedLeave) {
            const updatedLeaves = leaves.map((leave) =>
                leave.id === selectedLeave.id ? { ...leave, status: "Approved" } : leave
            );
            setLeaves(updatedLeaves);
            Alert.alert("Success", "Leave approved successfully!");
            setModalVisible(false);
        }
    };

    const handleRejectLeave = () => {
        if (selectedLeave) {
            const updatedLeaves = leaves.map((leave) =>
                leave.id === selectedLeave.id ? { ...leave, status: "Rejected" } : leave
            );
            setLeaves(updatedLeaves);
            Alert.alert("Success", "Leave rejected successfully!");
            setModalVisible(false);
        }
    };

    const renderLeave = ({ item }) => (
        <TouchableOpacity style={styles.leaveCard} onPress={() => openLeaveDetails(item)}>
            <View style={styles.leaveDetailsContainer}>
                <Text style={styles.leaveEmployeeName}>{item.employeeName}</Text>
                <Text style={[styles.leaveStatus, getStatusStyle(item.status)]}>{item.status}</Text>
            </View>
            <Text style={styles.leaveReason} numberOfLines={1} ellipsizeMode="tail">
                {item.reason}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Leave Management</Text>
            </View>

            <FlatList
                data={leaves}
                keyExtractor={(item) => item.id}
                renderItem={renderLeave}
                contentContainerStyle={styles.leaveList}
                ListEmptyComponent={<Text style={styles.emptyText}>No leave requests found.</Text>}
            />

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Leave Details</Text>
                        <Text style={styles.modalText}><Text style={styles.bold}>Employee Name:</Text> {selectedLeave?.employeeName}</Text>
                        <Text style={styles.modalText}><Text style={styles.bold}>Reason:</Text> {selectedLeave?.reason}</Text>
                        <Text style={styles.modalText}><Text style={styles.bold}>Status:</Text> {selectedLeave?.status}</Text>

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.approveButton} onPress={handleApproveLeave}>
                                <Text style={styles.approveButtonText}>Approve</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rejectButton} onPress={handleRejectLeave}>
                                <Text style={styles.rejectButtonText}>Reject</Text>
                            </TouchableOpacity>
                        </View>

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
        case "Pending":
            return { color: "#FFA500" };
        case "Approved":
            return { color: "#28A745" };
        case "Rejected":
            return { color: "#DC3545" };
        default:
            return { color: "#000" };
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    header: {
        backgroundColor: "#3a2721",
        paddingVertical: 50,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: "center",
    },
    headerText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    leaveList: {
        padding: 20,
    },
    leaveCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    leaveDetailsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leaveEmployeeName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#3a2721",
    },
    leaveStatus: {
        fontSize: 14,
        fontWeight: "bold",
    },
    leaveReason: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#FFFFFF",
        padding: 25,
        borderRadius: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#3a2721",
        marginBottom: 15,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
        color: "#3a2721",
    },
    bold: {
        fontWeight: "bold",
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
    approveButton: {
        backgroundColor: "#28A745",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        flex: 1,
        marginHorizontal: 5,
    },
    approveButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    rejectButton: {
        backgroundColor: "#DC3545",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        flex: 1,
        marginHorizontal: 5,
    },
    rejectButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    closeButton: {
        backgroundColor: "#3a2721",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    closeButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});
