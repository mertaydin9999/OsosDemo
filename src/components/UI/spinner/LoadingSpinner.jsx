import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingSpinner = ({ className }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  return (
    <div
      className={className}
      style={{ textAlign: "center", margin: "30em 0em" }}
    >
      <Spin indicator={antIcon} />
    </div>
  );
};

export default LoadingSpinner;
