<script setup lang='ts'>
import { DoughnutChart, useDoughnutChart } from "vue-chart-3";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";

const { state } = useStore()

Chart.register(...registerables);

const dataValues = ref();
const toggleLegend = ref(true);
const refresh = () => {
  if (!state.refetch) {
    state.refetch = true
  }
  state.refetch = !state.refetch
  state.refetch = true
}
const refetch = computed(() => state.refetch)

watch((refetch), async (newRefetch) => {
  if (!newRefetch) return
  await fetchReport()
})


const fetchReport = async () => {
  const { data } = await useFetch("/api/employees/quarterly").json()
  dataValues.value = unref(data).map((d: any) => {
    return {
      "Q1": d.Q1,
      "Q2": d.Q2,
      "Q3": d.Q3,
      "Q4": d.Q4,
    }
  }).reduce((acc: any, curr: any) => {
    return {
      "Q1": acc.Q1 + curr.Q1,
      "Q2": acc.Q2 + curr.Q2,
      "Q3": acc.Q3 + curr.Q3,
      "Q4": acc.Q4 + curr.Q4,
    }
  })
  refresh()
}

const dataPoints = computed(() => {
  if (!unref(dataValues)) return []
  return Object.keys(unref(dataValues)).map((key) => {
    return unref(dataValues)[key]
  })
})

const testData = computed<ChartData<"doughnut">>(() => ({
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      data: dataPoints.value,
      backgroundColor: [
        "#008080",
        "#00ffff",
        "#BFD732",
        "#00FF00",
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
      text: "Employees Hired Quarterly",
    },
  },
}));

const { doughnutChartProps } = useDoughnutChart({
  chartData: testData,
  options,
});

onMounted(async() => {
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

