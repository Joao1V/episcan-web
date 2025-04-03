export const QUERY_KEYS = {
   ORGANIZATION: {
      PAGINATE: 'organization_paginate',
      INVITE_USERS_PAGINATE: 'organization_invite_users_paginate',
      USERS_PAGINATE: 'organization_users_paginate',
      ACTIVE: 'organization_active',
   },
   MONITORED_COMPANIES: {
      PAGINATE: 'monitored_company_paginate',
      DEPARTMENTS: 'monitored_company_departments_tree',
      ACTIVE: 'monitored_company_active',
   },
   CAMERAS_PAGINATE: 'paginate_camera',
   EPIS_PAGINATE: 'paginate_epi_item',

   CAMERA_VERIFICATION_PAGINATE: (identifier: string) => `latest_occurrences_${identifier}`,
   DASHBOARD_SUMMARY: 'dashboard_summary',

   PERMISSIONS: 'permissions'
};

export const FILTER_KEYS = {
   LATEST_OCCURRENCES: 'latest_occurrences',
};

export const COOKIES_KEYS = {
   ORGANIZATION: {
      ACTIVE: 'organization_active',
   },
};