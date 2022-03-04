import React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StDatePicker = styled.div`
  border-radius: 4px;
  border: 2px solid #ef4746;
  padding: 6px;
  font-size: 1rem;
  margin: 2px;

  &:focus {
    border: 2px solid #d32f2f;
    outline: none;
  }
  ::placeholder {
    font-size: 0.8rem;
  }

  .react-datepicker-wrapper input[type="text"] {
    padding: 4px;
    border: none;
    outline: none;
  }
`;

const DatePickers = (data) => {
  return (
    <StDatePicker styl={data.style}>
      <DatePicker dateFormat="yyyy-MM-dd" selected={data.selected} onChange={(e) => data.onChange(e)}></DatePicker>
    </StDatePicker>
  );
};

export default DatePickers;
