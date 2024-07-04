import { supabase } from "../../lib/supabase";

export default async function fetchWeight(userId) {
    let creationDate = await supabase
        .from("profiles")
        .select("user_created_at")
        .eq("id", userId)

    let { data, error } = await supabase.rpc("get_weekly_weight_average", {
        user_id: userId,
        user_creation_date: creationDate.data[0].user_created_at
    });
    if (error) console.error(error);

    let weightGraph = data;

    let weeks = []
    let weight = []
    let hiddenIndex = []
    let counter = 0;
    let counter2 = 0;
    weightGraph.map((row) => {
        if(counter >= weightGraph.length - 4) {
        weeks.push(row.week_start)
        weight.push(row.avg_weight)
        if(row.avg_weight === null) {
            hiddenIndex.push(counter2)
        }
        counter2++
        }
        else {
            counter++;
        }
    })

    weightGraph = [weight, weeks, hiddenIndex];
    return weightGraph
}