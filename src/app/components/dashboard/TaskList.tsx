import { ComponentType } from 'react';

interface Task {
  id: number;
  title: string;
  status: string;
  priority: 'low' | 'medium' | 'high';
  date: string;
  assignee?: string;
  location?: string;
  site: 'HL2' | 'HL3' | 'ONS';
}

type SiteType = 'ALL' | 'HL2' | 'HL3' | 'ONS';

interface TaskListProps {
  title: string;
  icon: ComponentType<{ className?: string }>;
  selectedSite: SiteType;
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Generator Maintenance Check',
    status: 'Pending',
    priority: 'high',
    date: '2024-01-20',
    assignee: 'John Smith',
    location: 'Building A',
    site: 'HL2',
  },
  {
    id: 2,
    title: 'Solar Panel Cleaning',
    status: 'In Progress',
    priority: 'medium',
    date: '2024-01-21',
    assignee: 'Emma Wilson',
    location: 'Field B',
    site: 'HL2',
  },
  {
    id: 3,
    title: 'Battery System Inspection',
    status: 'Pending',
    priority: 'high',
    date: '2024-01-22',
    assignee: 'Michael Chen',
    location: 'Control Room',
    site: 'HL3',
  },
  {
    id: 4,
    title: 'Inverter Maintenance',
    status: 'Scheduled',
    priority: 'low',
    date: '2024-01-23',
    assignee: 'Sarah Johnson',
    location: 'Building C',
    site: 'HL3',
  },
  {
    id: 5,
    title: 'Wiring Check',
    status: 'Pending',
    priority: 'medium',
    date: '2024-01-24',
    assignee: 'David Brown',
    location: 'Panel Room',
    site: 'ONS',
  },
  {
    id: 6,
    title: 'Transformer Inspection',
    status: 'Pending',
    priority: 'high',
    date: '2024-01-25',
    assignee: 'Lisa Wang',
    location: 'Station A',
    site: 'ONS',
  },
  {
    id: 7,
    title: 'Circuit Breaker Test',
    status: 'In Progress',
    priority: 'medium',
    date: '2024-01-26',
    assignee: 'Tom Wilson',
    location: 'Panel B',
    site: 'HL2',
  },
  {
    id: 8,
    title: 'Power Quality Check',
    status: 'Scheduled',
    priority: 'low',
    date: '2024-01-27',
    assignee: 'James Lee',
    location: 'Control Room',
    site: 'HL3',
  },
];

function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high':
      return 'text-red-800 bg-red-100';
    case 'medium':
      return 'text-yellow-800 bg-yellow-100';
    case 'low':
      return 'text-green-800 bg-green-100';
    default:
      return 'text-gray-800 bg-gray-100';
  }
}

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'text-yellow-800 bg-yellow-50 ring-yellow-600/20';
    case 'in progress':
      return 'text-blue-800 bg-blue-50 ring-blue-600/20';
    case 'scheduled':
      return 'text-purple-800 bg-purple-50 ring-purple-600/20';
    default:
      return 'text-gray-800 bg-gray-50 ring-gray-600/20';
  }
}

export default function TaskList({ title, icon: Icon, selectedSite }: TaskListProps) {
  // 根據選擇的廠區篩選任務
  const filteredTasks = selectedSite === 'ALL' 
    ? mockTasks 
    : mockTasks.filter(task => task.site === selectedSite);

  return (
    <div className="bg-white p-4 rounded-lg shadow h-[400px] relative">
      <div className="sticky top-0 bg-white z-20 pb-2 border-b mb-2">
        <div className="flex items-center mb-2">
          <Icon className="h-6 w-6 text-blue-500 mr-2" />
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title} {selectedSite !== 'ALL' && `- ${selectedSite}`}
          </h3>
        </div>
        <div className="min-w-full">
          <div className="grid grid-cols-6 gap-3 text-left text-sm font-semibold text-gray-900 bg-gray-50 rounded-t-lg py-2 px-4">
            <div>Task</div>
            <div>Status</div>
            <div>Priority</div>
            <div>Assignee</div>
            <div>Location</div>
            <div className="text-right">Due Date</div>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100%-80px)]">
        <div className="min-w-full">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-6 gap-3 py-3 px-4 border-b border-gray-200 hover:bg-gray-50"
            >
              <div className="text-sm font-medium text-gray-900">
                {task.title}
              </div>
              <div>
                <span
                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>
              <div>
                <span
                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {task.assignee}
              </div>
              <div className="text-sm text-gray-500">
                {task.location}
              </div>
              <div className="text-sm text-right text-gray-500">
                {new Date(task.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 