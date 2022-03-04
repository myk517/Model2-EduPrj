import React from "react";
import styled from "styled-components";

const StBigLogo = styled.div`
    text-align: center;
    font-size: 3rem;
    padding: 10px 50px 10px 50px;
    font-weight: bold;
    color: #ef4746;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
`;

const BigLogo = (data) => {
    return <StBigLogo style={data.style}>E4.Pay Service</StBigLogo>;
};

export default BigLogo;
