
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
 
