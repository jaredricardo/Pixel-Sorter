import React, { Component } from 'react'
import '../App.css'
import testImage from "./test-images/200.jpg"
import DragDropPreview from './DragDropPreview'
import { sortByRed, sortByGreen, sortByBlue, test } from "./functions"

export class CanvasApp extends Component {
    constructor(props) {
        super(props)
        this.imageRef = React.createRef()
        this.canvasRef = React.createRef()
        this.state = {
             imageHeight: null,
             imageWidth: null,
             currentSort: 'test'
        }
    }

    componentDidMount() {
        const canvas = this.canvasRef.current
        const img = this.imageRef.current
     
        const ctx = canvas.getContext("2d")

        canvas.height = 200
        canvas.width = 200

        img.onload = () => {
            ctx.drawImage(img, 0, 0)
            
          }
        this.setState({
            imageHeight:canvas.height,
            imageWidth:canvas.width
        })  
      }
      
    drawNewImage = () => {
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext("2d")
        let copyData = ctx.getImageData(0,0, canvas.width, canvas.height)
        ctx.putImageData(copyData, 0, 0)

        if(this.state.currentSort === 'sortByRed') {
            copyData = sortByRed(copyData.data, this.state.imageHeight, this.state.imageWidth)
        }
        if(this.state.currentSort === 'sortByGreen') {
            copyData = sortByGreen(copyData.data, this.state.imageHeight, this.state.imageWidth)
        }
        if(this.state.currentSort === 'sortByBlue') {
            copyData = sortByBlue(copyData.data, this.state.imageHeight, this.state.imageWidth)
        } 
        if(this.state.currentSort === 'test') {
            copyData = test(copyData.data, this.state.imageHeight, this.state.imageWidth)
        } 

        ctx.putImageData(copyData,0 ,0 )
    }

    setOption = (e) => {
        this.setState({
            currentSort: e.target.value
        })
    }

    
    render() {

        const hiddenStyle = {
            display: "none"
        }

        const convertedStyle = {
            border: "1px solid red"
        }

        return (
            <div> 
                
                <button onClick={this.drawNewImage}>
                    test
                </button>
                <select name="options" id="sort-options" onChange={this.setOption}>
                    <option value="sortByRed">Sort by red</option>
                    <option value="sortByGreen">Sort by green</option>
                    <option value="sortByBlue">Sort by blue</option>
                    <option value="sortByBright">Sort by brightness</option>
                </select>

                <div className="container">

                    <img ref={this.imageRef} src={testImage} style={hiddenStyle}/> 

                        <p> to be converted </p>

                    <canvas ref={this.canvasRef}  style={convertedStyle}/> 
                </div>
                
                <DragDropPreview />
            </div>
        )
    }
}


export default CanvasApp
