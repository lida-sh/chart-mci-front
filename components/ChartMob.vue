<template>
  <div ref="chartContainer" class="lg:px-10 px-4 py-4 lg:py-10"
    :class="{'min-h-[600px] w-[20rem]': style == 'architec', 'w-full min-h-[80rem]': style == 'process'}">
    <Bar v-if="showChart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ChartType } from "~/types"
import { useMediaQuery } from '@vueuse/core'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

import { Bar } from 'vue-chartjs'
import { useIntersectionObserver } from '@vueuse/core'
const showChart = ref(false)
const chartContainer = ref(null)

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
// onMounted(()=>{
//     if (myChart.value) {
//     chartInstance = new Chart(myChart.value, {
//     type: 'bar',
//     data: {
//       labels: ['معاونت شبکه', 'تنظیم مقررات', 'معاونت تجاری و خدمات مشتریان', 'معاونت راهبرد و توسعه کسب و کار', 'معاونت مالی', 'معاونت زنجیره تامین'],
//       datasets: [{
//         label: '# ارزیابی',
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });
//  }

// })

const props = defineProps<{ data: number[], labels: string[], style: ChartType }>()
const barThick = computed(() => {
  if (props.style == 'architec') {
    return 20
  } else if (props.style == 'process') {
    return 10
  }
})
const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: 'نمره از 100',
      font: {
        size: 10,
        family: 'siteFont', // یا هر فونت دلخواه
        weight: 'bold',
      },
      data: props.data,
      backgroundColor: '#4749e3',
      barThickness: barThick.value
    }
  ]
}



const chartOptions = computed(()=>({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          size: 13,
          family: 'siteFont', // یا هر فونت دلخواه
          weight: 'bold',
        },
      },
    },
    title: {
      display: true,
      text: 'نمودار ارزیابی فرایندی معاونت های ستادی ',
      font: {
        size: 18,
        family: 'siteFont', // یا هر فونت دلخواه
        weight: 'bold',
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0,0,0,0.7)',  // رنگ پس‌زمینه تولتیپ
      titleFont: {
        family: 'siteFont',
        size: 14,
        weight: 'bold',
      },
      bodyFont: {
        family: 'siteFont',
        size: 12,
        weight: 'normal',
      },
      footerFont: {
        family: 'siteFont',
        size: 10,
        weight: 'normal',
      },
      titleColor: '#fff',
      bodyColor: '#fff',
      footerColor: '#ddd',
    },
  },
  maintainAspectRatio: false,
  indexAxis: 'y',
  animation: {
    duration: 300, // مدت زمان انیمیشن به میلی‌ثانیه (اینجا: ۱ ثانیه)
    easing: 'easeOutQuart',
    delay: (context) => {
      const index = context.dataIndex
      const datasetIndex = context.datasetIndex
      return index * 50 // هر میله با فاصله 200ms ظاهر بشه

    },
  },
  scales: {
    x: {

      ticks: {
        maxRotation: 0,  // ❗️جلوگیری از چرخش برچسب‌ها
        minRotation: 55,
        font: {
          family: 'siteFont', // فونت دلخواه
          size: 12,            // اندازه فونت
          weight: 'bold',    // ضخامت
        },
      },

    },
    y: {
      beginAtZero: true,
      max: 100,  // <-- اینجا مقدار max رو بذار
      ticks: {
        font: {
          family: 'siteFont',
          size: 12,
          weight: 'bold',
        },
      },
    },
  },
}))

useIntersectionObserver(chartContainer, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    showChart.value = true
  }
}, {
  threshold: 0.3,
})

</script>

<style scoped></style>