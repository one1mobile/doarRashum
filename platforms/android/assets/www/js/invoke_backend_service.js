//var serverUrl="https://193.46.64.172:9464/WcfRashumDavarim";
var serverUrl="https://cg.israelpost.co.il:9464/WcfRashumDavarim";

//authenticate

   

function authenticate(username, password) {
    var soapMessage = createLoginSoapMessage(username, password);
    $
       .ajax(
                     {
                         url: serverUrl,
                         dataType: "xml",
                         //dataType: 'json',
                         type: "POST",
                         async: false,
                         contentType: "text/xml;charset=utf-8",
                         headers: {
                             "SOAPAction": "http://tempuri.org/IService1/authenticate"
                         },
                         crossDomain: true,
                         data: soapMessage,
                         timeout: 30000 //30 seconds timeout
                     }).done(function (data) {
                         console.log(data);
                         var returnObject = {};
                         var returndata = $(data).find("success").text();
                         if (returndata != "true") {
                             returnObject.errorCode = 1;
                             returnObject.errorLoginMessage = $(data).find("error").text();
                             localStorage.setItem("errorCode", returnObject.errorCode);
                             localStorage.setItem("errorLoginMessage", returnObject.errorLoginMessage);
                         } else { //login successful   

                             returnObject.errorCode = 0;
                             localStorage.setItem("errorCode", returnObject.errorCode);
                             /*
                                  returnObject.name=$(data).find("Name").text();
                                  returnObject.heker=$(data).find("heker").text();
                                  returnObject.notReported=$(data).find("NotReported").text();
                                  returnObject.percentDay=$(data).find("PercentDay").text();                               
                                  returnObject.city=$(data).find("city").text();                              
                                  returnObject.cityName=$(data).find("cityName").text();
                                  returnObject.phone=$(data).find("phone").text();                                   
                                  */
                             var authenticate = $(data).find("authenticate")[0].children;
                             var lenght = authenticate.length;
                             var jsonData = {};
                             for (var i = 0; i < lenght; i++) {
                                 var columnName = $(data).find("authenticate")[0].children[i].localName;
                                 jsonData[columnName] = $(data).find("authenticate")[0].children[i].innerHTML;
                                 var a = $(data).find("authenticate")[0].children[i].innerHTML;
                                 localStorage.setItem(columnName, a);
                             }
                             var i = 0;
                             returnObject.Regions = [];
                             $(data).find('string').each(function () {
                                 var Regions = $(data).find('string')[i].innerHTML;
                                 returnObject.Regions.push(Regions);
                                 i = i + 1;
                             });
                             localStorage.setItem("username", username);
                         }
                         localStorage.setItem("Regions", returnObject.Regions);
                         return 1;
                     }).fail(function (jqXHR, textStatus, thrownError) {
                         console.log('login failed: ' + thrownError);
                         var returnObject = {};
                         returnObject.errorCode = 2;
                         localStorage.setItem("errorCode", returnObject.errorCode);
                     });


}
function createLoginSoapMessage(username, password) {
       var xml='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"> \
                 <soapenv:Header/> \
                           <soapenv:Body> \
                            <tem:authenticate> \
                                  <!--Optional:--> \
                                  <tem:userName>'+username+'</tem:userName> \
                                  <!--Optional:--> \
                                  <tem:password>'+password+'</tem:password> \
                            </tem:authenticate> \
                           </soapenv:Body> \
                     </soapenv:Envelope>';                
       return xml;          
}
//

//getDataForMenu ????
function getDataForMenu(username, heker, region, subRegion) { 
       var soapMessage=createDataForMenuSoapMessage(username, heker, region, subRegion);
       $
       .ajax(
                     {
                           url : serverUrl,
                           dataType : "xml",
                           type : "POST",
                           contentType : "text/xml;charset=utf-8",
                           headers: {
                             "SOAPAction": "http://tempuri.org/IService1/getDataForMenu"
                         },
                           crossDomain: true,
                           data : soapMessage,
                           timeout: 30000 //30 seconds timeout
                     }).done(function(data) {                                                                              
                           var returnObject={};
                           var returndata=$(data).find("success").text();                                                                                     
                           if (returndata != "true") {                     
                                  returnObject.errorCode=1;                
                                  returnObject.errorLoginMessage=$(data).find("error").text();                                                                                                                
                           } else { //login successful                                                                            
                                  returnObject.errorCode=0;
                                  localStorage.setItem("PercentDay", $(data).find("PercentDay").text());
                                  //returnObject.name=$(data).find("Name").text();
                                  //returnObject.heker=$(data).find("heker").text();
                                  //returnObject.notReported=$(data).find("notReported").text();
                                  //returnObject.percentDay=$(data).find("PercentDay").text();
                                  //returnObject.city=$(data).find("city").text();                                                                                                                     
                           }
                           return returnObject;
                     }).fail(function(jqXHR, textStatus, thrownError) {                                                                                                    
                           console.log('login failed: '+thrownError);
                           var returnObject={};
                           returnObject.errorCode=2;                       
                     });

       
}

