import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const url = "https://shrtn-aueb.onrender.com/api/create";
  const payload = JSON.stringify({
    originalUrl: "https://github.com/dhruvv173/",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  console.log(`Status: ${res.status}`);
  console.log(`Body: ${res.body}`);
}
