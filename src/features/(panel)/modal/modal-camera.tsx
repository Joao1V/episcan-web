'use client';

import { ModalBuilder } from '@components/ui';
import api from 'api';
import FormBuilder from 'form-builder';

import { MODAL_PANEL_KEYS } from '@/features/(panel)/modal/modalKeys';
import { useGetData, useModal } from '@/hooks';
import { useCameraPaginate } from '@/services/queries/cameras';
import { useDepartmentList } from '@/services/queries/departament';
import { useEpiPaginate } from '@/services/queries/epi';
import { useMonitoredCompany } from '@/services/queries/monitored-company';

export function ModalCamera() {
   const { setModal, isShow, modalProps } = useModal(MODAL_PANEL_KEYS.ADD_CAMERA);
   const {
      monitored_company_department_identifier,
      camera_identifier = '',
      title,
      url,
      verification_minute,
   } = modalProps ?? {};

   const { data: episData } = useEpiPaginate();
   const { data: monitoredCompany } = useMonitoredCompany();
   const { data: departments } = useDepartmentList(monitoredCompany?.identifier);
   const { refetch } = useCameraPaginate();

   const onSubmit = async (args: any) => {
      try {
         if (camera_identifier) {
            await api.put(`/restrict/camera/${camera_identifier}`, args);
            // await refetchCameraIdentifier();
            setModal(false);
         } else {
            await api.post('/restrict/camera', args);
         }
         await refetch();
      } catch (error) {
         throw error;
      }
   };

   const { promise } = useGetData({
      queryKey: ['camera_details', camera_identifier],
      url: `/restrict/camera/${camera_identifier}`,
      enabled: !!camera_identifier,
      onSuccess: (response) => response.object,
   });

   return (
      <ModalBuilder title={`${camera_identifier ?  'Editar' : 'Adicionar '  } câmera`} size={'lg'} show={isShow} setModal={setModal}>
         <FormBuilder
            onSubmit={onSubmit}
            onFetchData={{
               fn: async () => {
                  const response = await promise;
                  const { epi_items } = response ?? {};

                  return {
                     epi_list:
                        epi_items ? epi_items.map((i: Record<string, any>) => i.identifier) : null,
                  };
               },
               enabled: !!camera_identifier,
            }}
            defaultValues={{
               monitored_company_identifier: monitoredCompany?.identifier,
               active: true,
               title,
               url,
               verification_minute,
               monitored_company_department_identifier,
            }}
            config={{
               col: 'col-12',
               fields: [
                  {
                     type: 'text',
                     accessor: 'title',
                     label: 'Nome',
                  },
                  {
                     type: 'text',
                     accessor: 'url',
                     label: 'Link da Câmera',
                  },
                  {
                     type: 'select',
                     accessor: 'monitored_company_department_identifier',
                     label: 'Setor responsável',
                     options: departments,
                     keys: ['full_path', 'identifier'],
                  },
                  {
                     type: 'number',
                     accessor: 'verification_minute',
                     label: (
                        <>
                           Tempo de verificação - <span className={'fs-sm'}>(Em minutos)</span>
                        </>
                     ),
                  },
                  {
                     type: 'checkbox',
                     label: 'Selecione os EPIs',
                     rowLabelClass: 'mb-2',
                     rowClass: 'row row-cols-2 g-5',
                     accessor: 'epi_list',
                     options: episData?.data,
                     keys: ['description', 'identifier'],
                  },
                  {
                     type: 'submit',
                     text: camera_identifier ? 'Editar' : 'Adicionar',
                  },
               ],
            }}
         />
      </ModalBuilder>
   );
}
