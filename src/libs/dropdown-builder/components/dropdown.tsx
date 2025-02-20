'use client';

import React, { createContext, useContext, useState } from 'react';
import { Dropdown as ReactDropdown } from 'react-bootstrap';

import { CustomItem, CustomMenu, CustomToggle } from './index';
import { ItemProps, MenuProps, MyDropdownProps, ToggleProps } from '@/libs/dropdown-builder/@types';

interface DropdownContext {
   trigger?: string;
}

const DropdownProvider = createContext<DropdownContext>({
   trigger: 'click'
});

const _useDropdown = () => {
   return useContext(DropdownProvider)
}
function Dropdown(props: MyDropdownProps) {
   const [isOpen, setIsOpen] = useState(false);
   const { children, trigger = 'click', items = [] } = props;
   const handleToggle = (isOpen: boolean) => {
      setIsOpen(isOpen);
   };

   const handleMouseEnter = () => {
      if (trigger === 'hover') setIsOpen(true);
   };

   const handleMouseLeave = () => {
      if (trigger === 'hover') setIsOpen(false);
   };

   return (
      <DropdownProvider.Provider value={{ trigger }}>
         <ReactDropdown
            show={isOpen}
            onToggle={handleToggle}
            onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
            onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
            className={props?.className}
            data-trigger={trigger}
         >
            {children}
            {items && items.length > 0 && (
               <Menu>
                  {items.map((item, index) => (
                     <Item key={index} {...item}>
                        {item.label}
                     </Item>
                  ))}
               </Menu>
            )}
         </ReactDropdown>
      </DropdownProvider.Provider>
   );
}

const Toggle = (props: ToggleProps) => {
   const { children } = props;
   const context = useContext(DropdownProvider);

   return (
      <ReactDropdown.Toggle as={CustomToggle} {...props} context={context}>
         {children}
      </ReactDropdown.Toggle>
   );
};

const Menu = (props: MenuProps) => {
   const { children } = props;
   const context = _useDropdown();

   return <ReactDropdown.Menu as={CustomMenu} context={context}>{children}</ReactDropdown.Menu>;
};

const Item = (props: ItemProps) => {
   const { children } = props;
   const context = _useDropdown();

   return (
      <ReactDropdown.Item as={CustomItem} {...props} context={context}>
         {children}
      </ReactDropdown.Item>
   );
};

Dropdown.Menu = Menu;
Dropdown.Item = Item;
Dropdown.Toggle = Toggle;

export { Dropdown };
