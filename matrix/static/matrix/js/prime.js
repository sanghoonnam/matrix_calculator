const primeDet = () => {
    let prime = document.getElementById("inputPrime").value;
    document.getElementById("primeResult").innerHTML = document.getElementById("primeResult").innerHTML.split(":")[0]+": ";
    box = prime;
    const regExp = /^[0-9]+$/;
    prime = parseInt(prime);
    
    root = parseInt(Math.sqrt(prime));
    
    // var arr = new Array(root);
    if(prime<=0){
        document.getElementById("primeResult").innerHTML=document.getElementById("primeResult").innerHTML+"소수가 아닙니다."
    }
    else if(root==1 && prime!=1){
        document.getElementById("primeResult").innerHTML=document.getElementById("primeResult").innerHTML+"소수입니다."
    }
    else if(prime==1){
        document.getElementById("primeResult").innerHTML=document.getElementById("primeResult").innerHTML+"소수가 아닙니다."
    }
    
    else if(regExp.test(box)){   
    let sum=0;
    for(let i=1;i<root;i++){
    if(prime % (i+1)==0){
        sum+=1;
    // for(let j=1;j<prime/(i+1);j++){
    //     arr[(i+1)*j]=1;
    // }
    break
    }
    }
    
    if(sum>0){
        document.getElementById("primeResult").innerHTML=document.getElementById("primeResult").innerHTML+"소수가 아닙니다."
    }
    else{
        document.getElementById("primeResult").innerHTML=document.getElementById("primeResult").innerHTML+"소수입니다."
    }
    }
    else{
        document.getElementById("primeResult").innerHTML=document.getElementById("primeResult").innerHTML+"숫자가 아닙니다."
    }
}

// 변수 예외처리 필요