const alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const alphabetmap = new Map([["a", 0], ["b" ,1 ] ,["c", 2],["d",3],["e",4],["f",5],["g",6],["h",7],["i",8],["j",9],["k",10],["l",11],["m",12],["n",13],["o",14],["p",15],["q",16],["r",17],["s",18],["t",19],["u",20],["v",21],["w",22],["x",23],["y",24],["z",25]]);

var message;

document.getElementById("Button2").disabled = true;

function generatebars() {
	/* pass container , barname to the createbars function   */
	createbars(".plaintext","plaintextbar",message.length);
	creatematrix(".keymatrix","keymatrixbar");
	createbars(".product","productbar",message.length);
	createbars(".ciphertext","ciphertextbar1",message.length);
	creatematrix(".inversekeymatrix","inversematrixbar");
	createbars(".ciphertext2","ciphertextbar2",message.length);
	createbars(".product2","productbar2",message.length);
	createbars(".plaintext2","plaintextbar2",message.length);
}


// bar creator function
async function createbars(container_name,barname,size)
{
	const container=document.querySelector(container_name);

	for (let i = 0; i < size; i += 1) {

		let value = "";
	
		const bar = document.createElement("div");
	
		bar.classList.add(barname);
	
		bar.style.height = `${45}px`;
	
		bar.style.transform = `translateY(${i * 50}px)`;
		
		const barLabel = document.createElement("label");
	
		barLabel.classList.add("bar_id");
	
		barLabel.innerHTML = value;
		
		bar.appendChild(barLabel);
	
		container.appendChild(bar);
	
	} 
	
}

// matrix creator function
function creatematrix(container_name,barname,size)
{
	const container=document.querySelector(container_name);

	for (let i = 0; i < size; i += 1) 
 	{
	 for(let j=0;j< size ;j++)
	 {
		 let value = "";

		 const bar = document.createElement("div");

		 bar.classList.add(barname);
 
		 bar.style.height = `${45}px`;
 
		 bar.style.transform = `translate(${j*35}px,${i*50}px)`;
		 
		const barLabel = document.createElement("label");

		barLabel.classList.add("bar_id");
 
		barLabel.innerHTML = value;
		 
		bar.appendChild(barLabel);
		
		container.appendChild(bar);
	 }
	 
  }

}



async function Encrypt(delay = 600) {

	// put empty bars on screen
	message=document.forms["myform"]["plaintext"].value;
	createbars(".plaintext","plaintextbar",message.length);
	creatematrix(".keymatrix","keymatrixbar",message.length);
	createbars(".product","productbar",message.length);
	createbars(".ciphertext","ciphertextbar1",message.length);

	//get reference to different bars
	let plaintextbars=document.querySelectorAll(".plaintextbar");
    let one_d_keymatrixbars = document.querySelectorAll(".keymatrixbar");
    let productbars=document.querySelectorAll(".productbar");
	let ciphertextbars1=document.querySelectorAll(".ciphertextbar1");

	let keymatrixbars = new Array(plaintextbars.length);

	// initialize plaintext bars with characters of message
	for(let i=0;i<plaintextbars.length;i++)
    {
		plaintextbars[i].style.backgroundColor = "red";

        plaintextbars[i].childNodes[0].innerText = message.charAt(i);
		await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 600)
        	);

		plaintextbars[i].style.backgroundColor = "rgb(0, 183, 255)";

    }

	//convert message characters  in to numbers in plaintext bars
	for(let i=0;i<plaintextbars.length;i++)
    {
		plaintextbars[i].style.backgroundColor = "red";

        plaintextbars[i].childNodes[0].innerText = alphabetmap.get(message.charAt(i));
		await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 600)
        	);

		plaintextbars[i].style.backgroundColor = "rgb(0, 183, 255)";

    }

	// initializing key matrix with random numbers
	for(let i=0;i<plaintextbars.length*plaintextbars.length;i++)
    {
		one_d_keymatrixbars[i].style.backgroundColor = "red";
        one_d_keymatrixbars[i].childNodes[0].innerText = Math.floor(Math.random()*(100));
		await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 200)
        	);
		one_d_keymatrixbars[i].style.backgroundColor = "rgb(0, 183, 255)";
    }

	
	// declare 2-d array
	for(let i=0;i<plaintextbars.length;i++)
    {
        keymatrixbars[i]=new Array(plaintextbars.length);
    }

	let iter=0;

	//convert 1d-matrix in to 2d-matrix
	for(let i=0;i<plaintextbars.length;i++)
	{
		for(let j=0;j<plaintextbars.length;j++)
		{
			keymatrixbars[i][j]=one_d_keymatrixbars[iter];
			iter=iter+1;
		}
	}


	for(let i=0;i<message.length;i++)
	{
		var sum=0;
		productbars[i].style.backgroundColor="red";

		for(let j=0;j<message.length;j++)
		{
			keymatrixbars[i][j].style.backgroundColor="red";
			plaintextbars[j].style.backgroundColor="red";
			
			sum=sum+keymatrixbars[i][j].childNodes[0].innerHTML*plaintextbars[j].childNodes[0].innerHTML;

			await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 1000)
        	);

			keymatrixbars[i][j].style.backgroundColor="rgb(0, 183, 255)";
			plaintextbars[j].style.backgroundColor="rgb(0, 183, 255)";

		}
		productbars[i].childNodes[0].innerHTML=sum;
		productbars[i].style.backgroundColor="rgb(0, 183, 255)";

	}


	for(let i=0;i<message.length;i++)
	{
		ciphertextbars1[i].style.backgroundColor = "yellow";

		ciphertextbars1[i].childNodes[0].innerText=(productbars[i].childNodes[0].innerHTML)%26;

		await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 1000)
        	);

	}

    // To enable the button "Decrypt" 
    document.getElementById("Button2").disabled = false;
    document.getElementById("Button2").style.backgroundColor = "white";
}

