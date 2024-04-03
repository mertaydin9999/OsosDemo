import React from "react";
import { Button, Form, Input, Select } from "antd";
import FormContainer from "../../containers/form-container/FormContainer";
const CustomerRegisterForm = ({ setIsEdit, toggleForm, addCustomer }) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    addCustomer(values);
    form.resetFields();
    setIsEdit(false);
  };
  const formStyle = {
    maxWidth: 1100,
    maxHeight: 300,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: "1em",
    gap: "0em 1em",
  };
  const initialValues = {
    customerName: "",
    location: "",
    contactFirstName: "",
    contactLastName: "",
    contactTcNo: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    description: "",
    onayliMi: false,
    kilitliMi: false,
    charge: "Ozel Kullanici",
    password: "",
    actions: "",
  };
  return (
    <FormContainer>
      <Form
        form={form}
        {...layout}
        name="register"
        onFinish={onFinish}
        style={formStyle}
        initialValues={initialValues}
      >
        <div>
          <Form.Item
            label="Musteri Adi"
            name="customerName"
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
          <Form.Item name="location" label="Lokasyon">
            <Select>
              <Select.Option value="istanbul">Istanbul</Select.Option>
              <Select.Option value="ankara">Ankara</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div>
          <Form.Item
            label="Yetkili Adi"
            name="contactFirstName"
            rules={[
              {
                required: true,
                message: "Lutfen Yetkili adi giriniz!",
              },
            ]}
          >
            <Input style={{ color: "black", border: "none" }} />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            label="Yetkili Soyadi"
            name="contactLastName"
            rules={[
              {
                required: true,
                message: "Lutfen Yetkili Soyadi giriniz!",
              },
            ]}
          >
            <Input style={{ color: "black", border: "none" }} />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            label="Yetkili TC No"
            name="contactTcNo"
            rules={[
              {
                required: true,
                message: "Lutfen TCnizi  giriniz!",
              },
            ]}
          >
            <Input style={{ color: "black", border: "none" }} />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="contactEmail"
            label="Yetkili E-mail"
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
            name="contactPhone"
            label="Yetkili Telefon"
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
          <Form.Item label="Adres" name="address">
            <Input style={{ color: "black", border: "none" }} />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Aciklama" name="description">
            <Input style={{ color: "black", border: "none" }} />
          </Form.Item>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            gap: "0em 1em",
            width: "96%",
          }}
        >
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
            <Button
              style={{
                border: "none",
                backgroundColor: "red",
                color: "#fff",
              }}
              onClick={() => {
                toggleForm();
                setIsOpen(false);
              }}
            >
              Iptal
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
            <Button
              style={{
                backgroundColor: "var(--color-primary-100)",
                color: "#fff",
              }}
              type="primary"
              htmlType="submit"
            >
              Guncelle
            </Button>
          </Form.Item>
        </div>
      </Form>
    </FormContainer>
  );
};

export default CustomerRegisterForm;
