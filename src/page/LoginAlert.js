import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const LoginAlert = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("token") == null) navigate("/");
  });
  return (
    <>
      <h1>환영합니다! 상단에서 원하는 메뉴를 선택해주세요.</h1>
    </>
  );
};

export default LoginAlert;
