'use client';

import { useState } from 'react';
import Select from 'react-select';

import { TableLatestOccurrences } from '@/features/(panel)/table/table-latest-occurrences';

import { useCameraPaginate } from '@/services/queries/cameras';
import { useMonitoredCompany } from '@/services/queries/monitored-company';
import { FILTER_KEYS } from '@/services/queries/queryKeys';

import { usePaginate } from '@/hooks';

export default function Page() {
   const { data: monitoredCompany } = useMonitoredCompany();
   const { data: companyPaginate } = useCameraPaginate();
   const [selectedCamera, setSelectedCamera] = useState(null);
   const { paginate, updateFilterValue } = usePaginate(FILTER_KEYS.LATEST_OCCURRENCES);
   const cameraOptions =
      companyPaginate?.data
         ?.filter((camera) => camera.active)
         ?.map((camera) => ({
            value: camera.identifier,
            label: camera.title,
         })) || [];

   return (
      <div>
         <div className={'card'}>
            <div className={'card-header'}>
               <h4 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold text-gray-900">Últimas Ocorrências</span>
               </h4>
            </div>
            <div className="card-body">
               <div className={'d-flex justify-content-end gap-2'}>
                  <div>
                     <label htmlFor="" className={'me-2 form-label'}>
                        Cameras ativas:
                     </label>
                     <select
                        className="mb-4 z-2 form-control"
                        value={selectedCamera?.value || ''}
                        onChange={(e) => {
                           const camera = cameraOptions.find((opt) => opt.value === e.target.value);
                           setSelectedCamera(camera || null);
                           if (camera) {
                              updateFilterValue('search_camera_identifier', camera.value);
                           }
                        }}
                     >
                        <option value="">Selecione uma câmera...</option>
                        {cameraOptions.map((camera) => (
                           <option key={camera.value} value={camera.value}>
                              {camera.label}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div>
                     <label htmlFor="" className={'form-label me-2'}>
                        Data inicial:
                     </label>
                     <input
                        type={'date'}
                        className={'form-control'}
                        max={new Date().toISOString().split('T')[0]}
                        defaultValue={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                           updateFilterValue('search_start_date', e.target.value);
                        }}
                     />
                  </div>


               </div>

               <TableLatestOccurrences
                  companyIdentifier={monitoredCompany.identifier}
                  cameraIdentifier={selectedCamera?.value}
               />
            </div>
         </div>
      </div>
   );
}
