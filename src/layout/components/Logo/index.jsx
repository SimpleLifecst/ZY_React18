import "animate.css";
import logo from '../../../assets/logo192.png'

export default function Logo(props) {
  const { collapsed } = props;
  return (
    <div className="logo sidebar-logo animated bounce">
      {
        !collapsed ? <span id="title" className='logo-title animated slideInLeft'>后台管理项目</span> : <img className="animated bounce" src={logo} />
      }
    </div >
  )
}
