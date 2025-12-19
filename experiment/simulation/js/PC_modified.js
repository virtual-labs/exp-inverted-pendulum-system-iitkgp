 
   /* This HTML page and script files are developed by
    Piyali Chattopadhyay
    Project Scientist-Technical,
    Virtual Labs IIT Kharagpur.*/      

	

  
  
  
  function set_controller(){
	 
if(document.getElementById('ckp1').value!=0){	 
	document.getElementById('Control_Params').style.display='block';
}
else{
	alert('Follow the instructions carefully. Click on Submit button under Controller Analysation block to calculate the controller values.');
}
	  
  }
   
  
  
  function close_trajectory(){
	  
	document.getElementById('Control_Params').style.display='none';
	
  }
  
  ///power supply on-off switch
  function swonoff(){
	if(document.getElementById('sw').src.match('./images/switch_off.png')){
		
		document.getElementById('sw').src = './images/switch_on.png';
		//document.getElementById('b2').style['pointer-events'] = "auto";
	}

	else if(document.getElementById('sw').src.match('./images/switch_on.png')){	
		
		document.getElementById('sw').src = './images/switch_off.png';	
		//document.getElementById('b2').style['pointer-events'] = "none";
	}
	  
  }
  
  
  function ponoff(){
	if(document.getElementById('ponoff').src.match('./images/poff.png')&& document.getElementById('c2').style.display == "block" && document.getElementById('r2').style.display == "block"){
		
		document.getElementById('ponoff').src = './images/pon.png';		
	}

	else if(document.getElementById('ponoff').src.match('./images/pon.png')){	
		
		document.getElementById('ponoff').src = './images/poff.png';
		document.getElementById('con').src = './images/cgoff.png';		
	}
	
	else if(document.getElementById('ponoff').src.match('./images/poff.png')&& document.getElementById('c2').style.display != "block"){
		alert('Follow the instructions. First build the model by clicking on Incremental Build icon and wait till the simulation model gets built.');
	}
	else if(document.getElementById('ponoff').src.match('./images/poff.png')&& document.getElementById('r2').style.display != "block"){
		alert('Follow the instructions. Click on Connect to Target icon and wait till the Run button gets enabled.');
	}
	  
  }
  
  function pgon(){
	if(document.getElementById('con').src.match('./images/cgoff.png')&& document.getElementById('ponoff').src.match('./images/pon.png')){
		
		document.getElementById('con').src = './images/c_on.png';		
	}
	else if (document.getElementById('con').src.match('./images/cgoff.png')&& document.getElementById('ponoff').src.match('./images/poff.png')){
		alert('Follow the instructions. Switch on the green Power button to start the controller.');
	}
  
  }
  
  function pgoff(){
	if(document.getElementById('con').src.match('./images/c_on.png')){	
		
		document.getElementById('con').src = './images/cgoff.png';

		
		if(document.getElementById('pend').classList.contains("invpendulum")){
			
		document.getElementById('pend').classList.add("invpendfall");
/* document.getElementById('pend').style.transform='rotate(360deg)';			 
			document.getElementById('pend').classList.remove("invpendfall");
			document.getElementById('pend').classList.remove("invpendulum");
			document.getElementById('pend').style.left=47.7+'%';		 */
			Thanim.push(360);
			Posanim.push(0);
			document.getElementById('pend').style.left=47.7+'%';
		}
	}
	else{
		alert('The controller has not been started.');
	}
	  
  }
  ///FOR CALCULATION OF CONTROLLER PARAMETERS BASED ON USER PROVIDED KD2
  function calc(){
	  
	var kd2 = $('#ckd2').val();
	
	if(kd2>0){
	var kd1 = math.divide(math.add(26.4,math.multiply(3.863,kd2)),-5.703).toFixed(3);
	var ki1 = math.divide(1343.7,37.901).toFixed(3);
	var kp1 = math.divide(1721.8,37.901).toFixed(3);
	var ki2 = math.divide(math.add(871.3,math.multiply(-37.901,kd1),math.multiply(5.703,ki1)),-3.863).toFixed(3);
	var kp2 = math.divide(math.add(225.5,math.multiply(5.703,kp1)),-3.863).toFixed(3); 
	
	$('#ckd1').val(kd1);
	$('#cki1').val(ki1);
	$('#ckp1').val(kp1);
	$('#cki2').val(ki2);
	$('#ckp2').val(kp2);
	}
else {
	
	//alert('The gain value kd2 must be a positive integer number not any negative value or zero.');
	document.getElementById('alrtDiv1').style.display = "block";
	
}	
  }
  
  function Realrt1(){
	document.getElementById('alrtDiv1').style.display = "none";  
  }
  
  function Realrt2(){
	document.getElementById('alrtDiv2').style.display = "none";  
  }
  
  ///FINAL NON LINEAR MODEL OF THE INVERTED PENDULUM SIMULATION DEVELOPED BY  PIYALI CHATTERJEE (CODE). CONTROLLER BY SURAJ KUMAR (M.TECH)
  
  var chart1,chart2,chart3;///global variable charts
  var ArPos=[],ArTheta=[],ArU=[];///Arrays to store data
  var inp=0,inth=0,inu=0;///counters
  var Dcounter=0;///counters for all store data
  var Thanim = [];///for animation store thetas
  var Posanim = [];///for animation store positions
  var Arr_ETheta = [];
  
  var anglstore=[],kp1store=[],ki1store=[],kd1store=[],kp2store=[],ki2store=[],kd2store=[];///Initial angle and kp, ki, kd values storing for designing tooltip content in multiple plot.
  var Ise=0;///ISE calculation global variable
  
   function Nonlin_Model_TwoLoopPID(){
    
	var degValue = parseFloat($('#theta0').val());//math.multiply(math.divide(180,math.pi),theta0);
	//document.getElementById('thetad').value = degValue;
	var theta0 = math.multiply(math.divide(math.pi,180),degValue);
	console.log(theta0);

    const M = 2.4, m = 0.23, L = 0.4, b = 0.055, d = 0.005, g = 9.81, I = 0.099;
    const dt = 0.01;
	var totalTime = $('#display_duration2').val();

    // PID gains of suraj, calculated from research and controller design by LQR PID. In theory these values have been kept. These are the actual values of Two loop PID
    //const Kp_theta = -125.4, Ki_theta = -389.66, Kd_theta = 10;
    //const Kp_pos = 45.43, Ki_pos = 35.45, Kd_pos = -11.402;
	
	var Kp_pos = $('#kp1').val();
	var Kp_theta = $('#kp2').val();
	var Ki_pos = $('#ki1').val();
	var Ki_theta = $('#ki2').val();
	var Kd_pos = $('#kd1').val();
	var Kd_theta = $('#kd2').val();
	
	///store values in arrays
	anglstore.push(degValue);///initial angle value
	kp1store.push(Kp_pos);///kp1 value
	kp2store.push(Kp_theta);///kp2 value
	ki1store.push(Ki_pos);///ki1 value
	ki2store.push(Ki_theta);///ki2 value
	kd1store.push(Kd_pos);///kd1 value
	kd2store.push(Kd_theta);///kd2 value
	
	var angl = anglstore.at(Dcounter);
	var kp1v = kp1store.at(Dcounter);
	var kp2v = kp2store.at(Dcounter);
	var ki1v = ki1store.at(Dcounter);
	var ki2v = ki2store.at(Dcounter);
	var kd1v = kd1store.at(Dcounter);
	var kd2v = kd2store.at(Dcounter);	

    let x = 0, x_dot = 0;
    let theta = theta0, theta_dot = 0;
    let e_theta_sum = 0, e_pos_sum = 0;
    let e_theta_prev = 0, e_pos_prev = 0;

    const xData = [], thetaData = [], uData = [];
	let F = 0;
// Push initial state
xData.push({ x: 0, y: x });
thetaData.push({ x: 0, y: degValue });
uData.push({ x: 0, y: 0 });

    for (let t = dt; t <= totalTime; t += dt) {
      const e_theta = 0 - theta;
      const e_pos = 0 - x;

      e_theta_sum += e_theta * dt;
      e_pos_sum += e_pos * dt;

      const de_theta = (e_theta - e_theta_prev) / dt;
      const de_pos = (e_pos - e_pos_prev) / dt;	  

      const u_theta = Kp_theta * e_theta + Ki_theta * e_theta_sum + Kd_theta * de_theta;
      const u_pos = -(Kp_pos * e_pos + Ki_pos * e_pos_sum + Kd_pos * de_pos);

       F = (u_theta + u_pos)*15;

      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      const theta_dot_sq = theta_dot * theta_dot;
	  const temp1 = math.add(I,math.multiply(m,L,L));
        const temp2 = math.multiply(m,L,cosTheta);

      const den = math.subtract(math.multiply(temp1,math.add(m , M)),math.multiply(temp2,temp2));

        const theta_num = math.add(math.multiply((-temp2),math.add(F,math.add(math.multiply(-b,x_dot), math.multiply(m, L, theta_dot, theta_dot, sinTheta)))), math.multiply(math.add(m , M), math.subtract(math.multiply(m, g,L,sinTheta), math.multiply(dt, theta_dot))));
        const theta_ddot = math.divide(theta_num,den);

        const x_num = math.subtract(math.multiply(temp1, math.add(F,math.add(math.multiply(-b,x_dot), math.multiply(m, L, theta_dot, theta_dot, sinTheta)))), math.multiply(temp2, math.subtract(math.multiply(m, g, L,sinTheta), math.multiply(dt, theta_dot))));
        const x_ddot = math.divide(x_num, den);
		
		var control_Voltage = math.multiply(math.divide(2.5,20),math.divide(F,15));///as per manual 20 N = + 2.5 V

      x_dot += x_ddot * dt;
      x += (x_dot * dt );
      theta_dot += theta_ddot * dt;
      theta += (theta_dot * dt);
	  
	  var thetaDeg = math.multiply(math.divide(180,math.pi),theta);

      e_theta_prev = e_theta;
      e_pos_prev = e_pos;
	  
	  // Accumulate ISE: e(t)^2 * dt
    Ise += e_theta * e_theta * dt;
	if(!isNaN(Ise)){
	Ise=Ise;	
	}
	else if(isNaN(Ise)){
		Ise = "Infinity";
	}
	
	  
	  //if(theta0>0.32 || theta0<-0.32){
	  if(Number.isFinite(thetaDeg) || Number.isFinite(x)){
	  //totalTime=1;
	  x=x;//math.abs(x);
	  thetaDeg=thetaDeg;//math.abs(thetaDeg);
	  control_Voltage = control_Voltage;
	  //xint = 0.02;
	  //yint1 = 1;
	  //yint2=10;
	  }
	  if(!Number.isFinite(thetaDeg) || !Number.isFinite(x) || !Number.isFinite(control_Voltage)){
	  thetaDeg = null;
	  x = null;	
	control_Voltage = null;
	}
	  //}
	  //else{
	  //x=x;
	  //thetaDeg=thetaDeg;
	  //xint=null;
	  //yint=null;
	  //}
	 /*  Arr_ETheta.push(e_theta);
	  
	  if(Number.isFinite(e_theta)){
		Ise += e_theta * e_theta * dt;  
	  }
	  if(!Number.isFinite(e_theta)){
		var lastFiniteValue = Arr_ETheta.findLast(element => Number.isFinite(element));  
		Ise += Number(lastFiniteValue * lastFiniteValue * dt);  
	  } */

      /* xData.push({ x: t, y: x });
      thetaData.push({ x: t, y: thetaDeg });
      uData.push({ x: t, y: control_Voltage });
	  
	  ArPos["array"+inp]=xData;
	  ArTheta["array"+inth]=thetaData;
	  ArU["array"+inu]=uData;
	  ArPos.push("array"+inp);
	  ArTheta.push("array"+inth);
	  ArU.push("array"+inu); */
	  
	  if(thetaDeg!=null && degValue<=6){
		  if(x<0.5 && x>-0.5){
	  var pend_angl = math.subtract(-180,thetaDeg);
	  Thanim.push(pend_angl);
	  
	  var pend_pos = math.multiply(math.divide(29,0.5),x);//math.multiply(math.divide(6.2,0.3),x);it was 6.2 before but it was noticed that for 0.1 rad or approx 6 deg initial theta the realtime plant only goes up to +0.5 m in track hence the factor to show the virtual animation has been designed like this .
		  Posanim.push(pend_pos);
		  }
		  if(x>=0.5){
			   var pend_pos = math.multiply(math.divide(29,0.5),0.5);//math.multiply(math.divide(6.2,0.3),x);it was 6.2 before but it was noticed that for 0.1 rad or approx 6 deg initial theta the realtime plant only goes up to +0.5 m in track hence the factor to show the virtual animation has been designed like this .
		  //Posanim.push(pend_pos);
		  Posanim.push(pend_pos);
		  x=0.5;
			  Kp_pos =0;
	  Ki_pos =0;
	  Kd_pos =0;
	  Kp_theta=0;
	  Ki_theta=0;
	  Kd_theta=0;
	  var pend_angl = math.subtract(-180,thetaDeg);	  
	  Thanim.push(pend_angl);
	  x=0.5;
	  //Thanim.push(360);
	  //document.getElementById('pend').classList.add('invpendfall');
	  //document.getElementById('pend').style.left=47.7+'%';
	  
	 
		 
		  }	
	if(x<=-0.5){
		var pend_pos = math.multiply(math.divide(29,0.5),-0.5);//math.multiply(math.divide(6.2,0.3),x);it was 6.2 before but it was noticed that for 0.1 rad or approx 6 deg initial theta the realtime plant only goes up to +0.5 m in track hence the factor to show the virtual animation has been designed like this .
		  //Posanim.push(pend_pos);
		  Posanim.push(pend_pos);
		  x=-0.5;
		Kp_pos =0;
	  Ki_pos =0;
	  Kd_pos =0;
	  Kp_theta=0;
	  Ki_theta=0;
	  Kd_theta=0;
	  var pend_angl = math.subtract(-180,thetaDeg);
	  Thanim.push(pend_angl);
	  x=-0.5;
	  }			  
	  }
	  
	  if(degValue>6 || degValue<-6){///as with an initial condition >6 deg the pendulum falles in real time plant
		
		  x=null;	    
		thetaDeg = null; 
control_Voltage = null;		
	  }
	  
	  
	  
	  
	  xData.push({ x: t, y: x });
      thetaData.push({ x: t, y: thetaDeg });
      uData.push({ x: t, y: control_Voltage });
	  
	  ArPos["array"+inp]=xData;
	  ArTheta["array"+inth]=thetaData;
	  ArU["array"+inu]=uData;
	  ArPos.push("array"+inp);
	  ArTheta.push("array"+inth);
	  ArU.push("array"+inu);
	  
	  //console.log('Position =' + x);
	  //console.log('Angle =' + thetaDeg);
	  AngleValue=thetaDeg;
    }
	
	
	LastElem = AngleValue;
	inp++;
	inth++;
	inu++;	
	
	document.getElementById('plotbucket').style.display  = "block"; 
	document.getElementById('chartContainer').style.display  = "block"; 
	document.getElementById('chartContainer2').style.display  = "block";
	document.getElementById('chartContainer3').style.display  = "block";
	
	var animD = math.multiply(totalTime,1000);
	
      chart1 = new CanvasJS.Chart("chartContainer", {
	animationEnabled:true,
	animationDuration:animD,
	zoomEnabled: true,
      title: { text: "Position" },
      axisY: [{ title: "Position (m)"}],
      axisX: { title: "Time (seconds)"},
      data: [{ type: "spline", 
	  toolTipContent:
	  "Initial Angle ="+ "" + angl+"<br/>"+
	  "kp1 = " + kp1v +"<br/>"+
      "ki1 = " + ki1v +"<br/>"+
      "kd1 = " + kd1v +"<br/>"+
      "kp2 = " + kp2v +"<br/>"+
      "ki2 = " + ki2v +"<br/>"+
      "kd2 = " + kd2v +"<br/>"+
	  "<b>Time:</b> {x}" +"<br/>"+
  "<b>Position:</b> {y}",color: "red", name: "Position Vs. Time", dataPoints: xData }]
    });
    chart1.render();

      chart2 = new CanvasJS.Chart("chartContainer2", {
	animationEnabled:true,
	animationDuration:animD,
	zoomEnabled: true,
      title: { text: "Angle" },
      axisY: [{ title: "Angle (degree)"}],
      axisX: { title: "Time (seconds)"},
      data: [{ type: "spline",
	  toolTipContent:
	  "Initial Angle ="+ "" + angl+"<br/>"+
	  "kp1 = " + kp1v +"<br/>"+
      "ki1 = " + ki1v +"<br/>"+
      "kd1 = " + kd1v +"<br/>"+
      "kp2 = " + kp2v +"<br/>"+
      "ki2 = " + ki2v +"<br/>"+
      "kd2 = " + kd2v +"<br/>"+
	  "<b>Time:</b> {x}" +"<br/>"+
  "<b>Angle:</b> {y}", color: "blue", name: "Angle Vs. Time", dataPoints: thetaData }]
    });
    chart2.render();

     chart3 = new CanvasJS.Chart("chartContainer3", {
	animationEnabled:true,
	animationDuration:animD,
	zoomEnabled: true,
      title: { text: "Control Voltage" },
      axisY: [{ title: "Voltage (V)"}],
      axisX: { title: "Time (seconds)"},
      data: [{ type: "spline",
	  toolTipContent:
	  "Initial Angle ="+ "" + angl+"<br/>"+
	  "kp1 = " + kp1v +"<br/>"+
      "ki1 = " + ki1v +"<br/>"+
      "kd1 = " + kd1v +"<br/>"+
      "kp2 = " + kp2v +"<br/>"+
      "ki2 = " + ki2v +"<br/>"+
      "kd2 = " + kd2v +"<br/>"+
	  "<b>Time:</b> {x}" +"<br/>"+
  "<b>Control voltage:</b> {y}", color: "green", name: "Control Voltage Vs. Time", dataPoints: uData }]
    });
    chart3.render();
	document.getElementById('result').style.display  = "block"; 
	document.getElementById('exportChart').style.display  = "block"; 
	Dcounter++;
	}
	
	
	///Dynamic Graph
 var incrfr1=0,incrfr2=0,datasetpos=[],datasettheta=[],datasetu=[];
 var usedColors = [];
 
 ///this fn is called when eachtime changing the initial angle you get directly compared plots.
 /* function Multiple_Response_Plot(){
	 
	 Nonlin_Model_TwoLoopPID();
	 //var sampleP = document.getElementById('Ts').value;
	 //var uniqueColor = getUniqueColor();
	 
	 CanvasJS.addColorSet("positionColorPalette",
                [//colorSet Array for cart position

                "#a2b9bc","#b2ad7f","#878f99","#6b5b95","#feb236","#d64161","#ff7b25","#d6cbd3","#eca1a6","#bdcebe"               
                ]);
				CanvasJS.addColorSet("angleColorPalette",
                [//colorSet Array for pendulum angle

                "#ada397","#feb236","#d64161","#ff7b25","#d6cbd3","#eca1a6","#bdcebe","#e3eaa7","#d5e1df","#b5e7a0"
			
                ]);
				CanvasJS.addColorSet("voltageColorPalette",
                [//colorSet Array for control voltage

                "#86af49","#587e76","#dac292","#c4b7a6","#3e4444","#bc5a45","#80ced6","#50394c","#c83349","#b2ad7f"			
                ]);

	 var totalTime = $('#display_duration2').val();
	 
	 for (var dnum = 0; dnum<=incrfr1; dnum++){
		  
	 datasetpos[dnum] = ArPos["array"+dnum];
	 datasettheta[dnum] = ArTheta["array"+dnum];
	 datasetu[dnum] = ArU["array"+dnum];
	 
	 
		 dtan=dnum+1;
	
	
if(incrfr1>=0 && incrfr2>=0){
		var angl = anglstore.at(dtan);
	var kp1v = kp1store.at(dtan);
	var kp2v = kp2store.at(dtan);
	var ki1v = ki1store.at(dtan);
	var ki2v = ki2store.at(dtan);
	var kd1v = kd1store.at(dtan);
	var kd2v = kd2store.at(dtan); 
	
	
	chart1.addTo("colorSet","positionColorPalette");
	chart1.addTo("axisY", {gridThickness: 0, tickLength:0, lineThickness:0});
	
	
	chart2.addTo("colorSet","angleColorPalette");
	chart2.addTo("axisY", {gridThickness: 0, tickLength:0, lineThickness:0});
	
	
	chart3.addTo("colorSet","voltageColorPalette");
	chart3.addTo("axisY", {gridThickness: 0, tickLength:0, lineThickness:0});
	
	
	chart1.addTo("data", {type: "spline",
	toolTipContent:
	  "Initial Angle ="+ "" + angl+"<br/>"+
	  "kp1 = " + kp1v +"<br/>"+
      "ki1 = " + ki1v +"<br/>"+
      "kd1 = " + kd1v +"<br/>"+
      "kp2 = " + kp2v +"<br/>"+
      "ki2 = " + ki2v +"<br/>"+
      "kd2 = " + kd2v +"<br/>"+
	  "<b>Time:</b> {x}" +"<br/>"+
  "<b>Position:</b> {y}"});
	chart2.addTo("data", {type: "spline",
	toolTipContent:
	  "Initial Angle ="+ "" + angl+"<br/>"+
	  "kp1 = " + kp1v +"<br/>"+
      "ki1 = " + ki1v +"<br/>"+
      "kd1 = " + kd1v +"<br/>"+
      "kp2 = " + kp2v +"<br/>"+
      "ki2 = " + ki2v +"<br/>"+
      "kd2 = " + kd2v +"<br/>"+
	  "<b>Time:</b> {x}" +"<br/>"+
  "<b>Angle:</b> {y}"});
	chart3.addTo("data", {type: "spline",
	toolTipContent:
	  "Initial Angle ="+ "" + angl+"<br/>"+
	  "kp1 = " + kp1v +"<br/>"+
      "ki1 = " + ki1v +"<br/>"+
      "kd1 = " + kd1v +"<br/>"+
      "kp2 = " + kp2v +"<br/>"+
      "ki2 = " + ki2v +"<br/>"+
      "kd2 = " + kd2v +"<br/>"+
	  "<b>Time:</b> {x}" +"<br/>"+
  "<b>Control voltage:</b> {y}"});
	
	}
	
	
	chart1.options.data[dnum].dataPoints = datasetpos[dnum]; 
	chart2.options.data[dnum].dataPoints = datasettheta[dnum]; 
	chart3.options.data[dnum].dataPoints = datasetu[dnum];
	

	
	chart1.render();
	
	chart2.render();
	
	chart3.render();
	
	document.getElementById("exportChart").style.display = "block";
	
	 }
	incrfr1++;
	incrfr2++;
	 
 } */
 
 ///FINAL MULTIPLE PLOT RESPONSE ONLY SHOWS COMPARED PLOTS IF THE BUTTON IS PRESSED
 function Multiple_Response_Plot() {
    var totalTime = $('#display_duration2').val();

    // Initialize color palettes
    CanvasJS.addColorSet("positionColorPalette", ["#a2b9bc", "#b2ad7f", "#878f99", "#6b5b95", "#feb236", "#d64161", "#ff7b25", "#d6cbd3", "#eca1a6", "#bdcebe"]);
    CanvasJS.addColorSet("angleColorPalette", ["#ada397", "#feb236", "#d64161", "#ff7b25", "#d6cbd3", "#eca1a6", "#bdcebe", "#e3eaa7", "#d5e1df", "#b5e7a0"]);
    CanvasJS.addColorSet("voltageColorPalette", ["#86af49", "#587e76", "#dac292", "#c4b7a6", "#3e4444", "#bc5a45", "#80ced6", "#50394c", "#c83349", "#b2ad7f"]);

    // Clear previous chart data arrays
    chart1.options.data = [];
    chart2.options.data = [];
    chart3.options.data = [];

    for (var dnum = 0; dnum <= Dcounter-1; dnum++) {
        datasetpos[dnum] = ArPos["array" + dnum];
        datasettheta[dnum] = ArTheta["array" + dnum];
        datasetu[dnum] = ArU["array" + dnum];

        if (incrfr1 >= 0 && incrfr2 >= 0) {
            var angl = anglstore[dnum];
            var kp1v = kp1store[dnum];
            var kp2v = kp2store[dnum];
            var ki1v = ki1store[dnum];
            var ki2v = ki2store[dnum];
            var kd1v = kd1store[dnum];
            var kd2v = kd2store[dnum];

            // Position Chart
            chart1.options.data.push({
                type: "spline",
                //showInLegend: true,
                //name: "Run " + dnum,
                toolTipContent:
                    "Initial Angle = " + angl + "<br/>" +
                    "kp1 = " + kp1v + ", ki1 = " + ki1v + ", kd1 = " + kd1v + "<br/>" +
                    "kp2 = " + kp2v + ", ki2 = " + ki2v + ", kd2 = " + kd2v + "<br/>" +
                    "<b>Time:</b> {x}, <b>Position:</b> {y}",
                dataPoints: datasetpos[dnum]
            });

            // Angle Chart
            chart2.options.data.push({
                type: "spline",
                //showInLegend: true,
                //name: "Run " + dnum,
                toolTipContent:
                    "Initial Angle = " + angl + "<br/>" +
                    "kp1 = " + kp1v + ", ki1 = " + ki1v + ", kd1 = " + kd1v + "<br/>" +
                    "kp2 = " + kp2v + ", ki2 = " + ki2v + ", kd2 = " + kd2v + "<br/>" +
                    "<b>Time:</b> {x}, <b>Angle:</b> {y}",
                dataPoints: datasettheta[dnum]
            });

            // Control Voltage Chart
            chart3.options.data.push({
                type: "spline",
                //showInLegend: true,
                //name: "Run " + dnum,
                toolTipContent:
                    "Initial Angle = " + angl + "<br/>" +
                    "kp1 = " + kp1v + ", ki1 = " + ki1v + ", kd1 = " + kd1v + "<br/>" +
                    "kp2 = " + kp2v + ", ki2 = " + ki2v + ", kd2 = " + kd2v + "<br/>" +
                    "<b>Time:</b> {x}, <b>Control Voltage:</b> {y}",
                dataPoints: datasetu[dnum]
            });
        }
    }

    chart1.render();
    chart2.render();
    chart3.render();

    document.getElementById("exportChart").style.display = "block";

    incrfr1++;
    incrfr2++;
}

 function gc(){	 
	 var kpp = $('#ckp1').val();
	 var kip = $('#cki1').val();
	 var kdp = $('#ckd1').val();
	 var kpt = $('#ckp2').val();
	 var kit = $('#cki2').val();
	 var kdt = $('#ckd2').val();
	 
	 $('#kp1').val(kpp);
	 $('#ki1').val(kip);
	 $('#kd1').val(kdp);
	 $('#kp2').val(kpt);
	 $('#ki2').val(kit);
	 $('#kd2').val(kdt);	 
	 
 }

	
	
