import './Navbar.css';
import { logoutUser } from '../../actions/auth';

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <div className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>

      <div className="navbar__left">
        <a href="#" className="active_link">
          List Mahasiswa
        </a>
      </div>

      <div className="navbar__right">
        <a href="#">
          <img width="30" src="avatar.jpg" alt="avatar" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
