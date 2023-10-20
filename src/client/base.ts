import ky from "ky-universal";

export const fetcher = (input: URL | RequestInfo, init?: RequestInit | undefined) =>
  ky(`${process.env.RESOURCE_API_ENDPOINT}/${input}`, init).then((res) => res.json());

export const fetchApi = ky.create({
  prefixUrl: process.env.RESOURCE_COMMON_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchResourceApi = {
  commomApi: ( ky.create({
        prefixUrl: process.env.RESOURCE_COMMON_API_ENDPOINT,
        timeout: 10000,
        throwHttpErrors: false,
        headers: {
          "Content-Type": "application/json",
        },
      })), 
  ghgApi: ( ky.create({
        prefixUrl: process.env.RESOURCE_GHG_API_ENDPOINT,
        headers: {
          "Content-Type": "application/json",
        },
      })), 
};





