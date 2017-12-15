//Constants
const BOARD_EMPTY = 'Empty';
const BOARD_IN_USE = 'In Use';
const BOARD_COMPLETED = 'Completed';
const VALUE_X = 'X';
const VALUE_0 = '0';
const VALUE_EMPTY = ' ';
const PLAYER_1 = 'Player 1';
const PLAYER_2 = 'Player 2';

//variables
var player2;
var player1;
var currentSelectedValue;

function User(userFirstName, userLastName, userPiece, userId){
  this.userFirstName = userFirstName;
  this.userLastName = userLastName;
  this.userActiveTurn = false;
  this.userPiece = userPiece;
  this.userId = userId;
}

function Board(){
  this.boardSpaces = [[],[],[]];
  this.boardStatus = BOARD_EMPTY;
}
Board.prototype.boardInitialize = function() {
  for(i = 0; i<3; i++){
    for(j= 0; j<3; j++){
      this.boardSpaces[i][j]= VALUE_EMPTY;
    }
  }
}
function playerActive(user1, user2){
  if(user1.userActiveTurn){
    return user1;
  }
  else if(user2.userActiveTurn){
    return user2;
  }
  else {
    return -1;
  }
}
function switchPlayer(user1, user2){
  if(user1.userActiveTurn){
    user1.userActiveTurn = false;
    user2.userActiveTurn = true;
  }
  else{
    user1.userActiveTurn = true;
    user2.userActiveTurn = false;
  }
}

function index(string){
  arrayIndex = [];
  arrayIndex.push(parseInt(string[0]));
  arrayIndex.push(parseInt(string[1]));
  return arrayIndex;
}

function winCases(board){
  if(board.boardStatus !== BOARD_EMPTY){
    var boardLength = board.boardSpaces.length;
    var referenceValue;//will be all pairs (i,j) where i is equals j
    var flat = false;
    var row = true;
    //var column = true;
    var diagonal1 = true;
    var diagonal2 = true;
    var count =0;
    for(i = 0; i<boardLength; i++){
      for(j= 0; j<boardLength-1; j++){
        if(board.boardSpaces[i][j] !== board.boardSpaces[i][j+1] || board.boardSpaces[i][j-i]===VALUE_EMPTY){ //branch rows
          row = false;
        }
        // if(board.boardSpaces[j][i] !== board.boardSpaces[j-i][i] || board.boardSpaces[j-i][i]===VALUE_EMPTY){//branch columns
        //   column = false;
        // }
      }
      if(row || column){
        count++;
      }
    }
    for(i = 0; i<=boardLength-2; i++){
      if(board.boardSpaces[i][i] !== board.boardSpaces[i+1][i+1] || board.boardSpaces[i+1][i+1] ===VALUE_EMPTY){//diagonal1
        diagonal1 = false;
        //alert("diag 1");
      }
      if(board.boardSpaces[i][(boardLength-1)-i] !== board.boardSpaces[i+1][(boardLength-2)-i] || board.boardSpaces[i+1][(boardLength-2)-i]===VALUE_EMPTY){//diagonal2
        diagonal2 = false;
        //alert("diag 2");
      }
    }
    if(diagonal1 || diagonal2){
      count++;
    }
    return count>0;
    }
  else {
    return false;
  }
}


//-----------------------frontend-----------------------//
$(function(){
  // var board = new Board();
  // board.boardSpaces = [['x','x','x'],['x','0','0'],['0','x','x']];
  // board.boardStatus = BOARD_IN_USE;
  // alert(winCases(board));
  $("#registerPlayersForm").submit(function(event) {
    event.preventDefault();
    var firstNamePlayer1 = $("#firstNamePlayer1").val();
    var lastNamePlayer1 = $("#lastNamePlayer1").val();
    var firstNamePlayer2 = $("#firstNamePlayer2").val();
    var lastNamePlayer2 = $("#lastNamePlayer2").val();
    var player1 = new User(firstNamePlayer1, lastNamePlayer1, VALUE_0, 1);
    var player2 = new User(firstNamePlayer1, lastNamePlayer1, VALUE_X, 2);
    player1.userActiveTurn = true;
    var board = new Board();
    board.boardInitialize();
    board.boardStatus = BOARD_IN_USE;
    $('.space').click(function(){
      var piece = playerActive(player1, player2).userPiece;
      //alert($(this).attr("id"));
      var varCellIndex = index($(this).attr("id"));
      $(this).text(piece);
      board.boardSpaces[varCellIndex[0]][varCellIndex[1]] = piece;
      if(!winCases(board)){
        switchPlayer(player1, player2);
      }
      else{
        alert(playerActive(player1, player2).userFirstName+", you are winner!!!!");
      }
    })
  });
});
