import { ColorRing } from "react-loader-spinner";
import styled from "styled-components";
import { MAIN_COLOR } from "../assets/colors";

type LoadingProps = {
  loading: boolean;
  height?: number;
  width?: number;
  marginTop?: string;
  color: string;
};

export default function LoadingCircle({
  loading,
  height,
  width,
  marginTop,
  color = MAIN_COLOR,
}: LoadingProps) {
  return (
    <Div marginTop={marginTop || "0px"}>
      <ColorRing
        visible={loading}
        height={height}
        width={width}
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={[color, color, color, color, color]}
      />
    </Div>
  );
}

const Div = styled.div<{ marginTop: string }>`
  padding-top: ${({ marginTop }) => marginTop};
  width: 100%;
  height: 100%;
  max-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
