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
    a1 = parseInt(a[0])
    a2 = parseInt(a[1])
    b1 = parseInt(b[0])
    b2 = parseInt(b[1])
    let gSum = gcd(a1*b2+a2*b1, a2*b2);
    return [(a1*b2+a2*b1)/gSum, a2*b2/gSum]
}

const fracMul = (a,b) =>{
    a0 = parseInt(a[0])
    a1 = parseInt(a[1])
    b0 = parseInt(b[0])
    b1 = parseInt(b[1])
    let gMul = gcd(a0*b0,a1*b1)
    return [a0*b0/gMul,a1*b1/gMul]
}

const fracSub = (a,b) => {
    a0 = parseInt(a[0])
    a1 = parseInt(a[1])
    b0 = parseInt(b[0])
    b1 = parseInt(b[1])
    let gSub = gcd(a0*b1-a1*b0,a1*b1)
    return [(a0*b1-a1*b0)/gSub,a1*b1/gSub]
}

const fracDiv = (a,b) => {
    a0 = parseInt(a[0])
    a1 = parseInt(a[1])
    b0 = parseInt(b[0])
    b1 = parseInt(b[1])
    let gDiv = gcd(a0*b1,a1*b0)
    return [a0*b1/gDiv, a1*b0/gDiv]
}

