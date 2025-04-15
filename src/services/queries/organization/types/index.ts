import { USER_PERMISSION_ROLE } from '@/helpers/constants';

type Organization = {
   identifier: string;
   name: string;
   juridical_fancy_name: string;
   cpfcnpj: string;
   note: string | null;
   contact_mail: string;
   contact_website: string | null;
   contact_mobile_phone: string;
   contact_business_phone: string | null;
   address_street: string;
   address_number: string;
   address_district: string;
   address_complement: string | null;
   address_cep: string;
   city_name: string;
   state_name: string;
   state_uf: string;
   monitored_company_count: number;
   active: boolean;
   updated_at: string;
   created_at: string;
};

type PermissionRole =  keyof typeof USER_PERMISSION_ROLE;

type OrganizationUsers = {
   identifier: string;
   name: string;
   contact_mail: string;
   contact_mobile_phone: string;
   contact_business_phone: string | null;
   permission_role: PermissionRole;
};

type OrganizationInviteUsers = {
   cpfcnpj: string;
   expire_at: string;
   identifier: string;
   invite_email: string;
   invite_role: PermissionRole;
   name: string;
   used_at: string | null;
};

export type { Organization, OrganizationUsers, OrganizationInviteUsers };
