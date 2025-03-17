import { KTIcon } from 'kt-icon';

export function CardVerificationStats(props) {
   const { stats = [] } = props;

   return (
      <div className={'row'}>
         {stats.map((item, index) => (
            <div key={index} className={'col'}>
               <div className="card  mh-225px h-100">
                  <div className="card-body d-flex justify-content-between align-items-start flex-column">
                     <div className="m-0">
                        <KTIcon name={item.icon} className={'fs-2hx text-gray-600'} type={'solid'} />
                     </div>
                     <div className="d-flex flex-column my-7">
                        <span className="fw-semibold fs-1 mb-2 text-gray-800 lh-1 mb-2 ls-n2">
                           {item.value}
                        </span>
                        <div className="m-0">
                           <span className="fw-semibold fs-6 text-gray-500">{item.label}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}
