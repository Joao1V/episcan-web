import * as yup from 'yup';

const registerSchema = yup.object().shape({
   name: yup.string().required('O nome é obrigatório'),
   contact_mail: yup.string().email('Insira um e-mail válido').required('O email é obrigatório'),
   cpf: yup.string().required('É necessário informar seu CPF').min(11, 'Insira um CPF válido'),
   contact_mobile_phone: yup
      .string()
      .required('Informe seu número de telefone')
      .min(10, 'Insira um número válido'),
   password: yup
      .string()
      .required('Informe uma senha')
      .min(8, 'A senha deve conter no mínimo 8 caracteres'),
   confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
      .required('Campo obrigatório'),
});

export { registerSchema };
