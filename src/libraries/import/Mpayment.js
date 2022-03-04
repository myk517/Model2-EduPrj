import { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Common.css";
import { useNavigate } from "react-router-dom";

const Mpayment = () => {
  let navigate = useNavigate();
  useEffect(() => {
    //결제하기 일 때 : 결제방법이 money 일 때
    if (sessionStorage.getItem("section") == "pay") {
      //결제방법이 money일 때(import로 넘어가지 않는다. )
      if (sessionStorage.getItem("choice_payment_method") == "money") {
        //머니잔액이 상품금액보다 큰지 확인
        if (sessionStorage.getItem("moneyBlce") <= sessionStorage.getItem("price")) {
          alert("머니 잔액이 부족합니다! 카드 결제로 전환됩니다.");
        } else {
          //회원 머니 잔고 차감(update) 및 '거래'이력테이블 추가(insert) api , 결제수단이 money일 때
          let data2 = { memberSn: sessionStorage.getItem("memberSn"), chargeAmt: sessionStorage.getItem("price") };
          axios
            .post("http://localhost:9999/api/v1/user/payment", data2, { headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") } })
            .then((res) => {
              console.log("payment API Success..", res);
              //상품테이블 update(재고-1, 판매수량+1)
              axios
                .get("http://localhost:9999/api/v1/user/updateProductPay?goodsSn=" + sessionStorage.getItem("goodsSn"), {
                  headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") },
                })
                .then((res) => {
                  console.log("updateProductPay API Success..", res);
                  //'구매'이력 테이블 insert
                  let data3 = {
                    member_sn: sessionStorage.getItem("memberSn"),
                    buy_amt: sessionStorage.getItem("price"),
                    goods_amt: sessionStorage.getItem("goodsAmt"),
                    goods_sn: sessionStorage.getItem("goodsSn"),
                  };
                  axios
                    .post("http://localhost:9999/api/v1/user/payHistoryInsert", data3, {
                      headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") },
                    })
                    .then((res) => {
                      console.log("payHistoryInsert API Success..", res);
                      alert("결제가 완료되었습니다!");
                      navigate("../myPage");
                    })
                    .catch((err) => {
                      console.log("payHistoryInsert API fail...", err);
                      alert("결제를 실패했습니다...");
                      navigate("../myPage");
                    });
                })
                .catch((err) => {
                  console.log("updateProductPay API fail...", err);
                  alert("dddd", sessionStorage.getItem("goodsSn"));
                  alert("결제를 실패했습니다...");
                  navigate("../myPage");
                });
            })
            .catch((err) => {
              console.log("payment API fail...", err);
              alert("결제를 실패했습니다...");
              navigate("../myPage");
            });
          return false;
        } //*********결제하기 card일 때 */
      } else if (sessionStorage.getItem("choice_payment_method") == "card") {
        //결제하기 일 때
        //회원 잔고 차감(update) 및 '거래'이력 transferMoney테이블  추가(insert) api, 결제수단이 카드or계좌이체 일 때
        let data2 = { memberSn: sessionStorage.getItem("memberSn"), chargeAmt: sessionStorage.getItem("price"), payMeanCd: sessionStorage.getItem("payMean") };
        axios
          .post("http://localhost:9999/api/v1/user/payment_card", data2, { headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") } })
          .then((res) => {
            console.log("payment_card API Success..", res);
            //상품테이블 update(재고-1, 판매수량+1)
            axios
              .get("http://localhost:9999/api/v1/user/updateProductPay?goodsSn=" + sessionStorage.getItem("goodsSn"), {
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") },
              })
              .then((res) => {
                console.log("updateProductPay API Success..", res);
                //'구매'이력 buyHst테이블 insert
                let data3 = {
                  member_sn: sessionStorage.getItem("memberSn"),
                  buy_amt: sessionStorage.getItem("price"),
                  goods_amt: sessionStorage.getItem("goodsAmt"),
                  goods_sn: sessionStorage.getItem("goodsSn"),
                };
                axios
                  .post("http://localhost:9999/api/v1/user/payHistoryInsert", data3, {
                    headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") },
                  })
                  .then((res) => {
                    console.log("payHistoryInsert API Success..", res);
                  })
                  .catch((err) => {
                    console.log("payHistoryInsert API fail...", err);

                    navigate("../myPage");
                  });
              })
              .catch((err) => {
                console.log("updateProductPay API fail...", err);
                alert("결제를 실패했습니다...");
                navigate("../myPage");
              });
          })
          .catch((err) => {
            console.log("payment_card API fail...", err);
            alert("결제를 실패했습니다...");
            navigate("../myPage");
          });

        navigate("/myPage");

        //return false; //주석처리 하여 카드 결제로 바로 넘어가도록 한다.
      } //End of Moeny Pay
    }
  }, []);
  return <></>;
};

export default Mpayment;
