const plaintextcontainer = document.querySelector(".plaintext");
const pnqcontainer=document.querySelector(".pnq");
const encryptioncontainer=document.querySelector(".encryptionshowarea");
const decryptioncontainer=document.querySelector(".decryptionshowarea");
const gcdcontainer=document.querySelector(".gcdshowarea");
const dbarcontainer=document.querySelector(".dshowarea");

const alphabet=[ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"," "]
const alphabetmap = new Map([["a", 0], ["b" ,1 ] ,["c", 2],["d",3],["e",4],["f",5],["g",6],["h",7],["i",8],["j",9],["k",10],["l",11],["m",12],["n",13],["o",14],["p",15],["q",16],["r",17],["s",18],["t",19],["u",20],["v",21],["w",22],["x",23],["y",24],["z",25],[" ",26]]);

document.getElementById("Button2").disabled = true;

async function RSA()
{   
    var message=document.forms["myform"]["plaintext"].value;
    message=message.toLowerCase();
    message=message.split(" ").join("");
    var arr=new Array();
    var ciphertext=new Array();
    var plain=new Array();
    var p=document.forms["myform"]["fpn"].value;
    var q=document.forms["myform"]["spn"].value;
    var stri="p = "+p+" q= "+q;

    if(isPrime(p)==false || isPrime(q)==false)
    {
        console.log("please enter only prime numbers");
        window.location.reload();
        window.alert("please enter only prime numbers");
        return;
    }

    if(p<=2 || q<=2)
    {
        console.log("please enter the large prime numbers");
        window.location.reload();
        window.alert("please enter the larger prime numbers");
        return;
    }


    // printing plaintext blocks
    for (let i = 0; i < message.length; i += 1) {

        const value = message.charAt(i);
        
        const bar = document.createElement("div");
    
        bar.classList.add("plaintextbar");
    
        bar.style.height = `${45}px`;
    
        bar.style.transform = `translateX(${i * 30}px)`;
        
        const barLabel = document.createElement("label");
    
        barLabel.classList.add("bar_id");
    
        barLabel.innerHTML = value;
        
        bar.appendChild(barLabel);
    
        plaintextcontainer.appendChild(bar);
    
        await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, 300)
            );
       }


       //converting into numbers
       let ptbars=document.querySelectorAll(".plaintextbar");

       for (let i = 0; i < message.length; i += 1) {

        const value = alphabetmap.get(message.charAt(i));
        
        ptbars[i].style.backgroundColor="red";
        ptbars[i].childNodes[0].innerText=value;

        
        await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, 300)
            );
        ptbars[i].style.backgroundColor="rgb(0, 183, 255)";
        ptbars[i].childNodes[0].innerText=value;

       }

    
    createbars(p,0,"p=","p="+p);
    await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, 1000)
            );

    createbars(q,1,"q=","q="+q);
    await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, 1000)
            );

    createbars(p*q,2,"n=","n=(p*q)");
    await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, 1000)
            );

    createbars((p-1)*(q-1),3,"Z=","Z=(p-1)*(q-1)");
    await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, 1000)
            );
    
    const keys=generate_keypair(p,q);


    var e=keys[0];
    var d=keys[1];
    var n=keys[2];

    createbars(e,4,"e=","gcd(e,z)=1");
    await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, 1000)
            );
                
    createbars(d,5,"d=","ed(modz)=1");
    await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, 1000)
            );
    
    console.log("The value of e,d,n is "+e+","+d+","+n);

    for(let i=0;i<message.length;i++)
    {
        let c=message.charAt(i);
        arr.push(alphabetmap.get(c));
    }

    document.getElementById("eformula").innerHTML="C=P^e(modn)";
    for(let i=0;i<arr.length;i++)
    {
        ciphertext.push(Encrypt(arr[i],e,n));

        const bar = document.createElement("div");
        
        bar.classList.add("encryptionbar");
    
        bar.style.height = `${45}px`;

        bar.style.transform = `translateX(${i * 30}px)`;

        const barLabel = document.createElement("label");
    
        barLabel.classList.add("bar_id");

        barLabel.innerHTML = ciphertext[i];
        bar.appendChild(barLabel);

        encryptioncontainer.appendChild(bar);
        document.getElementById("encryptioncalc").innerHTML=arr[i]+"^"+e+"(mod"+n+")";
        bar.style.backgroundColor="red";
        ptbars[i].style.backgroundColor="red";
    
        await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, 1000)
            );
        bar.style.backgroundColor="yellow";
        ptbars[i].style.backgroundColor="rgb(0, 183, 255)";
    }
    document.getElementById("encryptioncalc").innerHTML="";
    
    document.getElementById("dformula").innerHTML="P=C^d(modn)";
    let ctbars=document.querySelectorAll(".encryptionbar");

    for(let i=0;i<ciphertext.length;i++)
    {
        plain.push(Decrypt(ciphertext[i],d,n));

        const bar = document.createElement("div");
        
        bar.classList.add("decryptionbar");
    
        bar.style.height = `${45}px`;

        bar.style.transform = `translateX(${i * 30}px)`;

        const barLabel = document.createElement("label");
    
        barLabel.classList.add("bar_id");

        barLabel.innerHTML = plain[i];
        bar.appendChild(barLabel);

        decryptioncontainer.appendChild(bar);

        document.getElementById("decryptioncalc").innerHTML=ciphertext[i]+"^"+d+"(mod"+n+")";
        bar.style.backgroundColor="red";
        ctbars[i].style.backgroundColor="red";
        
        await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, 1000)
            );
        bar.style.backgroundColor="lightgreen";
        ctbars[i].style.backgroundColor="yellow";
    }

    document.getElementById("decryptioncalc").innerHTML="";


    console.log("The text is "+arr);
    console.log("The ciphertext is "+ciphertext);
    console.log("The plaintext is "+plain);
    
}

 function createbars(value,i,sent,current_operation)
{

        const bar = document.createElement("div");
        
        bar.classList.add("pqzbar");
    
        bar.style.height = `${45}px`;

        bar.style.transform = `translateX(${i * 70}px)`;

        const barLabel = document.createElement("label");
    
        barLabel.classList.add("bar_id");

        barLabel.innerHTML = sent+value;
        document.getElementById("operation").innerHTML=current_operation;
        bar.appendChild(barLabel);
        pnqcontainer.appendChild(bar);

}


