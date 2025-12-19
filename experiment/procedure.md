### Procedure

<div align="center">
<img class="img-fluid"  src="./images/intro.png" alt=""><br/><br/>
<b>Fig. 1. Schematic of the Cart-Pendulum plant</b>
</div><br/>


<p><b>Steps to perform the simulation</b><br/>
<ol type="1">									

<li>Enter the value of the gain <span class="fontCss">k<sub>d</sub></span><b><sup>2</sup></b> (a positive integer value) in Controller Analysation box and click on 'Submit' button.</li><br/>
<li>The values of gains <span class="fontCss">k<sub>p</sub></span><b><sup>1</sup></b>, <span class="fontCss">k<sub>p</sub></span><b><sup>2</sup></b>, <span class="fontCss">k<sub>i</sub></span><b><sup>1</sup></b>, 
<span class="fontCss">k<sub>i</sub></span><b><sup>2</sup></b> and <span class="fontCss">k<sub>d</sub></span><b><sup>1</sup></b> will be calculated.</li>

<div align="center">
<img class="img-fluid"  src="./images/ps1.png" alt=""><br/><br/>
<b>Fig. 2. Controller Analysation box in simulation</b>
</div><br/>					

<li>Click on "Stabilizing controller" block in the control panel, click on 'Get calculated controller values' button. The controller values will be visible in respective boxes in controller block.
Click on 'Ok'.</li></br>

<div align="center">
<img class="img-fluid"  src="./images/ps2.png" alt=""><br/><br/>
<b>Fig. 3. Stabilizing controller and controller block in simulation</b>
</div><br/>  					   

<li><ul><li>Set desired time for simulation (preferably 10 sec., maximum 100 sec) in corresponding input box on top of the panel.</li>


<li>Switch on the power supply by clicking on the 'Red Switch' under digital pendulum mechanical unit.</li>

<div align="center">
<img class="img-fluid"  src="./images/ps3.png" alt=""><br/><br/>
<b>Fig. 4. Digital pendulum mechanical unit in simulation</b>
</div><br/>

<li>Click on 'Incremental Build' icon and wait for an alert message to successfully build the model.</li></ul></li>

<li><ul><li>Click on "Connect to Target" icon now and wait for the run button to get enabled.</li><br/>
<li>Click on the green 'Power' button on digital pendulum controller. Now click on 'Start' button just beside that 'Power' button.</li><br/>
<li>Click on the run button now. Provide an initial value of angle (approximately -6&deg; &le; <span class="fontCss2"style="font-weight:bold">θ</span> &le; +6&deg;) in Controller Analysation box then click on the pendulum pole to make it inverted (vertically upright position).</li></ul></li><br/>						

<li>Click on 'Simulate' button to observe the simulation for inverted pendulum control and graphical representation of cart position, pendulum angle and control voltage.</li><br/>
<li>Plot can be downloaded by clicking on 'Download' button. Now click on 'Ok' button beside the 'Download' button.</li><br/>

<li> Wait untill the pendulum stops oscillating and the system settles down. Click on 'Show Table' button in control panel, then on 'Clear' button. Click on 'Stop' button on digital pendulum controller.</li><br/>

<li><b>Note:</b> If the cart-pendulum system becomes unstable for any initial angle, wait untill the pendulum stops oscillating and the system settles down. Then one alert message will get appeared.
After the pendulum stops completely, click on 'Clear' button, then on 'Reset' button to bring the cart-pendulum system to center position on track.</li><br/>

<li>Change the gain value <span class="fontCss">k<sub>d</sub></span><b><sup>2</sup></b> and repeat steps 2-8 for another initial value of angle (degree).</li><br/>

<li>Click on 'Compared plots' button to observe compared graphical representations of all the provided initial angle value and gain values.</li>  


</ol>


<link rel="stylesheet" href="simulation/css/PC.css">
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
