import type { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Câmeras',
};
export default async function Layout(props: any) {
   return props.children;
}
