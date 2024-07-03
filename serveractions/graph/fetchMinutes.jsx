import { supabase } from "../../lib/supabase";


export default async function fetchMinutes() {

    let { data: { user } } = await supabase.auth.getUser();

    let creationDate = await supabase
        .from("profiles")
        .select("user_created_at")
        .eq("id", user.id)

    let { data, error } = await supabase.rpc("get_weekly_activity", {
        user_id: user.id,
        user_creation_date: creationDate.data[0].user_created_at
    });
    if (error) console.error(error);

    let minuteGraph = data;

    let weeks = []
    let minutes = []
    let counter = 0;
    minuteGraph.map((row) => {
        if (counter === minuteGraph.length - 4) {
            weeks.push(row.week_start)
        minutes.push(row.total_minutes)
        }
        else {
            counter++;
        }
    })
    minuteGraph = [minutes, weeks];
    return minuteGraph;
}