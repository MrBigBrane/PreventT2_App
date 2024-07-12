import { Text, View } from "react-native";
import { supabase } from "../../lib/supabase";


export default async function getWeeklyMinutes(userId) {

    let creationDate = await supabase
        .from("profiles")
        .select("user_created_at")
        .eq("id", userId)

    let { data, error } = await supabase.rpc("get_weekly_activity", {
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
        let weekStart = new Date(row.week_start);
        // weekStart = weekStart.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        weekStart = weekStart.toString().substring(4, 10) + " '" + weekStart.toString().substring(13, 15)
        if(counter % 2 == 0) {
            graphObject.push({ value: row.total_minutes, date: weekStart, label: weekStart, labelComponent: () => customLabel(weekStart) })
        }
        else {
            graphObject.push({ value: row.total_minutes, date: weekStart })
        }
        counter++
        
    })
    return graphObject
}