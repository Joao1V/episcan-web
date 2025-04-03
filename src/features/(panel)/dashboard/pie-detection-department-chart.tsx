'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import type { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface StateChart {
   series: ApexOptions['series'];
   options: ApexOptions;
}
const PieDetectionDepartmentChart = (props: any) => {
   const { data } = props;
   const [state] = React.useState<StateChart>({
      series: data.map((item: Record<string, string>) => item.total),
      options: {
         labels: data.map((item: Record<string, string>) => item.title),
         chart: {
            type: 'donut',
         },
         legend: {
            position: 'bottom',
         },
         dataLabels: {
            enabled: true,
            formatter: function (val: number, opts: any) {
               return opts.w.config.series[opts.seriesIndex];
            },
            style: {
               fontSize: '14px',
               fontWeight: 'bold',
               colors: ['#fff'],
            },
         },
         plotOptions: {
            pie: {
               donut: {
                  labels: {
                     show: true,
                     total: {
                        show: true,
                        label: 'Total',
                        formatter: function (w: any) {
                           return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                        },
                     },
                  },
               },
            },
         },
      },
   });

   return (
      <ReactApexChart
         options={state.options}
         width={'100%'}
         height={400}
         series={state.series}
         type={'donut'}
      />
   );
};

export { PieDetectionDepartmentChart };
