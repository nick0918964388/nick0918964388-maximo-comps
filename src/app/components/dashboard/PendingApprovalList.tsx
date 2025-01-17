import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

interface PendingApproval {
  id: string;
  workOrderNo: string;
  title: string;
  type: 'review' | 'approve' | 'acknowledge';
  date: string;
  site: 'HL2' | 'HL3' | 'ONS';
}

type SiteType = 'ALL' | 'HL2' | 'HL3' | 'ONS';

interface PendingApprovalListProps {
  selectedSite: SiteType;
}

const mockApprovals: PendingApproval[] = [
  {
    id: '1',
    workOrderNo: 'WO-2024-001',
    title: 'Generator Monthly Maintenance',
    type: 'approve',
    date: '2024-01-20',
    site: 'HL2',
  },
  {
    id: '2',
    workOrderNo: 'WO-2024-002',
    title: 'Solar Panel System Check',
    type: 'review',
    date: '2024-01-21',
    site: 'HL2',
  },
  {
    id: '3',
    workOrderNo: 'WO-2024-003',
    title: 'Battery Replacement',
    type: 'approve',
    date: '2024-01-22',
    site: 'HL3',
  },
  {
    id: '4',
    workOrderNo: 'WO-2024-004',
    title: 'Inverter Inspection',
    type: 'acknowledge',
    date: '2024-01-23',
    site: 'HL3',
  },
  {
    id: '5',
    workOrderNo: 'WO-2024-005',
    title: 'Emergency Generator Test',
    type: 'approve',
    date: '2024-01-24',
    site: 'ONS',
  },
];

function getApprovalTypeInfo(type: PendingApproval['type']) {
  switch (type) {
    case 'review':
      return {
        label: '待審核',
        icon: '👀',
        className: 'text-blue-800 bg-blue-50 ring-blue-600/20',
      };
    case 'approve':
      return {
        label: '待核准',
        icon: '✍️',
        className: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
      };
    case 'acknowledge':
      return {
        label: '待確認',
        icon: '✅',
        className: 'text-green-800 bg-green-50 ring-green-600/20',
      };
  }
}

export default function PendingApprovalList({ selectedSite }: PendingApprovalListProps) {
  const filteredApprovals = selectedSite === 'ALL'
    ? mockApprovals
    : mockApprovals.filter(approval => approval.site === selectedSite);

  return (
    <div className="bg-white p-4 rounded-lg shadow h-[400px] relative">
      <div className="sticky top-0 bg-white z-20 pb-2 border-b mb-2">
        <div className="flex items-center mb-2">
          <ClipboardDocumentCheckIcon className="h-6 w-6 text-blue-500 mr-2" />
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            待核簽工單 {selectedSite !== 'ALL' && `- ${selectedSite}`}
          </h3>
        </div>
        <div className="min-w-full">
          <div className="grid grid-cols-4 gap-3 text-left text-sm font-semibold text-gray-900 bg-gray-50 rounded-t-lg py-2 px-4">
            <div>工單號碼</div>
            <div>維修作業</div>
            <div>核簽類型</div>
            <div className="text-right">日期</div>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100%-80px)]">
        <div className="min-w-full">
          {filteredApprovals.map((approval) => {
            const typeInfo = getApprovalTypeInfo(approval.type);
            return (
              <div
                key={approval.id}
                className="grid grid-cols-4 gap-3 py-3 px-4 border-b border-gray-200 hover:bg-gray-50"
              >
                <div className="text-sm font-medium text-gray-900">
                  {approval.workOrderNo}
                </div>
                <div className="text-sm text-gray-900">
                  {approval.title}
                </div>
                <div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${typeInfo.className}`}
                  >
                    {typeInfo.icon} {typeInfo.label}
                  </span>
                </div>
                <div className="text-sm text-right text-gray-500">
                  {new Date(approval.date).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 