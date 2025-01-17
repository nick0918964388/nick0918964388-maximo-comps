import {
  WrenchScrewdriverIcon,
  BoltIcon,
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

type SiteType = 'ALL' | 'HL2' | 'HL3' | 'ONS';

interface MaintenanceKPIsProps {
  selectedSite: SiteType;
}

// 為每個廠區定義 KPI 數據
const siteStats = {
  HL2: [
    {
      id: 1,
      name: 'Monthly Completion Rate',
      value: '92%',
      icon: ClipboardDocumentCheckIcon,
      change: '+4.75%',
      changeType: 'positive',
      rawValue: 92,
    },
    {
      id: 2,
      name: 'Generated MWH',
      value: '2,345',
      icon: BoltIcon,
      change: '+10.18%',
      changeType: 'positive',
      rawValue: 2345,
    },
    {
      id: 3,
      name: "Today's Maintenance Tasks",
      value: '12',
      icon: WrenchScrewdriverIcon,
      change: '3 critical',
      changeType: 'neutral',
      rawValue: 12,
    },
    {
      id: 4,
      name: 'Pending Events',
      value: '6',
      icon: ExclamationTriangleIcon,
      change: '2 urgent',
      changeType: 'negative',
      rawValue: 6,
    },
  ],
  HL3: [
    {
      id: 1,
      name: 'Monthly Completion Rate',
      value: '88%',
      icon: ClipboardDocumentCheckIcon,
      change: '+3.25%',
      changeType: 'positive',
      rawValue: 88,
    },
    {
      id: 2,
      name: 'Generated MWH',
      value: '1,987',
      icon: BoltIcon,
      change: '+8.45%',
      changeType: 'positive',
      rawValue: 1987,
    },
    {
      id: 3,
      name: "Today's Maintenance Tasks",
      value: '15',
      icon: WrenchScrewdriverIcon,
      change: '4 critical',
      changeType: 'neutral',
      rawValue: 15,
    },
    {
      id: 4,
      name: 'Pending Events',
      value: '8',
      icon: ExclamationTriangleIcon,
      change: '3 urgent',
      changeType: 'negative',
      rawValue: 8,
    },
  ],
  ONS: [
    {
      id: 1,
      name: 'Monthly Completion Rate',
      value: '94%',
      icon: ClipboardDocumentCheckIcon,
      change: '+5.15%',
      changeType: 'positive',
      rawValue: 94,
    },
    {
      id: 2,
      name: 'Generated MWH',
      value: '2,756',
      icon: BoltIcon,
      change: '+12.32%',
      changeType: 'positive',
      rawValue: 2756,
    },
    {
      id: 3,
      name: "Today's Maintenance Tasks",
      value: '9',
      icon: WrenchScrewdriverIcon,
      change: '2 critical',
      changeType: 'neutral',
      rawValue: 9,
    },
    {
      id: 4,
      name: 'Pending Events',
      value: '4',
      icon: ExclamationTriangleIcon,
      change: '1 urgent',
      changeType: 'negative',
      rawValue: 4,
    },
  ],
};

// 計算全部廠區的彙總數據
const calculateAllSitesStats = () => {
  const sites = ['HL2', 'HL3', 'ONS'] as const;
  const allStats = siteStats.HL2.map((stat, index) => {
    const totalRawValue = sites.reduce(
      (sum, site) => sum + siteStats[site][index].rawValue,
      0
    );

    let value = '';
    let change = '';
    if (stat.id === 1) {
      // 完工率取平均
      const avgRate = Math.round(totalRawValue / sites.length);
      value = `${avgRate}%`;
      change = '+4.38%'; // 平均增長率
    } else if (stat.id === 2) {
      // MWH 取總和
      value = totalRawValue.toLocaleString();
      change = '+10.32%';
    } else {
      // 任務和事件取總和
      value = totalRawValue.toString();
      const criticalCount = sites.reduce(
        (sum, site) =>
          sum + parseInt(siteStats[site][index].change.split(' ')[0]),
        0
      );
      change = `${criticalCount} ${stat.change.split(' ')[1]}`;
    }

    return {
      ...stat,
      value,
      change,
      rawValue: totalRawValue,
    };
  });

  return allStats;
};

// 新增全部廠區的數據
const allSiteStats = {
  ...siteStats,
  ALL: calculateAllSitesStats(),
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function MaintenanceKPIs({ selectedSite }: MaintenanceKPIsProps) {
  const stats = allSiteStats[selectedSite];

  return (
    <>
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-blue-500 p-3">
              <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p
              className={classNames(
                stat.changeType === 'positive'
                  ? 'text-green-600'
                  : stat.changeType === 'negative'
                  ? 'text-red-600'
                  : 'text-gray-600',
                'ml-2 flex items-baseline text-sm font-semibold'
              )}
            >
              {stat.change}
            </p>
          </dd>
        </div>
      ))}
    </>
  );
} 