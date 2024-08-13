import { StyleSheet, View } from "react-native";
import { Divider, Surface, Text } from "react-native-paper";

export default function InformationCard({
  title,
  title1,
  data1,
  icon1,
  title2,
  data2,
  icon2,
  title3,
  data3,
  icon3,
  title4,
  data4,
  icon4,
  title5, 
  data5,
  icon5,
  title6,
  data6,
  icon6,
  title7,
  data7,
  icon7,
  title8,
  data8,
  icon8
}) {
  return (
    <Surface style={styles.forms}>
      <View>
        <Text variant="displaySmall" >
          {title}
        </Text>
        <Divider style={[styles.divider, styles.color]} bold={true} />
        <View style={styles.textRow}>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <Text variant="bodyLarge">{title1}: </Text>
            {icon1}
            <Text variant="bodyLarge"> {data1}</Text>
          </View>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <Text variant="bodyLarge">{title2}: </Text>
            {icon2}
            <Text variant="bodyLarge"> {data2} </Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.textRow}>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <Text variant="bodyLarge">{title3}: </Text>
            {icon3}
            <Text variant="bodyLarge"> {data3}</Text>
          </View>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <Text variant="bodyLarge">{title4}: </Text>
            {icon4}
            <Text variant="bodyLarge"> {data4}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.textRow}>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <Text variant="bodyLarge">{title5}: </Text>
            {icon5}
            <Text variant="bodyLarge"> {data5}</Text>
          </View>
          <Divider style={styles.divider} />
          {title6 && (
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <Text variant="bodyLarge">{title6}:</Text>
              {icon6}
              <Text variant="bodyLarge"> {data6}</Text>
            </View>
          )}
        </View>
        {title7 && <Divider style={styles.divider} />}
        {title7 && (
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <Text variant="bodyLarge">{title7}:</Text>
            {icon7}
            <Text variant="bodyLarge"> {data7}</Text>
          </View>
        )}
        {title8 && <Divider style={styles.divider} />}
        {title8 && (
          <View style={{ flexDirection: "row" }}>
            <Text variant="bodyLarge" style={{ marginBottom: 5 }}>
              {title8}:
            </Text>
            {icon8}
            <Text variant="bodyLarge"> {data8}</Text>
          </View>
        )}
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
    divider: {
      marginVertical: 10
    },
    textRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      flex: 1
    },
    forms: {
        width: "100%",
        alignSelf: "center",
        padding: 10,
        backgroundColor: "white",
        // borderColor: "red",
        // borderWidth: 1,
        borderRadius: 10,
        flex: 1
      },
      color: {
        backgroundColor: "#1d62d1",
      }
  });