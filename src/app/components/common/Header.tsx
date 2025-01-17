import { Squares2X2Icon, UserCircleIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="bg-[#1a3649] text-white">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">IBM Maximo Asset Management</h1>
          <span className="text-gray-300">|</span>
          <span className="text-lg">{title}</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-[#2a4659]"
          >
            <Squares2X2Icon className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-[#2a4659]"
          >
            <UserCircleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
} 