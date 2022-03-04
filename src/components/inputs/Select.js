import React from "react";
import styled from "styled-components";

const StSelect = styled.select`
    border-radius: 4px;
    border: 2px solid #ef4746;
    padding: 10px 10px 10px 10px;
    background-color: white;
    margin: 2px;
`;

const Select = (data) => {
    return (
        <StSelect
            style={data.style}
            value={data.value}
            onChange={(e) => data.onChange(e.target.value)}
        >
            {data.children}
        </StSelect>
    );
};

export default Select;
