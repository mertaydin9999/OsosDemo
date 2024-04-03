import PageHeader from "../../../components/page-header/PageHeader";
import MainContainer from "../../../components/containers/main-container/MainContainer";
import { useLocation } from "react-router-dom";

const KlemensCoverWarningsPage = () => {
  const { pathname } = useLocation();
  return (
    <>
      <PageHeader currentUrl={pathname} />
      <MainContainer></MainContainer>
    </>
  );
};

export default KlemensCoverWarningsPage;