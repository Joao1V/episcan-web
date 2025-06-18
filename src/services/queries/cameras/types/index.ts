type OptionsPaginate<TFilters> = {
   filterKey: string;
   initialFilters?: TFilters;
   isKeepPrevious?: boolean;
};

interface CameraVerification {
   active: boolean;
   camera_verification_verification_at: string;
   camera_verification_verification_image1: string;
   camera_verification_verification_image2: string;
   camera_verification_verification_image3: string;
   camera_verification_suspected_infraction: boolean;
   bounding_box_suspected_true_count: number;
   bounding_box_suspected_false_count: number;
   camera_identifier: string;
   camera_title: string;
   camera_note: string | null;
   camera_url: string;
   camera_verification_minute: number;
   camera_active: boolean;
   camera_created_at: string;
   monitored_company_name: string;
   monitored_company_juridical_fancy_name: string;
   monitored_company_cpfcnpj: string;
   monitored_company_contact_mail: string;
   monitored_company_contact_mobile_phone: string;
   monitored_company_contact_business_phone: string | null;
   monitored_company_department_title: string;
   monitored_company_department_full_path: string;
   identifier: string;
}

export type { CameraVerification, OptionsPaginate };
