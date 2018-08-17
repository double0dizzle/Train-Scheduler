   // Initialize Firebase
   var config = {
    apiKey: "AIzaSyC6fdGNSpTXoEHF1FVMzAkHQjCloQpTx68",
    authDomain: "trainscheduler-ffd0a.firebaseapp.com",
    databaseURL: "https://trainscheduler-ffd0a.firebaseio.com",
    projectId: "trainscheduler-ffd0a",
    storageBucket: "trainscheduler-ffd0a.appspot.com",
    messagingSenderId: "23722958544"
  };
  firebase.initializeApp(config);
  var database = firebase.database();


 


$("#fullForm").on("click", function(event){
    event.preventDefault();
    // employeeName = ("<tr><td>hi</td></tr>")
    // employeeRole = ("<tr><td>hi</td></tr>")
    // startDate = ("<tr><td>hi</td></tr>")
    // monthlyRate = ("<tr><td>hi</td></tr>")
    // a.addClass("jaredactyl");
    var train = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();
    // var frequency = Math.floor(Math.random() * 60) + 1;

    // $("#train").append(a);
    database.ref().push({
        train: train,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    })
    
})

// nextTrain = nextTrain.format("HH:mm A");
// var nextTrain = moment().fromNow(tMinutesTillTrain, "minutes")

database.ref().on("child_added", function(childsnap){
    console.log(childsnap.val());

    var tFrequency = childsnap.val().frequency;
// var tFrequency = Math.floor(Math.random() * 60) + 1;
var firstTime = childsnap.val().firstTrainTime;
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);
var currentTime = moment();
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
var tRemainder = diffTime % tFrequency;
var tMinutesTillTrain = tFrequency - tRemainder;
var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm A");

    $("tbody").append("<tr><td>" + childsnap.val().train + "</td><td>" + childsnap.val().destination + "</td><td>" + childsnap.val().firstTrainTime+ "</td><td>" + childsnap.val().frequency+ "</td><td>" + tMinutesTillTrain + "</td><td></td></tr>")
  
})


// $("#full-member-list").append("<div class='well'><span class='member-name'> " + childSnapshot.val().name +
//         " </span><span class='member-email'> " + childSnapshot.val().email +
//           " </span><span class='member-age'> " + childSnapshot.val().age +
//             " </span><span class='member-comment'> " + childSnapshot.val().comment + " </span></div>");


// Current Time
