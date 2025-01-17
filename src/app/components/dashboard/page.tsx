'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import {
  ChartBarIcon,
  WrenchIcon,
  CubeIcon,
  ExclamationCircleIcon,
  ClockIcon,
  HomeIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import MaintenanceKPIs from './MaintenanceKPIs';
import MaintenanceChart from './MaintenanceChart';
import TaskList from './TaskList';
import MaterialKPIs from './MaterialKPIs';
import MaterialChart from './MaterialChart';
import MaterialTopList from './MaterialTopList';
import PendingApprovalList from './PendingApprovalList';
import Header from '../common/Header';
import { PAGE_TITLES } from '../../config/titles';

const sites = ['ALL', 'HL2', 'HL3', 'ONS'] as const;
type SiteType = typeof sites[number];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Dashboard() {
  const [categories] = useState({
    Maintenance: [],
    Material: [],
  });

  const [selectedSite, setSelectedSite] = useState<SiteType>('ALL');

  return (
    <div className="flex flex-col h-screen">
      <Header title={PAGE_TITLES.DASHBOARD} />
      <div className="flex-1 px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            <HomeIcon className="h-4 w-4 mr-1" />
            返回主頁
          </Link>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            {sites.map((site) => (
              <button
                key={site}
                type="button"
                onClick={() => setSelectedSite(site)}
                className={classNames(
                  'px-4 py-2 text-sm font-medium',
                  'focus:z-10 focus:ring-2 focus:ring-blue-500 focus:outline-none',
                  site === selectedSite
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                  'border border-gray-200',
                  site === sites[0] && 'rounded-l-lg',
                  site === sites[sites.length - 1] && 'rounded-r-lg',
                  site !== sites[0] && '-ml-px'
                )}
              >
                {site}
              </button>
            ))}
          </div>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <div className="grid grid-cols-4 gap-4 mb-6">
                <MaintenanceKPIs selectedSite={selectedSite} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <MaintenanceChart selectedSite={selectedSite} />
                </div>
                <div className="col-span-1">
                  <PendingApprovalList selectedSite={selectedSite} />
                </div>
                <div className="h-full">
                  <TaskList 
                    title="Pending Tasks" 
                    icon={ClockIcon} 
                    selectedSite={selectedSite}
                  />
                </div>
                <div className="h-full">
                  <TaskList 
                    title="Abnormal Events" 
                    icon={ExclamationCircleIcon}
                    selectedSite={selectedSite}
                  />
                </div>
                <div className="col-span-2 h-full">
                  <TaskList 
                    title="Overdue Tasks" 
                    icon={WrenchIcon}
                    selectedSite={selectedSite}
                  />
                </div>
              </div>
            </Tab.Panel>

            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <div className="grid grid-cols-4 gap-4 mb-6">
                <MaterialKPIs />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <MaterialChart />
                </div>
                <div className="col-span-2">
                  <MaterialTopList />
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
} 