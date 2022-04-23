import httpUser from "./httpUser";

export async function getApiMemMoney() {
  let memberSn = sessionStorage.getItem("memberSn");
  return httpUser.get("/selectMemMoney/" + memberSn);
}
