import { useNavigate } from 'react-router-dom';
import LayoutSider from '../components/LayoutSider';

const Sidebar = props => {

  const { collapsed, className } = props;

  const navigator = useNavigate();

  const handleItemClick = (item) => {
    const { keyPath } = item;
    const path = '/' + keyPath.reverse().join('/');
    navigator(path)
  }

  return (
    <>
      <LayoutSider
        className={className}
        siderType="Sidebar"
        siderTheme="dark"
        collapsed={collapsed}
        handleItemClick={handleItemClick}
      />
    </>
  );
}

export default Sidebar;