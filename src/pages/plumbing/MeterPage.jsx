import PageHeader from "../../components/page-header/PageHeader";
import MeterTable from "../../components/tables/meter-table/MeterTable";
import { useLocation } from "react-router-dom";
const url = "http://10.0.0.101:8088/Makel/OsosApi/Sayac";
const tableHeads = [
  "Uretici",
  "Model",
  "Sayac Adi",
  "Seri No",
  "Abone No",
  "Tesisat No",
  "Sayac Kodu",
  "Carpan",
  "Akim Trafo Orani",
  "Cift Yon",
  "Gerilim Trafo Orani",
  "Birim",
  "Yuk Profili Birim",
  "Yuk Profili Kayit",
];
const searchValues = {
  uretici: "",
  model: "",
  sayacAdi: "",
  seriNo: "",
  aboneNo: "",
  tesisatNo: "",
  sayacKodu: "",
  carpan: "",
  akimTrafoOrani: "",
  ciftYon: "",
  gerilimTrafoOrani: "",
  birim: "",
  yukProfiliBirim: "",
  yukProfiliKayit: "",
};
const inputData = [
  { name: "uretici", placeholder: "Uretici", value: "uretici" },
  { name: "model", placeholder: "Model", value: "model" },
  {
    name: "sayacAdi",
    placeholder: "Sayac Adi",
    value: "sayacAdi",
  },
  { name: "seriNo", placeholder: "Seri No", value: "seriNo" },
  { name: "aboneNo", placeholder: "Abone No", value: "aboneNo" },
  {
    name: "tesisatNo",
    placeholder: "Tesisat No",
    value: "tesisatNo",
  },
  {
    name: "sayacKodu",
    placeholder: "Sayac Kodu",
    value: "sayacKodu",
  },
  { name: "carpan", placeholder: "Carpan", value: "carpan" },
  {
    name: "akimTrafoOrani",
    placeholder: "Akim Trafo Orani",
    value: "akimTrafoOrani",
  },
  { name: "ciftYon", placeholder: "Cift Yon", value: "ciftYon" },
  {
    name: "gerilimTrafoOrani",
    placeholder: "Gerilim Trafo Orani",
    value: "gerilimTrafoOrani",
  },
  { name: "birim", placeholder: "Birim", value: "birim" },
  {
    name: "yukProfiliBirim",
    placeholder: "Yuk Profil Birim",
    value: "yukProfiliBirim",
  },
  {
    name: "yukProfiliKayit",
    placeholder: "Yuk Profili Kayit",
    value: "yukProfiliKayit",
  },
];
const MeterPage = () => {
  const { pathname } = useLocation();

  return (
    <>
      <PageHeader currentUrl={pathname} />
      <MeterTable
        url={url}
        tableHeads={tableHeads}
        searchValue={searchValues}
        inputData={inputData}
      />
    </>
  );
};

export default MeterPage;