/* function getUniqueColor() {
  const palette = [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
    "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
  ];
  for (let color of palette) {
    if (!usedColors.includes(color)) {
      usedColors.push(color);
      return color;
    }
  }
  // fallback: generate random unique color
  let color;
  do {
    color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  } while (usedColors.includes(color));
  usedColors.push(color);
  return color;
} */
	
	
	///TESTED LINEAR FINAL MODEL. CODED BY PIYALI CHATTERJEE, CONTROLLER DEVELOPED BY SURAJ KUMAR.
	///THE PROBLEM TO IMPLEMENT THIS LINEAR MODEL IS THAT WHATEVER BE THE INITIAL THETA VALUE IT DRAGS FROM THAT THETA TO 0. DOESNOT SHOW ANY UNSTABLE ZONE. HENCE FINALLY WE DECIDED TO IMPLEMENT NON LINEAR MODEL
	///IT IS DIRECTLY COPIED FROM pend6_linFinal_SurajController.html. UNEDITED FOR THIS SIMULATION PAGE.
	/*document.getElementById("initForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const theta0 = parseFloat(document.getElementById("theta0").value);
      simulate(theta0);
    });

    function simulate(thetaInitial) {
      const dt = 0.01;
      const tMax = 10;
      const steps = Math.floor(tMax / dt);
      let time = [], xArr = [], thetaArr = [], uArr = [];

      // PID controller gains
      let kp1 = 45.43, ki1 = 35.45, kd1 = -11.402;
      let kp2 = -125.4, ki2 = -512.04, kd2 = 10;

      // Plant parameters
      const b1 = 5.703;
      const b2 = -3.8625;
      const a2 = 6.654;

      // System states
      let x = 0, x_dot = 0;
      let theta = thetaInitial, theta_dot = 0;

      // Controller memory
      let e1_sum = 0, e2_sum = 0;
      let e1_prev = 0, e2_prev = 0;

      let u = 0; // initialize outside the loop

for (let i = 0; i <= steps; i++) {
  let t = i * dt;

  // Push current state to plot arrays before state update
  xArr.push({ x: t, y: x });
  thetaArr.push({ x: t, y: theta });
  uArr.push({ x: t, y: u });

  // Calculate control error
  let e1 = 0 - x;
  let e2 = 0 - theta;

  e1_sum += e1 * dt;
  e2_sum += e2 * dt;

  let de1 = (e1 - e1_prev) / dt;
  let de2 = (e2 - e2_prev) / dt;

  let u1 = -(kp1 * e1 + ki1 * e1_sum + kd1 * de1);
  let u2 = kp2 * e2 + ki2 * e2_sum + kd2 * de2;

  u = u1 + u2;

  // System dynamics
  let x_ddot = b1 * u;
  let theta_ddot = b2 * u + a2 * theta;

  x_dot += x_ddot * dt;
  x += x_dot * dt;

  theta_dot += theta_ddot * dt;
  theta += theta_dot * dt;

  e1_prev = e1;
  e2_prev = e2;
}

      renderCharts(xArr, thetaArr, uArr);
    }

    function renderCharts(xArr, thetaArr, uArr) {
      new CanvasJS.Chart("chartX", {
        animationEnabled: true,
        title: { text: "Cart Position X(t)" },
        axisX: { title: "Time (s)" },
        axisY: { title: "X (m)" },
        data: [{ type: "spline", dataPoints: xArr }]
      }).render();

      new CanvasJS.Chart("chartTheta", {
        animationEnabled: true,
        title: { text: "Pendulum Angle θ(t)" },
        axisX: { title: "Time (s)" },
        axisY: { title: "θ (rad)" },
        data: [{ type: "spline", dataPoints: thetaArr }]
      }).render();

      new CanvasJS.Chart("chartU", {
        animationEnabled: true,
        title: { text: "Control Effort U(t)" },
        axisX: { title: "Time (s)" },
        axisY: { title: "U (N)" },
        data: [{ type: "spline", dataPoints: uArr }]
      }).render();
    }

    // Run with default θ = 0.1
    simulate(0.1);*/
	

