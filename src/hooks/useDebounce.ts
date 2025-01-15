'use client';

import { useCallback } from 'react';

import { debounce } from 'lodash';

export const useDebounce = <T>(callback: (value: T) => any, time = 1000) => {
   return useCallback(debounce(callback, time), []);
};
