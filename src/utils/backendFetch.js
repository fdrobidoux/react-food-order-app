const baseUrl = 'http://localhost:3000';

export async function getMeals() {
  return await fetch(baseUrl + "/meals")
  .then(x => x.json());
}

/**
 * @param {object} orderPayload
 * @returns {Response}
 */
export async function createOrder(orderPayload) {
  const response = await fetch(baseUrl + "/orders", {
    method: 'POST',
    body: JSON.stringify(orderPayload),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const json = await response.json();

  return {
    ...response,
    ok: response.ok,
    json: json
  };
}