import React, { Component } from 'react';
import firebase from '../../../firebase/firebase.js';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mahasiswas: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('mahasiswas').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          mahasiswas: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('mahasiswas').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">Mahasiswa List</Link></h4>
            <h3 class="panel-title">
              {this.state.mahasiswas.nim}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>NIM:</dt>
              <dd>{this.state.mahasiswas.nim}</dd>
              <dt>Nama:</dt>
              <dd>{this.state.mahasiswas.nama}</dd>
              <dt>Alamat:</dt>
              <dd>{this.state.mahasiswas.alamat}</dd>
              <dt>Tahun Angkatan:</dt>
              <dd>{this.state.mahasiswas.tahunangkatan}</dd>
              <dt>Status:</dt>
              <dd>{this.state.mahasiswas.status}</dd>
            </dl>
            <Link to={`/crud/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;