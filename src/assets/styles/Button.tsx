import { PropsWithChildren } from "react";
import styled from "styled-components";

export interface BtnProps extends PropsWithChildren {
  onClick?: () => void;
  width?: string;
  height?: string;
}

export default function Button({ children, width, height, onClick }: BtnProps) {
  return (
    <GenButton onClick={onClick} width={width} height={height}>
      {children}
    </GenButton>
  );
}

const GenButton = styled.button<BtnProps>`
  font-size: 20px;
  background-color: #1877f2;
  color: white;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    background-color: #1263cc;
  }
  font-family: "Passion One", "cursive";

  width: ${({ width }) => width || "100px"};
  height: ${({ height }) => height || "50px"};
`;
