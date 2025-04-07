import { useQueryClient } from '@tanstack/react-query';

type Options = {
   queryKey: Array<any>;
};

type SetQueryReturn<T> = {
   setValue: <K extends keyof T>(accessor: K, value: T[K]) => void;
   setAllValues: (values: Partial<T>) => void;
};

function useSetQuery<T = any>(options: Options): SetQueryReturn<T> {
   const queryClient = useQueryClient();

   const setValue = <K extends keyof T>(accessor: K, value: T[K]) => {
      queryClient.setQueryData(options.queryKey, (oldData: T) => ({
         ...oldData,
         [accessor]: value,
      }));
   };

   const setAllValues = (newValue: Partial<T>) => {
      queryClient.setQueryData(options.queryKey, (oldData: T) => ({
         ...oldData,
         ...newValue,
      }));
   };

   return { setValue, setAllValues };
}

export { useSetQuery };
export type { SetQueryReturn };