function Build(){
	
	var ckp1_value = $('#ckp1').val();
	var ckp2_value = $('#ckp2').val();
	var cki1_value = $('#cki1').val();
	var cki2_value = $('#cki2').val();
	var ckd1_value = $('#ckd1').val();
	var ckd2_value = $('#ckd2').val();
	
		
			
		 if (document.getElementById('controller').src.match("./images/s4.jpg") && document.getElementById('ckp1').value==0){
			alert('Click on Submit button under Controller Analysation block to calculate the controller values first.');
		} 
		
		else if(document.getElementById('controller').src.match("./images/s4.jpg") && document.getElementById('sw').src.match("./images/switch_on.png") && document.getElementById('kd2').value==ckd2_value && document.getElementById('ckd2').readOnly == false && document.getElementById('display_duration2').readOnly == false && document.getElementById('display_duration2').value>0 && document.getElementById('display_duration2').value<=100){
			
			if(document.getElementById('kp1').value==ckp1_value || document.getElementById('kp2').value==ckp2_value || document.getElementById('ki1').value==cki1_value || document.getElementById('ki2').value==cki2_value || document.getElementById('kd1').value==ckd1_value || document.getElementById('kd2').value==ckd2_value){
		setTimeout(function(){
		document.getElementById('c2').style.display="block";
		alert('Model Built');
		document.getElementById('ckd2').readOnly = true;
		document.getElementById('display_duration2').readOnly = true;
		},2000);
			}
		}
		else if (document.getElementById('controller').src.match("./images/s4.jpg") && document.getElementById('sw').src.match("./images/switch_off.png")){
			alert('Click on the red switch to switch on the Power Supply.');
		}
		
		 else if (document.getElementById('controller').src.match("./images/s4.jpg") && document.getElementById('kd2').value!=ckd2_value){
			alert('Click on Stabilizing controller, then on Get calculated controller values button in Controller block to get the controller values for simulation.');
		} 
		
		else if (document.getElementById('ckd2').readOnly == true && document.getElementById('display_duration2').readOnly == true){
			alert('Click on Clear button');
		}
		else if (document.getElementById('display_duration2').value<=0 || document.getElementById('display_duration2').value>100){
			alert('Keep the Time of Simulation \u2264 100 sec.');
		}
		
	}
	function CT(){		
		setTimeout(function() {         	
		if(document.getElementById('controller').src.match("./images/s4.jpg")){
			alert('Model loaded and ready');
         document.getElementById('r2').style.display  = "block";
			}
           }, 2000);
	}
	
	


