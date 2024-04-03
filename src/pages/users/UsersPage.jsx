import { useState, useEffect } from "react";
import UsersCustomersDataTable from "../../components/tables/user-customer-table/UsersCustomersDataTable";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PageHeader from "../../components/page-header/PageHeader";
const tableHeads = [
  "Kullanici Adi",
  "Ad",
  "Yetkisi",
  "Soyad",
  "Aciklama",
  "E-Posta",
  "Telefon",
  "Onayli",
  "Kilitli",
  "Islemler",
];
const baseUrl = "http://localhost:3000";
const searchValues = {
  kullaniciAdi: "",
  ad: "",
  yetki: "",
  soyad: "",
  aciklama: "",
  ePosta: "",
  telefon: "",
  onayliMi: "",
  kilitliMi: "",
};
const inputData = [
  { name: "username", placeholder: "Kullanici Adi", value: "username" },
  { name: "firstName", placeholder: "Ad", value: "firstName" },
  { name: "lastName", placeholder: "Soyad", value: "lastName" },
  {
    name: "charge",
    placeholder: "Yetkisi",
    value: "charge",
  },

  { name: "description", placeholder: "Aciklama", value: "description" },
  {
    name: "mail",
    placeholder: "E-posta",
    value: "mail",
  },
  {
    name: "phone",
    placeholder: "Telefon",
    value: "phone",
  },
  { name: "onayliMi", placeholder: "Onayli", value: "onayliMi" },
  {
    name: "kilitliMi",
    placeholder: "Kilitli",
    value: "kilitliMi",
  },
];

const UsersPage = () => {
  const { pathname } = useLocation();

  const [users, setUsers] = useState([]);
  //---------------GET USERS------------------
  const getUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //---------------POST USERS------------------
  const addUser = async (userData) => {
    try {
      const response = await axios.post(`${baseUrl}/users`, userData);
      getUsers();
    } catch (error) {
      console.error("Kullanıcı ekleme hatası:", error);
      throw error; // Hata durumunda hatayı tekrar fırlatır
    }
  };
  //---------------DELETE USERS------------------
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${baseUrl}/users/${userId}`);
      getUsers();
    } catch (error) {
      console.error("Kullanıcı silme hatası:", error);
      throw error; // Hata durumunda hatayı tekrar fırlatır
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <PageHeader currentUrl={pathname} />
      <UsersCustomersDataTable
        tableHeads={tableHeads}
        searchValue={searchValues}
        inputData={inputData}
        users={users}
        addUser={addUser}
        deleteUser={deleteUser}
      />
    </>
  );
};

export default UsersPage;
