import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const params = {
    headers: {
      "Cache-Control": "no-cache",
      "User-Agent": "curl/7.83.1",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    },
  };
  const url = "https://shrtn-aueb.onrender.com/api/PG4X8cp";

  const res = http.get(url, params);
  console.log(`Status: ${res.status}`);
  sleep(5);
}
