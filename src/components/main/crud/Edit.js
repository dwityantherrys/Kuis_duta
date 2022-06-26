import React, { Component } from 'react';
import firebase from '../../../firebase/firebase.js';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nim: '',
      nama: '',
      alamat: '',
      tahunangkatan: '',
      status: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('mahasiswas').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const mahasiswas = doc.data();
        this.setState({
          key: doc.id,
          nim: mahasiswas.nim,
          nama: mahasiswas.nama,
          alamat: mahasiswas.alamat,
          tahunangkatan: mahasiswas.tahunangkatan,
          status: mahasiswas.status
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({mahasiswas:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nim, nama, alamat, tahunangkatan, status } = this.state;

    const updateRef = firebase.firestore().collection('mahasiswas').doc(this.state.key);
    updateRef.set({
      nim,
      nama,
      alamat,
      tahunangkatan,
      status
    }).then((docRef) => {
      this.setState({
        nim: '',
        nama: '',
        alamat: '',
        tahunangkatan: '',
        status: ''
      });
      this.props.history.push("/crud/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Edit Mahasiswa
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/${this.state.key}`} class="btn btn-primary">Mahasiswa List | Edit</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="nim">NIM:</label>
                <input type="text" class="form-control" name="nim" value={this.state.nim} onChange={this.onChange} placeholder="NIM" />
              </div>
              <div class="form-group">
                <label for="nama">Nama:</label>
                <input type="text" class="form-control" name="nama" value={this.state.nama} onChange={this.onChange} placeholder="Nama" />
              </div>
              <div class="form-group">
                <label for="alamat">Alamat:</label>
                <input type="text" class="form-control" name="alamat" value={this.state.alamat} onChange={this.onChange} placeholder="Alamat" />
              </div>
              <div class="form-group">
                <label for="tahunangkatan">Tahun Angkatan:</label>
                <input type="text" class="form-control" name="tahunangkatan" value={this.state.tahunangkatan} onChange={this.onChange} placeholder="Tahun Angkatan" />
              </div>
              <div class="form-group">
                <label for="status">Status:</label>
                <input type="text" class="form-control" name="status" value={this.state.status} onChange={this.onChange} placeholder="Status" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
