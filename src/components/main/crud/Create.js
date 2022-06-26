import React, { Component } from 'react';
import firebase from '../../../firebase/firebase.js';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('mahasiswas');
    this.state = {
      nim: '',
      nama: '',
      alamat: '',
      tahunangkatan: '',
      status: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nim, nama, alamat, tahunangkatan, status } = this.state;

    this.ref.add({
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
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { nim, nama, alamat, tahunangkatan, status } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Add Mahasiswa
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Mahasiswa List | Create</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="nim">NIM:</label>
                <input type="text" class="form-control" name="nim" value={nim} onChange={this.onChange} placeholder="NIM" />
              </div>
              <div class="form-group">
                <label for="nama">Nama:</label>
                <input type="text" class="form-control" name="nama" value={nama} onChange={this.onChange} placeholder="Nama" />
              </div>
              <div class="form-group">
                <label for="alamat">Alamat:</label>
                <textArea class="form-control" name="alamat" onChange={this.onChange} placeholder="Alamat" cols="80" rows="3">{alamat}</textArea>
              </div>
              <div class="form-group">
                <label for="tahunangkatan">Tahun Angkatan:</label>
                <input type="text" class="form-control" name="tahunangkatan" value={tahunangkatan} onChange={this.onChange} placeholder="Tahun Angkatan" />
              </div>
              <div class="form-group">
                <label for="status">Status:</label>
                <input type="text" class="form-control" name="status" value={status} onChange={this.onChange} placeholder="Status" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
