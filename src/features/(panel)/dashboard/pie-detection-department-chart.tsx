// Importações necessárias
import React from 'react';
import ReactApexChart from 'react-apexcharts';

import { ApexOptions } from 'apexcharts';

interface StateChart {
   series: ApexOptions['series'];
   options: ApexOptions;
}
const PieDetectionDepartmentChart = (props: any) => {
   const { data } = props;
   const [state, setState] = React.useState<StateChart>({
      series: data.map((item: { [key: string]: number }) => item.total),
      options: {
         chart: {
            type: 'donut',
         },
         legend: {
            show: false,
         },
         dataLabels: {
            enabled: false,
         },
         plotOptions: {
            pie: {
               donut: {
                  size: '65%',
               },
            },
         },

      },
   });

   return <ReactApexChart options={state.options}
                          width={150}
                          height={150}
                          series={state.series}
                          type="donut"
   />;
};

export default PieDetectionDepartmentChart;
