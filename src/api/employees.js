export default {
  getEmployees() {
    return fetch("http://localhost:3000/employees").then(results =>
      results.json()
    );
  }
};
