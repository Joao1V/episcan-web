'use client';

import { useMutation } from '@tanstack/react-query';
import api from 'api';
import { KTIcon } from 'kt-icon';
import moment from 'moment-timezone';

import { MODAL_PANEL_KEYS } from '@/features/(panel)/modal/modalKeys';
import { useModal } from '@/hooks';
import { TableBuilder } from '@/libs/table-builder';
import { useCameraPaginate } from '@/services/queries/cameras';
import { useMonitoredCompany } from '@/services/queries/monitored-company';
import { Button } from '@components/ui';

export function TableCompanyCameras() {

   const { setModal } = useModal(MODAL_PANEL_KEYS.ADD_CAMERA);

   const { data, isLoading, setData } = useCameraPaginate();
   const { data: monitoredCompany } = useMonitoredCompany();

   const { mutate: onEdit, isPending } = useMutation({
      mutationFn: async (variables: {
         identifier: string;
         active: boolean;
         index: number;
         original: Record<string, any>;
      }) => {
         const { identifier, active, original } = variables;
         const payload = {
            monitored_company_identifier: monitoredCompany.identifier,
            monitored_company_department_identifier:
               original.monitored_company_department_identifier,
            title: original.title,
            url: original.url,
            verification_minute: original.verification_minute,
            active,
         };

         const aux = data?.data;
         aux[variables.index].active = active;
         setData(aux, true);
         await api.put(`/restrict/camera/${identifier}`, payload, { isDisableToast: true });
      },
   });

   const { mutate: onRemove, isPending: isPendingRemove } = useMutation({
      mutationFn: async (variables: {
         identifier: string;
      }) => {
         const { identifier } = variables;

         await api.delete(`/restrict/camera/${identifier}`, null);
      },
   });

   if (isLoading) return <div className={'text-center'}>Carregando...</div>;
   if (data?.data?.length === 0) {
      return <div className={'text-center'}>Nenhuma camera cadastrada</div>;
   }

   return (
      <TableBuilder
         data={data ? [...data?.data] : []}
         columnVisibility={{
            identifier: false,
         }}
         columns={[
            {
               accessorKey: 'identifier',
               header: 'ID',
            },
            {
               accessorKey: 'active',
               header: 'Ativo',
               cell: ({ cell, row, getValue }) => {
                  return (
                     <div className="form-check form-switch form-check-custom form-check-solid me-10 ">
                        <input
                           className="form-check-input h-20px w-30px cursor-pointer"
                           type="checkbox"
                           disabled={isPending}
                           value=""
                           checked={getValue()}
                           onChange={() => {
                              onEdit({
                                 identifier: row.getValue('identifier'),
                                 active: !getValue(),
                                 original: row.original,
                                 index: row.index,
                              });
                           }}
                           id={cell.id}
                        />
                        <label className="form-check-label" htmlFor={cell.id}></label>
                     </div>
                  );
               },
               size: 80,
            },
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
               header: () => (
                  <>
                     Intervalo <br />
                     (em minutos)
                  </>
               ),
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
               cell: ({ row }) => (
                  <div className={' d-flex flex-center gap-2'}>
                     <Button
                        className={'btn btn-reset p-0'}
                        onClick={() => {
                           setModal(true, {
                              ...row.original,
                              camera_identifier: row.original.identifier,
                           });
                        }}
                        tooltip={{
                           content: 'Editar',
                           anchorSelect: `#edit_${row.index}`,
                           place: 'bottom',
                        }}
                     >
                        <KTIcon name={'pencil'} type={'solid'}/>
                     </Button>

                     <Button
                        className={'btn btn-reset p-0'}
                        onClick={() => onRemove({identifier: row.original.identifier})}
                        disabled={isPendingRemove}
                        tooltip={{
                           content: 'Remover',
                           anchorSelect: `#remove_${row.index}`,
                           place: 'bottom',
                        }}
                     >
                        <KTIcon name={'abstract-11'} type={'solid'}/>
                     </Button>
                  </div>
               ),
            },
         ]}
      />
   );
}
