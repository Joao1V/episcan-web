'use client';

import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import { ApexOptions } from 'apexcharts';
import 'libs/metronic/sass/vendors/plugins/_apexcharts.scss';
import moment from 'moment';

interface StateChart {
   series: ApexOptions['series'];
   options: ApexOptions;
}
export function LineChart(props: any) {
   const { data } = props;
   const [state, setState] = useState<StateChart>({
      series: [
         {
            name: 'Total',
            data: data.map((item: { [key: string]: number }) => item.total),
         },
      ],
      options: {
         chart: {
            type: 'area',
            stacked: false,
            zoom: {
               enabled: false,
            },
            toolbar: {
               show: true,
            },
         },
         dataLabels: {
            enabled: false,
         },
         stroke: {
            curve: 'smooth',
         },
         xaxis: {
            title: {
               text: 'Data',
            },
            categories: data.map((item: { [key: string]: string }) =>
               moment(item.date).format('DD-MM-YYYY'),
            ),
         },
         yaxis: {
            title: {
               text: 'Total',
            },
         },
         tooltip: {
            x: {
               show: true
            }
         },
      },
   });

   return (
      <div>
         <div id="chart">
            <ReactApexChart
               options={state.options}
               series={state.series}
               type="area"
               height={350}
            />
         </div>
      </div>
   );
}
