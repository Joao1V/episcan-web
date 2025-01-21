import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface SaveValueParams<T> {
   fn?: (data: T) => any;
   data: T;
   field: ControllerRenderProps<FieldValues, string>;
   defaultKeys?: (keyof T)[];
}

function saveValue<T>(options: SaveValueParams<T>): T {
   const { fn, data, field, defaultKeys } = options;
   const valueReturned = fn ? fn(data) : null;

   if (valueReturned && field.onChange) {
      field.onChange(valueReturned);
      return valueReturned;
   }

   if (defaultKeys) {
      if (defaultKeys.length === 1) {
         const value = data[defaultKeys[0]];
         field.onChange(value);
         return value as unknown as T;
      }

      const aux = defaultKeys.reduce(
         (acc, key) => {
            if (data?.hasOwnProperty(key) && (key as string)) {
               acc[key as string] = data[key];
            }
            return acc;
         },
         {} as Record<string, any>,
      );

      console.log(aux);
      field.onChange(aux);
      return aux as unknown as T;
   }

   field.onChange(data);
   return data;
}

export default saveValue;
