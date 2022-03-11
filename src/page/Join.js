import { useState } from "react";
import axios from "axios";
import "../css/Common.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

const Join = () => {
  const [id, setId] = useState();
  const [pw, setPw] = useState();
  const [pwChk, setPwChk] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [detailAddr, setDetailAddr] = useState();
  const [cdd, setCdd] = useState();
  const [certif, setCertif] = useState();

  const [idCheck, setIdCheck] = useState("ID입력 후 중복확인을 눌러주세요.");
  const [idchkBoolean, setIdchkBoolean] = useState(false);
  const [idColor, setIdColor] = useState("black");
  const [pwColor, setPwColor] = useState("black");
  const [pwchkBoolean, setPwchkBoolean] = useState(false);
  const [pwCheck_chk, setPwCheck_chk] = useState("비밀번호를 한 번 더 입력해주세요.");
  const [certifchkBoolean, setCertifchkBoolean] = useState(false);
  const [isOpenPost, setIsOpenPost] = useState(false); //우편번호API

  const navigate = useNavigate();

  const funcIdChk = () => {
    axios
      .get("http://localhost:9999/api/v1/auth/selectMem/?memberId=" + sessionStorage.getItem("idChk"))
      .then((res) => {
        console.log("idChk Api Succeess... ", res);
        if (res.data.data == null) {
          setIdCheck("사용가능한 아이디 입니다.");
          setIdColor("blue");
          setIdchkBoolean(true);
        } else {
          setIdCheck("사용 불가능한 아이디 입니다.");

          setIdColor("red");
          setIdchkBoolean(false);
          return;
        }
      })
      .catch((err) => {
        console.log("idChk API Fail...", err);
      });
    console.log("id>> ", id);
  };

  const funcPwChk = () => {
    if (pw !== pwChk) {
      setPwCheck_chk("비밀번호를 다시 확인해주세요!");
      setPwchkBoolean(false);
      setPwColor("red");
    } else {
      setPwCheck_chk("비밀번호가 확인 되었습니다.");
      setPwchkBoolean(true);
      setPwColor("blue");
    }
  };

  const sendSmsFunc = () => {
    console.log("ddd");
    console.log("phn >> ", phone);
    axios
      .get("http://localhost:9999/api/v1/auth/sendSms?phn=" + phone)
      .then((res) => {
        console.log("sendSms API succuess...", res);
        sessionStorage.setItem("certif", res.data);
      })
      .catch((err) => {
        console.log("sendSms API fail...", err);
      });
  };

  const handleCertif = (e) => {
    setCertif(e.target.value);
    console.log("handleCertif>>", e.target.value, " >> ", certif);
  };

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data) => {
    let address = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr += extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      address += extraAddr !== "" ? ` (${extraAddr})` : "";
    }
    setCdd(data.zonecode);
    setAddress(address);
    setIsOpenPost(false);
  };

  const postCodeStyle = {
    display: "block",
    position: "relative",
    top: "0%",
    width: "400px",
    height: "400px",
    padding: "7px",
  };

  const sendCertific = () => {
    if (certif === sessionStorage.getItem("certif")) {
      setCertifchkBoolean(true);
      alert("확인되었습니다!");
    } else {
      alert("인증번호를 다시 확인해주세요!");
    }
  };

  const handleId = (e) => {
    setId(e.target.value);
    sessionStorage.setItem("idChk", e.target.value);
  };
  const handlePw = (e) => {
    setPw(e.target.value);
  };
  const handlePwChk = (e) => {
    setPwChk(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePhone = (e) => {
    //setPhone(e.target.value);
    let value = e.target.value;
    setPhone(value.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")); //정규식
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleDetailAddr = (e) => {
    setDetailAddr(e.target.value);
  };

  //공백 검증
  const chkNull = () => {
    if (id == null) {
      alert("id를입력해주세요");
      return false;
    } else if (pw == null) {
      alert("pw를 입력해주세요");
      return false;
    } else if (phone == null) {
      alert("phone을 입력해주세요");
      return false;
    } else return true;
  };

  const joinProc = () => {
    //값 검증
    if (!idchkBoolean) {
      alert("아이디 중복확인을 해주세요");
      return;
    }
    if (!pwchkBoolean) {
      alert("비밀번호 확인을 다시 해주세요");
      return;
    }
    if (!certifchkBoolean) {
      alert("문자 인증을 해주세요");
      return;
    }
    chkNull();
    let data = { membId: id, membPw: pw, membNm: name, mobileNo: phone, emailAddr: email, zipAddr: address, zipCd: cdd, detailAddr: detailAddr };
    axios
      .post("http://localhost:9999/api/v1/auth/userJoin", data)
      .then((response) => {
        console.log("response >> ", response);
        alert("가입 되었습니다!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <section className="page-section text-white" style={{ marginTop: "10%" }}>
        <H2>MEMBER JOIN</H2>
        <div className="container px-4 px-lg-5 text-center" style={{ marginLeft: "5%", width: "90%", height: "10%", border: "solid" }}>
          <div style={{ margin: "0 auto" }}>
            <table className="table" style={{ textAlign: "center", width: "90%", margin: "0 auto" }}>
              <tr>
                <th style={{ width: "25%" }}>* ID</th>
                <td>
                  <div className="input-group mb-3">
                    <input style={{ width: "70%" }} type="text" className="form-control" id="memb_id" name="memb_id" value={id} onChange={handleId} required />
                    <button className="btn btn-primary" type="button" id="registerChk" onClick={() => funcIdChk()}>
                      중복확인
                    </button>
                  </div>
                  <p id="target" style={{ color: idColor }}>
                    {idCheck}
                  </p>
                </td>
              </tr>
              <tr>
                <th>* PASSWORD</th>
                <td>
                  <div className="form-group">
                    <input type="password" className="form-control" id="pwd" name="memb_pw" placeholder="Password" onChange={handlePw} required />
                  </div>
                </td>
              </tr>
              <tr>
                <th>* PWDCheck</th>
                <td>
                  <div className="input-group mb-3">
                    <input style={{ width: "70%" }} type="password" className="form-control" id="memb_id" name="memb_id" value={pwChk} placeholder="PW Check" onChange={handlePwChk} required />
                    <button className="btn btn-primary" type="button" id="registerChk" onClick={() => funcPwChk()}>
                      비밀번호 확인
                    </button>
                  </div>
                  <p id="target" style={{ color: pwColor }}>
                    {pwCheck_chk}
                  </p>
                </td>
              </tr>
              <tr>
                <th>Name</th>
                <td>
                  <div className="form-group">
                    <input type="text" className="form-control" id="name" name="memb_nm" placeholder="Name" style={{ width: "70%" }} onChange={handleName} required />
                  </div>
                </td>
              </tr>
              <tr>
                <th>* Phone</th>
                <td>
                  <div className="input-group mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="ex)010-1234-1234"
                      style={{ width: "70%" }}
                      id="phone"
                      name="mobile_no"
                      pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                      value={phone}
                      onChange={handlePhone}
                      required
                    />
                    <button className="btn btn-primary" type="button" id="registerChk" onClick={() => sendSmsFunc()}>
                      인증번호 보내기
                    </button>
                  </div>
                  <div className="input-group mb-3">
                    <input type="number" value={certif} className="form-control" placeholder="인증번호입력" style={{ width: "70%" }} onChange={handleCertif} required />
                    <button className="btn btn-primary" type="button" id="registerChk" onClick={sendCertific}>
                      인증번호 확인
                    </button>
                  </div>

                  <div style={{ display: "none" }} id="target1"></div>
                </td>
              </tr>
              <tr>
                <th>E-Mail</th>
                <td>
                  <div className="input-group mb-3">
                    <input type="email" className="form-control" placeholder="ex)www@www.com" id="emaill" name="email_addr" style={{ width: "70%" }} onChange={handleEmail} required />
                  </div>
                  <div style={{ display: "none" }} id="target1"></div>
                </td>
              </tr>
              <tr>
                <th style={{ width: "20%" }}>Address</th>

                <td>
                  <div className="input-group mb-3">
                    <input type="number" className="form-control" id="cdd" placeholder="ex)08593" value={cdd} style={{ width: "70%" }} required />
                    <button className="btn btn-primary" type="button" id="registerChk" onClick={onChangeOpenPost}>
                      우편번호 입력
                    </button>
                    {isOpenPost ? <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} /> : null}
                  </div>

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" id="address" value={address} placeholder="ex)서울시 강남구 테헤란로" style={{ width: "70%" }} onChange={handleAddress} required />
                  </div>

                  <td>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" id="address" placeholder="ex)동성빌딩 15층" style={{ width: "70%" }} onChange={handleDetailAddr} required />
                    </div>
                  </td>
                </td>
              </tr>
            </table>
            <br /> <br /> <br />
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <input
                className="btn btn-primary btn-xl"
                style={{ borderRadius: "10px", border: "none", padding: "10px", width: "70%", fontSize: "18px", backgroundColor: "#ef4746" }}
                onClick={() => {
                  joinProc();
                }}
                id="joinSubmit"
                value="Join"
              />
            </div>
            <div style={{ height: "50px" }}></div>
          </div>
        </div>
      </section>
    </>
  );
};

const Container = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
`;

const H2 = styled.div`
  width: 400px;
  color: black;
  margin: 0 auto;
  margin-bottom: 30px;
  text-align: center;
  font-size: 30px;
`;

export default Join;
