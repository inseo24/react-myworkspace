import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ComposedChartSample = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart width={500} height={400} data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="sido" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pm10" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="pm25" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedChartSample;
