
const winners = document.getElementById('page-top');
let totalNoOfWinners = 0;
let totalNoOfCashWinners = 0;
let totalNoOfAirtimeWinners = 0;
let totalAmountWon = 0;
let totalCashWon = 0;
let totalAirtimeWon = 0;

//winners.addEventListener('click', getWinners)
 

async function getWinners(){
     await fetch('https://be-spin-mtn.ydafrica.com/api/v1/admin/getAllWinners', 
     {
         method: 'GET',
        headers: {
             'Accept' : 'application/json, text/plain, */*' ,
            'Content-type' : 'application/json',
            'x-auth-token' : localStorage.getItem('token')

         }
     })
     .then((res) => res.json())
     .then(function(data) {
        console.log(data);
         let newArray = [];
        
         for(let i=0; i<data.doc.allWinners.length; i++){
           
            newArray.push(data.doc.allWinners[i].msisdn)
            newArray.push(data.doc.allWinners[i].itemValue)
            newArray.push(data.doc.allWinners[i].winningDate.slice(0,10))
            newArray.push(data.doc.allWinners[i].itemCategory)

            const rowElement = document.createElement('tr')

            const threeDotIcons = document.createElement('button');
            threeDotIcons.className = 'bi bi-three-dots-vertical';

            for(const item of newArray){
                const elements = document.createElement('td')
                elements.style.border = '1px solid #dddddd';
                elements.appendChild(threeDotIcons);

                elements.textContent = item;
                rowElement.appendChild(elements)

            }
            document.querySelector('.tbody').appendChild(rowElement)
           
            newArray = [];
         }

         totalNoOfWinners = data.doc.allWinners.length;
         for(let i=0; i<data.doc.allWinners.length; i++){
             if(data.doc.allWinners[i].itemCategory == 'Cash'){
                 totalNoOfCashWinners += 1;
                 totalCashWon += Number(data.doc.allWinners[i].itemValue);
             }
             else{
                 totalNoOfAirtimeWinners += 1;
                 totalAirtimeWon += Number(data.doc.allWinners[i].itemValue);
             }
         }
         console.log(totalNoOfAirtimeWinners);
         console.log(totalNoOfCashWinners);
         console.log(totalNoOfWinners)
         console.log(totalCashWon, totalAirtimeWon);

         for(let i=0; i<data.doc.allWinners.length; i++){
             totalAmountWon += Number(data.doc.allWinners[i].itemValue)
         }
        console.log('Total Amount Won:', totalAmountWon);
        
         document.querySelector('.totalWinners').textContent = totalNoOfWinners.toLocaleString('en-US');
         document.querySelector('.totalCashWinners').textContent = totalNoOfCashWinners.toLocaleString('en-US');
         document.querySelector('.totalAirtimeWinners').textContent = totalNoOfAirtimeWinners.toLocaleString('en-US');

         document.querySelector('.totalAmount').textContent = '₦' + totalAmountWon.toLocaleString('en-US');
         document.querySelector('.totalCash').textContent = '₦' + totalCashWon.toLocaleString('en-US');
         document.querySelector('.totalAirtime').textContent = '₦' + totalAirtimeWon.toLocaleString('en-US');

         document.querySelector('.eml').textContent = localStorage.getItem('email');
         console.log(localStorage.getItem('email'))

         //i<data.doc.allWinners.length;
         //console.log(data.doc.allWinners[1].length);
     })
 }


 getWinners();