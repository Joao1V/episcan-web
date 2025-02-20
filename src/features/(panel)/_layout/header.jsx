'use client';

import { useEffect, useRef, useState } from 'react';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import avatar from '@images/vercel.svg';
import { useQueryClient } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { motion, useInView, useMotionValueEvent, useScroll } from 'motion/react';

import { useMenu } from '@/features/(panel)/menu';
import { Dropdown } from '@/libs/dropdown-builder';
import { removeAttribute, setAttribute } from '@/libs/helpers/setAtributte';

const attributes = {
   'data-kt-app-header-sticky': 'on',
};

const slideInDownVariants = {
   hidden: { y: '-100%', visibility: 'visible' },
   visible: { y: '0%', transition: { type: 'tween', duration: 0.5 } },
};

export function Header() {
   const { data: session } = useSession();
   const { scrollY } = useScroll();
   const ref = useRef(null);
   const isInView = useInView(ref);
   const elementInViewRef = useRef(true);
   const router = useRouter();
   const queryClient = useQueryClient();

   useMotionValueEvent(scrollY, 'change', (latest) => {
      if (latest <= 85 && !elementInViewRef.current) {
         elementInViewRef.current = true;
         Object.entries(attributes).forEach(([key]) => {
            removeAttribute('body', key);
         });
      } else if (latest >= 300 && elementInViewRef.current) {
         Object.entries(attributes).forEach(([key, value]) => {
            setAttribute('body', key, value);
         });
         const element = document.querySelector('.app-header');
         if (element) {
            element.classList.add('animation', 'animation-slide-in-down');
            setTimeout(() => element.classList.remove('animation', 'animation-slide-in-down'), 500);
         }
         elementInViewRef.current = false;
      }
   });

   const { menu } = useMenu({
      type: ['header'],
   });

   return (
      <motion.header
         ref={ref}
         className={'app-header'}
         initial={false}
         style={{ animationDuration: '0.3s' }}
         // animate={
         //    animationsEnabled ?
         //       isInView ?
         //          'visible'
         //       :  'hidden'
         //    :  false
         // }
         // variants={slideInDownVariants}
      >
         <div className="app-container container-xxl d-flex align-items-stretch justify-content-between">
            <div
               className="d-flex align-items-center d-lg-none ms-n2 me-2"
               title="Show sidebar menu"
            >
               <div className="btn btn-icon btn-active-color-primary w-35px h-35px">
                  <i className="ki-outline ki-abstract-14 fs-2" />
               </div>
            </div>
            <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-18">
               <Link href="/public">
                  {/*<Image*/}
                  {/*   alt="Logo"*/}
                  {/*   src=""*/}
                  {/*   className="h-25px d-sm-none"*/}
                  {/*/>*/}
                  {/*<Image*/}
                  {/*   alt="Logo"*/}
                  {/*   src="/metronic8/demo34/assets/media/logos/demo34.png"*/}
                  {/*   className="h-25px d-none d-sm-block"*/}
                  {/*/>*/}
               </Link>
            </div>
            <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
               <div className="app-header-menu app-header-mobile-drawer align-items-stretch">
                  <div className="menu menu-rounded menu-active-bg menu-state-primary menu-column menu-lg-row menu-title-gray-700 menu-icon-gray-500 menu-arrow-gray-500 menu-bullet-gray-500 my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0">
                     {/*{menu.routes.map((route, key) => (*/}
                     {/*   <div*/}
                     {/*      key={key}*/}
                     {/*      className={`${clsx('menu-item me-0 me-lg-2', {*/}
                     {/*         'here show': route.active,*/}
                     {/*      })} `}*/}
                     {/*   >*/}
                     {/*      <span className="menu-link">*/}
                     {/*         <Link className="menu-title" href={`${menu.basePath}${route.href}`}>*/}
                     {/*            {route.name}*/}
                     {/*         </Link>*/}
                     {/*         <span className="menu-arrow d-lg-none" />*/}
                     {/*      </span>*/}
                     {/*   </div>*/}
                     {/*))}*/}
                  </div>
               </div>

               <div className="app-navbar flex-shrink-0">
                  <div className="app-navbar-item ms-1 ms-lg-5">
                     <div className="btn btn-icon btn-custom btn-active-color-primary w-35px h-35px w-md-40px h-md-40px">
                        <i className="ki-outline ki-calendar fs-4" />
                     </div>
                  </div>
                  <div className="app-navbar-item ms-1 ms-lg-5">
                     <div className="btn btn-icon btn-custom btn-active-color-primary w-35px h-35px w-md-40px h-md-40px">
                        <i className="ki-outline ki-abstract-26 fs-4" />
                     </div>
                  </div>
                  <div className="app-navbar-item ms-1 ms-lg-5">
                     <div
                        className="btn btn-icon btn-custom btn-active-color-primary w-35px h-35px w-md-40px h-md-40px position-relative"
                        id="kt_drawer_chat_toggle"
                     >
                        <i className="ki-outline ki-notification-on fs-4" />
                     </div>
                  </div>
                  <div className={'app-navbar-item ms-5'}>
                     <Dropdown >
                        <Dropdown.Toggle className="cursor-pointer symbol symbol-35px symbol-md-40px">
                           <Image
                              className="symbol symbol-circle symbol-35px symbol-md-40px"
                              src={avatar}
                              width={50}
                              height={50}
                              alt="user"
                           />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                           <Dropdown.Item href={'/painel/criar-empresa'}>
                              Nova empresa
                           </Dropdown.Item>
                           <Dropdown.Item
                              onClick={async () => {
                                 await signOut({ redirect: true });
                                 await queryClient.clear();
                                 // router.replace('/login');
                              }}
                           >
                              Sair
                           </Dropdown.Item>
                        </Dropdown.Menu>
                     </Dropdown>
                  </div>
               </div>
            </div>
         </div>
      </motion.header>
   );
}
