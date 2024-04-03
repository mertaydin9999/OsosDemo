import logo from "../../assets/logo.png";
import { useState } from "react";
import { IoMdPerson } from "react-icons/io";
import styles from "./HeaderComponent.module.css";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "antd";
import { Link } from "react-router-dom";
const HeaderComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleMyAccount = () => {
    navigate("/my-account");
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/login");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <header>
      <Modal
        title="Cikis"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            style={{
              backgroundColor: "#0A51AB",
              margin: "0px 20px 0 0px ",
              padding: "0em 2em",
            }}
            onClick={handleCancel}
          >
            Vazgec
          </Button>,
          <Button
            key="cancel"
            type="primary"
            style={{
              backgroundColor: "#e84749",
              margin: "0px 0px 0 0px ",
              padding: "0em 2em",
            }}
            onClick={handleOk}
          >
            Cikis
          </Button>,
        ]}
      >
        <p
          style={{
            color: "#f6f6f6",
            fontSize: "1em",
            fontWeight: 300,
          }}
        >
          Cikis yapmak istiyor musunuz?
        </p>
      </Modal>
      <div className={styles.logoDiv}>
        <Link to="/">
          <img src={logo} width={110} height={35} alt="" />
        </Link>
        <div className={styles.verticalLine}></div>
        <h1> Makel Otomatik Sayac Okuma Sistemi</h1>
      </div>
      <div className={styles.headerMenu}>
        <div className={styles.iconsDiv} onClick={handleMyAccount}>
          <IoMdPerson className={styles.personIcon} />
        </div>
        <div className={styles.iconsDiv} onClick={showModal}>
          <FiLogOut className={styles.logoutIcon} />
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
