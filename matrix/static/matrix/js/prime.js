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


const factorize = () => {
    let prime = document.getElementById("inputFactor").value;
    document.getElementById("factorResult").innerHTML = document.getElementById("factorResult").innerHTML.split(":")[0]+": ";
    box = prime;
    const regExp = /^[0-9]+$/;
    prime = parseInt(prime);
    
    root = parseInt(Math.sqrt(prime));
    
    if(prime<=0){
        document.getElementById("factorResult").innerHTML=document.getElementById("factorResult").innerHTML+"Error"
    }
    else if(root==1){
        document.getElementById("factorResult").innerHTML=document.getElementById("factorResult").innerHTML+`${box}`
    }
    
    else if(regExp.test(box)){
    let arr1 = new Array()
    let arr2 = new Array()
    let findPrime = (num) => {   
        let sum=0
        if(num<=3 && num>1){
            arr1.push(num)
            arr2.push(1)
        }
        else{
        let len = parseInt(Math.sqrt(num))
        for(let i=1;i<len;i++){
            if(num % (i+1)==0){
                sum+=1
                fake = num
                exp=0
                arr1.push(i+1)
                while(fake % (i+1)==0){
                    fake = fake/(i+1)
                    exp+=1
                }
                arr2.push(exp)
                findPrime(num/Math.pow(i+1,exp))
                break
            }
            }   
        if(sum==0 && num>1){
            arr1.push(num)
            arr2.push(1)
        }
    }
}
    findPrime(prime)
    console.log(arr1)
    console.log(arr2)
    let Jax="${"
    for(let i=0;i<arr1.length;i++){
        if(i!=arr1.length-1 && arr2[i]!=1){
        Jax+=`${arr1[i]}^{${arr2[i]}}`+"\\times"
        }
        else if(i!=arr1.length-1 && arr2[i]==1){
            Jax+=`${arr1[i]}`+"\\times"
            }
        else if(i==arr1.length-1 && arr2[i]!=1){
            Jax+=`${arr1[i]}^{${arr2[i]}}`
        }
        else{
            Jax+=`${arr1[i]}`
        }
    }
    Jax+="}$"
    document.getElementById("factorResult").innerHTML=document.getElementById("factorResult").innerHTML+Jax
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"factorResult"]);
    }
    else{
        document.getElementById("factorResult").innerHTML=document.getElementById("factorResult").innerHTML+"Error"
    }

}