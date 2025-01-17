import { CubeIcon } from '@heroicons/react/24/outline';

const topMaterials = [
  {
    id: 1,
    name: 'Solar Panel - 400W',
    type: 'MM',
    usage: 156,
    trend: 'up',
    cost: 245000,
  },
  {
    id: 2,
    name: 'Lithium Battery Pack',
    type: 'MI',
    usage: 124,
    trend: 'up',
    cost: 189000,
  },
  {
    id: 3,
    name: 'Inverter - 5kW',
    type: 'MM',
    usage: 98,
    trend: 'down',
    cost: 156000,
  },
  {
    id: 4,
    name: 'Circuit Breaker',
    type: 'SI',
    usage: 87,
    trend: 'up',
    cost: 78000,
  },
  {
    id: 5,
    name: 'Power Cable (m)',
    type: 'NS',
    usage: 856,
    trend: 'up',
    cost: 68500,
  },
  {
    id: 6,
    name: 'Mounting Bracket',
    type: 'MM',
    usage: 312,
    trend: 'down',
    cost: 62400,
  },
  {
    id: 7,
    name: 'Junction Box',
    type: 'SI',
    usage: 245,
    trend: 'up',
    cost: 49000,
  },
  {
    id: 8,
    name: 'Fuse Set',
    type: 'MI',
    usage: 178,
    trend: 'down',
    cost: 35600,
  },
  {
    id: 9,
    name: 'Connector Set',
    type: 'NS',
    usage: 423,
    trend: 'up',
    cost: 25400,
  },
  {
    id: 10,
    name: 'Grounding Wire (m)',
    type: 'NS',
    usage: 634,
    trend: 'up',
    cost: 19200,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function MaterialTopList() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <CubeIcon className="h-6 w-6 text-indigo-500 mr-2" />
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Top 10 Materials by Usage
        </h3>
      </div>
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Usage
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                  >
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topMaterials.map((material) => (
                  <tr key={material.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {material.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span
                        className={classNames(
                          'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
                          material.type === 'MM'
                            ? 'bg-blue-100 text-blue-700'
                            : material.type === 'MI'
                            ? 'bg-green-100 text-green-700'
                            : material.type === 'SI'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-purple-100 text-purple-700'
                        )}
                      >
                        {material.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <span>{material.usage}</span>
                        <span
                          className={classNames(
                            'ml-2',
                            material.trend === 'up'
                              ? 'text-green-600'
                              : 'text-red-600'
                          )}
                        >
                          {material.trend === 'up' ? '↑' : '↓'}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                      ${material.cost.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 