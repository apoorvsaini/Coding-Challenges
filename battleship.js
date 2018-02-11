var alphabetArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var width = 0, height = 0;
var totalMoves = 0;
var aMoves = 0;
var bMoves = 0;
var currentPlayer = 1;
var gameEnd = false;
var pHeight = 0;
var qHeight = 0;
var pWidth = 0;
var qWidth = 0;
var aShipsRemaining = 0;
var bShipsRemaining = 0;
var aCellsRemaining = 0;
var bCellsRemaining = 0;
var battleMap = {}; //will store combined locations of battleShips

//types: string, object, object, object, array, array
function initBattle(boudaries, battleshipTypes, pAPositions, pBPositions,pATargets, pBTargets) {
  var dimensionArr = boudaries.split(" ");
  width = dimensionArr[0];
  height = alphabetArray.indexOf(dimensionArr[1]);

  //determine ship's dimensions
  var pDim = battleshipTypes['P'];
  var qDim = battleshipTypes['Q'];
  pWidth = pDim.split(" ")[0];
  pHeight = pDim.split(" ")[1];
  qWidth = qDim.split(" ")[0];
  qHeight = qDim.split(" ")[1];

  //count number of ships for each player
  aShipsRemaining = pAPositions['P'].split(" ").length + pAPositions['Q'].split(" ").length;
  bShipsRemaining = pBPositions['P'].split(" ").length + pBPositions['Q'].split(" ").length;

  //check dimensions constraints
  if(height == -1 || width > 9 || width < 1 || pWidth > width || qWidth > width || pHeight > height || qHeight > height) {
    gameEnd = true;
    console.log("Incorrect Dimensions!");
    return -1
  }
  else {
    //create battle field
    makeBattleField(boudaries, battleshipTypes, pAPositions, pBPositions,pATargets, pBTargets, 'A');
    makeBattleField(boudaries, battleshipTypes, pAPositions, pBPositions,pATargets, pBTargets, 'B');
    //move ahead
    makeHits(pAPositions, pBPositions,pATargets, pBTargets,'A');
  }
}

function makeBattleField(boudaries, battleshipTypes, pAPositions, pBPositions,pATargets, pBTargets, player) {
  //create a battlemap to store combined positions of both the players's ships and their types
  var positions = pAPositions;
  if (player == 'B') {positions = pBPositions;}
  var pArea = [];
  var qArea = [];
  //get locations of P ships
  var pPos = (positions['P']).split(" ");
  for (var k in pPos) {
    var surrouding = [];
    var currH = parseInt(alphabetArray.indexOf(pPos[k].split("")[0]));
    var currW = parseInt(pPos[k].split("")[1]);
    for (var h = 0; h < pHeight; h++) {
      for (var w = 0; w < pWidth; w++) {
        var address = alphabetArray[parseInt(currH + h)]+parseInt(currW+w);
        if (pArea.indexOf(address) == -1) {
          pArea.push(address);
        }
      }
    }
  }

  //get locations of Q ships
  var qPos = (positions['Q']).split(" ");
  for (var k in qPos) {
    var surrouding = [];
    var currH = parseInt(alphabetArray.indexOf(qPos[k].split("")[0]));
    var currW = parseInt(qPos[k].split("")[1]);
    for (var h = 0; h < qHeight; h++) {
      for (var w = 0; w < qWidth; w++) {
        var address = alphabetArray[parseInt(currH + h)]+parseInt(currW+w);
        if (qArea.indexOf(address) == -1) {
          qArea.push(address);
        }
      }
    }
  }

  var pObj = {};
  for (var key in pArea) {
    var loc = pArea[key];
    if(player == 'A') {aCellsRemaining += 1;}
    else{ bCellsRemaining += 1; }
    pObj[loc] = 1; //number of hits this cell can take
  }

  var qObj = {};
  for (var key in qArea) {
    var loc = qArea[key];
    if(player == 'A') {aCellsRemaining += 1;}
    else{ bCellsRemaining += 1; }
    qObj[loc] = 2; //number of hits this cell can take
  }

  //save the locations
  battleMap[player] = {};
  battleMap[player]['P'] = pObj;
  battleMap[player]['Q'] = qObj;

}

