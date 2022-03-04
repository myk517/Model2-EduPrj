import React from "react";
import styled from "styled-components";

const StInput = styled.input`
    border-radius: 4px;
    border: 2px solid #ef4746;
    padding: 10px;
    font-size: 1rem;
    margin: 2px;
    &:focus {
        border: 2px solid #d32f2f;
        outline: none;
    }
    ::placeholder {
        font-size: 0.8rem;
    }
`;

const Input = (data) => {
    return (
        <StInput
            placeholder={data.placeholder}
            type={data.type}
            value={data.value}
            autoComplete={data.autoComplete}
            style={data.style}
            onKeyPress={() => data.onKeyPress && data.onKeyPress()}
            onChange={(e) => data.onChange && data.onChange(e.target.value)}
        />
    );
};
export default Input;
