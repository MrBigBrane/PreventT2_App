import { StyleSheet, View } from "react-native";
import { supabase } from "../../../lib/supabase";
import { useLayoutEffect, useState } from "react";
import ContactInfoCard from "../../../components/reset/ContactInfoCard";

export default function AccountInfo({ navigation, route }) {
    const [datum, setDatum] = useState({});

    async function getData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id);

        if(error) {
          console.log(error);
        } else {
          console.log(data);
          setDatum(data[0]);
        }
    }

    useLayoutEffect(() => {
      getData();

      console.log("hello1");
      console.log(datum);
    }, []);

    return (
      <View style={styles.container}>
        {datum.id && <ContactInfoCard contactDetails={datum}/>}
      </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    divider: {
        marginVertical: 8,
    }
})