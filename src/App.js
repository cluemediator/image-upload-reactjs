import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:4000/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      handleResponse: null,
      imageUrl: null
    };
  }

  onChangeFile = event => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  handleUpload = () => {
    const { selectedFile } = this.state;
    if (!selectedFile) {
      this.setState({
        handleResponse: {
          isSuccess: false,
          message: "Please select image to upload."
        }
      });
      return false;
    }
    const formData = new FormData();
    formData.append('dataFile', selectedFile, selectedFile.name);
    axios.post(BASE_URL + 'uploadfile', formData).then(response => {
      this.setState({
        handleResponse: {
          isSuccess: response.status == 200,
          message: response.data.message
        },
        imageUrl: response.data.file.path
      });
    }).catch(err => {
      alert(err.message);
    });
  }

  render() {
    const { handleResponse, imageUrl } = this.state;
    return (
      <div className="App" >
        <h4>Image Upload in ReactJS - Clue Mediator</h4>

        <p className="title">Select Image:</p>
        <div style={{ marginBottom: 10 }}>
          <input type="file" onChange={this.onChangeFile} />
        </div>
        <input type="button" value="Upload" onClick={this.handleUpload} />
        {handleResponse && <p className={handleResponse.isSuccess ? "success" : "error"}>{handleResponse.message}</p>}

        <p className="title" style={{ marginTop: 30 }}>Uploaded Image:</p>
        {imageUrl && <img src={BASE_URL + imageUrl} height="100" width="100" />}
      </div>
    );
  }
}

export default App;
