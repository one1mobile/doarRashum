/* global $ */
var appName = 'דוורים';
var Maazan="";

document.addEventListener("deviceready", init, false);

//**********************
				//for testing only
				var username="42";
				var heker="5135";
				var region="43";
				var subRegion=
			//**********************
			//	debugger;
 
 
 $(document).ready(function(){
 var target = document.getElementById('maazanIcon');
	var spinner = new Spinner().spin(target);
	getMaazan(username, heker, region, subRegion );
	 Maazan= JSON.parse(sessionStorage.Maazan);
	 $('#NimseruLachaluka').text (Maazan.NimseruLachaluka);
	 $('#ddg').text (Maazan.ddg);
	 $('#merchazChaluka').text (Maazan.merchazChaluka);
	 $('#lehachzaraLasholeach').text (Maazan.lehachzaraLasholeach);
	 $('#acher').text (Maazan.acher);
	 spinner.stop();	
});

function init() {
	console.log('deviceready');
	//fastclick - https://github.com/ftlabs/fastclick	
	FastClick.attach(document.body);
    console.log('index.js FastClick');
    //handle client side session timeout
    //setSessionTimeout();	
	//document.addEventListener("backbutton", onBackKeyDown, false);
}	


			
 	



function displayMessage(messageToDisplay) {	
	navigator.notification.alert(	
			messageToDisplay,											//message
			null,														//callback
			'דואר רשום',												//title
			'אישור'														//button name
			);
}

