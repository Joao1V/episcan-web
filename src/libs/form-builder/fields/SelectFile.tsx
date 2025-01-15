import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useController } from 'react-hook-form';

import Link from 'next/link';

import { CommonFieldConfig, FieldDefaultProps } from '../types/fields';
import saveValue from '../utils/saveValue';

type AcceptFiles = 'pdf' | 'image' | 'video';

type BinaryStr = {
   base64_file: string;
   note: string;
   base64_extension: string;
   image: string;
};

export type SelectFileConfig = Omit<CommonFieldConfig, 'label' | 'placeholder'> & {
   type: 'select-file';
   onChange: (
      data: Partial<{
         allFiles: BinaryStr[];
         lastAdded: BinaryStr;
         action: 'ADDED' | 'REMOVED';
      }>,
   ) => any;
   isMultiple?: boolean;
   maxFiles?: number;
   disableRemoveFiles?: boolean;
   defaultValue?: { title: string; file: string } | null;
   text?: string | React.ReactNode;
   accept?: AcceptFiles[];
};

const SelectFile = (props: FieldDefaultProps<'select-file'>) => {
   const {
      onChange,
      isMultiple = false,
      maxFiles = 5,
      defaultValue,
      disableRemoveFiles,
      accept = ['image'],
      text,
      accessor,
   } = props.config;

   const {
      field,
      fieldState: { error },
   } = useController({ name: accessor });

   const [files, setFiles] = useState<BinaryStr[]>([]);
   const [loadingFile, setLoadingFile] = useState<boolean>(false);

   const onDrop = useCallback(
      (acceptedFiles: File[]) => {
         if (acceptedFiles.length > 0) setLoadingFile(true);
         let aux = [...files];

         acceptedFiles.forEach((file: File) => {
            const reader = new FileReader();
            const extension = file.type.split('/')[1];
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
               setLoadingFile(false);
               const binaryStr: BinaryStr = {
                  base64_file: getOnlyBase64(reader?.result as string),
                  note: file.name,
                  base64_extension:
                     extension.toUpperCase() === 'QUICKTIME' ? 'MOV' : extension.toUpperCase(),
                  image: reader.result as string,
               };
               if (aux.length === maxFiles) {
                  aux = [binaryStr]; // Reinicia se atingir o máximo
               } else {
                  aux.push(binaryStr);
               }
               setFiles(aux);
               saveValue({
                  data: { allFiles: aux, lastAdded: binaryStr, action: 'ADDED' },
                  fn: onChange,
                  field,
                  defaultKeys: ['allFiles'],
               });
            };
            reader.readAsDataURL(file);
         });
      },
      [files, maxFiles, onChange],
   );

   const acceptFiles = (accept: AcceptFiles[]) => {
      const fileTypes = {
         pdf: { 'application/pdf': ['.pdf'] },
         image: { 'image/*': ['.jpeg', '.jpg', '.png'] },
         video: { 'video/*': ['.mp4', '.avi', '.mov'] },
      };

      return accept.reduce((acc, type) => {
         return { ...acc, ...fileTypes[type] };
      }, {});
   };

   const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
      onDrop,
      accept: acceptFiles(accept),
      maxFiles,
      multiple: isMultiple,
   });

   const getOnlyBase64 = (e: string) => {
      return e.split(',').pop() || '';
   };

   const handleRemoveFile = (index: number) => {
      const aux = [...files];
      const removedFile = aux.splice(index, 1)[0];
      saveValue({
         data: { allFiles: aux, lastAdded: removedFile, action: 'REMOVED' },
         fn: onChange,
         field,
         defaultKeys: ['allFiles'],
      });

      setFiles(aux);
   };

   const isPdf = (str: string) => {
      const value = str.toLowerCase();

      const type = value.split(';')[0].split('/')[1];
      if (type !== 'pdf' && type.length > 0) {
         return false;
      }

      return value.includes('.pdf') || value.includes('/pdf');
   };
   const isVideo = (str: string) => {
      return str.includes('video') || ['mp4', 'avi', 'mov'].includes(str);
   };

   useEffect(() => {
      if (defaultValue) {
         const initFile: BinaryStr = {
            base64_file: '',
            note: defaultValue.title,
            base64_extension: '',
            image: defaultValue.file,
         };

         setFiles([initFile]);
      } else if (field.value) {
         setFiles(field.value || []);
      }
   }, []);

   useEffect(() => {
      if ((field.value === undefined || field.value === null) && files.length > 0) {
         setFiles([]);
      }
   }, [field.value]);
   return (
      <div>
         {maxFiles > files.length && (
            <div {...getRootProps()}>
               <input {...getInputProps()} />
               <div
                  className={`dropzone shadow bg-body bg-hover-gray-100i text-hover-primary shadow-sm  ${isDragActive ? 'bg-success-subtle ' : ''} min-h-50px`}
                  id="my-dropzones"
               >
                  <div className="dz-message needsclick justify-content-center">
                     <div className="text-center">
                        {/*<KTIcon name={isDragActive ? "file-up" : "add-files"}*/}
                        {/*		size={"2tx"}*/}
                        {/*		className={` ${isDragActive ? "text-success-emphasis" : "text-gray-800"}`}/>*/}
                        <div>
                           <h3 className="fs-5 fw-bold text-gray-900 mb-1">
                              {isDragActive ?
                                 'Solte o arquivo'
                              :  text || 'Arraste e solte o arquivo aqui'}
                           </h3>
                           {/*<span*/}
                           {/*	className={`fs-7 fw-semibold ${isDragActive ? "text-success-emphasis" : "text-gray-600"} opacity-75`}>*/}
                           {/*	  {isDragActive ? "Para adicionar" : "Aceito somente PDF ou Imagem"}*/}
                           {/*</span>*/}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {files.length > 0 && (
            <div>
               <div className={'d-flex gap-2 align-items-center py-5'}>
                  <h5 className={'mb-0'}>
                     Arquivo adicionado {files.length}/{maxFiles}
                  </h5>
                  <span className={'separator border-2 flex-grow-1'} style={{ height: 1 }} />
               </div>
               <div className={'row g-6'}>
                  {files.map((item, index) => {
                     return (
                        <div key={index} className={'col-12 col-md-6 col-lg'}>
                           <div className={'mw-md-400px w-100 position-relative'}>
                              <div className={isPdf(item.image) ? 'border p-4 rounded-3' : ''}>
                                 <div
                                    onClick={() =>
                                       disableRemoveFiles ? {} : handleRemoveFile(index)
                                    }
                                    className={`${disableRemoveFiles ? '' : 'cursor-pointer'} w-100 text-center trash-icon`}
                                 >
                                    {isVideo(item.base64_extension.toLowerCase()) ?
                                       <div
                                          className={`border border-gray-400 py-5 rounded-3 min-w-300px`}
                                       >
                                          <i className="bi bi-camera-video fs-4hx"></i>
                                       </div>
                                    : isPdf(item.image) ?
                                       <></>
                                       // <Image src={pdfLight} className="theme-light-show" alt="pdf"/>
                                    :  <img
                                          src={item?.image}
                                          alt=""
                                          style={{
                                             maxHeight: 230,
                                             objectPosition: '50% 50%',
                                             objectFit: 'cover',
                                          }}
                                          className={'rounded w-100 position-relative'}
                                       />
                                    }
                                    {!disableRemoveFiles && (
                                       <span
                                          className={'d-flex flex-center position-absolute p-0'}
                                          style={{ top: 10, right: 10 }}
                                       >
                                          <i className={'bi bi-trash-fill fs-5 icon '}></i>
                                       </span>
                                    )}
                                 </div>
                                 {item?.note && (
                                    <div className="text-center mt-2 limit-rows clamp-2">
                                       {item.image.includes('amazonaws') ?
                                          <Link href={item.image} target={'_blank'}>
                                             {item?.note}{' '}
                                             <i className="bi bi-box-arrow-up-right ms-1"></i>
                                          </Link>
                                       :  <span className="mw-250px ">{item?.note}</span>}
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     );
                  })}
                  {loadingFile && (
                     <div
                        className={'ms-0 m-3 card shadow-sm d-flex flex-center'}
                        style={{ height: 100, width: 100 }}
                     >
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                     </div>
                  )}
               </div>
            </div>
         )}

         {fileRejections.map(({ file }, index) => {
            const type = file?.name?.split('.').pop()?.toUpperCase() ?? '';
            return (
               <div className="mt-5 text-center text-danger" key={index}>
                  <span className="px-2 py-1 rounded-1">
                     O tipo de arquivo <span className={'fw-bold text-uppercase'}>{type}</span> não
                     é permitido
                  </span>
               </div>
            );
         })}
      </div>
   );
};

export default memo(SelectFile);
