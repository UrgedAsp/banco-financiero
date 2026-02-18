import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BANK_API_URL;

export const bankApi = axios.create({
  baseURL: BASE_URL,
});
