import React from "react";

const RenderCommUnitTableRows = ({
  currentItems,
  onRowClick,
  deleteCommunicationUnit,
}) => {
  return currentItems.map((item, index) => (
    <tr key={index} onClick={() => deleteCommunicationUnit(item.id)}>
      <td>{item.name}</td>
      <td>{item.seriNo}</td>
      <td>{item.phoneNumber}</td>
      <td>{item.communicationType}</td>
      <td>{item.model}</td>
      <td>{item.description}</td>
      <td>{item.networkMode}</td>
      <td
        style={{
          display: "flex",
          gap: "1em",
        }}
      >
        <button
          style={{
            fontSize: "1em",
          }}
        >
          Duzenle
        </button>
        <button
          style={{
            backgroundColor: "rgb(200, 54, 54)",
            fontSize: "1em",
          }}
          onClick={() => deleteUser(item.id)}
        >
          Sil
        </button>
      </td>
    </tr>
  ));
};

export default RenderCommUnitTableRows;
