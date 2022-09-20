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
    if(a*b === 0){
        return a+b;
    }
    else if((a-1)*(b-1) === 0){
        return 1
    }
    else if(a<b){
        return gcd(a,b-a*parseInt(b/a))
    }
    else if(b<a){
        return gcd(b, a-b*parseInt(a/b))
    }
    else if(b === a){
        return a
    }
}

const makeMatrix = () => {
    const val = document.getElementById("inputNumber").value;
    if(val<9 && 1<val){
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
else if(val>=9){
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
       
        let a = detCalc(detMatrix)[0]/g;
        let b = detCalc(detMatrix)[1]/parseInt(g);


        if(b<0){
            a = a*Math.pow(-1,1);
            b = b*Math.pow(-1,1);
        }
        if(a%b===0){
            document.getElementById("detValue").innerHTML = "행렬값 : "+ a/b;
        }
        else{
            let fracExpress = "행렬값 : "+"$\\frac{"+`${a}`+"}{"+`${b}`+"}$"
        document.getElementById("detValue").innerHTML = fracExpress
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"detValue"]);
        }
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

// const inverseCalc = (arr) => {
//     const len = arr[0].length
//     const matrix = create2DArray(len,len)
//     if(len>=3 && detCalc(arr)!==0){
//     for(let i=0;i<len;i++){
//         for(let j=0;j<len;j++){
//         let section = create2DArray(len-1,len-1)
//         if(i === 0 && j===0){
//             section = arr.slice(1,len).map(m => m.slice(1,len));
//         }
//         else if(i === 0 && j === len-1){
//             section = arr.slice(1,len).map(m => m.slice(0,len-1));
//         }
//         else if(i === 0){
//             section = arr.slice(1,len).map(m => [].concat(m.slice(0,j),m.slice(j+1,len)));
//         }
//         else if(i === len-1 && j === 0){
//             section = arr.slice(0,len-1).map(m => m.slice(1,len));
//         }
//         else if(i === len-1 && j === len-1){
//             section = arr.slice(0,len-1).map(m => m.slice(0,len-1));
//         }
//         else if(i === len-1){
//             section = arr.slice(0,len-1).map(m => [].concat(m.slice(0,j),m.slice(j+1,len)));
//         }
//         else if(i !== len-1 && i !== 0 && j === 0){
//             for(let m=0;m<len;m++){
//                 for(let n=0;n<len-1;n++){
//                     if(m<i){
//                         section[m][n] = arr.slice(0,i).map(p => p.slice(1,len))[m][n]
//                     }
//                     else if(m>i){
//                         section[m-1][n] = arr.map(p => p.slice(1,len))[m][n]
//                     }
//                 }
//             }
//         }
//         else if(i !== len-1 && i !== 0 && j === len-1){
//             for(let m=0;m<len;m++){
//                 for(let n=0;n<len-1;n++){
//                     if(m<i){
//                         section[m][n] = arr[m][n]
//                     }
//                     else if(m>i){
//                         section[m-1][n] = arr[m][n]
//                     }
//                 }
//             }
//         }
//         else{
//             for(let m=0;m<len;m++){
//                 for(let n=0;n<len;n++){
//                     if(m<i && n<j){
//                         section[m][n] = arr[m][n]
//                     }
//                     else if(m<i && n>j){
//                         section[m][n-1] = arr[m][n]
//                     }
//                     else if(m>i && n<j){
//                         section[m-1][n] = arr[m][n]
//                     }
//                     else if(m>i && n>j){
//                         section[m-1][n-1] = arr[m][n]
//                     }
//                 }
//             }
//         }
//         if(detCalc(section)[0]*Math.pow(-1,i+j)*detCalc(arr)[1]!==0){
//             let k = gcd(detCalc(section)[0]*Math.pow(-1,i+j)*detCalc(arr)[1],detCalc(section)[1]*detCalc(arr)[0])
//             matrix[i][j] = [parseInt(detCalc(section)[0]*Math.pow(-1,i+j)*detCalc(arr)[1]/k),parseInt(detCalc(section)[1]*detCalc(arr)[0]/k)]
//         }
//         else if(detCalc(section)[0]*Math.pow(-1,i+j)*detCalc(arr)[1]===0){
//             matrix[i][j] = [0,1]
//         }
       
//         if(matrix[i][j][1]<0){
//             matrix[i][j][0] = matrix[i][j][0]*Math.pow(-1,1)
//             matrix[i][j][1] = matrix[i][j][1]*Math.pow(-1,1)
//         }
//     }
//     }
//     return transpose(matrix)
//     }
//     else if(len === 2 && detCalc(arr)!==0){
//         matrix[0][0] = [arr[1][1][0]*detCalc(arr)[1],arr[1][1][1]*detCalc(arr)[0]]
//         matrix[1][1] = [arr[0][0][0]*detCalc(arr)[1],arr[0][0][1]*detCalc(arr)[0]]
//         matrix[0][1] = [arr[1][0][0]*Math.pow(-1,1)*detCalc(arr)[1],arr[1][0][1]*detCalc(arr)[0]]
//         matrix[1][0] = [arr[0][1][0]*Math.pow(-1,1)*detCalc(arr)[1],arr[0][1][1]*detCalc(arr)[0]]
//         return matrix
//     }
// }

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

    if(detCalc(numMatrix)[0] === 0){
        document.getElementById('inverse').innerHTML="역행렬 : 없습니다!"
    }
    
    else{
    const inverse = gauss(numMatrix);

    for(let i=0;i<val;i++){
        jaxMatrix[i] = ""
        for(let j=0;j<val;j++){
            if(j !== val-1){
                if(inverse[i][j][0] === 0){
                    jaxMatrix[i] += "0" + " & ";
                }
                else if(inverse[i][j][1] === 1){
                    jaxMatrix[i] += `${inverse[i][j][0]}` + " & ";
                }
                else{
                    jaxMatrix[i] += "\\frac{"+`${inverse[i][j][0]}`+"}{"+`${inverse[i][j][1]}`+"}"+ " & "
                }
            }
            else if (j === val-1 && i !== val-1){
                if(inverse[i][j][0] === 0){
                    jaxMatrix[i] += "0" + slash.replace("{","").replace("}","");
                }
                else if(inverse[i][j][1] === 1){
                    jaxMatrix[i] += `${inverse[i][j][0]}` + slash.replace("{","").replace("}","");
                }
                else{
                jaxMatrix[i] += "\\frac{"+`${inverse[i][j][0]}`+"}{"+`${inverse[i][j][1]}`+"}" + slash.replace("{","").replace("}","");
                }
            }
            else{
                if(inverse[i][j][0] === 0){
                    jaxMatrix[i] += "0";
                }
                else if(inverse[i][j][1] === 1){
                    jaxMatrix[i] += `${inverse[i][j][0]}`;
                }
                else{
                jaxMatrix[i] += "\\frac{"+`${inverse[i][j][0]}`+"}{"+`${inverse[i][j][1]}`+"}"
                }
            }
        }
        jaxString += jaxMatrix[i];
    }
    let jaxJax = jaxString + "\\end{pmatrix}$";
    document.getElementById('inverse').innerHTML = jaxJax;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"inverse"]);
}
}

