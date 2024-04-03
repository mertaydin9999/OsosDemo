import React, { useState } from "react";
import { Form, Input, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LoadingSpinner from "../../UI/spinner/LoadingSpinner";

const normFile = (e) => {
  console.log(e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const MyAccountUpdateForm = ({ updateAdmin }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateAdmin(values);
      form.resetFields();
    } catch (error) {
      console.error("Bir hata oluştu:", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 20,
      }}
      layout="horizontal"
      style={{
        maxWidth: 600,
      }}
    >
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
        <Input style={{ color: "black" }} />
      </Form.Item>
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
        <Input style={{ color: "black" }} />
      </Form.Item>
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
        <Input style={{ color: "black" }} />
      </Form.Item>

      <Form.Item
        name="mail"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "Lutfen gecerli bir e-mail adresi giriniz!",
          },
          {
            required: true,
            message: "Lutfen e-mail adresinizi giriniz!",
          },
        ]}
      >
        <Input style={{ color: "black" }} />
      </Form.Item>
      <Form.Item
        name="password"
        label="Parola"
        rules={[
          {
            required: true,
            message: "Lutfen sifrenizi giriniz!",
          },
        ]}
        hasFeedback
      >
        <Input.Password style={{ color: "black" }} />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Parola (Tekrar)"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Lutfen parolanizi dogrulayiniz!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Parolalar eslesmiyor!"));
            },
          }),
        ]}
      >
        <Input.Password style={{ color: "black" }} />
      </Form.Item>
      <Form.Item
        label="Dosya Sec"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        name="file"
      >
        <Upload listType="picture-card">
          <button
            style={{
              border: 0,
              background: "none",
            }}
            type="button"
          >
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Dosya
            </div>
          </button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          style={{
            backgroundColor: "var(--color-primary-100)",
            width: "80%",
            marginLeft: "14.2em",
          }}
          htmlType="submit"
        >
          {loading ? <LoadingSpinner /> : "Guncelle"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyAccountUpdateForm;
