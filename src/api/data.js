export default {
  fetchData(type) {
    return fetch(`http://localhost:3000/${type}`)
      .then(results => results.json())
      .catch(err => {
        throw new Error(`Error fetching data! ${err.message}`);
      });
  }
};
