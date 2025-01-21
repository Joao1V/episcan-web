import { FormField } from '../types/fields';
import * as yup from 'yup';

export const generateSchema = (fields: FormField[]): yup.ObjectSchema<any> => {
   const schemaFields = fields.reduce(
      (acc, field) => {
         // Garante que o field possui rule e accessor antes de usar
         if ('rule' in field && field.rule && field.accessor) {
            acc[field.accessor] = field.rule;
         }
         return acc;
      },
      {} as Record<string, yup.StringSchema>,
   );

   return yup.object(schemaFields).required();
};
