
      function CreateFunction() { 
        document.getElementById("demo").innerHTML = "huh";
      }
      function JoinFunction() { 
        document.getElementById("demo").innerHTML = "Attempting to Join";
      }

//firebase.initializeApp(config);
var myDatabase = firebase.database();

function writeData() {
	var uName = "bob";
	var pass = "ross";
	var uid = "testID";
	firebase.myDatabase().ref().child("users").child(uid).push().set( {
		username: uName,
		password: pass
	});
	document.getElementById("demo").innerHTML = "maybe";
}

/*
function writeData() {
	var usernameObject = {
		username: bob
	};
	firebase.database().ref('users').push().set(usernameObject)
        .then(function(snapshot) {
            document.getElementById("demo").innerHTML = "maybe"; // some success method
        }, function(error) {
            console.log('error' + error);
            error(); // some error method
        });
}
*/
