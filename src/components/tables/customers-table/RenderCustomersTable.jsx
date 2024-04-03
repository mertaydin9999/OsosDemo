const RenderCustomersTable = ({ currentItems, deleteCustomer }) => {
  return currentItems?.map((item, index) => (
    <tr key={index}>
      <td>{item.customerName}</td>
      <td>{item.location}</td>
      <td>{item.contactFirstName}</td>
      <td>{item.contactLastName}</td>
      <td>{item.contactTcNo}</td>
      <td>{item.contactEmail}</td>
      <td>{item.contactPhone}</td>
      <td>{item.address}</td>
      <td>{item.description}</td>
      <td
        style={{
          display: "flex",
          gap: "1em",
        }}
      >
        <button>Duzenle</button>
        <button
          style={{
            backgroundColor: "rgb(200, 54, 54)",
          }}
          onClick={() => deleteCustomer(item.id)}
        >
          Sil
        </button>
      </td>
    </tr>
  ));
};

export default RenderCustomersTable;
