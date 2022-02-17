import React from "react";
import styled, { css } from "styled-components";

function Button({ value, children, onClick, checked }) {
  return (
    <ButtonStyled value={value} onClick={onClick} checked={checked}>
      {children}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  border: 1px solid #2196f3;
  border-radius: 3px;
  background: none;
  font-weight: bold;
  cursor: pointer;

  ${({ checked }) => {
    return checked
      ? css`
          background-color: #2196f3;
          color: #ffffff;
        `
      : css`
          color: #2196f3;
        `;
  }}
`;

export default Button;
