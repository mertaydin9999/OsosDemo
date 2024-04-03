import { useState, useEffect } from "react";
import axios from "axios";
import InputSearch from "../../UI/input/InputSearch";
import RenderPaginationButtons from "../../pagination/Pagination";
import RenderMeterTableRows from "./RenderMeterTableRows";
import { useNavigate } from "react-router-dom";
import TableHead from "../../UI/table/TableHead";
import LoadingSpinner from "../../UI/spinner/LoadingSpinner";
import PageHeader from "../../page-header/PageHeader";
import MainContainer from "../../containers/main-container/MainContainer";
import TableContainer from "../../containers/table-container/TableContainer";
import Table from "../../UI/table/Table";
const MeterTable = ({ url, tableHeads, searchValue, inputData }) => {
  const [dataArray, setDataArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValues, setSearchValues] = useState(searchValue);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const itemsPerPage = 10;
  const totalPages = Math.ceil(dataArray.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setDataArray(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const filtered = dataArray.filter((item) => {
      for (let key in searchValues) {
        const searchValue = searchValues[key].toLowerCase();
        const itemValue = item[key] ? item[key].toString().toLowerCase() : ""; // Eğer item[key] null ise, boş bir string olarak kabul edilir
        if (searchValue && !itemValue.startsWith(searchValue)) {
          return false;
        }
      }
      return true;
    });
    setFilteredData(filtered);
  }, [searchValues]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchValues({
      ...searchValues,
      [name]: value,
    });
  };
  const onRowClick = (item) => {
    console.log(item);
    navigate("/");
  };
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <MainContainer>
            <TableContainer>
              <Table>
                <thead>
                  <TableHead tableHead={tableHeads} />
                  <tr>
                    {inputData.map((item, index) => (
                      <th key={index}>
                        <InputSearch
                          type="text"
                          name={item.name}
                          placeholder={item.placeholder}
                          value={searchValues[item.value]}
                          onChange={handleInputChange}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <RenderMeterTableRows
                    currentItems={currentItems}
                    onRowClick={onRowClick}
                  />
                </tbody>
              </Table>
            </TableContainer>
            <RenderPaginationButtons
              currentPage={currentPage}
              totalPages={totalPages}
              length={filteredData ? filteredData : dataArray}
              setCurrentPage={setCurrentPage}
            />
          </MainContainer>
        </>
      )}
    </>
  );
};

export default MeterTable;
