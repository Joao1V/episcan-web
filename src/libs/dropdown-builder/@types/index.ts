import React, { JSX } from 'react';

type Items = {
  label: string;
} & (
  | { onClick: () => void; href?: never } //Se não existir href, onClick isRequired
  | { href: string; onClick?: undefined } //Se existir href, onClick isOptional
);
export interface MyDropdownProps {
   children: React.ReactNode;
   trigger?: 'click' | 'hover';
   className?: string;
   items?: Items[];
}
export interface ToggleProps {
   children: React.ReactNode;
   className?: string;
}

export interface MenuProps {
   children: any ;
}

export interface ItemProps {
   children: React.ReactNode;
   onClick?: () => void | undefined;
   href?: string;
}
