const inputFile = document.getElementById("file");
const readFileButton = document.getElementById("readFileButton");
var xmlDoc;

document.getElementById("file").addEventListener("change", function (e) {
    let loaded = false;
    let file;
    const reader = new FileReader();
    alert("Se ejecutó con el evento: " + e.target.value);
    
    reader.onload = function (e) {
      file = inputFile.files[0];
      const fileContent = e.target.result;
      const parser = new DOMParser();
      xmlDoc = parser.parseFromString(fileContent, "text/xml");
      loaded = true;
    };
  
    const inputFile = document.getElementById("file");
    
    if (inputFile.files.length > 0) {
      reader.readAsBinaryString(inputFile.files[0]);
    }
  });
  

document.getElementById("readFileButton").addEventListener("click", function () {
    if (xmlDoc != null) {
        alert("Leyendo archivo");
    let elementoXml = xmlDoc.querySelector('cfdi\\:Comprobante');
    if(elementoXml){
        console.log('Contenido:\n'+elementoXml.textContent);
    }
    } else {
      alert("Por favor agregue un archivo: " + xmlDoc);
    }
  });
