export class Masks {
   static onlyDigits = (item: string) => {
      if (item) return item.replace(/\D/g, '');
   };

   static formatPhoneNumber(value: string) {
      // Remove todos os caracteres que não são dígitos
      value = value.replace(/\D/g, '');

      // Adiciona parênteses para os primeiros dois dígitos
      if (value.length > 2) {
         value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      }

      // Adiciona o hífen após o quinto dígito (sem contar os parênteses)
      if (value.length > 9) {
         value = value.replace(/(\d{5})(\d)/, '$1-$2');
      }

      return value;
   }

   static testDynamicPhoneNumber(val: string) {
      if (val.trim() === '') {
         return '';
      }
      let number = Masks.onlyDigits(val);
      return number && (number.toString().length === 10 || number.toString().length === 11);
   }

   static dynamicMaskPhone = (value: string) => {
        if(!value) return '';
        let a = value.replace(/[^0-9]/g, '');

        switch (a.length) {
            case 0:
                a = '';
                break;
            case 1:
                a = '(' + a.charAt(0);
                break;
            case 2:
                a = '(' + a.charAt(0) + a.charAt(1);
                break;
            case 3:
                a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2);
                break;
            case 4:
                a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3);
                break;
            case 5:
                a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4);
                break;
            case 6:
                a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4) + a.charAt(5);
                break;
            case 7:
                a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4) + a.charAt(5) + a.charAt(6);
                break;
            case 8:
                a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4) + a.charAt(5) + a.charAt(6)  + '-' + a.charAt(7);
                break;
            case 9:
                a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4) + a.charAt(5) + a.charAt(6)  + '-' + a.charAt(7) + a.charAt(8);
                break;
            case 10:
                a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4) + a.charAt(5)  + '-' + a.charAt(6) + a.charAt(7) + a.charAt(8) + a.charAt(9);
                break;
            case 11:
                a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4) + a.charAt(5) + a.charAt(6)  + '-' + a.charAt(7) + a.charAt(8) + a.charAt(9) + a.charAt(10);
                break;
            default:
                a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4) + a.charAt(5) + a.charAt(6)  + '-' + a.charAt(7) + a.charAt(8) + a.charAt(9) + a.charAt(10);
                break;
        }
        return a;
    };

   static formatCpfOrCnpj(value: string) {
      if (value) {
         value = value.replace(/\D/g, '');

         if (value.length === 11) {
            return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
         } else if (value.length === 14) {
            return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
         } else {
            throw new Error('O valor deve ter 11 dígitos (CPF) ou 14 dígitos (CNPJ)');
         }
      }
   }

   static formatCpf(value: string) {
      if (value) {
         value = value.replace(/\D/g, '');

         if (value.length === 11) {
            return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
         }
      }
   }
   static formatCnpj(value: string) {
      if (value) {
         value = value.replace(/\D/g, '');
         if (value.length === 14) {
            return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
         }
      }
   }
}
