import { ErrorResponse, FormattedErrors } from '../types';
// if (key === 'token' && messages.includes('Token não encontrado na base de dados')) {
//
//       }
export const formatValidatorErrors = (response: ErrorResponse): FormattedErrors => {
   return Object.entries(response.validator).reduce((acc, [key, messages]) => {
      acc[key] = messages
         .map(
            (message) =>
               message
                  .replace(new RegExp(key.replace(/_/g, ' '), 'gi'), '') // Remove a chave
                  .trim()
                  .replace(/\s+/g, ' '), // Substitui múltiplos espaços por um único espaço
         )
         .join(' ');
      return acc;
   }, {} as FormattedErrors);
};
