import { getToken } from "@/lib/token";

const baseUrl = `http://localhost:8081/api/user/`;

async function getHeaders() {
  const headers = new Headers();
  const token = await getToken();

  headers.append(`Content-Type`, `application/json`);
  headers.append("Authorization", `Bearer ${token}`);
  console.log("Headers:", headers);
  return headers;
}
export { getHeaders, baseUrl };
