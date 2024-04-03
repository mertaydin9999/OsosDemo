import React from "react";
import { useNavigate } from "react-router-dom";
import { MdPersonSearch } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdCable } from "react-icons/md";
import { FaTableCells } from "react-icons/fa6";
import { IoIosStats } from "react-icons/io";
import { BsFillModemFill } from "react-icons/bs";
import { MdSystemSecurityUpdateWarning } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { Menu } from "antd";
const MenuComponent = () => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const iconStyle = {
    fontSize: "1.7em",
    color: "var(--color-primary-200)",
  };
  const items = [
    getItem("Anasayfa", "/", <FaHome style={iconStyle} />, null, null),
    {
      type: "divider",
    },
    getItem("Kullanıcı", "2", <MdPersonSearch style={iconStyle} />, [
      getItem("Kullanıcılar", "/users"),
      getItem("Müşteriler", "/customers"),
    ]),
    {
      type: "divider",
    },
    getItem("Tesisat Semasi", "3", <MdCable style={iconStyle} />, [
      getItem("Lokasyon", "/location"),
      getItem("Sayac", "/meter"),
      getItem("Haberlesme Unitesi", "/communication-unit"),
    ]),
    getItem("Okumalar", "4", <FaTableCells style={iconStyle} />, [
      getItem("Yeni Okuma", "/new-reading"),
      getItem("Guncel Okumalar", "/latest-readings"),
      getItem("Okuma Sonuclari", "/reading-results"),
      getItem("Haberlesme Loglari", "/communication-logs"),
    ]),
    getItem("Istatistikler", "5", <IoIosStats style={iconStyle} />, [
      getItem("Okuma Basari Oranlari", "/lreading-success-rates"),
      getItem("Modem Sinyal Seviyeleri", "/modem-signal-levels"),
      getItem("Ay Endeksi Bulunmayan Sayaclar", "/meters-without-transition"),
    ]),
    getItem("Modem Islemleri", "6", <BsFillModemFill style={iconStyle} />, [
      getItem("Paket Guncelleme", "/packages-update"),
      getItem("Modem Parametreleri", "/modem-parameters"),
      getItem("Modem Is Emri Yukleme", "/loading-modem-command-job"),
    ]),
    getItem(
      "Uyari Mesajlari",
      "/warning-message",
      <MdSystemSecurityUpdateWarning style={iconStyle} />
    ),
    getItem("Raporlar", "7", <TbReportSearch style={iconStyle} />, [
      getItem("Sayac Endeksleri", "8", null, [
        getItem("Okunan Tum Endeksler", "/all-read-indexes"),
        getItem("Ay Sonu Endeksleri", "/end-of-month-indexes"),
        getItem("Ay Sonu Tuketimleri", "/month-end-consumptions"),
        getItem("Son Endeks Bilgileri", "/last-index-infos"),
        getItem("Yuk Profili Kayitlari", "/load-profile-records"),
      ]),
      getItem("Sebekeye Verilen Endeksler", "9", null, [
        getItem("Okunan Tum Endeksler - Uretim", "/all-read-indexes-product"),
        getItem("Ay Sonu Endeksleri - Uretim", "/end-of-month-indexes-product"),
        getItem(
          "Ay Sonu Tuketimleri - Uretim",
          "/month-end-consumptions-product"
        ),
        getItem("Son Endeks Bilgileri - Uretim", "/last-index-infos-product"),
        getItem(
          "Yuk Profili Kayitlari - Uretim",
          "/load-profile-records-product"
        ),
      ]),
      getItem("Sayac Hatalari", "10", null, [
        getItem("Faz Hatalari", "/phase-errors"),
        getItem("Klemens Kapagi Uyarilari", "/klemens-cover-warnings"),
        getItem("Hata Ve Uyari Sayaclari", "/error-and-warning-meter"),
        getItem(
          "Pil Durumu Ve Govde Kapagi Uyarilari",
          "/battery-status-and-chassis-cover-warnings"
        ),
      ]),
      getItem("Zaman Farklari", "11", null, [
        getItem("Sayac Saat Degerleri", "/meter-clock-values"),
      ]),
      getItem("Akim Gerilim Bilgileri", "/current-and-voltage-info"),
      getItem("Load Analysis", "/load-analysis"),
      getItem("Modem Sayisal Giris Loglari", "/modem-digital-input-logs"),
      getItem("Veri Cikart", "12", null, [
        getItem("Toplu OSF Formu", "/mass-osf-form"),
        getItem("CSV Ciktisi", "/csv-output"),
      ]),
      getItem("DST Iptal Edilen Sayaclar", "/dst-cancelled-meters"),
    ]),
  ];
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      items={items}
      onClick={onClick}
      style={{ backgroundColor: "var(--color-surface-100)" }}
    ></Menu>
  );
};

export default MenuComponent;
