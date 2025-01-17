import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type SiteType = 'ALL' | 'HL2' | 'HL3' | 'ONS';

interface MaintenanceChartProps {
  selectedSite: SiteType;
}

// 為每個場域定義數據
const siteData = {
  HL2: [
    { month: 'Jan', completionRate: 85 },
    { month: 'Feb', completionRate: 88 },
    { month: 'Mar', completionRate: 92 },
    { month: 'Apr', completionRate: 90 },
    { month: 'May', completionRate: 95 },
    { month: 'Jun', completionRate: 89 },
    { month: 'Jul', completionRate: 91 },
    { month: 'Aug', completionRate: 93 },
    { month: 'Sep', completionRate: 87 },
    { month: 'Oct', completionRate: 94 },
    { month: 'Nov', completionRate: 92 },
    { month: 'Dec', completionRate: 96 },
  ],
  HL3: [
    { month: 'Jan', completionRate: 82 },
    { month: 'Feb', completionRate: 85 },
    { month: 'Mar', completionRate: 88 },
    { month: 'Apr', completionRate: 87 },
    { month: 'May', completionRate: 91 },
    { month: 'Jun', completionRate: 93 },
    { month: 'Jul', completionRate: 94 },
    { month: 'Aug', completionRate: 90 },
    { month: 'Sep', completionRate: 89 },
    { month: 'Oct', completionRate: 92 },
    { month: 'Nov', completionRate: 95 },
    { month: 'Dec', completionRate: 93 },
  ],
  ONS: [
    { month: 'Jan', completionRate: 88 },
    { month: 'Feb', completionRate: 90 },
    { month: 'Mar', completionRate: 89 },
    { month: 'Apr', completionRate: 92 },
    { month: 'May', completionRate: 94 },
    { month: 'Jun', completionRate: 91 },
    { month: 'Jul', completionRate: 93 },
    { month: 'Aug', completionRate: 95 },
    { month: 'Sep', completionRate: 92 },
    { month: 'Oct', completionRate: 90 },
    { month: 'Nov', completionRate: 89 },
    { month: 'Dec', completionRate: 91 },
  ],
};

// 計算所有場域的合併數據
const calculateAllSitesData = () => {
  const months = siteData.HL2.map((item) => item.month);
  const sites = ['HL2', 'HL3', 'ONS'] as const;

  return months.map((month, index) => {
    const monthData = { month };
    sites.forEach((site) => {
      monthData[`${site}`] = siteData[site][index].completionRate;
    });
    return monthData;
  });
};

const allSitesData = {
  ...siteData,
  ALL: calculateAllSitesData(),
};

const siteColors = {
  HL2: '#3b82f6',
  HL3: '#10b981',
  ONS: '#8b5cf6',
};

export default function MaintenanceChart({ selectedSite }: MaintenanceChartProps) {
  const chartData = allSitesData[selectedSite];
  const sites = ['HL2', 'HL3', 'ONS'] as const;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
        Monthly Work Order Completion Rate (%) {selectedSite !== 'ALL' && `- ${selectedSite}`}
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {selectedSite === 'ALL' ? (
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              {sites.map((site) => (
                <Bar
                  key={site}
                  dataKey={site}
                  name={`${site} Completion Rate`}
                  fill={siteColors[site]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          ) : (
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="completionRate"
                name={`${selectedSite} Completion Rate`}
                fill={siteColors[selectedSite]}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
} 