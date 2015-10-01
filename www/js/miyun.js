/* global $ */
var appName = 'דוורים';
var username = localStorage.getItem("username");
var heker = localStorage.getItem("heker");
var  Region = localStorage.getItem("Region");
var subRegions = localStorage.getItem("subRegions");
if(typeof subRegions == "undefined" ) {subRegions="";}
document.addEventListener("deviceready", init, false);

function init() {
	console.log('deviceready');
	//fastclick - https://github.com/ftlabs/fastclick	
	FastClick.attach(document.body);
    console.log('index.js FastClick');
    //handle client side session timeout
    //setSessionTimeout();	
    //document.addEventListener("backbutton", onBackKeyDown, false);
}	


$(document).ready(function(){
	loadMiyun(username, heker, Region, subRegions );	
	
	Miyun = sessionStorage.Miyun;
	Miyun=$.parseJSON(Miyun);
	var errorCode= Miyun.errorCode

	if(errorCode=="0"){
		$("#Shuycho").text(Miyun.Shuycho);
		$("#Muynu").text(Miyun.Muynu);
	}
	if(errorCode=="1"){
		errorMiyunMessage =Miyun.errorMiyunMessage;
		displayMessage(errorMiyunMessage);
	}
	if(errorCode=="2"){
		messageToDisplay= ('אירעה תקלה בהעברת הנתונים. \nנסה מאוחר יותר');
		displayMessage(messageToDisplay);
	}
	
	$('#startScan').
			click(
			  function(){				
				//document.addEventListener("backbutton", onBackKeyDownOnScan, false);
				cordova.plugins.barcodeScanner.scan(
					function (result) {			
						var s =
						"Result: " + result.text + ", " +
						"Format: " + result.format + ", " +
						"Cancelled: " + result.cancelled;
						console.log(s);	
						if (!(result.cancelled)) {			
							//var resultDiv=document.getElementById("packageNum");			
							//resultDiv.innerHTML = result.text;
							// omer commented this out $('input.packageNum').val(result.text);
							$('#packageNum').attr('value', result.text);
							//localStorage.setItem("delivery_result", result.text);
							barcodes=result.text;
							
							var insert =insertBarcode(username, heker, Region, subRegions, 6, 0, barcodes, "", "", 0, 0, "", "", "", "", false, 0);
								if (sessionStorage.getItem("submit-delivery") == "true") {								
										localStorage.removeItem("delivery_result");
										localStorage.removeItem("submit-delivery");	
										loadMiyun(username, heker, Region, subRegions );	
										Miyun = sessionStorage.Miyun;
										Miyun=$.parseJSON(Miyun);
										if(errorCode=="0"){
											$("#Shuycho").text(Miyun.Shuycho);
											$("#Muynu").text(Miyun.Muynu);
										}
										if(errorCode=="1"){
											errorMiyunMessage =Miyun.errorMiyunMessage;
											displayMessage(errorMiyunMessage);
										}
										if(errorCode=="2"){
											messageToDisplay= ('אירעה תקלה בהעברת הנתונים. \nנסה מאוחר יותר');
											displayMessage(messageToDisplay);
										}
										
	
									  }  else {									  
										messageToDisplay= ('אירעה תקלה בהעברת הנתונים. \nנסה מאוחר יותר');
										displayMessage(messageToDisplay);
								}		  
							} else {
								// user has cancelled the scan - nothing to do or display	
							}		
						//document.removeEventListener("backbutton", onBackKeyDownOnScan, false);									
					}, 					
				 	function(error) {
				 	//document.removeEventListener("backbutton", onBackKeyDownOnScan, false);
				 		console.log("Scanning failed: " + error);
						navigator.notification.alert(							
							'סליחה, המצלמה נתקלה בבעיה. ייתכן שיהיה עליך להפעיל מחדש את המכשיר',				//message
							null,														//callback
							'דוורים',														//title
							'אישור'														//button name
						);
					}
			)
	});    
	
});


$('#doneScan').click(function(){
	window.location = 'miyunPopup.html';
});
function displayMessage(messageToDisplay) {	
	navigator.notification.alert(	
			messageToDisplay,											//message
			null,														//callback
			'דואר רשום',												//title
			'אישור'														//button name
			);
}


