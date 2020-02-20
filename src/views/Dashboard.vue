<template>
  <v-container>
    <h1>Dashboard</h1>

    <v-row v-if="db.sales">
      <!-- Don't nest content directly into a v-row. That's just for organizational purposes. Put in 'v-col.'-->
      <!-- We want to use 'v-for' to keep creating 'columns.' -->
      <v-col v-for="sale in db.sales" :key="`${sale.title}`" cols="12" md="4">
        <SalesGraph :sale="sale" />
      </v-col>
    </v-row>

    <v-row v-if="db.statistics">
      <v-col
        v-for="statistic in db.statistics"
        :key="`${statistic.title}`"
        cols="12"
        md="6"
        lg="3"
      >
        <StatisticCard :statistic="statistic" />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-if="db.employees" cols="12" md="8">
        <EmployeesTable
          :employees="db.employees"
          @select-employee="setEmployee"
        />
      </v-col>

      <v-col v-if="db.timeline" cols="12" md="4">
        <EventTimeline :timeline="db.timeline" />
      </v-col>
    </v-row>

    <v-row id="below-the-fold" v-intersect="loadMoreContent">
      <v-col v-if="db.employees" cols="12" md="8">
        <EmployeesTable
          :employees="db.employees"
          @select-employee="setEmployee"
        />
      </v-col>

      <v-col v-if="db.timeline" cols="12" md="4">
        <EventTimeline :timeline="db.timeline" />
      </v-col>
    </v-row>

    <v-row v-if="moreContent" id="more-content">
      <v-col>
        <v-skeleton-loader
          ref="skeleton"
          type="table"
          class="mx-auto"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :left="$vuetify.breakpoint.lgAndUp">
      You have selected {{ selectedEmployee.name }},
      {{ selectedEmployee.title }}
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import EmployeesTable from "@/components/EmployeesTable";
import EventTimeline from "@/components/EventTimeline";
import SalesGraph from "@/components/SalesGraph";
import StatisticCard from "@/components/StatisticCard";

import api from "@/api/data";

import NProgress from "nprogress";

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
        employees: null,
        sales: null,
        statistics: null,
        timeline: null
      },
      moreContent: false,
      selectedEmployee: {
        name: "",
        title: ""
      },
      snackbar: false
    };
  },
  created() {
    NProgress.start();
    // The ordering of the properties is the same as that given by looping over the properties of the object manually. (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
    const dataKeys = Object.keys(this.db);
    // Order is preserved. (https://stackoverflow.com/questions/28066429/promise-all-order-of-resolved-values)
    Promise.all(dataKeys.map(dataKey => api.fetchData(dataKey)))
      .then(results => {
        NProgress.done();
        results.forEach((result, i) => {
          this.db[dataKeys[i]] = result;
        });
      })
      .catch(err => {
        NProgress.done();
        console.error(`Error processing JSON! ${err.message}`);
      });
  },
  methods: {
    loadMoreContent(entries) {
      this.moreContent = entries[0].isIntersecting;
    },
    setEmployee(event) {
      this.snackbar = true;
      this.selectedEmployee.name = event.name;
      this.selectedEmployee.title = event.title;
    }
  }
};
</script>
