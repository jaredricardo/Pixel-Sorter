import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class DragDrop extends Component {
  constructor() {
    super();
    this.onDrop = (files) => {
      this.setState({files})
    };
    this.state = {
      files: []
    };
  }



  render() {

    const preview = this.state.files.map(file => (
        <div key={file.name}>
        <div className="dropped-image">
           <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
            <img src={file.preview} />
        </div>
      </div>
    ))


    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps}) => (
          <section className="container">
            <div {...getRootProps({className: 'dropzone drop-area'})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
             {preview}
            </aside>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default DragDrop