function createDataForMenuSoapMessage(username, heker, region, subRegion ) {
       var xml='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"> \
                 <soapenv:Header/> \
                           <soapenv:Body> \
                            <tem:createDataForMenuSoapMessage> \
                                  <!--Optional:--> \
                                  <tem:userName>'+username+'</tem:userName> \
                                  <!--Optional:--> \
                                  <tem:heker>'+heker+'</tem:heker> \
                                         <!--Optional:--> \
                                  <tem:region>'+region+'</tem:region> \
                                         <!--Optional:--> \
                                  <tem:subRegion>'+subRegion+'</tem:subRegion> \
                            </tem:createDataForMenuSoapMessage> \
                           </soapenv:Body> \
                     </soapenv:Envelope>';                
       return xml;          
}

//getDeliveryUnits
function getDeliveryUnits(username, heker, region) {   
       var soapMessage=createDeliveryUnitsSoapMessage(username, heker, region);
       $
       .ajax(
                     {
                           url : serverUrl,
                           dataType : "xml",
                           type: "POST",
                           async: false,
                           contentType : "text/xml;charset=utf-8",
                           headers: {
                             "SOAPAction": "http://tempuri.org/IService1/getDeliveryUnits"
                         },
                           crossDomain: true,
                           data : soapMessage,
                           timeout: 30000 //30 seconds timeout
                     }).done(function(data) {                                                                              
                           var returnObject={};
                           var returndata=$(data).find("success").text();                                                                                     
                           if (returndata != "true") {                     
                                  returnObject.errorCode=1;                
                                  returnObject.errorLoginMessage=$(data).find("error").text();                                                                                                                
                           } else { // successful                                                                                 
                                  returnObject.errorCode=0;                                                                
                                  returnObject.units = {};
                                  returnObject.units.code = [];
                                  returnObject.units.desc = [];
                                  $(data).find('DropDown').each(function(index){                                                                                                                
                                      returnObject.units.code[index] = $(this).find('Code').text();
                                      returnObject.units.desc[index] = $(this).find('Desc').text();
                                  });
                    //shai 21-09
                                  localStorage.setItem("delivery_units", JSON.stringify(returnObject.units));
                                  console.log("getDeliveryUnits populated");
                     }                                                                                                                                                                          
                           console.log(returnObject);
                           return returnObject;
                     }).fail(function(jqXHR, textStatus, thrownError) {                                                                                                    
                           console.log('login failed: '+thrownError);
                           var returnObject={};
                           returnObject.errorCode=2;                       
                     });

       
}

function createDeliveryUnitsSoapMessage(username, heker, region ) {
       var xml='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"> \
                 <soapenv:Header/> \
                           <soapenv:Body> \
                            <tem:getDeliveryUnits> \
                                  <!--Optional:--> \
                                  <tem:userName>'+username+'</tem:userName> \
                                  <!--Optional:--> \
                                  <tem:heker>'+heker+'</tem:heker> \
                                         <!--Optional:--> \
                                  <tem:region>'+region+'</tem:region> \
                            </tem:getDeliveryUnits> \
                           </soapenv:Body> \
                     </soapenv:Envelope>';                
       return xml;          
}

