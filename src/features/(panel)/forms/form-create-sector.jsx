import FormBuilder from 'form-builder';

export function FormCreateSector() {
   return (
      <div>
         <FormBuilder config={{
            col: 'col-12',
            fields: [
               {
                  type: 'text',
                  accessor: 'name',
                  label: 'Nome Completo',
                  placeholder: 'Digite aqui o nome do responsável pelo setor',
               },

               {
                  type: 'email',
                  accessor: 'invite_email',
                  label: 'Email',
                  placeholder: 'Digite aqui...',
               },
               {
                  type: 'radio',
                  accessor: 'invite_role',
                  label: 'Selecione a permissão do usuário',
                  options: [
                     {
                        label: 'Admin',
                        value: 'ADMIN',
                     },
                     {
                        label: 'Gestor',
                        value: 'MANAGER',
                     },
                     {
                        label: 'Visualizador',
                        value: 'VIEWER',
                     },
                  ]
               },
               {
                  type: 'submit',
                  text: 'Enviar convite',
               }
            ]
         }}/>
      </div>
   );
}