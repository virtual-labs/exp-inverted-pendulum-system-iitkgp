 
   /* This HTML page and script files are developed by
    Piyali Chattopadhyay
    Project Scientist-Technical,
    Virtual Labs IIT Kharagpur.*/      

	
/*$(document).ready(function(){
  $("#instcontrol").click(function(){
	//$("#inst").css("display","block");  
    $("#inst").slideDown();
  });
  //$(".btn2").click(function(){
    //$("p").slideDown();
  });	*/
  
  
  function crane_ctrl_pics1(){
	  
	document.getElementById('controller').src = './images/s2.jpg';
	document.getElementById('cbtn2').style.display = "block";
	document.getElementById('cbtn3').style.display = "block";
	document.getElementById('cbtn1').style.display = "none";
	  
  }
  
   function crane_ctrl_pics2(){
	  
	document.getElementById('controller').src = './images/s3.jpg';
	document.getElementById('cbtn2').style.display = "none";
	document.getElementById('cbtn1').style.display = "none";
	document.getElementById('cbtn3').style.display = "none";
	document.getElementById('sine').style.display = "block";
	document.getElementById('b1').style.display="block";
	document.getElementById('c1').style.display="block";
	document.getElementById('r1').style.display="none";
	document.getElementById('display_duration').style.display="block";	
	  
  }
  
  function crane_ctrl_pics3(){
	  
	document.getElementById('controller').src = './images/s4.jpg';
	document.getElementById('cbtn2').style.display = "none";
	document.getElementById('cbtn1').style.display = "none";
	document.getElementById('cbtn3').style.display = "none";
	
	document.getElementById('b2').style.display="block";
	document.getElementById('c2').style.display="block";
	document.getElementById('r2').style.display="none";
	document.getElementById('display_duration2').style.display="block";	
	  
  }
  function set_trajectory(){
	  
	document.getElementById('sinetab').style.display='block';
	
	  
  }
   
  function set_trajectory1(){
	  
	document.getElementById('sinetab').style.display='block';
	document.getElementById('craneopchk').value = "1";
	  
  }
  function set_trajectory2(){
	  
	document.getElementById('steptab').style.display='block';
	document.getElementById('craneopchk').value = "2";  
  }
  
  function close_trajectory(){
	//document.getElementById('signaltab').style.display='none';  
	document.getElementById('sinetab').style.display='none';
	//document.getElementById('steptab').style.display='none';
	//if(document.getElementById('craneopchk').value == 1){
	document.getElementById('display_duration').value = document.getElementById('timesine').value;
	//}
//else if(document.getElementById('craneopchk').value == 2){
	//document.getElementById('display_duration').value = document.getElementById('timestep').value;
	//}
		  
  }
  
  
  
  
  function back(){
	document.getElementById('controller').src = './images/s1.jpg';
	document.getElementById('cbtn1').style.display = "block"; 	  
	document.getElementById('cbtn2').style.display = "none";
	document.getElementById('sine').style.display = "none";
	
	document.getElementById('b1').style.display="none";
	document.getElementById('c1').style.display="none";
	document.getElementById('r1').style.display="none";
	document.getElementById('display_duration').style.display="none";
	
	
	document.getElementById('b2').style.display="none";
	document.getElementById('c2').style.display="none";
	document.getElementById('r2').style.display="none";
	document.getElementById('display_duration2').style.display="none";
  }
  
  function ponoff(){
	if(document.getElementById('ponoff').src.match('./images/poff.png')){
		
		document.getElementById('ponoff').src = './images/pon.png';		
	}

	else if(document.getElementById('ponoff').src.match('./images/pon.png')){	
		
		document.getElementById('ponoff').src = './images/poff.png';		
	}
	  
  }
  
  function pgon(){
	if(document.getElementById('con').src.match('./images/cgoff.png')){
		
		document.getElementById('con').src = './images/c_on.png';		
	}
  
  }
  
  function pgoff(){
	if(document.getElementById('con').src.match('./images/c_on.png')){	
		
		document.getElementById('con').src = './images/cgoff.png';

		if(document.getElementById('controller').src.match('./images/s3.jpg')){
			
			stop_simu1();
		}
		
		else if(document.getElementById('controller').src.match('./images/s4.jpg')){
			stop_simu2();
		}
	}
	  
  }
  
  
  
  
  
  
  
  
 ///////////////////////////////////////////////////////////// moves the cart_pendulum to left- right and right - left direction //////////////////////////////////////////////////////////////
   
   //var right = 120; /* initial positon */
	var left1 = 0.2; /*initial position */
	var left2 = 0.2; /*initial position */
	//var left3 = 340; /*initial position */
	//var temp = right;
	var temp1 = left1;
	var temp2 = left2;
	
	var goLeft1 = false;
	var goRight1 = true;
	
	var goLeft2 = false;
	var goRight2 = true;
	
	//var goLeft3 = false;
	//var goRight3 = true;
   var movecart;
   var movepend;
   var movecart2;
   
