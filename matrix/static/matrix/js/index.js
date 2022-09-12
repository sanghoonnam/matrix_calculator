function create2DArray(rows, columns) {
    let arr = Array(rows).fill().map(() => Array(columns).fill([0,1]));
    return arr
}

const fraction = (num) => {
    let flag=0;
    if(num == parseInt(num)){
        return [parseInt(num),1]
    }
    else if(num.includes(".")){
        while(parseFloat(num)*Math.pow(10,flag) !== parseInt(parseFloat(num)*Math.pow(10,flag))){
            flag+=1;
        }
        return [parseInt(parseFloat(num)*Math.pow(10,flag)),Math.pow(10,flag)]
    }
    else if(num.includes("/")){
        return [parseInt(num.split("/")[0]),parseInt(num.split("/")[1])]
    }
}

const fracSum = (a,b) => {
    return [parseInt(a[0]*b[1]+a[1]*b[0]),parseInt(a[1]*b[1])]
}

const fracMul = (a,b) =>{
    return [parseInt(a[0]*b[0]),parseInt(a[1]*b[1])]
}

const gcd = (a,b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    if(a<b){
        for(let i=a;i>0;i--){
            if(b%i===0 && a%i === 0){
                return i
            }
        }
    }
    else if(b<a){
        for(let i=b;i>0;i--){
            if(a%i===0 && b%i ===0){
                return i
            }
        }
    }
    else{
        return a
    }
}


const makeMatrix = () => {
    const val = document.getElementById("inputNumber").value;
    if(val<11 && 1<val){
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
else if(val<=1){
    document.getElementById("matrix-1").innerHTML = "TOO SMALL!";
}
}

const det = () =>{
    let val = document.getElementById("inputNumber").value;
    val = parseInt(val);
    let detMatrix = create2DArray(val,val);
    for(let i=0;i<val;i++){
        for(let j=0;j<val;j++){
            detMatrix[i][j] = fraction(document.getElementById(`${i}-${j}`).value)
        }
    }
    if(detCalc(detMatrix)[1] === 1){
        document.getElementById("detValue").innerHTML = `행렬값 : ${detCalc(detMatrix)[0]}`
    }
    else if(detCalc(detMatrix)[1] === -1){
        document.getElementById("detValue").innerHTML = `행렬값 : ${detCalc(detMatrix)[0]*Math.pow(-1,1)}`
    }
    else if(detCalc(detMatrix)[0] === 0){
        document.getElementById("detValue").innerHTML = `행렬값 : 0`
    }
    else{
        let g = gcd(detCalc(detMatrix)[0],detCalc(detMatrix)[1]);

        detCalc(detMatrix)[0] =  parseInt(detCalc(detMatrix)[0])/g;
        detCalc(detMatrix)[1] = parseInt(detCalc(detMatrix)[1])/g;

        if(detCalc(detMatrix)[1]<0){
            detCalc(detMatrix)[0] = detCalc(detMatrix)[0]*Math.pow(-1,1);
            detCalc(detMatrix)[1] = detCalc(detMatrix)[1]*Math.pow(-1,1);
        }
        let fracExpress = "행렬값 : "+"$\\frac{"+`${detCalc(detMatrix)[0]}`+"}{"+`${detCalc(detMatrix)[1]}`+"}$"
        document.getElementById("detValue").innerHTML = fracExpress
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"detValue"]);
    }
}

const detCalc = (arr) => {
    const len = arr[0].length
    if(len>=3){
    let sum = [0,1];
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
            sum = fracSum(sum, fracMul([arr[0][i][0]*Math.pow(-1,i),arr[0][i][1]] , detCalc(section)))  
    }
    return sum
    }
    else if(len === 2){
        return fracSum(fracMul(arr[0][0],arr[1][1]),fracMul([arr[0][1][0]*Math.pow(-1,1),arr[0][1][1]],arr[1][0]))
    }
}

