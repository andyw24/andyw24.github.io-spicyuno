
      function CreateFunction() { 
        document.getElementById("demo").innerHTML = "huh";
      }
      function JoinFunction() { 
        document.getElementById("demo").innerHTML = "Attempting to Join";
      }

function createUser() {
	var uName = "bob";
	var pass = "ross";
	var uid = "testID";
	firebase.database().ref('users/' + uid).set( {
		username: uName,
		password: pass
	});
}


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
