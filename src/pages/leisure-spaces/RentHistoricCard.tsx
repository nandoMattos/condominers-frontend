import dayjs from "dayjs";
import { RentSpace } from "../../helpers/api/leisure-space";
import { CardContainer } from "../requests/RequestCardGeneric";

type props = Partial<RentSpace>;

export default function RentHistoricCard({ User, createdAt, day_rent }: props) {
  return (
    <CardContainer transparent={dayjs(day_rent) < dayjs()}>
      <p>{dayjs(day_rent).format("DD/MM/YYYY")}</p>
      <p>Alugado por: {User?.name}</p>
      <p>Data de agendamento: {dayjs(createdAt).format("DD/MM/YYYY")}</p>
    </CardContainer>
  );
}
