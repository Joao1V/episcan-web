import Image from 'next/image';
import Link from 'next/link';

import wrong from '@images/wrong.svg';
import { KTIcon } from 'kt-icon';

export const metadata = {
   title: '404 - Page not found',
   description: 'A página que você procura não existe.',
};
export default function NotFound() {
   const styleText = { color: '#b6c2cf' };
   return (
      <div className={'d-flex flex-center'} style={{ background: '#1d2125', height: '100%' }}>
         <div className={'text-center'}>
            <Image src={wrong} alt="not-found" className={'mb-8'}/>
            <h2 style={styleText}>Página não encotrada</h2>
            <p style={styleText}>Não foi possível encontrar o recurso solicitado</p>
            <Link href="/" className={'link-primary d-flex flex-center fs-6'}>
               <KTIcon name={'arrow-left'} className={'text-primary fs-5'}/> Retornar a home
            </Link>
         </div>
      </div>
   );
}