function run(){
	if(document.getElementById('ponoff').src.match('./images/pon.png') && document.getElementById('con').src.match('./images/c_on.png')){
			
		document.getElementById('r2').src ="./images/pause.png";
	}
	else{
		alert('Power on the controller and click on green start push button');
	}
}

 function simu2(){		
		
		if(document.getElementById('r2').src.match('./images/pause.png')&& document.getElementById("pend").classList.contains("invpendulum")){
			
			
		
		Nonlin_Model_TwoLoopPID();///FINAL NONLINEAR MODEL
		//Multiple_Response_Plot();
		
		
		var time = document.getElementById('display_duration2').value;
		//var t2 = parseFloat((10000/50)* time);
		var t2 = (time*1000);
		
		//if(math.round(LastElem)<= 0){
			if(LastElem!=null){
			
			startMovement();
			startRotation();
			
			/* if(math.abs(math.round(LastElem))==0){
			alert('Stable zone');
			}
			else{
				alert('Unstable Plant');
			} */
			
		setTimeout( function() {
			//stop_simu2(); 
			 document.getElementById('c2').style.display="none";
			 document.getElementById('r2').src = "./images/run.png";
			 document.getElementById('r2').style.display="none";
			//Thanim.push(360);			
			},t2+10);			
			setTimeout( function() {
				if(document.getElementById('pendset').style.left != "29%" && document.getElementById('pendset').style.left != "-29%"){
			document.getElementById('pend').classList.add("invpendfall");
			document.getElementById('pend').classList.remove("invpendulum");
			document.getElementById('pend').style.left=47.7+'%';
			Thanim.push(360);
				}
				if(document.getElementById('pendset').style.left == "29%" || document.getElementById('pendset').style.left == "-29%"){
				document.getElementById('pend').classList.remove("invpendulum");
			document.getElementById('pend').style.left=47.7+'%';
				Thanim.push(360);
				}
				//document.getElementById('tbtn').disabled  = false;
		},t2+850);
		
		setTimeout( function() {
			document.getElementById('tbtn').disabled  = false;
			document.getElementById('coff').style['pointer-events'] = "auto";
		},t2+1600);
		
		setTimeout( function() {
			if(document.getElementById('pendset').style.left == "29%" || document.getElementById('pendset').style.left == "-29%"){
				document.getElementById('rbtn').disabled = false;
				//alert('For the provided kd2 gain value, the cart-pendulum system moves beyond the track length, hence the balancing of the pendulum fails. Change the kd2 gain value.');
				document.getElementById('alrtDiv2').style.display="block";
				Thanim.push(360);
			}
			},t2+1650);
			 setTimeout( function() {
			if(document.getElementById('pendset').style.left == "29%" || document.getElementById('pendset').style.left == "-29%"){
				Thanim.push(360);
			}
			},t2+1700); 

		//console.log('Thanim='+Thanim);
		//console.log('Posanim='+Posanim);
		 
		}
		
		else if(LastElem == null){
			
			alert('The initial angle is in unstable zone. The pendulum can be balanced for -6\u00B0 \u2264 initial angle \u2264 6\u00B0.');
		
			///setTimeout( function() {
				document.getElementById('pend').classList.add("invpendfall");
				  document.getElementById('c2').style.display="none";
				 document.getElementById('r2').src = "./images/run.png";
				 document.getElementById('r2').style.display="none"; 
			//},1000);
			 setTimeout( function() {
			 document.getElementById('pend').style.transform='rotate(360deg)';			 
			document.getElementById('pend').classList.remove("invpendfall");
			document.getElementById('pend').classList.remove("invpendulum");
			document.getElementById('pend').style.left=47.7+'%';
			document.getElementById('tbtn').disabled  = false;
			},3000); 
			
		
		 
		}
		}
	else if(!document.getElementById('r2').src.match('./images/pause.png')) {
		alert('Click on the Run button first to allow the control action.');
		}
	 else if(!document.getElementById("pend").classList.contains("invpendulum")) {
		alert('Click on the pendulum to make it inverted with the provided initial angle.');
		}	 	
		
	} 
	
	///for data clear
	function clr(){
		Thanim.length=0;
		Posanim.length=0;
		index=0;
		pindex=0;
		Ise=0;
		console.log('Thanim='+Thanim);
		console.log('Posanim='+Posanim);
document.getElementById('pend').classList.remove('invpendfall');
document.getElementById('cbtn').disabled  = true;
 document.getElementById('pend').style.transform='rotate(360deg)';
document.getElementById('ckd2').readOnly = false;
		document.getElementById('display_duration2').readOnly = false; 
	}
	
	function Reset(){
		document.getElementById('pendset').style.left = "0.2%";
document.getElementById('rbtn').disabled  = true;			
	}