//getDetails
function getDetails(username, phone) {   
       var soapMessage=createDetailsSoapMessage(username, phone);
       $
       .ajax(
                     {
                           url : serverUrl,
                           dataType : "xml",
                           type : "POST",
                           contentType : "text/xml;charset=utf-8",
                           headers: {
                             "SOAPAction": "http://tempuri.org/IService1/getDetails"
                         },
                           crossDomain: true,
                           data : soapMessage,
                           timeout: 30000 //30 seconds timeout
                     }).done(function(data) {                                                                              
                           var returnObject={};
                           var returndata=$(data).find("success").text();                                                                                     
                           if (returndata != "true") {                     
                                  returnObject.errorCode=1;                
                                  returnObject.errorLoginMessage=$(data).find("error").text();                                                                                                                
                           } else { //login successful                                                                            
                                  returnObject.errorCode=0;
                                  returnObject.city=$(data).find("city").text();
                                  returnObject.firstName=$(data).find("firstName").text();
                                  returnObject.houseNo=$(data).find("houseNo").text();
                                  returnObject.lastName=$(data).find("lastName").text();
                                  returnObject.street=$(data).find("street").text();
                                  returnObject.streetText=$(data).find("streetText").text();                                                                               
                           }                          
                           console.log(returnObject);                      
                           return returnObject;
                     }).fail(function(jqXHR, textStatus, thrownError) {                                                                                                     
                           console.log('login failed: '+thrownError);
                           var returnObject={};
                           returnObject.errorCode=2;                       
                     });

       
}

function createDetailsSoapMessage(username, phone ) {
       var xml='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"> \
                 <soapenv:Header/> \
                           <soapenv:Body> \
                            <tem:getDetails> \
                                  <!--Optional:--> \
                                  <tem:userName>'+username+'</tem:userName> \
                                  <!--Optional:--> \
                                  <tem:phone>'+phone+'</tem:phone> \
                            </tem:getDetails> \
                           </soapenv:Body> \
                     </soapenv:Envelope>';                
       return xml;          
}


//getMaazan
function getMaazan(username, heker, region, subRegion ) {     
       var soapMessage=createMaazanSoapMessage(username, heker, region, subRegion );
       $
       .ajax(
                     {
                           url : serverUrl,
                           dataType : "xml",
                           type : "POST",
                           async: false,
                           contentType : "text/xml;charset=utf-8",
                           headers: {
                             "SOAPAction": "http://tempuri.org/IService1/getMaazan"
                         },
                           crossDomain: true,
                           data : soapMessage,
                           timeout: 30000 //30 seconds timeout
                     }).done(function(data) {                                                                              
                           var returnObject={};
                           var returndata=$(data).find("success").text();                                                                                     
                           if (returndata != "true") {                     
                                  returnObject.errorCode=1;                
                                  returnObject.errorLoginMessage=$(data).find("error").text();                                                                                                                
                           } else { //login successful                                                                            
                                  returnObject.errorCode=0;
                                  returnObject.NimseruLachaluka=$(data).find("NimseruLachaluka").text();
                                  returnObject.acher=$(data).find("acher").text();
                                  returnObject.avud=$(data).find("avud").text();
                                  returnObject.ddg=$(data).find("ddg").text();
                                  returnObject.hachzaraLasholeach=$(data).find("hachzaraLasholeach").text();
                                  returnObject.hodaa=$(data).find("hodaa").text();
                                  returnObject.huavarLashaliach=$(data).find("huavarLashaliach").text();
                                  returnObject.huchzeruLaMR=$(data).find("huchzeruLaMR").text();
                                  returnObject.hutzuLachaluka=$(data).find("hutzuLachaluka").text();
                                  returnObject.lehachzaraLasholeach=$(data).find("lehachzaraLasholeach").text();
                                  returnObject.leloDivuach=$(data).find("leloDivuach").text();
                                  returnObject.merchazChaluka=$(data).find("merchazChaluka").text();
                                  returnObject.nimseruLaniman=$(data).find("nimseruLaniman").text();                                                                           
                           }
                           
                           console.log(returnObject);
                           sessionStorage.setItem("Maazan", JSON.stringify(returnObject));                           
                           return JSON.stringify(returnObject);
                           
                           
                     }).fail(function(jqXHR, textStatus, thrownError) {                                                                                                    
                           console.log('login failed: '+thrownError);
                           var returnObject={};
                           returnObject.errorCode=2;   
						   sessionStorage.setItem("Maazan", JSON.stringify(returnObject)); 
						   return JSON.stringify(returnObject);						   
                     });

       
}

