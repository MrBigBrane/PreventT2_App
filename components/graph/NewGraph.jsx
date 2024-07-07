import { LineChart } from "react-native-gifted-charts";
import NewDropdownList from "../inputs/NewDropdownList";
import { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import getWeeklyMinutes from '../../serveractions/graph/getWeeklyMinutes';
import getMonthlyMinutes from "../../serveractions/graph/getMonthlyMinutes";
        
export default function NewGraph({ user }) {
    const [setting, setSetting] = useState({ title: "Week", icon: "calendar" });
    const [data, setData] = useState([]);
    const [monthData, setMonthData] = useState([]);

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

      
          
      
      

    return (
      <View>
        <NewDropdownList
          data={timeSettings}
          title="Time Range"
          setSelected={setSetting}
          defaultValue={setting}
        />
        <View style={[styles.container, setting.title === "Week" ? { marginBottom: 25 } : {}]}>
          {data.length > 0 && (
            <LineChart
              data={setting.title === "Week" ? data : monthData}
              rotateLabel
              xAxisLabelTextStyle={{ width: 100, marginLeft: -36 }}
              width={Dimensions.get("window").width * 0.8}
              yAxisLabelSuffix=" min"
              yAxisLabelWidth={50}
            />
          )}
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        // marginLeft: -5
    }
})