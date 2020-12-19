var dict = {};
var unmatched = {};
var requisitionLength = 10;
var aliquotLength = 12;

function ScannerDelete(){
  var deletecode = document.getElementById("deletecode").value;
  deletecode = cleanString(deletecode);
  if (deletecode.length == requisitionLength) {
    if (deletecode in dict) {
      if (dict[deletecode] == "") {
        alert ('Deleting UNMATCHED requisition');
      } else {
        alert ('Deleting requisition AND matched aliquot');
      }
      delete dict[deletecode];
    } else if (deletecode in unmatched) {
      alert ("that requisition was not scanned so it cant be deleted. BUT it has a matching 'unmatched' aliquot!")
    } else {
      alert ("That requisition was not part of the manifest so it can't be deleted.")
    }
  } else if (deletecode.length == aliquotLength) {
    var tempReq = deletecode.slice(0, -2);
    if (tempReq in unmatched) {
      alert ('Deleting UNMATCHED aliquot');
      delete unmatched[tempReq];
    } else if (tempReq in dict) {
      if (dict[tempReq] == '') {
        alert ("That aliquot was not scanned in so it can't be deleted. BUT it has a matching requisition!");
      } else if (dict[tempReq] == deletecode) {
        alert ("Deleting aliquot. You will also need to delete the requisition");
        dict[tempReq] = '';
      } else {
        alert ('exception');
      }
    }
  }
  updateScreen()
}

function ScannerInput() {
  var barcode = document.getElementById("barcode").value;
  barcode = cleanString(barcode);
  if (barcode.length == requisitionLength) {
    if (!(barcode in dict)) {
      dict[barcode] = checkunmatched(barcode);
    } else {

      alert('That requistition has already been scanned!');
    }
  } else if (barcode.length == aliquotLength) {
    var tempReq = barcode.slice(0, -2);
    if (dict[tempReq] == ""){
      dict[tempReq] = barcode;
    } else if (dict[tempReq] == barcode){
      alert ("Already scanned for this requisition");
    } else if (!(tempReq in dict)) {
      unmatched[barcode.slice(0, -2)]= barcode;
    }
  } else {
    var alertstring = "Scanned code outside the expected range of ";
    alertstring += requisitionLength + " characters for a requisition ";
    alertstring += "and " + aliquotLength + " characters for an aliquot.";
    alert (alertstring);
  }
  updateScreen()
}

function updateScreen() {
  document.getElementById("barcode").value = ""
  document.getElementById("deletecode").value = ""
  document.getElementById('UnmatchedOutput').innerHTML = '';
  document.getElementById('ScannedOutput').innerHTML = '';
  printunmatched(unmatched, 'UnmatchedOutput');
  printmatched(dict, 'ScannedOutput');
}
function checkunmatched(barcode) {
  if (barcode in unmatched) {
    var returnval = unmatched[barcode];
    delete unmatched[barcode];
    document.getElementById('UnmatchedOutput').innerHTML = '';
    printunmatched(unmatched, 'UnmatchedOutput');
    return returnval;
  } else {
    return '';
  }
}

function printmatched(dictionary, htmlelement) {
  var dictLength = Object.keys(dictionary).length;
  var i;
  var stringblock;
  for (i = 0; i < dictLength; i++) {
    var thiskey; 
    var thisvalue;
    var thisString;
    thiskey = Object.keys(dictionary)[i];
    thisvalue = dictionary[thiskey];
    thisString = thiskey + ' ---- ' + thisvalue;
    stringblock = [stringblock
      , thisString
    ].join("\n");
    document.getElementById(htmlelement).innerHTML = stringblock;
  }
}

function printunmatched(dictionary, htmlelement) {
  var dictLength = Object.keys(dictionary).length;
  var i;
  var stringblock;
  for (i = 0; i < dictLength; i++) {
    var thiskey; 
    var thisvalue;
    var thisString;
    thiskey = Object.keys(dictionary)[i];
    thisvalue = dictionary[thiskey];
    thisString = thisvalue;
    stringblock = [stringblock
      , thisString
    ].join("\n");
    document.getElementById(htmlelement).innerHTML = stringblock;
  }
}

function cleanString(string) {
  string = string.replace(/\D+/g, '');
  return string
}

fetch('https://i0q7g7j06l.execute-api.us-east-1.amazonaws.com/Prod/Prod');