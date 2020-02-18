<template>
  <div>
    <h1>Dashboard</h1>
    <v-data-table
      :headers="headers"
      :items="employees"
      :items-per-page="5"
      class="elevation-1"
      @click:row="selectRow"
      v-if="employees"
      multi-sort
    ></v-data-table>
    <v-snackbar v-model="snackbar">
      You have selected {{ currentRow }}
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import api from "@/api/employees";

export default {
  data() {
    return {
      headers: [
        {
          text: "Employee ID",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "Name", value: "name" },
        { text: "Title", value: "title" },
        { text: "Salary", value: "salary" }
      ],
      employees: null,
      snackbar: false,
      currentRow: ""
    };
  },
  created() {
    api.getEmployees().then(employees => {
      this.employees = employees;
    });
  },
  methods: {
    selectRow(row) {
      this.currentRow = `${row.title} ${row.name}`;
      this.snackbar = true;
    }
  }
};
</script>
