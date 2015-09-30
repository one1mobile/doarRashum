/* global $ */
var appName = 'דוורים';
var Maazan="";
 var username="";
 var heker="";
 var region="";
 var subRegion="";
document.addEventListener("deviceready", init, false);

//**********************
		  
				 username=localStorage.username;
				 heker=localStorage.heker;
				 region=localStorage.Region;
				 subRegion=localStorage.subRegions;						
				if(typeof subRegion == "undefined" ) {subRegion="";}
				
			
 
 
 $(document).ready(function(){
 var target = document.getElementById('maazanIcon');
	var spinner = new Spinner().spin(target);
	//Maazan =  new Object();   
	var Maazan=new getMaazan(username, heker, region, subRegion );
	 Maazan= JSON.parse(sessionStorage.Maazan);
	 $('#NimseruLachaluka').text (Maazan.NimseruLachaluka);
	 $('#ddg').text (Maazan.ddg);
	 $('#merchazChaluka').text (Maazan.merchazChaluka);
	 $('#lehachzaraLasholeach').text (Maazan.lehachzaraLasholeach);
	 $('#acher').text (Maazan.acher);
	 
	// $('#huchzeruLaMR').text (Maazan.huchzeruLaMR);
	 $('#hachzaraLasholeach').text (Maazan.hachzaraLasholeach);
	 $('#hutzuLachaluka').text (Maazan.hutzuLachaluka);
	 $('#nimseruLaniman').text (Maazan.nimseruLaniman);
	 $('#huavarLashaliach').text (Maazan.huavarLashaliach);
	 
	 $('#hodaa').text (Maazan.hodaa);
	 $('#avud').text (Maazan.avud);
	 $('#leloDivuach').text (Maazan.leloDivuach);
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

