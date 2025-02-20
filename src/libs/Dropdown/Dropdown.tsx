import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './Dropdown.scss';
import { KTIcon } from 'kt-icon';

interface DropdownProps {
  trigger?: 'hover' | 'click';
  label: string;
  children: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ 
  trigger = 'hover',
  label,
  children 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsOpen(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (trigger === 'click') {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [trigger]);

  return (
    <div 
      className="dropdown"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <button className="dropdown__trigger">
        {label}
        <KTIcon
          className={`dropdown__icon ${isOpen ? 'dropdown__icon--open' : ''}`}
          name={'arrow-down'}
        />
      </button>
      
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="dropdown__content"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        ): null}
      </AnimatePresence>
    </div>
  );
};