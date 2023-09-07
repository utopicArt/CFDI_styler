const xmlString = `<?xml version="1.0" encoding="utf-8"?>
<cfdi:Comprobante xsi:schemaLocation="http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd" Version="4.0" Fecha="2022-12-28T19:54:42" Sello="G+jXk9ugh8X4D2IsR54etYauw==" FormaPago="99" NoCertificado="01960418" Certificado="MIIGQjCVSVklDSU8U8NKT/UaNxKQuD6AsMU52YLrz4uMCeTUxtX2YEfyl2qkVmdiXi+szky6ScQfxEghcOgdKRfd/VP5HxJ7zAlS8Q3+WI4WAF/CyyR7ZwarnTQNhg+iXJIeQ==" SubTotal="52595.00" Moneda="MXN" Total="52595.00" TipoDeComprobante="I" Exportacion="01" MetodoPago="PPD" LugarExpedicion="44210" xmlns:cfdi="http://www.sat.gob.mx/cfd/4" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <cfdi:InformacionGlobal Periodicidad="04" Meses="08" Año="2022" />
  <cfdi:Emisor Rfc="XXYZ1234" Nombre="NOMBRE DEL NEGOCIO" RegimenFiscal="603" />
  <cfdi:Receptor Rfc="XAXX010101000" Nombre="PUBLICO EN GENERAL" DomicilioFiscalReceptor="12345" RegimenFiscalReceptor="616" UsoCFDI="S01" />
  <cfdi:Conceptos>
    <cfdi:Concepto ClaveProdServ="94111702" Cantidad="1.00" ClaveUnidad="C62" Unidad="Uno" Descripcion="Esta es una descripcion de ejemplo" ValorUnitario="12345" Importe="12345.00" ObjetoImp="01" />
  </cfdi:Conceptos>
  <cfdi:Complemento>
    <tfd:TimbreFiscalDigital xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd" Version="1.1" UUID="JRF3F-ABC5-48G4-F5EV-23H005ECOD" FechaTimbrado="2022-12-28T19:54:59" RfcProvCertif="SAT970701NN3" SelloCFD="G+jXk9ugh8X4eodIunsR54etYauw==" NoCertificadoSAT="00005000000266465020" SelloSAT="mZ+2zmq1vwTTOR/nQ/+clw2/0Cwlz/Nr1+ZSrQ==" />
  </cfdi:Complemento>
</cfdi:Comprobante>`;

// Crear un nuevo objeto DOMParser
const parser = new DOMParser();

// Parsear el XML
const xmlDoc = parser.parseFromString(xmlString, "text/xml");

// Extraer datos del CFDI
const comprobante = xmlDoc.querySelector("cfdi\\:Comprobante"); // El elemento Comprobante
const version = comprobante.getAttribute("Version");
const fecha = comprobante.getAttribute("Fecha");
const sello = comprobante.getAttribute("Sello");
const formaPago = comprobante.getAttribute("FormaPago");
const noCertificado = comprobante.getAttribute("NoCertificado");
const certificado = comprobante.getAttribute("Certificado");
const subTotal = comprobante.getAttribute("SubTotal");
const moneda = comprobante.getAttribute("Moneda");
const total = comprobante.getAttribute("Total");
const tipoDeComprobante = comprobante.getAttribute("TipoDeComprobante");
const exportacion = comprobante.getAttribute("Exportacion");
const metodoPago = comprobante.getAttribute("MetodoPago");
const lugarExpedicion = comprobante.getAttribute("LugarExpedicion");

// Información del Emisor
const emisor = xmlDoc.querySelector("cfdi\\:Emisor");
const rfcEmisor = emisor.getAttribute("Rfc");
const nombreEmisor = emisor.getAttribute("Nombre");
const regimenFiscalEmisor = emisor.getAttribute("RegimenFiscal");

// Información del Receptor
const receptor = xmlDoc.querySelector("cfdi\\:Receptor");
const rfcReceptor = receptor.getAttribute("Rfc");
const nombreReceptor = receptor.getAttribute("Nombre");
const domicilioFiscalReceptor = receptor.getAttribute("DomicilioFiscalReceptor");
const regimenFiscalReceptor = receptor.getAttribute("RegimenFiscal");
const usoCFDI = receptor.getAttribute("UsoCFDI");

// Conceptos
const conceptos = xmlDoc.querySelectorAll("cfdi\\:Concepto");
const concepto = conceptos[0]; // Supongamos que solo hay un concepto en este ejemplo
const claveProdServ = concepto.getAttribute("ClaveProdServ");
const cantidad = concepto.getAttribute("Cantidad");
const claveUnidad = concepto.getAttribute("ClaveUnidad");
const unidad = concepto.getAttribute("Unidad");
const descripcion = concepto.getAttribute("Descripcion");
const valorUnitario = concepto.getAttribute("ValorUnitario");
const importe = concepto.getAttribute("Importe");
const objetoImp = concepto.getAttribute("ObjetoImp");

// Timbre Fiscal Digital
const timbreFiscalDigital = xmlDoc.querySelector("tfd\\:TimbreFiscalDigital");
const uuid = timbreFiscalDigital.getAttribute("UUID");
const fechaTimbrado = timbreFiscalDigital.getAttribute("FechaTimbrado");
const rfcProvCertif = timbreFiscalDigital.getAttribute("RfcProvCertif");
const selloCFD = timbreFiscalDigital.getAttribute("SelloCFD");
const noCertificadoSAT = timbreFiscalDigital.getAttribute("NoCertificadoSAT");
const selloSAT = timbreFiscalDigital.getAttribute("SelloSAT");

// Ahora puedes utilizar todas las variables que hemos extraído
console.log("Version:", version);
console.log("Fecha:", fecha);
console.log("Sello:", sello);
console.log("Forma de Pago:", formaPago);
// ... y así sucesivamente para el resto de los datos que necesitas.