function rotate_pend(){
	
	if(document.getElementById('controller').src.match('./images/s4.jpg') && document.getElementById('r2').src.match('./images/pause.png')){
		 const pendulum = document.getElementById('pend');
		const initTheta = parseFloat(document.getElementById('theta0').value);
		const roAngle = math.add(-180,initTheta);

    console.log('Rotation angle:', roAngle);

    // Apply rotation
	pendulum.classList.add('invpendulum');
	pendulum.style.transformOrigin = '50% 20%';		
    pendulum.style.transform = 'rotate(' + roAngle + 'deg)';
	pendulum.style.left=46+'%';
	
	}
	else{
		alert('Activate the controller first by clicking on Run button.');
	}
	
}
///for inverted rotation thetas
var angles = Thanim;
    var index = 0;
function rotateTo(angle) {
      var pendulum = document.getElementById("pend");
      pendulum.style.transform = `rotate(${angle}deg)`;
    }

    function startRotation() {
      index = 0;
      rotateSequence();
	  
    }

    function rotateSequence() {
      if (index < angles.length) {
        rotateTo(angles[index]);
        index++;
        setTimeout(rotateSequence,10); // delay in ms between steps
      }
    }

///for inverted pendulum position
var pospend = Posanim;
    var pindex = 0;
function moveTo(pos) {
      var cart = document.getElementById("pendset");
      cart.style.left = pos+'%';
    }

    function startMovement() {
      pindex = 0;
      posSequence();
	  
    }

    function posSequence() {
      if (pindex < pospend.length) {
        moveTo(pospend[pindex]);
        pindex++;
        setTimeout(posSequence,10); // delay in ms between steps
      }
    }


