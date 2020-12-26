export function nativeSort(data, imageWidth, imageHeight) {

    let pixelArr = []

    for(let i = 0; i < data.length; i+=4) {
        let pixel = [data[i],data[i + 1],data[i + 2],data[i + 3]]
        pixelArr.push(pixel)
    }
    
    function nativeFunction() {
        pixelArr.sort((a, b) => {
            let sum1 = a[0] + a[1] + a[2] + a[3]
            let sum2 = b[0] + b[1] + b[2] + b[3]
            return sum1 - sum2
        })
    }

    nativeFunction()

    let sortedArr = []

    pixelArr.forEach((pixel) => {
        sortedArr.push(pixel[0], pixel[1], pixel[2], pixel[3])
    })

    const imageData = new ImageData(new Uint8ClampedArray(sortedArr), imageHeight, imageWidth)  
    return imageData
}



export function nativeSort_COL(data, imageWidth, imageHeight) {

    let pixelArr = []

    for(let i = 0; i < data.length; i+=4) {
        let pixel = [data[i],data[i + 1],data[i + 2],data[i + 3]]
        pixelArr.push(pixel)
    }

    let arrayOfCols = []

    for(let i = 0; i < imageWidth; i++) {
        let colArr = []
        for(let j = 0; j < pixelArr.length; j+=imageWidth){
            colArr.push(pixelArr[j])
        }
        arrayOfCols.push(colArr)
    }

    function nativeFunction_COL() {
        arrayOfCols.forEach((col) => {
            col.sort((a, b) => {
                let sum1 = a[0] + a[1] + a[2] + a[3]
                let sum2 = b[0] + b[1] + b[2] + b[3]
                return sum1 - sum2 
            })
        })
    }

    nativeFunction_COL()

    let sortedArr = []

    for(let i = 0; i < imageWidth; i++) {
        arrayOfCols[i].forEach((pixel) => {
            sortedArr.push(pixel[0], pixel[1], pixel[2], pixel[3])
        })
    }

    const imageData = new ImageData(new Uint8ClampedArray(sortedArr), imageHeight, imageWidth)  
    return imageData
}


export function nativeSort_COL2x(data, imageWidth, imageHeight) {

    let pixelArr = []

    for(let i = 0; i < data.length; i+=4) {
        let pixel = [data[i],data[i + 1],data[i + 2],data[i + 3]]
        pixelArr.push(pixel)
    }

    let arrayOfCols = []

    for(let i = 0; i < imageWidth; i++) {
        let colArr = []
        for(let j = 0; j < pixelArr.length; j+=imageWidth){
            colArr.push(pixelArr[j])
        }
        arrayOfCols.push(colArr)
    }

    function nativeFunction_COL() {
        for(let i = 0; i < arrayOfCols.length; i++) {
            i % 2 === 0 ? arrayOfCols[i].sort((a,b) => {
                let sum1 = a[0] + a[1] + a[2] + a[3]
                let sum2 = b[0] + b[1] + b[2] + b[3]
                return sum1 - sum2 
            }) 
            :
            arrayOfCols[i].sort((a,b) => {
                let sum1 = a[0] + a[1] + a[2] + a[3]
                let sum2 = b[0] + b[1] + b[2] + b[3]
                return sum2 - sum1 
            }) 
        }
    }

    nativeFunction_COL()

    let sortedArr = []

    for(let i = 0; i < imageWidth; i++) {
        arrayOfCols[i].forEach((pixel) => {
            sortedArr.push(pixel[0], pixel[1], pixel[2], pixel[3])
        })
    }

    const imageData = new ImageData(new Uint8ClampedArray(sortedArr), imageHeight, imageWidth)  
    return imageData
}



export function test(data, imageWidth, imageHeight) {

    let pixelArr = []

    for(let i = 0; i < data.length; i+=4) {
        let pixel = [data[i],data[i + 1],data[i + 2],data[i + 3]]
        pixelArr.push(pixel)
    }

    let arrayOfCols = []

    for(let i = 0; i < imageWidth; i++) {
        let colArr = []
        for(let j = 0; j < pixelArr.length; j+=imageWidth){
            colArr.push(pixelArr[j])
        }
        arrayOfCols.push(colArr)
    }

    function nativeFunction() {
        for(let i = 0; i < arrayOfCols.length; i++) {
            arrayOfCols[i].sort((a,b) => {
                
                return a - b  
            }) 
        }
    }

    nativeFunction()

    let sortedArr = []

    for(let i = 0; i < imageWidth; i++) {
        arrayOfCols[i].forEach((pixel) => {
            sortedArr.push(pixel[0], pixel[1], pixel[2], pixel[3])
        })
    }
    const imageData = new ImageData(new Uint8ClampedArray(sortedArr), imageHeight, imageWidth)  
    return imageData
}






















































// not using bubble sort

export function bubbleSort(data, imageWidth, imageHeight) {

    let pixelArr = []

    for(let i = 0; i < data.length; i+=4) {
        let pixel = [data[i],data[i + 1],data[i + 2],data[i + 3]]
        pixelArr.push(pixel)
    }
    
    let swapped;
    
    function bubbleFunction(arr) {
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
    do {bubbleFunction(pixelArr)} while (swapped)

    let sortedArr = []

    pixelArr.forEach((pixel) => {
        sortedArr.push(pixel[0], pixel[1], pixel[2], pixel[3])
    })

    const imageData = new ImageData(new Uint8ClampedArray(sortedArr), imageHeight, imageWidth)  
    return imageData
}


            // OLD FUNCTION ?? 


// for some reason, when I define the function params, they imageW and imageH must be 
// inverted from how passed in the function call, which then displays all the sorted pixels
// correctly across whatever canvas size. 

// this.state.imageHeight goes through imageWidth           ???
// and this.state.imageWidth goes through imageHeight       ??? 

export function incaseifuckup(data, imageWidth, imageHeight) {

    let pixelArr = []
    let twoDArr = []
    
    // Create array of pixels. Each index is a "pixel" array containg the 4 RGBA integers that make up that singular pixel. 

    for(let i = 0; i < data.length; i+=4) {
        let pixel = [data[i],data[i + 1],data[i + 2],data[i + 3]]
        pixelArr.push(pixel)
    }

    // Create rows to be pushed into 2D array. Each row is an array containg the row length of pixel arrays. Do this for the pixel height (column) of the image. 

    for(let i = 0; i < imageWidth; i++) {

        let row = []                //  init an empty row before each outer loop 

        for(let j = 0; j < imageHeight; j++) {
            row.push(pixelArr[j])
        }
        twoDArr.push(row)           // push row into 2D array 
    }

    //Now that that 2D array has been properly built with row x col dimensions, we can write a pixel sorting algorithm.

    for(let i = 0; i < twoDArr.length; i++) {                   // going over all rows in two d array
        twoDArr[i].sort((a,b) => a[0] - b[0])                   //sorting by [0] index (red hue)
    }
    
    // Now build normal array from multi array to be converted to Uint8ClampedArray

    let convertedArr = []

    for(let i = 0; i < twoDArr.length; i++) {
        twoDArr[i].forEach(function(pixel){
            convertedArr.push(pixel[0], pixel[1], pixel[2], pixel[3])
        })
    }
    
    console.log(convertedArr)
    // create new image object and return 

    const imageData = new ImageData(new Uint8ClampedArray(convertedArr), imageHeight, imageWidth)  
    return imageData
}