// Method: Initialise the variables for player 1 and player 2 with input
// Have an 'on click' / event listener function which changes the color of the clicked td tag, and
// check whether 4 buttons match (vertically, horizontally, diagnonally).


// Setting up initial variables for player and color (red / blue)
var player1 = prompt("Player One: Enter Your Name , you will be Blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter Your Name, you will be Red");
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
// ease of reference, selecting all table row <tr> tags with JQ.
var table = $('table tr');

// Testing that the JS file is connected by printing in log.
console.log("Testing");


// not necessary for the code to work, just for debugging purposes.
function reportWin(rowNum,colNum) {
  console.log("You won starting at this row : col");
  console.log(rowNum);
  console.log(colNum);
}

// changing the color of the table cell from to the specified color.
// finding the index of the passed in rowIndex within the <tr> tags, then finding the <td> tag.
// taking the index of the passed in colIndex, and then selecting the 'button', changing the BG color.
function changeColor(rowIndex,colIndex,color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

// Same as above, this time returning the color of the button for checks on wins and free space.
function returnColor(rowIndex,colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}


// Finding free space for counter.
// Start at last row (6), but recall 0 indexing. Then count up until the button is grey.
function checkBottom(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row,colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row
    }
  }
}

// checks whether someone has won. Making sure 4 buttons are the same
// also checking we don't have 4 grey buttons.
function colorMatchCheck(one,two,three,four){
  return (one == two && one == three && one == four && one != 'rgb(128, 128, 128)' && one != undefined)
}

// Check for Horizontal Wins.
// Using above function to check equality in colors, increment columns by 1 each time
// If true, then winner.
// loop through columns and rows in table
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        console.log('horizontal win');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins. Same as above, but increment rows.
// loop columns and rows
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical win');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
// We check across the diagnoals with a negative gradient, then those with a positive gradient.
// Loop through columns and rows in table
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diagonal win positive gradient');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diagonal win negative gradient')
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Setting up the game itself

var currentPlayer = 1;
// Player 1 starts (alternate between -1 and 1 for ease of switching  players)
// Assign the input name from prompt at start, and the color for player.
var currentName = player1
var currentColor = player1Color

// Select the h3 tags, and change to current player
$('h3').text(player1 + " it is your turn. Pick a column.")

// add event listener. On a click, goes to the closest <td> tag, and returns the index
// Next, pass this index into the checkBottom function to find the first free space. Returned as index
// Change the color of the first available free space to that players color.
$('.board button').on('click',function(){
  var col = $(this).closest('td').index()
  var bottomAvail = checkBottom(col)

  changeColor(bottomAvail,col, currentColor)


// Now check for a win and include fadeOut graphics.
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
    $('h1').text(currentName+" you have won. Click below to play again")
    $('h3').fadeOut('fast')
    $('h2').fadeOut('fast')
    $('table').fadeOut('fast')
  }

// No win: swap players and change the text and colors.
  currentPlayer = currentPlayer * -1;
  if (currentPlayer === 1){
    currentName = player1
    $('h3').text(currentName+" it is your turn")
    currentColor = player1Color
  }else{
    currentName = player2
    $('h3').text(currentName+" it is your turn")
    currentColor = player2Color
  }

})

// Function will execute every time an event (in this case 'click' occurs).
