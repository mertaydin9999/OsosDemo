import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { mapToSeparateArray } from "../../utils/dataFunctions";
import styles from "./AllReadIndexesDetailPage.module.css";
import { ayGetir } from "../../utils/dataFunctions";
import RenderIndexDetail from "../../components/tables/index-detail-table/RenderIndexDetail";
import SelectComponent from "../../components/select/SelectComponent";
import LineChartComponent from "../../components/charts/LineChartComponent";
import BarChartComponent from "../../components/charts/BarChartComponent";
import { groupDataByDate } from "../../utils/chartFunction";
import PieChartComponent from "../../components/charts/PieChartComponent";
import { RiArrowGoBackFill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import MainContainer from "../../components/containers/main-container/MainContainer";
import AllReadIndexesDetailContainer from "../../components/containers/detail-container/AllReadIndexesDetailContainer";
const baseUrl = "http://10.0.0.101:8088/Makel/OsosApi/Sayac/SayacAyGecisEndeks";
const MeterChart = () => {
  const [chartData, setChartData] = useState([]);
  const { id } = useParams();
  const [aboneData, setAboneData] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    chartType: "Line",
    dataType: "aktif",
    year: 2023,
    chartStyle: "Cizgili",
  });
  const navigate = useNavigate();
  const goBackClick = () => {
    navigate("/all-read-indexes");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/01.01.2015/03.15.2024`);
        setAboneData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = aboneData.filter((item) => item.aboneNo === id);
    setChartData(filteredData);
  }, [id, aboneData]);
  useEffect(() => {
    if (uniqueYears.length > 0) {
      setSelectedOption((prevState) => ({
        ...prevState,
        year: uniqueYears[0], // unique years dizisinin ilk elemanını atıyoruz
      }));
    }
  }, []);

  const seperatedArray = mapToSeparateArray(chartData).filter(
    (item) => item.donemYil === parseInt(selectedOption.year)
  );

  const transformedData = seperatedArray.map((item) => ({
    aboneNo: item.aboneNo,
    [selectedOption.dataType]: item[selectedOption.dataType.toString()],
    donemAy: ayGetir(item.donemAy),
  }));

  const handleSelectChange = (key, value) => {
    setSelectedOption((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const years = chartData[0]?.sayacGecmisEndeks?.map((item) => item.donemYil);
  const uniqueYears = [...new Set(years)];

  const groupedData = groupDataByDate(chartData, selectedOption, uniqueYears);
  console.log(groupedData);

  const calculateTotalByProperty = (dataArray, propertyName) => {
    let total = 0;

    dataArray.forEach((item) => {
      total += item[propertyName];
    });

    return total.toFixed(1);
  };
  const totalData = calculateTotalByProperty(
    groupedData,
    selectedOption.dataType
  );

  const color = totalData > 7000 ? "green" : "red";
  const allGraphs = () => {
    return (
      <>
        <div className={styles.allgraphics}>
          <div>
            <LineChartComponent
              transformedData={transformedData}
              selectedOption={selectedOption}
            />
          </div>
          <div>
            <BarChartComponent
              transformedData={transformedData}
              selectedOption={selectedOption}
            />
          </div>
          <div>
            <PieChartComponent
              transformedData={groupedData}
              selectedOption={selectedOption}
            />
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className={styles["header-div"]}>
        <h2>Sayac Endeks Detay Sayfasi</h2>
      </div>

      <AllReadIndexesDetailContainer>
        <RenderIndexDetail chartData={chartData} />
      </AllReadIndexesDetailContainer>

      <div className={styles["dropdowns-container"]}>
        <div>
          Stil Secimi
          <SelectComponent
            options={["Cizgili", "Kareli"]}
            onSelect={(value) => handleSelectChange("chartStyle", value)}
          />
        </div>
        <div>
          Veri Secimi
          <SelectComponent
            options={[
              "aktif",
              "enduktif",
              "tarife1",
              "tarife2",
              "tarife3",
              "maxDemand",
            ]}
            onSelect={(value) => handleSelectChange("dataType", value)}
          />
        </div>
        <div>
          Yil Secimi
          <SelectComponent
            options={uniqueYears}
            onSelect={(value) => handleSelectChange("year", value)}
          />
        </div>
        <div>
          Grafik Secimi
          <SelectComponent
            options={["Line", "Bar", "Pie", "Hepsi"]}
            onSelect={(value) => handleSelectChange("chartType", value)}
          />
        </div>
        <div style={{ fontSize: "1.2em" }}>
          {`Toplam ${selectedOption.dataType}: `}{" "}
          <span
            style={{
              backgroundColor: color,
              borderRadius: ".3em",
              color: "#f6f6f6",
              padding: ".3em",
            }}
          >
            {totalData}
          </span>
        </div>
        <div onClick={goBackClick} className={styles["go-back-indexes"]}>
          <span>Endekslere Geri Don</span>
          <RiArrowGoBackFill
            style={{
              fontSize: "2em",
            }}
          />
        </div>
      </div>
      <MainContainer>
        {selectedOption.chartType === "Line" ? (
          <div className={styles["single-chart"]}>
            <LineChartComponent
              transformedData={transformedData}
              selectedOption={selectedOption}
            />
          </div>
        ) : selectedOption.chartType === "Bar" ? (
          <div className={styles["single-chart"]}>
            <BarChartComponent
              transformedData={transformedData}
              selectedOption={selectedOption}
            />
          </div>
        ) : selectedOption.chartType === "Pie" ? (
          <div className={styles["single-chart"]}>
            <PieChartComponent
              transformedData={groupedData}
              selectedOption={selectedOption}
            />
          </div>
        ) : (
          allGraphs()
        )}
      </MainContainer>
    </>
  );
};

export default MeterChart;
