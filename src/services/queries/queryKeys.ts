export const QUERY_KEYS = {
   ORGANIZATION_PAGINATE: 'restrict/organization/paginate',
   ORGANIZATION_INVITE_USERS_PAGINATE: 'restrict/organization-invite/paginate',
   ORGANIZATION_USERS_PAGINATE: (identifier: string) => `restrict/organization/${identifier}/customer/paginate`,
   COMPANIES_PAGINATE: 'restrict/monitored-company/paginate',

   ACTIVE_COMPANY: 'active-company'
};