// const transpose = (arr) => {
//     let len = arr[0].length
//     let flag = 0;
//     for(let i=1;i<len;i++){
//         for(let j=0;j<i;j++){
//             flag = arr[i][j];
//             arr[i][j] = arr[j][i];
//             arr[j][i] = flag;
//         }
//     }
//     return arr
// }

const gauss = (arra) => {
    let len = arra[0].length;
    let ideal = create2DArray(len,len);
    let pseudo = Array(len).fill([0,1]);
    let ipseudo = Array(len).fill([0,1]);
    let conti;
    let conta;

    for(let i=0;i<len;i++){
        ideal[i][i] = [1,1];
    }
    
    for(let i=0;i<len;i++){
        if(arra[i][i][0]!==0){
            conti = ideal[i].map(m=>[arra[i][i][1]*m[0],arra[i][i][0]*m[1]]);
            conta = arra[i].map(m=> [arra[i][i][1]*m[0],arra[i][i][0]*m[1]]);
            for(let k=0;k<len;k++){
                ideal[i][k] = conti[k]
                arra[i][k] = conta[k] 
            }
        }
        else{
            for(let j=0;j<len;j++){
                pseudo[j] = arra[i][j];
                ipseudo[j] = ideal[i][j];
            }
            for(let k=i;k<len;k++){
                if(arra[k][i][0]!==0){
                    for(let p=0;p<len;p++){
                        arra[i][p] = arra[k][p];
                        arra[k][p] = pseudo[p];
                        ideal[i][p] = ideal[k][p];
                        ideal[k][p] = ipseudo[p];
                    }
                    conti = ideal[i].map(m=>[arra[i][i][1]*m[0],arra[i][i][0]*m[1]]);
                    conta = arra[i].map(m=> [arra[i][i][1]*m[0],arra[i][i][0]*m[1]]);
                    for(let k=0;k<len;k++){
                        ideal[i][k] = conti[k];
                        arra[i][k] = conta[k];
                    }
                    break
                }
            }
        }
        for(let p=0;p<len;p++){
            if(p !== i && arra[p][i][0] !== 0){
                conti = ideal[p].map((m,index) => {return fracSum(m,[(-1)*arra[p][i][0]*ideal[i][index][0], arra[p][i][1]*ideal[i][index][1]])})
                conta = arra[p].map((m,index) => {return fracSum(m,[(-1)*arra[p][i][0]*arra[i][index][0], arra[p][i][1]*arra[i][index][1]])})
                for(let k=0;k<len;k++){
                    ideal[p][k] = conti[k];
                    arra[p][k] = conta[k];
                }
            }
        }

    }

    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
            if(ideal[i][j][0] !== 0){
                if(ideal[i][j][1] < 0){
                    ideal[i][j][0] = (-1)*ideal[i][j][0]
                    ideal[i][j][1] = (-1)*ideal[i][j][1]
                }
                let g = parseInt(gcd(ideal[i][j][0],ideal[i][j][1]));
                ideal[i][j][0] = ideal[i][j][0]/g;
                ideal[i][j][1] = ideal[i][j][1]/g;
            }
        }
    }
    return ideal
}
