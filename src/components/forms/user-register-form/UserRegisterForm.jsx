import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import FormContainer from "../../containers/form-container/FormContainer";
const UserRegisterForm = ({ setIsEdit, userData, toggleForm, addUser }) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const { confirm, ...newUser } = values;
    addUser(newUser);
    form.resetFields();
    setIsEdit(false);
  };
  const formStyle = {
    maxWidth: 1100,
    maxHeight: 300,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    padding: "1em",
    gap: "0em 1em",
  };
  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    mail: "",
    phone: "",
    description: "",
    onayliMi: false,
    kilitliMi: false,
    charge: "Ozel Kullanici",
    password: "",
  };
  return (
    <FormContainer>
      <Form
        form={form}
        autoComplete="off"
        {...layout}
        name="register"
        onFinish={onFinish}
        style={formStyle}
        initialValues={initialValues}
      >
        <div>
          <Form.Item
            label="Ad"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Lutfen Adinizi giriniz!",
              },
            ]}
          >
            <Input style={{ color: "black", border: "none" }} />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            label="Soyad"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Lutfen Soyadinizi giriniz!",
              },
            ]}
          >
            <Input style={{ color: "black", border: "none" }} />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            label="Kullanici Adi"
            name="username"
            rules={[
              {
                required: true,
                message: "Lutfen Kullanici adini giriniz!",
              },
            ]}
          >
            <Input style={{ color: "black", border: "none" }} />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="mail"
            label="E-mail"
            rules={[
              {
                required: true,
                message: "Lutfen e-mail adresinizi giriniz!",
              },
            ]}
          >
            <Input style={{ color: "black", border: "none" }} />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="phone"
            label="Telefon No"
            rules={[
              {
                required: true,
                message: "Lutfen telefon numaranizi giriniz!",
              },
            ]}
          >
            <Input style={{ color: "black", border: "none" }} />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Aciklama" name="description">
            <Input style={{ color: "black", border: "none" }} />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Onayli" name="onayliMi" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Kilitli" name="kilitliMi" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="charge"
            label="Yetkisi"
            initialValue={userData.yetki}
          >
            <Select>
              <Select.Option value="yonetici">Yonetici</Select.Option>
              <Select.Option value="ozelKullanici">
                Ozel Kullanici
              </Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="password"
            label="Sifre"
            rules={[
              {
                required: true,
                message: "Lutfen sifrenizi giriniz.",
              },
            ]}
          >
            <Input.Password style={{ border: "none", color: "black" }} />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="confirm"
            label="Sifre(Tekrar)"
            dependencies={["sifre"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Parolalar eslesmiyor!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password style={{ border: "none", color: "black" }} />
          </Form.Item>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0em 1em",
          }}
        >
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 15 }}>
            <Button
              style={{
                border: "none",
                color: "#fff",
                backgroundColor: "red",
              }}
              onClick={toggleForm}
            >
              Iptal
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
            <Button
              style={{
                backgroundColor: "var(--color-primary-100)",
              }}
              type="primary"
              htmlType="submit"
            >
              Olustur
            </Button>
          </Form.Item>
        </div>
      </Form>
    </FormContainer>
  );
};

export default UserRegisterForm;
