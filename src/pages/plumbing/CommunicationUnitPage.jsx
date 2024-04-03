import { useState, useEffect } from "react";
import PageHeader from "../../components/page-header/PageHeader";
import { useLocation } from "react-router-dom";
import CommunicationUnitTable from "../../components/tables/communication-unit/CommunicationUnitTable";
import axios from "axios";
const tableHeads = [
  "Ad",
  "Seri No",
  "Telefon",
  "Tipi",
  "Model",
  "Aciklama",
  "Network Modu",
  "Islemler",
];
const searchValues = {
  name: "",
  seriNo: "",
  phoneNumber: "",
  communicationType: "",
  model: "",
  description: "",
  networkMode: "",
  actions: "",
};
const inputData = [
  { name: "name", placeholder: "Ad", value: "name" },
  { name: "seriNo", placeholder: "Seri No", value: "seriNo" },
  { name: "phoneNumber", placeholder: "Telefon", value: "phoneNumber" },
  {
    name: "communicationType",
    placeholder: "Tipi",
    value: "communicationType",
  },
  { name: "model", placeholder: "Model", value: "model" },
  {
    name: "description",
    placeholder: "Aciklama",
    value: "description",
  },
  { name: "networkMode", placeholder: "Network Modu", value: "networkMode" },
];
const baseUrl = "http://localhost:3000";
const CommunicationUnitPage = () => {
  const [communicationUnit, setCommunicationUnit] = useState([]);
  const { pathname } = useLocation();
  //---------------GET API----------------------

  const getCommunicationUnits = async () => {
    try {
      const response = await axios.get(`${baseUrl}/communication-unit`);
      setCommunicationUnit(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(
        "Haberleşme ünitelerini getirirken bir hata oluştu:",
        error
      );
      throw error; // Hata durumunda hatayı tekrar fırlatır
    }
  };
  //---------------POST API----------------------
  const postCommunicationUnit = async (communicationUnitData) => {
    try {
      const response = await axios.post(
        `${baseUrl}/communication-unit`,
        communicationUnitData
      );

      getCommunicationUnits();
    } catch (error) {
      console.error("Haberleşme birimi oluşturulurken bir hata oluştu:", error);
      throw error;
    }
  };
  //---------------DELETE API----------------------
  const deleteCommunicationUnit = async (id) => {
    try {
      await axios.delete(`${baseUrl}/communication-unit/${id}`);
      getCommunicationUnits();
    } catch (error) {
      console.error("Haberleşme birimini silerken bir hata oluştu:", error);
      throw error;
    }
  };
  useEffect(() => {
    getCommunicationUnits();
  }, []);
  return (
    <>
      <PageHeader currentUrl={pathname} />
      <CommunicationUnitTable
        tableHeads={tableHeads}
        searchValue={searchValues}
        inputData={inputData}
        communicationUnit={communicationUnit}
        deleteCommunicationUnit={deleteCommunicationUnit}
        postCommunicationUnit={postCommunicationUnit}
      />
    </>
  );
};

export default CommunicationUnitPage;
