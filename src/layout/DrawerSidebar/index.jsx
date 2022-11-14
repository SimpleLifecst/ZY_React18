import { useNavigate } from 'react-router-dom';
import { Drawer } from 'antd';
import LayoutSider from '../components/LayoutSider';

const bodyStyle = {
  padding: "0",
  backgroundColor: "#ffffff",
  overflowX: 'hidden'
}

const DrawerSidebar = (props) => {

  const { collapsed, setCollapsed, className } = props;
  const navigator = useNavigate();

  const handleCloseDrawer = () => {
    setCollapsed(false);
  };

  const handleItemClick = (item) => {
    const { keyPath } = item;
    const path = '/' + keyPath.reverse().join('/');
    navigator(path)
    handleCloseDrawer()
  }

  return (
    <Drawer
      width="200px"
      placement="left"
      closable={false}
      onClose={handleCloseDrawer}
      open={collapsed}
      className={className}
      bodyStyle={bodyStyle}
    >
      <LayoutSider className={className} siderType="DrawerSidebar" siderTheme="light" handleItemClick={handleItemClick} />
    </Drawer>
  );
};
export default DrawerSidebar;