function createMaazanSoapMessage(username, heker, region, subRegion ) {
       var xml='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"> \
                 <soapenv:Header/> \
                           <soapenv:Body> \
                            <tem:getMaazan> \
                                  <!--Optional:--> \
                                  <tem:userName>'+username+'</tem:userName> \
                                  <!--Optional:--> \
                                  <tem:heker>'+heker+'</tem:heker> \
                                         <!--Optional:--> \
                                  <tem:region>'+region+'</tem:region> \
                                         <!--Optional:--> \
                                  <tem:subRegion>'+subRegion+'</tem:subRegion> \
                            </tem:getMaazan> \
                           </soapenv:Body> \
                     </soapenv:Envelope>';                
       return xml;          
}
//getStreets
function getStreets(username, city ) {   
       var soapMessage=createStreetsSoapMessage(username, city );
       $
       .ajax(
                     {
                           url : serverUrl,
                           dataType : "xml",
                           type : "POST",
                           async: false,
                           contentType : "text/xml;charset=utf-8",
                           headers: {
                             "SOAPAction": "http://tempuri.org/IService1/getStreets"
                         },
                           crossDomain: true,
                           data : soapMessage,
                           timeout: 30000 //30 seconds timeout
                     }).done(function(data) {                                                                              
                           var returnObject={};
                           var returndata=$(data).find("success").text();                                                                                     
                           if (returndata != "true") {                     
                                  returnObject.errorCode=1;                
                                  returnObject.errorstreetMessage=$(data).find("error").text(); 
                                  sessionStorage.setItem("errorstreetCode", returnObject.errorCode);
                                  sessionStorage.setItem("errorstreetMessage", returnObject.errorstreetMessage);                             
                           } else { //login successful                     
                                  returnObject.errorCode=0;                              
                                  var i=0;
                                  returnObject.streets=[];   
                                         
                                  $(data).find('string').each(function(){   
                                         var street = $(data).find('string')[i].innerHTML;                                                                           
                                         returnObject.streets.push(street); 
                                         i=i+1;
                                  });                                                                                                                  
                           }
                           sessionStorage.setItem("errorstreetCode", returnObject.errorCode);
                           sessionStorage.setItem("streets", returnObject.streets);
                           //console.log(returnObject); 
                           return returnObject.errorCode;
                     }).fail(function(jqXHR, textStatus, thrownError) {                                                                                                    
                           console.log('login failed: '+thrownError);
                           var returnObject={};
                           returnObject.errorCode=2;  
                           sessionStorage.setItem("errorstreetCode", returnObject.errorCode);                        
                     });

       
}

function createStreetsSoapMessage(username, city ) {
       var xml='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"> \
                 <soapenv:Header/> \
                           <soapenv:Body> \
                            <tem:getStreets> \
                                  <!--Optional:--> \
                                  <tem:userName>'+username+'</tem:userName> \
                                  <!--Optional:--> \
                                  <tem:city>'+city+'</tem:city> \
                            </tem:getStreets> \
                           </soapenv:Body> \
                     </soapenv:Envelope>';                
       return xml;          
}

//getSubRegions
function getSubRegions(username, heker, region ) {     
       var soapMessage=createSubRegionsSoapMessage(username, heker, region );
       $
       .ajax(
                     {
                           url : serverUrl,
                           dataType : "xml",
                           type : "POST",
                           async: false,
                           contentType : "text/xml;charset=utf-8",
                           headers: {
                             "SOAPAction": "http://tempuri.org/IService1/getSubRegions"
                         },
                           crossDomain: true,
                           data : soapMessage,
                           timeout: 30000 //30 seconds timeout
                     }).done(function(data) {                                                                              
                           var returnObject={};
                           var returndata=$(data).find("success").text();                                                                                     
                           if (returndata != "true") {                     
                                  returnObject.errorCode=1;                
                                  returnObject.errorLoginMessage=$(data).find("error").text();                                                                                                                
                           } else { //login successful                                                                            
                                  returnObject.errorCode=0;
                                  var i=0;
                                  returnObject.subRegions=[];                            
                                  $(data).find('string').each(function(){   
                                         var subRegions = $(data).find('string')[i].innerHTML;                                                                       
                                         returnObject.subRegions.push(subRegions); 
                                         i=i+1;
                                  });                                                                                                                                
                           }
                           console.log(returnObject); 
                           sessionStorage.setItem("subRegions", JSON.stringify(returnObject.subRegions)); 
                           return returnObject;
                     }).fail(function(jqXHR, textStatus, thrownError) {                                                                                                    
                           console.log('login failed: '+thrownError);
                           var returnObject={};
                           returnObject.errorCode=2;                       
                     });

       
}

