
      function CreateFunction() { 
        document.getElementById("demo").innerHTML = "huh";
      }
      function JoinFunction() { 
        document.getElementById("demo").innerHTML = "Attempting to Join";
      }

function createUser() {
	var uName = "bob";
	var pass = "ross";
	firebase.database().ref('users/' + uName).set( {
		username: uName,
		password: pass
	});
}
 
