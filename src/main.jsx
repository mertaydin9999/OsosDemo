import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider
    theme={{
      token: {
        colorBorder: "none",
        colorText: "#f6f6f6",
      },
      cssVar: true,
      hashed: false,
      components: {
        Menu: {
          itemBorderRadius: 1,
          darkGroupTitleColor: "#fff",
          darkSubMenuItemBg: "var(--color-surface-100)",
          darkItemSelectedBg: "var(--color-surface-200)",
          darkPopupBg: "var(--color-surface-100)",
          darkItemColor: "white",
          darkItemHoverBg: "var(--color-surface-200)",
        },
        Layout: {
          triggerBg: "var(--color-primary-100)",
          triggerColor: "#fff",
          triggerHeight: 36,
        },
        Select: {
          selectorBg: "white",
          colorText: "black",
          clearBg: "white",
          multipleItemBg: "white",
        },
        Tree: {
          nodeSelectedBg: "var(--color-primary-100)",
          nodeHoverBg: "var(--color-primary-300)",
        },
        Button: {
          defaultBg: "#e84749",
          primaryColor: "#f6f6f6",
          defaultColor: "none",
          defaultHoverBg: "#a61d24",
        },
        Table: {
          colorBgContainer: "#0F2545",
          colorText: "#f6f6f6",
          headerBg: "#15417E",
          headerColor: "#f6f6f6",
          borderColor: "#10305A",
          filterDropdownBg: "#fff",
          rowHoverBg: "#375885",
          rowSelectedBg: "#375885",
          rowSelectedHoverBg: "#0a51ab",
        },
        Modal: {
          contentBg: "#111A2C",
          headerBg: "transparent",
          titleColor: "#f6f6f6",
          titleFontSize: 32,
        },
        Pagination: {
          colorBgContainer: "#f6f6f6",
          itemActiveBg: "#0F2545",
        },
        DatePicker: {
          cellActiveWithRangeBg: "#f6f6f6",
          colorTextHeading: "black",
          activeBorderColor: "red",
          colorText: "black",
        },
      },
    }}
  >
    <App />
  </ConfigProvider>
);