function createSubRegionsSoapMessage(username, heker, region ) {
       var xml='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"> \
                 <soapenv:Header/> \
                           <soapenv:Body> \
                            <tem:getSubRegions> \
                                  <!--Optional:--> \
                                  <tem:userName>'+username+'</tem:userName> \
                                  <!--Optional:--> \
                                  <tem:heker>'+heker+'</tem:heker> \
                                         <!--Optional:--> \
                                  <tem:region>'+region+'</tem:region> \
                            </tem:getSubRegions> \
                           </soapenv:Body> \
                     </soapenv:Envelope>';                
       return xml;          
}

function insertBarcode(username, heker, region, subRegion, actionCode, actionDetailedCode, barcodes, firstName, lastName, city, street, streetText, houseNo, signature, phone, flgMessageShiyuch, yechida, davarPhoneNo) {
    //special case for mesira merukezet
var soapMessage;
    if (actionCode != 33) {
      soapMessage = createBarcodeSoapMessage(username, heker, region, subRegion, actionCode, actionDetailedCode, barcodes, firstName, lastName, city, street, streetText, houseNo, signature, phone, flgMessageShiyuch, yechida, davarPhoneNo);
    } else {
      actionCode=3;    //the correct action code for mesira merukezet
      soapMessage = createBarcodeSoapMessageMerukezet(username, heker, region, subRegion, actionCode, actionDetailedCode, barcodes, firstName, lastName, city, street, streetText, houseNo, signature, phone, flgMessageShiyuch, yechida, davarPhoneNo);    
    }
    $
    .ajax(
                  {
                      url: serverUrl,
                      dataType: "xml",
                      type: "POST",
                      async: false,
                      contentType: "text/xml;charset=utf-8",
                      headers: {
                          "SOAPAction": "http://tempuri.org/IService1/insertBarcode"
                      },
                      crossDomain: true,
                      data: soapMessage,
                      timeout: 30000 //30 seconds timeout
                  }).done(function (data) {
                      var returnObject = {};
                      var returndata = $(data).find("success").text();
                      if (returndata != "true") {
                          $(data).find("error").text() == 100 ? returnObject.errorCode = 100 : returnObject.errorCode = 1; // my function
                          //shai 24-09 start
                          returnObject.success = false;
                          //shai 24-09 end
                          returnObject.errorMessage = $(data).find("error").text();
                          sessionStorage.setItem("submit-delivery", "false");
                          sessionStorage.setItem("errorMessage", $(data).find("faultstring").text() );
                          console.log("insertBarcode error");

                          //omer 27-09 for testing start
                          sessionStorage.setItem("submit-delivery-error", $(data).find("error").text());
                          //omer 27-09 for testing end

                      } else { //successful             
                          console.log("insertBarcode success");
                          sessionStorage.setItem("submit-delivery", "true");
                          returnObject.success = true;
                          returnObject.errorCode = 0;
                          //shai 24-09 start
                          returnObject.success = true;
                          //shai 24-09 end
                      }
                      console.log("returnObject= " + JSON.stringify(returnObject));
                      return returnObject;
                  }).fail(function (jqXHR, textStatus, thrownError) {
                      console.log('insertBarcode failed: ' + thrownError);
                      var returnObject = {};
                      sessionStorage.setItem("submit-delivery", "error");
                      returnObject.errorCode = 2;
                      //shai 24-09 start
                      returnObject.success = false;
                      //shai 24-09 end

                  });


}




