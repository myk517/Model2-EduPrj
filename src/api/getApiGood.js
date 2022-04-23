import httpMerchants from "./httpMerchants";

export async function getApiGood(goodsSn) {
  return httpMerchants.get("/goods/" + goodsSn);
}
