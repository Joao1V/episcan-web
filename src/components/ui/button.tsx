'use client';

import React, { MouseEventHandler } from 'react';
import { createPortal } from 'react-dom';
import { ITooltip, Tooltip } from 'react-tooltip';

import { clsx } from 'clsx';

type Variants = ButtonVariants | ButtonOutlineVariants;

type ButtonVariants = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

type ButtonOutlineVariants =
   | 'outline-primary'
   | 'outline-secondary'
   | 'outline-success'
   | 'outline-warning'
   | 'outline-danger';
interface ButtonProps {
   text?: string;
   className?: string;
   children: React.ReactNode;
   type?: 'button' | 'submit' | 'reset';
   size?: 'sm' | 'lg' | 'xl';
   variant?: Variants;
   disabled?: boolean;
   tooltip?: Omit<ITooltip, 'anchorSelect'> & { anchorSelect: string }; // 🔥 Torna anchorSelect obrigatório

   onClick?: MouseEventHandler<Element>;
}

export const Button: React.FC<ButtonProps> = (props) => {
   const {
      text,
      children,
      type,
      tooltip,
      variant = 'primary',
      size,
      onClick,
      disabled,
      className,
   } = props;

   return (
      <button
         className={
            className ||
            clsx('btn', {
               ['btn-outline']: variant.includes('outline'),
               [`btn-${variant}`]: variant,
               [`btn-${size}`]: size,
            })
         }
         id={
            (tooltip?.anchorSelect?.startsWith('#') ?
               tooltip?.anchorSelect?.slice(1)
            :  tooltip?.anchorSelect) || undefined
         }
         type={type || 'button'}
         disabled={disabled}
         onClick={onClick}
      >
         {children || text}

         {tooltip &&
            createPortal(
               <Tooltip
                  className="py-1 px-2"
                  noArrow
                  style={{ fontSize: 14, zIndex: 9999 }}
                  delayShow={100}
                  offset={5}
                  {...tooltip}
               />,
               document.body,
            )}
      </button>
   );
};
