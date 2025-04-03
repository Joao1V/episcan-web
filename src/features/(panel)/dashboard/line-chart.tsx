'use client';

import { useState } from 'react';

import { ApexOptions } from 'apexcharts';
import 'libs/metronic/sass/vendors/plugins/_apexcharts.scss';
import moment from 'moment';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface StateChart {
   series: ApexOptions['series'];
   options: ApexOptions;
}
export function LineChart(props: any) {
   const { data } = props;

   const [state] = useState<StateChart>({
      series: Object.keys(data.series)
         .sort()
         .map((key) => ({
            name: key,
            data: data.series[key],
         })),
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
            categories: data.dates.map((date: []) => moment(date).format('DD-MM')),
         },
         yaxis: {
            title: {
               text: 'Total',
            },
         },
         tooltip: {
            x: {
               show: true,
            },
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
