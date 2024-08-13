import { useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from "../../lib/supabase";
import InformationCard from "../../components/InformationCard";
import PersonalInfoCard from "../../components/PersonalInformationCard";

export default function GeneralInfo({ navigation, route }) {
  const [onboarding, setOnboarding] = useState({});

    async function getOnboarding() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("onboarding")
        .select()
        .eq("id", user.id);

        if(error) {
          console.log(error);
        } else {
          console.log(data);
          setOnboarding(data[0]);
        }
    }

    useLayoutEffect(() => {
      getOnboarding();
    }, []);

    return (
      <ScrollView style={styles.container}>
        {onboarding.height && (
          <View>
            
            <InformationCard
              title="General Info"
              title1="A1C"
              data1={`${onboarding.a1c}`}
              title2="Diabetes"
              data2={onboarding.diabetes.title}
              icon2={
                <Icon
                  name={onboarding.diabetes.icon}
                  size={17.5}
                  style={{ justifyContent: "center", color: "green" }}
                />
              }
              title3="Risk Score"
              data3={onboarding.score}
              title4="High BP"
              data4={onboarding.bp.title}
              icon4={
                <Icon
                  name={onboarding.bp.icon}
                  size={17.5}
                  style={{ justifyContent: "center", color: "green" }}
                />
              }
              title5="Prediabetic"
              data5={onboarding.prediabetic.title}
              icon5={
                <Icon
                  name={onboarding.prediabetic.icon}
                  size={17.5}
                  style={{ justifyContent: "center", color: "green" }}
                />
              }
            />

            <Divider style={styles.divider} />

            <PersonalInfoCard
              title="Personal Information"
              title1="Insurance Provider"
              data1={onboarding.payersource.title}
              icon1={
                <Icon
                  name={onboarding.payersource.icon}
                  size={17.5}
                  style={{ justifyContent: "center", color: "red" }}
                />
              }
              title2="Education"
              data2={onboarding.education.title}
              icon2={
                <Icon
                  name={onboarding.education.icon}
                  size={17.5}
                  style={{ justifyContent: "center", color: "#9da832" }}
                />
              }
              title3="Enrollment Source"
              data3={onboarding.enrsource.title}
              icon3={
                <Icon
                  name={onboarding.enrsource.icon}
                  size={17.5}
                  style={{ justifyContent: "center", color: "red" }}
                />
              }
              title4="Enrollment Motivation"
              data4={onboarding.enrmot.title}
              icon4={
                <Icon
                  name={onboarding.enrmot.icon}
                  size={17.5}
                  style={{ justifyContent: "center", color: "red" }}
                />
              }
              title5="Share Info"
              data5={onboarding.share.title}
              icon5={
                <Icon
                  name={onboarding.share.icon}
                  size={17.5}
                  style={{ justifyContent: "center", color: "red" }}
                />
              }
              title6="Weight Goal"
              data6={`${onboarding.weight_goal} lbs`}
            />
          </View>
        )}
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        margin: 12,
    },
    divider: {
        marginVertical: 20,
    },
    text: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4,
    }
})