
      function CreateFunction() {
        document.getElementById("demo").innerHTML = "huh";
      }
      function JoinFunction() {
        document.getElementById("demo").innerHTML = "Attempting to Join";
      }
function createBoxTable(tableData) {
  //var tableData=viewAllBoxes();
  var table = document.getElementById("niceTable");
  //var table = document.createElement('table');
  var tableBody = document.createElement('tbody');
  var tableLoc = document.getElementById("tableMaybe");

  //var row = document.createElement('tr');
  //var cell = document.createElement('th');
  //cell.appendChild("hello");
  //row.appendChild(cell);
  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('th');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });
    var btn = document.createElement("BUTTON");
      btn.innerHTML = "Want to make a suggestion?";
      btn.class = "delbutton";
      btn.id="addSuggestion";
      var clickEvent = "addSuggestion(\"";
      clickEvent += rowData[2];
      clickEvent += "\",\"";
      clickEvent += rowData[0];
      clickEvent += "\",";
      clickEvent += "document.getElementById(\"sugg\").value)";
      console.log(clickEvent);
      btn.onclick= function() { addSuggestion(rowData[2],rowData[0],document.getElementById("sugg").value);};
      var btnhold = document.createElement('td');
      btnhold.appendChild(btn);
      row.appendChild(btnhold);


    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  //tableLoc.appendChild(table);
  //document.body.appendChild(table);
  console.log(tableData.length);
  
}
function createSuggestionTable(tableName,tableData) {
  //var tableData=viewAllBoxes();
  var table = document.getElementById("SuggTable");
  //var table = document.createElement('table');
  var tableBody = document.createElement('tbody');
  var tableLoc = document.getElementById("suggList");

  //var row = document.createElement('tr');
  //var cell = document.createElement('th');
  //cell.appendChild("hello");
  //row.appendChild(cell);
  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('th');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });
    var btn = document.createElement("BUTTON");
      btn.innerHTML = "Delete";
      btn.class = "delbutton";
      btn.id="delSugg";
      var clickEvent = "deleteSuggestion(\"";
      clickEvent += tableName
      clickEvent += "\",\"";
      clickEvent += rowData[0];
      clickEvent += "\")";
      console.log(clickEvent);
      btn.onclick= function() { deleteSuggestion(tableName,rowData[0]);};
      var btnhold = document.createElement('td');
      btnhold.appendChild(btn);
      row.appendChild(btnhold);


    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  //tableLoc.appendChild(table);
  //document.body.appendChild(table);
  console.log(tableData.length);
  
}

function createProfileTable(tableData) {
  //var tableData=viewAllBoxes();
  var table = document.getElementById("profileTable");
  //var table = document.createElement('table');
  var tableBody = document.createElement('tbody');
  var tableLoc = document.getElementById("profileLoc");
  //var row = document.createElement('tr');
  //var cell = document.createElement('th');
  //cell.appendChild("hello");
  //row.appendChild(cell);
  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');
    
    var ln = document.createElement('a');
      ln.innerText = rowData[0];
      ln.href="ListOfSuggestions.html";
      var lnhold = document.createElement('th');
      lnhold.appendChild(ln);
      row.appendChild(lnhold);
/*    var btn = document.createElement("BUTTON");
      btn.innerText = "Delete";
      btn.class = "delbutton";
      btn.onclick= function() { console.log("Delete dis");};
=======*/
/*    rowData.forEach(function(cellData) {
      var cell = document.createElement('th');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });*/
    var cell = document.createElement('th');
      cell.appendChild(document.createTextNode(rowData[1]));
      row.appendChild(cell);

    var btn = document.createElement("BUTTON");
      btn.innerHTML = "Delete Box";
      btn.class = "delbutton";
      btn.id="delBox";
      var clickEvent = "deleteBox(\"";
      clickEvent += rowData[0];
      clickEvent += "\"";
      clickEvent += ")";
      console.log(clickEvent);
      btn.onclick= function() { deleteBox(rowData[0]);};
      var btnhold = document.createElement('td');
      btnhold.appendChild(btn);
      row.appendChild(btnhold);


    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  //tableLoc.appendChild(table);
  //document.body.appendChild(table);
  console.log(tableData.length);
  
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
      var currUser = document.getElementsByClassName('currUser');
      var loginErrorMsg = document.getElementById('error');
      //currUser.innerHTML = localStorage.getItem("currUsername");
      var i;
      for (i = 0; i < currUser.length; i++) {
        currUser[i].innerHTML = localStorage.getItem("currUsername");
      }
      //var testBig = document.getElementById('testBig');
      //myDatabase.child('users').on('value', snap => testBig.innerText = snap.val());
/*
      function getReload() {
        currUser = localStorage.getItem("currUsername");
      }
      function switchPage(page) {
        localStorage.setItem("currUsername", currUser);
        window.location.href=page;
      }
*/
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
        var newBox = allBoxesRef.child(localStorage.getItem("currUsername") +":"+t);
	//console.log(currUser.innerText + ":" + t);
        newBox.once("value").then(function(snapshot) {
          if (snapshot.exists()) {
            console.log("A box with this title already exists!") //show error message for user trying to create a box they already have
          } else {
            newBox.set({
              title: t,
              description: d,
              owner: localStorage.getItem("currUsername") 
            });
            var userRef = myDatabase.child("/users/" + localStorage.getItem("currUsername")  + "/my boxes");
            userRef.child(t).set({title: t});
	    window.location.reload(false);
          }
        });
      }

