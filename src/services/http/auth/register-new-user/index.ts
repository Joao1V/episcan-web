import api from 'api';
import md5 from 'md5';
import moment from 'moment-timezone';

interface RegisterNewUser {
   contact_mail: string;
   contact_mobile_phone: string;
   cpf: string;
   name: string;
   password: string;
   timezone: string;
}
export async function registerNewUser(payload: RegisterNewUser) {
   payload.password = md5(payload.password);
   payload.timezone = moment.tz.guess();

   return await api.post(
      `/access/${process.env.NEXT_PUBLIC_COMPANY_IDENTIFIER}/customer/sign-up`,
      payload,
   );
}
