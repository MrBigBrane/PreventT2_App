import { View } from "react-native";
import { supabase } from "../../lib/supabase";
import { Text } from "react-native-paper";

export default async function getMonthlyWeight(userId) {
    let creationDate = await supabase
        .from("profiles")
        .select("user_created_at")
        .eq("id", userId)

    let { data, error } = await supabase.rpc("get_monthly_weight_average", {
        user_id: userId,
        user_creation_date: creationDate.data[0].user_created_at
    });
    if (error) console.error(error);

    let weightGraph = data;
    
    let graphObject = []
    const customLabel = val => {
        return (
            <View style={{ width: 80, }}>
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 12}}>{val}</Text>
            </View>
        );
    };
    let counter = 0;
    weightGraph.map((row) => {
        let monthStart = new Date(row.month_start + 1);
        // weekStart = weekStart.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        monthStart = monthStart.toString().substring(4, monthStart.toString().indexOf(" ", 4))
        graphObject.push({
            value: row.avg_weight,
            date: monthStart,
            label: monthStart,
            labelComponent: () => customLabel(monthStart),
          });
    })
    return graphObject
}