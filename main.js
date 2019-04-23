
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
      var loginErrorMsg = document.getElementById('error');
      currUser.innerHTML = localStorage.getItem("currUsername");
      //var testBig = document.getElementById('testBig');
      //myDatabase.child('users').on('value', snap => testBig.innerText = snap.val());

      function registerUser(uName, pass) {
      	var usersRef = myDatabase.child("users");
      	var newUser = usersRef.child(uName);
        usersRef.orderByChild("username").equalTo(uName).on("value", function(snapshot) {
          if (snapshot.exists()) {
            console.log("Someone with that username already exists!"); //show taken user message
      	    loginErrorMsg.innerHTML = "Someone with that username already exists!";
          } else {
            newUser.set({
          		password: pass,
              username: uName
          	});
            console.log("New user registered"); //take to home page
            //currUser.innerHTML = uName;
            localStorage.setItem("currUsername", uName);
            currUser = localStorage.getItem("currUsername");
	          window.location.href="ListOfBoxes.html";
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
	            localStorage.setItem("currUsername", uName);
	            window.location.href="ListOfBoxes.html";
            } else {
              console.log("Invalid username or password"); //show invalid user/pass message
	            loginErrorMsg.innerHTML = "Invalid username or password";
            }
          } else {
            console.log("Invalid username or password"); //show invalid user/pass message
            loginErrorMsg.innerHTML = "Invalid username or password";
          }
        });
      }


      function logout() {
        //currUser.innerHTML = null;
	      window.location.href="index.html";
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
