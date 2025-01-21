'use client';

import { useSession } from 'next-auth/react';

export function AuthenticatedLayout({ children }) {
   const { data: session } = useSession();

   console.log(session);
   return (
      <>
         <header>
            <div
               id="app_header"
               className="app-header"
               data-kt-sticky="true"
               data-kt-sticky-name="app-header-sticky"
            >
               <div
                  className="app-container  container-xxl d-flex align-items-stretch justify-content-between "
                  id="kt_app_header_container"
               >
                  <div
                     className="d-flex align-items-center d-lg-none ms-n2 me-2"
                     title="Show sidebar menu"
                  >
                     <div
                        className="btn btn-icon btn-active-color-primary w-35px h-35px"
                        id="kt_app_header_menu_toggle"
                     >
                        <i className="ki-outline ki-abstract-14 fs-2" />{' '}
                     </div>
                  </div>
                  <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-18">
                     <a href="/metronic8/demo34/?page=index">
                        <img
                           alt="Logo"
                           src="/metronic8/demo34/assets/media/logos/demo34-small.svg"
                           className="h-25px d-sm-none"
                        />
                        <img
                           alt="Logo"
                           src="/metronic8/demo34/assets/media/logos/demo34.png"
                           className="h-25px d-none d-sm-block"
                        />
                     </a>
                  </div>
                  <div
                     className="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
                     id="kt_app_header_wrapper"
                  >
                     <div
                        className="app-header-menu app-header-mobile-drawer align-items-stretch"
                        data-kt-drawer="true"
                        data-kt-drawer-name="app-header-menu"
                        data-kt-drawer-activate="{default: true, lg: false}"
                        data-kt-drawer-overlay="true"
                        data-kt-drawer-width="250px"
                        data-kt-drawer-direction="start"
                        data-kt-drawer-toggle="#kt_app_header_menu_toggle"
                        data-kt-swapper="true"
                        data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
                        data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
                     >
                        {/*begin::Menu*/}
                        <div
                           className=" menu
      menu-rounded
      menu-active-bg
      menu-state-primary
      menu-column
      menu-lg-row
      menu-title-gray-700
      menu-icon-gray-500
      menu-arrow-gray-500
      menu-bullet-gray-500
      my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0
  "
                           id="kt_app_header_menu"
                           data-kt-menu="true"
                        >
                           {/*begin:Menu item*/}
                           <div
                              data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                              data-kt-menu-placement="bottom-start"
                              className="menu-item here show menu-here-bg menu-lg-down-accordion me-0 me-lg-2"
                           >
                              {/*begin:Menu link*/}
                              <span className="menu-link">
                                 <span className="menu-title">Dashboards</span>
                                 <span className="menu-arrow d-lg-none" />
                              </span>
                           </div>
                           {/*end:Menu item*/}
                           {/*begin:Menu item*/}
                           <div
                              data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                              data-kt-menu-placement="bottom-start"
                              data-kt-menu-offset="-200,0"
                              className="menu-item menu-lg-down-accordion me-0 me-lg-2"
                           >
                              {/*begin:Menu link*/}
                              <span className="menu-link">
                                 <span className="menu-title">Pages</span>
                                 <span className="menu-arrow d-lg-none" />
                              </span>
                           </div>

                           <div
                              data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                              data-kt-menu-placement="bottom-start"
                              className="menu-item menu-lg-down-accordion menu-sub-lg-down-indention me-0 me-lg-2"
                           >
                              {/*begin:Menu link*/}
                              <span className="menu-link">
                                 <span className="menu-title">Apps</span>
                                 <span className="menu-arrow d-lg-none" />
                              </span>
                           </div>
                           {/*end:Menu item*/}
                           {/*begin:Menu item*/}
                           <div
                              data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                              data-kt-menu-placement="bottom-start"
                              className="menu-item menu-lg-down-accordion menu-sub-lg-down-indention me-0 me-lg-2"
                           >
                              {/*begin:Menu link*/}
                              <span className="menu-link">
                                 <span className="menu-title">Help</span>
                                 <span className="menu-arrow d-lg-none" />
                              </span>
                           </div>
                        </div>
                     </div>
                     <div className="app-navbar flex-shrink-0">
                        <div className="app-navbar-item ms-1 ms-lg-5">
                           <div
                              className="btn btn-icon btn-custom btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
                              data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                              data-kt-menu-attach="parent"
                              data-kt-menu-placement="bottom"
                           >
                              <i className="ki-outline ki-calendar fs-1" />
                           </div>
                           {/*begin::Menu*/}
                           <div
                              className="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px"
                              data-kt-menu="true"
                              id="kt_menu_notifications"
                           >
                              {/*begin::Heading*/}
                              <div
                                 className="d-flex flex-column bgi-no-repeat rounded-top"
                                 style={{
                                    backgroundImage:
                                       'url("/metronic8/demo34/assets/media/misc/menu-header-bg.jpg")',
                                 }}
                              >
                                 {/*begin::Title*/}
                                 <h3 className="text-white fw-semibold px-9 mt-10 mb-6">
                                    Notifications{' '}
                                    <span className="fs-8 opacity-75 ps-3">24 reports</span>
                                 </h3>
                              </div>

                              <div className="tab-content">
                                 <div
                                    className="tab-pane fade"
                                    id="kt_topbar_notifications_1"
                                    role="tabpanel"
                                 >
                                    <div className="scroll-y mh-325px my-5 px-8">
                                       <div className="d-flex flex-stack py-4">
                                          <div className="d-flex align-items-center">
                                             <div className="symbol symbol-35px me-4">
                                                <span className="symbol-label bg-light-primary">
                                                   <i className="ki-outline ki-abstract-28 fs-2 text-primary" />
                                                </span>
                                             </div>
                                             <div className="mb-0 me-2">
                                                <a
                                                   href="#"
                                                   className="fs-6 text-gray-800 text-hover-primary fw-bold"
                                                >
                                                   Project Alice
                                                </a>
                                                <div className="text-gray-500 fs-7">
                                                   Phase 1 development
                                                </div>
                                             </div>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">1 hr</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center">
                                             {/*begin::Symbol*/}
                                             <div className="symbol symbol-35px me-4">
                                                <span className="symbol-label bg-light-danger">
                                                   <i className="ki-outline ki-information fs-2 text-danger" />
                                                </span>
                                             </div>
                                             {/*end::Symbol*/}
                                             {/*begin::Title*/}
                                             <div className="mb-0 me-2">
                                                <a
                                                   href="#"
                                                   className="fs-6 text-gray-800 text-hover-primary fw-bold"
                                                >
                                                   HR Confidential
                                                </a>
                                                <div className="text-gray-500 fs-7">
                                                   Confidential staff documents
                                                </div>
                                             </div>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">2 hrs</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center">
                                             {/*begin::Symbol*/}
                                             <div className="symbol symbol-35px me-4">
                                                <span className="symbol-label bg-light-warning">
                                                   <i className="ki-outline ki-briefcase fs-2 text-warning" />
                                                </span>
                                             </div>
                                             {/*end::Symbol*/}
                                             {/*begin::Title*/}
                                             <div className="mb-0 me-2">
                                                <a
                                                   href="#"
                                                   className="fs-6 text-gray-800 text-hover-primary fw-bold"
                                                >
                                                   Company HR
                                                </a>
                                                <div className="text-gray-500 fs-7">
                                                   Corporeate staff profiles
                                                </div>
                                             </div>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">5 hrs</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center">
                                             {/*begin::Symbol*/}
                                             <div className="symbol symbol-35px me-4">
                                                <span className="symbol-label bg-light-success">
                                                   <i className="ki-outline ki-abstract-12 fs-2 text-success" />
                                                </span>
                                             </div>
                                             {/*end::Symbol*/}
                                             {/*begin::Title*/}
                                             <div className="mb-0 me-2">
                                                <a
                                                   href="#"
                                                   className="fs-6 text-gray-800 text-hover-primary fw-bold"
                                                >
                                                   Project Redux
                                                </a>
                                                <div className="text-gray-500 fs-7">
                                                   New frontend admin theme
                                                </div>
                                             </div>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">2 days</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center">
                                             {/*begin::Symbol*/}
                                             <div className="symbol symbol-35px me-4">
                                                <span className="symbol-label bg-light-primary">
                                                   <i className="ki-outline ki-colors-square fs-2 text-primary" />
                                                </span>
                                             </div>
                                             {/*end::Symbol*/}
                                             {/*begin::Title*/}
                                             <div className="mb-0 me-2">
                                                <a
                                                   href="#"
                                                   className="fs-6 text-gray-800 text-hover-primary fw-bold"
                                                >
                                                   Project Breafing
                                                </a>
                                                <div className="text-gray-500 fs-7">
                                                   Product launch status update
                                                </div>
                                             </div>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">21 Jan</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center">
                                             {/*begin::Symbol*/}
                                             <div className="symbol symbol-35px me-4">
                                                <span className="symbol-label bg-light-info">
                                                   <i
                                                      className="ki-outline ki-picture
 fs-2 text-info"
                                                   />
                                                </span>
                                             </div>
                                             {/*end::Symbol*/}
                                             {/*begin::Title*/}
                                             <div className="mb-0 me-2">
                                                <a
                                                   href="#"
                                                   className="fs-6 text-gray-800 text-hover-primary fw-bold"
                                                >
                                                   Banner Assets
                                                </a>
                                                <div className="text-gray-500 fs-7">
                                                   Collection of banner images
                                                </div>
                                             </div>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">21 Jan</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center">
                                             {/*begin::Symbol*/}
                                             <div className="symbol symbol-35px me-4">
                                                <span className="symbol-label bg-light-warning">
                                                   <i className="ki-outline ki-color-swatch fs-2 text-warning" />
                                                </span>
                                             </div>
                                             {/*end::Symbol*/}
                                             {/*begin::Title*/}
                                             <div className="mb-0 me-2">
                                                <a
                                                   href="#"
                                                   className="fs-6 text-gray-800 text-hover-primary fw-bold"
                                                >
                                                   Icon Assets
                                                </a>
                                                <div className="text-gray-500 fs-7">
                                                   Collection of SVG icons
                                                </div>
                                             </div>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">20 March</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                    </div>
                                    {/*end::Items*/}
                                    {/*begin::View more*/}
                                    <div className="py-3 text-center border-top">
                                       <a
                                          href="/metronic8/demo34/?page=pages/user-profile/activity"
                                          className="btn btn-color-gray-600 btn-active-color-primary"
                                       >
                                          View All
                                          <i className="ki-outline ki-arrow-right fs-5" />{' '}
                                       </a>
                                    </div>
                                    {/*end::View more*/}
                                 </div>
                                 {/*end::Tab panel*/}
                                 {/*begin::Tab panel*/}
                                 <div
                                    className="tab-pane fade show active"
                                    id="kt_topbar_notifications_2"
                                    role="tabpanel"
                                 >
                                    {/*begin::Wrapper*/}
                                    <div className="d-flex flex-column px-9">
                                       {/*begin::Section*/}
                                       <div className="pt-10 pb-0">
                                          {/*begin::Title*/}
                                          <h3 className="text-gray-900 text-center fw-bold">
                                             Get Pro Access
                                          </h3>
                                          {/*end::Title*/}
                                          {/*begin::Text*/}
                                          <div className="text-center text-gray-600 fw-semibold pt-1">
                                             Outlines keep you honest. They stoping you from amazing
                                             poorly about drive
                                          </div>
                                          {/*end::Text*/}
                                          {/*begin::Action*/}
                                          <div className="text-center mt-5 mb-9">
                                             <a
                                                href="#"
                                                className="btn btn-sm btn-primary px-6"
                                                data-bs-toggle="modal"
                                                data-bs-target="#kt_modal_upgrade_plan"
                                             >
                                                Upgrade
                                             </a>
                                          </div>
                                          {/*end::Action*/}
                                       </div>
                                       {/*end::Section*/}
                                       {/*begin::Illustration*/}
                                       <div className="text-center px-4">
                                          <img
                                             className="mw-100 mh-200px"
                                             alt="image"
                                             src="/metronic8/demo34/assets/media/illustrations/sketchy-1/1.png"
                                          />
                                       </div>
                                       {/*end::Illustration*/}
                                    </div>
                                    {/*end::Wrapper*/}
                                 </div>
                                 {/*end::Tab panel*/}
                                 {/*begin::Tab panel*/}
                                 <div
                                    className="tab-pane fade"
                                    id="kt_topbar_notifications_3"
                                    role="tabpanel"
                                 >
                                    {/*begin::Items*/}
                                    <div className="scroll-y mh-325px my-5 px-8">
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center me-2">
                                             {/*begin::Code*/}
                                             <span className="w-70px badge badge-light-success me-4">
                                                200 OK
                                             </span>
                                             {/*end::Code*/}
                                             {/*begin::Title*/}
                                             <a
                                                href="#"
                                                className="text-gray-800 text-hover-primary fw-semibold"
                                             >
                                                New order
                                             </a>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">Just now</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center me-2">
                                             {/*begin::Code*/}
                                             <span className="w-70px badge badge-light-danger me-4">
                                                500 ERR
                                             </span>
                                             {/*end::Code*/}
                                             {/*begin::Title*/}
                                             <a
                                                href="#"
                                                className="text-gray-800 text-hover-primary fw-semibold"
                                             >
                                                New customer
                                             </a>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">2 hrs</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center me-2">
                                             {/*begin::Code*/}
                                             <span className="w-70px badge badge-light-success me-4">
                                                200 OK
                                             </span>
                                             {/*end::Code*/}
                                             {/*begin::Title*/}
                                             <a
                                                href="#"
                                                className="text-gray-800 text-hover-primary fw-semibold"
                                             >
                                                Payment process
                                             </a>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">5 hrs</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center me-2">
                                             {/*begin::Code*/}
                                             <span className="w-70px badge badge-light-warning me-4">
                                                300 WRN
                                             </span>
                                             {/*end::Code*/}
                                             {/*begin::Title*/}
                                             <a
                                                href="#"
                                                className="text-gray-800 text-hover-primary fw-semibold"
                                             >
                                                Search query
                                             </a>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">2 days</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center me-2">
                                             {/*begin::Code*/}
                                             <span className="w-70px badge badge-light-success me-4">
                                                200 OK
                                             </span>
                                             {/*end::Code*/}
                                             {/*begin::Title*/}
                                             <a
                                                href="#"
                                                className="text-gray-800 text-hover-primary fw-semibold"
                                             >
                                                API connection
                                             </a>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">1 week</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center me-2">
                                             {/*begin::Code*/}
                                             <span className="w-70px badge badge-light-success me-4">
                                                200 OK
                                             </span>
                                             {/*end::Code*/}
                                             {/*begin::Title*/}
                                             <a
                                                href="#"
                                                className="text-gray-800 text-hover-primary fw-semibold"
                                             >
                                                Database restore
                                             </a>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">Mar 5</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center me-2">
                                             {/*begin::Code*/}
                                             <span className="w-70px badge badge-light-warning me-4">
                                                300 WRN
                                             </span>
                                             {/*end::Code*/}
                                             {/*begin::Title*/}
                                             <a
                                                href="#"
                                                className="text-gray-800 text-hover-primary fw-semibold"
                                             >
                                                System update
                                             </a>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">May 15</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center me-2">
                                             {/*begin::Code*/}
                                             <span className="w-70px badge badge-light-warning me-4">
                                                300 WRN
                                             </span>
                                             {/*end::Code*/}
                                             {/*begin::Title*/}
                                             <a
                                                href="#"
                                                className="text-gray-800 text-hover-primary fw-semibold"
                                             >
                                                Server OS update
                                             </a>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">Apr 3</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center me-2">
                                             {/*begin::Code*/}
                                             <span className="w-70px badge badge-light-warning me-4">
                                                300 WRN
                                             </span>
                                             {/*end::Code*/}
                                             {/*begin::Title*/}
                                             <a
                                                href="#"
                                                className="text-gray-800 text-hover-primary fw-semibold"
                                             >
                                                API rollback
                                             </a>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">Jun 30</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center me-2">
                                             {/*begin::Code*/}
                                             <span className="w-70px badge badge-light-danger me-4">
                                                500 ERR
                                             </span>
                                             {/*end::Code*/}
                                             {/*begin::Title*/}
                                             <a
                                                href="#"
                                                className="text-gray-800 text-hover-primary fw-semibold"
                                             >
                                                Refund process
                                             </a>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">Jul 10</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center me-2">
                                             {/*begin::Code*/}
                                             <span className="w-70px badge badge-light-danger me-4">
                                                500 ERR
                                             </span>
                                             {/*end::Code*/}
                                             {/*begin::Title*/}
                                             <a
                                                href="#"
                                                className="text-gray-800 text-hover-primary fw-semibold"
                                             >
                                                Withdrawal process
                                             </a>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">Sep 10</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                       {/*begin::Item*/}
                                       <div className="d-flex flex-stack py-4">
                                          {/*begin::Section*/}
                                          <div className="d-flex align-items-center me-2">
                                             {/*begin::Code*/}
                                             <span className="w-70px badge badge-light-danger me-4">
                                                500 ERR
                                             </span>
                                             {/*end::Code*/}
                                             {/*begin::Title*/}
                                             <a
                                                href="#"
                                                className="text-gray-800 text-hover-primary fw-semibold"
                                             >
                                                Mail tasks
                                             </a>
                                             {/*end::Title*/}
                                          </div>
                                          {/*end::Section*/}
                                          {/*begin::Label*/}
                                          <span className="badge badge-light fs-8">Dec 10</span>
                                          {/*end::Label*/}
                                       </div>
                                       {/*end::Item*/}
                                    </div>
                                    {/*end::Items*/}
                                    {/*begin::View more*/}
                                    <div className="py-3 text-center border-top">
                                       <a
                                          href="/metronic8/demo34/?page=pages/user-profile/activity"
                                          className="btn btn-color-gray-600 btn-active-color-primary"
                                       >
                                          View All
                                          <i className="ki-outline ki-arrow-right fs-5" />{' '}
                                       </a>
                                    </div>
                                    {/*end::View more*/}
                                 </div>
                                 {/*end::Tab panel*/}
                              </div>
                              {/*end::Tab content*/}
                           </div>
                           {/*end::Menu*/} {/*end::Menu wrapper*/}
                        </div>
                        {/*end::Notifications*/}
                        {/*begin::Quick links*/}
                        <div className="app-navbar-item ms-1 ms-lg-5">
                           {/*begin::Menu- wrapper*/}
                           <div
                              className="btn btn-icon btn-custom btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
                              data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                              data-kt-menu-attach="parent"
                              data-kt-menu-placement="bottom"
                           >
                              <i className="ki-outline ki-abstract-26 fs-1" />
                           </div>
                           {/*begin::Menu*/}
                           <div
                              className="menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-325px"
                              data-kt-menu="true"
                           >
                              {/*begin::Heading*/}
                              <div
                                 className="d-flex flex-column flex-center bgi-no-repeat rounded-top px-9 py-10"
                                 style={{
                                    backgroundImage:
                                       'url("/metronic8/demo34/assets/media/misc/menu-header-bg.jpg")',
                                 }}
                              >
                                 {/*begin::Title*/}
                                 <h3 className="text-white fw-semibold mb-3">Quick Links</h3>
                                 {/*end::Title*/}
                                 {/*begin::Status*/}
                                 <span className="badge bg-primary text-inverse-primary py-2 px-3">
                                    25 pending tasks
                                 </span>
                                 {/*end::Status*/}
                              </div>
                              {/*end::Heading*/}
                              {/*begin:Nav*/}
                              <div className="row g-0">
                                 {/*begin:Item*/}
                                 <div className="col-6">
                                    <a
                                       href="/metronic8/demo34/?page=apps/projects/budget"
                                       className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end border-bottom"
                                    >
                                       <i className="ki-outline ki-dollar fs-3x text-primary mb-2" />{' '}
                                       <span className="fs-5 fw-semibold text-gray-800 mb-0">
                                          Accounting
                                       </span>
                                       <span className="fs-7 text-gray-500">eCommerce</span>
                                    </a>
                                 </div>
                                 {/*end:Item*/}
                                 {/*begin:Item*/}
                                 <div className="col-6">
                                    <a
                                       href="/metronic8/demo34/?page=apps/projects/settings"
                                       className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-bottom"
                                    >
                                       <i className="ki-outline ki-sms fs-3x text-primary mb-2" />{' '}
                                       <span className="fs-5 fw-semibold text-gray-800 mb-0">
                                          Administration
                                       </span>
                                       <span className="fs-7 text-gray-500">Console</span>
                                    </a>
                                 </div>
                                 {/*end:Item*/}
                                 {/*begin:Item*/}
                                 <div className="col-6">
                                    <a
                                       href="/metronic8/demo34/?page=apps/projects/list"
                                       className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end"
                                    >
                                       <i className="ki-outline ki-abstract-41 fs-3x text-primary mb-2" />{' '}
                                       <span className="fs-5 fw-semibold text-gray-800 mb-0">
                                          Projects
                                       </span>
                                       <span className="fs-7 text-gray-500">Pending Tasks</span>
                                    </a>
                                 </div>
                                 {/*end:Item*/}
                                 {/*begin:Item*/}
                                 <div className="col-6">
                                    <a
                                       href="/metronic8/demo34/?page=apps/projects/users"
                                       className="d-flex flex-column flex-center h-100 p-6 bg-hover-light"
                                    >
                                       <i className="ki-outline ki-briefcase fs-3x text-primary mb-2" />{' '}
                                       <span className="fs-5 fw-semibold text-gray-800 mb-0">
                                          Customers
                                       </span>
                                       <span className="fs-7 text-gray-500">Latest cases</span>
                                    </a>
                                 </div>
                                 {/*end:Item*/}
                              </div>
                              {/*end:Nav*/}
                              {/*begin::View more*/}
                              <div className="py-2 text-center border-top">
                                 <a
                                    href="/metronic8/demo34/?page=pages/user-profile/activity"
                                    className="btn btn-color-gray-600 btn-active-color-primary"
                                 >
                                    View All
                                    <i className="ki-outline ki-arrow-right fs-5" />{' '}
                                 </a>
                              </div>
                              {/*end::View more*/}
                           </div>
                        </div>

                        <div className="app-navbar-item ms-1 ms-lg-5">
                           <div
                              className="btn btn-icon btn-custom btn-active-color-primary w-35px h-35px w-md-40px h-md-40px position-relative"
                              id="kt_drawer_chat_toggle"
                           >
                              <i className="ki-outline ki-notification-on fs-1" />
                           </div>
                        </div>

                        <div className="app-navbar-item ms-5" id="kt_header_user_menu_toggle">
                           <div
                              className="cursor-pointer symbol symbol-35px symbol-md-40px"
                              data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                              data-kt-menu-attach="parent"
                              data-kt-menu-placement="bottom-end"
                           >
                              <img
                                 className="symbol symbol-circle symbol-35px symbol-md-40px"
                                 src="/metronic8/demo34/assets/media/avatars/300-13.jpg"
                                 alt="user"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>

         <main>{children}</main>
      </>
   );
}
