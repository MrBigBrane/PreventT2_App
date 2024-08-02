import { supabase } from "../../lib/supabase";

export default async function getTotalMinutes(userId) {
    let { data, error } = await supabase.rpc("sum_minutes_exercised", {
        user_id: userId,
    });
    if (error) console.error(error);

    else {
        console.log(data);

        return data
    }
}