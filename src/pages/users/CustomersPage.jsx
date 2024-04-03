import { useState, useEffect } from "react";
import UsersCustomersDataTable from "../../components/tables/user-customer-table/UsersCustomersDataTable";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PageHeader from "../../components/page-header/PageHeader";
const baseUrl = "http://localhost:3000";
const tableHeads = [
  "Kullanici Adi",
  "Lokasyon",
  "Yetkili Ad",
  "Yetkili Soyad",
  "Yetkili  TC No",
  "Yetkili E-Posta",
  "Yetkili Telefon",
  "Adres",
  "Aciklama",
  "Islemler",
];
const searchValues = {
  customerName: "",
  location: "",
  contactFirstName: "",
  contactLastName: "",
  contactTcNo: "",
  contactEmail: "",
  contactPhone: "",
  address: "",
  description: "",
};
const inputData = [
  { name: "customerName", placeholder: "Kullanici Adi", value: "customerName" },
  { name: "location", placeholder: "Lokasyon", value: "location" },
  { name: "contactFirstName", placeholder: "Ad", value: "contactFirstName" },
  {
    name: "contactLastName",
    placeholder: "Soyad",
    value: "contactLastName",
  },

  { name: "contactTcNo", placeholder: "Tc No", value: "contactTcNo" },
  {
    name: "contactEmail",
    placeholder: "E-posta",
    value: "contactEmail",
  },
  {
    name: "contactPhone",
    placeholder: "Telefon",
    value: "contactPhone",
  },
  { name: "address", placeholder: "Adres", value: "address" },
  {
    name: "description",
    placeholder: "Aciklama",
    value: "description",
  },
];
const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const { pathname } = useLocation();
  //---------------GET USERS------------------
  const getCustomers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/customers`);
      setCustomers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //---------------POST USERS------------------
  const addCustomer = async (userData) => {
    try {
      const response = await axios.post(`${baseUrl}/customers`, userData);
      getCustomers();
    } catch (error) {
      console.error("Kullanıcı ekleme hatası:", error);
      throw error; // Hata durumunda hatayı tekrar fırlatır
    }
  };
  //---------------DELETE USERS------------------
  const deleteCustomer = async (userId) => {
    try {
      await axios.delete(`${baseUrl}/customers/${userId}`);
      getCustomers();
    } catch (error) {
      console.error("Kullanıcı silme hatası:", error);
      throw error; // Hata durumunda hatayı tekrar fırlatır
    }
  };
  useEffect(() => {
    getCustomers();
  }, []);
  return (
    <>
      <PageHeader currentUrl={pathname} />
      <UsersCustomersDataTable
        tableHeads={tableHeads}
        searchValue={searchValues}
        inputData={inputData}
        customers={customers}
        addCustomer={addCustomer}
        deleteCustomer={deleteCustomer}
      />
    </>
  );
};

export default CustomersPage;
