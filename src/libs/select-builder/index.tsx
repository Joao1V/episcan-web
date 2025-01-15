import { SetStateAction, useMemo, useState } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import CreatableSelect from 'react-select/creatable';

import dynamic from 'next/dynamic';

import { useQueryClient } from '@tanstack/react-query';
import api from 'api';
import { KTIcon } from 'kt-icon';
import { debounce, isObject } from 'lodash';

import { FieldControllerProps, LabelValuePair, OptionType, SelectBuilderProps } from './types';
import { useGetData } from '@/hooks/useGetData';

const isValidLabelValuePair = (pair: LabelValuePair): boolean => {
   const [label, value] = pair;
   return label.trim() !== '' && value.trim() !== '';
};

const _SelectBuilder: React.FC<SelectBuilderProps> = (props) => {
   const queryClient = useQueryClient();
   const [options, setOptions] = useState<OptionType[]>(props.options || []);
   const [disableInitialSearch, setDisableInitialSearch] = useState<boolean>(
      props.disableInitialSearch || false,
   );

   if (props?.keys && !isValidLabelValuePair(props?.keys)) {
      throw new Error(
         "A prop 'keys' deve ser uma tupla válida contendo um 'label' e um 'value' não vazios.",
      );
   }

   const { isLoading } =
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
      setOptions(aux);
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

   const memoizedOptions = useMemo(() => {
      const cachedData = (queryClient.getQueryData([`${props.url}/select`]) || []) as OptionType[];

      if (props.defaultValuesForm && props?.accessorEdit) {
         if (isObject(props?.defaultValuesForm[props?.accessorEdit]) && props.keys?.length) {
            let aux: OptionType = {
               label: props?.defaultValuesForm[props?.accessorEdit][props.keys[0]],
               value: props?.defaultValuesForm[props?.accessorEdit][props.keys[1]],
            };

            let existingOption = cachedData.find((c) => {
               return c.value === props?.fieldController?.field.value;
            });
            if (!existingOption) {
               cachedData.unshift(aux);
            }
         }
      }

      if (options.length === 0 && cachedData.length > 0) {
         return cachedData;
      }

      return options;
   }, [options, queryClient, props.defaultValuesForm, props]);

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

   const updateOptions = (newOptions: SetStateAction<OptionType[]>) => {
      setOptions(newOptions);
   };

   const handleChange = (val: OptionType | null) => {
      if (props?.fieldController) {
         props?.fieldController.field.onChange(val ? val.value : null);
         if (props.onChange) props.onChange(val);
      }
   };

   const updateCachedData = async (results: any) => {
      let filterBy = [`${props.url}/select`];

      await queryClient.setQueryData(filterBy, () => {
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

   const commonProps = {
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
      value: memoizedOptions.find((c) => c.value === props?.fieldController?.field.value) || null,
      options: memoizedOptions,
      ref: props.fieldController?.field.ref || null,
      ...props,
   };

   if (props.url && isLoading) {
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
               loadingMessage={() => 'Buscando...'}
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
         {...commonProps}
      />
   );
};

const SelectBuilder = dynamic(() => Promise.resolve(_SelectBuilder), {
   ssr: false,
});
export default SelectBuilder;
