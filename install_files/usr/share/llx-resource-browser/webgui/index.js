// Global App Running (Zac Broser -zb-, Local Resources -lr- or Mestreacasa resources -mc-)
GlobalApp="lr";


// Array of Category Objects
var CatList=new Array();

// Current App Category
var CurrentApp="";
var CurrentUrl="";
var CurrentIcon="";
var CurrentIndex=0;



function start(xmlfile) {
	parseXml(decodeURIComponent(xmlfile));
	init(); // Cal fer-la.... després del parsexml, etc... be a lucky man!
}

	
// Objects Definition
function category(name, icon, highres, lowres, visible, websites,background){
	this.name=name;
	this.icon=icon;
	this.highres=highres;
	this.lowres=lowres;
	this.visible=visible;
	this.websites=websites;
	this.background=background;
}

function website(name, url, icon, type, allow, restriction, helpurl, visible, safecontent){
	this.name=name;
	this.url=url;
	this.icon=icon;
	this.type=type;
	this.allow=allow;
	this.restriction=restriction;
	this.helpurl=helpurl;
	this.visible=visible;
	this.safecontent=safecontent;
}
	 
	 
function RightArrowPressed(name, index, init){
	$("#catContainer").animate({width: 0, opacity: 0.2}, 400);  
	$("#catContainer").animate({marginLeft: 400, opacity: 0.2}, 0);  
	$("#catContainer").animate({width: 800, marginLeft: -400, opacity: 1.0}, 400);  
	DisplayResources(name, index, init);

	
}

function LeftArrowPressed(name, index, init){
		
	$("#catContainer").animate({width: 0, marginLeft: 400, opacity: 0.2}, 400);  
	$("#catContainer").animate({marginLeft: -400, opacity: 0.2}, 0);  
	$("#catContainer").animate({width: 800, opacity: 1.0}, 400);  
	DisplayResources(name, index, init);
}


function menuContext(init){
	
	// Clear Main Container
	$("#mainContainer").empty();
	
	// Adding Menu Containers to Main Container
	element="<div id='catContainer'> \
				<div id='leftArrow'>&nbsp;</div>\
				<div id='catContent'>&nbsp;</div>\
				<div id='rightArrow'>&nbsp;</div>\
		</div>\
		<div id='catMenu'></div>";
	$("#mainContainer").append(element);
	
	// Display Apps
	if (init==0) DisplayResources(CurrentApp,0, 0);
	else DisplayResources(CurrentApp,CurrentIndex, 0);
	
	// Display Menu
	DisplayMenu();
	// Add Effects
	$(".iconImage img").hover(function(){
        $(this).stop().animate({width: 96, opacity: 0.75, marginTop: -10, marginLeft: 0}, 400); },
          function(){
                $(this).stop().animate({width: 64, opacity: 1.0, marginTop: 0, marginLeft: 16}, 400);
       });
	  
	  
	$("#quitbutton").hover(function(){
        $(this).stop().animate({opacity: 0.75, marginBottom: 15, marginLeft: 0}, 400); },
          function(){
                $(this).stop().animate({opacity: 1.0, marginBottom: 0, marginLeft: 0}, 400);
       });
	 
	$("#quitbutton").click(function(){
	self.close();});   
	  
	  
	
	};

function OpenApp(name, url){
	// Delete all content
	$("#mainContainer").empty();
	element="<div id='topApps'> \
		 <div class='topIconRight' onclick='menuContext(0)'> <img width='45px' height='45px' src='images/icons/home.png'/></div>\
		 <div class='topIconRight' onclick='menuContext(1)'> <img width='45px' height='45px' src='"+CurrentIcon+"' /></div>\
		 </div>";
	$("#mainContainer").append(element);
	
	
	element="<iframe class='appFrame' src="+url+"/>"
	$("#mainContainer").append(element);
	
	//alert(name+" - "+url);
	
}