function makeProfileTableHTML() {
    var myArray = viewMyBoxes();
    var result = "<table align='center'>";
    result += "<tr> <th>Your Boxes</th> <th></th> </tr>"
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>";
        for(var j=0; j<myArray[i].length; j++){
            result += "<th>"+myArray[i][j]+"</th>";
        }
        result += "<th><button type='button' id ='delbox' class='delbutton' onclick='document.getElementById(&quot;demo&quot;).innerHTML = BoxCreate()'>Delete</button></th>"
        result += "</tr>";
    }
    result += "</table>";

    return result;
}
function makeBoxTableHTML() {
    var myArray = viewAllBoxes();
    var result = "<table align='center'>";
    result += "<tr> <th>Box Name</th> <th>Description</th> <th>Suggest?</th> </tr>"
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>";
        for(var j=0; j<2; j++){
            result += "<th>"+myArray[i][j]+"</th>";
        }
        result += "<th><button type='button' id ='addSuggestion' onclick='document.getElementById(&quot;demo&quot;).innerHTML"
        result += " = addSuggestion(myArray[i][2],myArray[i][0],&quot;Communist Manifesto&quot;)'>Want to suggest something?</button></th>"
        result += "</tr>";
    }
    result += "</table>";

    return result;
}
function makeSuggestionTableHTML() {
    var myArray = viewSuggestions("Book Fair");
    var result = "<table align='center'>";
    result += "<tr> <th>Suggestion</th> <th>Delete Button</th> </tr>"
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>";
        for(var j=0; j<myArray[i].length; j++){
            result += "<th>"+myArray[i][j]+"</th>";
        }
        result += "<th><button type='button' id ='delSugg' class='delbutton' onclick='document.getElementById(&quot;demo&quot;).innerHTML = BoxCreate()'>Delete</button></th>"
        result += "</tr>";
    }
    result += "</table>";

    return result;
}
//function addBoxSuggestionButton() {
  //var para = document.createElement("BUTTON");
  //para.innerHTML = "Want to make a suggestion?";
  //document.getElementById("addSuggestion").appendChild(para);
//}

      function deleteBox(t) {
        var allBoxesRef = myDatabase.child("suggestion boxes");
        var newBox = allBoxesRef.child(localStorage.getItem("currUsername") +":"+t);
        newBox.once("value").then(function(snapshot) {
          if (snapshot.exists()) {
            newBox.remove();
            var userRef = myDatabase.child("/users/" + localStorage.getItem("currUsername") + "/my boxes");
            userRef.child(t).remove();
  	    window.location.reload(false);
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
      function deleteSuggestion(t,s){
        //placeholder function
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
          createSuggestionTable(t,returnArray);
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
	   createBoxTable(returnArray);

         })
         console.log(returnArray);
         //console.log(returnArray.length);	  
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
              if (boxOwner === localStorage.getItem("currUsername")) {
                returnArray.push([boxTitle, boxDes]);
              }
            });
            createProfileTable(returnArray);
         })
         console.log(returnArray);
         return returnArray;
      }
/*
      document.getElementById("curruser").innerHTML=currUser.innerText();
      document.getElementById("tableMaybe").innerHTML = makeProfileTableHTML();
      document.getElementById("myBoxes").innerHTML = makeBoxTableHTML();
      document.getElementById("suggList").innerHTML = makeSuggestionTableHTML();
*/