function start(){

   movecart= setInterval(movecart_pend, 30); 
  // movepend= setInterval(move_pend, 30);    
    //clearInterval(1000); 
	document.getElementById('pend').classList.add("movependulum");
}
      
	  
      function movecart_pend(){ 
		
		if(goRight1) {
			temp1++;
			
			if(temp1 == 16.2 ) { /* move right*/
				goRight1 = false;
				goLeft1 = true;
			}
		} else if(goLeft1) {
			temp1--;
			
			if(temp1 == -16.8 ) { /* move left */
				goLeft1 = false;
				goRight1 = true;
			}
		}
		document.getElementById('pendset').style.left = temp1+'%';
		

     
	  }
	  
	  
	  function movecart_pend2(){ 
		
		if(goRight2) {
			temp2++;
			
			if(temp2 == 6.2 ) { /* move right*/
				goRight2 = false;
				goLeft2 = true;
			}
		} else if(goLeft2) {
			temp2--;
			
			if(temp2 == -6.8 ) { /* move left */
				goLeft2 = false;
				goRight2 = true;
			}
		}
		document.getElementById('pendset').style.left = temp2+'%';
		

     
	  }
	  
	  
	  
	  
	 	  
	  function stop(){
		
		 clearInterval(movecart);
		 //clearInterval(movepend);
		document.getElementById('pend').classList.remove("movependulum");
		 
	} 
  
  function stop_simu1(){
		
		 clearInterval(movecart);
		document.getElementById('r1').src = "./images/run.png";
		 
	} 
  
  function stop_simu2(){
		
		 clearInterval(movecart2);
		document.getElementById('r2').src = "./images/run.png";
		document.getElementById('pend').classList.add("invpendfall");
		 
	} 
  

function Build(){
		setTimeout(function(){
		alert('Model Built');	
		},2000)
		
	}
	function CT(){		
		setTimeout(function() {
			alert('Model loaded and ready');
			if(document.getElementById('controller').src.match("./images/s3.jpg")){
         document.getElementById('r1').style.display  = "block";
			}
         	
		else if(document.getElementById('controller').src.match("./images/s4.jpg")){
         document.getElementById('r2').style.display  = "block";
			}

			
           }, 2000);
	}
	
	



/////////////////////////////////////////////////////crane stabilization simulation design//////////////////////////////