const gcd = (a,b) => {
    a = parseInt(a);
    b = parseInt(b);
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
    let detString = document.getElementById("detValue").innerHTML;
    detString = detString.split(":")[0];
    document.getElementById("detValue").innerHTML = detString + ": ";
    val = parseInt(val);
    let detMatrix = create2DArray(val,val);
    for(let i=0;i<val;i++){
        for(let j=0;j<val;j++){
            detMatrix[i][j] = fraction(document.getElementById(`${i}-${j}`).value)
        }
    }
    if(detCalc(detMatrix)[1] === 1){
        document.getElementById("detValue").innerHTML = document.getElementById("detValue").innerHTML+`${detCalc(detMatrix)[0]}`
    }
    else if(detCalc(detMatrix)[1] === -1){
        document.getElementById("detValue").innerHTML = document.getElementById("detValue").innerHTML+`${detCalc(detMatrix)[0]*Math.pow(-1,1)}`
    }
    else if(detCalc(detMatrix)[0] === 0){
        document.getElementById("detValue").innerHTML = document.getElementById("detValue").innerHTML+`0`
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
            document.getElementById("detValue").innerHTML = document.getElementById("detValue").innerHTML+ a/b;
        }
        else{
            let fracExpress = "$\\frac{"+`${a}`+"}{"+`${b}`+"}$"
        document.getElementById("detValue").innerHTML = document.getElementById("detValue").innerHTML + fracExpress;
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


const inverse = () => {
    let val = document.getElementById("inputNumber").value;
    val = parseInt(val);
    let jaxString = document.getElementById('inverse').innerHTML+"$\\begin{pmatrix}";
    jaxString = jaxString.split(":")[0] + ": "+"$\\begin{pmatrix}";
    let jaxMatrix = new Array();
    const slash = "{ \\\\ }";

    let numMatrix = create2DArray(val,val);
    for(let i=0;i<val;i++){
        for(let j=0;j<val;j++){
            numMatrix[i][j] = fraction(document.getElementById(`${i}-${j}`).value)
        }
    }

    if(detCalc(numMatrix)[0] === 0){
        if(window.location.href.includes("en")){
            document.getElementById('inverse').innerHTML="Result : Not exist!"
        }
        else if(window.location.href.includes("ko")){
        document.getElementById('inverse').innerHTML="역행렬 : 없습니다!"
        }
        else if(window.location.href.includes("ja")){
            document.getElementById('inverse').innerHTML="逆行列 : 存在しない!"
        }
        else if(window.location.href.includes("ch")){
            document.getElementById('inverse').innerHTML="逆矩阵 : 不存在！"
        }
        else if(window.location.href.includes("sp")){
            document.getElementById('inverse').innerHTML="Matriz inversa : ¡No existe!"
        }
        else if(window.location.href.includes("vi")){
            document.getElementById('inverse').innerHTML="Result : Không tồn tại!"
        }
        else if(window.location.href.includes("po")){
            document.getElementById('inverse').innerHTML="Resultado : Não existe!"
        }
        else if(window.location.href.includes("in")){
            document.getElementById('inverse').innerHTML="Result : Tidak ada!"
        }
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
    let conti1;
    let conta1;

    for(let i=0;i<len;i++){
        ideal[i][i] = [1,1];
    }
    
    for(let i=0;i<len;i++){
        if(parseInt(arra[i][i][0])!==0){
            conti1 = ideal[i].map(m=> fracDiv(m,arra[i][i]));
            conta1 = arra[i].map(m=> fracDiv(m,arra[i][i]));
            // console.log(conti1)
            // console.log(conta1)
            for(let k=0;k<len;k++){
                ideal[i][k] = conti1[k]
                arra[i][k] = conta1[k] 
            }
        }
        else{
            for(let j=0;j<len;j++){
                pseudo[j] = arra[i][j];
                ipseudo[j] = ideal[i][j];
            }
            for(let k=i;k<len;k++){
                if(parseInt(arra[k][i][0])!==0){
                    for(let p=0;p<len;p++){
                        arra[i][p] = arra[k][p];
                        arra[k][p] = pseudo[p];
                        ideal[i][p] = ideal[k][p];
                        ideal[k][p] = ipseudo[p];
                    }
                    conti1 = ideal[i].map(m=>fracDiv(m,arra[i][i]));
                    conta1 = arra[i].map(m=> fracDiv(m,arra[i][i]));
                    for(let k=0;k<len;k++){
                        ideal[i][k] = conti1[k]
                        arra[i][k] = conta1[k] 
                    }
                    break
                }
            }
        }
        for(let p=0;p<len;p++){
            if(p !== i && parseInt(arra[p][i][0]) !== 0){
                conti = ideal[p].map((m,index) => {return fracSub(m, fracMul(arra[p][i],ideal[i][index]))})
                conta = arra[p].map((m,index) => {return fracSub(m,fracMul(arra[p][i],arra[i][index]))})
                // console.log(conti)
                // console.log(conta)
                for(let k=0;k<len;k++){
                    ideal[p][k] = conti[k];
                    arra[p][k] = conta[k];
                }
            }
            let g1 = gcd(ideal[p][i][0],ideal[p][i][1]);
            let a1 = parseInt(ideal[p][i][0])/g1;
            let b1 = parseInt(ideal[p][i][1])/g1;
                ideal[p][i] = [a1,b1];
        }

    }

    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
            if(ideal[i][j][0] !== 0){
                if(ideal[i][j][1] < 0){
                    ideal[i][j]= fracMul(ideal[i][j],[-1,-1]);
                }
                let g2 = gcd(ideal[i][j][0],ideal[i][j][1]);
                let a2 = parseInt(ideal[i][j][0])/g2;
                let b2 = parseInt(ideal[i][j][1])/g2;
                ideal[i][j] = [a2, b2];
            }
        }
    }
    
    return ideal
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


if(window.location.href.includes("en")){
    document.getElementById("example").innerHTML = `Input example : 1/2, 0.3, 1`
}

else if(window.location.href.includes("ko")){
    document.getElementById("example").innerHTML = `입력예시 : 1/2, 0.3, 1`
}

else if(window.location.href.includes("ja")){
    document.getElementById("example").innerHTML = `入力例 : 1/2, 0.3, 1`
}
else if(window.location.href.includes("ch")){
    document.getElementById("example").innerHTML = `输入示例 : 1/2, 0.3, 1`
}
else if(window.location.href.includes("sp")){
    document.getElementById("example").innerHTML = `Ejemplo de entrada : 1/2, 0.3, 1`
}
else if(window.location.href.includes("vi")){
    document.getElementById("example").innerHTML = `Ví dụ đầu vào : 1/2, 0.3, 1`
}
else if(window.location.href.includes("po")){
    document.getElementById("example").innerHTML = `Exemplo de entrada : 1/2, 0.3, 1`
}
else if(window.location.href.includes("in")){
    document.getElementById("example").innerHTML = `Contoh masukan : 1/2, 0.3, 1`
}

document.querySelectorAll(".matrixClass input").addEventListener("click", function(event){
event.preventDefault();
})