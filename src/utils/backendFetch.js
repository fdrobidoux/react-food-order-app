export async function fetchMeals() {
  return await fetch("http://localhost:3000/meals")
  .then(x => x.json());
}

/**
 * @param {object} orderPayload
 * @returns {number}
 */
export async function createOrder(orderPayload) {
  return await fetch({
    url: "http://localhost:3000/meals",
    json: JSON.stringify(orderPayload)
  }).then(x => x.status);
}