function crane_stab_sine(){
	
	var Amp = document.getElementById('amp').value;
	var duration = document.getElementById('timesine').value;
	var freq = document.getElementById('frq').value;
	
	var yip = new Array();
    var yop = new Array();	
	var dataIPPoints=[];
	var dataOPPoints=[];	
	
	////////////////////////Actual tested Math model through EOM taking theta=pi , sintheta = -theta,costheta=-1,thetadotsqr = 0 kp1=8,ki1=0.3,kd1=4//////////////////////
	/***var a = math.complex(0.000449133,0.000313629);	
	var b = math.complex(-0.0180374,-2.57231);	
	var c = math.multiply(b,t);	
	var d = math.pow(math.e,c);	
	var e = math.complex(0.34443,-0.938812);
	var f = math.complex(0,5.14463);
	var g = math.multiply(f,t);		
	var h = math.pow(math.e,g);	
	var j = math.add(e,h);	
	var frstcomp = math.multiply(a,d,j);
	
	var k = math.complex(-0.00187338,-0.80225);	
	var l = math.complex(0,-0.628318);	
	var m = math.multiply(b,t);	
	var n = math.pow(math.e,c);	
	var o = math.complex(-0.999989,-0.0046703);
	var p = math.complex(0,1.25664);
	var q = math.multiply(p,t);		
	var r = math.pow(math.e,q);	
	var s = math.add(o,r);	
	var scndcomp = math.multiply(k,n,s);
	
	var thrdcomp = (math.multiply(0.0577219,math.pow(math.e,math.multiply(-21.2911,t))));
	
	var frthcomp = -(math.multiply(0.0567033,math.pow(math.e,math.multiply(-2.1625,t))));
	
	var fifthcomp = (math.multiply(1.61527,math.pow(10,-7),math.pow(math.e,math.multiply(-0.0382302,t))));
	
	var y = math.multiply(0.188495,math.add(frstcomp,scndcomp,thrdcomp,frthcomp,fifthcomp));
	
	
	yop[t] = (y.re);
	yip[t] = 3.141592;
	
	The above math model is valid for sine amp = 0.3 v , freq = 0.1 Hz, PID1 and PID2 parameters are found through tuning process (as in MATLAB).It is observed for different amps and freqs
    the above model provides exactly desired output as input. Hence to make model user defined the replica of above model has been used.cause due to complex computational issue it is not
    possible to use the above model for user defined desired signals.****/	
	
	/////////////////////////Math Model simulation replica///////////////////////
	for(var t=0;t<=duration;t++){
		
	
	
	var y = Amp * Math.sin(2*Math.PI*freq*t);
	
	
	yop[t] = (y);
	//////////////////Math model test for angle theta=pi, kp2 =5, ki2=0.1, kd2= 0.2/////////////////////////////
	
	/*var a = math.complex(-0.371945,-0.046996);	
	var b = math.multiply(math.complex(-0.41448,-5.13889),t);
	var c = math.pow(math.e,b);	
	var d = math.complex(0.968572,-0.248733);
	var e = math.pow(math.e,math.multiply(math.complex(0,10.2778),t));
	var f = math.add(d,e);
	var frstcomp = math.multiply(a,c,f);
	
	var scndcomp = math.multiply(0.0096899,math.pow(math.e,math.multiply(-0.0197586,t)))
	
	var thrdcomp = 0.75358;
	var y = math.multiply(3.1415,math.add(frstcomp,scndcomp,thrdcomp));
	
	yip[t]= (y.re);*/
	
	yip[t] = 3.141592;
	console.log("cart position="+ yop[t]);
	
	dataIPPoints.push({x:(t), y:(yip[t])});///pendulum angle pi
	dataOPPoints.push({x:(t), y:(yop[t])});///cart position in m
	
}

document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 
document.getElementById('chartContainer2').style.display  = "block"; 
	
	var chart = new CanvasJS.Chart("chartContainer",
    {
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Cart Position Response (m vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Position(m)",
			
			maximum:1,
        },
		/*{/////input y axis invisible
			gridThickness: 0,
    tickLength: 0,
    lineThickness: 0,
    labelFormatter: function(){
      return " ";}
	  
		}*/
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       /*{        
        type: "spline",
		color:"#F9CC1D",
        dataPoints:dataIPPoints
	
       },*/
      ]	
	});

	
	var chart2 = new CanvasJS.Chart("chartContainer2",
    {
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Angle (rad vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Position(m)",
			
			//maximum:3.5,
        },
		/*{/////input y axis invisible
			gridThickness: 0,
    tickLength: 0,
    lineThickness: 0,
    labelFormatter: function(){
      return " ";}
	  
		}*/
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataIPPoints
	
       },
       /*{        
        type: "spline",
		color:"#F9CC1D",
        dataPoints:dataIPPoints
	
       },*/
      ]	
	});
	
	
	chart.render();
	chart2.render();
	document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	


}

