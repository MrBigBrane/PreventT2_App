import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { supabase } from '../../../lib/supabase';

export default function ViewStudentInfo() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }

    , [])

    async function fetchData() {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from("onboarding")
            .select()
            .eq('id', user.id)

        if (error) {
            console.log(error);
        } else {
            console.log(data);
            setData(data);
        }
    }

    return (
        <ScrollView>
            <Text variant="titleLarge" style={styles.title}>Name & Contact Information</Text>
            <Text variant="bodyLarge" style={styles.text}>Name: </Text>
            <Text variant="bodyLarge" style={styles.text}>Phone-Number: {data.phone_number}</Text>
            <Text variant="bodyLarge" style={styles.text}>Email-Address: </Text>
            <Text variant="bodyLarge" style={styles.text}>City: </Text>
            <Text variant="bodyLarge" style={styles.text}>State: </Text>
            <Text variant="bodyLarge" style={styles.text}>Contact Through WhatsApp?: </Text>
            <Divider />
            <Text variant="titleLarge" style={styles.title}>General Information</Text>
            <Text variant='bodyLarge' style={styles.text}>Age: </Text>
            <Text variant='bodyLarge' style={styles.text}>Weight: </Text>
            <Text variant='bodyLarge' style={styles.text}>Weight Goal: </Text>
            <Text variant='bodyLarge' style={styles.text}>Height: </Text>
            <Text variant='bodyLarge' style={styles.text}>Sex: </Text>
            <Text variant='bodyLarge' style={styles.text}>Gender: </Text>
            <Text variant='bodyLarge' style={styles.text}>Ethnicity: </Text>
            <Text variant='bodyLarge' style={styles.text}>Race: </Text>
            <Text variant='bodyLarge' style={styles.text}>Highest Level of Education: </Text>
            <Text variant='bodyLarge' style={styles.text}>Health Insurance: </Text>
            <Divider />
            <Text variant='titleLarge' style={styles.title}>Health Information</Text>
            <Text variant='bodyLarge' style={styles.text}>A1C(%): </Text>
            <Text variant='bodyLarge' style={styles.text}>Gestational Diabetes: </Text>
            <Text variant='bodyLarge' style={styles.text}>Taken CDC Risk Assessment: </Text>
            <Text variant='bodyLarge' style={styles.text}>Risk Assessment Score: </Text>
            <Text variant='bodyLarge' style={styles.text}>Family History of Diabetes: </Text>
            <Text variant='bodyLarge' style={styles.text}>Diagnosed as Prediabetic: </Text>
            <Text variant='bodyLarge' style={styles.text}>If Yes, Taken Blood Glucose Test: </Text>
            <Text variant='bodyLarge' style={styles.text}>If yes, was it with a clinical diagnosis of GDM during a previous pregnancy?: </Text>
            <Text variant='bodyLarge' style={styles.text}>If yes, was it determined by a prediabetes risk test?: </Text>
            <Text variant='bodyLarge' style={styles.text}>High Blood Pressure: </Text>
            <Text variant='bodyLarge' style={styles.text}>Considered Active?: </Text>
            <Divider />
            <Text variant='titleLarge' style={styles.title}>DPP Questions</Text>
            <Text variant='bodyLarge' style={styles.text}>Who or what motivated you to decide to join this program?: </Text>
            <Text variant='bodyLarge' style={styles.text}>Did a healthcare professional help you in your decision to join?: </Text>
            <Text variant='bodyLarge' style={styles.text}>Will you be able to attend zoom classes or watch videos?: </Text>
            <Text variant='bodyLarge' style={styles.text}>Are you committed to improving?: </Text>
            <Text variant='bodyLarge' style={styles.text}>Do you allow NRIVA to share your weight confidentially with the CDC?: </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        margin: 10,
        // fontSize: 20,
        // fontWeight: 'bold',
    },
    textSpace: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginHorizontal: 0,
    },
    title: {
        marginTop: 10,
        fontWeight: 'bold',
    },
})