function DisplayResources(name, index, init){
	// name:Resource Name (Ex: Televisión)
	// index: index of resource (Ex: Televisión -> 1)
	// init: init app to show (Ex: from 0 to 14)
	
	// Set Global CurrentApp info
	CurrentApp=CatList[index].name;
	CurrentUrl=CatList[index].url;
	CurrentIcon=CatList[index].icon;
	CurrentIndex=index;
	
	
	
	
	// Change Background
	$('body').css('background-image', 'url(images/backgrounds/'+CatList[index].background+')');
		
	//$("body").animate({opacity: 0}, 100); 
		 
	/*switch(index){
	case '0':
		$('body').css('background-image', 'url(images/backgrounds/init.png)');
		break;
	case '1':	        
		$('body').css('background-image', 'url(images/backgrounds/tv.png)');
		break;
	case '2':
		$('body').css('background-image', 'url(images/backgrounds/playing.png)');
		break;
	case '3':
		$('body').css('background-image', 'url(images/backgrounds/music.png)');
		break;
	case '4':
		$('body').css('background-image', 'url(images/backgrounds/cuentos.png)');
		break;
	case '5':
		$('body').css('background-image', 'url(images/backgrounds/activities.png)');
		break;
	case '6':
		$('body').css('background-image', 'url(images/backgrounds/apps.png)');
		break;
	case '7':
		$('body').css('background-image', 'url(images/backgrounds/winter.png)');
		break;
	case '8':
		$('body').css('background-image', 'url(images/backgrounds/llx.png)');
		break;
	}	*/
			
	$("body").animate({opacity: 1.0}, 100); 
	
	//alert(name+" "+index+" "+init);
	// Clean catContent Container
			
	$("#catContent").empty();
	$("#rightArrow").empty();
	$("#leftArrow").empty();
		
	if(CatList[index].websites.length==0) {
			$("#catContainer").css('visibility','hidden');	}
	else {
		$("#catContainer").css('visibility','visible');
		var counter=0; // Icon counter
		for(var i=init;(i<CatList[index].websites.length)&&(counter<15);i++) {
			//var element=CatList[index].websites[i].name;
			var iconClass="iconAppContainer";
			if ((i%5)==0) iconClass="iconAppContainerFirst";
			else if ((i%5)==4) iconClass="iconAppContainerLast";
			var element=CreateAppIcon(iconClass, CatList[index].websites[i].icon, CatList[index].websites[i].name, CatList[index].websites[i].url);
	  
			$("#catContent").append(element);
			
			counter++;
		}
		
		// Right Arrow
		if(CatList[index].websites.length-init>15){
			element="<div class='Arrow'  onclick='RightArrowPressed(\""+name+"\",\""+index+"\","+i+")'> \
			<img  src='./images/icons/right.png'/></div>";
		    $("#rightArrow").append(element);
		}
		
		// Left Arrow
		if(init>0){
			element="<div class='Arrow'  onclick='LeftArrowPressed(\""+name+"\",\""+index+"\","+(init-15)+")'> \
			<img class='ArrowImg' src='./images/icons/left.png'/></div>";
		    $("#leftArrow").append(element);
		}

		// Animate arrow
		$(".Arrow img").hover(function(){
		        $(this).stop().animate({width: 100, opacity: 0.75, marginTop: -10, marginLeft: -20}, 400); },
		          function(){
		         $(this).stop().animate({width: 45, opacity: 1.0, marginTop: 0, marginLeft: 0}, 400);
		       });

	}
	
	$(".Arrow").hover(function() {
		$(this).css('cursor','pointer');
	}, function() {
		$(this).css('cursor','auto');
	});

	
	 $(".iconAppImage img").hover(function(){
        $(this).stop().animate({width: 94, opacity: 0.75, marginTop: -15, marginLeft: 11}, 400); },
          function(){
                $(this).stop().animate({width: 84, opacity: 1.0, marginTop: 0, marginLeft: 16}, 400);
       });
	
	//alert(name);
	//alert(index);
	
	document.getElementById("leftArrow").style.visibility="visible";
	document.getElementById("rightArrow").style.visibility="visible";		
	$("#catContent").animate({marginLeft: 0, opacity: 1.0}, 800);
}

function CreateMenuIcon(icon, name, index){ // Auxiliar Function to create icons
    var MyIcon="<div class='iconContainer' onclick='DisplayResources(\""+name+"\",\""+index+"\",0)'>"+
            "<div class='iconImage'><img class='iconImage' src='"+icon+"'>"+
            "</div>"+
            "<div class='iconText'>"+name+"</div></div>";
                
    return MyIcon;
    
}

