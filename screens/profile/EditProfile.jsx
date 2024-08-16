import { View, StyleSheet, ScrollView } from "react-native";
import PickAvatar from "../../components/pickphoto/PickAvatar";
import { Divider } from "@rneui/themed";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import NewDropdownList from "../../components/inputs/NewDropdownList";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default function EditProfile({ navigation, route }) {
  const { datum, onboardingForm } = route.params;
  const [loading, setLoading] = useState(false);
  const [text1, setText1] = useState(datum ? datum?.name : null);
  const [text2, setText2] = useState(onboardingForm ? onboardingForm?.age.toString() : null);
  const [text3, setText3] = useState(onboardingForm ? onboardingForm?.payersource : null);
  const [text4, setText4] = useState(onboardingForm ? onboardingForm?.city : null);
  const [text5, setText5] = useState(onboardingForm ? onboardingForm?.state : null);
    // let [ShowComment, setShowModelComment] = useState(false);
    // let [animateModal, setanimateModal] = useState(false);

    async function submit() {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("profiles")
          .update({ name: text1, id: user.id })
          .eq("id", datum?.id)

        const { data: onboardingData, error: onboardingError } = await supabase
          .from("onboarding")
          .update({ age: text2, payersource: text3, city: text4, state: text5, id: user.id })
          .eq("id", onboardingForm?.id)

      if (error) {
          console.log(error)
      } else {
          setLoading(false);
          console.log(data)
      }
      navigation.goBack();
    }
    // async function getUser() {
    //     const {
    //       data: { user },
    //     } = await supabase.auth.getUser();

    //     const { data, error } = await supabase
    //       .from("profiles")
    //       .select()
    //       .eq("id", datum.id);

    //     const { data: onboardingData, error: onboardingError } = await supabase
    //       .from("onboarding")
    //       .select()
    //       .eq("id", onboardingForm?.id)
          
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log(data);
    //       setData(data[0]);
    //       setOnboarding(onboardingData[0]);
    //     }
    // }

    // useLayoutEffect(() => {
    //   getUser();
    // }, []);

    return (
      <ScrollView style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
          <View>
            <PickAvatar
          userId={datum.id}
          editMode={true}
        />
        <Icon  name="pencil-outline" size={25} color="black" style={{ position: "absolute", bottom: 0, right: 45}}/>
          </View>
          
        <Text variant="labelLarge">Click avatar to change profile picture</Text>
        </View>
        
        <Divider style={styles.Divider} />
        <Text variant="headlineSmall">Your Information</Text>
        <Text>{" "}</Text>
        <Text variant="titleSmall">Name: </Text>
        <TextInput
          mode="outlined"
          placeholder="Name"
          onChangeText={(text) => setText1(text)}
          value={text1}
          left={<TextInput.Icon icon="pen" />}
          style={styles.input}
        />
        <Text variant="titleSmall">Age: </Text>
        <TextInput
          mode="outlined"
          placeholder="Age"
          onChangeText={(text) => setText2(text)}
          value={text2}
          left={<TextInput.Icon icon="pen" />}
          style={styles.input}
        />
        <Text variant="titleSmall">City: </Text>
        <TextInput
          mode="outlined"
          placeholder="City"
          onChangeText={(text) => setText4(text)}
          value={text4}
          left={<TextInput.Icon icon="pen" />}
          style={styles.input}
        />
        <Text variant="titleSmall">State: </Text>
        <TextInput
          mode="outlined"
          placeholder="State"
          onChangeText={(text) => setText5(text)}
          value={text5}
          left={<TextInput.Icon icon="pen" />}
        />
        <Divider style={styles.Divider} />
        <Text variant="headlineSmall">Insurance / Payer Info</Text>
        <Text>{" "}</Text>
        <NewDropdownList
          title={"Healthcare Professional"}
          setSelected={setText3}
          defaultValue={text3}
          data={[
            { title: "1 Medicare", icon: "hospital" },
            { title: "2 Medicaid", icon: "hospital-box" },
            { title: "3 Private Insurer", icon: "hospital-box-outline" },
            { title: "4 Self-pay", icon: "hand-coin" },
            {
              title: "5 Dual Eligible (Medicare and Medicaid)",
              icon: "hospital-building",
            },
            { title: "6 Grant funding", icon: "hospital-marker" },
            { title: "7 Employer", icon: "hospital" },
            { title: "8 Free of charge", icon: "hospital-box" },
            { title: "9 Other", icon: "hospital-box-outline" },
          ]}
          // left={<TextInput.Icon icon="pen" />
        />
        <Divider style={styles.Divider} />
        <Button mode="contained" onPress={submit} style={styles.buttons}>Save</Button>
      </ScrollView>
    );  


}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  avatar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 20,
  },
  displayName: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 20,
  },
  Divider: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttons: {
    marginBottom: 30,
  },
  input: {
    flex: 1,
    marginBottom: 20,
  },
});