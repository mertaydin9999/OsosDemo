import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AllReadIndexesPage.module.css";
import { FaFilter } from "react-icons/fa";
import { FaFileExport } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import InputSearch from "../../../components/UI/input/InputSearch";
import { Button, Modal } from "antd";
import RenderPaginationButtons from "../../../components/pagination/Pagination";
import { filterDataByDateRange } from "../../../utils/dataFunctions";
import InputFilter from "../../../components/tables/filter-table/FilterTable";
import RenderTableRows from "../../../components/tables/all-read-indexes-table/RenderTableRows";
import ButtonInput from "../../../components/UI/button/ButtonInput";
import { useLocation } from "react-router-dom";
import TableHead from "../../../components/UI/table/TableHead";
import LoadingSpinner from "../../../components/UI/spinner/LoadingSpinner";
import PageHeader from "../../../components/page-header/PageHeader";
import MainContainer from "../../../components/containers/main-container/MainContainer";
import TableContainer from "../../../components/containers/table-container/TableContainer";
import Table from "../../../components/UI/table/Table";
import { mapToSeparateArray } from "../../../utils/dataFunctions";
const baseUrl = "http://10.0.0.101:8088/Makel/OsosApi/Sayac/SayacAyGecisEndeks";
const tableHead = [
  "Seri No",
  "Sayac Adi",
  "Tarih",
  "Aktif (kWh) (1.8.0)",
  "Tarife 1 (kWh) (1.8.1)",
  "Tarife 2 (kWh) (1.8.2)",
  "Tarife 3 (kWh) (1.8.3)",
  "Enduktif (kVArh) (5.8.0)",
  "Kapasitif (kVArh) (8.8.0)",
  "End/Aktif (kVArh) (%)",
  "Kap/Aktif (kVArh) (%)",
  "Donem ",
];
const AllReadIndexesPage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataArray, setDataArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("01.01.2024");
  const [endDate, setEndDate] = useState("03.29.2024");
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  //----Verinin APIden cekildigi bolum
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/03.01.2020/03.29.2024`);
        setDataArray(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(startDate, endDate);
  }, [startDate, endDate]);
  console.log(dataArray);

  //----Baslangicta filtered arrayi dolu getirir
  useEffect(() => {
    setFilteredData(dataArray);
  }, [dataArray]);
  //---Secilen tarihleri filtreleyen ayni zamanda arraye gore kendini devamli guncelleyen fonksiyon
  useEffect(() => {
    const filter = mapToSeparateArray(dataArray);
    const filteredData = filterDataByDateRange(
      filter,
      startDate,
      endDate,
      selectedRows
    );
    setFilteredData(filteredData);
  }, [dataArray, startDate, endDate]);
  //----- Bu kodlar API den gelen array in islendigi ve sayfada gosterilmek icin ayarlandigi kisim
  const separateArray = mapToSeparateArray(dataArray);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  //-----Modal in acilmasi icin metod
  const showModal = () => {
    setOpen(true);
  };
  //-----Modal da Filtreleye basildiginda belirtilen araligi donduren fonksiyon
  const handleOk = async () => {
    setLoading(true);

    setFilteredData(selectedRows);

    try {
      const newStartDate = selectedDateRange[0];
      const newEndDate = selectedDateRange[1];
      const response = await axios.get(
        `${baseUrl}/${newStartDate}/${newEndDate}`
      );
      const mapSeperated = mapToSeparateArray(response.data);
      console.log(mapSeperated);
      setFilteredData(mapSeperated);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  //----Modal da vazgec buttonu
  const handleCancel = () => {
    setOpen(false);
  };
  //---Modaldaki tabledan ve tarihlerden alinan veri icin fonksiyon
  const handleFilterChange = (filteredData, dateRange) => {
    setSelectedDateRange(dateRange);
    setSelectedRows(filteredData);
  };
  //-----Tarihi sifirlayan metod
  const handleClear = () => {
    setSelectedRows([]);
    setStartDate("01.01.2015");
    setEndDate("01.01.2025");
  };
  const filterDataBySearch = () => {
    if (!searchQuery) {
      // Arama sorgusu yoksa, tüm veriyi göster
      setFilteredData(separateArray);
    } else {
      // Arama sorgusu varsa, sayacAdi'na göre filtrele
      const filtered = filteredData.filter((item) =>
        item.sayacAdi.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };
  useEffect(() => {
    filterDataBySearch();
  }, [searchQuery, dataArray]);
  const onRowClick = (item) => {
    navigate(`/all-read-indexes/${item.aboneNo}`);
  };
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <PageHeader currentUrl={pathname} />
          <Modal
            open={open}
            title="Filtreleme Ekrani"
            onOk={handleOk}
            onCancel={handleCancel}
            width={1200}
            footer={[
              <Button
                key="cancel"
                type="primary"
                style={{
                  backgroundColor: "#e84749",
                  margin: "20px 20px 0 0px ",
                  padding: "0em 5em",
                }}
                loading={loading}
                onClick={handleCancel}
              >
                Vazgec
              </Button>,
              <Button
                key="submit"
                type="primary"
                style={{
                  backgroundColor: "#0A51AB",
                  margin: "0 0px 0 0px ",
                  padding: "0em 5em",
                }}
                loading={loading}
                onClick={handleOk}
              >
                Filtrele
              </Button>,
            ]}
          >
            <InputFilter
              dataSource={separateArray}
              onFilterChange={handleFilterChange}
            />
          </Modal>
          <MainContainer>
            <div className={styles["filter-buttons"]}>
              <ButtonInput onClick={showModal}>
                <FaFilter />
                Filtrele
              </ButtonInput>
              <ButtonInput>
                <FaFileExport />
                Cikart
              </ButtonInput>
              <ButtonInput>
                <FaListAlt />
                Sutunlari Goster
              </ButtonInput>
              <ButtonInput onClick={handleClear}>
                <GrClearOption />
                Temizle
              </ButtonInput>
              <InputSearch
                className={styles["input-style"]}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Arama yapın..."
              />
            </div>
            <TableContainer>
              <Table>
                <thead>
                  <TableHead tableHead={tableHead} />
                </thead>
                <tbody>
                  <RenderTableRows
                    currentItems={currentItems}
                    onRowClick={onRowClick}
                  />
                </tbody>
              </Table>
            </TableContainer>
            <RenderPaginationButtons
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              length={filteredData ? filteredData : dataArray}
            />
          </MainContainer>
        </>
      )}
    </>
  );
};

export default AllReadIndexesPage;
