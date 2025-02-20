'use client';

import React, {  useMemo, useState } from 'react';

const loadingSkeleton = () => <div className="skeleton h-40px w-100"></div>;

const Select = dynamic(() => import('react-select'), { ssr: false, loading: loadingSkeleton });
const AsyncSelect = dynamic(() => import('react-select/async'), { ssr: false, loading: loadingSkeleton });
const AsyncCreatableSelect = dynamic(() => import('react-select/async-creatable'), { ssr: false, loading: loadingSkeleton });
const CreatableSelect = dynamic(() => import('react-select/creatable'), { ssr: false, loading: loadingSkeleton });

import dynamic from 'next/dynamic';

import { useQueryClient } from '@tanstack/react-query';
import api from 'api';
import { KTIcon } from 'kt-icon';
import { debounce, isObject } from 'lodash';

import { LabelValuePair, OptionType, SelectBuilderProps } from './types';
import { useGetData } from '@/hooks/useGetData';

const isValidLabelValuePair = (pair: LabelValuePair): boolean => {
   const [label, value] = pair;
   return label.trim() !== '' && value.trim() !== '';
};

const SelectBuilder: React.FC<SelectBuilderProps> = (props) => {
   const queryClient = useQueryClient();
   const [disableInitialSearch, setDisableInitialSearch] = useState<boolean>(
      props.disableInitialSearch || false,
   );

   if (props?.keys && props?.keys?.length !== 2) {
      throw new Error(
         "Coloca o nome dos campos que você quer mostrar. Ex: ['label', 'value'] -> ['name', 'id']",
      );
   }

   const { isLoading} =
      props.url ?
         useGetData({
            queryKey: [`${props.url}/select`],
            url: props.url ?? '',
            onSuccess: (response) => {
               if (response && props.keys) {
                  return filterOptions(response);
               }
            },
            enabled:
               !disableInitialSearch &&
               !!props.url &&
               !queryClient.getQueryData([`${props.url}/select`]),
         })
      :  { isLoading: false };

   const filterOptions = (value: any) => {
      const aux: OptionType[] = [];
      if (value?.object?.data) {
         value?.object?.data.forEach((item: any) => {
            if (props.keys) {
               aux.push({
                  label: item[props.keys[0]],
                  value: item[props.keys[1]],
               });
            }
         });
      } else if (value?.length > 0) {
         value.forEach((item: any) => {
            if (props.keys) {
               aux.push({
                  label: item[props.keys[0]],
                  value: item[props.keys[1]],
               });
            }
         });
      } else {
         value?.object?.forEach((item: any) => {
            if (props.keys) {
               aux.push({
                  label: item[props.keys[0]],
                  value: item[props.keys[1]],
               });
            }
         });
      }
      return aux;
   };

   const searchQuery = async (query: string) => {
      try {
         let params = {
            search_global: query,
         };
         let result = await api.get(`${props.url}`, params);

         setDisableInitialSearch(false);
         return filterOptions(result);
      } catch (e) {}
   };
   const handleCreate = async (inputValue: string) => {
      const aux: OptionType[] = memoizedOptions;
      const newOption: OptionType = { label: inputValue, value: inputValue };
      let result;
      try {
         if (props?.onClickOption) {
            result = await props?.onClickOption(newOption);
         }
         if (result) {
            aux.unshift(result);
            handleChange(result);
         } else {
            aux.unshift(newOption);
            handleChange(newOption);
         }
         updateOptions(aux);
      } catch (e) {}
   };

   const updateOptions = (newOptions: OptionType[]) => {
   };

   const handleChange = (val: OptionType | null) => {
      if (props?.fieldController) {
         props?.fieldController.field.onChange(val ? val.value : null);
         if (props.onChange) props.onChange(val);
      }
   };

   const updateCachedData = async (results: any) => {
      let filterBy = [`${props.url}/select`];

      queryClient.setQueryData(filterBy, () => {
         let newValue = [...results];

         results = newValue;
         return newValue;
      });
   };

   const debouncedSearch = debounce(
      async (query: string, callback: (options: OptionType[]) => void) => {
         if (props.disableSearchQuery) {
            const results = memoizedOptions.filter((i) =>
               i.label.toLowerCase().includes(query.toLowerCase()),
            );

            callback(results);
         } else {
            let results: any = await searchQuery(query);
            await updateCachedData(results);
            callback(results);
         }

         // if (disableInitialSearch) {
         //     setDisableInitialSearch(false)
         // }
      },
      1000,
   );

   const loadOptions = (query: string, callback: (options: OptionType[]) => void) => {
      debouncedSearch(query, callback);
   };

   const memoizedOptions = useMemo<OptionType[]>(() => {
      const cachedData = (queryClient.getQueryData([`${props.url}/select`]) || []) as OptionType[];

      if (cachedData.length > 0) {
         return cachedData;
      }
      if (props?.options && props.keys) {
         if (
            props?.options?.length > 0 &&
            ((props.keys.length > 0) || props.labelKey || props.valueKey)
         ) {
            const a: any = [];
            const [label, value] = props.keys;

            props?.options.forEach((item: any) => {
               a.push({
                  label: item[label],
                  value: item[value],
               })
            });
            return a
         }
      }
   }, [queryClient, props]);

   const commonProps = useMemo(
      () => ({
         className: 'react-select-styled',
         classNamePrefix: 'react-select',
         classNames: {
            control: () =>
               props.fieldController?.formState.errors[props?.fieldController?.field?.name] ?
                  'border-danger'
               :  '',
            input: () => 'min-w-100px',
         },
         noOptionsMessage: () => (disableInitialSearch ? 'Digite para buscar' : 'Nenhum resultado'),
         placeholder: 'Selecione...',
         value:
            memoizedOptions?.find((c) => c.value === props?.fieldController?.field.value) || null,
         options: memoizedOptions,
         ref: props.fieldController?.field.ref || null,
      }),
      [props],
   );

   if (props.url || isLoading || props.isLoading) {
      return <div className="skeleton h-40px w-100"></div>;
   }

   if (props?.isAsyncCreatable) {
      return (
         <>
            <AsyncCreatableSelect
               defaultOptions={memoizedOptions}
               loadOptions={loadOptions}
               onChange={(val) => handleChange(val as unknown as OptionType)}
               formatCreateLabel={(userInput) => (
                  <div className={'da-flex gap-2 text-hover-primary'}>
                     <KTIcon type={'solid'} name={'plus'} />
                     <span>
                        Criar: <strong>{userInput}</strong>
                     </span>
                  </div>
               )}
               onCreateOption={handleCreate}
               {...commonProps}
            />
         </>
      );
   }

   if (props?.isAsync) {
      return (
         <AsyncSelect
            defaultOptions={memoizedOptions}
            loadOptions={loadOptions}
            onChange={(val) => handleChange(val as unknown as OptionType)}
            loadingMessage={() => 'Buscando...'}
            {...commonProps}
         />
      );
   }

   if (props?.isCreatable) {
      return (
         <CreatableSelect
            onChange={(val) => handleChange(val as unknown as OptionType)}
            formatCreateLabel={(userInput) => `Criar "${userInput}"`}
            onCreateOption={handleCreate}
            {...commonProps}
         />
      );
   }

   return (
      <Select
         onChange={(val) =>
            props.fieldController &&
            props?.fieldController.field.onChange(val ? (val as OptionType).value : null)
         }
         menuPlacement={'auto'}
         {...commonProps}
      />
   );
};

export default SelectBuilder;
