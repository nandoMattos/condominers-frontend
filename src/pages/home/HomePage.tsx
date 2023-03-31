import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { UserContext, UserContextType } from "../../contexts/UserContext";

export default function HomePage() {
  const [loading, setLoading] = useState<boolean>(true);
  const { userInfo } = useContext(UserContext) as UserContextType;
  const user = userInfo.user;

  return (
    <>
      <HomePageStyle>
        <Header />
        {loading ? (
          <p>carregando...</p>
        ) : (
          <Main>
            <UserInfo>
              <p>Nome: {user.name}</p>
            </UserInfo>
          </Main>
        )}
      </HomePageStyle>
    </>
  );
}

const HomePageStyle = styled.div`
  height: 100vh;
  padding-top: 70px;
`;

const Main = styled.main`
  background-color: red;
`;

const UserInfo = styled.div``;
