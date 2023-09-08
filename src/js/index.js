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
    var cntr = 0;

    const billReceipt = [
        {
            container: "cfdi\\:Comprobante, Comprobante", // 1. Datos Globales del CFDI
            attrs: ["Version", "Fecha", "Sello", "FormaPago", "NoCertificado", "Certificado", "SubTotal", "Total", "TipoDeComprobante", "Exportacion", "MetodoPago", "LugarExpedicion"]
        },
        {
            container: "cfdi\\:InformacionGlobal, InformacionGlobal", // 2. Datos Globales del CFDI
            attrs: ["Periodicidad", "Meses", "Año"]
        },
        {
            container: "cfdi\\:Emisor, Emisor", // 3. Información del Emisor
            attrs: ["Rfc", "Nombre", "RegimenFiscal"]
        },
        {
            container: "cfdi\\:Receptor, Receptor", // 4. Información del Receptor
            attrs: ["Rfc", "Nombre", "DomicilioFiscalReceptor", "UsoCFDI"]
        },
        {
            container: "tfd\\:TimbreFiscalDigital, TimbreFiscalDigital", // 6. Timbre Fiscal Digital
            attrs: ["UUID", "FechaTimbrado", "RfcProvCertif", "SelloCFD", "NoCertificadoSAT", "SelloSAT"]
        }
    ];

    console.error("Todos los elementos");
    for(let i = 0; i < billReceipt.length; i++){
        var dataContainer = xmlDoc.querySelector(billReceipt[i].container); // Intenta buscar con o sin el prefijo
        if(dataContainer){
            for(let j = 0; j < billReceipt[i].attrs.length; j++){
                console.log(billReceipt[i].attrs[j] + ": " + dataContainer.getAttribute(billReceipt[i].attrs[j]));
                console.log(billReceipt[i].attrs[j]);
            }
        }else{
            alert("El elemento " + billReceipt[i].container + " no se encontró en el documento XML.");
        }
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
                    cntr++;
                }
            }
        }
    } else {
        alert("No se encontraron Conceptos en la factura.");
    }
}