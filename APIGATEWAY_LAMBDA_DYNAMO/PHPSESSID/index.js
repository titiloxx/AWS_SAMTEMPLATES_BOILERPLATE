const aws= require('aws-sdk')
const moment= require('moment-timezone')
var dynamodb = new aws.DynamoDB();

const put=(params)=> {
    return new Promise(function(resolve, reject) {
       dynamodb.putItem(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
    });
}

exports.handler=async (event)=>{
    console.log(JSON.stringify(event))
    const PHPSESSID=event.queryStringParameters.value
     var params = {
      Item: {
       "PHPSESSID": {
         S: PHPSESSID
        }, 
       "createdAt": {
         S: moment().tz('America/Argentina/Buenos_Aires').format()
        }
      }, 
      ReturnConsumedCapacity: "TOTAL", 
      TableName: "Chess"
     };
    let response=await put(params)
    console.log(response)
}