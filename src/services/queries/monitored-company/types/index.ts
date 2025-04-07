export type MonitoredCompany = {
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
   address_city_id: number;
   city_name: string;
   state_name: string;
   state_uf: string;
   scan_epi: boolean;
   monitored_company_count: number;
   active: boolean;
   updated_at: string;
   created_at: string;
   person_type: 'JURIDICA' | 'FISICA';
};

