'use client';

import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
// import Select from 'react-select';

import dynamic from 'next/dynamic';
import { usePaginate, PaginationDefault } from '@/hooks';
import { ResponsePaginate } from '@/libs/axios/types';

const Select = dynamic(() => import('react-select'), { ssr: false });

type PaginateProps<T> = {
   data: ResponsePaginate<T>;
   filterKey: string;
   hiddenPerPage?: boolean;
}

export const Paginate = <T,>(props: PaginateProps<T>) => {
   const { data, filterKey, hiddenPerPage = false } = props;
   const { current_page, last_page, total, per_page } = data ?? {};
   const {paginate, updateFilterValue} = usePaginate<PaginationDefault>(filterKey)
   const [options] = useState([
      {
         label: '10',
         value: 10,
      },
      {
         label: '15',
         value: 15,
      },
      {
         label: '20',
         value: 20,
      },
      {
         label: '25',
         value: 25,
      },
      {
         label: '50',
         value: 50,
      },
   ]);

   const handleChange = (label: keyof PaginationDefault, value: number) => {
      console.log(label, value);
      console.log(paginate, filterKey);
      updateFilterValue(label, value);
   };

   return (
      <div>
         <div
            className={`${hiddenPerPage ? 'da-flex' : 'd-flex'} flex-wrap  justify-content-between pb-3`}
         >
            {!hiddenPerPage ?
               <div className={'d-flex flex-center gap-1 gap-md-2'}>
                  <span className={'per-page-label'}>Itens por página:</span>
                  <Select
                     options={options}
                     styles={{
                        container: (base) => ({ ...base, minWidth: 70 }),
                     }}
                     defaultValue={options[0]}
                     isSearchable={false}
                     menuPlacement={'auto'}
                     className={'react-select-styled react-select-sm'}
                     classNamePrefix="react-select"
                     onChange={(e: any) => handleChange('limit', e ? e.value : 1)}
                  />
               </div>
            :  <div></div>}

            <ReactPaginate
               pageCount={last_page || 1}
               className={'pagination'}
               forcePage={paginate.page - 1 || 0}
               previousClassName={'page-item previous'}
               previousLinkClassName={'page-link'}
               nextClassName={'page-item next'}
               nextLinkClassName={'page-link'}
               pageClassName={'page-item'}
               breakClassName={'page-item'}
               breakLinkClassName={'page-link'}
               pageLinkClassName={'page-link'}
               activeClassName={'active'}
               previousLabel={<i className="fa fa-chevron-left" />}
               nextLabel={<i className="fa fa-chevron-right" />}
               onPageChange={({ selected }) => handleChange('page', selected + 1)}
            />
         </div>

         <div>
            <span className={'quantity-label'}>
               Página {current_page || ''} a {last_page || ''} - Quantidade: {total || ''}
            </span>
         </div>
      </div>
   );
};
