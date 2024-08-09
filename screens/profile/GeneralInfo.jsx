import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function GeneralInfo({ navigation, route }) {
    const { onboarding } = route.params;
    console.log(onboarding);

    return (
      <ScrollView style={styles.container}>
        <Text variant="displaySmall">Demographics</Text>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            Height:
          </Text>
          <View style={styles.text}>
            <Icon name="ruler" size={30} style={{ justifyContent: "center" }} />
            <Text variant="headlineSmall"> {onboarding.height}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            Age:
          </Text>
          <View style={styles.text}>
            <Icon
              name="white-balance-sunny"
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall"> {onboarding.age}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            Gender:
          </Text>
          <View style={styles.text}>
            <Icon
              name={onboarding.gender.icon}
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall">
              {" "}
              {onboarding.gender.title.substring(2)}
            </Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            Sex:
          </Text>
          <View style={styles.text}>
            <Icon
              name="weight-kilogram"
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall"> {onboarding.sex.title}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            Ethnicity:
          </Text>
          <View style={styles.text}>
            <Icon
              name={onboarding.ethnicity.icon}
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall"> {onboarding.ethnicity.title}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            Race:
          </Text>
          <View style={styles.text}>
            <Icon
              name={onboarding.race.icon}
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall"> {onboarding.race.title}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            State:
          </Text>
          <View style={styles.text}>
            <Icon
              name="warehouse"
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall"> {onboarding.state}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            City:
          </Text>
          <View style={styles.text}>
            <Icon name="city" size={30} style={{ justifyContent: "center" }} />
            <Text variant="headlineSmall"> {onboarding.city}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        
        {/* <Text variant="displaySmall">Contact Information</Text>
        <Divider style={styles.divider} /> */}
        
        <Text variant="displaySmall">Health Information</Text>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            A1C:
          </Text>
          <View style={styles.text}>
            <Icon
              name="test-tube"
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall"> {onboarding.a1c}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            {" "}
            Diabetes
          </Text>
          <View style={styles.text}>
            <Icon
              name={onboarding.diabetes.icon}
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall"> {onboarding.diabetes.title}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            CDC Risk Score:
          </Text>
          <View style={styles.text}>
            <Icon
              name="scoreboard"
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall"> {onboarding.score}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            Blood Pressure:
          </Text>
          <View style={styles.text}>
            <Icon
              name={onboarding.bp.icon}
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall"> {onboarding.bp.title}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            {" "}
            Prediabetic:
          </Text>
          <View style={styles.text}>
            <Icon
              name={onboarding.prediabetic.icon}
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall"> {onboarding.prediabetic.title}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        
        <Text variant="displaySmall">Personal Information</Text>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            Insurance Provider:
          </Text>
          <View style={styles.text}>
            <Icon
              name={onboarding.payersource.icon}
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall">
              {" "}
              {onboarding.payersource.title.substring(2)}
            </Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            Education:
          </Text>
          <View style={styles.text}>
            <Icon
              name={onboarding.education.icon}
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall">
              {" "}
              {onboarding.education.title.substring(2)}
            </Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            Enrollment Source:
          </Text>
          <View style={styles.text}>
            <Icon
              name={onboarding.enrsource.icon}
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall"> {onboarding.enrsource.title.substring(2)}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            Enrollment Motivation:
          </Text>
          <View style={styles.text}>
            <Icon
              name={onboarding.enrmot.icon}
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall"> {onboarding.enrmot.title.substring(2)}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            Share Info Anonymously:
          </Text>
          <View style={styles.text}>
            <Icon
              name={onboarding.share.icon}
              size={30}
              style={{ justifyContent: "center" }}
            />
            <Text variant="headlineSmall"> {onboarding.share.title}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={{ marginBottom: 5 }}>
          <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
            Weight Goal:
          </Text>
          <View style={styles.text}>
            <Icon name="weight-kilogram" size={30} />
            <Text variant="headlineSmall"> {onboarding.weight_goal}</Text>
          </View>
        </View>
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
        marginVertical: 8,
    },
    text: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4,
    }
})