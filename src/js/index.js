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

    console.error("Elementos Generales");
    var comprobante = xmlDoc.querySelector("cfdi\\:Comprobante, Comprobante"); // Intenta buscar con o sin el prefijo
    var atributosComprobante = ["Version", "Fecha", "Sello", "FormaPago", "NoCertificado", "Certificado", "SubTotal", "Total", "TipoDeComprobante", "Exportacion", "MetodoPago", "LugarExpedicion"];
    if (comprobante) {
        for(let i = 0; i < atributosComprobante.length; i++){
            console.log(atributosComprobante[i] + ": " + comprobante.getAttribute(atributosComprobante[i]));
        }
    } else {
        alert("El elemento cfdi:Comprobante no se encontró en el documento XML.");
    }

    console.error("Información Global");
    var informacionGlobal = xmlDoc.querySelector("cfdi\\:InformacionGlobal, InformacionGlobal"); // Intenta buscar con o sin el prefijo
    var atributosInfGlob = ["Periodicidad", "Meses", "Año"];
    if (informacionGlobal) {
        for(let i = 0; i < atributosInfGlob.length; i++){
            console.log(atributosInfGlob[i] + ": " + informacionGlobal.getAttribute(atributosInfGlob[i]));
        }
    } else {
        alert("El elemento cfdi:Emisor no se encontró en el documento XML.");
    }

    console.error("Información del Emisor");
    var emisor = xmlDoc.querySelector("cfdi\\:Emisor, Emisor"); // Intenta buscar con o sin el prefijo
    var atributosEmisor = ["Rfc", "Nombre", "RegimenFiscal"];
    if (emisor) {
        for(let i = 0; i < atributosEmisor.length; i++){
            console.log(atributosEmisor[i] + ": " + emisor.getAttribute(atributosEmisor[i]));
        }
    } else {
        alert("El elemento cfdi:Emisor no se encontró en el documento XML.");
    }

    console.error("Información del Receptor");
    var receptor = xmlDoc.querySelector("cfdi\\:Receptor, Receptor"); // Intenta buscar con o sin el prefijo
    var atributosReceptor = ["Rfc", "Nombre", "DomicilioFiscalReceptor", "UsoCFDI"];
    if (receptor) {
        for(let i = 0; i < atributosReceptor.length; i++){
            console.log(atributosReceptor[i] + ": " + receptor.getAttribute(atributosReceptor[i]));
        }
    } else {
        alert("El elemento cfdi:Receptor no se encontró en el documento XML.");
    }

}