async function Decrypt(delay = 600) {

	creatematrix(".inversekeymatrix","inversekeymatrixbar",message.length);
	createbars(".ciphertext2","ciphertextbar2",message.length);
	createbars(".product2","productbar2",message.length);
	createbars(".plaintext2","plaintextbar2",message.length);
	

	let ciphertextbars1 = document.querySelectorAll(".ciphertextbar1");
	let ciphertextbars2 = document.querySelectorAll(".ciphertextbar2");
	let productbars2  = document.querySelectorAll(".productbar2");
	let plaintextbars = document.querySelectorAll(".plaintextbar");
	let plaintextbars2 = document.querySelectorAll(".plaintextbar2");
	let one_d_keymatrixbars = document.querySelectorAll(".keymatrixbar");
	let one_d_inversekeymatrixbars = document.querySelectorAll(".inversekeymatrixbar");


	// copy the contents of the ciphertext
	for(let i=0;i<message.length;i++)
	{
		ciphertextbars2[i].style.backgroundColor = "red";
		ciphertextbars1[i].style.backgroundColor = "red";

		ciphertextbars2[i].childNodes[0].innerText=ciphertextbars1[i].childNodes[0].innerHTML;
		
		await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 1000)
        	);

		ciphertextbars2[i].style.backgroundColor = "yellow";
		ciphertextbars1[i].style.backgroundColor = "yellow";

	}

	for(let i = 0 ; i < message.length * message.length ; i++)
	{
		one_d_inversekeymatrixbars[i].style.backgroundColor = "red";
		one_d_keymatrixbars[i].style.backgroundColor = "red";

		one_d_inversekeymatrixbars[i].childNodes[0].innerText = one_d_keymatrixbars[i].childNodes[0].innerText;
		await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 300)
        	);
		
		one_d_inversekeymatrixbars[i].style.backgroundColor = "rgb(0, 183, 255)";
		one_d_keymatrixbars[i].style.backgroundColor = "rgb(0, 183, 255)";
		
	}
	
	let inversekeymatrixbars = new Array(message.length);

	for(let i = 0 ; i < message.length ; i++)
	{
		inversekeymatrixbars[i] = new Array(message.length);
	}

	let iterator = 0;
	for(let i = 0 ; i < message.length ; i++)
	{
		for(let j = 0 ; j < message.length ; j++)
		{
			inversekeymatrixbars[i][j] = one_d_inversekeymatrixbars[iterator].childNodes[0].innerText;
			iterator = iterator + 1;
			
		}
	}


	let adj = new Array(message.length);
	let inv = new Array(message.length);

	
	for(let i=0;i< message.length;i++)
	{
        adj[i]=new Array(message.length);
        inv[i]=new Array(message.length);
	}

	adjoint(inversekeymatrixbars,adj)
	display(adj);
	inverse(inversekeymatrixbars,inv)
	display(inv);

	iterator = 0;
	for(let i = 0 ; i < message.length ; i++)
	{
		for(let j = 0 ; j < message.length ; j++)
		{
			one_d_inversekeymatrixbars[iterator].style.backgroundColor = "red";
			one_d_inversekeymatrixbars[iterator].childNodes[0].innerText = inv[i][j];
			await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            },300)
        	);
			one_d_inversekeymatrixbars[iterator].style.backgroundColor = "rgb(0, 183, 255)";
			iterator = iterator + 1;
			
		}
	}

	iterator = 0;
	for(let i = 0 ; i < message.length ; i++)
	{
		for(let j = 0 ; j < message.length ; j++)
		{
			inversekeymatrixbars[i][j] = one_d_inversekeymatrixbars[iterator];
			iterator = iterator + 1;
		}
	}


	for(let i=0;i<message.length;i++)
	{
		var sum=0;
		productbars2[i].style.backgroundColor="red";

		for(let j=0;j<message.length;j++)
		{
			inversekeymatrixbars[i][j].style.backgroundColor="red";
			ciphertextbars2[j].style.backgroundColor="red";
			
			sum=sum+inversekeymatrixbars[i][j].childNodes[0].innerHTML*ciphertextbars2[j].childNodes[0].innerHTML;

			await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 1000)
        	);

			inversekeymatrixbars[i][j].style.backgroundColor="rgb(0, 183, 255)";
			ciphertextbars2[j].style.backgroundColor="rgb(0, 183, 255)";

		}
		productbars2[i].childNodes[0].innerHTML=sum;
		productbars2[i].style.backgroundColor="rgb(0, 183, 255)";

	}

	for(let i = 0 ; i < message.length ; i++)
	{
		plaintextbars2[i].style.backgroundColor = "lightgreen";

		plaintextbars2[i].childNodes[0].innerText=(plaintextbars[i].childNodes[0].innerHTML);

		await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 1000)
        	);
		
	}

	for(let i = 0 ; i < message.length ; i++)
	{
		plaintextbars2[i].style.backgroundColor = "red";

		plaintextbars2[i].childNodes[0].innerText = alphabet[plaintextbars2[i].childNodes[0].innerText] ;

		await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 1000)
        	);
		
		plaintextbars2[i].style.backgroundColor = "lightgreen";
	}

	
	document.getElementById("Button3").disabled = false;
	document.getElementById("Button3").style.backgroundColor = "white";	

}

