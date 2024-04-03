import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
const RenderUsersTable = ({ currentItems, deleteUser }) => {
  return currentItems.map((item, index) => (
    <tr key={index}>
      <td>{item.username}</td>
      <td>{item.firstName}</td>
      <td>{item.charge}</td>
      <td>{item.firstName}</td>
      <td>{item.description}</td>
      <td>{item.mail}</td>
      <td>{item.phone}</td>
      <td>{item.onayliMi ? <CheckOutlined /> : <CloseOutlined />}</td>
      <td>{item.kilitliMi ? <CheckOutlined /> : <CloseOutlined />}</td>
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
          onClick={() => deleteUser(item.id)}
        >
          Sil
        </button>
      </td>
    </tr>
  ));
};

export default RenderUsersTable;
