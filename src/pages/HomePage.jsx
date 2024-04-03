import React from "react";
import MainContainer from "../components/containers/main-container/MainContainer";
import PageHeader from "../components/page-header/PageHeader";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { pathname } = useLocation();
  return (
    <>
      <PageHeader currentUrl={pathname} />
      <MainContainer></MainContainer>
    </>
  );
};

export default Home;
