import { supabase } from "../../lib/supabase";

export default async function getWeightDifference(userId) {
    let { data, error } = await supabase.rpc("get_weight_difference", {
        user_id: userId,
    });
    if (error) console.error(error);

    else {
        console.log(data);

        return data
    }
}