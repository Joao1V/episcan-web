'use client';

import React, { memo, useState } from 'react';
import { useController } from 'react-hook-form';

import { Autocomplete, LoadScriptNext } from '@react-google-maps/api';

import { CommonFieldConfig, FieldDefaultProps } from './../types/fields';

export type GoogleAutocompleteConfig = CommonFieldConfig & {
   type: 'google-autocomplete';
   onSelect?: (place: {
      formatted_address: string | undefined;
      lng: number | undefined;
      lat: number | undefined;
   }) => any;
   showIcon?: boolean;
   defaultValue?: string;
};
const GoogleAutocomplete = (props: FieldDefaultProps<'google-autocomplete'>) => {
   const { showIcon = true, accessor, defaultValue, onSelect } = props.config;

   const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
   const [libraries] = useState<'places'[]>(['places']);

   const handleLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
      autocompleteInstance.setComponentRestrictions({ country: ['br'] });
      autocompleteInstance.setFields(['formatted_address', 'geometry', 'address_components']);

      autocompleteInstance.addListener('place_changed', () => {
         handlePlaceChanged(autocompleteInstance);
      });

      setAutocomplete(autocompleteInstance);
   };

   const handlePlaceChanged = (autocompleteInstance: google.maps.places.Autocomplete) => {
      if (autocompleteInstance) {
         const place = autocompleteInstance.getPlace();
         const address = {
            formatted_address: place.formatted_address,
            lat: place?.geometry?.location?.lat(),
            lng: place?.geometry?.location?.lng(),
         };

         if (onSelect) {
            const value = onSelect(address);
            if (value) {
               field.onChange(value);
            } else {
               field.onChange(place.formatted_address);
            }
         } else {
            field.onChange(place.formatted_address);
         }
      }
   };
   const {
      field,
      fieldState: { error },
   } = useController({ name: accessor });

   return (
      <LoadScriptNext
         loadingElement={<div className={'skeleton h-40px'}></div>}
         googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
         libraries={libraries}
      >
         <Autocomplete onLoad={handleLoad} onPlaceChanged={() => handlePlaceChanged(autocomplete!)}>
            {showIcon ?
               <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                     {/*<KTIcon name={"map"}/>*/}
                  </span>
                  <input
                     type="text"
                     placeholder="Digite um endereço"
                     className={`form-control ${error ? 'is-invalid' : ''}`}
                     id={accessor || ''}
                     {...field}
                  />
               </div>
            :  <input
                  type="text"
                  placeholder="Digite um endereço"
                  className={`form-control mb-4`}
                  id={accessor || ''}
                  {...field}
               />
            }
         </Autocomplete>
      </LoadScriptNext>
   );
};

export default memo(GoogleAutocomplete);
