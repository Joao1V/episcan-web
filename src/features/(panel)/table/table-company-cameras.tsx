'use client';

import moment from 'moment-timezone';

import { TableBuilder } from '@/libs/table-builder';
import { useCameraPaginate } from '@/services/queries/cameras';
import { KTIcon } from 'kt-icon';

export function TableCompanyCameras() {
   const { data } = useCameraPaginate();
   console.log('camera', data);

   if (data?.data?.length === 0) {
      return <div className={'text-center'}>Nenhuma camera cadastrada</div>;
   }
   return (
      <TableBuilder
         data={data?.data}
         columns={[
            {
               accessorKey: 'title',
               header: 'Camera',
               cell: (info) => info.getValue(),
               minSize: 150,
            },
            {
               accessorKey: 'url',
               header: 'URL',

               size: 200,
               maxSize: 200,
               cell: (info) => info.getValue(),
            },
            {
               accessorKey: 'verification_minute',
               header: () => <>Intervalo <br/>(em minutos)</>,
               cell: (info) => {
                  return <div>{info.getValue()}</div>;
               },
            },
            {
               accessorKey: 'monitored_company_department_title',
               header: 'Departamento',
               cell: (info) => {
                  return <div>{info.getValue()}</div>;
               },
            },
            {
               accessorKey: 'created_at',
               header: 'Criando em',
               size: 200,
               cell: (info) => {
                  return <div>{moment(info.getValue()).format('DD-MM-YYYY HH:mm:ss')}</div>;
               },
            },
            {
               id: 'actions',
               header: 'Ações',
               meta: {
                  isStick: true,

               },
               size: 80,
               cell: () => <div className={'ps-4'}>
                  <KTIcon name={'dots-horizontal'} type={'solid'} className={'fs-3'}/>
               </div>,
            },
         ]}
      />
   );
}
