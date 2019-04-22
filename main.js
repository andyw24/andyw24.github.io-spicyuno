
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
      //var testBig = document.getElementById('testBig');
      //myDatabase.child('users').on('value', snap => testBig.innerText = snap.val());

      function registerUser(uName, pass) {
      	var usersRef = myDatabase.child("users");
      	var newUser = usersRef.push()
        usersRef.orderByChild("username").equalTo(uName).on("value", function(snapshot) {
          if (snapshot.exists()) {
            console.log("Someone with that username already exists!"); //show taken user message
          } else {
            newUser.set({
          		password: pass,
              username: uName
          	});
            console.log("New user registered"); //take to home page
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
            } else {
              console.log("Invalid username or password"); //show invalid user/pass message
            }
          } else {
            console.log("Invalid username or password"); //show invalid user/pass message
          }
        });
      }