function CreateAppIcon(iconClass, icon, name, url){ // Auxiliar Function to create icons
    //var MyIcon="<div class='iconContainer' onclick='DisplayResources(\""+name+"\",\""+index+"\",0)'>"+
	var MyIcon="<div class='"+iconClass+"'>"+
            "<div class='iconAppImage' onclick='OpenApp(\""+name+"\",\""+url+"\",0)'> \
			<img class='iconAppImage' src='"+icon+"'>"+
            "</div>"+
            "<div class='iconAppText'>"+name+"</div></div>";
                
    return MyIcon;
    
}


function init(){ // Initializer Function executed on loading page

    DisplayMenu();
    
    // Hide catcontainer for the initial screen
	$("#catContainer").css('visibility','hidden');
    
    
    $(".iconImage img").hover(function(){
        $(this).stop().animate({width: 96, opacity: 0.75, marginTop: -10, marginLeft: 0}, 400); },
          function(){
                $(this).stop().animate({width: 64, opacity: 1.0, marginTop: 0, marginLeft: 16}, 400);
       });
	
     $("#quitbutton").hover(function(){
        $(this).stop().animate({opacity: 0.75, marginBottom: 15, marginLeft: 0}, 400); },
          function(){
                $(this).stop().animate({opacity: 1.0, marginBottom: 0, marginLeft: 0}, 400);
       });
    
	// Display Icons
	//DisplayIcons();
	//printCat();
	// Show cat
	$("#quitbutton").click(function(){
	self.close();});
	
	
	
 }
	  	 	 
// Get Parameters
getApp = function(){
	var parts=encodeURI(window.location.href).split("?");
	
	if (parts.length==2){
		listparams=parts[1].split("=");
		if(listparams[0]=="app"){
			if(listparams[1]=="zac"||listparams[1]=="mestre"||listparams[1]=="recursos") return listparams[1];
			else return 'recursos--';
		} 
	   }  
	return 'local';
    //var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec();
    //return results[1] || 0;*/
}


function getUrlVar(uv) {
    //extract the query string from the url
    //var query = window.location.search.substring(1);
    var query = window.location.search.substring(1).split('?')[0]
        //split the query into separate name/value pairs
    var vars = query.split("&amp;");
    for (var i=0;i<vars.length;i++) {
                //split each pair into separate names and values
        var pair = vars[i].split("=");
                //find the required name and return it's value
        if (pair[0] == uv) {
            return pair[1];
        }
        }
    return false;
}
    

$(document).ready(function() { // Gets zac.xml and parse it
	//parseXml(decodeURIComponent(getUrlVar('file')));
	//alert(aaa);
	//parseXml(decodeURIComponent(aaa));
	//alert();
	/*
	// Is Zac Browswer?
	if(getApp()=="zac"){
		alert("zac");
		// Get lang
		if(navigator.language=="ca"||navigator.language=="qcv") MyXMLFile="webgui/zac_va.xml";
		else MyXMLFile="webgui/zac.xml"
		alert("1");
		// Loads zac.xml file
		$.ajax({
			type: "GET",
			url: MyXMLFile,
		dataType: "xml",
		    async: false,  // Wait until data has been loaded
		success: parseXml  });
		alert("2");
		// Load Animations
		
		
	} else if(getApp()=="mestreacasa"){   // Is Mestre a Casa?
	   $.ajax({
		type: "GET",
		url: "mestreacasa.xml",
		dataType: "xml",
		async: false,  // Wait until data has been loaded
		success: parseXml  });  
	
		
	} else{  // elsewhere, load local resources
		$.ajax({
		type: "GET",
		url: "recursos.xml",
		dataType: "xml",
		async: false,  // Wait until data has been loaded
		success: parseXml  });   
	}

	alert(MyXMLFile);*/
	
	/* Animation */
	app=getApp()
	//alert(app)
	if(app=="recursos"){
		$('#mainContainer').append('<div id="mountains"></div>');
		$('#mainContainer').append('<div id="valentin"></div>');
		$('#mainContainer').append('<div id="ground"></div>');
		
		$('#mountains').pan({fps: 20, speed: 0.5, dir: 'left'}); 
		$('#ground').pan({fps: 20, speed: 1, dir: 'left'});
		$('#valentin').sprite({
			fps:9,
			no_of_frames: 6,
			start_at_frame: 1});
	}
	
	
	if (app=="zac") {
		param=window.MyBindings.getZacContent();
	} else if (app=="mestre") {
		param=window.MyBindings.getMestreContent();
	} else param=window.MyBindings.getRecursosContent();
		
	
	//param=window.MyBindings.getString("tralari","1","2","3");
	
	//init();
});


