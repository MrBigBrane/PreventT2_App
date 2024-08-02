import { supabase } from '../../lib/supabase'
import { ScrollView, StyleSheet, View } from "react-native";
import { useLayoutEffect, useState } from 'react';
import FloatingButton from '../../components/userdashboard/FloatingButton';
import WeightGraph from '../../components/graph/WeightGraph';
import MinutesGraph from '../../components/graph/MinutesGraph';
import { Text } from 'react-native-paper';
import getWeightDifference from '../../serveractions/breakdown/getWeightDifference';
import getTotalMinutes from '../../serveractions/breakdown/getTotalMinutes';

export default function Dashboard() {
    const [user, setUser] = useState({});
    const [weightDiff, setWeightDiff] = useState('');
    const [totalMin, setTotalMin] = useState('');

    useLayoutEffect(() => {
        async function getUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);

            setWeightDiff(await getWeightDifference(user.id));
            setTotalMin(await getTotalMinutes(user.id));
        }
        getUser();
    }, []);

    
    
    

    return (
      <View style={styles.container}>
        <Text>Dashboard</Text>
        <Text>{weightDiff}</Text>
        {user.id && (
          <View>
            <WeightGraph user={user} />
            <MinutesGraph user={user} />
          </View>
        )}

        <FloatingButton />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});