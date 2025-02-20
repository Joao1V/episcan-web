'use client';

import { ModalBuilder } from '@components/ui';
import api from 'api';
import FormBuilder from 'form-builder';

import { MODAL_PANEL_KEYS } from '@/features/(panel)/modal/modalKeys';
import { useModal } from '@/hooks';
import { useDepartmentList } from '@/services/queries/departament';
import { useEpiPaginate } from '@/services/queries/epi';
import { useMonitoredCompany } from '@/services/queries/monitored-company';
import { useCameraPaginate } from '@/services/queries/cameras';

export function ModalAddCamera() {
   const { setModal, isShow } = useModal(MODAL_PANEL_KEYS.ADD_CAMERA);

   const { data: episData } = useEpiPaginate();
   const { data: companyData } = useMonitoredCompany();
   const { data: departments } = useDepartmentList(companyData?.identifier);
   const { refetch } = useCameraPaginate();

   const onSubmit = async (args: any) => {
      try {
         console.log(args);
         const response = await api.post('/restrict/camera', args);
         await refetch();
         console.log(response);
      } catch (error) {
         throw error;
      }
   };

   return (
      <ModalBuilder title={'Adicionar câmera'} size={'lg'} show={isShow} setModal={setModal}>
         <FormBuilder
            onSubmit={onSubmit}
            defaultValues={{
               monitored_company_identifier: companyData?.identifier,
               active: true,
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
                     keys: ['full_path', 'identifier']
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
                     text: 'Adicionar',
                  },
               ],
            }}
         />
      </ModalBuilder>
   );
}
