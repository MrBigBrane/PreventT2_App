import { supabase } from "../../lib/supabase";

export default function JoinClass() {
    const [name, setName] = useState("");
    const [classCode, setClassCode] = useState("");

    async function joinClass() {
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase.from("profiles").insert({
            name: name,
            user_created_at: name
        }).eq("class_codes", classCode);
    }

    return (
        <View>
            <Text>JoinClass</Text>
        </View>
    );
}