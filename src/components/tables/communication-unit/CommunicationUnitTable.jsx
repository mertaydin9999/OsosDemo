import { useState, useEffect } from "react";
import MainContainer from "../../containers/main-container/MainContainer";
import { useNavigate } from "react-router-dom";
import TableContainer from "../../containers/table-container/TableContainer";
import Table from "../../UI/table/Table";
import TableHead from "../../UI/table/TableHead";
import InputSearch from "../../UI/input/InputSearch";
import RenderPaginationButtons from "../../pagination/Pagination";
import RenderCommUnitTableRows from "./RenderCommUnitTableRows";
import ButtonInput from "../../UI/button/ButtonInput";
import { FaFileExport } from "react-icons/fa6";

const CommunicationUnitTable = ({
  tableHeads,
  searchValue,
  inputData,
  communicationUnit,
  deleteCommunicationUnit,
}) => {
  const [dataArray, setDataArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValues, setSearchValues] = useState(searchValue);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  console.log(communicationUnit);
  useEffect(() => {
    setDataArray(communicationUnit || []);
    setFilteredData(communicationUnit || []);
  }, [communicationUnit]);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(filteredData)
    ? filteredData?.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = Array.isArray(filteredData)
    ? Math.ceil(filteredData?.length / itemsPerPage)
    : 0;

  useEffect(() => {
    const filtered = dataArray?.filter((item) => {
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
      <MainContainer>
        <div
          style={{
            margin: "1em 0em",
            display: "flex",
            gap: "0em 1em",
          }}
        >
          <ButtonInput>
            <FaFileExport />
            Yeni Kayit
          </ButtonInput>
          <ButtonInput>Cikart</ButtonInput>
          <ButtonInput>Silinmiş Haberleşme Ünitelerine Git</ButtonInput>
          <ButtonInput>Yapılan İşlemlere Git</ButtonInput>
        </div>
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
              <RenderCommUnitTableRows
                currentItems={currentItems}
                onRowClick={onRowClick}
                deleteCommunicationUnit={deleteCommunicationUnit}
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
  );
};

export default CommunicationUnitTable;
