export const QUERY_KEYS = {
   ORGANIZATION_PAGINATE: 'restrict/organization/paginate',
   ORGANIZATION_INVITE_USERS_PAGINATE: 'restrict/organization-invite/paginate',
   ORGANIZATION_USERS_PAGINATE: (identifier: string) => `restrict/organization/${identifier}/customer/paginate`,

   COMPANIES_PAGINATE: 'restrict/monitored-company/paginate',
   DEPARTMENT_COMPANY_PAGINATE: (identifier: string) =>  `restrict/monitored-company/${identifier}/department/tree`,
   CAMERAS_PAGINATE: 'restrict/camera/paginate',
   EPIS_PAGINATE: 'restrict/epi-item/paginate',
   ACTIVE_COMPANY: 'active_company',
   ACTIVE_ORGANIZATION: 'active_organization',

   CAMERA_VERIFICATION_PAGINATE: (identifier: string) => `latest_occurrences_${identifier}`,
   DASHBOARD_SUMMARY: 'dashboard_summary',
};

export const FILTER_KEYS = {
   LATEST_OCCURRENCES: 'latest_occurrences',
};