function makeHits(pAPositions, pBPositions,pATargets, pBTargets, player) {
  //----------initializing opponents and variables-----------
  var opponent = 'B';
  if (player == 'B') { opponent = 'A';}
  var playerText = 'Player 1';
  if (player == 'B') { playerText = 'Player 2';}
  var currentHit = pATargets[aMoves]; //get current hit index
  if (player == 'B') { currentHit = pBTargets[bMoves];}
  //---------------------------------------------------------

  if (aMoves + 1 > pATargets.length  && bMoves + 1 <= pBTargets.length && player == 'A') {
    console.log("Player 1 no more missiles left");
    makeHits(pAPositions, pBPositions,pATargets, pBTargets,'B');
  }
  else if (aMoves + 1 <= pATargets.length && bMoves + 1 > pBTargets.length && player == 'B') {
    console.log("Player 2 no more missiles left");
    makeHits(pAPositions, pBPositions,pATargets, pBTargets,'A');
  }
  else if (aMoves + 1 > pATargets.length && bMoves + 1 > pBTargets.length) {
    console.log("Player 1 no more missiles left");
    console.log("Player 2 no more missiles left");
    return false;
  }
  else {
    if ((battleMap[opponent]['P']).hasOwnProperty(currentHit) || (battleMap[opponent]['Q']).hasOwnProperty(currentHit)) {
      if((battleMap[opponent]['P']).hasOwnProperty(currentHit)) {

        //Check for a hit on P-type Ship
        var hitValue = battleMap[opponent]['P'][currentHit];
        if (hitValue > 0) {
          hitValue = hitValue - 1;
          battleMap[opponent]['P'][currentHit] = hitValue;
          console.log(playerText+" fires a missile with target "+currentHit+" which hit");
          if (player == 'A') { aMoves += 1; }
          else { bMoves+=1; }
          if (hitValue == 0) {
            //destroy cell
            if (opponent == 'A') {
              aCellsRemaining -= 1;
              if (aCellsRemaining == 0) { console.log(playerText+" won the Battle"); return true;}
            }
            else {
              bCellsRemaining -= 1;
              if (bCellsRemaining == 0) { console.log(playerText+" won the Battle"); return true;}
            }
          }
          makeHits(pAPositions, pBPositions,pATargets, pBTargets,player);
        }
        else {
          console.log(playerText+" fires a missile with target "+currentHit+" which missed"); //already hit
          if (player == 'A') { aMoves += 1; }
          else { bMoves+=1; }
          makeHits(pAPositions, pBPositions,pATargets, pBTargets,opponent);
        }
      }
      else {

        //Check for a hit on Q-type Ship
        var hitValue = battleMap[opponent]['Q'][currentHit];
        if (hitValue > 0) {
          hitValue = hitValue - 1;
          battleMap[opponent]['Q'][currentHit] = hitValue;
          console.log(playerText+" fires a missile with target "+currentHit+" which hit");
          if (player == 'A') { aMoves += 1; }
          else { bMoves+=1; }
          if (hitValue == 0) {
            //destroy cell
            if (opponent == 'A') {
              aCellsRemaining -= 1;
              if (aCellsRemaining == 0) { console.log(playerText+" won the Battle"); return true;}
            }
            else {
              bCellsRemaining -= 1;
              if (bCellsRemaining == 0) { console.log(playerText+" won the Battle"); return true;}
            }
          }
          makeHits(pAPositions, pBPositions,pATargets, pBTargets,player);
        }
        else {
          console.log(playerText+" fires a missile with target "+currentHit+" which missed"); //already hit
          if (player == 'A') { aMoves += 1; }
          else { bMoves+=1; }
          makeHits(pAPositions, pBPositions,pATargets, pBTargets,opponent);
        }
      }
    }
    else {
      console.log(playerText+" fires a missile with target "+currentHit+" which missed");
      if (player == 'A') { aMoves += 1; }
      else { bMoves+=1; }
      makeHits(pAPositions, pBPositions,pATargets, pBTargets,opponent);
    }
  }
}

//-----------------------------start the battle-----------------------------------
initBattle('5 E',{'P': '1 1', 'Q': '1 1'},{'P':'A1 B4', 'Q': 'D4'},{'P':'B2', 'Q': 'C3 D5'},['B2','A1','A3'],['A1','B4','D4','A7','D4']);