'use client';

import React from 'react';

import logo from '@images/next.svg';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import FormBuilder, { useFormBuilder } from '@/libs/form-builder';
import { fakeApi } from '@/libs/helpers/functions';

export default function LoginPage() {
   const router = useRouter();
   const { onValidateForm, isSubmitting } = useFormBuilder('login');
   async function onSubmit(args: any) {
      try {
         const response = await fakeApi(args, false, 2000);

         console.log(response);
      } catch (e) {}

      return;
      // try {
      //    const response = await signIn('credentials', {
      //       login: args?.login,
      //       password: args?.password,
      //       redirect: false,
      //    });
      //
      //    if (response?.error) {
      //       const a: any = JSON.parse(response?.error || '');
      //
      //       console.log(a);
      //
      //       return;
      //    }
      //    router.replace('/painel');
      // } catch (error) {
      // } finally {
      // }
   }

   return (
      <div className="d-flex flex-column flex-lg-row flex-column-fluid">
         <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
            <div className="d-flex flex-center flex-column flex-lg-row-fluid">
               <div className="w-lg-500px p-10">
                  <div className="text-center mb-11">
                     <h4 className="text-gray-900 fw-bold mb-3">Entrar</h4>
                     <div className="text-gray-500 fs-7">
                        <span>Credenciamento de entidades</span>
                     </div>
                  </div>

                  <div className="separator separator-content my-14">
                     <span className="w-150px text-gray-500 fw-semibold fs-9">Ou com e-mail</span>
                  </div>

                  <FormBuilder
                     config={{
                        col: 'col-12',
                        formClassName: 'gy-5 mb-3',
                        fields: [
                           {
                              type: 'email',
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
                     id={'login'}
                     onSubmit={onSubmit}
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
