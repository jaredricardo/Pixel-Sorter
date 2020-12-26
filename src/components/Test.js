import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner';

export class Test extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             loading: false
        }
    }

    fakeCall = () => {
        console.log("sorting your phat pixels")
        this.setState({
            loading: !this.state.loading
        }, this.returnToNormal)
    }

    fakeWait = () => {
        setTimeout(() => {
            console.log("phat pixels have been sorted")
            this.setState({
                loading: false
            })
        }, 3000)
    }

    returnToNormal = async () => {
        await this.fakeWait()
    }

    checkLoading = () => {
        if(this.state.loading) {
            return <Spinner animation="border" size="sm"/>
        } else {
            return 
        }
    }

    testBubble = () => {
        let uns = [1,77,3,200,45,23423,65,234,87,2,33,5,766,4,-4,6,0,222,5]
        let swapped;

        function bubble(arr) {
            swapped = false
            let end = arr.length - 1
            for(let i = 0 ; i < end; i++) {
                if(arr[i] > arr[i+1]) {
                    swapped = true
                    let temp = arr[i]
                    arr[i] = arr[i+1]
                    arr[i+1] = temp
                }
            }
            end--
        } 
        do {bubble(uns)} while (swapped)
        console.log(uns)
    }

    testBubble2 = () => {
        let uns = [[255,0,0,255],[0,0,0,0],[60,0,0,255],[343,343,1,255],[245,0,0,255]]
        let swapped;

        function bubbleSort(arr) {
            swapped = false
            let end = arr.length - 1
            for(let i = 0 ; i < end; i++) {
                let sum1 = arr[i][0] + arr[i][1] + arr[i][2] + arr[i][3]
                let sum2 = arr[i+1][0] + arr[i+1][1] + arr[i+1][2] + arr[i+1][3]
                if(sum1 > sum2) {
                    swapped = true
                    let temp = arr[i]
                    arr[i] = arr[i+1]
                    arr[i+1] = temp
                }
            }
            end--
        } 
        do {bubbleSort(uns)} while (swapped)
        console.log(uns)
    }
    
    
    render() {

        return (
            <div>
                <button onClick={this.testBubble2}> 
                
                    Make something happen 
                    {this.checkLoading()}
                </button>
            </div>
        )
    }
}

export default Test
