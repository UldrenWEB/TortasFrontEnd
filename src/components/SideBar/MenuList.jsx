import { Menu } from "antd";
import { transformData } from "./dataHandler";

const MenuList = ({ darkTheme, data = [], navigate }) => {
  const items = transformData(data);

  const handleClick = ({ key }) => navigate(key);

  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="menu-bar"
      items={items}
      onClick={handleClick}
    />
  );
};

export default MenuList;
