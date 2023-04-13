import styled from "styled-components";
import { RentSpaces } from "../../helpers/api/requests";
import { CardContainer } from "./RequestCard";
import dayjs from "dayjs";

type props = Partial<RentSpaces> & {};
export default function RentCard({ LeisureSpace, createdAt, day_rent }: props) {
  return (
    <CardContainer
      transparent={dayjs(day_rent).format("DD") < dayjs().format("DD")}
    >
      <TitleDiv>
        <h1>{LeisureSpace?.name}</h1>
        <p>Dia de uso: {`${dayjs(day_rent).format("DD/MM/YYYY")}`}</p>
      </TitleDiv>
      <ImageDiv>
        <Image src={LeisureSpace?.image_url} />
        <p>Alugado em: {`${dayjs(createdAt).format("DD/MM/YYYY")}`}</p>
      </ImageDiv>
    </CardContainer>
  );
}

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  h1 {
    font-size: 18px;
    font-weight: bold;
  }
  margin-bottom: 10px;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const ImageDiv = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 10px;

  text-align: center;
  p {
    width: 40%;
    /* background-color: blue; */
  }
`;

const Image = styled.img`
  width: 80%;
  object-fit: cover;
  height: 170px;
  @media (max-width: 500px) {
    width: 100%;
    padding-right: 10px;
  } ;
`;
