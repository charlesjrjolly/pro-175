getModel: function modl(){
  return fetch("js/places.json")
  .then(res => res.json())
  .then(data => data);
}

createModle: function Model(model){

var elementName = model.barcode_value;
var barcodeValue = model.barcode_value;

//Get the color of the element

//Scene
var scene = document.querySelector("a-scene");

//Add marker entity for BARCODE marker
var marker = document.createElement("a-marker");

marker.setAttribute("id", `marker-${barcodeValue}`);
marker.setAttribute("type", "barcode");
marker.setAttribute("element_name", elementName);
marker.setAttribute("value", barcodeValue);

scene.appendChild(marker);

if(barcodeValue===0){
  var pri = document.createElement("a-entity");
  pri.setAttribute("id",`${modelName}`)
  pri.setAttribute("geometry", {
    primitive:"box",
    width:model.width,
    height:model.height
  });
  pri.setAttribute("material",{color:model.color});
  pri.setAttribute("position",model.position);
  pri.setAttribute("rotation",model.rotation);
  marker.appendChild(pri)
}

tick: function () {
    if (elementsArray.length > 1) {

      var messageText = document.querySelector("#message-text");

      var length = elementsArray.length;
      var distance = null;

      var compound = this.getCompound();

      if (length === 2) {
        var marker1 = document.querySelector(`#marker-${elementsArray[0].barcode_value}`);
        var marker2 = document.querySelector(`#marker-${elementsArray[1].barcode_value}`);

        distance = this.getDistance(marker1, marker2);

        if (distance < 1.25) {
          if (compound !== undefined) {
            this.showCompound(compound);
          } else {
            messageText.setAttribute("visible", true);
          }
        } else {
          messageText.setAttribute("visible", false);
        }
      }

      if (length === 3) {
        var marker1 = document.querySelector(`#marker-${elementsArray[0].barcode_value}`);

        var marker2 = document.querySelector(`#marker-${elementsArray[1].barcode_value}`);

        var marker3 = document.querySelector(`#marker-${elementsArray[2].barcode_value}`);

        var distance1 = this.getDistance(marker1, marker2);
        var distance2 = this.getDistance(marker1, marker3);

        if (distance1 < 1.25 && distance2 < 1.25) {

          if (compound !== undefined) {
            var barcodeValue = elementsArray[0].barcode_value;
            this.showCompound(compound, barcodeValue);
          } else {
            messageText.setAttribute("visible", true);
          }
        }
        else {
          messageText.setAttribute("visible", false);
        }
      }
    }
  }
  //Calculate distance between two position markers
  getDistance: function (elA, elB) {
    return elA.object3D.position.distanceTo(elB.object3D.position);
  }
  countOccurrences: function (arr, val) {
    return arr.reduce((a, v) => (v.element_name === val ? a + 1 : a), 0);
  }
  getCompound: function () {
    for (var el of elementsArray) {
      if (A.includes(el.element_name)) {
        var compound = el.element_name;
        for (var i of elementsArray) {
          if (B.includes(i.element_name)) {
            compound += i.element_name;
            return { name: compound, value: el.barcode_value };
          }
          if (C.includes(i.element_name)) {
            var count = this.countOccurrences(elementsArray, el.element_name);
            if (count > 1) {
              compound += count + i.element_name;
              return { name: compound, value: i.barcode_value };
            }
          }
        }
      }
    }
  }
  showCompound: function (compound) {
    //Hide elements
    elementsArray.map(item => {
      var el = document.querySelector(`#${item.element_name}-${item.barcode_value}`);
      el.setAttribute("visible", false);
    });
    //Show Compound
    var compound = document.querySelector(`#${compound.name}-${compound.value}`);
    compound.setAttribute("visible", true);
  }
  getCompounds: function () {
    // NOTE: Use ngrok server to get json values
    return fetch("js/compoundList.json")
      .then(res => res.json())
      .then(data => data);




  }

}


