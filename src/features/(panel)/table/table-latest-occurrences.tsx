'use client';

import React, { useMemo } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { KTIcon } from 'kt-icon';
import moment from 'moment';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useCameraVerificationPaginate } from '@/services/queries/cameras';
import type { CameraVerification } from '@/services/queries/cameras';
import { FILTER_KEYS } from '@/services/queries/queryKeys';

import { TableBuilder, createColumnHelper } from '@/libs/table-builder';
import { Paginate } from '@/libs/table-builder/components/component-paginate';
import { ComponentsEmpty } from '@components/components-empty';
import { Tooltip } from 'react-tooltip';

const columnHelper = createColumnHelper<CameraVerification>();

export function TableLatestOccurrences(props: { companyIdentifier: string }) {
   const router = useRouter();

   const {
      data: cameraVerification,
      isLoading,
      isFetching,
      filterKey,
   } = useCameraVerificationPaginate(props.companyIdentifier, {
      filterKey: FILTER_KEYS.LATEST_OCCURRENCES,
      // isKeepPrevious: true,
   });

   const columns = useMemo(
      () => [
         columnHelper.accessor('camera_title', {
            header: 'Camera',
            cell: (info) => {
               const cameraUrl = info.row.original.camera_verification_verification_image1;
               return (
                  <Link href={cameraUrl || '#'} target={'_blank'}>
                     {info.getValue()}
                  </Link>
               );
            },
            size: 150,
         }),
         columnHelper.accessor('monitored_company_department_title', {
            header: 'Departamento',
            cell: (info) => <div>{info.getValue()}</div>,
         }),
         columnHelper.accessor('camera_verification_verification_at', {
            header: 'Detectado em',
            size: 200,
            cell: (info) => <div>{moment(info.getValue()).format('DD-MM-YYYY HH:mm:ss')}</div>,
         }),
         columnHelper.display({
            id: 'actions',
            header: 'Ações',
            cell: () => (
               <div className={'ps-4'}>
                  <KTIcon name={'dots-horizontal'} type={'solid'} className={'fs-3'} />
               </div>
            ),
            // meta: {
            //    isStick: true
            // },
            size: 40,
         }),
      ],
      [],
   );

   if (isLoading) return (
      <div className="row g-5">
         {[...Array(6)].map((_, index) => (
            <div key={index} className="col-12 col-md-6 col-xl-4">
               <div className="border border-gray-500 rounded-2">
                  <div className="placeholder-glow">
                     <div className="placeholder rounded-top-2 w-100" style={{ height: '400px' }} />
                  </div>
                  <div className="p-4">
                     <h5 className="placeholder-glow">
                        <span className="placeholder col-6"></span>
                     </h5>
                     <p className="placeholder-glow">
                        <span className="placeholder col-8"></span>
                     </p>
                     <p className="placeholder-glow mb-0 text-end">
                        <span className="placeholder col-4"></span>
                     </p>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );

   return (
      <div>
         {cameraVerification?.data.length === 0 && (
            <ComponentsEmpty title={'Nenhuma ocorrência registrada'}/>
         )}
         <div className="row g-5">
            {cameraVerification?.data?.map((item, index) => {
               const images = [
                  item.camera_verification_verification_image1,
                  item.camera_verification_verification_image2,
                  item.camera_verification_verification_image3,
               ].filter(Boolean);

               return (
                  <div key={index} className="col-12 col-md-6 col-xl-4">
                     <div className="border border-gray-500 rounded-2">
                        <Swiper
                           modules={[Pagination]}
                           slidesPerView={1}
                           grabCursor
                           loop
                           className={'rounded-top-2'}
                           pagination={{ clickable: true }}
                        >
                           {images.map((image: any, imageIndex) => {
                              const uniqueId = (Math.floor(Math.random() * 1000) + 1) + (imageIndex * imageIndex);
                              return (
                                 <SwiperSlide key={imageIndex}>
                                    <div
                                       onDoubleClick={() => {
                                          window.open(image, '_blank');
                                       }}

                                    >
                                       <Image
                                          src={image}
                                          alt={''}
                                          title="Clique duas vezes para abrir a imagem"
                                          className={'w-100'}
                                          width={1000}
                                          height={400}
                                          id={`image-${uniqueId}`}
                                          data-tooltip-id={`tooltip-${uniqueId}`}
                                       />
                                    </div>

                                 </SwiperSlide>
                              );
                           })}
                        </Swiper>

                        <div className={'p-4'}>
                           <h5>{item.camera_title}</h5>
                           <p>{item.monitored_company_department_title}</p>
                           <p className={'mb-0 text-end text-gray-700'}>
                              {moment(item.camera_verification_verification_at).format(
                                 'DD/MM/YYYY HH:mm:ss',
                              )}
                           </p>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
         <div className={'mt-4'}>
            <Paginate data={cameraVerification} filterKey={filterKey} />
         </div>
      </div>
   );
   // return (
   //    <div>
   //       <TableBuilder
   //          data={data?.data}
   //          isLoading={isLoading}
   //          is={{ stickyHeader: true, fetching: isFetching}}
   //          columns={columns}
   //          maxHeight={500}
   //       />
   //       <div className={'mt-5'}>
   //          <Paginate data={data}
   //                    filterKey={filterKey}
   //          />
   //       </div>
   //    </div>
   // );
}