///////////////////////////////////////////////////////////////////////////////Table Creation//////////////////////////////////////////////////////////////////////////////////////
 
var tabrowindex = 0;
var Tarr = [];
var pivTable;///performance index validation table

//------------------------------------------------- Table Creation -----------------------------------------------//
function Gen_Table() {
	//computeThetaISE();
	document.getElementById('tbtn').disabled  = true;
	
	setTimeout( function() {
			document.getElementById('cbtn').disabled  = false;
			},1000); 
	
	
	document.getElementById("myTable").style.visibility="visible";
	
    Tarr[0] = tabrowindex+1 ;
    Tarr[1] = document.getElementById("theta0").value;
    Tarr[2] = document.getElementById("kd2").value;
	Tarr[3] = document.getElementById("kd1").value;
	Tarr[4] = document.getElementById("ki2").value;
	Tarr[5] = Ise;
   
	
	pivTable = document.getElementById("myTable");
        
    var row = pivTable.insertRow(++tabrowindex);
   
    if (pivTable.rows.length <= 5000) {
        
         // Row increment
        for (var q = 0; q < 6; q++) {

            var cell = row.insertCell(q);
            cell.innerHTML = Tarr[q];

    }

    }

}    



 function Refresh(){
	location.reload();
 }
  
 
 ///code for downloading the plot area
