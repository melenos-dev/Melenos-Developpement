import { useState, useEffect } from "react";

export function useFetch(apiPath, formData = null) {
  const [fetchResponse, setFetchResponse] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchData(apiPath, formData) {
    let method = formData === null ? "get" : "post";
    if (!apiPath) return;
    setLoading(true);

    try {
      let xsrfToken = localStorage.getItem("xsrfToken");
      if (!xsrfToken) {
        /* Traitement dans le cas où le token CSRF n'existe dans le localStorage */
      }
      xsrfToken = JSON.parse(xsrfToken);

      const response = await fetch(process.env.REACT_APP_BACK_URL + apiPath, {
        method: method,
        mode: "cors",
        credentials: "include",
        headers: {
          "x-xsrf-token": xsrfToken,
        },
        body: formData,
      });

      const fetchResponse = await response.json();

      setFetchResponse(fetchResponse);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(apiPath, formData);
  }, [apiPath, formData]);

  return [{ isLoading, fetchResponse, error }, fetchData];
}
