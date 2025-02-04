'use client';

import { useEffect, useState } from 'react';

import { paginateStore } from '@/store/paginateStore';

interface UsePaginate {
   filtersKey: string;
   initialParams: {
      [key: string]: any;
   };
}
export const usePaginate = (props: UsePaginate) => {
   const { filtersKey, initialParams } = props;
   const { paginate, setFilter, removeFilters, registerFilters } = paginateStore();

   useEffect(() => {
      registerFilters(filtersKey, initialParams);
      return () => {
         removeFilters(filtersKey);
      };
   }, []);

   const _setFilter = (key: string, value: any) => {
      const aux = {
         ...paginate[filtersKey],
         [key]: value,
      };
      setFilter(props.filtersKey, aux);
   };

   return { filters: paginate[filtersKey] || initialParams, setFilter: _setFilter };
};
