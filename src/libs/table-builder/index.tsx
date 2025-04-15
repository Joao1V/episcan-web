'use client';

import React, { CSSProperties, useEffect, useMemo, useRef } from 'react';

import {
   createColumnHelper,
   flexRender,
   getCoreRowModel,
   useReactTable,
} from '@tanstack/react-table';
import type {
   Column,
   ColumnDef,
   RowData,
} from '@tanstack/react-table';
import '@tanstack/react-table';
import { clsx } from 'clsx';

declare module '@tanstack/react-table' {
   interface ColumnMeta<TData extends RowData, TValue> {
      isStick?: boolean;
      header?: MetaProperties;
      cell?: MetaProperties;
   }
}

interface MetaProperties {
   className?: string;
   style?: React.CSSProperties;
}

type ColumnVisibility<T> = Partial<Record<keyof T, boolean>>;

interface TableBuilderProps<T> {
   columns: ColumnDef<T, any>[]; // Estrutura das colunas
   data: T[]; // Dados da tabela
   isLoading?: boolean;
   is?: {
      loading?: boolean;
      fetching?: boolean;
      stickyHeader?: boolean;
   };
   columnVisibility?: T extends any[] ? never : ColumnVisibility<T>;
   maxHeight?: number;
}
function TableBuilder<T extends object>(props: TableBuilderProps<T>) {
   const { columns, data = [], isLoading, maxHeight, is, columnVisibility } = props;
   const { stickyHeader, fetching } = is || {};

   const tableRef = useRef<HTMLTableElement>(null);
   const tableResponsiveRef = useRef<HTMLTableElement>(null);

   const { getHeaderGroups, getRowModel } = useReactTable({
      columns,
      data: data,
      getCoreRowModel: getCoreRowModel(),
      columnResizeMode: 'onChange',
      state: {
         columnVisibility: columnVisibility,
      },
   });

   return (
      <>
         <div
            ref={tableResponsiveRef}
            style={{
               maxHeight,
            }}
            className={clsx('table-responsive', { 'table-loading': fetching })}
         >
            {!isLoading && fetching && <div className="table-loading-message">Buscando...</div>}

            <table
               ref={tableRef}
               className="table table-hover table-rounded table-row-dashed gy-4 align-middle fw-bold dataTable"
            >
               <thead className="fs-8 text-gray-500 text-uppercase">
                  {getHeaderGroups().map((headerGroup) => (
                     <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           const meta = header.column.columnDef.meta;
                           meta?.isStick &&
                              !header.column.getIsPinned() &&
                              header.column.pin('right');

                           return (
                              <th
                                 key={header.id}
                                 // colSpan={header.colSpan}
                                 className={clsx(
                                    getCommonPinningStyles(header.column).className,
                                    meta?.header?.className,
                                    {
                                       'header-sticky': stickyHeader,
                                    },
                                 )}
                                 // className="table-sort-desc"
                                 style={{
                                    width: header.column.getSize(),
                                    ...(meta?.isStick ?
                                       getCommonPinningStyles(header.column).styles
                                    :  {}),
                                 }}
                              >
                                 {header.isPlaceholder ? null : (
                                    flexRender(header.column.columnDef.header, header.getContext())
                                 )}
                              </th>
                           );
                        })}
                     </tr>
                  ))}
               </thead>
               {isLoading && (
                  <tbody>
                     {Array.from({ length: 5 }).map((_, index) => (
                        <tr className={'border-0 '} key={index}>
                           <td
                              colSpan={columns.length}
                              className={clsx('py-1', { 'pt-4': index === 0 })}
                           >
                              <div className="skeleton h-25px"></div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               )}
               {getRowModel()?.rows?.length > 0 ?
                  <tbody className={'fs-7'}>
                     {getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                           {row.getVisibleCells().map((cell) => {
                              // console.log(cell.column.columnDef);
                              const meta = cell.column.columnDef.meta;

                              return (
                                 <td
                                    key={cell.id}
                                    className={clsx(
                                       meta?.cell?.className,
                                       getCommonPinningStyles(cell.column).className,
                                    )}
                                    style={{
                                       width: cell.column.getSize(),
                                       ...(meta?.isStick ?
                                          getCommonPinningStyles(cell.column).styles
                                       :  {}),
                                    }}
                                 >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                 </td>
                              );
                           })}
                        </tr>
                     ))}
                  </tbody>
               :  !isLoading && (
                     <tbody>
                        <tr className={'text-center'} suppressHydrationWarning>
                           <td colSpan={columns.length}>
                              <h5 className={'mb-0'}>Nenhum resultado encontrado</h5>
                           </td>
                        </tr>
                     </tbody>
                  )
               }
            </table>
         </div>
      </>
   );
}

export { TableBuilder, createColumnHelper };
export type { ColumnDef };
const getCommonPinningStyles = (column: Column<any>) => {
   const isPinned = column.getIsPinned();
   const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
   const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');

   return {
      styles: {
         // borderLeft:
         //    isLastLeftPinnedColumn ? '-4px 0 4px -4px gray inset'
         //    : isFirstRightPinnedColumn ? '1px solid gainsboro'
         //    : undefined,
         left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
         right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
         opacity: isPinned ? 0.95 : 1,
         position: isPinned ? 'sticky' : 'relative',
         width: column.getSize(),
         zIndex: isPinned ? 1 : 0,
      } as CSSProperties,
      className: isPinned && 'table-active',
   };
};
