import React, { useState, useEffect } from "react";
import InputFilter from "../../UI/input/InputSearch";
import RenderPaginationButtons from "../../pagination/Pagination";
import TableHead from "../../UI/table/TableHead";
import RenderUsersTable from "../users-table/RenderUsersTable";
import RenderCustomersTable from "../customers-table/RenderCustomersTable";
import MainContainer from "../../containers/main-container/MainContainer";
import TableContainer from "../../containers/table-container/TableContainer";
import Table from "../../UI/table/Table";
import { useLocation } from "react-router-dom";
import UsersAddFormContainer from "../../containers/users-add-form-container/UsersAddFormContainer";
const UsersCustomersDataTable = ({
  tableHeads,
  searchValue,
  inputData,
  users,
  customers,
  addUser,
  addCustomer,
  deleteUser,
  deleteCustomer,
}) => {
  const [dataArray, setDataArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValues, setSearchValues] = useState(searchValue);
  const [isEdit, setIsEdit] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [userData, setUserData] = useState([]);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/users") {
      setDataArray(users || []);
    } else {
      setDataArray(customers || []);
    }
  }, [pathname, customers, users]);
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
  const currentItems = Array.isArray(filteredData)
    ? filteredData?.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = Array.isArray(filteredData)
    ? Math.ceil(filteredData?.length / itemsPerPage)
    : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchValues({
      ...searchValues,
      [name]: value,
    });
  };
  useEffect(() => {
    setUsersData(users);
  }, []);

  const onRowClick = (item, bool) => {
    if (bool) {
      setIsEdit(true);
      setUserData(item);
    } else {
      setIsEdit(false);
    }
    setUserData(item);
  };
  useEffect(() => {
    setFilteredData(dataArray || []);
  }, [dataArray]);
  return (
    <>
      {isEdit && (
        <UsersAddFormContainer
          setIsEdit={setIsEdit}
          userData={userData}
          dataArray={dataArray}
          setDataArray={setDataArray}
          addUser={addUser}
          addCustomer={addCustomer}
        />
      )}

      <MainContainer>
        <div style={{ margin: "1em 0em" }}>
          {pathname === "/customers" ? (
            <button onClick={() => onRowClick(0, true)}>
              Yeni Musteri Olustur
            </button>
          ) : (
            <button onClick={() => onRowClick(1, true)}>
              Yeni Kullanici Olustur
            </button>
          )}
        </div>
        <TableContainer>
          <Table>
            <thead>
              <TableHead tableHead={tableHeads} />
              <tr>
                {inputData.map((item, index) => (
                  <th key={index}>
                    <InputFilter
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
              {pathname === "/customers" ? (
                <RenderCustomersTable
                  currentItems={currentItems}
                  deleteCustomer={deleteCustomer}
                />
              ) : (
                <RenderUsersTable
                  currentItems={currentItems}
                  deleteUser={deleteUser}
                />
              )}
            </tbody>
          </Table>
        </TableContainer>

        <RenderPaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          length={dataArray}
          setCurrentPage={setCurrentPage}
        />
      </MainContainer>
    </>
  );
};

export default UsersCustomersDataTable;
