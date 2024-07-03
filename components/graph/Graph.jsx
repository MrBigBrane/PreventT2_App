import { Dimensions, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Text } from "react-native-paper";

const screenConfig =  {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  }


export default function Graph({ xdata, ydata, title }) {

    return (
      <View style={styles.container}>
        <Text>{title}</Text>
        <LineChart
          data={{
            labels: xdata,
            datasets: [
              {
                data: ydata,
              },
            ],
          }}
          width={Dimensions.get("screen").width - 20} // from react-native
          height={220}
          chartConfig={screenConfig}
          yAxisSuffix=" min"
          formatXLabel={(x) => x.substring(5, 10)}
        //   bezier
          style={{
            borderRadius: 16
          }}
        />
      </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
});