function parseXml(xml) { // Parses XML files into classes
	//alert(xml);
	//alert(xml.length);
	$(xml).find("category").each(function() {
			var catname=$(this).children("name").text();
			var caticon=$(this).children("icon").text();
			var highres=$(this).children("highres").text();
			var lowres=$(this).children("lowres").text();
			var visible=$(this).children("visible").text();
			var background=$(this).children("background").text();
			
			var websites=new Array();
			
			$(this).find("website").each(function(){
				
				var sitename=$(this).children("name").text();
				var siteurl=$(this).children("url").text();
				var siteicon=$(this).children("icon").text();
				var type=$(this).children("type").text();
				var allow=$(this).children("allow").text();
				var restriction=$(this).children("restriction").text();
				var helpurl=$(this).children("helpurl").text();
				var sitevisible=$(this).children("visible").text();
				var safecontent=$(this).children("safecontent").text();
					

				
				if(siteurl.substring(0,4)=='http'){
				// Create website object
				MySiteObject=new  website(sitename, siteurl, siteicon, type, allow, restriction, helpurl, sitevisible, safecontent);
				websites[websites.length]=MySiteObject;}
				else{ // Is it the same??
					MySiteObject=new  website(sitename, siteurl, siteicon, type, allow, restriction, helpurl, sitevisible, safecontent);
						websites[websites.length]=MySiteObject;
				}

				
			})
			//alert("foumd cat: "+catname);
			MyCategory=new category(catname, caticon, highres, lowres, visible, websites, background);
			CatList[CatList.length]=MyCategory;
			
			
	});
	
}



/*

Temp Functions

*/

// Display Icons function
function DisplayIcons(){
  for(var i=0;i<links.length;i++){
	  var element="<div class='link'>"+
	  	"<a href='"+links[i].url+"'"+
	  	"<div class='icon'>"+
	      "<img src='index/icons/"+links[i].icon+"'+/></div>"+
	  links[i].name+"</a></div>";
	 document.getElementById('content').innerHTML=document.getElementById('content').innerHTML+element;
 }
}

function printCat(){ // Show cat info
	
	if (CatList.length==0)
		$("#output").append("Llista Buida");
	else for(var i=0;i<CatList.length;i++) {
			$("#output").append("<ul>");
			$("#output").append("<li>"+CatList[i].name);
			$("#output").append("<li>"+CatList[i].icon);
			$("#output").append("<li>"+CatList[i].highres);
			$("#output").append("<li>"+CatList[i].lowres);
			$("#output").append("<li>"+CatList[i].visible);
			for(var j=0;j<CatList[i].websites.length;j++) {
					$("#output").append("-"+CatList[i].websites[j].name+"<br/>");
					$("#output").append("-"+CatList[i].websites[j].url+"<br/>");
					$("#output").append("-"+CatList[i].websites[j].icon+"<br/>");
					$("#output").append("-"+CatList[i].websites[j].type+"<br/>");
					$("#output").append("-"+CatList[i].websites[j].allow+"<br/>");
					$("#output").append("-"+CatList[i].websites[j].restriction+"<br/>");
					$("#output").append("-"+CatList[i].websites[j].helpurl+"<br/>");
					$("#output").append("-"+CatList[i].websites[j].visible+"<br/>");
					$("#output").append("-"+CatList[i].websites[j].safecontent+"<br/>");
				}
			$("#output").append("</ul>");
	};
}

function DisplayMenu(){
    
    for(var i=0;i<CatList.length;i++) {
        var newIcon=CreateMenuIcon(CatList[i].icon, CatList[i].name, i);
        $("#catMenu").append(newIcon);
	$("#catMenu").css('width', (i+1)*110);
	$("#catMenu").css('margin-left', 0-((i)*110)/2)-55;
			  
		//$("#output").append(newIcon);
        
		/*$("#output").append("<ul>");
		$("#output").append("<li>"+CatList[i].name);
		$("#output").append("<li>"+CatList[i].icon);*/
			
    }
    
}
