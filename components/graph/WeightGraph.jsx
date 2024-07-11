import { LineChart } from "react-native-gifted-charts";
import NewDropdownList from "../inputs/NewDropdownList";
import { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import getWeeklyWeight from "../../serveractions/graph/getWeeklyWeight";
import getMonthlyWeight from "../../serveractions/graph/getMonthlyWeight";
        
export default function WeightGraph({ user }) {
    const [setting, setSetting] = useState({ title: "Week", icon: "calendar" });
    const [data, setData] = useState([]);
    const [monthData, setMonthData] = useState([]);
    const [value, setValue] = useState(null);

    const timeSettings = [
      { title: "Week", icon: "calendar" },
      { title: "Month", icon: "calendar-month" },
    ];

      useLayoutEffect(() => {
        async function graph() {
            // console.log(user.id)
          const weekGraph = Array.from(await getWeeklyWeight(user.id))
          const monthGraph = Array.from(await getMonthlyWeight(user.id));
          console.log(monthGraph)
          setData(weekGraph)
          setMonthData(monthGraph)
        //   console.log(graph)
        }

        graph()
      }, [])

      
          
      
      

    return (
      <View>
        <NewDropdownList
          data={timeSettings}
          title="Time Range"
          setSelected={setSetting}
          defaultValue={setting}
        />
        <View
          style={[
            styles.container,
            setting.title === "Week" ? { marginBottom: 25 } : {},
          ]}
        >
          {data.length > 0 && (
            <>
              {value !== null && (
                <Surface style={styles.paper}>
                  <Text>{setting.title === "Week" && data[value]?.date ? data[value]?.date : monthData[value]?.date}</Text>
                  <Text>{setting.title === "Week" && data[value]?.value ? data[value]?.value : monthData[value]?.value} lbs</Text>
                </Surface>
              )}
              <LineChart
                initialSpacing={50}
                interpolateMissingValues
                data={setting.title === "Week" ? data : monthData}
                xAxisLabelTextStyle={{ width: 100, marginLeft: -36 }}
                width={Dimensions.get("window").width * 0.8}
                yAxisLabelSuffix=" lbs"
                yAxisLabelWidth={60}
                stripColor={"orange"}
                stripHeight={500}
                startFillColor1="blue"
                endFillColor1="white"
                color1="blue"
                maxValue={400}
                focusEnabled
                showStripOnFocus
                focusedDataPointIndex={value}
                onFocus={(item, index) => setValue(index)}
                dataPointsColor="blue"
              />
            </>
          )}
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        height: 250,
        // marginLeft: -5
    },
    paper: {
        padding: 10,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8, 
        position: "absolute",
        top: 2,
        right: 0

    }
})