import { useNavigate } from "react-router";
import Button from "../../components/buttons/Button";
import axios from "axios";
import { browserName, browserVersion } from "react-device-detect";
import { isMobile, isBrowser } from "react-device-detect";

const RequestPay = (data) => {
  const navigate = useNavigate();

  const requestPay = () => {
    sessionStorage.setItem("price", data.price);
    sessionStorage.setItem("choice_payment_method", data.choice_payment_method);
    sessionStorage.setItem("goodsSn", data.goodsSn);
    sessionStorage.setItem("payMean", data.payMean);
    sessionStorage.setItem("section", data.section);
    // sessionStorage.setItem("",);

    //결제하기 일 때
    if (data.section == "pay") {
      //결제방법이 money일 때(import로 넘어가지 않는다. )
      if (data.choice_payment_method == "money") {
        //머니잔액이 상품금액보다 큰지 확인
        if (sessionStorage.getItem("moneyBlce") <= data.price) {
          alert("머니 잔액이 부족합니다! 카드 결제로 전환됩니다.");
        } else {
          //회원 머니 잔고 차감(update) 및 '거래'이력테이블 추가(insert) api , 결제수단이 money일 때
          let data2 = { memberSn: sessionStorage.getItem("memberSn"), chargeAmt: sessionStorage.getItem("price") };
          axios
            .post("http://localhost:9999/api/v1/payment/money", data2, { headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") } })
            .then((res) => {
              console.log("payment API Success..", res);
              //상품테이블 update(재고-1, 판매수량+1)
              axios
                .get("http://localhost:9999/api/v1/payment/updateProductPay?goodsSn=" + sessionStorage.getItem("goodsSn"), {
                  headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") },
                })
                .then((res) => {
                  console.log("updateProductPay API Success..", res);
                  //'구매'이력 테이블 insert
                  let data3 = { member_sn: sessionStorage.getItem("memberSn"), buy_amt: data.price, goods_amt: sessionStorage.getItem("goodsAmt"), goods_sn: data.goodsSn };
                  axios
                    .post("http://localhost:9999/api/v1/payment/history", data3, {
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
        }
      }
      //return false; //주석처리 하여 카드 결제로 바로 넘어가도록 한다.
    } //End of Moeny Pay

    if (data.onClick()) return;

    console.log("RequestPay start");
    var IMP = window.IMP; // 생략 가능
    console.log("IMP : ", IMP);
    IMP.init("imp47449560"); // 예: imp00000000
    console.log("data.choice_payment_method : ", data.choice_payment_method);
    console.log("data.price : ", data.price);
    console.log("data.goodsSn>> ", data.goodsSn);

    //모바일 & 웹 에따라 redirect 분기
    let url = "http://localhost:3000/myPage";
    if (data.section == "pay" && isMobile) {
      url = "http://192.168.8.55:3000/Mpayment";
    } else if (data.section == "charge" && isMobile) {
      url = "http://192.168.8.55:3000/Mcharge";
    } else {
      url = "http://192.168.8.55:3000/loginAlert";
    }

    IMP.request_pay(
      {
        // param

        // pg: "html5_inicis", // 이니시스(웹표준결제) version 1.1.0부터 지원.
        // pg: "nice", // 나이스페이
        // pg: "jtnet", // 제이티넷
        // pg: "uplus", // LG유플러스
        // pg: "danal", // 다날
        // pg: "payco", // 페이코
        // pg: "syrup", // 시럽페이
        // pg: "paypal", // 페이팔
        // pg: "kcp", // KCP
        cid: getCid(data.choice_payment_method),
        pay_method: data.choice_payment_method,
        // pay_method: "card",
        // pay_method: "samsung", //삼성페이
        // pay_method: "card", //신용카드,
        //pay_method: "trans", //실시간계좌이체, 이니시스 가능
        //pay_method: "vbank", //가상계좌,
        // pay_method: "phone", //휴대폰소액결제

        merchant_uid: "merchant_" + new Date().getTime(),
        name: sessionStorage.getItem("goodsNm"),
        amount: data.price,
        buyer_email: sessionStorage.getItem("buyer_email"),
        buyer_name: sessionStorage.getItem("buyer_name"),
        buyer_tel: sessionStorage.getItem("buyer_tel"),
        buyer_addr: sessionStorage.getItem("buyer_addr"),
        buyer_postcode: sessionStorage.getItem("buyer_postcode"),
        //m_redirect_url: "http://192.168.8.55:3000/myPage", //안드로이드는 자신의 ip주소를 사용해야 하기 때문에 localhost:3000/myPage 가 아닌 현재장소의 IP주소 입력함.

        // 모바일 결제시,
        // 결제가 끝나고 랜딩되는 URL을 지정
        // (카카오페이, 페이코, 다날의 경우는 필요없음. PC와 마찬가지로 callback함수로 결과가 떨어짐)

        //***앱에서는 콜백함수가 실행되지 않으므로, m_redirect_url에서작성한다.
        m_redirect_url: url,
      },

      // KG이니시스 테스트모드 MID(상점아이디) : INIpayTest
      // KG이니시스 에스크로 테스트모드 MID(상점아이디) : iniescrow2
      // console.log("data.section>> ", data.section),
      // //충전하기 일 때
      // (rsp) => {
      //   if (data.section == "charge") {
      //     alert("충전 성공하였습니다.");
      //     navigate("../myPage");
      //     let apiData = { memberSn: sessionStorage.getItem("memberSn"), chargeAmt: data.price };
      //     axios
      //       .post("http://localhost:9999/api/v1/user/charge", apiData, { headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") } })
      //       .then((res) => {
      //         console.log("charge API Success..");
      //       })
      //       .catch((err) => {
      //         console.log("charge API fail...", err);
      //       });
      //   }
      // },

      //*** res() 두 개를 사용하면 안 됐던 이유 ? res자체를 두 개를 받을 수가 없는 구조일 가능성이 큼. Import 자체에서.
      //예를들면, 오버라이딩에 매개변수가 1개라서 (rsp)=>{}를 하나만 받을 수 있는데 (rsp)=>{}함수를 한 번 더썼으니 나머지 rsp를 받지 못한 것일 가능성이 높다.
      // by 이정훈 주임님
      (rsp) => {
        console.log("data.section2>> ", data.section);
        //결제하기 일 때
        if (data.section == "pay" && isBrowser) {
          // callback
          if (rsp.success) {
            alert("결제 성공하였습니다.");

            //'거래'이력 transferMoney테이블  추가(insert) api, 결제수단이 카드or계좌이체 일 때
            let data2 = { memberSn: sessionStorage.getItem("memberSn"), chargeAmt: sessionStorage.getItem("price"), payMeanCd: data.payMean };
            axios
              .post("http://localhost:9999/api/v1/payment/cardAccount", data2, { headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") } })
              .then((res) => {
                console.log("cardAccount API Success..", res);
                //상품테이블 update(재고-1, 판매수량+1)
                axios
                  .get("http://localhost:9999/api/v1/payment/updateProductPay?goodsSn=" + sessionStorage.getItem("goodsSn"), {
                    headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") },
                  })
                  .then((res) => {
                    console.log("updateProductPay API Success..", res);
                    //'구매'이력 buyHst테이블 insert
                    let data3 = { member_sn: sessionStorage.getItem("memberSn"), buy_amt: data.price, goods_amt: sessionStorage.getItem("goodsAmt"), goods_sn: data.goodsSn };
                    axios
                      .post("http://localhost:9999/api/v1/payment/history", data3, {
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
                console.log("cardAccount API fail...", err);
                console.log("data.payMeanCd>>", data.payMean);
                alert("결제를 실패했습니다...");
                navigate("../myPage");
              });

            navigate("/myPage");
          } else {
            alert("결제가 취소 되었습니다. ");
          }
          console.log("rsp : ", rsp);

          //충전하기 일 때
        } else if (data.section == "charge" && isBrowser) {
          if (rsp.success) {
            alert("충전 성공하였습니다.");
            let apiData = { memberSn: sessionStorage.getItem("memberSn"), chargeAmt: data.price, payMeanCd: data.payMean };
            axios
              .post("http://localhost:9999/api/v1/user/charge2", apiData, { headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") } })
              .then((res) => {
                console.log("charge API Success..");
              })
              .catch((err) => {
                console.log("charge API fail...", err);
              });
          } else {
            alert("충전이 취소 되었습니다. ");
          }
          console.log("rsp: ", rsp);
        }
      }
    );
  };

  const getCid = (method) => {
    if (method === "kakaopay") {
      return "TC0ONETIME";
    }
    return "";
  };

  return <Button value={data.value} onClick={() => requestPay()} />;
};
export default RequestPay;
