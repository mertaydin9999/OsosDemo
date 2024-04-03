import React, { useState, useEffect } from "react";
import PageHeader from "../../components/page-header/PageHeader";
import { useLocation } from "react-router-dom";
import styles from "./MyAccountPage.module.css";
import makelPhoto from "../../assets/logo.png";
import MyAccountUpdateForm from "../../components/forms/my-account-update-form/MyAccountUpdateForm";
import axios from "axios";
const dummyArray = {
  charge: "ADMIN",
};
const baseUrl = "http://localhost:3000";
const MyAccountPage = () => {
  const { pathname } = useLocation();

  const [admin, setAdmin] = useState([]);

  const getAdmin = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin`);
      setAdmin(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const updateAdmin = async (values) => {
    try {
      await axios.put(`${baseUrl}/admin/1`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      getAdmin();
    } catch (error) {
      console.error("Admin güncelleme hatası:", error.message);
      throw error;
    }
  };
  useEffect(() => {
    getAdmin();
  }, []);
  return (
    <>
      <PageHeader currentUrl={pathname} />
      <div
        style={{
          display: "flex",
          gap: "0em 1em",
          padding: "1em",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--color-surface-200)",
            padding: "2em",
            width: "60%",
            borderRadius: ".5em",
          }}
        >
          <MyAccountUpdateForm updateAdmin={updateAdmin} />
        </div>
        <div className={styles["user-infos-div"]}>
          <div className={styles["my-account-photo-div"]}>
            <img src={makelPhoto} alt="" />
          </div>
          <div className={styles["my-account-info-div"]}>
            <p>
              <span>Yetkisi:</span> Makel {dummyArray.charge}
            </p>
            <p>
              <span>Ad :</span> {admin?.firstName}
            </p>
            <p>
              <span>Soyad :</span> {admin?.lastName}
            </p>
            <p>
              <span>Telefon:</span> {admin?.phone}
            </p>
            <p>
              <span>E-Mail :</span> {admin?.mail}
            </p>
            <p>
              <span>Sifre : </span>
              {admin?.password}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccountPage;
