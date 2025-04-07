import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { useSetQuery } from '@/hooks';
import type { PermissionOptions } from '@/services/queries/permissions/types';
import { QUERY_KEYS } from '@/services/queries/queryKeys';
import { SetQueryReturn } from '@/hooks/useSetQuery';

type PermissionData = PermissionOptions['initialValue'];

type PermissionReturn<T> = SetQueryReturn<T> & {
   rules: PermissionOptions['initialValue']
};
export function usePermissions(options?: PermissionOptions): PermissionReturn<PermissionData> {
   const { setValue, setAllValues } = useSetQuery<PermissionData>({
      queryKey: [QUERY_KEYS.PERMISSIONS],
   });

   const { data } = useSuspenseQuery<PermissionData>({
      queryKey: [QUERY_KEYS.PERMISSIONS],
      initialData: options?.initialValue,
   });

   return { rules: data, setValue, setAllValues };
}
