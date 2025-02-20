export function CardVerificationStats(props) {
   const { count } = props;
   return (
      <div className="row flex-center gy-5 gx-xl-10 mb-5">
         <div className="col-sm-6 col-xl-2 mb-xl-10">
            <div className="card h-lg-100">
               <div className="card-body d-flex justify-content-between align-items-start flex-column">
                  <div className="m-0">
                     <i className="ki-outline ki-compass fs-2hx text-gray-600" />
                  </div>
                  <div className="d-flex flex-column my-7">
                     <span className="fw-semibold fs-2x text-gray-800 lh-1 ls-n2">{count.verification}</span>
                     <div className="m-0">
                        <span className="fw-semibold fs-6 text-gray-500">Verificações</span>
                     </div>
                  </div>
                  <span className="badge badge-light-success fs-base">
                     <i className="ki-outline ki-arrow-up fs-5 text-success ms-n1" />
                     2.1%
                  </span>
               </div>
            </div>
         </div>
         <div className="col-sm-6 col-xl-2 mb-xl-10">
            <div className="card h-lg-100">
               <div className="card-body d-flex justify-content-between align-items-start flex-column">
                  <div className="m-0">
                     <i className="ki-outline ki-chart-simple fs-2hx text-gray-600" />
                  </div>
                  <div className="d-flex flex-column my-7">
                     <span className="fw-semibold fs-2x text-gray-800 lh-1 ls-n2">{count.daily}</span>
                     <div className="m-0">
                        <span className="fw-semibold fs-6 text-gray-500">Média diária</span>
                     </div>
                  </div>
                  <span className="badge badge-light-success fs-base">
                     <i className="ki-outline ki-arrow-up fs-5 text-success ms-n1" />
                     2.1%
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
}
