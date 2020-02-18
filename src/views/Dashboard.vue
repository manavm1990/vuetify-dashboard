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
    Object.keys(this.db).map(dataKey => {
      api
        .fetchData(dataKey)
        .then(data => {
          this.db[dataKey] = data;
        })
        .catch(err => {
          console.error(`Error parsing JSON! ${err}`);
        });
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
