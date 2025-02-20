import React, { useMemo } from 'react';

import Link from 'next/link';

import { KTIcon } from 'kt-icon';
import moment from 'moment';

import { TableBuilder, createColumnHelper } from '@/libs/table-builder';
import { Paginate } from '@/libs/table-builder/components/component-paginate';
import { useDashboardCameraVerificationPaginate } from '@/services/queries/dashboard';
import { FILTER_KEYS } from '@/services/queries/queryKeys';

type CameraVerificationResponse = {
   camera_title: string;
   camera_verification_verification_at: string;
   camera_verification_verification_image1: string | null;
   camera_verification_verification_image2: string | null;
   camera_verification_verification_image3: string | null;
   monitored_company_department_title: string;
};
const columnHelper = createColumnHelper<CameraVerificationResponse>();

export function TableLatestOccurrences(props: { companyIdentifier: string }) {

   const { data, isLoading, isFetching, filterKey } = useDashboardCameraVerificationPaginate(props.companyIdentifier, {
      filterKey: FILTER_KEYS.LATEST_OCCURRENCES,
      isKeepPrevious: true,
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

   return (
      <div>
         <TableBuilder
            data={data?.data}
            isLoading={isLoading}
            is={{ stickyHeader: true, fetching: isFetching}}
            columns={columns}
            maxHeight={500}
         />
         <div className={'mt-5'}>
            <Paginate data={data}
                      filterKey={filterKey}
            />
         </div>
      </div>
   );
}
