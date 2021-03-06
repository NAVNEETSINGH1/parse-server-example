
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});


Parse.Cloud.define("push", function(request, response){
  console.log('entered cloud push :  - '+JSON.stringify(request));  
  var message = request.params.message;
 message="working?";
  var username=request.user.username;
  username='tyvBhQkJpq2Zzs8pUAEHrV0Qd';
console.log('username:'+username);
 var query = new Parse.Query(Parse.User);
 query.equalTo('username', username);
console.log("query :"+JSON.stringify(query));
  // Find devices associated with these users
 var installationQuery = new Parse.Query(Parse.Installation);
  // need to have users linked to installations
  query.equalTo('username', username);
 installationQuery.matchesQuery('user', query);
  // Find devices associated with these users
  //Pushes work with Installation table
    //So, you need to select to whom you want to push
   

    //You should set expiration time when push will be expired
    //This is optional
    var expDate = new Date();
    expDate.setDate(expDate.getDate() + 1); //The notification will expire in 1 day

    //Setting up push data
    var data = {"badge": "Increment", "sound": "default"};
    data['alert'] = message;
     console.log(typeof installationQuery);
     console.log('sending cloud push : installationQuery : '+JSON.stringify(installationQuery) +' data : '+JSON.stringify(data)+' expiration_time : '+JSON.stringify(expDate)); 
     Parse.Push.send({
        where: installationQuery,
        data: data,
        uri: "https://parseexampleapp.herokuapp.com/parse/push",
        expiration_time: expDate
    }, { useMasterKey: true })
     .then(function () {
          cosole.log('push funcation callback success :'+response);
                     response.success("Pushed successfully");
        }, function (error) {
          console.log('push funcation  error  :  - '+JSON.stringify(error));  
          response.error(error);
        });
});




Parse.Cloud.define("sendPush", function(request, response){
  console.log('entered cloud sendPush :  - '+JSON.stringify(request));  
  var message = request.params.message;
 message="working?";
  var username=request.user.username;
 username='tyvBhQkJpq2Zzs8pUAEHrV0Qd';
 var query = new Parse.Query(Parse.User);
 query.equalTo('username', username);
  // Find devices associated with these users
  var installationQuery = new Parse.Query(Parse.Installation);
  // need to have users linked to installations
 installationQuery.matchesQuery('user', query);               
   var expDate = new Date();
    expDate.setDate(expDate.getDate() + 1); //The notification will expire in 1 day

    //Setting up push data
    var data = {"badge": "Increment", "sound": "default"};
    data['alert'] = message;

     console.log('sending cloud push : installationQuery : '+JSON.stringify(installationQuery)+' data : '+JSON.stringify(data)+' expiration_time : '+JSON.stringify(expDate)); 
     Parse.Push.send({
        where: installationQuery,
        data: data,
         uri: "https://parseexampleapp.herokuapp.com/parse/push",
        expiration_time: expDate
    },{
        success: function () {
          cosole.log('push funcation callback success :'+response);
           
                     response.success("Pushed successfully");
        },
        error: function (error) {
          console.log('push funcation  error  :  - '+JSON.stringify(error));  
          response.error(error);
        },
        useMasterKey: true
    });
});
