
$(document).ready(function() {
	// Bubble Animation
	
	//#param=window.getString();
	
	
	$('#recursos_bubble').jqFloat({
		width: 15,
		height: 15,
		speed: 500
	});
	$('#mestre_bubble').jqFloat({
		width: 15,
		height: 15,
		speed: 500
	});
	$('#zac_bubble').jqFloat({
		width: 15,
		height: 15,
		speed: 500
	});
	

n4d-client -h 127.0.0.1 -c n4dResourceBrowser -m GetNetworkAvailability

    $.xmlrpc({
    	url: 'https://127.0.0.1:9779',
        methodName: 'GetNetworkAvailability',
            	params: [[], "n4dResourceBrowser"],
                	success: function(response,status,jqXHR){
                		alert("Success with response: ");
                    	},
                    error: function(jqXHR, status, error) { alert("Status: "+status+"\nError: "+error);}
                    });

	});



function start(availability) {
	
	$('#recursos_bubble').mouseover(function() {
		txt="Recursos LliureX";
		$("#app_name").text(txt);
		len=document.getElementById("app_name").offsetWidth+20;
		//len=text.length*40;
		//$("#app_name_container").css("width", len);
		$("#app_name_container").css("margin-left", (len/2)*(-1));
		$("#app_name_container").show();
		
		$(this).animate({"margin-top": "0px"},'normal');
		
		//$(app_name).text(text);
	});
	$('#mestre_bubble').mouseover(function() {
		txt="Recursos a Mestre a Casa"
		$("#app_name").text(txt);
		len=document.getElementById("app_name").offsetWidth+20;
		//$("#app_name_container").css("width", len);
		$("#app_name_container").css("margin-left", (len/2)*(-1));
		$("#app_name_container").show();
		$(this).animate({"margin-top": "0px"},'normal');
		/*len=text.length*40;
		$(app_name).css("width", len);
		$(app_name).css("margin-left", (len/4)*(-1));*/
		
		
	});
	$('#zac_bubble').mouseover(function() {
		txt="Zac Browser";
		$("#app_name").text(txt);
		len=document.getElementById("app_name").offsetWidth+20;
		//$("#app_name_container").css("width", len);
		$("#app_name_container").css("margin-left", (len/2)*(-1));
		$("#app_name_container").show();
		$(this).animate({"margin-top": "0px"},'normal');
		
		/*len=text.length*40;
		$(app_name).css("width", len);
		$(app_name).css("margin-left", (len/4)*(-1));
		$(app_name).text(text);*/
	});
	
	$('#zac_bubble').click(function() {
			location.href="index.html?app=zac";
		})
	$('#mestre_bubble').click(function() {
			location.href="index.html?app=mestre";
		})
	$('#recursos_bubble').click(function() {
			location.href="index.html?app=recursos";
		})

	
	$('#recursos_bubble').mouseout(function() {
		$("#app_name").text("");
		$(this).animate({"margin-top": "30px"},'normal');
		});
	$('#mestre_bubble').mouseout(function() {
		$("#app_name").text("");
		$(this).animate({"margin-top": "30px"},'normal');
		});
	$('#zac_bubble').mouseout(function() {
		$(this).animate({"margin-top": "30px"},'normal');
		$("#app_name").text("");
		});
	
	if(availability=="False"){
		$('#zac_bubble').hide();
		$('#mestre_bubble').hide();
	}
}
	

