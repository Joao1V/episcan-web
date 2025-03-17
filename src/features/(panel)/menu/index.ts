'use client';

import { useMemo } from 'react';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

type Route = {
   name: string;
   breadcrumb: string;
   href: string;
   title: string;
   description: string | null;
   active: boolean;
   type: TypesMenu[];
};

type Menu = {
   basePath: string;
   routes: Route[];
   active?: Route | null;
};

type TypesMenu = 'header' | 'company-profile';

type Options = {
   type: TypesMenu[];
   params?: Record<string, any>;
};

type ReturnMenu = {
   menu: Menu;
};
export function useMenu(options: Options): ReturnMenu {
   const pathname = usePathname();
   const { data: session } = useSession();
   const { type, params } = options;

   const menu = useMemo(() => {
      const baseMenu: Menu = {
         basePath: '/painel',
         routes: [
            {
               name: 'Dashboard',
               href: '',
               breadcrumb: 'Dashboard',
               title: `Bem vindo de volta, ${session?.user.person.name}`,
               description: null,
               active: false,
               type: ['header'],
            },
            {
               name: 'Criar empresa',
               breadcrumb: 'Criar empresa',
               href: '/criar-empresa',
               title: 'Vamos criar sua empresa',
               description: null,
               active: false,
               type: ['header'],
            },
            {
               name: 'Dashboard',
               href: '/dashboard',
               breadcrumb: 'Dashboard',
               title: `Bem vindo de volta, ${session?.user.person.name}`,
               description: null,
               active: false,
               type: ['company-profile'],
            },
            {
               name: 'Ocorrências',
               href: '/ocorrencias',
               breadcrumb: 'Ocorrencias',
               title: 'Ocorrências',
               description: null,
               active: false,
               type: ['company-profile'],
            },
            {
               name: 'Setor',
               breadcrumb: 'Setor',
               href: '/setor',
               title: 'Gerenciar setores',
               description: null,
               active: false,
               type: ['company-profile'],
            },
            {
               name: 'Funcionários',
               breadcrumb: 'Funcionários',
               href: `/funcionarios/${params?.organizationIdentifier}`,
               title: 'Gerenciar funcionários',
               description: null,
               active: false,
               type: ['company-profile'],
            },
            {
               name: 'Câmeras',
               breadcrumb: 'Câmeras',
               href: '/camera',
               title: 'Câmeras',
               description: null,
               active: false,
               type: ['company-profile'],
            },
         ],
         active: null,
      };

      const filteredRoutes = baseMenu.routes.filter((route) =>
         route.type.some((t) => type.includes(t)),
      );
      const foundIndex = filteredRoutes.findIndex(
         (route) => pathname === `${baseMenu.basePath}${route.href}`,
      );

      if (foundIndex !== -1) {
         filteredRoutes[foundIndex].active = true;
         baseMenu.active = filteredRoutes[foundIndex];
      }

      return { ...baseMenu, routes: filteredRoutes };
   }, [pathname]);

   return {
      menu,
   };
}
