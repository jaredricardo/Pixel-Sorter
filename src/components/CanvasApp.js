import React, { Component } from 'react'
import { test, nativeSort_COL2x, nativeSort_COL, nativeSort } from "./functions"
import Spinner from 'react-bootstrap/Spinner';
import { Row, Col, Container, button } from "react-bootstrap"



export class CanvasApp extends Component {
    constructor(props) {
        super(props)
        this.imageRef = React.createRef()
        this.canvasRef1 = React.createRef()
        this.canvasRef2 = React.createRef()
        this.state = {
            currentImageSrc: null,
            imageFileSize: null,
            imageFileName: null,
            imageHeight: null,
            imageWidth: null,
            imageSelected: false,
            imageSorted: false,
            // imageLoading: false, 
            currentSort: 'test'
        }
    }

      
    // drawNewImage = () => {
    //     this.setState({
    //         imageLoading: true
    //     }, this.resetLoading)
    // }

    sortThePixels = () => {

        if(!this.state.imageSelected) return alert("please load an image")

        const algo = this.state.currentSort
        const canvas = this.canvasRef2.current
        const ctx = canvas.getContext("2d")
        let copyData = ctx.getImageData(0,0, canvas.width, canvas.height)

        if(algo === 'test') {
            copyData = test(copyData.data, this.state.imageHeight, this.state.imageWidth)
        } 
        if(algo === 'nativeSort_COL_2x') {
            copyData = nativeSort_COL2x(copyData.data, this.state.imageHeight, this.state.imageWidth)
        } 
        if(algo === 'nativeSort_COL') {
            copyData = nativeSort_COL(copyData.data, this.state.imageHeight, this.state.imageWidth)
        } 
        if(algo === 'nativeSort') {
            copyData = nativeSort(copyData.data, this.state.imageHeight, this.state.imageWidth)
        } 
        ctx.putImageData(copyData,0 ,0)

        this.setState({
            imageSorted: true
        })
    }


    setSortOption = (e) => {
        this.setState({
            currentSort: e.target.value,
        })
    }

    imageLoadHandler = (e) => {

        if(e.target.files[0].size > 104857600) return alert("File size exceeds 100MB") 

        const canvas1 = this.canvasRef1.current
        const ctx = canvas1.getContext("2d")
        
        const canvas2 = this.canvasRef2.current
        const ctx2 = canvas2.getContext("2d")

        const reader = new FileReader()
        const img = new Image()

        reader.onload = (secondEvent) => {
           
            img.onload = () => {
                const fileSize = (bytes) => {
                    const mb = (bytes / 1000000).toFixed(1) + 'MB'
                    const kb = (bytes / 1000).toFixed(1) + "KB"
                    const digits = bytes.toString().length 
                    return digits >= 7 ? mb : kb 
                }

                canvas1.width = img.width
                canvas1.height = img.height

                canvas2.width = img.width
                canvas2.height = img.height

                ctx.drawImage(img,0,0)
                ctx2.drawImage(img,0,0)

                this.setState({
                        currentImageSrc: secondEvent.target.result,
                        imageFileSize: fileSize(e.target.files[0].size),
                        imageFileName: e.target.files[0].name,
                        imageHeight: img.height,
                        imageWidth: img.width,
                        imageSelected: true,
                        imageSorted: false
                    })
                }
            img.src = secondEvent.target.result;
        }
        reader.readAsDataURL(e.target.files[0])
    }

    resetImage = () => {
        if(!this.state.imageSelected) return alert('No image selected')
        if(!this.state.imageSorted) return alert('Image already reset')
        const canvas = this.canvasRef2.current
        const ctx = canvas.getContext("2d")
        const img = new Image()

        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img,0,0)   
        }
        img.src = this.state.currentImageSrc
        this.setState({
            imageSorted: false
        })
    }

    downloadImage = () => {
        if(!this.state.imageSorted) return alert("Image must be sorted before downloading")
        const link = document.createElement('a')
        link.download = "sorted " + this.state.imageFileName 
        link.href = this.canvasRef2.current.toDataURL()
        link.click()
    }

    render() {
        
        const maxStyle = {
            maxHeight: '700px',
            width: 'auto' 
        }

        const trigger = {
            visibility: (this.state.imageSelected) ? 'visible' : 'hidden',
            textAlign: 'center'
            
        }

        return (
            <Container fluid className="ghost-body"> 
                <Row> 
                    <Col className="p-0" md={12} lg={6}> 
                        <div className="top-margin text-center">
                            <input type="file" accept="image/*" ref={this.uploadedRef} onChange={this.imageLoadHandler} />

                            <select name="options" id="sort-options" onChange={this.setSortOption}>
                                <option value="test">Test</option>
                                <option value="nativeSort_COL_2x">Columned Native Sort x 2</option>
                                <option value="nativeSort_COL">Columned Native Sort</option>
                                <option value="nativeSort">Native Sort</option>
                            </select>
                        </div> 
                    </Col>
                    <Col className="p-0" md={12} lg={6}>
                        <div className="text-center top-margin">
                            <button className="btn btn-primary" onClick={this.sortThePixels}>
                                Sort Image
                                {/* {this.checkLoading()} */}
                            </button>

                            <button className="btn btn-primary" onClick={this.resetImage}>
                                Reset Image
                            </button>

                            <button className="btn btn-primary" onClick={this.downloadImage}> 
                                Download 
                            </button>
                        </div>                       
                    </Col>   
                </Row>

                <Row className="justify-content-center">

                    <Col className="flex-grow-0">
                        <p style={trigger}> Original </p>
                        <canvas ref={this.canvasRef1} style={maxStyle}/>
                    </Col>

                    <Col className="flex-grow-0">
                        <p style={trigger}> Sorted </p>
                        <canvas ref={this.canvasRef2} style={maxStyle}/>
                    </Col>

                </Row>           
            </Container>
        )
    }
}


export default CanvasApp