function Invpend_PD(){
	
	var Amp = document.getElementById('amp').value;
	var duration = document.getElementById('display_duration2').value;
	
	var yip = new Array();
    var yop = new Array();	
	var dataIPPoints=[];
	var dataOPPoints=[];	
	
	/////////////////////////Math Model LQR PID kp=1=43.3, ki1=33.796, kd1=2.254 kp2=120.9, ki2=247.43, kd2=10///////////////////////
	for(var t=0;t<=duration;t++){
		
	var a = math.multiply(-0.81277,t);
	var b = math.pow(math.e,a);
	var frstcomp = math.multiply(0.00229776,b);
	
	var c = math.complex(6.58135,-5.62228);
	var d = math.complex(-6.17641,-14.3083);
	var e = math.multiply(d,t);
	var f = math.pow(math.e,e);
	
	var g = math.complex(0.156214,0.987723);
	var h = math.complex(0,28.6166);
	var j = math.multiply(h,t);
	var k = math.pow(math.e,j);
	var l = math.add(g,k);
	
	var scndcomp = math.multiply(c,f,l);
	
	var y = math.add(frstcomp,scndcomp);
	
	yop[t] = (y.re);	
	
	
	console.log("cart position="+ yop[t]);
	
	
	dataOPPoints.push({x:(t), y:(yop[t])});///cart position in m
	
}
/*for(var t=0;t<=duration/8;t++){

yip[t] = 3.141592;

dataIPPoints.push({x:(t), y:(yip[t])});///pendulum angle pi
}

for(var t=duration/8;t<=duration;t++){

yip[t] = 0.001;

dataIPPoints.push({x:(t), y:(yip[t])});///pendulum angle zero
}*/
///////////Model test///////////////////////////////////////////////////////
for(var t=0;t<=duration;t++){


	var m = math.multiply(-2.60998,t);
	var n = math.pow(math.e,m);
	var frstcomp1 = math.multiply(0.0000457248,n);
	
	var o = math.complex(19.785,30.7107);
	var p = math.complex(-18.48,-5.79815);
	var q = math.multiply(p,t);
	var r = math.pow(math.e,q);
	
	var s = math.complex(-0.413385,-0.910556);
	var u = math.complex(0,11.5963);
	var v = math.multiply(u,t);
	var w = math.pow(math.e,v);
	var z = math.add(s,w);
	
	var scndcomp1 = math.multiply(o,r,z);
	
	var y1 = math.add(frstcomp1,scndcomp1);
	
	yip[t] = (y1.re);

dataIPPoints.push({x:(t), y:(yip[t])});
}


document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "block"; 
document.getElementById('chartContainer2').style.display  = "block"; 
	
	var chart = new CanvasJS.Chart("chartContainer",
    {
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Cart Position Response (m vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
		//maximum:1,
      },
    axisY: [
	      {/////output Y axis
            title: "Position(m)",
			
			maximum:40,
        },
		/*{/////input y axis invisible
			gridThickness: 0,
    tickLength: 0,
    lineThickness: 0,
    labelFormatter: function(){
      return " ";}
	  
		}*/
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       /*{        
        type: "spline",
		color:"#F9CC1D",
        dataPoints:dataIPPoints
	
       },*/
      ]	
	});

	
	var chart2 = new CanvasJS.Chart("chartContainer2",
    {
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Angle (rad vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Angle(rad)",
			
			maximum:100,
        },
		/*{/////input y axis invisible
			gridThickness: 0,
    tickLength: 0,
    lineThickness: 0,
    labelFormatter: function(){
      return " ";}
	  
		}*/
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataIPPoints
	
       },
       /*{        
        type: "spline",
		color:"#F9CC1D",
        dataPoints:dataIPPoints
	
       },*/
      ]	
	});
	
	
	chart.render();
	chart2.render();
	document.getElementById("result").style.display = "block";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	


}





function simu1(){		
		
		if(document.getElementById('ponoff').src.match('./images/pon.png') && document.getElementById('con').src.match('./images/c_on.png')){
			
		document.getElementById('r1').src ="./images/pause.png";
		movecart= setInterval(movecart_pend, 30);				
		crane_stab_sine();
		
		var time = document.getElementById('display_duration').value;
		var t2 = parseFloat((10000/50)* time);
		setTimeout( function() { stop_simu1(); },t2);
		}
	else {
		alert('Switch on the Power button and click on the green Start push button');
		}
		
		
		
		
	}


function simu2(){		
		
		if(document.getElementById('ponoff').src.match('./images/pon.png') && document.getElementById('con').src.match('./images/c_on.png')){
			
		document.getElementById('r2').src ="./images/pause.png";
		movecart2= setInterval(movecart_pend2, 100);
		Invpend_PD();
		
		var time = document.getElementById('display_duration2').value;
		var t2 = parseFloat((10000/50)* time);
		setTimeout( function() { stop_simu2(); },t2);
		}
	else {
		alert('Switch on the Power button and click on the green Start push button');
		}	
		
		
		
	}

function rotate_pend(){
	
	if(document.getElementById('controller').src.match('./images/s4.jpg')){
	
	document.getElementById('pend').classList.add("invpendulum");
	
	}
	
}

function swingUp(){
	
	//if(document.getElementById('controller').src.match('./images/s5.jpg')){
	
	document.getElementById('pend').classList.add("swingUp");
	
	//}
	
}


  

 
 
 
 function Refresh(){
	location.reload();
 }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 