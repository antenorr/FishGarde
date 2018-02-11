
var MongoClient = require('mongodb').MongoClient;
const Promise = require('promise');



var tabletojson = require('tabletojson');
var url = 'https://govt.westlaw.com/nycrr/Document/I21c04bfbc22211ddb7c8fb397c5bd26b?viewType=FullText&originationContext=documenttoc&transitionType=CategoryPageItem&contextData=(sc.Default)';

//INITIAL VERSION OF THE CODE
// const regultionData = tabletojson.convertUrl(url, function(tablesAsJson) {
//   var listofRegs = tablesAsJson[0];
//   for (let i = 0;i < listofRegs.length; i++) {
//       if(listofRegs[i].Water.includes('(a)') ||listofRegs[i].Water.includes('(b)') || listofRegs[i].Water.includes('(c)') || listofRegs[i].Water.includes('(d)') ) {
//       listofRegs[i].Water = listofRegs[i].Water.slice(listofRegs[i].Water.indexOf(')') + 2 )
//         }
//         if(listofRegs[i].Water === '') {
//             listofRegs[i].Water  = listofRegs[i-1].Water 
//         } 
//     };
    
//    return listofRegs;
//     // console.log(listofRegs);
// });
// console.log(regultionData);
//  //console.log(regultionData);  SCOPE ISSIUE!!

//PROMISES
const result = new Promise((resolve, reject) => {
    tabletojson.convertUrl(url, (tablesAsJson) => {
        var listofRegs = tablesAsJson[0];
        for (let i = 0;i < listofRegs.length; i++) {
            if(listofRegs[i].Water.includes('(a)') ||listofRegs[i].Water.includes('(b)') || listofRegs[i].Water.includes('(c)') || listofRegs[i].Water.includes('(d)') ) {
            listofRegs[i].Water = listofRegs[i].Water.slice(listofRegs[i].Water.indexOf(')') + 2 )
            };
            if(listofRegs[i].Water === '') {
              listofRegs[i].Water  = listofRegs[i-1].Water 
            }; 
        };
        console.log(listofRegs);
        return listofRegs;
    })});
    var regulationData = result.then((data) => {
        //console.log(data);
        return data;
    }).catch(err => console.log(err));
  
   


 db.collection('inventory').insertMany(
        regulationData 
    ).then(function(result) {
    // process result
    console.log(result.insertedIds);
})



// var uri = "mongodb+srv://fishGarde:<fishGarde>@cluster0-sxcos.mongodb.net/test";
// MongoClient.connect(uri, function(err, db) {
// // Paste the following examples here

// db.close();
// });

/**
 * resources used -
 * 
 * https://govt.westlaw.com/nycrr/Document/I21c04bfbc22211ddb7c8fb397c5bd26b?viewType=FullText&originationContext=documenttoc&transitionType=CategoryPageItem&contextData=(sc.Default)
 * 
 * https://www.npmjs.com/package/tabletojson
 * 
 * https://www.npmjs.com/package/mongodb
 * 
 * https://docs.mongodb.com/manual/introduction/
 * http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/
 * https://university.mongodb.com/
 * https://university.mongodb.com/courses/M101JS/about
 */


