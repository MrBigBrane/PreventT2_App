import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import NewDropdownList from "../../components/inputs/NewDropdownList";
import { supabase } from "../../lib/supabase";

const steps = [
  "General Information",
  "Health Questions",
  "DPP Program Questions",
  "Contact Information",
];

export default function Onboarding({ navigation }) {
  const [section1, setSection1] = useState("");
  const [section2, setSection2] = useState("hidden");
  const [section3, setSection3] = useState("hidden");
  const [section4, setSection4] = useState("hidden");
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");
  const [text5, setText5] = useState("");
  const [text6, setText6] = useState("");
  const [text7, setText7] = useState("");
  const [text8, setText8] = useState("");
  const [text9, setText9] = useState("");
  const [text10, setText10] = useState("");
  const [text11, setText11] = useState("");
  const [text12, setText12] = useState("");
  const [text13, setText13] = useState("");
  const [text14, setText14] = useState("");
  const [text15, setText15] = useState("");
  const [text16, setText16] = useState("");
  const [text17, setText17] = useState("");
  const [text18, setText18] = useState("");
  const [text19, setText19] = useState("");
  const [text20, setText20] = useState("");
  const [text21, setText21] = useState("");
  const [text22, setText22] = useState("");
  const [text23, setText23] = useState("");
  const [text24, setText24] = useState("");
  const [text25, setText25] = useState("");
  const [text26, setText26] = useState("");
  const [text27, setText27] = useState("");
  const [text28, setText28] = useState("");
  const [text29, setText29] = useState("");
  const [text30, setText30] = useState("")

  async function onboardingAction() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("onboarding")
      .insert({
        id: user.id,
        weight: text2,
        age: text,
        height: text3,
        gender: text5,
        sex: text4,
        ethnicity: text6,
        race: text7,
        education: text8,
        prediabetic: text14,
        gluctest: text15,
        gdm: text16,
        risktest: text17,
        payersource: text20,
        enrsource: text22,
        enrmot: text21,
        a1c: text9,
        diabetes: text10,
        cdcrisk: text11,
        score: text12,
        history: text13,
        bp: text18,
        active: text19,
        zoom: text23,
        improve: text24,
        share: text25,
        city: text26,
        state: text27,
        phone: text28,
        sharecontact: text29,
        weight_goal: text30,
      })
      .select();

    if (error) console.log(error);
    else navigation.replace("Profile");
  }

  function handleLoading() {
    setLoading(true);
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <ScrollView>
      <View style={styles.spacing}>
        {section1 == "" && (
          <View>
            <Text style={{ textAlign: "center", fontWeight: "bold" }} variant="titleLarge">
              Please fully complete this form to be considered for NRIVA DPP.
            </Text>
            <View style={styles.input}>
              <Text>Age</Text>
              <TextInput
                value={text}
                onChangeText={(text) => setText(text)}
                mode="outlined"
              />
            </View>

            <View style={styles.input}>
              <Text>Weight in LBS or Pounds</Text>
              <TextInput
                mode="outlined"
                value={text2}
                onChangeText={(text2) => setText2(text2)}
              />
            </View>

            <View style={styles.input}>
              <Text>
                What is your weight goal in LBS or Pounds for the end of this
                session?
              </Text>
              <TextInput
                mode="outlined"
                value={text30}
                onChangeText={(text) => setText30(text)}
              />
            </View>

            <View style={styles.input}>
              <Text>Height in INCHES</Text>
              <TextInput
                mode="outlined"
                value={text3}
                onChangeText={(text) => setText3(text)}
              />
            </View>

            <View style={styles.input}>
              <Text>Sex</Text>
              <NewDropdownList
                title="Sex"
                data={[
                  { title: "1 Male", icon: "face-man" },
                  { title: "2 Female", icon: "face-woman" },
                  { title: "9 Prefer not to say", icon: "human-handsdown" },
                ]}
                setSelected={setText4}
                defaultValue={text4}
              />
            </View>

            <View style={styles.input}>
              <Text>Gender</Text>
              <NewDropdownList
                title="Gender"
                data={[
                  { title: "1 Male", icon: "face-man" },
                  { title: "2 Female", icon: "face-woman" },
                  { title: "3 Transgender", icon: "gender-transgender" },
                  { title: "4 Prefer not to say", icon: "human-handsdown" },
                ]}
                setSelected={setText5}
                defaultValue={text5}
              />
            </View>

            <View style={styles.input}>
              <Text>Ethnicity</Text>
              <NewDropdownList
                title={"Ethnicity"}
                data={[
                  { title: "1 Hispanic or Latino", icon: "flag" },
                  { title: "2 Not Hispanic or Latino", icon: "flag-checkered" },
                  { title: "3 Prefer not to say", icon: "human-handsdown" },
                ]}
                setSelected={setText6}
                defaultValue={text6}
              />
            </View>

            <View style={styles.input}>
              <Text>Race</Text>
              <NewDropdownList
                title={"Race"}
                data={[
                  { title: "1 Asian or Asian American", icon: "flag-variant" },
                  {
                    title: "2 Black or African American",
                    icon: "flag-variant-outline",
                  },
                  {
                    title: "3 Native Hawaiian or Other Pacific Islander",
                    icon: "flag",
                  },
                  { title: "4 White or Caucasian", icon: "flag-checkered" },
                ]}
                setSelected={setText7}
                defaultValue={text7}
              />
            </View>

            <View style={styles.input}>
              <Text>Highest Level of Education</Text>
              <NewDropdownList
                title={"Education"}
                data={[
                  { title: "1 Less than Grade 12", icon: "bus-school" },
                  { title: "2 Grade 12 or GED", icon: "school" },
                  {
                    title: "3 Some college or technical school",
                    icon: "school-outline",
                  },
                  {
                    title: "4 College or technical school graduate or higher",
                    icon: "gradient-horizontal",
                  },
                ]}
                setSelected={setText8}
                defaultValue={text8}
              />
            </View>
            <View style={styles.buttons}>
              <Button
                mode="contained"
                style={{ flex: 1, margin: 8 }}
                label="Next"
                onPress={() => {
                  setSection1("hidden");
                  setSection2("");
                  handleNext();
                }}
              >
                Next
              </Button>
            </View>
          </View>
        )}

        {section2 == "" && (
          <View>
            <View style={styles.input}>
              <Text>
                What is your A1C Level in PERCENTAGE &#40;must be between 2.5 -
                18.999&#41;?
              </Text>
              <TextInput
                mode="outlined"
                value={text9}
                onChangeText={(text) => setText9(text)}
              />
            </View>

            <View style={styles.input}>
              <Text>
                If you are a woman, have you had gestational diabetes?
              </Text>
              <NewDropdownList
                title={"Diabetes"}
                data={[
                  { title: "Yes", icon: "check-circle" },
                  { title: "No", icon: "close-box" },
                  { title: "N/A", icon: "help-circle" },
                ]}
                setSelected={setText10}
                defaultValue={text10}
              />
            </View>

            <View style={styles.input}>
              <Text>Have You Taken the CDC Risk Assessment Test?</Text>
              <NewDropdownList
                title={"CDC Risk Test?"}
                data={[
                  { title: "Yes", icon: "check-circle" },
                  { title: "No", icon: "close-box" },
                  { title: "Don't Know", icon: "help-circle" },
                ]}
                setSelected={setText11}
                defaultValue={text11}
              />
            </View>

            <View style={styles.input}>
              <Text>If so, what was your score?</Text>
              <TextInput
                mode="outlined"
                value={text12}
                onChangeText={(text) => setText12(text)}
              />
            </View>

            <View style={styles.input}>
              <Text>Do you have a family history of diabetes</Text>
              <NewDropdownList
                title={"Family History"}
                data={[
                  { title: "Yes", icon: "check-circle" },
                  { title: "No", icon: "close-box" },
                  { title: "Don't Know", icon: "help-circle" },
                ]}
                setSelected={setText13}
                defaultValue={text13}
              />
            </View>

            <View style={styles.input}>
              <Text>Have you been diagnosed as a prediabetic?</Text>
              <NewDropdownList
                title={"Prediabetic"}
                data={[
                  { title: "Yes", icon: "check-circle" },
                  { title: "No", icon: "close-box" },
                  { title: "Don't Know", icon: "help-circle" },
                ]}
                setSelected={setText14}
                defaultValue={text14}
              />
            </View>

            <View style={styles.input}>
              <Text>If yes, was it with a blood glucose test?</Text>
              <NewDropdownList
                title={"Prediabetic Test"}
                data={[
                  { title: "1 Yes", icon: "check-circle" },
                  { title: "2 No", icon: "close-box" },
                ]}
                setSelected={setText15}
                defaultValue={text15}
              />
            </View>

            <View style={styles.input}>
              <Text>
                If yes, was it with a clinical diagnosis of GDM during a
                previous pregnancy?
              </Text>
              <NewDropdownList
                title={"Prediabetic Test"}
                data={[
                  { title: "1 Yes", icon: "check-circle" },
                  { title: "2 No", icon: "close-box" },
                ]}
                setSelected={setText16}
                defaultValue={text16}
              />
            </View>

            <View style={styles.input}>
              <Text>If yes, was it determined by a prediabetes risk test?</Text>
              <NewDropdownList
                title={"Prediabetic Test"}
                data={[
                  { title: "1 Yes", icon: "check-circle" },
                  { title: "2 No", icon: "close-box" },
                ]}
                setSelected={setText17}
                defaultValue={text17}
              />
            </View>

            <View style={styles.input}>
              <Text>Do you have high blood pressure?</Text>
              <NewDropdownList
                title={"High BP?"}
                data={[
                  { title: "Yes", icon: "check-circle" },
                  { title: "No", icon: "close-box" },
                  { title: "Don't Know", icon: "help-circle" },
                ]}
                setSelected={setText18}
                defaultValue={text18}
              />
            </View>

            <View style={styles.input}>
              <Text>
                Do you consider yourself active? &#40;At least 150 minutes per
                week&#41;
              </Text>
              <NewDropdownList
                title={"Active?"}
                data={[
                  { title: "Yes", icon: "check-circle" },
                  { title: "No", icon: "close-box" },
                  { title: "Don't Know", icon: "help-circle" },
                ]}
                setSelected={setText19}
                defaultValue={text19}
              />
            </View>

            <View style={styles.input}>
              <Text>
                Who is the primary payer for your participation in this National
                DPP LCP?
              </Text>
              <NewDropdownList
                title={"Healthcare Professional"}
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
                setSelected={setText20}
                defaultValue={text20}
              />
            </View>

            <View style={styles.buttons}>
              <Button
                mode="outlined"
                onPress={() => {
                  setSection2("hidden");
                  setSection1("");
                  handleBack();
                }}
                style={{ flex: 1, margin: 8 }}
              >
                Back
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  setSection2("hidden");
                  setSection3("");
                  handleNext();
                }}
                style={{ flex: 1, margin: 8 }}
              >
                Next
              </Button>
            </View>
          </View>
        )}

        {section3 === "" && (
          <View>
            <View style={styles.input}>
              <Text>
                Who or what motivated you to decide to join this program?
              </Text>
              <NewDropdownList
                title={"Healthcare Professional"}
                data={[
                  { title: "1 Health care professional", icon: "hospital" },
                  { title: "2 Blood test results", icon: "hospital-box" },
                  { title: "3 Prediabetes risk test", icon: "hospital" },
                  {
                    title: "4 Someone at a community-based organization",
                    icon: "hospital-box-outline",
                  },
                  { title: "5 Family or friends", icon: "hospital-building" },
                  {
                    title:
                      "6 Current or past participant in the National DPP LCP",
                    icon: "hospital-marker",
                  },
                  {
                    title: "7 Employer or employer’s wellness plan",
                    icon: "hospital",
                  },
                  { title: "8 Health insurance plan", icon: "hospital-box" },
                  {
                    title: "9 Media advertisements",
                    icon: "hospital-box-outline",
                  },
                ]}
                setSelected={setText21}
                defaultValue={text21}
              />
            </View>

            <View style={styles.input}>
              <Text>
                Did a healthcare professional help you in your decision to join?
              </Text>
              <NewDropdownList
                title={"Healthcare Professional"}
                data={[
                  {
                    title: "1 Yes, a doctor/doctor’s office",
                    icon: "hospital",
                  },
                  { title: "2 Yes, a pharmacist", icon: "hospital-box" },
                  {
                    title: "3 Yes, other healthcare professional",
                    icon: "hospital-box-outline",
                  },
                  { title: "4 No", icon: "hospital-building" },
                ]}
                setSelected={setText22}
                defaultValue={text22}
              />
            </View>

            <View style={styles.input}>
              <Text>
                Will you be able to attend zoom classes or watch videos?
              </Text>
              <NewDropdownList
                title={"Zoom classes?"}
                data={[
                  { title: "Yes", icon: "check-circle" },
                  { title: "No", icon: "close-box" },
                  { title: "Don't Know", icon: "help-circle" },
                ]}
                setSelected={setText23}
                defaultValue={text23}
              />
            </View>

            <View style={styles.input}>
              <Text>Are you committed to improving?</Text>
              <NewDropdownList
                title={"Committed to improving?"}
                data={[
                  { title: "Yes", icon: "check-circle" },
                  { title: "No", icon: "close-box" },
                  { title: "Don't Know", icon: "help-circle" },
                ]}
                setSelected={setText24}
                defaultValue={text24}
              />
            </View>

            <View style={styles.input}>
              <Text>
                Do you allow NRIVA to share your weight confidentially with the
                CDC?
              </Text>
              <NewDropdownList
                title={"Share Weight?"}
                data={[
                  { title: "Yes", icon: "check-circle" },
                  { title: "No", icon: "close-box" },
                  { title: "Don't Know", icon: "help-circle" },
                ]}
                setSelected={setText25}
                defaultValue={text25}
              />
            </View>
            <View style={styles.buttons}>
              <Button
                mode="outlined"
                onPress={() => {
                  setSection3("hidden");
                  setSection2("");
                  handleBack();
                }}
                style={{ flex: 1, margin: 8 }}
              >
                Back
              </Button>
              <Button
                mode="contained"
                style={{ flex: 1, margin: 8 }}
                onPress={() => {
                  setSection3("hidden");
                  setSection4("");
                  handleNext();
                }}
              >
                Next
              </Button>
            </View>
          </View>
        )}

        {section4 === "" && (
          <View>
            <View style={styles.input}>
              <Text>City</Text>
              <TextInput
                mode="outlined"
                value={text26}
                onChangeText={(text) => setText26(text)}
              />
            </View>

            <View style={styles.input}>
              <Text>State Abbreviation</Text>
              <TextInput
                mode="outlined"
                value={text27}
                onChangeText={(text) => setText27(text)}
              />
            </View>

            <View style={styles.input}>
              <Text>Phone Number</Text>
              <TextInput
                mode="outlined"
                value={text28}
                onChangeText={(text) => setText28(text)}
              />
            </View>

            <View style={styles.input}>
              <Text>Can we contact you through WhatsApp?</Text>
              <NewDropdownList
                title={"WhatsApp?"}
                data={[
                  { title: "Yes", icon: "check-circle" },
                  { title: "No", icon: "close-box" },
                  { title: "Don't Know", icon: "help-circle" },
                ]}
                setSelected={setText29}
                defaultValue={text29}
              />
            </View>

            <View style={styles.buttons}>
              <Button
                onPress={() => {
                  setSection4("hidden");
                  setSection3("");
                  handleBack();
                }}
                mode="outlined"
                style={{ flex: 1, margin: 8 }}
              >
                Back
              </Button>
              <Button
                onPress={onboardingAction}
                mode="contained"
                style={{ flex: 1, margin: 8 }}
              >
                Submit
              </Button>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  spacing: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    width: "100%",
    padding: 12,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});