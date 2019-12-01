/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

//Fnction that welcomes user
function welcome() {
    var welc = localStorage.getItem("email");
    document.getElementById("welcomeUser").innerHTML = welc;
}

//Function that send email and password to server
function login() {
    localStorage.clear();
    var http = new XMLHttpRequest();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var url = 'http://192.168.0.107:8080/login?email=' + email + '&password=' + password;
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var responseJSON = JSON.parse(this.responseText);
            var em = responseJSON.email;
            var pa = responseJSON.password;
            if (em == email && pa == password) {
                localStorage.setItem('email', responseJSON.email);
                // localStorage.setItem("var x", 0);
                console.log(responseJSON);
                location = "setup.html";
            } else {
                alert("Email or Password Invalid");
            }
        }
    };
    // open a connection 
    http.open("GET", url);
    // Set the request header i.e. which type of content you are sending 
    http.setRequestHeader("Content-Type", "application/json");
    //get request
    http.send();
}

//Method that Insert data into database (server)
function signUp() {

    // Creating a XHR object 
    let xhr = new XMLHttpRequest();
    let url = "http://192.168.0.107:8080/setPerson?";//server ip an script

    //Get values from input text
    var email1 = document.getElementById("email1").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
    var name1 = document.getElementById("name1").value;
    var smoker = document.getElementById("smoker1").value;
    var smoker1 = false;
    if (smoker == "Yes") {
        smoker1 = true;
    } else {
        smoker1 = false;
    }

    var age1 = document.getElementById("age1").value;
    var hobbie1 = document.getElementById("hobbie1").value;
    var hobbie2 = document.getElementById("hobbie2").value;
    var hobbie3 = document.getElementById("hobbie3").value;

    var latitude1 = null;
    var longitude1 = null;


    // open a connection 
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending 
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback 
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Print received data from server 
            console.log(this.responseText);
        }
    };

    // Converting JSON data to string 
    var data = JSON.stringify({
        "email": email1, "password": password1, "name": name1,
        "smoker": smoker1, "age": age1, "latitude": latitude1, "longitude":
            longitude1, "hobbies": [hobbie1, hobbie2, hobbie3]
    });

    xhr.send(data);
}



//Global variables
var x; // work with array
var myArray = []; //array of object
var emailMatch; // variable to save matchs

//select email user from array myArray
function selectYes() {

    if (myArray[x] != null) {
        document.getElementById("name2").innerHTML = myArray[x].name;
        document.getElementById("age2").innerHTML = myArray[x].age;
        document.getElementById("hobbie1").innerHTML = myArray[x].hobbies[0];
        document.getElementById("hobbie2").innerHTML = myArray[x].hobbies[1];
        document.getElementById("hobbie3").innerHTML = myArray[x].hobbies[2];

        matchList();//call method
        x = x + 1;// add + 1 to global variable, line 132
        updateUserHtml();//call method
    } else {
        alert("There are no more people");
    }
}

//Method that display information on the screen
function updateUserHtml() {

    document.getElementById("name2").innerHTML = myArray[x].name;
    document.getElementById("age2").innerHTML = myArray[x].age;
    document.getElementById("hobbie1").innerHTML = myArray[x].hobbies[0];
    document.getElementById("hobbie2").innerHTML = myArray[x].hobbies[1];
    document.getElementById("hobbie3").innerHTML = myArray[x].hobbies[2];
}


//select no for users from array myArray
function selectNo() {

    if (myArray[x] != null) {
        document.getElementById("name2").innerHTML = myArray[x].name;
        document.getElementById("age2").innerHTML = myArray[x].age;
        document.getElementById("hobbie1").innerHTML = myArray[x].hobbies[0];
        document.getElementById("hobbie2").innerHTML = myArray[x].hobbies[1];
        document.getElementById("hobbie3").innerHTML = myArray[x].hobbies[2];
        x = x + 1;
        updateUserHtml();
    } else {
        alert("There are no more people");
    }
}


//make a connection with server 
//get Array of users
function getUsers() {

    getLocation();

    var http = new XMLHttpRequest();
    var userEmail = localStorage.getItem("email");
    var km = sessionStorage.getItem("km");
    var url = 'http://192.168.0.107:8080/selectPeople?email=' + userEmail + '&param=' + km;
    x = 0;

    //You can do another if statement for  another status
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var arrayUsers = this.responseText;
            myArray = JSON.parse(arrayUsers);
            console.log(myArray);
            updateUserHtml();

        }
    };
    // open request
    http.open("GET", url, true);
    // send content type
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
}


//Function that assigns user's email to another user
//in other to make a list of users you can contact
function matchList() {
    var http = new XMLHttpRequest();
    var email1 = localStorage.getItem("email");
    emailMatch = myArray[x].email;
    //var email2 = localStorage.getItem("email-match");
    var url = 'http://192.168.0.107:8080/setPersonMatch?email1=' + email1 + '&email2=' + emailMatch;

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var responseJSON = this.responseText;
            console.log(responseJSON);
            //other if statements

        };
    }
    // open connection
    http.open("GET", url);
    http.setRequestHeader("Content-Type", "application/json");
    http.send();

}

// Function to get you device location and set it into server ================================
function getLocation() {
    navigator.geolocation.getCurrentPosition(geoCallback, onError);
}

//Bring your location
function geoCallback(position) {
    console.log(position);
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    if (latitude != null || longitude != null) {
        setGeoLocation(latitude, longitude);// call method and send data to another function
    } else {
        alert("Please, Turn on your GPS");
    }
}

//Error fuction
function onError(message) {
    console.log(message);
}

//Working
function setGeoLocation(latitude, longitude) {
    // Creating a XHR object 
    let xhr = new XMLHttpRequest();
    let url = "http://192.168.0.107:8080/setGeoLocation?";//server ip an script
    var email = localStorage.getItem("email");

    // open a connection 
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending 
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback 
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Print received data from server 
            console.log(this.responseText);
        }
    };

    // Converting JSON data to string 
    var data = JSON.stringify({
        "email": email, "latitude": latitude, "longitude": longitude
    });

    xhr.send(data);

}


//===================================================================================


function getMatches() {
    var  myObj, x, txt = "";

    var http = new XMLHttpRequest();
    var email1 = localStorage.getItem("email");
    var url = 'http://192.168.0.107:8080/selectMyMatches?email=' + email1;

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            txt += "<table id='customers'>"
            for (x in myObj) {
                txt += "<tr><td>" + myObj[x].name + "</td></tr>";
                txt += "<tr><td>" + myObj[x].email + "</td></tr>";
                txt += "<tr><td>" + myObj[x].age + "</td></tr>";
                txt += "<tr><td>" + "</td></tr>";
            }
            txt += "</table>"
            document.getElementById("demo").innerHTML = txt;
        
    };
}
// open connection
http.open("GET", url);
http.setRequestHeader("Content-Type", "application/json");
http.send();
}
