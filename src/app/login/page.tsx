'use client';

import React from 'react';

import logo from '@images/next.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import FormBuilder, { useFormBuilder } from '@/libs/form-builder';
import { login } from '@/services/http/auth/login';

export default function LoginPage() {
   const router = useRouter();
   const { onValidateForm, isSubmitting } = useFormBuilder('login');
   async function onSubmit(args: any) {
      try {
         const { redirectTo, error } = await login(args);
         if (error) {
            const a: any = JSON.parse(error || '');

            console.log(a);

            return;
         }
         router.replace(redirectTo);
      } catch (e) {
         console.log(e);
      }
   }

   return (
      <div className="d-flex flex-column flex-lg-row flex-column-fluid">
         <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
            <div className="d-flex flex-center flex-column flex-lg-row-fluid">
               <div className="w-lg-500px p-10">
                  <div className="text-center mb-11">
                     <h4 className="text-gray-900 fw-bold mb-3">Entrar</h4>
                     <div className="text-gray-500 fs-7">
                        <span>Segurança em primeiro lugar</span>
                     </div>
                  </div>

                  <FormBuilder
                     config={{
                        col: 'col-12',
                        formClassName: 'gy-5 mb-3',
                        fields: [
                           {
                              type: 'login',
                              accessor: 'login',
                              label: 'Email ',
                              placeholder: 'Insira seu email',
                           },
                           {
                              type: 'password',
                              label: 'Senha',
                              accessor: 'password',
                              placeholder: 'Digite sua senha',
                           },
                        ],
                     }}
                     defaultValues={{
                        login: 'epis@teste.com',
                        password: '1q2w3e4r',
                     }}
                     id={'login'}
                     onSubmit={onSubmit}
                     isSubmitOnEnter
                  />

                  <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                     <div />
                     <Link href="#">Esquece a senha?</Link>
                  </div>

                  <div className="d-grid mb-10" onClick={() => onValidateForm()}>
                     <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        <span className="indicator-label">
                           {isSubmitting ? 'Acessando...' : 'Entrar'}
                        </span>
                     </button>
                  </div>

                  <div className="text-gray-500 text-center fw-semibold ">
                     <span> Não é membro?</span>{' '}
                     <Link href={'/registro'} className="link-primary">
                        Cadastre-se
                     </Link>
                  </div>
               </div>
            </div>
         </div>
         <div className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2 bg-light-secondary">
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
