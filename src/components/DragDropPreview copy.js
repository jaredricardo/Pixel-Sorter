import React, {useEffect, useState, Fragment} from 'react';
import {useDropzone} from 'react-dropzone';
import '../App.css'




function DragDropPreview(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const imagePreview = files.map(file => (
    <div key={file.name}>
      <div className="dropped-image">
        <img
          src={file.preview}
        />
        
      </div>
    </div>
  ));



  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div> 
        <div>
            <section className="container">
            <div {...getRootProps({className: 'dropzone drop-area'})}>
                <input {...getInputProps()} />
                <p> Drag and drop a photo or click to select files</p>
            </div>
            </section>
        </div>
 

        <div className="image-container">
            {imagePreview}
        </div>

        <div>
            
        </div>
    </div>

  );
}

export default DragDropPreview