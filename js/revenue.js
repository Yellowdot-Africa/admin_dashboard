const body = document.getElementById('page-top');
const dashboard = document.querySelector('.dashboard');

const revenue = document.querySelector('.revenue');
const subscriptions = document.querySelector('.subscriptions');



let renewalReveue = 0;
let totalRev = 0;
let addRev = 0;
let currentPage = 1;
let rows = 10;


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

        
       // console.log(data, 'here');
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

        const grossMonthly = document.querySelector('.gross');
        grossMonthly.textContent = '₦' + totalRev.toLocaleString('en-US');
        const newRev = document.querySelector('.new');
        newRev.textContent =   '₦' +renewalReveue.toLocaleString('en-US');


        const newR = document.querySelector('.renewal');
        newR.textContent = '₦' + addRev.toLocaleString('en-US');

        let newArray = [];
        
        for(let i=0; i<data.doc.allSubRevenue.length; i++){
           
           newArray.push(data.doc.allSubRevenue[i].createdAt.slice(0,10))
           newArray.push(data.doc.allSubRevenue[i].additionRevenue)
           newArray.push(data.doc.allSubRevenue[i].renewalRevenue)
           newArray.push(data.doc.allSubRevenue[i].totalRevenue)

           const rowElement = document.createElement('tr')

           const threeDotIcons = document.createElement('button');
           threeDotIcons.className = 'bi bi-three-dots-vertical';
           
           //console.log(threeDotIcons);
           

           for(const item of newArray){
               const elements = document.createElement('td')
               elements.style.border = '1px solid #dddddd';
               elements.appendChild(threeDotIcons);
               elements.appendChild(threeDotIcons);

              // console.log(elements.appendChild(threeDotIcons))

               elements.textContent = item;
               rowElement.appendChild(elements)

           }
           document.querySelector('.tablebody').appendChild(rowElement);
           

           

            // $(document).ready( function () {
            //     $('#myTable').DataTable({
            //         "data": [{
            //             "Date": data.doc.allSubRevenue[i].createdAt.slice(0,10),
            //             "New Daily": data.doc.allSubRevenue[i].additionRevenue,
            //             "Renewal Revenue": data.doc.allSubRevenue[i].renewalRevenue,
            //             "Total": data.doc.allSubRevenue[i].totalRevenue
            //         }]
            //     });
            // });
            //Display(newArray, wrapper, 5, currentPage);
           
           newArray = [];
        }
        document.querySelector('.eml').textContent = localStorage.getItem('email');
         

    })
   
  
}
$(document).ready( function () {
    $('#myTable').DataTable();
});
getRevenue();




function Display(items,wrapper,rows,page){
    page--;

    let loopStart = rows * page;
    let paginatedItems = items.slice(loopStart, loopStart + rows)


    for(let i=0; i<10; i++){
        //console.log(paginatedItems[i])
    }
    

}