function createBarcodeSoapMessage(username, heker, region, subRegion, actionCode, actionDetailedCode, barcodes, firstName, lastName, city, street, streetText, houseNo, signature, phone, flgMessageShiyuch, yechida, davarPhoneNo) {
    var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:arr="http://schemas.microsoft.com/2003/10/Serialization/Arrays"> \
   <soapenv:Header/> \
   <soapenv:Body> \
      <tem:insertBarcode> \
         <!--Optional:--> \
         <tem:userName>'+ username + '</tem:userName> \
         <!--Optional:--> \
         <tem:heker>'+ heker + '</tem:heker> \
         <!--Optional:--> \
         <tem:region>'+ region + '</tem:region> \
         <!--Optional:--> \
         <tem:subRegion>'+ subRegion + '</tem:subRegion> \
         <!--Optional:--> \
         <tem:actionCode>'+ actionCode + '</tem:actionCode> \
         <!--Optional:--> \
         <tem:actionDetailedCode>'+ actionDetailedCode + '</tem:actionDetailedCode> \
         <!--Optional:--> \
         <tem:barcodes> \
            <!--Zero or more repetitions:--> \
            <arr:string>'+ barcodes + '</arr:string> \
         </tem:barcodes> \
         <!--Optional:--> \
         <tem:firstName>'+ firstName + '</tem:firstName> \
         <!--Optional:--> \
         <tem:lastName>'+ lastName + '</tem:lastName> \
         <!--Optional:--> \
         <tem:city>'+ city + '</tem:city> \
         <!--Optional:--> \
         <tem:street>'+ street + '</tem:street> \
         <!--Optional:--> \
         <tem:streetText>'+ streetText + '</tem:streetText> \
         <!--Optional:--> \
         <tem:houseNo>'+ houseNo + '</tem:houseNo> \
         <!--Optional:--> \
         <tem:signature>'+ signature + '</tem:signature> \
         <!--Optional:--> \
         <tem:phone>'+ phone + '</tem:phone> \
         <!--Optional:--> \
         <tem:flgMessageShiyuch>'+ flgMessageShiyuch + '</tem:flgMessageShiyuch> \
         <!--Optional:--> \
         <tem:yechida>'+ yechida + '</tem:yechida> \
         <!--Optional:--> \
         <tem:davarPhoneNo>'+ davarPhoneNo + '</tem:davarPhoneNo> \
      </tem:insertBarcode> \
   </soapenv:Body> \
</soapenv:Envelope>';
    console.log("input xml= " + xml);
    return xml;
}

function createBarcodeSoapMessageMerukezet(username, heker, region, subRegion, actionCode, actionDetailedCode, barcodes, firstName, lastName, city, street, streetText, houseNo, signature, phone, flgMessageShiyuch, yechida, davarPhoneNo) {
    var barcodesMerukezet=barcodes.split(",");
    var barcodesXML='';
    for (var i=0; i<barcodesMerukezet.length; i++) {
          barcodesXML +='<arr:string>'+barcodesMerukezet[i]+'</arr:string>';
    }
    console.log("barcodesXML = "+barcodesXML);
    var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:arr="http://schemas.microsoft.com/2003/10/Serialization/Arrays"> \
   <soapenv:Header/> \
   <soapenv:Body> \
      <tem:insertBarcode> \
         <!--Optional:--> \
         <tem:userName>'+ username + '</tem:userName> \
         <!--Optional:--> \
         <tem:heker>'+ heker + '</tem:heker> \
         <!--Optional:--> \
         <tem:region>'+ region + '</tem:region> \
         <!--Optional:--> \
         <tem:subRegion>'+ subRegion + '</tem:subRegion> \
         <!--Optional:--> \
         <tem:actionCode>'+ actionCode + '</tem:actionCode> \
         <!--Optional:--> \
         <tem:actionDetailedCode>'+ actionDetailedCode + '</tem:actionDetailedCode> \
         <!--Optional:--> \
         <tem:barcodes> \
            <!--Zero or more repetitions:--> \
            '+ barcodesXML + ' \
         </tem:barcodes> \
         <!--Optional:--> \
         <tem:firstName>'+ firstName + '</tem:firstName> \
         <!--Optional:--> \
         <tem:lastName>'+ lastName + '</tem:lastName> \
         <!--Optional:--> \
         <tem:city>'+ city + '</tem:city> \
         <!--Optional:--> \
         <tem:street>'+ street + '</tem:street> \
         <!--Optional:--> \
         <tem:streetText>'+ streetText + '</tem:streetText> \
         <!--Optional:--> \
         <tem:houseNo>'+ houseNo + '</tem:houseNo> \
         <!--Optional:--> \
         <tem:signature>'+ signature + '</tem:signature> \
         <!--Optional:--> \
         <tem:phone>'+ phone + '</tem:phone> \
         <!--Optional:--> \
         <tem:flgMessageShiyuch>'+ flgMessageShiyuch + '</tem:flgMessageShiyuch> \
         <!--Optional:--> \
         <tem:yechida>'+ yechida + '</tem:yechida> \
         <!--Optional:--> \
         <tem:davarPhoneNo>'+ davarPhoneNo + '</tem:davarPhoneNo> \
      </tem:insertBarcode> \
   </soapenv:Body> \
</soapenv:Envelope>';
    console.log("input xml= " + xml);
    return xml;
}


