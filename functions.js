// Initialize Firebase server api
var config = {
  apiKey: "AIzaSyD4WbKGk37cw68SM4zAA9ZakywahHyeyGI",
  authDomain: "librarymanagmentsystem-ce706.firebaseapp.com",
  databaseURL: "https://librarymanagmentsystem-ce706.firebaseio.com",
  projectId: "librarymanagmentsystem-ce706",
  storageBucket: "librarymanagmentsystem-ce706.appspot.com",
  messagingSenderId: "533299745296"
};
firebase.initializeApp(config);

// setting the filter and database to be global variables to be used
var database = firebase.firestore();
var filter = "";
//var userId = getUserId();

// function that searches for books/authors/etc
function search(){
  // search entry gets what user typed and also the database of books
  var searchEntry = document.getElementById('search').value;
  var book = database.collection("books");
  var table = document.getElementById("bookTable");

  // makes sure to remove all the rows before the code starts
  // this allows for table to look normaly every search
  removeRows();
  // counts rows up and gets books
  var rowCount = 1;
  book.get().then(function(querySnapshot) {
    querySnapshot.forEach(function (documentSnapshot){
      // going through each book in the database to allow for searching filters
      // getting all the info related to all books
      var data = documentSnapshot.data();
      var bookname = data.book_name;
      var author = data.book_author;
      var genre = data.Genre;
      var searchFilter = "";

      // checking if the filter they chose matches the filter in search
      if(filter == "author"){
        var searchFilter = author.toLowerCase();
      }
      else if(filter == "genre"){
        var searchFilter = genre.toLowerCase();
      }
      else{
        var searchFilter = bookname.toLowerCase();
      }

      // setting the filter and search value to lower case
      var searchEntryLower = searchEntry.toLowerCase();

      if(searchFilter.includes(searchEntryLower) == true){
        // adding a new row in the table if what they wanted is there.
        var published = data.Published;
        var quantity = data.Quantity;
        var id = data.book_id;

        var row = table.insertRow(rowCount);
        rowCount = rowCount + 1;
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        var cell6 = row.insertCell(6);
        var cell7 = row.insertCell(7);
        cell0.innerHTML = bookname;
        cell1.innerHTML = author;
        cell2.innerHTML = published;cell5.innerHTML = "N/A";
        cell3.innerHTML = id;
        cell4.innerHTML = genre;
        cell5.innerHTML = quantity;
        cell6.innerHTML = "nosoftcopy";


        createButton(cell7, quantity);
      }
    })
  });
}

// goes through and removes all the rows of the table except for the first one
function removeRows(){
  var table = document.getElementById("bookTable");
  var rowlength = table.rows.length;
  while( rowlength > 1){
    table.deleteRow(rowlength -1);
    rowlength = table.rows.length;
  }
}

// makes it so that the search bar activitates when they hit "enter"
var input = document.getElementById("search");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});

// setting the filter to search books by their title
function setFilterTitle(){
  filter = "title";
  var element = document.getElementById("currentFilter");
  document.getElementById("filterValue").innerHTML = "Search: Title";
}

// setting the filter to search books by their author
function setFilterAuthor(){
  filter = "author";
  document.getElementById("filterValue").innerHTML = "Search: Author";
}

// setting filter to search books by their genre
function setFilterGenre(){
  filter = "genre";
  document.getElementById("filterValue").innerHTML = "Search: Genre";
}

// check status page for the users
function checkStatus()
{
  var user = database.collection('users');
  user.get().then(function(user) {
    var status = user.get("id");

    if (id >= 10000000 && id < 30000000) {
      window.location="admin.html";
    } else {
      window.location="userInfo.html";
    }
  })};

function createButton(cell, quantity, type){
  var button = document.createElement("button");
  if (type == 1) {
    if (quantity > 0){
      button.innerHTML = "Reserve";
      button.setAttribute("onclick", "");
      // set a class for a button --> will add css
      // set an id for the button so that it can be ascessed in other parts of the function
    }
    else{
      button.innerHTML = "Hold";
    }
  } else if (type == 2) {
    if (quantity > 0) {
      button.innerHTML = "Approve";
      button.setAttribute("onclick", "approveUsers()")
    }
  } else if (type == 3) {
    button.innerHTML = "Remove";
    button.setAttribute("onclick", "removeUser()")
  }

  cell.appendChild(button);
}

function reserveBook(){
  // console.log("test1");
  // remember to change the code later so that the button changes to unreserved after
  // checking if they reserved that book previously

}

function holdBook(){
  // s
}

function checkBookStatus(){

}
