import axios from "axios";
import { JSDOM } from "jsdom";

const BASE_URL = `http://127.0.0.1:4000/docs/cloudAdmin/news/en/`;

const getUrl: string = BASE_URL;
const { data } = await axios.get(getUrl, {
  headers: {
    Accept: "< get the headers from network tab >",
    Host: `http://127.0.0.1:4000`,
    "User-Agent": "< get the headers from network tab >",
  },
});

const dom: JSDOM = new JSDOM(data);
const content = dom.window.document.querySelectorAll("RH-V-2-1");

const text = content.textContent;
console.log(text);
