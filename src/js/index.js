document.getElementById("file").addEventListener("change", function (e) {
    var xhr = new XMLHttpRequest();
    var urlForXML = URL.createObjectURL(e.target.files[0]);
    xhr.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            readXMLDataFromFile(this);
        }
      };
      xhr.open("GET", urlForXML, true);
      xhr.send();
});
  
function readXMLDataFromFile(xml){
    var xmlDoc = xml.responseXML;
    const comprobante = xmlDoc.querySelector("cfdi\\:Comprobante"); // El elemento Comprobante
    var Version = comprobante.getAttribute("Version");
    confirm("Versión de factura: " + Version);
    confirm("Lectura finalizada");
}