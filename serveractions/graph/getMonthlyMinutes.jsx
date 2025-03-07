import { Text, View } from "react-native";
import { supabase } from "../../lib/supabase";


export default async function getMonthlyMinutes(userId) {

    let creationDate = await supabase
        .from("profiles")
        .select("user_created_at")
        .eq("id", userId)

    let { data, error } = await supabase.rpc("get_monthly_activity", {
        user_id: userId,
        user_creation_date: creationDate.data[0].user_created_at
    });
    if (error) console.error(error);

    let minuteGraph = data;

    let graphObject = []
    const customLabel = val => {
        return (
            <View style={{ width: 80, }}>
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 12}}>{val}</Text>
            </View>
        );
    };
    let counter = 0;
    minuteGraph.map((row) => {
        let monthStart = new Date(row.month_start + 1);
        monthStart = monthStart.toString().substring(4, monthStart.toString().indexOf(" ", 4))
            graphObject.push({
              value: row.total_minutes,
              date: monthStart,
              label: monthStart,
              labelComponent: () => customLabel(monthStart),
            });
    })
    // return minuteGraph;
    return graphObject
}