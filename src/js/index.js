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

    // 1. Datos Globales del CFDI
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

    // 2. Datos Globales del CFDI
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

    // 3. Información del Emisor
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

    // 4. Información del Receptor
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

    // 5. Conceptos
    console.error("Información de los Conceptos");
    var conceptos = xmlDoc.getElementsByTagName('cfdi:Conceptos')[0];
    var atributosConcepto = ["ClaveProdServ", "Cantidad", "ClaveUnidad", "Unidad", "Descripcion", "ValorUnitario", "Importe", "ObjetoImp"];
    if (conceptos) {
        var conceptoElements = conceptos.getElementsByTagName('cfdi:Concepto');
        if(conceptoElements){
            for (var i = 0; i < conceptoElements.length; i++) {
                console.warn("Concepto " + (i+1) + ":");
                var concepto = conceptoElements[i];
                for(let i = 0; i < atributosConcepto.length; i++){
                    console.log(atributosConcepto[i] + ": " + concepto.getAttribute(atributosConcepto[i]));
                }
            }
        }
    } else {
        alert("No se encontraron Conceptos en la factura.");
    }

    // Timbre Fiscal Digital
    console.error("Timbre Fiscal Digital");
    var receptor = xmlDoc.querySelector("tfd\\:TimbreFiscalDigital, TimbreFiscalDigital"); // Intenta buscar con o sin el prefijo
    var atributosReceptor = ["UUID", "FechaTimbrado", "RfcProvCertif", "SelloCFD", "NoCertificadoSAT", "SelloSAT"];
    if (receptor) {
        for(let i = 0; i < atributosReceptor.length; i++){
            console.log(atributosReceptor[i] + ": " + receptor.getAttribute(atributosReceptor[i]));
        }
    } else {
        alert("El elemento cfdi:Receptor no se encontró en el documento XML.");
    }
}
