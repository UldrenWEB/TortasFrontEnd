import { Layout } from "antd";
import MenuList from "./MenuList";
import ButtonSide from "./ButtonSide";
import ToggleThemeButton from "./ToggleThemeButton";
import InfoUser from "./InfoUser";
import '../../styles/SideBar.css';
const { Sider } = Layout;

const SideBar = ({
  darkTheme,
  changeTheme,
  collapsed,
  infoUser,
  infoMethod,
  changeCollapsed,
  navigate,
}) => {
  const stopPropg = (e) => {
    e.stopPropagation();
  };

  const { name, profile, avatar } =  infoUser || {}; 

  return (
    <Sider
      onClick={stopPropg}
      className="sidebar"
      theme={darkTheme ? "dark" : "light"}
      collapsed={collapsed}
      collapsible
      trigger={null}
      width={300}
    >
      <ButtonSide
        collapsed={collapsed}
        changeCollapsed={changeCollapsed}
        darkTheme={darkTheme}
      />
      <InfoUser collapsed={collapsed} name={name} profile={profile} avatar={avatar}/>

      <MenuList darkTheme={darkTheme} data={infoMethod} navigate={navigate} />

      <ToggleThemeButton darkTheme={darkTheme} toggleTheme={changeTheme} />
    </Sider>
  );
};

export default SideBar;