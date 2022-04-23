import httpMerchants from "./httpMerchants";

export async function getApiAllGoods() {
  return httpMerchants.get("/goods");
}
