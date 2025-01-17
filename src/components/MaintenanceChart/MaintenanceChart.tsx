import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart
} from 'recharts';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

const years = ['All', '2024', '2025', '2026'];
const locations = [
  { id: 'all', name: 'All Locations', code: 'ALL' },
  { id: 't11', name: 'HL2 (T11)', code: 'T11' },
  { id: 't15', name: 'HL3 (T15)', code: 'T15' },
  { id: 't20', name: 'ONS (T20)', code: 'T20' },
];
const activityTypes = [
  { id: 'all', name: 'All Types' },
  { id: 'pm', name: 'Preventive Maintenance (PM)' },
  { id: 'cm', name: 'Corrective Maintenance (CM)' },
];

interface MaintenanceData {
  name: string;
  preventive: number;
  corrective: number;
  location: string;
  year: string;
}

// Generate sample data for all months
const generateMonthlyData = (year: string, basePreventive: number, baseCorrective: number, location: string) => {
  return Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const monthName = new Date(2000, index).toLocaleString('en-US', { month: 'short' });
    const randomFactor = 0.8 + Math.random() * 0.4; // Random factor between 0.8 and 1.2
    
    return {
      name: `${monthName}`,
      preventive: Math.round(basePreventive * randomFactor),
      corrective: Math.round(baseCorrective * randomFactor),
      location,
      year,
    };
  });
};

const rawData: MaintenanceData[] = [
  ...generateMonthlyData('2024', 50000, 30000, 'T11'),
  ...generateMonthlyData('2024', 35000, 25000, 'T15'),
  ...generateMonthlyData('2024', 40000, 20000, 'T20'),
  ...generateMonthlyData('2025', 55000, 32000, 'T11'),
  ...generateMonthlyData('2025', 38000, 27000, 'T15'),
  ...generateMonthlyData('2025', 43000, 22000, 'T20'),
  ...generateMonthlyData('2026', 60000, 35000, 'T11'),
  ...generateMonthlyData('2026', 42000, 29000, 'T15'),
  ...generateMonthlyData('2026', 47000, 24000, 'T20'),
];

const formatYAxisTick = (value: number) => {
  return `${(value / 1000).toFixed(0)}k`;
};

interface FilterSelectProps {
  label: string;
  options: Array<{ id: string; name: string; code?: string }>;
  value: { id: string; name: string; code?: string };
  onChange: (value: any) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, options, value, onChange }) => (
  <div className="w-64">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{value.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-3 pr-4 ${
                  active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                }`
              }
            >
              {option.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  </div>
);

const calculateTrendLines = (data: any[], year: string) => {
  if (!data.length) return [];
  
  // Get previous year's data for trends
  const prevYear = year === 'All' ? null : (parseInt(year) - 1).toString();
  const currentYearData = data;
  
  // Find previous year's data for the same months and location
  const getPrevYearValue = (item: MaintenanceData, type: 'preventive' | 'corrective') => {
    if (!prevYear) return null;
    
    const prevYearData = rawData.find(d => 
      d.name === item.name && 
      d.year === prevYear && 
      d.location === item.location
    );
    
    return prevYearData ? prevYearData[type] : null;
  };

  return currentYearData.map(item => ({
    ...item,
    pmTrend: getPrevYearValue(item, 'preventive'),
    cmTrend: getPrevYearValue(item, 'corrective')
  }));
};

export const MaintenanceChart: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedActivityType, setSelectedActivityType] = useState(activityTypes[0]);

  const filteredData = useMemo(() => {
    let filtered = rawData;

    // Filter by year
    if (selectedYear !== 'All') {
      filtered = filtered.filter(item => item.year === selectedYear);
    }

    // Filter by location
    if (selectedLocation.code !== 'ALL') {
      filtered = filtered.filter(item => item.location === selectedLocation.code);
    }

    // Aggregate data by month
    const aggregated = filtered.reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.name);
      if (existing) {
        existing.preventive += curr.preventive;
        existing.corrective += curr.corrective;
      } else {
        acc.push({ ...curr });
      }
      return acc;
    }, [] as MaintenanceData[]);

    // Sort by month
    return aggregated.sort((a, b) => {
      const monthA = new Date(Date.parse(`${a.name} 1, 2000`)).getMonth();
      const monthB = new Date(Date.parse(`${b.name} 1, 2000`)).getMonth();
      return monthA - monthB;
    });
  }, [selectedYear, selectedLocation.code]);

  const chartData = useMemo(() => {
    let processedData;
    if (selectedActivityType.id === 'pm') {
      processedData = filteredData.map(item => ({
        name: item.name,
        preventive: item.preventive,
      }));
    } else if (selectedActivityType.id === 'cm') {
      processedData = filteredData.map(item => ({
        name: item.name,
        corrective: item.corrective,
      }));
    } else {
      processedData = filteredData;
    }

    // Calculate trend lines with selected year
    return calculateTrendLines(filteredData, selectedYear);
  }, [filteredData, selectedActivityType.id, selectedYear]);

  const getChartTitle = () => {
    const yearText = selectedYear === 'All' ? 'All Years' : selectedYear;
    const locationText = selectedLocation.name;
    const activityText = selectedActivityType.name;

    return `Maintenance Cost Analysis - ${activityText} | ${locationText} | ${yearText}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <FilterSelect
            label="Year"
            options={years.map(year => ({ id: year, name: year }))}
            value={{ id: selectedYear, name: selectedYear }}
            onChange={value => setSelectedYear(value.id)}
          />
          <FilterSelect
            label="RDS-PP Location"
            options={locations}
            value={selectedLocation}
            onChange={setSelectedLocation}
          />
          <FilterSelect
            label="Activity Type"
            options={activityTypes}
            value={selectedActivityType}
            onChange={setSelectedActivityType}
          />
        </div>
      </div>
      
      <div className="px-6 pb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          {getChartTitle()}
        </h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 40,
                bottom: 20,
              }}
              barGap={10}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#666' }}
                tickMargin={10}
              />
              <YAxis 
                tickFormatter={formatYAxisTick}
                tick={{ fill: '#666' }}
                tickMargin={10}
              />
              <Tooltip 
                formatter={(value: number) => [`NT$${value.toLocaleString()}`, '']}
                labelStyle={{ color: '#666' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
              />
              {selectedActivityType.id === 'all' || selectedActivityType.id === 'pm' ? (
                <Bar
                  dataKey="preventive"
                  name="Preventive Maintenance"
                  fill="#ffd7b5"
                  radius={[4, 4, 0, 0]}
                />
              ) : null}
              {selectedActivityType.id === 'all' || selectedActivityType.id === 'cm' ? (
                <Bar
                  dataKey="corrective"
                  name="Corrective Maintenance"
                  fill="#b5d7ff"
                  radius={[4, 4, 0, 0]}
                />
              ) : null}
              {(selectedActivityType.id === 'all' || selectedActivityType.id === 'pm') && (
                <Line
                  type="monotone"
                  dataKey="pmTrend"
                  name="Previous Year PM"
                  stroke="#ff9966"
                  strokeDasharray="5 5"
                  dot={false}
                  strokeWidth={2}
                />
              )}
              {(selectedActivityType.id === 'all' || selectedActivityType.id === 'cm') && (
                <Line
                  type="monotone"
                  dataKey="cmTrend"
                  name="Previous Year CM"
                  stroke="#6699ff"
                  strokeDasharray="5 5"
                  dot={false}
                  strokeWidth={2}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}; 