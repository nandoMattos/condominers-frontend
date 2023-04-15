import styled from "styled-components";
import { ReportsInfo } from "../../helpers/api/requests";
import dayjs from "dayjs";

type props = ReportsInfo & {
  solved: boolean;
};

export default function RequestCard({
  type,
  createdAt,
  description,
  solved,
}: props) {
  return (
    <CardContainer transparent={solved ? true : false}>
      <Title color={solved ? "green" : "#f0e111"}>
        <span>
          <h1>{type === "maintenance" ? <>Manutenção</> : <>Reclamação</>}</h1>:
          {solved ? " Fechado" : " Em análise"}
        </span>
        <p>Aberto em: {dayjs(createdAt).format("DD/MM/YYYY")}</p>
      </Title>
      <p id="desc">&quot;{description}&quot;</p>
    </CardContainer>
  );
}

export const CardContainer = styled.div<{ transparent: boolean }>`
  background-color: #e8e6e6;
  width: 95%;
  min-height: 100px;
  height: fit-content;
  margin: 10px;
  padding: 10px;
  font-size: 15px;
  opacity: ${({ transparent }) => (transparent ? "60%" : "none")};

  #desc {
    padding-top: 10px;
  }
`;

const Title = styled.div<{ color: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ color }) => color};
  padding-bottom: 5px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h1 {
    font-weight: bold;
    font-size: 18px;
  }
  p {
    font-size: 13px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
