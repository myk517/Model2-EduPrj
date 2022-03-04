import React from "react";
import styled from "styled-components";

const StColumnArticle = styled.div`
    flex-direction: column;
    flex-wrap: wrap;
    display: flex;
`;
const ColumnArticle = (data) => {
    return (
        <StColumnArticle style={{ ...data.style }}>
            {data.children}
        </StColumnArticle>
    );
};

export default ColumnArticle;
