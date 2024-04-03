import { useState } from "react";
import styles from "./Login.module.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import makelPhoto from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import LoginContainer from "../../containers/login-container/LoginContainer";
const Login = ({ handleLogin, user }) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const onFinish = (values) => {
    if (values.username === user.mail && values.password === user.password) {
      handleLogin(true);
      navigate("/");
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <LoginContainer>
      <div className={styles["login-form-div"]}>
        <div className={styles["logo-photo-div"]}>
          <img src={makelPhoto} alt="" />
        </div>
        <div>
          <p
            style={{
              color: "#fff",
            }}
          >
            Giris Paneli
          </p>
        </div>
        <Form
          name="normal_login"
          className={styles["login-form"]}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{
            width: "60%",
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Lutfen kullanici adinizi giriniz!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Kullanici Adi"
              style={{
                color: "black",
                borderColor: "black",
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Lutfen sifrenizi giriniz!",
              },
            ]}
            hasFeedback
            validateStatus={errorMessage ? "error" : ""}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Sifre"
              style={{
                color: "black",
                borderColor: "black",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                backgroundColor: "red",
                fontSize: "1em",
              }}
              className={styles["login-form-button"]}
            >
              Giris
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginContainer>
  );
};

export default Login;
