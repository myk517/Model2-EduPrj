import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "../../css/Common.css";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

const Charge_table = (props) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>구분</th>
            <th>결과</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>머니잔액</td>
            <td>
              <input type="hidden" value={props.data.잔액} />
              {props.data.잔액}
            </td>
          </tr>
          <tr>
            <td>머니충전액</td>
            <td>
              <input type="text" value={props.data.충전액} onChange={props.funcCharge} />
            </td>
          </tr>
          <tr>
            <td>충전결과예상액</td>
            <td>
              <input type="hidden" value={props.money_expect} />
              {props.money_expect}
            </td>
          </tr>
        </tbody>
      </Table>
      <Button variant="danger">충전하기</Button>
    </>
  );
};

export default Charge_table;
