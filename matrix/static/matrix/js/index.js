function create2DArray(rows, columns) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(columns);
    }
    return arr;
}

const makeMatrix = () => {
    const val = document.getElementById("inputNumber").value;
    if(val<11){
    const element = document.getElementById("matrix-1")
    element.parentNode.removeChild(element);
    let mat = document.getElementById("matrix");
    let matdiv = document.createElement("div")
    matdiv.setAttribute("id","matrix-1")
    mat.appendChild(matdiv)

    for(let i=0;i<val;i++){
        let mat = document.getElementById("matrix-1");
            let matdiv = document.createElement("div")
            matdiv.setAttribute("class","matrixClass")
            mat.appendChild(matdiv);
        for(let j=0;j<val;j++){
            let mat = document.getElementsByClassName("matrixClass")[i];
            let newInputTag = document.createElement('input');
            newInputTag.setAttribute("id",`${i}-${j}`)
            mat.appendChild(newInputTag);
        
        }
    }
}
else if(val>=11){
    document.getElementById("matrix-1").innerHTML = "TOO BIG!";
}
}


const inverse = () => {
    const val = document.getElementById("inputNumber").value;
    let jaxString = "역행렬 : $$\\begin{pmatrix}";
    let jaxMatrix = new Array();
    const slash = "{ \\\\ }";

    let numMatrix = create2DArray(val,val);
    for(let i=0;i<val;i++){
        for(let j=0;j<val;j++){
            numMatrix[i][j] = parseFloat(document.getElementById(`${i}-${j}`).value)
        }
    }

    const wholeDet = detCalc(numMatrix);

    for(let i=0;i<val;i++){
        jaxMatrix[i] = ""
        for(let j=0;j<val;j++){
            if(j !== val-1){
            jaxMatrix[i] += document.getElementById(`${i}-${j}`).value + " & "
            }
            else if (j === val-1 && i !== val-1){
                jaxMatrix[i] += document.getElementById(`${i}-${j}`).value + slash.replace("{","").replace("}","");
            }
            else{
                jaxMatrix[i] += document.getElementById(`${i}-${j}`).value
            }
        }
        jaxString += jaxMatrix[i];
    }
    let jaxJax = jaxString + "\\end{pmatrix}$$";
    document.getElementById('inverse').innerHTML = jaxJax;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"inverse"]);
}


const det = () =>{
    const val = document.getElementById("inputNumber").value;
    let numMatrix = create2DArray(val,val);
    for(let i=0;i<val;i++){
        for(let j=0;j<val;j++){
            numMatrix[i][j] = parseFloat(document.getElementById(`${i}-${j}`).value)
        }
    }
    
    document.getElementById("detValue").innerText = `행렬값 : ${detCalc(numMatrix)}`
}

const detCalc = (arr) => {
    const len = arr[0].length
    if(len>=3){
    let sum = 0;
    for(let i=0;i<len;i++){
        let section;
        if(i === 0){
            section = arr.slice(1,len).map(j => j.slice(1,len));
            
        }
        else if(i === len-1){
            section = arr.slice(1,len).map(j => j.slice(0,len-1));
        }
        else{
            section = arr.slice(1,len).map(j => [].concat(j.slice(0,i),j.slice(i+1,len)))
        }
        sum+=arr[0][0]*detCalc(section)*Math.pow(-1,i)
    }
    return sum
    }
    else if(len === 1){
        return arr[0][0]
    }
    else if(len === 2){
        return arr[0][0]*arr[1][1]-arr[0][1]*arr[1][0]
    }
}

const inverseCalc = (arr) => {
    const matrix = new Array()
    const len = arr[0].length
    if(len>=3){
    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
        let section;
        if(i === 0 && j===0){
            section = arr.slice(1,len).map(m => m.slice(1,len));
            
        }
        else if(i === 0 && j === len-1){
            section = arr.slice(1,len).map(m => m.slice(0,len-1));
        }
        else if(i === 0){
            section = arr.slice(1,len).map(m => [].concat(m.slice(0,j),m.slice(j+1,len)));
        }
        else if(i === len-1 && j === 0){
            section = arr.slice(0,len-1).map(m => m.slice(1,len));
        }
        else if(i === len-1 && j === len-1){
            section = arr.slice(0,len-1).map(m => m.slice(0,len-1));
        }
        else if(i === len-1){
            section = arr.slice(0,len-1).map(m => [].concat(m.slice(0,j),m.slice(j+1,len)));
        }
        else if(i !== len-1 && i !== 0 && j === 0){
            section = [].concat(arr.slice(0,i).map(m => m.slice(1,len)), arr.slice(i+1,len).map(m => m.slice(1,len)));
        }
        else if(i !== len-1 && i !== 0 && j === len-1){
            section = arr.slice(1,len).map(j => j.slice(0,len-1));
        }
        else{
            section = arr.slice(1,len).map(j => [].concat(j.slice(0,i),j.slice(i+1,len)))
        }
        matrix[i][j] = detCalc(section)*Math.pow(-1,i+j)
    }
    }
    return matrix
    }
    else if(len === 1){
        return arr[0][0]
    }
    else if(len === 2){
        matrix[0][0] = arr[1][1]/detCalc(arr)
        matrix[1][1] = arr[0][0]/detCalc(arr)
        matrix[0][1] = -arr[1][0]/detCalc(arr)
        matrix[1][0] = -arr[0][1]/detCalc(arr)
        return matrix
    }
}