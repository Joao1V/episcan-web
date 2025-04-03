import { ReactNode } from 'react';

type Query<TData = any, TQueryKey extends readonly unknown[] = any[]> = {
   queryKey: TQueryKey;
   data: TData;
   url: string;
};

export type ServerHydrationProps<TData = any, TQueryKey extends readonly unknown[] = any[]> = {
   children: ReactNode;
   initialData: Query<TData, TQueryKey>[];
};
