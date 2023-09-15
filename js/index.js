const body = document.getElementById('page-top');
const dashboard = document.querySelector('.dashboard');

const revenue = document.querySelector('.revenue');
const subscriptions = document.querySelector('.subscriptions');

//body.addEventListener('click', getRevenue);
//body.addEventListener('click', getWinners);

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
        'x-auth-token': localStorage.getItem('token')
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
        console.log(data);

        const grossMonthly = document.querySelector('.gm');
        grossMonthly.textContent = '₦' +renewalReveue.toLocaleString('en-US');

        const newRev = document.querySelector('.nw');
        newRev.textContent = '₦' + totalRev.toLocaleString('en-US');

        const newR = document.querySelector('.nr');
        newR.textContent = '₦' + addRev.toLocaleString('en-US');

        document.querySelector('.eml').textContent = localStorage.getItem('email');
        console.log(localStorage.getItem('email'))

    })
   
  
}
getRevenue();
