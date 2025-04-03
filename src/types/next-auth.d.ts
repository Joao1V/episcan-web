import 'next-auth';
import { User } from 'next-auth';


declare module 'next-auth' {
   interface Person {
   person_id: number;
   account_id: number;
   person_type: 'FISICA' | 'JURIDICA';
   name: string;
   fonetic_name: string;
   avatar: string | null;
   cpfcnpj: string;
   contact_mail: string;
   contact_website: string | null;
   contact_home_phone: string | null;
   contact_mobile_phone: string | null;
   contact_business_phone: string | null;
   address_city_id: number | null;
   address_street: string | null;
   address_number: string | null;
   address_district: string | null;
   address_complement: string | null;
   address_cep: string | null;
   address_coordinates: string | null;
   natural_civil_status_id: number | null;
   natural_rg_state_id: number | null;
   natural_scholarity: string | null;
   natural_nationality: string | null;
   natural_birthplace: string | null;
   natural_rg_number: string | null;
   natural_rg_issuer: string | null;
   natural_rg_issued_at: string | null;
   natural_cnis: string | null;
   natural_birthday: string | null;
   natural_gender: string | null;
   natural_occupation: string | null;
   natural_fathers_name: string | null;
   natural_mothers_name: string | null;
   natural_race_color: string | null;
   natural_birth_certificate_number: string | null;
   natural_birth_certificate_registry: string | null;
   natural_birth_certificate_issued_at: string | null;
   natural_birth_certificate_book: string | null;
   natural_birth_certificate_page: string | null;
   natural_especial_needs_type: string | null;
   natural_especial_needs_description: string | null;
   natural_deceased: boolean;
   juridical_fancy_name: string | null;
   juridical_state_registration_number: string | null;
   juridical_municipal_registration_number: string | null;
   note: string | null;
   active: boolean;
   created_at: string;
   updated_at: string;
   avatar_full_url: string | null;
   natural_age: number | null;
   address_city: string | null;
}
   export interface User {
   access: {
      token: string;
   };
   customer_id: number;
   account_id: number;
   company_id: number;
   referral_customer_id: number | null;
   identifier: string;
   firebase_token: string | null;
   hash_token_verify: string | null;
   hash_token_number: string | null;
   hash_token_change: string | null;
   timezone: string;
   querystring: string;
   active: boolean;
   created_at: string;
   updated_at: string;
   raw_config: string;
   contact_mail: string;
   person: Person;
   organization_invites: {
      organization_invite_id: number;
      account_id: number;
      company_id: number;
      organization_id: number;
      customer_id: number;
      identifier: string;
      invite_email: string;
      invite_role: string;
      used_at: string;
      expire_at: string;
      created_at: string;
      updated_at: string;
      organization: {
         organization_id: number;
         account_id: number;
         company_id: number;
         customer_id: number;
         plan_id: number | null;
         iugu_customer_id: string | null;
         identifier: string;
         description: string;
         active: boolean;
         created_at: string;
         updated_at: string;
      };
   }[];
}
   interface Session {
      user: User;
      token: string;
      expires: string;
      exp: number;
      iat: number;
   }

   interface Token {
      access: {
         token: string;
      };
   }
}
declare module 'next-auth/jwt' {
   export interface JWT {
      user: User;
      exp: number;
      iat: number;
   }
}
