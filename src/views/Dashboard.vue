<template>
  <div>
    <h1>Dashboard</h1>

    <SalesGraph v-for="sale in db.sales" :key="`${sale.title}`" :sale="sale" />

    <StatisticCard
      v-for="statistic in db.statistics"
      :key="`${statistic.title}`"
      :statistic="statistic"
    />

    <EmployeesTable :employees="db.employees" @select-employee="setEmployee" />

    <EventTimeline :timeline="db.timeline" />

    <v-snackbar v-model="snackbar">
      You have selected {{ selectedEmployee.name }},
      {{ selectedEmployee.title }}
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import EmployeesTable from "../components/EmployeesTable";
import EventTimeline from "../components/EventTimeline";
import SalesGraph from "../components/SalesGraph";
import StatisticCard from "../components/StatisticCard";

import api from "@/api/data";

export default {
  name: "DashboardPage",
  components: {
    EmployeesTable,
    EventTimeline,
    SalesGraph,
    StatisticCard
  },
  data() {
    return {
      db: {
        employees: [],
        sales: [],
        statistics: [],
        timeline: []
      },
      selectedEmployee: {
        name: "",
        title: ""
      },
      snackbar: false
    };
  },
  created() {
    // The ordering of the properties is the same as that given by looping over the properties of the object manually. (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
    const dataKeys = Object.keys(this.db);
    // Order is preserved. (https://stackoverflow.com/questions/28066429/promise-all-order-of-resolved-values)
    Promise.all(dataKeys.map(dataKey => api.fetchData(dataKey)))
      .then(results =>
        results.forEach((result, i) => {
          this.db[dataKeys[i]] = result;
        })
      )
      .catch(err => {
        console.error(`Error processing JSON! ${err.message}`);
      });
  },
  methods: {
    setEmployee(event) {
      this.snackbar = true;
      this.selectedEmployee.name = event.name;
      this.selectedEmployee.title = event.title;
    }
  }
};
</script>
