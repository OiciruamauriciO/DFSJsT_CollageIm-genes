const express = require("express");
const app = express();
const port = 3000;
var dataUpload = [];
const fs = require("fs").promises;
const expressFileUpload = require("express-fileupload");
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/assets", express.static(__dirname + "/assets"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
  expressFileUpload({
    limits: { fileSize: 5242880 },
    abortOnLimit: true,
    responseOnLimit:
      "El peso del archivo que intentas subir supera el limite permitido",
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/assets/views/collage.html");
});

app.get("/upload", (req, res) => {
  res.sendFile(__dirname + "/assets/views/formulario.html");
});

app.get("/fetchLocalStorage", (req, res) => {

  if(localStorage!=undefined){

    let temporalLocalStorageItemValue = localStorage.getItem("upLoadDataStorage");

    if(!temporalLocalStorageItemValue==''){
      return res.send(JSON.parse(temporalLocalStorageItemValue));
    }else{
      return res.send('localStorage is empty');
    }
    
  }else{
    return res.send('localStorage is undefined');
  }
});

app.get("/getDataUpLoadArray", (req, res)=>{
  res.send(dataUpload);
});

app.get("/clearStorage", (req, res)=>{
  localStorage.clear();
  res.send('LocalStorage vaciado');
});

app.post("/updateDataUpload", (req, res)=>{
  console.log("::: updateDataUpload post :::");
  let data = req.headers;
  console.log(JSON.parse(data.datauploadheader));
  console.log(' ');
  console.log('Validación del nombre de la imagen que se eliminó');
  console.log(data.auxnombreimagen);
  console.log(' ');
  console.log("Inicia vaciado arreglo");
  console.log('Largo del arreglo en index.js: ' + dataUpload.length);
  if(dataUpload.length>0){
    dataUpload=[];
    console.log("Arreglo vaciado");
  }
  console.log(' ');
  console.log('Validación de contenido actual después del vaciado del arreglo en index.js');
  console.log("Largo actual del citado arreglo: " + dataUpload.length);
  for(let j=0; j<dataUpload.length; j++){
    console.log(dataUpload[j]);
  }
  console.log(' ');
  console.log('Validación del contenido del arreglo transferido');
  JSON.parse(data.datauploadheader).forEach(element => console.log(element));
  console.log('LLenado de arreglo existente dataUpLoad con los elementos transferidos en el header');
  JSON.parse(data.datauploadheader).forEach(element => {
    let temporalObject = new Object();
    temporalObject=element;
    dataUpload.push(temporalObject);
  });
  console.log(' ');
  console.log('Validación de los datos contenidos y transferidos al arreglo');
  for(let l=0; l<dataUpload.length; l++){
    console.log(dataUpload[l]);
  }
  insertarImagenEnCollage(dataUpload);
  res.send('Ok');
});

app.post("/imagen", (req, res) => {
  const { foto } = req.files;
  const { name } = foto;
  foto.mv(`${__dirname}/public/uploads/${name}`, (err) => {
    dataUpload.push({
      nombreImagen: foto.name,
      posicionImagen: req.body.posicion,
    });
    insertarImagenEnCollage(dataUpload);
    res.redirect("/");
  });
});

app.delete("/imagen/:nombre", async (req, res) => {
  const { nombre } = req.params;
  try{
    await fs.unlink(`${__dirname}/public/uploads/${nombre}.png`);
    res.send(`Imagen ${nombre} fue eliminada con éxito`);
  }catch(error){
    console.log(error);
    res.redirect('/');
  }

});

app.listen(port, () =>{
  console.log(`App corriendo en el puerto escucha ${port}!`);
});

function insertarImagenEnCollage(e) {
  localStorage.setItem("upLoadDataStorage", JSON.stringify(e));
}