function saveAs(uri, filename) {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);

    } else {

        window.open(uri);

    }
}

function saveImg(){
html2canvas(document.querySelector('#plotbucket')).then(function(canvas) {

        saveAs(canvas.toDataURL(), 'Plot.png');
    }); 
	
	
}
///FIND ROOTS OF 5TH ORDER POLYNOMIAL USING DURAND-KERNER METHOD 
function durandKerner(coefficients, maxIterations = 100, tolerance = 1e-10) {
  const degree = coefficients.length - 1;
  if (degree !== 5) {
    throw new Error("This implementation is only for 5th-order polynomials.");
  }

  // Complex number class
  class Complex {
    constructor(re, im) {
      this.re = re;
      this.im = im;
    }

    add(other) {
      return new Complex(this.re + other.re, this.im + other.im);
    }

    sub(other) {
      return new Complex(this.re - other.re, this.im - other.im);
    }

    mul(other) {
      return new Complex(
        this.re * other.re - this.im * other.im,
        this.re * other.im + this.im * other.re
      );
    }

    div(other) {
      const denom = other.re * other.re + other.im * other.im;
      return new Complex(
        (this.re * other.re + this.im * other.im) / denom,
        (this.im * other.re - this.re * other.im) / denom
      );
    }

    abs() {
      return Math.hypot(this.re, this.im);
    }

    toString() {
      return `${this.re.toFixed(4)} ${this.im >= 0 ? '+' : '-'} ${Math.abs(this.im).toFixed(4)}i`;
    }
  }

  // Evaluate polynomial at a complex point
  function evaluatePoly(coeffs, x) {
    let result = new Complex(0, 0);
    for (let i = 0; i < coeffs.length; i++) {
      let term = new Complex(coeffs[i], 0);
      for (let j = 0; j < coeffs.length - 1 - i; j++) {
        term = term.mul(x);
      }
      result = result.add(term);
    }
    return result;
  }

  // Initial guesses (roots of unity scaled slightly)
  let roots = [];
  const radius = 1;
  for (let i = 0; i < degree; i++) {
    const angle = (2 * Math.PI * i) / degree;
    roots.push(new Complex(
      radius * Math.cos(angle),
      radius * Math.sin(angle)
    ));
  }

  // Durand-Kerner iterations
  for (let iter = 0; iter < maxIterations; iter++) {
    let converged = true;
    for (let i = 0; i < degree; i++) {
      let xi = roots[i];
      let prod = new Complex(1, 0);
      for (let j = 0; j < degree; j++) {
        if (i !== j) {
          prod = prod.mul(xi.sub(roots[j]));
        }
      }
      const fxi = evaluatePoly(coefficients, xi);
      const delta = fxi.div(prod);
      roots[i] = xi.sub(delta);

      if (delta.abs() > tolerance) {
        converged = false;
      }
    }
    if (converged) break;
  }

  return roots;
}


