const form = document.querySelector('.needs-validation');
const dashboard = document.querySelector('.dashboard');
const winners = document.querySelector('.winners');
const revenue = document.querySelector('.revenue');
const subscriptions = document.querySelector('.subscriptions');
let newToken ='';


// dashboard.addEventListener('dblclick', getRevenue);
// winners.addEventListener('click', getWinners);
    // window.location.href = 'index.html' ;

async function authenticateCredentials(e) {
    e.preventDefault();

      
    let email = document.querySelector(".email").value ;
    const password = document.querySelector('.password').value ;
    console.log(email, password, 'here');

////jsonplaceholder.typicode.com/posts
//
    await fetch('https:be-spin-mtn.ydafrica.com/api/v1/auth-admin', 
      {
        method: 'POST',
        headers : {
            'Accept' : 'application/json, text/plain, */*' ,
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
        

      })
     .then((res) => res.json())
     .then(function(data) {
      newToken = data.token;
      e
      //console.log(newToken);
      localStorage.setItem('token', newToken);
      localStorage.setItem('email', email);
      console.log(data)
      
       
      if(data.status === 200){
              window.location.href = 'index.html' ;
         }
      console.log(newToken)


     } );
    
     
  


}

form.addEventListener('submit', authenticateCredentials);



let renewalReveue = 0;
let totalRev = 0;
let addRev = 0;

async function getRevenue(e) {

   await fetch('https://be-spin-mtn.ydafrica.com/api/v1/admin/getAllSubRevenue', 
   { 
   method: 'GET',
    headers : {
        'Accept' : 'application/json, text/plain, */*' ,
        'Content-type' : 'application/json',
        'x-auth-token': newToken
    }
    })
    .then((res) => res.json())
    .then(function(data) 
    {
         for(let i=0; i<data.doc.allSubRevenue.length; i++){
             renewalReveue += data.doc.allSubRevenue[i].renewalRevenue

         }
         for(let i=0; i<data.doc.allSubRevenue.length; i++){
            totalRev += data.doc.allSubRevenue[i].totalRevenue

        }
        for(let i=0; i<data.doc.allSubRevenue.length; i++){
            addRev += data.doc.allSubRevenue[i].additionRevenue

        }
        //console.log(data.doc.allSubRevenue[3].totalRevenue)
        //console.log(data.doc.allSubRevenue.length);
        console.log('Renewal Revenue:',renewalReveue);
        console.log('Total:',totalRev);
        console.log('Additon:', addRev);

        const grossMonthly = document.querySelector('.gm');
        grossMonthly.textContent = renewalReveue.toLocaleString('en-US');

        const newRev = document.querySelector('.nw');
        newRev.textContent = totalRev.toLocaleString('en-US');

        const newR = document.querySelector('.nr');
        newR.textContent = addRev.toLocaleString('en-US');

    })
    
  
}

async function getWinners(e){
    await fetch('https://be-spin-mtn.ydafrica.com/api/v1/admin/getAllWinners', 
    {
        method: 'GET',
        headers: {
            'Accept' : 'application/json, text/plain, */*' ,
            'Content-type' : 'application/json',
            'x-auth-token' : newToken

        }
    })
    .then((res) => res.json())
    .then(function(data) {
        console.log(data);
    })
}
