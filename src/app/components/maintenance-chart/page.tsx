'use client'
import { MaintenanceChart } from '@/components/MaintenanceChart/MaintenanceChart';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

export default function MaintenanceChartPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Maintenance Cost Chart</h1>
            <p className="mt-2 text-sm text-gray-500">
              This component displays a comparison of preventive and corrective maintenance costs using modern design and interactive features.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              <MaintenanceChart />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Component Features</h2>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• Responsive design, adapts to different screen sizes</li>
                <li>• Month-based filtering</li>
                <li>• Modern visual design</li>
                <li>• Interactive chart with hover details</li>
                <li>• Clear legend descriptions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 