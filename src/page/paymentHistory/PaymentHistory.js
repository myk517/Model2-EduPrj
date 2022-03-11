import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import "../../css/Common.css";

const PaymentHistory = () => {
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState();
  const [pageIndex, setPageIndex] = useState(0);
  const [payMean, setPayMean] = useState(""); //10:계좌, 11:카드, 12:머니

  let memberSn = sessionStorage.getItem("memberSn");

  const startDateChange = (date) => {
    if (date.target.value > end_date) {
      alert("시작일자가 더 큽니다");
    } else {
      setStartDate(date.target.value);
    }
  };
  const endDateChange = (date) => {
    if (start_date > date.target.value) {
      alert("종료일자가 더 큽니다");
    } else {
      setEndDate(date.target.value);
    }
  };

  //결제수단
  const handler_payMean = (e) => {
    setPayMean(e.target.value);
  };

  //결제수단
  // const paymentMethodChange = (value) => {
  //   if (value) {
  //     setChoicePaymentMethod(value);
  //   } else {
  //     setChoicePaymentMethod("");
  //   }
  // };

  //검색
  const searchFunc = () => {
    let data = { member_sn: memberSn, start_date: start_date, end_date: end_date, offset: pageIndex, pay_mean_cd: payMean };
    axios
      .post("http://localhost:9999/api/v1/history/list", data, {
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log("history list API success...", res);
        setHistoryList(res.data.list);
        setAllRow(Math.ceil(res.data.count.count / 10)); //왜 res.data.count가 아니라 res.data.count.count로 들어감?
      })
      .catch((err) => {
        console.log("history list API fail...", err);
      });
  };

  let navigate = useNavigate();
  let [historyList, setHistoryList] = useState([]);
  let [allRow, setAllRow] = useState("");

  //천단위 콤마 함수
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token == null) {
      alert("로그인 먼저 해주세요!");
      navigate("/");
    }
  });

  const handlerPageIndex = (e) => {
    setPageIndex((e.target.value - 1) * 10);
  };

  // const myPageAPI = (e) => {
  //   console.log("pageIndex>>", pageIndex);

  //   if (sessionStorage.getItem("token") != null) {
  //     //검색조건이 없을 때
  //     if (start_date === null || start_date === "" || end_date === null || end_date === "") {
  //       axios
  //         .get("http://localhost:9999/api/v1/user/myPageList", {
  //           params: {
  //             member_sn: memberSn,
  //             offset: pageIndex,
  //           },
  //           headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
  //         })
  //         .then((res) => {
  //           console.log("myPageList API success.."); //res.data[0].거래금액, res.data[0].rownum
  //           // setAllData(res.data.rownum);

  //           setHistoryList(res.data);
  //           //전체 데이터를 구하는 axios를 보내고 allRow에 set해준다.
  //           axios
  //             .get("http://localhost:9999/api/v1/user/allRow?member_sn=" + memberSn, {
  //               headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
  //             })
  //             .then((res) => {
  //               console.log("allRow API success..");
  //               setAllRow(Math.ceil(res.data.length / 10)); //10개씩 출력할 것이니까 10로 나눈후 올림해준 만큼 pageindex 노출.

  //               setAllData(res.data.length);
  //             })
  //             .catch((err) => {
  //               console.log("allRow API fail...", err);
  //             });
  //         })
  //         .catch((err) => {
  //           console.log("myPageList Fail...", err);
  //         });
  //     } else {
  //       //검색 조건이 있을 때
  //       searchFunc();
  //     }
  //   } //End of session if문
  // };

  useEffect(() => {
    searchFunc();
  }, [pageIndex]);

  return (
    <>
      <Container>
        <TitleBox>거래내역</TitleBox>
        거래기간
        <input type="date" className="date1" value={start_date} onChange={startDateChange} />
        ~ <input type="date" className="date2" value={end_date} onChange={endDateChange} />
        결제수단
        <select onChange={handler_payMean}>
          <option value="">선택</option>
          <option value="11">카드</option>
          <option value="10">계좌</option>
          <option value="12">머니</option>
        </select>
        <button type="submit" class="btn btn-secondary" style={{ marginLeft: "20px" }} onClick={searchFunc}>
          조회
        </button>
        <Table striped bordered hover style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>일자</th>
              <th>처리구분</th>
              <th>결제수단</th>
              <th>상품명</th>
              <th>가맹점명</th>
              <th>거래금액</th>
            </tr>
          </thead>
          {historyList.map((data, i) => {
            return (
              <tbody>
                <tr>
                  <td>{data.rownum}</td>
                  <td>{data.거래일시}</td>
                  <td>{data.처리구분 === 9 ? "구매" : data.처리구분 === 7 ? "충전" : "환불"}</td>
                  {data.결제수단 === 11 ? <td>카드</td> : data.결제수단 === 10 ? <td>계좌</td> : <td>머니</td>}

                  <td>{data.상품명}</td>
                  <td>{data.가맹점명}</td>
                  <td>{numberWithCommas(data.거래금액)}원</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
        <PageBox>
          {[...Array(allRow)].map((n, index) => {
            return (
              <button value={index + 1} onClick={handlerPageIndex} className="page" style={{ border: "0px", marginRight: "10px", backgroundColor: "transparent" }}>
                {index + 1}{" "}
              </button>
            );
          })}
        </PageBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
`;

const TitleBox = styled.div`
   {
    font-size: 30px;
    left: 50%;
    top: 50px;
    width: 80%;
    margin: auto;
    text-align: center;
    padding-top: 30px;
    margin-bottom: 40px;
  }
`;

const PageBox = styled.div`
   {
    font-size: 20px;
    left: 50%;
    top: 50px;
    width: 80%;
    margin: auto;
    text-align: center;
    padding-top: 30px;
    margin-bottom: 40px;
  }
`;
export default PaymentHistory;
