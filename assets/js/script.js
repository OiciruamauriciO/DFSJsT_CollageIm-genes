const { LocalStorage } = require("node-localstorage");

async function loadCreateImgChildInstance() {
  try {
    const res = await axios.get("http://localhost:3000/fetchLocalStorage");
    temporalResponse = res.data;
    if (!(temporalResponse === "localStorage is empty")) {
      for (let i = 0; i < res.data.length; i++) {
        let temporalInt = parseInt(res.data[i].posicionImagen);
        let querySelectorForRelElement;
        if (temporalInt == 1) {
          querySelectorForRelElement = document.querySelector(".uno");
        } else if (temporalInt == 2) {
          querySelectorForRelElement = document.querySelector(".dos");
        } else if (temporalInt == 3) {
          querySelectorForRelElement = document.querySelector(".tres");
        } else if (temporalInt == 4) {
          querySelectorForRelElement = document.querySelector(".cuatro");
        } else if (temporalInt == 5) {
          querySelectorForRelElement = document.querySelector(".cinco");
        } else if (temporalInt == 6) {
          querySelectorForRelElement = document.querySelector(".seis");
        } else if (temporalInt == 7) {
          querySelectorForRelElement = document.querySelector(".siete");
        } else if (temporalInt == 8) {
          querySelectorForRelElement = document.querySelector(".ocho");
        } else {
          console.log("Not contemplated case over if-else");
        }
        let imgRelElement = document.createElement("img");
        imgRelElement.className = "imgElement";
        let imgRuteRefElement = "../../uploads/" + res.data[i].nombreImagen;
        imgRelElement.src = imgRuteRefElement;
        let tempString = res.data[i].posicionImagen.toString();
        imgRelElement.setAttribute("id", "id" + tempString);
        imgRelElement.setAttribute("object-fit", "cover");
        imgRelElement.setAttribute("width", "100%");
        imgRelElement.setAttribute("height", "100%");
        querySelectorForRelElement.appendChild(imgRelElement);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadRemoveImgChildInstance(e) {
  console.log("::: loadRemoveImgChildInstance :::");
  console.log(e);
  console.log(e.childNodes[0].id);
  let subtringValue = e.childNodes[0].id.substring(2);
  console.log(subtringValue);
  let querySelectorForRelElement;
  let auxNombreImagen;

  if (subtringValue == "1") {
    querySelectorForRelElement = document.querySelector(".uno");
    querySelectorForRelElement.removeChild(
      document.getElementById(e.childNodes[0].id)
    );
    auxNombreImagen = "00" + subtringValue + ".png";
  } else if (subtringValue == "2") {
    querySelectorForRelElement = document.querySelector(".dos");
    querySelectorForRelElement.removeChild(
      document.getElementById(e.childNodes[0].id)
    );
    auxNombreImagen = "00" + subtringValue + ".png";
  } else if (subtringValue == "3") {
    querySelectorForRelElement = document.querySelector(".tres");
    querySelectorForRelElement.removeChild(
      document.getElementById(e.childNodes[0].id)
    );
    auxNombreImagen = "00" + subtringValue + ".png";
  } else if (subtringValue == "4") {
    querySelectorForRelElement = document.querySelector(".cuatro");
    querySelectorForRelElement.removeChild(
      document.getElementById(e.childNodes[0].id)
    );
    auxNombreImagen = "00" + subtringValue + ".png";
  } else if (subtringValue == "5") {
    querySelectorForRelElement = document.querySelector(".cinco");
    querySelectorForRelElement.removeChild(
      document.getElementById(e.childNodes[0].id)
    );
    auxNombreImagen = "00" + subtringValue + ".png";
  } else if (subtringValue == "6") {
    querySelectorForRelElement = document.querySelector(".seis");
    querySelectorForRelElement.removeChild(
      document.getElementById(e.childNodes[0].id)
    );
    auxNombreImagen = "00" + subtringValue + ".png";
  } else if (subtringValue == "7") {
    querySelectorForRelElement = document.querySelector(".siete");
    querySelectorForRelElement.removeChild(
      document.getElementById(e.childNodes[0].id)
    );
    auxNombreImagen = "00" + subtringValue + ".png";
  } else if (subtringValue == "8") {
    querySelectorForRelElement = document.querySelector(".ocho");
    querySelectorForRelElement.removeChild(
      document.getElementById(e.childNodes[0].id)
    );
    auxNombreImagen = "00" + subtringValue + ".png";
  } else {
    console.log("Not contemplated case over if-else");
  }

  const responseDataUpload = await axios.get("/getDataUpLoadArray");
  console.log("responseDataUpload");
  console.log(responseDataUpload.data);

  const responseClearLocalStorage = await axios.get("/clearStorage");

  for (let i = 0; i < responseDataUpload.data.length; i++) {
    if (auxNombreImagen == responseDataUpload.data[i].nombreImagen) {
      responseDataUpload.data.splice(i, 1);
    }
  }
  console.log(JSON.parse(JSON.stringify(responseDataUpload.data)));

  const configuracion = {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json' ,
      'DataUpLoadHeader': JSON.stringify(responseDataUpload.data),
      'AuxNombreImagen': auxNombreImagen
    },
    url: "/updateDataUpload"    
  };

  const responseConfiguracionPost = await axios(configuracion);
  console.log(responseConfiguracionPost);
  
  /*
  const responseUpdateDataUpLoad = await axios.post('/updateDataUpload', element);
  console.log(responseUpdateDataUpLoad.data);
  */
}

async function deleteThisImage(divElementWithImageInside) {
  try {
    if (divElementWithImageInside.childNodes[0] == undefined) {
      console.log("Este div no tiene un child img asociado");
    } else {
      let nombreImagen = divElementWithImageInside.childNodes[0].src.substring(
        30,
        33
      );
      await axios.delete("/imagen/" + nombreImagen);
      loadRemoveImgChildInstance(divElementWithImageInside);
    }
  } catch (error) {
    console.error(error);
  }
}
