//
var formData = document.querySelector("form");
var checkBox = document.querySelector('#sameAsBilling');

console.log(checkBox.checked);
//
  var inputs = document.getElementsByTagName("input");
  var billingCompany = inputs[2];
  var billingAddress = inputs[3];
  var billingCity = inputs[4];
  var billingState = inputs[5];
  var billingZip = inputs[6];
  var billingContactName = inputs[7];
  var billingPhone = inputs[8];

  var genCompany = inputs[12];
  var genAddress = inputs[13];
  var genCity = inputs[14];
  var genState = inputs[15];
  var genZip = inputs[16];
  var genContactName = inputs[17];
  var genPhone = inputs[18];

checkBox.onclick = function () {
  if (checkBox.checked == true){
  console.log("it's checked");
  genCompany.value = billingCompany.value;
  genAddress.value = billingAddress.value;
  genCity.value = billingCity.value;
  genState.value = billingState.value;
  genZip.value = billingZip.value;
  genContactName.value = billingContactName.value;
  genPhone.value = billingPhone.value;

} else {
  if (checkBox.checked == false){
    genCompany.value = "";
    genAddress.value = "";
    genCity.value = "";
    genState.value = "";
    genZip.value = "";
    genContactName.value = "";
    genPhone.value = "";
      }
}
}

//
