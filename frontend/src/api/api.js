const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/** API class for ShareBandB */

class ShareBAndBApi{

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  static async getListings(search=""){
    if(search) {
      const filteredListings = await this.request("listings/", { search } );
      return filteredListings;
    }

    const listingsData = await this.request("listings/");
    return listingsData.result;
  }

}

export default ShareBAndBApi;