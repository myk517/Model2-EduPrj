import httpMerchants from "./httpMerchants";

export async function getApiGoods(merchantSn) {
  return httpMerchants.get("/" + merchantSn + "/goods");
}
