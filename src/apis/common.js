// import request from "../utils/request";
import axios from "axios";

export function handleRandomPoetryRequest() {
  return axios.get("/v2/?c=d&c=i&encode=json&lang=cn")
}