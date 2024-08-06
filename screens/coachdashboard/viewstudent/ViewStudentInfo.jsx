import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ViewStudentLogs() {
    return (
        <View>
            <Text>View Student Logs</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
})