// FIND ROOTS OF 4TH ORDER POLYNOMIAL USING DURAND-KERNER METHOD
function durandKerner4(coefficients, maxIterations = 100, tolerance = 1e-10) {
  const degree = coefficients.length - 1;
  if (degree !== 4) {
    throw new Error("This implementation is only for 4th-order polynomials.");
  }

  // Complex number class
  class Complex {
    constructor(re, im) {
      this.re = re;
      this.im = im;
    }

    add(other) {
      return new Complex(this.re + other.re, this.im + other.im);
    }

    sub(other) {
      return new Complex(this.re - other.re, this.im - other.im);
    }

    mul(other) {
      return new Complex(
        this.re * other.re - this.im * other.im,
        this.re * other.im + this.im * other.re
      );
    }

    div(other) {
      const denom = other.re * other.re + other.im * other.im;
      return new Complex(
        (this.re * other.re + this.im * other.im) / denom,
        (this.im * other.re - this.re * other.im) / denom
      );
    }

    abs() {
      return Math.hypot(this.re, this.im);
    }

    toString() {
      return `${this.re.toFixed(6)} ${this.im >= 0 ? '+' : '-'} ${Math.abs(this.im).toFixed(6)}i`;
    }
  }

  // Evaluate polynomial at a complex point
  function evaluatePoly(coeffs, x) {
    let result = new Complex(0, 0);
    for (let i = 0; i < coeffs.length; i++) {
      let term = new Complex(coeffs[i], 0);
      for (let j = 0; j < coeffs.length - 1 - i; j++) {
        term = term.mul(x);
      }
      result = result.add(term);
    }
    return result;
  }

  // Initial guesses: roots of unity (slightly perturbed)
  let roots = [];
  const radius = 1;
  for (let i = 0; i < degree; i++) {
    const angle = (2 * Math.PI * i) / degree;
    roots.push(new Complex(
      radius * Math.cos(angle),
      radius * Math.sin(angle)
    ));
  }

  // Durand-Kerner Iteration
  for (let iter = 0; iter < maxIterations; iter++) {
    let converged = true;

    for (let i = 0; i < degree; i++) {
      const xi = roots[i];
      let prod = new Complex(1, 0);

      for (let j = 0; j < degree; j++) {
        if (i !== j) {
          prod = prod.mul(xi.sub(roots[j]));
        }
      }

      const fxi = evaluatePoly(coefficients, xi);
      const delta = fxi.div(prod);
      roots[i] = xi.sub(delta);

      if (delta.abs() > tolerance) {
        converged = false;
      }
    }

    if (converged) break;
  }

  return roots;
} 
 
 function findRoots4thOrder(coefficients, maxIterations = 100, tolerance = 1e-10) {
  const degree = coefficients.length - 1;
  if (degree !== 4) {
    throw new Error("This function only supports 4th-order polynomials.");
  }

  // Complex number class
  class Complex {
    constructor(re, im) {
      this.re = re;
      this.im = im;
    }

    add(c) {
      return new Complex(this.re + c.re, this.im + c.im);
    }

    sub(c) {
      return new Complex(this.re - c.re, this.im - c.im);
    }

    mul(c) {
      return new Complex(
        this.re * c.re - this.im * c.im,
        this.re * c.im + this.im * c.re
      );
    }

    div(c) {
      const denom = c.re * c.re + c.im * c.im;
      return new Complex(
        (this.re * c.re + this.im * c.im) / denom,
        (this.im * c.re - this.re * c.im) / denom
      );
    }

    abs() {
      return Math.hypot(this.re, this.im);
    }

    toString() {
      return `${this.re.toFixed(6)} ${this.im >= 0 ? '+' : '-'} ${Math.abs(this.im).toFixed(6)}i`;
    }
  }

  // Evaluate polynomial at a complex number x
  function evaluatePoly(coeffs, x) {
    let result = new Complex(0, 0);
    for (let i = 0; i < coeffs.length; i++) {
      let term = new Complex(coeffs[i], 0);
      for (let j = 0; j < coeffs.length - 1 - i; j++) {
        term = term.mul(x);
      }
      result = result.add(term);
    }
    return result;
  }

  // Initialize roots: perturbed 4th roots of unity
  const roots = [];
  const r = 1;
  for (let i = 0; i < 4; i++) {
    const angle = (2 * Math.PI * i) / 4;
    roots.push(new Complex(
      r * Math.cos(angle),
      r * Math.sin(angle)
    ));
  }

  // Durand–Kerner iterations
  for (let iter = 0; iter < maxIterations; iter++) {
    let converged = true;
    for (let i = 0; i < 4; i++) {
      let xi = roots[i];
      let denom = new Complex(1, 0);
      for (let j = 0; j < 4; j++) {
        if (i !== j) {
          denom = denom.mul(xi.sub(roots[j]));
        }
      }
      const fxi = evaluatePoly(coefficients, xi);
      const delta = fxi.div(denom);
      roots[i] = xi.sub(delta);

      if (delta.abs() > tolerance) {
        converged = false;
      }
    }
    if (converged) break;
  }

  return roots;
}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 