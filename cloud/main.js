
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});


var query = new Parse.Query(Parse.Installation);
query.equalTo('channels', 'test-channel');

Parse.Push.send(
  {
    where: query,
    data: 
    {
      alert: 'Test',
      badge: 1,
      sound: 'default'
    }
  }, 
  {
    success: function() {
      console.log('##### PUSH OK');
    },
    error: function(error) {
      console.log('##### PUSH ERROR');
    }
  },
  { useMasterKey: true });
