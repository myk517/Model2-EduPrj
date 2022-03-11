import { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Common.css";
import { useNavigate } from "react-router-dom";

const Mcharge = () => {
  useEffect(() => {
    let apiData = { memberSn: sessionStorage.getItem("memberSn"), chargeAmt: sessionStorage.getItem("price"), payMeanCd: sessionStorage.getItem("payMean") };
    axios
      .post("http://localhost:9999/api/v1/user/charge2", apiData, { headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") } })
      .then((res) => {
        console.log("charge API Success..");
      })
      .catch((err) => {
        console.log("charge API fail...", err);
      });
  }, []);
  return <></>;
};

export default Mcharge;
