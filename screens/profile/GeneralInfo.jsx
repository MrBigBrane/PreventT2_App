import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function GeneralInfo({ navigation, route }) {
    const { onboarding } = route.params;
    console.log(onboarding);

    return (
      <ScrollView style={styles.container}>
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
          <Text variant="headlineSmall">State:</Text>

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
          <Text variant="headlineSmall">City:</Text>
          <View style={styles.text}>
            <Icon name="city" size={30} style={{ justifyContent: "center" }} />
            <Text variant="headlineSmall"> {onboarding.city}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text variant="headlineSmall">Insurance Provider:</Text>
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
          <Text variant="headlineSmall">Gender:</Text>
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
          <Text variant="headlineSmall">A1C:</Text>
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
        <View >
          <Text variant="headlineSmall"> Diabetes</Text>
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
        <View style={styles.text}>
           <Text variant="headlineSmall">CDC Risk Score:</Text>
           <View>
            <Icon
            name="weight-kilogram"
            size={30}
            style={{ justifyContent: "center" }}
          />
          <Text variant="headlineSmall"> {onboarding.score}</Text>
           </View>
          
          
        </View>
        <Divider style={styles.divider} />
        <View style={styles.text}>
          <Icon
            name="weight-kilogram"
            size={30}
            style={{ justifyContent: "center" }}
          />
          <Text variant="headlineSmall"> Blood Pressure: </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.text}>
          <Icon
            name="weight-kilogram"
            size={30}
            style={{ justifyContent: "center" }}
          />
          <Text variant="headlineSmall"> Share Info Anonymously:</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.text}>
          <Icon
            name="weight-kilogram"
            size={30}
            style={{ justifyContent: "center" }}
          />
          <Text variant="headlineSmall"> Sex:</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.text}>
          <Icon
            name="weight-kilogram"
            size={30}
            style={{ justifyContent: "center" }}
          />
          <Text variant="headlineSmall"> Ethnicity:</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.text}>
          <Icon
            name="weight-kilogram"
            size={30}
            style={{ justifyContent: "center" }}
          />
          <Text variant="headlineSmall"> Race: {}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.text}>
          <Icon
            name={onboarding.education.icon}
            size={30}
            style={{ justifyContent: "center" }}
          />
          <Text variant="headlineSmall">
            {" "}
            Education:{" "}
            {onboarding.education.title.substring(
              2,
              onboarding.education.title.length
            )}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.text}>
          <Icon
            name="weight-kilogram"
            size={30}
            style={{ justifyContent: "center" }}
          />
          <Text variant="headlineSmall"> Prediabetic:</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.text}>
          <Icon
            name="weight-kilogram"
            size={30}
            style={{ justifyContent: "center" }}
          />
          <Text variant="headlineSmall"> Enrollment Source: </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.text}>
          <Icon
            name="weight-kilogram"
            size={30}
            style={{ justifyContent: "center" }}
          />
          <Text variant="headlineSmall"> Enrollment Motivation:</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.text}>
          <Icon name="weight-kilogram" size={30} style={{ marginBottom: 10 }} />
          <Text variant="headlineSmall" style={{ marginBottom: 10 }}>
            {" "}
            Weight Goal:{" "}
          </Text>
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