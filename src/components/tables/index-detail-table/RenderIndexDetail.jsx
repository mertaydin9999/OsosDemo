import React from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import styles from "./RenderIndexDetail.module.css";
const RenderIndexDetail = ({ chartData }) => {
  return chartData.map((item, index) => (
    <ul key={index} className={styles.container}>
      <li>
        <span> Uretici:</span> {item.uretici}
      </li>
      <li>
        <span>Model:</span> {item.model}
      </li>
      <li>
        <span>Sayac Adi:</span> {item.sayacAdi}
      </li>
      <li>
        <span>Seri No:</span> {item.seriNo}
      </li>
      <li>
        <span>Abone No:</span> {item.aboneNo}
      </li>
      <li>
        <span>Tesisat No:</span> {item.tesisatNo ? item.tesisatNo : "Yok"}
      </li>
      <li>
        <span>Sayac Kodu:</span> {item.sayacKodu ? item.sayacKodu : "Yok"}
      </li>
      <li>
        <span>Carpan:</span> {item.carpan}
      </li>
      <li>
        <span>Akim Trafo Orani:</span>{" "}
        {item.akimTrafoOrani ? item.akimTrafoOrani : "Yok"}
      </li>
      <li>
        <span>Cift Yon:</span>
        {item.ciftYonlu ? (
          <CheckOutlined style={{ color: "#6abe39" }} />
        ) : (
          <CloseOutlined style={{ color: "#e84749" }} />
        )}
      </li>
      <li>
        <span>Akim Gerilim Orani:</span>{" "}
        {item.gerilimTrafoOrani ? item.gerilimTrafoOrani : "Yok"}
      </li>
      <li>
        <span>Birim:</span> {item.birim}
      </li>
      <li>
        <span>Yuk Profili Birim:</span> {item.yukProfiliBirim}
      </li>
      <li>
        <span>Yuk Profili Kayit: </span>
        {item.yukProfiliKayit}
      </li>
    </ul>
  ));
};

export default RenderIndexDetail;
