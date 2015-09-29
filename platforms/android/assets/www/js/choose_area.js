/* global $ */
var appName = 'דוורים';
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

$("#maazan").click(function(event) {
                        window.open("./doch.html",  "_self");
});

$("#tel").click(function(event) {
            window.open("tel:+1800229933",  "_self");
});
