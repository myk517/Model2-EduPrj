import React, { useEffect, useState } from "react";
import PayMethodData from "./PayMethodData";
import styled from "styled-components";
import Select from "../../components/inputs/Select";
import Option from "../../components/inputs/Option";
import BigLabel from "../../components/labels/BigLabel";
import MediumLabel from "../../components/labels/MediumLabel";
import ColumnArticle from "../../components/layouts/ColumnArticle";
import ResponsiveRowArticle from "../../components/layouts/ResponsiveRowArticle";
import RowArticle from "../../components/layouts/RowArticle";
import Span from "../../components/inputs/Span";
import RequestPay from "../../libraries/import/Import";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/Common.css";
import { getApiMemMoney } from "../../api/getApiMemMoney";
import getApiMerchant from "../../api/httpMerchants";
import { getApiGood } from "../../api/getApiGood";
import { getApiGoods } from "../../api/getApiGoods";

const StMoneyPaymentSection = styled.div`
  padding: 70px 20px 70px 20px;
`;

const Payment = (data) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      alert("로그인 먼저 해주세요!");
      navigate("/");
    } else {
      getApiMerchant
        .get("/") //가맹점 리스트 가져오기
        .then((res) => {
          console.log("getApiMerchant success..", res);
          setMerchantList(res.data.data);
        })
        .catch(console.log("getApiMerchant fail..."));

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
  //========================================================================================//

  const [choice_payment_method, setChoicePaymentMethod] = useState("");
  const [merchantList, setMerchantList] = useState([]);
  const [goodsList, setGoodsList] = useState([]);
  const [price, setPrice] = useState("");
  const [Selected, setSelected] = useState(""); //첫 번째 dropdown(가맹점)
  const [Selected2, setSelected2] = useState(""); //두 번째 dropdown(물품번호goodsSn)
  const [payMean, setPayMean] = useState(""); //10:계좌, 11:카드, 12:머니
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
    } else if (choice_payment_method == "money") {
      setPayMean(12);
    }
  };

  useEffect(() => {
    handler_payMean();
  }, [<Option />]);

  const handleSelect = (e) => {
    console.log("handleSelect action... e.target.value  >>> ", e.target.value);
    setSelected(e.target.value);

    //merchantSn where 절에 해당하는 goodsList를 선택하도록 api전송
    getApiGoods(e.target.value)
      .then((res) => {
        //해당 가맹점에 해당하는 물품들만 선택하여 goodsList의 useState에 세팅
        console.log("selectGoodsList API Success..", res.data.data);
        setGoodsList(res.data.data);
      })
      .catch((err) => {
        console.log("select Goods API fail...", err);
      });
  };

  const handleSelect2 = (e) => {
    setSelected2(e.target.value);
    sessionStorage.setItem("goodsSn", e.target.value);

    //위와 마찬가지로 where절 goodsSn에 해당하는 물품만 가져오도록 axios전송
    getApiGood(e.target.value)
      .then((res) => {
        console.log("selectOneProduct API Success..", res);
        sessionStorage.setItem("goodsAmt", res.data.data.goodsAmt);
        setPrice(res.data.data.goodsAmt + res.data.data.goodsShppCost); //물품 선택하는 순간 가격의 useState 변경해준다.
      })
      .catch((err) => {
        console.log("selectOneProduct API fail...", err);
      });
  };

  const replaceWithComma = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const paymentTry = () => {
    return !valueCheck();
  };

  //값 검증
  const valueCheck = () => {
    if (!Selected) {
      alert("가맹점을 선택해 주세요.");
      return false;
    }

    if (!Selected2) {
      alert("구매 물품을 선택해 주세요.");
      return false;
    }

    if (!choice_payment_method) {
      alert("결제수단을 선택해 주세요.");
      return false;
    }
    return true;
  };

  return (
    <Container>
      <StMoneyPaymentSection>
        <ColumnArticle>
          <BigLabel value="머니결제" />
        </ColumnArticle>
        <ColumnArticle>
          {/* {merchantList ? (
              <Map map_coordinate={merchantList.coordinate}></Map> //merchantList.coordinate 변경 필요(위도경도 값 뽑고 split처리, useState 처리 등..)
            ) : (
              <MapNoticeDiv>
                <MapNoticeWord>가맹점을 선택하여 주세요.</MapNoticeWord>
              </MapNoticeDiv>
            )} */}
        </ColumnArticle>
        <ResponsiveRowArticle>
          <RowArticle>
            <MediumLabel style={{ width: 80, flexGrow: 1 }} value="가맹점" />

            <select style={{ width: 160, flexGrow: 2 }} onChange={handleSelect} value={Selected}>
              <option value="">선택</option>

              {merchantList.map((data) => {
                //sessionStorage.setItem("merchantSn1", merchantList[i].merchantSn);
                return (
                  <option value={data.merchantSn} key={data.merchantSn}>
                    {data.merchantNm}
                  </option>
                );
              })}
            </select>
          </RowArticle>
          <RowArticle>
            <MediumLabel style={{ width: 100, flexGrow: 1 }} value="구매물품" />
            <select style={{ width: 160, flexGrow: 2 }} onChange={handleSelect2} value={Selected2}>
              <option value="">선택</option>

              {goodsList.map((data, i) => {
                sessionStorage.setItem("goodsNm", data.goodsNm);
                return <option value={data.goodsSn}>{data.goodsNm}</option>;
              })}
              {/* {choice_merchant_info &&
                  merchantList.map((data, i) => (
                    <Option className={merchantList[i].merchantSn} value={merchantList[i].merchantNm}>
                      {merchantList[i].merchantSn}
                    </Option>
                  ))} */}
            </select>
          </RowArticle>
          <RowArticle>
            <MediumLabel style={{ width: 100, flexGrow: 1 }} value="결제금액(배송비합)" />
            <RowArticle>
              <Span
                style={{
                  textAlign: "right",
                  marginRight: 0,
                }}
                value={price || "0"}
              />
              <Span value="원" />
            </RowArticle>
          </RowArticle>
          <RowArticle>
            <MediumLabel style={{ width: 100, flexGrow: 1 }} value="결제수단" />
            <Select style={{ width: 160, flexGrow: 2 }} value={choice_payment_method} onChange={paymentMethodChange}>
              <Option value="">선택</Option>
              {payment_method.map((e) => (
                <Option key={e.pay_method} value={e.pay_method}>
                  {e.name}
                </Option>
              ))}
            </Select>
          </RowArticle>
          <ColumnArticle>
            <RequestPay
              value="결제하기"
              section="pay"
              price={price}
              goodsSn={Selected2}
              choice_merchant_info={merchantList}
              choice_payment_method={choice_payment_method}
              payMean={payMean}
              onClick={() => paymentTry()}
            />
          </ColumnArticle>
        </ResponsiveRowArticle>
      </StMoneyPaymentSection>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
`;
export default Payment;
