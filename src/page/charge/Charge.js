import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "../../css/Common.css";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import RequestPay from "../../libraries/import/Import";
import Select from "../../components/inputs/Select";
import Option from "../../components/inputs/Option";
import PayMethodData from "./components/ChargePayMethodData";
import { getApiMemMoney } from "../../api/getApiMemMoney";

const Charge = () => {
  const [money_blce, setMoney_blce] = useState(Number(sessionStorage.getItem("moneyBlce")));
  const [money_charge, setMoneyCharge] = useState("");
  const [money_expect, setMoneyExpect] = useState(Number(money_blce + money_charge));
  const [choice_payment_method, setChoicePaymentMethod] = useState("");
  const [payMean, setPayMean] = useState(""); //10:계좌, 11:카드, 12:머니,
  const [payment_method, setPaymentMethod] = useState(PayMethodData);

  //결제수단
  const paymentMethodChange = (value) => {
    if (value) {
      setChoicePaymentMethod(value);
    } else {
      setChoicePaymentMethod("");
    }
  };

  const handler_payMean = () => {
    if (choice_payment_method == "card") {
      setPayMean(11);
    } else if (choice_payment_method == "trans") {
      setPayMean(10);
    }
  };

  const navigate = useNavigate();
  //const newData = JSON.parse(JSON.stringify(data)); //json data를 깊은 복사하기.

  //천단위 콤마 함수
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (token == null) {
      alert("로그인 먼저 해주세요!");
      navigate("/");
    } else {
      //해당 회원의 머니원장 가져오기
      getApiMemMoney()
        .then((res) => {
          console.log("selectMemMoney API success..");
          sessionStorage.setItem("moneyBlce", res.data.data.moneyBlce);
        })
        .catch((err) => {
          console.log("selectMemMoney Fail...", err);
        });
    }
  }, []);

  useEffect(() => {
    setMoneyExpect(money_blce + money_charge);
    handler_payMean();
  }, [<Option />]);

  const handler_money_charge = (e) => {
    setMoneyCharge(e.target.value);
  };

  //하위 컴포넌트(Charge_table)에서 쓰인다.
  // const funcCharge = () => {
  //   let data = { memberSn: sessionStorage.getItem("memberSn"), chargeAmt: money_charge, payMeanCd: payMean };
  //   axios
  //     .post("http://localhost:9999/api/v1/user/charge2", data, { headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") } })
  //     .then((res) => {
  //       console.log("funcCharge Success..");
  //       let data2 = { chargeAmt: money_charge };
  //       axios
  //         .put("http://localhost:9999/api/v1/user/charge/memMoney", data2)
  //         .then(() => {
  //           alert("충전이 완료되었습니다!");
  //           navigate("myPage");
  //         })
  //         .catch((err) => {
  //           console.log("charge/memMoney API fail... ", err);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log("charge2 API fail... ", err);
  //     });
  // };

  const paymentTry = () => {
    if (!money_charge) {
      alert("충전액을 입력해주세요!");
      return true;
    }
  };
  //retur false로 작성하면  '충전액 입력해주세요' alert 후에
  // '결제가 취소되었습니다' alert창도 함께 뜬다. true로 해줘야 한다. 왜?
  return (
    <>
      <div id="container">
        <div id="titleBox">머니 충전</div>

        <InnerBox>
          <TextBox>
            <TextField label="머니잔액" variant="standard" color="warning" value={numberWithCommas(money_blce)} readOnly />
          </TextBox>
          <TextBox>
            <TextField label="충전액" variant="standard" color="warning" onChange={handler_money_charge} focused />
          </TextBox>
          <TextBox>
            <TextField label="충전예상액" variant="standard" color="warning" value={numberWithCommas(Number(money_blce) + Number(money_charge))} readOnly />
          </TextBox>
          <div style={{ width: "70%", textAlign: "center", marginLeft: "15%" }}>
            <Select style={{ width: 160 }} value={choice_payment_method} onChange={paymentMethodChange}>
              <Option value="">결제수단 선택</Option>
              {payment_method.map((e) => (
                <Option key={e.pay_method} value={e.pay_method}>
                  {e.name}
                </Option>
              ))}
            </Select>
            {/* <Charge_table data={data} money_expect={money_expect} funcCharge={handler_money_charge} /> */}
            {/* <Button variant="danger" onClick={funcCharge}>
            충전하기
          </Button> */}
            <RequestPay value="충전하기" section="charge" price={money_charge} payMean={payMean} choice_payment_method={choice_payment_method} onClick={() => paymentTry()} />
          </div>
        </InnerBox>
      </div>
    </>
  );
};;

const InnerBox = styled.div`
  border: 1px;
  width: 70%;
  margin: auto;
  padding: 10%;
`;

const TextBox = styled.div`
  border: 1px;
  width: 60%;
  height: 10%;
  margin-left: 30%;
  margin-right: 20%;
  margin-top: 3%;
  margin-bottom: 3%;
  padding: 3%;
`;

export default Charge;
