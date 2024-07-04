import { supabase } from "../../lib/supabase";


export default async function fetchMinutes(userId) {

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

    let weeks = []
    let minutes = []
    let counter = 0;
    let graphObject = []
    minuteGraph.map((row) => {
        if (counter === minuteGraph.length - 4) {
        //     weeks.push(row.week_start)
        // minutes.push(row.total_minutes)
        graphObject.push({ value: row.total_minutes, label: row.week_start });
        }
        else {
            counter++;
        }
    })
    minuteGraph = [minutes, weeks];
    // return minuteGraph;
    console.log(graphObject)
    return graphObject
}