function display(A)
{
    for (let i = 0; i < message.length; i++)
    {
        for (let j = 0; j < message.length; j++)
            console.log(A[i][j]+ " ");
        console.log("\n");
    }
}

function getCofactor(A,temp,p,q,n)
{
    let i = 0, j = 0;
   
    for (let row = 0; row < n; row++)
    {
        for (let col = 0; col < n; col++)
        {
            
            if (row != p && col != q)
            {
                temp[i][j++] = A[row][col];
    
                if (j == n - 1)
                {
                    j = 0;
                    i++;
                }
            }
        }
    }
}

function method(a,m) 
{
    if(a>0)
	{
        return (a%m);
	}
    else
	{
        var k = Math.floor(Math.abs(a)/m)+1;
	}

    return method(a+k*m,m);
}

function determinant(A,n)
{
    let D = 0; 
   
   
    if (n == 1)
        return A[0][0];
   
    let temp = new Array(message.length);
    for(let i=0;i< message.length;i++)
    {
        temp[i]=new Array(message.length);
    }
   
    let sign = 1; 
   
    
    for (let f = 0; f < n; f++)
    {
        
        getCofactor(A, temp, 0, f, n);
        D += sign * A[0][f]* determinant(temp, n - 1);
   
        sign = -sign;
    }
   
    return D;
}

function modInverse(a, m) 
{
    a = a % m; 
	for(let x = 1 ; x < m ; x++)
	{
        if ((a * x) % m == 1) 
		{
            return x ;
		}
	}
    return 1;
}

function inverse(A,inverse_matrix)
{
    let det = determinant(A, message.length);
	det = modInverse(determinant,26);

	console.log("The value of det is : " + det);

    if (det == 0)
    {
        document.write("Singular matrix, can't find its inverse");
        return false;
    }
   
    let adj = new Array(message.length);

    for(let i = 0 ; i < message.length ; i++)
    {
        adj[i] = new Array(message.length);
    }

    adjoint(A, adj);
   
    for (let i = 0; i < message.length; i++)
        for (let j = 0; j < message.length; j++)
            inverse_matrix[i][j] = (adj[i][j]/det)%26;
    
    return true;

}

function  adjoint(A,adj)
{
    if (message.length == 1)
    {
        adj[0][0] = 1;
        return;
    }
   
    let sign = 1;
    let temp = new Array(message.length);

    for(let i=0; i < message.length ;i++)
    {
        temp[i]=new Array(message.length);
    }
   
    for (let i = 0; i < message.length; i++)
    {
        for (let j = 0; j < message.length; j++)
        {
            getCofactor(A, temp, i, j, message.length);
   
            sign = ((i + j) % 2 == 0)? 1: -1;
   
            adj[j][i] = Math.round((sign)*(determinant(temp, message.length-1)));
			adj[j][i] = method(adj[j][i],26);
        }
    }
}



// reset the board
function randomize()
{
    window.location.reload();
}

function disable_all_buttons()
{
	document.getElementById("Button1").disabled = true;
	document.getElementById("Button2").disabled = true;
	document.getElementById("Button3").disabled = true;
}



























