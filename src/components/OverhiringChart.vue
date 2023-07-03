<script setup lang='ts'>
import { DoughnutChart, useDoughnutChart } from "vue-chart-3";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";

Chart.register(...registerables);

const dataValues = ref();
const dataLabels = ref();
const toggleLegend = ref(true);
const { state } = useStore()
const fetchReport = async () => {
  const { data } = await useFetch("/api/departments/overhiring").json()
  dataValues.value = unref(data).map((d: any) => d.hired)
  dataLabels.value = unref(data).map((d: any) => d.department)

}

const refetch = computed(()=>state.refetch)

watch((refetch), async (newRefetch) => {
  if (!newRefetch) return
  await fetchReport()
})

const testData = computed<ChartData<"doughnut">>(() => ({
  labels: dataLabels.value,
  datasets: [
    {
      data: dataValues.value,
      backgroundColor: [
        "#008080",
        "#00ffff",
        "#BFD732"
      ],
    },
  ],
}));

const options = computed<ChartOptions<"doughnut">>(() => ({
  scales: {
    myScale: {
      type: "logarithmic",
      position: toggleLegend.value ? "left" : "right",
    },
  },
  plugins: {
    legend: {
      position: toggleLegend.value ? "top" : "bottom",
    },
    title: {
      display: true,
      text: "Departments Overhiring",
    },
  },
}));

const { doughnutChartProps } = useDoughnutChart({
  chartData: testData,
  options,
});

onMounted(async () => {
  await fetchReport()
})

</script>

<template>
  <div class="container col center">
    <div style="width: 400px">
      <div style="display: flex; justify-content: center">
      </div>
      <DoughnutChart v-bind="doughnutChartProps" />
    </div>
  </div>
</template>

