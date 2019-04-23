
      function CreateFunction() {
        document.getElementById("demo").innerHTML = "huh";
      }
      function JoinFunction() {
        document.getElementById("demo").innerHTML = "Attempting to Join";
      }

      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyBJSpeiLpsALteamK8s4i86EPbVARLGLi0",
        authDomain: "suggestion-box-c58b1.firebaseapp.com",
        databaseURL: "https://suggestion-box-c58b1.firebaseio.com",
        projectId: "suggestion-box-c58b1",
        storageBucket: "suggestion-box-c58b1.appspot.com",
        messagingSenderId: "608313282468"
      };
      firebase.initializeApp(config);

      var myDatabase = firebase.database().ref();
      var currUser = document.getElementById('currUser');
      var consoleMsg = document.getElementById('consoleMsg');
      //var testBig = document.getElementById('testBig');
      //myDatabase.child('users').on('value', snap => testBig.innerText = snap.val());

      function registerUser(uName, pass) {
      	var usersRef = myDatabase.child("users");
      	var newUser = usersRef.child(uName);
        usersRef.orderByChild("username").equalTo(uName).on("value", function(snapshot) {
          if (snapshot.exists()) {
            console.log("Someone with that username already exists!"); //show taken user message
            consoleMsg.innerHTML = "Someone with that username already exists!";
          } else {
            newUser.set({
          		password: pass,
              username: uName
          	});
            console.log("New user registered"); //take to home page
            consoleMsg.innerHTML = "New user registered";
            currUser.innerHTML = uName;
          }
        });

      }

      function login(uName, pass) {
        var usersRef = myDatabase.child("users");
        usersRef.orderByChild("username").equalTo(uName).on("value", function(snapshot) {
          if (snapshot.exists()) {
            console.log("exists");
            var passWord;
            snapshot.forEach(function(childSnapshot) {
              var key = childSnapshot.key;
              passWord = childSnapshot.val();
            });
            if (passWord.password === pass) {
              console.log("Successful Login"); //take to home page
              currUser.innerHTML = uName;
            } else {
              console.log("Invalid username or password"); //show invalid user/pass message
            }
          } else {
            console.log("Invalid username or password"); //show invalid user/pass message
          }
        });
      }

      function logout() {
        currUser.innerHTML = null;
      }

      function createBox(t, d) {
        var allBoxesRef = myDatabase.child("suggestion boxes");
        var newBox = allBoxesRef.child(currUser.innerText+":"+t);
        newBox.once("value").then(function(snapshot) {
          if (snapshot.exists()) {
            console.log("A box with this title already exists!") //show error message for user trying to create a box they already have
          } else {
            newBox.set({
              title: t,
              description: d,
              owner: currUser.innerText
            });
            var userRef = myDatabase.child("/users/" + currUser.innerText + "/my boxes");
            userRef.child(t).set({title: t});
          }
        });
      }

      function deleteBox(t) {
        var allBoxesRef = myDatabase.child("suggestion boxes");
        var newBox = allBoxesRef.child(currUser.innerText+":"+t);
        newBox.once("value").then(function(snapshot) {
          if (snapshot.exists()) {
            newBox.remove();
            var userRef = myDatabase.child("/users/" + currUser.innerText + "/my boxes");
            userRef.child(t).remove();
          } else {
            console.log("This box does not exist") //this error message should be impossible to reach via the website
          }
        });
      }

      /*
      parameters:
        o: owner of the suggestion box you are making a suggestion to
        t: title of the suggestion box you are suggesting to
        s: the contents of the suggestion
      */
      function addSuggestion(o, t, s) {
        var allBoxesRef = myDatabase.child("suggestion boxes");
        var thisBox = allBoxesRef.child(o+":"+t);
        thisBox.once("value").then(function(snapshot) {
          if (snapshot.exists()) {
            thisBox.child("suggestions").push().set({suggestion: s});
          } else {
            console.log("This box does not exist") //this error message should be impossible to reach via the website
          }
        });
      }




      /*
      returns array of suggestions associated with currUser's box with title t
      assumes that the user is logged in and is looking at a valid title, otherwise returnArray is empty
      return array of suggestions in the form of strings
      */
      function viewSuggestions(t) {
        var returnArray = [];
        var boxSugRef = myDatabase.child("suggestion boxes/"+currUser.innerText+":"+t+"/suggestions");
        boxSugRef.once("value").then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var suggestion = childSnapshot.child("suggestion").val();
            returnArray.push(suggestion);
          });
         })
         console.log(returnArray);
      }

      /*shows all boxes for homepage
      READING FROM THE DATABASE
      returnarray[0] = Title
      returnarray[1] = Description
      returnArray[2] = Owner
      */
      function viewAllBoxes() {
        var returnArray = [];
        var allBoxesRef = myDatabase.child("suggestion boxes");
        var index = 0;
        allBoxesRef.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var boxTitle = childSnapshot.child("title").val();
              var boxDes = childSnapshot.child("description").val();
              var boxOwner = childSnapshot.child("owner").val();
              returnArray.push([boxTitle, boxDes, boxOwner]);
            });
         })
         console.log(returnArray);
         return returnArray;
      }

      /*
      returns a 2D array of currUser's boxes
      returnarray[0] = Title
      returnarray[1] = Description
      */
      function viewMyBoxes() {
        var returnArray = [];
        var allBoxesRef = myDatabase.child("suggestion boxes");
        allBoxesRef.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var boxTitle = childSnapshot.child("title").val();
              var boxDes = childSnapshot.child("description").val();
              var boxOwner = childSnapshot.child("owner").val();
              if (boxOwner === currUser.innerText) {
                returnArray.push([boxTitle, boxDes]);
              }
            });
         })
         console.log(returnArray);
         return returnArray;
      }
