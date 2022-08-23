// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABrf_YpFesLu_NO4J4I7mzw9qmo15eUUU",
  authDomain: "pishawari-icecream-7770a.firebaseapp.com",
  projectId: "pishawari-icecream-7770a",
  storageBucket: "pishawari-icecream-7770a.appspot.com",
  messagingSenderId: "710410579229",
  appId: "1:710410579229:web:41d1e3a9f5bf5073c905f4",
  measurementId: "G-SRNFZLRH2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const auth = getAuth();



//_________________________Contact Us____________________________

var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

window.contact = function () {
var name = document.getElementById("name");
var email = document.getElementById("email");
var number = document.getElementById("number");
var message = document.getElementById("message");


var reference = ref(database, 'Contacts/');
var newRef = push(reference);
set(newRef,{
  Name:name.value,
  Email:email.value,
  Number:number.value,
  Message:message.value,
  Id: newRef.key,
  Time: new Date().getHours() + ":" + new Date().getMinutes(),
  Date: new Date().getDate() + " : " + (month[new Date().getMonth()])+ " : " + new Date().getFullYear(),
  });

name.value="";
email.value= "";
number.value= "";
message.value= "";

}

//_________________________Contact Us____________________________

//_________________________Feedback____________________________

window.sendData = function () {
  var feedback = document.getElementById("feedback");
  var reference = ref(database, 'Feedbacks/');
  var newRef = push(reference);
  set(newRef, {
    text: feedback.value,
    time: new Date().getHours() + ":" + new Date().getMinutes(),
    id: newRef.key,
    Date: new Date().getDate() + " : " + (month[new Date().getMonth()])+ " : " + new Date().getFullYear(),
  });
  feedback.value = "";
}

//_________________________Feedback____________________________

//_________________________SignUpForm____________________________

window.SignUp = function () {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var contact = document.getElementById('contact').value;
  var obj = {
    name,
    email,
    password,
    contact,
    Time: new Date().getHours() + ":" + new Date().getMinutes(),
    Date: new Date().getDate() + " : " + (month[new Date().getMonth()])+ " : " + new Date().getFullYear(),
  }

  console.log(obj);
 
  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (successfully) {
      obj.id = successfully.user.uid;
      var reference = ref(database, 'users/' + obj.id + '/');
      set(reference, obj);
      console.log(" User creates Successfully =======>", successfully);
      window.location.href = "index.html";

    })
    .catch(function (Error) {
      var parent = document.getElementById("errorMessage");
      parent.innerHTML = '';
      parent.innerHTML = `<p class="text-danger" >${Error.message}</p>`;

    });
}



//_________________________SignUpForm____________________________

window.readMore = function () {
  console.log("chal raha")
  var expandPara = "Peshawari Ice Cream</b> is one of topest ice cream in Pakistan, We have all variety of ice cream flavours,fresh juices, milk shakes and lemonades.Karachi is known for a wide range of mouth-watering delicacies and dishes. But there is one thing which has stood the test of time – Peshawari ice cream. Yes, Peshawari ice cream was born in Karachi, not Peshawar. Three brothers, experimenting with different flavours, set up a humble ice-cream shop and named it after their hometown. That’s is why in Peshawar, you will find a billboard saying “Karachi ki mashoor Peshawari ice cream- ab yahan”. (Karachi’s famous Peshawari ice cream is now available here)."
document.getElementById("show-para").innerHTML = expandPara;
}

//___________________________order__________________________//


window.order =function(){
var OName = document.getElementById("name");
var OEmail = document.getElementById("email");
var OContact = document.getElementById("contact");
var OFood = document.getElementById("food");
var Omuch = document.getElementById("much");
var ODetail = document.getElementById("detials");
var OAddress = document.getElementById("address");

 var reference = ref(database, 'Order/');
  var newRef = push(reference);
  set(newRef,{
    Name:OName.value,
    Email:OEmail.value,
    Contact:OContact.value,
    Food:OFood.value,
    Detail:ODetail.value,
    Address:OAddress.value,
    Quantity:Omuch.value,
    id: newRef.key,
    Time: new Date().getHours() + ":" + new Date().getMinutes(),
    Date: new Date().getDate() + " : " + (month[new Date().getMonth()])+ " : " + new Date().getFullYear(),
  } );
  
  swal({
    title: "Are you sure?",
    text: "Kya App Order Karna Chahtay Hain",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Good job!! Your Order Succcessfully Recieved", {
        icon: "success",
      });
    } else {
      swal("OOH", "Your Order Cancel Successfully!", "success");
    }
  });

  OName.value= "";
  OEmail.value= "";
  OContact.value= "";
  OFood.value= "";
  ODetail.value= "";
  Omuch.value= "";
  OAddress.value= "";

}




// _________________________Login_________________________



window.login = function () {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var contact = document.getElementById('contact').value;
  var obj = {
    name,
    email,
    password,
    contact,
    Time: new Date().getHours() + ":" + new Date().getMinutes(),
  }

  console.log(obj);
  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then((userCredential) => {
    
      const user = userCredential.user;
      console.log(user.uid);
      var userRef = ref(database, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        window.location.href ="index.html";
      });
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
     
    });
}


const scrollBtn = document.getElementById("scroll");

const btnVisibility = () => {
  if (window.scrollY > 400) {
      scrollBtn.style.visibility = "visible";
  } else {
      scrollBtn.style.visibility = "hidden";
  }
};

document.addEventListener("scroll", () => {
  btnVisibility();
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
});