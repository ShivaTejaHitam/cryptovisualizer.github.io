const container = document.querySelector(".data-container");
const container2=document.querySelector(".data-container2");

const alphabet=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',' '];
const alphabetmap = new Map([["A", 0], ["B" ,1 ] ,["C", 2],["D",3],["E",4],["F",5],["G",6],["H",7],["I",8],["J",9],["K",10],["L",11],["M",12],["N",13],["O",14],["P",15],["Q",16],["R",17],["S",18],["T",19],["U",20],["V",21],["W",22],["X",23],["Y",24],["Z",25],[" ",26]]);

document.getElementById("Button2").disabled = true;

async function generatebars(num = 26) {
for (let i = 0; i < num; i += 1) {

	const value = alphabet[i];
	
	const bar = document.createElement("div");

	bar.classList.add("bar");

	bar.style.height = `${45}px`;

	bar.style.transform = `translateX(${i * 30}px)`;
	
	const barLabel = document.createElement("label");

	barLabel.classList.add("bar_id");

	barLabel.innerHTML = value;
	
	bar.appendChild(barLabel);

	container.appendChild(bar);

	await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 100)
        );
   }

}


//Encryption 

async function Encrypt(delay = 600) {
	
	var plaintext=document.forms["myform"]["plaintext"].value;
	plaintext=plaintext.toUpperCase();
	var shift=parseInt(document.forms["myform"]["shift"].value);
	console.log(plaintext);
	console.log(typeof(shift));

	for (let i = 0; i < plaintext.length; i += 1) {

		const value = plaintext.charAt(i);
		
		const bar = document.createElement("div");
	
		bar.classList.add("bar2");
	
		bar.style.height = `${45}px`;
	
		bar.style.transform = `translateX(${i * 30}px)`;
		
		const barLabel = document.createElement("label");
	
		barLabel.classList.add("bar_id");
	
		barLabel.innerHTML = value;
		
		bar.appendChild(barLabel);
	
		container2.appendChild(bar);
		await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 100)
        );

	}




	//document.getElementById("plaintextlabel").innerHTML="Cipher Text";


    let bars = document.querySelectorAll(".bar");
    let bars2=document.querySelectorAll(".bar2");
    
    for (var i = 0; i < bars2.length; i += 1) {
    
		bars2[i].style.backgroundColor = "darkblue";
		let present=alphabetmap.get(bars2[i].childNodes[0].innerHTML);
		if(present!=26)
		{
		let next=(alphabetmap.get(bars2[i].childNodes[0].innerHTML)+shift)%26;
		console.log(shift+" "+present+" "+next);

        bars[present].style.backgroundColor = "darkblue";
        bars[next].style.backgroundColor = "red";
        bars2[i].childNodes[0].innerText=alphabet[next];
		
        await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 1000)
        );
    
        
		bars[present].style.backgroundColor = "rgb(24, 190, 255)";
		bars[next].style.backgroundColor = "rgb(24, 190, 255)";
		}
		
        bars2[i].style.backgroundColor = "yellow";
    }
	
    
    document.getElementById("Button2").disabled = false;
}

//Decryption
async function Decrypt(delay = 600) {

		//document.getElementById("plaintextlabel").innerHTML="Plain Text";
		var shift=parseInt(document.forms["myform"]["shift"].value);
		console.log("the shift is"+shift);
		let bars = document.querySelectorAll(".bar");
		let bars2=document.querySelectorAll(".bar2");
		
		for (var i = 0; i < bars2.length; i += 1) {
		
			bars2[i].style.backgroundColor = "darkblue";
			let present=alphabetmap.get(bars2[i].childNodes[0].innerHTML);
			if(present!=26)
			{
			let next=(alphabetmap.get(bars2[i].childNodes[0].innerHTML)-shift)%26;
			if(next<0)
			{
				next=26+next;
			}
			console.log(next);
			bars[present].style.backgroundColor = "darkblue";
			bars[next].style.backgroundColor = "red";
			bars2[i].childNodes[0].innerText=alphabet[next];

	
		await new Promise((resolve) =>
			setTimeout(() => {
			resolve();
			}, 1000)
		);
		
			
		bars[present].style.backgroundColor = "rgb(24, 190, 255)";
		bars[next].style.backgroundColor = "rgb(24, 190, 255)";
			}
		bars2[i].style.backgroundColor = "lightgreen";

	}


	document.getElementById("Button3").disabled = false;
	document.getElementById("Button3").style.backgroundColor = "white";

	
}
    
generatebars();


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