function GCD(number1,number2)
{
    if (number2 == 0)
        return number1;
    return GCD(number2, number1%number2);
}

function isPrime(n)
{
    if (n <= 1)
        return false;
  
    for (let i = 2; i < n; i++)
        if (n % i == 0)
            return false;

    return true;
}

  function generate_keypair(p,q)
{
    var n=p*q;
    var z=(p-1)*(q-1);

    console.log("The value of p,q is "+p+","+q);

   

    

   var e=Math.floor(Math.random()*(z+1));
   console.log(e);
   var g=GCD(e,z);

        var bar = document.createElement("div");
        
        bar.classList.add("gcdbar");
    
        bar.style.height = `${45}px`;

        const barLabel = document.createElement("label");
    
        barLabel.classList.add("bar_id");

        barLabel.innerHTML = e;
        bar.appendChild(barLabel);

        gcdcontainer.appendChild(bar);

        

   console.log(g);


   // it does not work if p=2 and q=3 because gcd(2,2)=2 always and it goes in to an infinite loop
    while(g!=1 || e<=1 || e>=z)
    {
        console.log("The number is not a co-prime");
        e=Math.floor(Math.random()*(z+1));
       
        g=GCD(e,z);
 
    }

    document.getElementById("gcdcalc").innerHTML="gcd(e,z)= 1";
    barLabel.innerHTML=e;
    bar.style.backgroundColor="rgb(0, 183, 255)";

    var d=Math.floor(Math.random()*(1000000));

    console.log(d);

    while(((e*d)%z)!=1)
    {
        d=Math.floor(Math.random()*(1000000));
        console.log(d);
    }

    var bard = document.createElement("div");
            
        bard.classList.add("dbar");

        bard.style.height = `${45}px`;

        const bardLabel = document.createElement("label");

        bardLabel.classList.add("bar_id");

        bardLabel.innerHTML = d;
        bard.appendChild(bardLabel);

        dbarcontainer.appendChild(bard);
        bard.style.backgroundColor="lightgreen";
        document.getElementById("dcalc").innerHTML="exd(mod z)"+"=1";
        bard.style.backgroundColor="rgb(0, 183, 255)";

    
    const arr=new Array(e,d,n);
    console.log(e+" "+d+" "+n);
    return arr;

}

function Encrypt(p,e,n)
{
    return (BigInt(p)**BigInt(e)%BigInt(n));
}


function Decrypt(c,d,n)
{
    return (BigInt(c)**BigInt(d)%BigInt(n));
}


function randomize()
{
    window.location.reload();
}


function disable()
{
	document.getElementById("Button1").disabled = true;
	document.getElementById("Button2").disabled = true;
	document.getElementById("Button3").disabled = true;
}