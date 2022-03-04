import React from "react";
import styled from "styled-components";

const StBigLabel = styled.label`
    text-align: left;
    padding: 8px 2px 8px 2px;
    font-weight: bold;
    font-size: 2rem;
`;

const BigLabel = (data) => {
    return <StBigLabel style={data.style}>{data.value}</StBigLabel>;
};

export default BigLabel;
