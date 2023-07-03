---
title: AioFauna
---
<Companylogo url="https://companieslogo.com/img/orig/GLOB-13857c80.png?t=1632767128"/>
<div class="text-center">
  <h1 class="text-primary">Globant Data Engineering</h1>
</div>
<p class="col center text-accent pt-12">1. Upload Employees History Data (employees.csv)</p>
<Upload  url="employees">
<template v-slot="{ data }">
<section class="container col center">
<p> {{ data.name }} </p>
<p> {{ (data.size/1000000).toFixed(2) }} MB </p>
<p> {{ data.contentType }} </p>
<Icon icon="mdi-file" class="x4 text-primary" />
<p> {{ new Date(data.lastModified).toLocaleString() }} </p>
</section>
</template>
</Upload>
<p class="col center text-accent pt-12">2. Update the Report</p>
<QuarterlyChart />
<br/>
<OverhiringChart />
<br/>
<br/>
<footer class="text-center py-12">
  <p class="text-accent">Made with ❤️ by <a href="https://www.linkedin.com/in/obahamondem/" target="_blank">Oscar Bahamonde</a></p>
</footer>