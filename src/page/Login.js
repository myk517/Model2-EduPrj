import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "../css/LoginBlock.css";
import "../css/Common.css";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [id, setId] = useState();
  const [pw, setPw] = useState();
  const navigate = useNavigate();

  function loginProc(e) {
    //e.preventDefault();
    const data = { id, pw };
    console.log(data);

    axios
      .get("http://localhost:9999/api/v1/auth/token", {
        params: {
          id: id,
          pw: pw,
        },
      })
      .then((response) => {
        alert("성공!");
        // console.log("data.id>> ", data.id);
        // console.log("서버와 통신 성공>> ", response);
        // console.log("토큰 >>", response.data.data);
        sessionStorage.setItem("token", response.data.data);
        let token = sessionStorage.getItem("token");

        //해당id에 해당하는 회원정보 selet 하기
        axios
          .get("http://localhost:9999/api/v1/user/selectMem/" + id, {
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
          })
          .then((res) => {
            console.log("selectMem 성공...");
            sessionStorage.setItem("memberSn", res.data.data.memberSn); //memberSn 값 담기
            sessionStorage.setItem("buyer_email", res.data.data.emailAddr);
            sessionStorage.setItem("buyer_name", res.data.data.membNm);
            sessionStorage.setItem("buyer_tel", res.data.data.mobileNo);
            sessionStorage.setItem("buyer_addr", res.data.data.detailAddr);
            sessionStorage.setItem("buyer_postcode", res.data.data.zipCd);

            //해당 회원의 머니원장 가져오기
            let memberSn = sessionStorage.getItem("memberSn");
            axios //memberSn
              .get("http://localhost:9999/api/v1/user/selectMemMoney/" + memberSn, {
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
              })
              .then((res) => {
                console.log("selectMemMoney API success..");
                sessionStorage.setItem("moneyBlce", res.data.data.moneyBlce);
              })
              .catch((err) => {
                console.log("selectMemMoney Fail...", err);
              });

            navigate("loginAlert");
          })
          .catch((err) => {
            console.log("selectMem 실패...");
            console.log(err);
          });
      })
      .catch((error) => {
        alert("실패...");
        console.log("error임", error);
      });
  }

  function chkId(e) {
    setId(e.target.value);
    console.log("e.target.value>>", e.target.value);
  }

  function chkPw(e) {
    setPw(e.target.value);
    console.log("e.target.value>>", e.target.value);
  }

  //엔터키
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      loginProc();
    }
  };

  return (
    <>
      <Container>
        <div className="globalBox">
          <br />
          <div className="login-block">
            <h1 style={{ color: " #ef4746", textAlign: "center" }}>E4. Pay Service</h1>
            <h2 style={{ fontSize: "small", textAlign: "center" }}>서비스 이용을 위해서는 로그인이 필요합니다.</h2>
          </div>
          <div style={{ textAlign: "center", marginTop: "5%" }}>
            <div id="idBox">
              <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">ID를 입력해주세요</InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                  value={id}
                  onChange={chkId}
                />
              </FormControl>
            </div>
            <div id="pwBox">
              <FormControl variant="standard" style={{ marginTop: "5%" }}>
                <InputLabel htmlFor="input-with-icon-adornment">PW를 입력해주세요</InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                  type="password"
                  value={pw}
                  onChange={chkPw}
                  onKeyPress={handleKeyPress}
                />
              </FormControl>
            </div>
            <div style={{ marginTop: "5%" }}>
              <button className="loginButton" onClick={loginProc}>
                로그인
              </button>
            </div>
            <div>
              <button
                className="joinButton"
                onClick={() => {
                  navigate("/join");
                }}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
`;

export default Login;
