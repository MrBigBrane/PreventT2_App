import { LineChart } from "react-native-gifted-charts";
        
export default function NewGraph({ datum }) {
    const data = datum;
    return <LineChart data={data}/>;
};