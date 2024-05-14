 
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
  
  function showpic1(){
	document.getElementById('controller').src = "images/s3.jpg";  
	document.getElementById('b1').style.display = "block";
	document.getElementById('c1').style.display = "block";
	//document.getElementById('r1').style.display = "block";
	document.getElementById('sine').style.display = "block";
	document.getElementById('display_duration').style.display = "block";
	
	document.getElementById('b2').style.display = "none";
	document.getElementById('c2').style.display = "none";
	document.getElementById('r2').style.display = "none";
	document.getElementById('display_duration2').style.display = "none";
	  
  }
  
  function showpic2(){
	document.getElementById('controller').src = "images/s4.jpg";  
	document.getElementById('b2').style.display = "block";
	document.getElementById('c2').style.display = "block";
	//document.getElementById('r2').style.display = "block";
	document.getElementById('display_duration2').style.display = "block";
	
	document.getElementById('b1').style.display = "none";
	document.getElementById('c1').style.display = "none";
	document.getElementById('r1').style.display = "none";
	document.getElementById('sine').style.display = "none";
	document.getElementById('display_duration').style.display = "none";
	  
	  
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
	document.getElementById('controller').src = './images/s3.jpg';
	//document.getElementById('cbtn1').style.display = "block"; 	  
	//document.getElementById('cbtn2').style.display = "none";
	document.getElementById('sine').style.display = "block";
	
	document.getElementById('b1').style.display="block";
	document.getElementById('c1').style.display="block";
	document.getElementById('r1').style.display="block";
	document.getElementById('display_duration').style.display="block";
	
	
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
	var left1 = 0;//math.round(0.2); /*initial position */
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
	clearInterval(movecart);
   movecart= setInterval(movecart_pend, 30); 
  // movepend= setInterval(move_pend, 30);    
    //clearInterval(1000); 
	document.getElementById('pend').classList.add("movependulum");
	document.getElementById('stp').disabled = false; 
	document.getElementById('strt').disabled = true; 
}
      
	  
      function movecart_pend(){
		var ampl = Number(document.getElementById('amp').value);
		var unit_meter = math.divide(16.2,0.3);
		var pos = math.round(math.multiply(ampl,unit_meter));
		
		var unit_meterrev = math.divide(-16.8,0.3);
		var npos = math.round(math.multiply(ampl,unit_meterrev));
		
		//console.log(pos);
		//console.log(npos);
		
		if(goRight1) {
			temp1++;
			
			if(temp1 == math.number(pos) ) { /* move right*/
				goRight1 = false;
				goLeft1 = true;
			}
		} else if(goLeft1) {
			temp1--;
			
			if(temp1 == math.number(npos)) { /* move left */
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
		document.getElementById('strt').disabled = false;
		document.getElementById('stp').disabled = true; 
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
	
	var i = math.sqrt(-1);
	var yip = new Array();
    var yop = new Array();	
	var dataIPPoints=[];
	var dataOPPoints=[];
	
	var omega = math.multiply(2,math.pi,freq);
	var omega2 = math.pow(omega,2);
	
	///pendulum parameters
	///C1,P1 for crane stabilization
	var pconst = 43.3;///document.getElementById('kp').value;///kp1///AG sir's paper value
	var iconst = 33.796;///document.getElementById('ki').value;///ki1 ''
	var dconst = 2.254;///document.getElementById('kd').value;///kd1  ''
	
	///C2,P2 for pendulum stabilization
	var pconst2 = 120.9;///document.getElementById('kp').value;///kp2///AG sir's paper value
	var iconst2 = 247.43;///document.getElementById('ki').value;///ki2 ''
	var dconst2 = 10;///document.getElementById('kd').value;///kd2  ''
	
	///crane position
	var k = math.multiply(5.841,iconst);
	var sconst = math.multiply(5.841,pconst);
	var sqrconst = math.multiply(5.841,dconst);
	
	///crane angle (theta =Pi)
	var k2 = math.multiply(3.957,iconst2);
	var sconst2 = math.subtract(math.multiply(3.957,pconst2),6.807);
	var sqrconst2 = math.multiply(3.957,dconst2);
	
	///crane Position
	var roots = math.polynomialRoot(k,sconst,sqrconst,1);
	var pol1 = roots[0];
	var pol2 = roots[1];
	var pol3 = roots[2];
	
	///crane angle
	var roots2 = math.polynomialRoot(k2,sconst2,sqrconst2,1);
	var pol12 = roots2[0];
	var pol22 = roots2[1];
	var pol32 = roots2[2];
	
	///crane Position
	var rhs_sine = math.multiply(Amp,omega,5.841,math.add(math.multiply(dconst,math.pow(math.multiply(i,omega),2)),math.multiply(pconst,math.multiply(i,omega)),iconst));
	var rhs_pol1 = math.multiply(Amp,omega,5.841,math.add(math.multiply(dconst,math.pow(pol1,2)),math.multiply(pconst,pol1),iconst));
	var rhs_pol2 = math.multiply(Amp,omega,5.841,math.add(math.multiply(dconst,math.pow(pol2,2)),math.multiply(pconst,pol2),iconst));
	var rhs_pol3 = math.multiply(Amp,omega,5.841,math.add(math.multiply(dconst,math.pow(pol3,2)),math.multiply(pconst,pol3),iconst));
	
	///crane angle
	var rhs_theta = math.multiply(math.pi,3.957,iconst2);
	var rhs_pol12 = math.multiply(math.pi,3.957,math.add(math.multiply(dconst2,math.pow(pol12,2)),math.multiply(pconst2,pol12),iconst2));
	var rhs_pol22 = math.multiply(math.pi,3.957,math.add(math.multiply(dconst2,math.pow(pol22,2)),math.multiply(pconst2,pol22),iconst2));
	var rhs_pol32 = math.multiply(math.pi,3.957,math.add(math.multiply(dconst2,math.pow(pol32,2)),math.multiply(pconst2,pol32),iconst2));
	
	///crane Position
	var coeff1 = math.divide(rhs_sine,math.multiply(math.subtract(math.multiply(i,omega),pol1),math.subtract(math.multiply(i,omega),pol2),math.subtract(math.multiply(i,omega),pol3)));
	var coeff2 = math.divide(rhs_pol1,math.multiply(math.add(math.pow(pol1,2),omega2),math.subtract(pol1,pol2),math.subtract(pol1,pol3)));
	var coeff3 = math.divide(rhs_pol2,math.multiply(math.add(math.pow(pol2,2),omega2),math.subtract(pol2,pol1),math.subtract(pol2,pol3)));
	var coeff4 = math.divide(rhs_pol3,math.multiply(math.add(math.pow(pol3,2),omega2),math.subtract(pol3,pol1),math.subtract(pol3,pol2)));
	
	///crane angle
	var coeff12 = math.divide(rhs_theta,math.multiply(math.subtract(0,pol12),math.subtract(0,pol22),math.subtract(0,pol32)));
	var coeff22 = math.divide(rhs_pol12,math.multiply(pol12,math.subtract(pol12,pol22),math.subtract(pol12,pol32)));
	var coeff32 = math.divide(rhs_pol22,math.multiply(pol22,math.subtract(pol22,pol12),math.subtract(pol22,pol32)));
	var coeff42 = math.divide(rhs_pol32,math.multiply(pol32,math.subtract(pol32,pol12),math.subtract(pol32,pol22)));
	
	
	for( var t=0; t<=duration;t+=0.1){	
	
	///crane Position
	var part1 = math.multiply(math.divide(coeff1,omega),math.sin(math.multiply(omega,t)));
	var part2 = math.multiply(coeff2,math.pow(math.e,math.multiply(pol1,t)));
	var part3 = math.multiply(coeff3,math.pow(math.e,math.multiply(pol2,t)));
	var part4 = math.multiply(coeff4,math.pow(math.e,math.multiply(pol3,t)));
	
	///crane angle
	var part12 = coeff12;
	var part22 = math.multiply(coeff22,math.pow(math.e,math.multiply(pol12,t)));
	var part32 = math.multiply(coeff32,math.pow(math.e,math.multiply(pol22,t)));
	var part42 = math.multiply(coeff42,math.pow(math.e,math.multiply(pol32,t)));
	
	
	//y[t]= math.multiply(sinv , math.sin(math.multiply(2,math.pi, sinf ,t)));//assuming sine amp of 0.5v .Input plot
	
	yop[t] = (math.add(part1,part2,part3,part4)).re;///crane Position
	 
	yip[t] = (math.add(part12,part22,part32,part42)).re;///3.141592;///crane angle
	//console.log("cart position="+ yop[t]);
	
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
        title: "Time (sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Position (m)",
			
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
		color:"black",
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
        title: "Time (sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Angle (rad)",
			
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
		color:"black",
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
	//chart.exportChart({format: "jpg"})	
	window.print();
});
}

function Invpend_PD(){
	
	
	// var Amp = 0.3;//document.getElementById('amp').value;
	var duration = document.getElementById('display_duration2').value;
	//var freq = 0.1;//document.getElementById('frq').value;
	 
	var i = math.sqrt(-1);
	var yip = new Array();
    var yop = new Array();	
	var dataIPPoints=[];
	var dataOPPoints=[];
	
	/* var omega = math.multiply(2,math.pi,freq);
	var omega2 = math.pow(omega,2); */
	
	///pendulum parameters
	///C1,P1 for crane stabilization
	var pconst = 43.3;///document.getElementById('kp').value;///kp1///AG sir's paper value
	var iconst = 33.796;///document.getElementById('ki').value;///ki1 ''
	var dconst = 2.254;///document.getElementById('kd').value;///kd1  ''
	
	///C2,P2 for pendulum stabilization
	var pconst2 = 120.9;///document.getElementById('kp').value;///kp2///AG sir's paper value
	var iconst2 = 247.43;///document.getElementById('ki').value;///ki2 ''
	var dconst2 = 10;///document.getElementById('kd').value;///kd2  ''
	
	///crane position
	var k = math.multiply(5.841,iconst);
	var sconst = math.multiply(5.841,pconst);
	var sqrconst = math.multiply(5.841,dconst);
	
	///crane angle (theta =Pi)
	var k2 = math.multiply(3.957,iconst2);
	var sconst2 = math.subtract(math.multiply(3.957,pconst2),6.807);
	var sqrconst2 = math.multiply(3.957,dconst2);
	
	///crane Position
	var roots = math.polynomialRoot(k,sconst,sqrconst,1);
	var pol1 = roots[0];
	var pol2 = roots[1];
	var pol3 = roots[2];
	
	///crane angle
	var roots2 = math.polynomialRoot(k2,sconst2,sqrconst2,1);
	var pol12 = roots2[0];
	var pol22 = roots2[1];
	var pol32 = roots2[2];
	
	///crane Position
	//var rhs_sine = math.multiply(Amp,omega,5.841,math.add(math.multiply(dconst,math.pow(math.multiply(i,omega),2)),math.multiply(pconst,math.multiply(i,omega)),iconst));
	var rhs_pol1 = math.multiply(5.841,math.add(math.multiply(dconst,math.pow(pol1,2)),math.multiply(pconst,pol1),iconst));
	var rhs_pol2 = math.multiply(5.841,math.add(math.multiply(dconst,math.pow(pol2,2)),math.multiply(pconst,pol2),iconst));
	var rhs_pol3 = math.multiply(5.841,math.add(math.multiply(dconst,math.pow(pol3,2)),math.multiply(pconst,pol3),iconst));
	
	///crane angle
	//var rhs_theta = math.multiply(0.001,3.957,iconst2);
	var rhs_pol12 = math.multiply(3.957,math.add(math.multiply(dconst2,math.pow(pol12,2)),math.multiply(pconst2,pol12),iconst2));
	var rhs_pol22 = math.multiply(3.957,math.add(math.multiply(dconst2,math.pow(pol22,2)),math.multiply(pconst2,pol22),iconst2));
	var rhs_pol32 = math.multiply(3.957,math.add(math.multiply(dconst2,math.pow(pol32,2)),math.multiply(pconst2,pol32),iconst2));
	
	///crane Position
	//var coeff1 = math.divide(rhs_sine,math.multiply(math.subtract(math.multiply(i,omega),pol1),math.subtract(math.multiply(i,omega),pol2),math.subtract(math.multiply(i,omega),pol3)));
	var coeff2 = math.divide(rhs_pol1,math.multiply(math.subtract(pol1,pol2),math.subtract(pol1,pol3)));
	var coeff3 = math.divide(rhs_pol2,math.multiply(math.subtract(pol2,pol1),math.subtract(pol2,pol3)));
	var coeff4 = math.divide(rhs_pol3,math.multiply(math.subtract(pol3,pol1),math.subtract(pol3,pol2)));
	
	///crane angle
	//var coeff12 = math.divide(rhs_theta,math.multiply(math.subtract(0,pol12),math.subtract(0,pol22),math.subtract(0,pol32)));
	var coeff22 = math.divide(rhs_pol12,math.multiply(pol12,math.subtract(pol12,pol22),math.subtract(pol12,pol32)));
	var coeff32 = math.divide(rhs_pol22,math.multiply(pol22,math.subtract(pol22,pol12),math.subtract(pol22,pol32)));
	var coeff42 = math.divide(rhs_pol32,math.multiply(pol32,math.subtract(pol32,pol12),math.subtract(pol32,pol22)));
	
	
	for( var t=0; t<=duration;t+=0.1){	
	
	///crane Position
	//var part1 = math.multiply(math.divide(coeff1,omega),math.sin(math.multiply(omega,t)));
	var part2 = math.multiply(coeff2,math.pow(math.e,math.multiply(pol1,t)));
	var part3 = math.multiply(coeff3,math.pow(math.e,math.multiply(pol2,t)));
	var part4 = math.multiply(coeff4,math.pow(math.e,math.multiply(pol3,t)));
	
	///crane angle
	//var part12 = coeff12;
	var part22 = math.multiply(coeff22,math.pow(math.e,math.multiply(pol12,t)));
	var part32 = math.multiply(coeff32,math.pow(math.e,math.multiply(pol22,t)));
	var part42 = math.multiply(coeff42,math.pow(math.e,math.multiply(pol32,t)));
	
	
	//y[t]= math.multiply(sinv , math.sin(math.multiply(2,math.pi, sinf ,t)));//assuming sine amp of 0.5v .Input plot
	
	yop[t] = (math.add(part2,part3,part4)).re;///crane Position
	 
	yip[t] = (math.add(part22,part32,part42)).re;///0.001 approx;///crane angle
	//console.log("cart position="+ yop[t]);
	
	dataIPPoints.push({x:(t), y:(yip[t])});///pendulum angle approx 0.001
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
        title: "Time (sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Position (m)",
			
			//maximum:1,
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
		color:"black",
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
        title: "Time (sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Angle (rad)",
			
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
		color:"black",
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
	//chart.exportChart({format: "jpg"})	
	window.print();
});
}





function simu1(){		
		
		if(document.getElementById('ponoff').src.match('./images/pon.png') && document.getElementById('con').src.match('./images/c_on.png')){
		
		var frequency = document.getElementById('frq').value;
		var timep = math.divide(1,frequency);
		var timer = Number(math.add(20,timep));
		console.log(timer);
		
		document.getElementById('r1').src ="./images/pause.png";
		movecart= setInterval(movecart_pend, timer);				
		crane_stab_sine();
		
		var time = document.getElementById('display_duration').value;
		var t2 = parseFloat((10000/50)* time);
		
		document.getElementById('strt').disable = true;
		document.getElementById('stp').disable = true;
		
		setTimeout( function() { 
		
		stop_simu1(); },t2);
		document.getElementById('strt').disable = false;
		document.getElementById('stp').disable = false;
		
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
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 