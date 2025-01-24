import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Modal, TextInput } from "react-native";

export default function LeaveManagementEmployee() {
    const [leaves, setLeaves] = useState([
        { id: "1", reason: "Sick Leave", status: "Pending" },
        { id: "2", reason: "Family Emergency", status: "Approved" },
        { id: "3", reason: "Vacation", status: "Rejected" },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newLeaveReason, setNewLeaveReason] = useState("");

    const handleApplyLeave = () => {
        if (!newLeaveReason.trim()) {
            Alert.alert("Error", "Please enter a reason for your leave.");
            return;
        }

        const newLeave = {
            id: (leaves.length + 1).toString(),
            reason: newLeaveReason,
            status: "Pending",
        };

        setLeaves([...leaves, newLeave]);
        setNewLeaveReason("");
        setModalVisible(false);
        Alert.alert("Success", "Your leave request has been submitted.");
    };

    const renderLeave = ({ item }) => (
        <View style={styles.leaveCard}>
            <Text style={styles.leaveReason}>{item.reason}</Text>
            <Text style={[styles.leaveStatus, getStatusStyle(item.status)]}>{item.status}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>My Leave Requests</Text>
            </View>

            <FlatList
                data={leaves}
                keyExtractor={(item) => item.id}
                renderItem={renderLeave}
                contentContainerStyle={styles.leaveList}
                ListEmptyComponent={<Text style={styles.emptyText}>No leave requests found.</Text>}
            />

            <TouchableOpacity style={styles.applyButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.applyButtonText}>Apply for Leave</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Apply for Leave</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter leave reason"
                            value={newLeaveReason}
                            onChangeText={setNewLeaveReason}
                        />

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.submitButton} onPress={handleApplyLeave}>
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
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
    leaveReason: {
        fontSize: 16,
        color: "#3a2721",
    },
    leaveStatus: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 5,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: "#AAA",
    },
    applyButton: {
        backgroundColor: "#3a2721",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 20,
    },
    applyButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
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
    textInput: {
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    submitButton: {
        backgroundColor: "#28A745",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        flex: 1,
        marginHorizontal: 5,
    },
    submitButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    cancelButton: {
        backgroundColor: "#DC3545",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        flex: 1,
        marginHorizontal: 5,
    },
    cancelButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});
