import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', usage: 245 },
  { month: 'Feb', usage: 288 },
  { month: 'Mar', usage: 320 },
  { month: 'Apr', usage: 290 },
  { month: 'May', usage: 356 },
  { month: 'Jun', usage: 389 },
  { month: 'Jul', usage: 425 },
  { month: 'Aug', usage: 401 },
  { month: 'Sep', usage: 375 },
  { month: 'Oct', usage: 342 },
  { month: 'Nov', usage: 298 },
  { month: 'Dec', usage: 278 },
];

export default function MaterialChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
        Monthly Material Usage
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="usage"
              name="Material Usage"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#colorUsage)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 