import { supabase } from '../../lib/supabase'
import { ScrollView, StyleSheet, View } from "react-native";
import { useLayoutEffect, useState } from 'react';
import FloatingButton from '../../components/userdashboard/FloatingButton';
import WeightGraph from '../../components/graph/WeightGraph';
import MinutesGraph from '../../components/graph/MinutesGraph';

export default function Dashboard() {
    const [user, setUser] = useState({});

    useLayoutEffect(() => {
        async function getUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        }
        getUser();
    }, []);

    
    
    

    return (
      <View style={styles.container}>
        {user.id && <WeightGraph user={user} />}
        {user.id && <MinutesGraph user={user} />}

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