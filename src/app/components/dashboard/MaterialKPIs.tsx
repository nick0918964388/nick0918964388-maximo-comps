import {
  CubeIcon,
  QueueListIcon,
  ArrowTrendingUpIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    id: 1,
    name: 'Total MM Items',
    value: '1,234',
    icon: CubeIcon,
    change: '+12 this month',
    changeType: 'positive',
  },
  {
    id: 2,
    name: 'Total MI Items',
    value: '856',
    icon: QueueListIcon,
    change: '+8 this month',
    changeType: 'positive',
  },
  {
    id: 3,
    name: 'Total SI/NS Items',
    value: '432',
    icon: ArrowTrendingUpIcon,
    change: '+5 this month',
    changeType: 'positive',
  },
  {
    id: 4,
    name: 'Pending Requisitions',
    value: '28',
    icon: ShoppingCartIcon,
    change: '6 urgent',
    changeType: 'neutral',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function MaterialKPIs() {
  return (
    <>
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-3">
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