//
//loadMiyun ????
function loadMiyun(username, heker, region, subRegion ) {     
       var soapMessage=createMiyunSoapMessage(username, heker, region, subRegion );
       $
       .ajax(
                     {
                           url : serverUrl,
                           dataType : "xml",
                           type : "POST",
						   async: false,
                           contentType : "text/xml;charset=utf-8",
                           headers: {
                             "SOAPAction": "http://tempuri.org/IService1/loadMiyun"
                         },
                           crossDomain: true,
                           data : soapMessage,
                           timeout: 30000 //30 seconds timeout
                     }).done(function(data) {  					 
                           var errorMiyunMessage="";
                           var returndata=$(data).find("success").text();                                                                                     
                           if (returndata != "true") {                     
                                  errorCode=1;                
                                  errorMiyunMessage=$(data).find("error").text();  
								  
                           } else { //login successful                                                                            
                                  errorCode=0;
                                  Muynu=$(data).find("Muynu").text();
                                  Shuycho=$(data).find("Shuycho").text();
                                                                                                                                                      
                           }
						   var returnObject = {
									errorCode: errorCode,  
									Muynu: Muynu,
									Shuycho: Shuycho,
									errorMiyunMessage: errorMiyunMessage
								};
							 sessionStorage.setItem("Miyun", JSON.stringify(returnObject));
							//sessionStorage.setItem("Miyun", returnObject);
                     }).fail(function(jqXHR, textStatus, thrownError) {                                                                                                    
                           console.log('login failed: '+thrownError);
                           var returnObject={};
                           errorCode=2;
			         var returnObject = {
									errorCode: errorCode
								};
                            sessionStorage.setItem("Miyun", JSON.stringify(returnObject));						   
                     });

       
}

function createMiyunSoapMessage(username, heker, region, subRegion ) {
       var xml='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"> \
                 <soapenv:Header/> \
                           <soapenv:Body> \
                            <tem:loadMiyun> \
                                  <!--Optional:--> \
                                  <tem:userName>'+username+'</tem:userName> \
                                  <!--Optional:--> \
                                  <tem:heker>'+heker+'</tem:heker> \
                                         <!--Optional:--> \
                                  <tem:region>'+region+'</tem:region> \
                                         <!--Optional:--> \
                                  <tem:subRegion>'+subRegion+'</tem:subRegion> \
                            </tem:loadMiyun> \
                           </soapenv:Body> \
                     </soapenv:Envelope>';                
       return xml;          
}

//updatePhone
function updatePhone(username, phone ) { 
       var soapMessage=createPhoneSoapMessage(username, phone );
       $
       .ajax(
                     {
                           url : serverUrl,
                           dataType : "xml",
                           type : "POST",
                           contentType : "text/xml;charset=utf-8",
                           headers: {
                             "SOAPAction": "http://tempuri.org/IService1/updatePhone"
                         },
                           crossDomain: true,
                           data : soapMessage,
                           timeout: 30000 //30 seconds timeout
                     }).done(function(data) {                                                                              
                           var returnObject={};
                           var returndata=$(data).find("success").text();                                                                                     
                           if (returndata != "true") {                     
                                  returnObject.errorCode=1;                
                                  returnObject.errorLoginMessage=$(data).find("error").text();                                                                                                                
                           } else { //login successful                                                                            
                                  returnObject.errorCode=0;                                                                                                                                            
                           }
                           return returnObject;
                     }).fail(function(jqXHR, textStatus, thrownError) {                                                                                                    
                           console.log('login failed: '+thrownError);
                           var returnObject={};
                           returnObject.errorCode=2;                       
                     });

       
}

function createPhoneSoapMessage(username, phone) {
    var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"> \
                 <soapenv:Header/> \
                           <soapenv:Body> \
                            <tem:updatePhone> \
                                  <!--Optional:--> \
                                  <tem:userName>'+ username + '</tem:userName> \
                                         <!--Optional:--> \
                                  <tem:phone>'+ phone + '</tem:phone> \
                            </tem:updatePhone> \
                           </soapenv:Body> \
                     </soapenv:Envelope>';
    return xml;
}
