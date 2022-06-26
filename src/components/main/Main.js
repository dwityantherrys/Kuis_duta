import './Main.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
// import '../../App.css';
import firebase from '../../firebase/firebase.js';
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('mahasiswas');
    this.unsubscribe = null;
    this.state = {
      mahasiswas: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const mahasiswas = [];
    querySnapshot.forEach((doc) => {
      const { nim, nama, alamat, tahunangkatan, status } = doc.data();
      mahasiswas.push({
        key: doc.id,
        doc, // DocumentSnapshot
        nim,
        nama,
        alamat,
        tahunangkatan,
        status,
      });
    });
    this.setState({
      mahasiswas,
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  openSidebar = () => {
    const [sidebarOpen, setSidebarOpen] = false;
    const { dispatch } = this.props;
    const openSidebar = () => {
      setSidebarOpen(true);
    };
    dispatch(openSidebar());
  };

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };
  render() {
    const { isLoggingOut, logoutError } = this.props;
    return (
      <div class="container">
        <Navbar sidebarOpen={this.openSidebar} openSidebar={this.openSidebar} />
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Mahasiswa LIST</h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to="./crud/create" class="btn btn-primary">
                Add Mahasiswa
              </Link>
            </h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>NIM</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Tahun Angkatan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {' '}
                {this.state.mahasiswas.map((mahasiswas) => (
                  <tr>
                    <td>
                      <Link to={`./crud/show/${mahasiswas.key}`}>
                        {mahasiswas.nim}
                      </Link>
                    </td>
                    <td>{mahasiswas.nama}</td>
                    <td>{mahasiswas.alamat}</td>
                    <td>{mahasiswas.tahunangkatan}</td>
                    <td>{mahasiswas.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h1>This is your app's protected area.</h1>
            <p>Any routes here will also be protected</p>
            <button onClick={this.handleLogout}>Logout</button>
            {isLoggingOut && <p>Logging Out....</p>}
            {logoutError && <p>Error logging out</p>}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}
export default connect(mapStateToProps)(Main);
