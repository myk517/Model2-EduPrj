import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "../../../css/Common.css";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import RequestPay from "../../libraries/import/Import";
import Select from "../../components/inputs/Select";
import Option from "../../components/inputs/Option";

const ChargeBlce = () => {
  return (
    <>
      <div id="titleBox">머니 충전</div>
      <TextBox>
        <TextField label="머니잔액" variant="standard" color="warning" value={numberWithCommas(money_blce)} readOnly />
      </TextBox>
    </>
  );
};

export default ChargeBlce;
