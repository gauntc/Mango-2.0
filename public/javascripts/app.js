var app = window.angular.module('app', []);

app.factory('activityFetcher', activityFetcher)
app.controller('mainCtrl', mainCtrl)

function activityFetcher ($http) {
  var o = {activities: []}
  var API_ROOT = 'activities'
  return {
    get: function() {
      return $http.get(API_ROOT)
      .then(function (resp) {
        return resp.data
      })
    },

    // destroy: function(activity) {
    //   return $http.delete('/activities/' + activity.text + '/' + activity.author, {headers:
    //      {Authorization: 'Bearer'}
    //    }).success(function(data) {
    //      console.log(data);
    //    })
    // }
  }
}

function mainCtrl ($scope, activityFetcher, $http) {
  var h1 = document.getElementsByTagName('time')[0],
    seconds = 0, minutes = 0, hours = 0,
    t;
  var time;
  function add() {
      seconds++;
      if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
              minutes = 0;
              hours++;
          }
      }

      time = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
      h1.textContent = time;
      timer();
  }
  function timer() {
      t = setTimeout(add, 1000);
  }
  timer();

  $scope.activities = []

  activityFetcher.get()
  .then(function (data) {
    $scope.activities = data
  })

  $scope.addActivity = function() {
    var formData = {title:$scope.title,time:time};
    clearTimeout(t);
    timer();
    console.log(formData);
    var activityURL = 'activities';
    $http({
      url: activityURL,
      method: "POST",
      data: formData
    }).success(function(data, status, headers, config) {
      console.log("Post worked");
      $scope.activities.push(formData);
    }).error(function(data, status, headers, config) {
      console.log("Post failed");
    });
    $scope.text = "";
  }

  $scope.deleteActivity = function() {
    $http({
      url: 'activities',
      method: "DELETE",
    }).success(function(status){
      console.log("deleted");
      $scope.activities = [];
    }).error(function(status){
      console.error("Post failed");
    });
  }

}
