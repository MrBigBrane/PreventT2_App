import { LineChart } from "react-native-gifted-charts";
        
export default function NewGraph({ datum }) {
    const data = datum;
    console.log(data)
    return <LineChart data={data}/>;
};