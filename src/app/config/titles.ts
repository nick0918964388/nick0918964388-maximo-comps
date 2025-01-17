export const PAGE_TITLES = {
  HOME: 'Maximo Components',
  DASHBOARD: 'Business Analysis',
  MAINTENANCE_CHART: 'Maintenance Cost Chart',
} as const;

export type PageTitleKey = keyof typeof PAGE_TITLES; 