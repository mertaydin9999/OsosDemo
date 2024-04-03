import React, { useState, useEffect } from "react";
import styles from "./UsersAddFormContainer.module.css";
import { useLocation } from "react-router-dom";
import UserRegisterForm from "../../forms/user-register-form/UserRegisterForm";
import CustomerRegisterForm from "../../forms/customer-register-form/CustomerRegisterForm";
const UsersAddFormContainer = ({
  userData,
  dataArray,
  setDataArray,
  setIsEdit,
  addUser,
  addCustomer,
}) => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const toggleForm = () => {
    setIsEdit(false);
  };

  return (
    <section className={styles.container}>
      {currentUrl === "/users" ? (
        <UserRegisterForm
          setIsEdit={setIsEdit}
          userData={userData}
          dataArray={dataArray}
          setDataArray={setDataArray}
          toggleForm={toggleForm}
          addUser={addUser}
        />
      ) : (
        <CustomerRegisterForm
          setIsEdit={setIsEdit}
          userData={userData}
          dataArray={dataArray}
          setDataArray={setDataArray}
          toggleForm={toggleForm}
          addCustomer={addCustomer}
        />
      )}
    </section>
  );
};

export default UsersAddFormContainer;
