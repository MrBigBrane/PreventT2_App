import { LineChart } from "react-native-gifted-charts";
import NewDropdownList from "../inputs/NewDropdownList";
import { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import getWeeklyMinutes from '../../serveractions/graph/getWeeklyMinutes';
import getMonthlyMinutes from "../../serveractions/graph/getMonthlyMinutes";
import { Surface, Text } from "react-native-paper";
        
export default function MinutesGraph({ user, coachView }) {
    const [setting, setSetting] = useState({ title: "Week", icon: "calendar" });
    const [data, setData] = useState([]);
    const [monthData, setMonthData] = useState([]);
    const [value, setValue] = useState(null);

    const timeSettings = [
        { title: "Week", icon: "calendar" },
        { title: "Month", icon: "calendar-month" },
      ]

      useLayoutEffect(() => {
        async function graph() {
            // console.log(user.id)
          const weekGraph = Array.from(await getWeeklyMinutes(user.id))
          const monthGraph = Array.from(await getMonthlyMinutes(user.id));
          setData(weekGraph)
          setMonthData(monthGraph)
        //   console.log(graph)
        }

        graph()
      }, [])

      let text;

      if (setting.title === "Week" && data[value]?.value !== null && data[value]?.date !== null) {
        text = (
          <>
            <Text>{data[value]?.date}</Text>
            <Text>{data[value]?.value} min</Text>
          </>
        );
      }
      else if (setting.title === "Month" && monthData[value]?.value !== null && monthData[value]?.date !== null) {
        text = (
          <>
            <Text>{monthData[value]?.date}</Text>
            <Text>{monthData[value]?.value} min</Text>
          </>
        );
      }
      
          
      
      

    return (
      <View>
        <View style={styles.menu}>
        <Text style={styles.title} variant="titleLarge" >
            Minutes Graph
          </Text>
          <NewDropdownList
            data={timeSettings}
            title="Time Range"
            setSelected={setSetting}
            defaultValue={setting}
          />
        </View>

        <View style={[styles.container]}>
          {data.length > 0 && (
            <>
              {value !== null ? (
                <Surface style={styles.paper}>
                  {/* <Text>{setting.title === "Week" && data[value]?.date || monthData[value]?.date ? data[value]?.date.toString() : monthData[value]?.date.toString()}</Text>
                <Text>{setting.title === "Week" && data[value]?.value || monthData[value]?.value ? data[value]?.value : monthData[value]?.value} min</Text> */}
                  {text}
                </Surface>
              ) : null}
              <LineChart
                initialSpacing={50}
                areaChart
                data={setting.title === "Week" ? data : monthData}
                xAxisLabelTextStyle={{ width: 100, marginLeft: -36 }}
                width={Dimensions.get("window").width * 0.8}
                yAxisLabelSuffix=" min"
                yAxisLabelWidth={60}
                stripColor={"orange"}
                stripHeight={500}
                startFillColor1="blue"
                endFillColor1="white"
                color1="blue"
                maxValue={600}
                focusEnabled
                showStripOnFocus
                scrollToEnd
                // focusedDataPointIndex={value}
                onFocus={(item, index) => {
                  setValue(index);
                }}
                thickness={3}
                dataPointsColor="blue"
                noOfSections={6}
              />
            </>
          )}
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
    height: 250,
    // marginLeft: -5
  },
  menu: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
  },
  paper: {
    padding: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    position: "absolute",
    top: 2,
    right: 0,
  },
  title: {
    alignContent: "center",
    alignItems: "center",
    margin: 10,
    flex: 1,
  },
});