'use client';

import React from 'react';

import logo from '@images/next.svg';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import api from 'api';
import FormBuilder from 'form-builder';
import md5 from 'md5';
import moment from 'moment-timezone';
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

export default function Page() {
   const router = useRouter();
   async function onSubmit(args) {
      try {
         const payloadRegister = { ...args };

         payloadRegister.password = md5(payloadRegister.password);
         payloadRegister.timezone = moment.tz.guess();

         await api.post(
            `/access/${process.env.NEXT_PUBLIC_COMPANY_IDENTIFIER}/customer/sign-up`,
            payloadRegister,
         );

         const responseLogin = await signIn('credentials', {
            login: args.contact_mail,
            password: payloadRegister.password,
            redirect: false,
         });

         if (responseLogin?.ok) {
            router.replace('/painel');
         }
      } catch (e) {
         throw new Error(e.message, { cause: e.cause });
      }
   }

   return (
      <div className="d-flex flex-column flex-lg-row flex-column-fluid">
         <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-1">
            <div className="d-flex flex-center flex-column flex-lg-row-fluid">
               <div className="w-lg-500px p-10">
                  <div className="text-center mb-11">
                     <h4 className="text-gray-900 fw-bold mb-3">Registro</h4>
                     <div className="text-gray-500 fs-7">
                        <span>Segurança em primeiro lugar</span>
                     </div>
                  </div>

                  <FormBuilder
                     isResetOnSubmit={true}
                     config={{
                        col: 'col-12',
                        formClassName: 'gy-5 mb-3',
                        schema: registerSchema,
                        fields: [
                           {
                              type: 'text',
                              accessor: 'name',
                              label: 'Nome ',
                              placeholder: 'Digite seu nome',
                           },
                           {
                              type: 'email',
                              accessor: 'contact_mail',
                              label: 'Email',
                              placeholder: 'Digite seu e-mail',
                           },
                           {
                              type: 'cpf',
                              accessor: 'cpf',
                              label: 'Digite seu CPF',
                              placeholder: 'Digite seu CPF',
                           },
                           {
                              type: 'phone-input',
                              accessor: 'contact_mobile_phone',
                              label: 'Digite seu número',
                              placeholder: 'Digite seu número',
                           },
                           {
                              type: 'password',
                              accessor: 'password',
                              label: 'Senha',
                              placeholder: 'Senha',
                           },
                           {
                              type: 'password',
                              accessor: 'confirm_password',
                              label: 'Confirme a senha',
                              placeholder: 'Digite novamente sua senha',
                              ignore: true,
                           },
                           {
                              type: 'checkbox',
                              accessor: 'terms',
                              ignore: true,
                              text: (
                                 <>
                                    Ao clicar em criar conta você concorda com nossos{' '}
                                    <Link href="/termos" target={'_blank'}>
                                       termos e políticas de privacidade
                                    </Link>
                                 </>
                              ),
                           },
                           {
                              type: 'submit',
                              text: 'Criar conta',
                              options: {
                                 buttonClassName: 'col-12',
                                 enableIf: {
                                    accessor: 'terms',
                                    value: true,
                                 },
                              },
                           },
                        ],
                     }}
                     id={'register'}
                     onSubmit={onSubmit}
                  />

                  <div className="text-gray-500 text-center fw-semibold mt-5">
                     <span> Já tem conta?</span> <Link href={'/login'}>Entrar</Link>
                  </div>
               </div>
            </div>
         </div>
         <div className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center bg-light-secondary">
            <div className="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
               <Link href={'#'} className="mb-0 mb-lg-12">
                  <Image
                     src={logo}
                     alt="logo"
                     className="h-60px h-lg-75px object-fit-contain "
                     width={400}
                  />
               </Link>

               <h2 className="d-none d-lg-block text-white fs-2x fw-bolder text-center mb-7">
                  Rápido, Eficiente e Produtivo
               </h2>
            </div>
         </div>
      </div>
   );
}
