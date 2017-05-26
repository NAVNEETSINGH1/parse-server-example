
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});


Parse.Cloud.define("push", function(request, response){
  console.log('entered cloud push :  - '+JSON.stringify(request));  
  var message = request.params.message;
    //Pushes work with Installation table
    //So, you need to select to whom you want to push
    var installationQuery = new Parse.Query(Parse.Installation);

    //You should set expiration time when push will be expired
    //This is optional
    var expDate = new Date();
    expDate.setDate(expDate.getDate() + 1); //The notification will expire in 1 day

    //Setting up push data
    var data = {"badge": "Increment", "sound": "default"};
    data['alert'] = message;

     console.log('sending cloud push : installationQuery : '+JSON.stringify(installationQuery)+' data : '+JSON.stringify(data)+' expiration_time : '+JSON.stringify(expDate)); 
     Parse.Push.send({
        where: installationQuery,
        data: data,
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