const inverseCalc = (arr) => {
    const len = arr[0].length
    const matrix = create2DArray(len,len)
    if(len>=3 && detCalc(arr)!==0){
    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
        let section = create2DArray(len-1,len-1)
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
            for(let m=0;m<len;m++){
                for(let n=0;n<len-1;n++){
                    if(m<i){
                        section[m][n] = arr.slice(0,i).map(p => p.slice(1,len))[m][n]
                    }
                    else if(m>i){
                        section[m-1][n] = arr.map(p => p.slice(1,len))[m][n]
                    }
                }
            }
        }
        else if(i !== len-1 && i !== 0 && j === len-1){
            for(let m=0;m<len;m++){
                for(let n=0;n<len-1;n++){
                    if(m<i){
                        section[m][n] = arr[m][n]
                    }
                    else if(m>i){
                        section[m-1][n] = arr[m][n]
                    }
                }
            }
        }
        else{
            for(let m=0;m<len;m++){
                for(let n=0;n<len;n++){
                    if(m<i && n<j){
                        section[m][n] = arr[m][n]
                    }
                    else if(m<i && n>j){
                        section[m][n-1] = arr[m][n]
                    }
                    else if(m>i && n<j){
                        section[m-1][n] = arr[m][n]
                    }
                    else if(m>i && n>j){
                        section[m-1][n-1] = arr[m][n]
                    }
                }
            }
        }
        let k = gcd(detCalc(section)[0]*Math.pow(-1,i+j)*detCalc(arr)[1],detCalc(section)[1]*detCalc(arr)[0])
        matrix[i][j] = [parseInt(detCalc(section)[0]*Math.pow(-1,i+j)*detCalc(arr)[1]/k),parseInt(detCalc(section)[1]*detCalc(arr)[0]/k)]
        if(matrix[i][j][1]<0){
            matrix[i][j][0] = matrix[i][j][0]*Math.pow(-1,1)
            matrix[i][j][1] = matrix[i][j][1]*Math.pow(-1,1)
        }
    }
    }
    return transpose(matrix)
    }
    else if(len === 2 && detCalc(arr)!==0){
        matrix[0][0] = [arr[1][1][0]*detCalc(arr)[1],arr[1][1][1]*detCalc(arr)[0]]
        matrix[1][1] = [arr[0][0][0]*detCalc(arr)[1],arr[0][0][1]*detCalc(arr)[0]]
        matrix[0][1] = [arr[1][0][0]*Math.pow(-1,1)*detCalc(arr)[1],arr[1][0][1]*detCalc(arr)[0]]
        matrix[1][0] = [arr[0][1][0]*Math.pow(-1,1)*detCalc(arr)[1],arr[0][1][1]*detCalc(arr)[0]]
        return matrix
    }
}

const inverse = () => {
    let val = document.getElementById("inputNumber").value;
    val = parseInt(val);
    let jaxString = "역행렬 : $\\begin{pmatrix}";
    let jaxMatrix = new Array();
    const slash = "{ \\\\ }";

    let numMatrix = create2DArray(val,val);
    for(let i=0;i<val;i++){
        for(let j=0;j<val;j++){
            numMatrix[i][j] = fraction(document.getElementById(`${i}-${j}`).value)
        }
    }

    if(detCalc(numMatrix) === 0){
        document.getElementById('inverse').innerHTML="역행렬 : 없습니다!"
    }
    
    else{
    const inverse = inverseCalc(numMatrix);

    for(let i=0;i<val;i++){
        jaxMatrix[i] = ""
        for(let j=0;j<val;j++){
            if(j !== val-1){
            jaxMatrix[i] += "\\frac{"+`${inverse[i][j][0]}`+"}{"+`${inverse[i][j][1]}`+"}"+ " & "
            }
            else if (j === val-1 && i !== val-1){
                jaxMatrix[i] += "\\frac{"+`${inverse[i][j][0]}`+"}{"+`${inverse[i][j][1]}`+"}" + slash.replace("{","").replace("}","");
            }
            else{
                jaxMatrix[i] += "\\frac{"+`${inverse[i][j][0]}`+"}{"+`${inverse[i][j][1]}`+"}"
            }
        }
        jaxString += jaxMatrix[i];
    }
    let jaxJax = jaxString + "\\end{pmatrix}$";
    document.getElementById('inverse').innerHTML = jaxJax;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"inverse"]);
}
}

const transpose = (arr) => {
    let len = arr[0].length
    let flag = 0;
    for(let i=1;i<len;i++){
        for(let j=0;j<i;j++){
            flag = arr[i][j];
            arr[i][j] = arr[j][i];
            arr[j][i] = flag;
        }
    }
    return arr
}
