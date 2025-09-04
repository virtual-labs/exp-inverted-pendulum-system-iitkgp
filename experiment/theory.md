# Theory

The inverted cart–pendulum is an example of under-actuated, non-minimum phase and highly unstable system. 
The first step in the analysis of control system is to derive its mathematical model to understand the working of the complete system.
<br><br>

<h2>The Plant (Cart-Pendulum)</h2><br/>
<b>Pendulum set description</b><br/>

The pendulum setup consists of a cart moving along the 1 meter length track. Two pendulums are mounted on the cart’s shaft and are fixed together using an arm fixing screw. 
As a result, they share the same angle of rotation (<span class="fontCss2" style="font-weight:bold">θ</span>). The cart can move back and forth causing the pendulums to swing. The movement of the cart is caused by pulling the belt 
in two directions by the dc motor attached at the end of the rail. By applying a voltage to the motor the force is controlled with which the cart is pulled. The value of the force depends on 
the value of the control voltage. The voltage is the control signal. The two variables that are read from the pendulum (using optical encoders) are the pendulum position (angle i.e., <span class="fontCss2" style="font-weight:bold">θ</span> (&deg;)) 
and the cart position (<span class="fontCss">x</span> (m)) on the rail. The controller’s task will be to change the dc motor voltage depending on these two variables in such a way that the desired control task is fulfilled (stabilizing in a vertical upright position).<br>
<div align="center">				
<img alt="" src="./images/mech_unit.png" class="img-fluid"><br/>
<b>Fig. 1. Digital Pendulum mechanical unit</b> 
</div><br>

<div align="center">
<p><b>Cart-Pendulum system parameters</b></p>
<table class="table text-center" style="width:56%:border:none">
<tr>
<th colspan=2><b>Table 1</b></th>
</tr>
<tr >
<th><b>Parameter</b></th>
<th><b>Value</b></th>				
</tr>
<tr>
<td ><span style="font-family:'Calibri';font-style:italic">g</span> - Acceleration due to gravity</td>
<td>9.81 m/s<sup>2</sup></td>				
</tr>
<tr >
<td ><span class="fontCss2">l</span> - Length of the pendulum</td>
<td>0.4 m</td>				
</tr>
<tr >
<td><span class="fontCss2">M</span> - Mass of the cart</td>
<td>2.4 kg</td>				
</tr>
<tr >
<td><span class="fontCss">m</span> - Mass of the pendulum</td>
<td>0.23 Kg</td>				
</tr>
<tr >
<td><span class="fontCss2">J</span> - Moment of inertia of pendulum</td>
<td>0.099 Kg.m<sup>2</sup></td>				
</tr>
<tr >
<td><span class="fontCss">b</span> - Coefficient of cart friction</td>
<td>0.055 Ns/m</td>				
</tr>
<tr >
<td><span class="fontCss">d</span> - Pendulum damping coefficient</td>
<td>0.005 Nm.s/rad</td>				
</tr>
<tr >
<td><span class="fontCss2">F</span> - Applied force to the cart</td>
<td>- 24 N &lt; F &lt; + 24 N</td>				
</tr>
<tr >
<td><span class="fontCss">x</span> - Position of cart from the reference</td>
<td>- 0.5 m &lt; x &lt; + 0.5 m</td>				
</tr>
</table>
</div>

Summing the forces acting on the cart-pendulum system (Fig. 2) the following nonlinear equations of motion are obtained.<br/>

$$(m + M) \ddot{x} + b \dot{x} + ml\ddot{\theta} cos\theta - ml\dot{\theta}^2 sin\theta = F \tag{1}$$

$$(I+ml^2)\ddot{\theta} - mglsin\theta + ml\ddot{x}cos\theta + d\dot{\theta} = 0 \tag{2}$$

For such a nonlinear model ((1) and (2)) to be presented as a transfer function, it has to be linearized. 
For small <span class="fontCss2" style="font-weight:bold">θ</span>, pendulum damping coefficient (<span class="fontCss">d</span>) and coefficient of cart friction (<span class="fontCss">b</span>) are ignored.
Linearization of (1) and (2) can be done by substituting the nonlinear functions (sine and cosine) with their linear equivalent using Taylor approximation of the nonlinear functions. 
For small angle deviations around an equilibrium point of <span class="fontCss2"style="font-weight:bold">θ</span> = 0 (inverted pendulum) following assumptions can be considered for linearization.

$$sin \theta \approx \theta \tag{3}$$
$$cos \theta \approx 1 \tag{4}$$
$$\dot{\theta}^2 \approx 0 \tag{5}$$

Linearizing (1) and (2), following the assumptions (3), (4), (5) and neglecting <span class="fontCss">d</span> in (2), <span class="fontCss">b</span> in (1), (6) and (7) are obtained.

$$(m + M)\ddot{x} + ml\ddot{\theta} = F \tag{6}$$

$$(I + ml^2)\ddot{\theta} - mgl\theta + ml\ddot{x} = 0 \tag{7}$$

From (6) and (7), (8) and (9) are obtained,

$$\ddot{x} = \frac{1}{\Delta} [(I+ml^2)F - ml(mgl\theta)] \tag{8}$$

$$\ddot{\theta} = \frac{1}{\Delta} [(-ml)F + (m+M)(mgl\theta)] \tag{9}$$

where,

$$\Delta = (I+ml^2)(m+M) - m^2l^2$$

The state vectors are,

$$x_1 = x, \ \ \  x_2 = \dot{x}, \ \ \ x_3 = \theta, \ \ \ x_4 = \dot{\theta}$$

From (8) and (9), the state equations are writen in (10)-(13),

$$\dot{x_1} = x_2 \tag{10}$$

$$\dot{x_2} = \frac{1}{\Delta} [(I+ml^2)F - ml(mgl\theta)] \tag{11}$$

$$\dot{x_3} = x_4 \tag{12}$$

$$\dot{x_4} = \frac{1}{\Delta} [(-ml)F + (m+M)(mgl\theta)] \tag{13}$$

<br/><br/>

<b>State Space Representation</b><br/>
Utilizing (10)-(13), the state space model is obtained in (14) and (15).

$$\left[\begin{array}{cc}
\dot{x} \newline
\ddot{x}\newline
\dot{\theta}\newline
\ddot{\theta}\newline
\end{array}\right]=\left[\begin{array}{cc}
0 & 1& 0 & 0 \newline
0 & 0 & -\frac{m^2 l^2 g}{\Delta}  & 0 \newline
0 & 0& 0 & 1 \newline
0 & 0 & \frac{mgl(m+M)}{\Delta} & 0 \newline
\end{array}\right]
\left[\begin{array}{cc}
x \newline
\dot{x} \newline
\theta \newline
\dot{\theta} \newline
\end{array}\right]+
\left[\begin{array}{cc}
0 \newline
\frac{(I+ml^2)}{\Delta} \newline
0 \newline
\frac{-ml}{\Delta} \newline	
\end{array}\right]
F \tag {14}$$		

$$y = \ \left[\begin{array}{cc}
1 & 0 & 0 & 0 \newline
0 & 0 & 1 & 0
\end{array}\right]
\left[\begin{array}{cc}
x \newline
\dot{x} \newline
\theta \newline
\dot{\theta} \newline	
\end{array}\right] \tag {15}$$


<b>Transfer Function Model</b><br/>
Laplace transform of (7) yields (16).<br/>

$$(I + ml^2) s^2 \theta(s) + mls^2 X(s) - mgl \theta(s) = 0$$

$$\Longrightarrow [(I + ml^2) s^2 - mgl] \theta(s) = -mls^2 X(s)$$

$$\frac{X(s)}{\theta(s)} = \frac{-[(I + ml^2) s^2 - mgl]}{mls^2} \tag{16}$$

Considering the value of <span class="fontCss2" style="font-weight:bold">&theta;</span>(<span class="fontCss">s</span>) from (16) and substituting it into the Laplace transform of (6), (17) is obtained.<br/>

$$(m + M) s^2 X(s) + mls^2 \left(\frac{-mls^2 X(s)}{(I + ml^2)s^2 - mgl}\right) = F(s)$$

$$\Longrightarrow X(s) \left[(M + m) s^2 - \frac{m^2 l^2 s^4}{(I + ml^2) s^2 - mgl}\right] = F(s)$$

$$\Longrightarrow \frac{X(s)}{F(s)} = \frac{(I + ml^2)s^2 -mgl}{(M + m)(I + ml^2) s^4 - (M + m) mgls^2 - m^2l^2s^2} \tag{17}$$

$$m^2l^2 \approx 0 \ (since \ it \ is \ very \ small)$$


$$\Longrightarrow \frac{X(s)}{F(s)} = \frac{(I + ml^2)\left(s^2 - \frac{mgl}{I + ml^2}\right)}{(I + ml^2)(M + m)s^2 \left(s^2 - \frac{mgl}{I + ml^2}\right)}$$

$$\Longrightarrow \frac{X(s)}{F(s)} = \frac{I + ml^2}{(I + ml^2)(M + m) s^2}$$

$$\Longrightarrow \frac{X(s)}{F(s)} = \frac{1}{(M + m) s^2}$$

$$\frac{X(s)}{F(s)} \approx \frac{b_1}{s^2} = P_1 \ where, b_1 = \frac{1}{M + m} \tag{18}$$

Now, substituting the value of <span class="fontCss2">X</span>(<span class="fontCss">s</span>) from (16) into the Laplace transform of (6), (19) is obtained,

$$-(M + m) \left\[ \frac{ (I + ml^2) s^2 - mgl }{ ml } \theta(s) \right\] + mls^2 \theta(s) = F(s)$$

$$\Longrightarrow \frac{\theta(s)}{F(s)} = \frac{ml}{m^2l^2s^2 - (M + m)(I + ml^2)s^2 + (M + m) mgl} \tag{19}$$

We know:

$$\Delta = (M + m)(I + ml^2) - m^2l^2$$

Since <span class="fontCss">m</span> and <span class="fontCss">l</span> are very small, <span class="fontCss">m<sup>2</sup>l<sup>2</sup></span> will also be small, so it is neglected.

Now,

$$\Delta_1 \approx (M + m)(I + ml^2)$$

$$\Longrightarrow \frac{\theta(s)}{F(s)} = \frac{ml}{-\Delta_1 s^2 + (M + m) mgl}$$

$$\Longrightarrow \frac{\theta(s)}{F(s)} = \frac{ml}{-\Delta_1 [s^2 - \frac{(M + m) mgl}{\Delta_1}]}$$

$$\Longrightarrow \frac{\theta(s)}{F(s)} = \frac{ml}{-\Delta_1 [s^2 - \frac{mgl}{I + ml^2}]}$$

Let,

$$\frac{-ml}{\Delta_1} = b_2 \ and \ \frac{mgl}{I + ml^2} = a_2$$

$$\frac{\theta(s)}{F(s)} = \frac{b_2}{s^2 - a_2} = P_2 \tag{20}$$

Now, the dc motor is used to convert the control voltage <span class="fontCss2">U</span> to force <span class="fontCss2">F</span> is represented by only a gain block of gain = 15.
Hence, after substituting the parameter values from Table 1 into (18) and (20), and multiplying the numerators by a gain of 15, the transfer functions <span class="fontCss2">X</span>(<span class="fontCss">s</span>)/<span class="fontCss2">U</span>(<span class="fontCss">s</span>) and <span class="fontCss2" style="font-weight:bold">&theta;</span>(<span class="fontCss">s</span>)/<span class="fontCss2">U</span>(<span class="fontCss">s</span>) 
are obtained in (21) and (22).

$$\frac{X(s)}{U(s)} \triangleq \frac{b_1}{s^2} = \frac{5.703}{s^2} \tag {21}$$

$$\frac{\theta(s)}{U(s)} \triangleq \frac{b_2}{s^2 - a_2} = \frac{-3.864}{s^2 - 6.646} \tag {22}$$

<br>
<p><b>Two loop PID controller</b></p>
<div align="center">				
<img alt="" src="./images/controllerdia.png" class="img-fluid"><br/>
<b>Fig. 3. Two-loop PID controller for an inverted cart–pendulum system</b>
</div><br>

The two-loop PID controller (details in Reference [5]) to be employed for the cart–pendulum system is shown in Fig. 3. Let the two PID controllers be

$$C_1 = \frac{k^1_d s^2 +k^1_p s +k^1_i}{s} \tag {23}$$
$$C_2 = \frac{k^2_d s^2 +k^2_p s +k^2_i}{s} \tag {24}$$


where, 

$$k^1_p \ denotes \ proportional \ gain \ for \ C_1$$
$$k^1_i \ denotes \ integral \ gain \ for \ C_1$$
$$k^1_d \ denotes \ derivative \ gain \ for \ C_1$$
$$k^2_p \ denotes \ proportional \ gain \ for \ C_2$$
$$k^2_i \ denotes \ integral \ gain \ for \ C_2$$
$$k^2_d \ denotes \ derivative \ gain \ for \ C_2$$


With the control configuration in Fig. 3, the characteristic equation becomes,

$$1 - P_1C_1 + P_2C_2 = 0 \tag {25}$$

Substituting <span class="fontCss2">P</span><sub>1</sub>, <span class="fontCss2">P</span><sub>2</sub> (from (18) and (20)), and <span class="fontCss2">C</span><sub>1</sub>, <span class="fontCss2">C</span><sub>2</sub></span> (from (23) and (24)) in (25), we get

$$1 - (\frac{b_1}{s^2}\frac{k^1_d s^2 +k^1_p s +k^1_i}{s})+ (\frac{b_2}{s^2 - a_2}\frac{k^2_d s^2 +k^2_p s +k^2_i}{s}) = 0 \tag {26}$$

which yields 

$$s^5 + (-b_1 k^1_d + b_2 k^2_d)s^4 + (-a_2 - b_1 k^1_p + b_2 k^2_p)s^3 + (-b_1 k^1_i + a_2b_1k^1_d + b_2k^2_i)s^2 + (a_2b_1k^1_p)s + (a_2b_1k^1_i) = 0 \tag {27}$$

Since (27) is the characteristic equation of fifth order, let the desired characteristic equation be

$$s^5 + p_1s^4 + p_2s^3 + p_3s^2 + p_4s + p_5 = 0 \tag {28}$$

Comparing the coefficients of (27) and (28),  (29) is obtained,

$$\left[\begin{array}{cc}
-b_1 & 0 & 0 & b_2 & 0 & 0 \newline
0  & -b_1 & 0 & 0 & b_2 & 0 \newline
a_2b_1 & 0 & -b_1 & 0 & 0 & b_2\newline
0 & a_2b_1 & 0 & 0 & 0 & 0\newline
0 & 0 & a_2b_1 & 0 & 0 & 0 \newline
\end{array}\right]
\left[\begin{array}{cc}
k^1_d\newline
k^1_p \newline
k^1_i\newline
k^2_d\newline
k^2_p\newline
k^2_i\newline				
\end{array}\right]=\left[\begin{array}{cc}
p_1\newline
p_2 + a_2\newline
p_3\newline
p_4\newline
p_5\newline				
\end{array}\right]
\tag {29}$$


<p><b>LQR Design</b></p>
The LQR is an optimal state feedback controller designed to minimise a particular quadratic performance index, which
takes care of the design constraints. For an LTI system,<br/>

$$\dot{X}= AX + BU$$
$$Y=CX  \tag {30}$$

The performance index is taken as,
$$J = \frac{1}{2}\int_{0}^{\infty} (X^TQX + U^TRU) dt \tag {31}$$

where, <i style="font-family:'century'">Q</i> is positive semi-definite (or positive definite) and 
<span class="fontCss2">R</span> is positive definite. The minimisation of <span class="fontCss2">J</span> is obtained by solving the algebraic Riccati equation –

$$A^TP+PA-PBR^{-1}B^TP+Q = 0 \tag {32}$$
The optimal state feedback gain vector <span class="fontCss2">K</span> &triangleq; [<span class="fontCss2">K<sub>1</sub>, K<sub>2</sub>, K<sub>3</sub>, K<sub>4</sub></span>] becomes,

$$K = -R^{-1}B^TP \tag {33}$$

Now for the inverted pendulum system (presented in (14) and (15)), the LQR design is carried out. By substituting the system parameter values from Table 1 
into (14) and (15), and then comparing these equations with (30), we obtain

$$A =\left[\begin{array}{cc}
0 & 1 & 0 & 0\newline
0 & 0 & -0.238 & 0 \newline
0 & 0 & 0 & 1\newline
0 & 0 & 6.807 & 0\newline			
\end{array}\right],
B =\left[\begin{array}{cc}
0\newline
0.3894\newline
0\newline
-0.2638\newline			
\end{array}\right]\times 15,
\ C =\left[\begin{array}{cc}
1 & 0 & 0 & 0\newline
0 & 0 & 1 & 0 \newline
\end{array}\right]
\tag {34}$$

The <i style="font-family:'century'">Q</i> matrix and <span class="fontCss2">R</span> are taken as,

$$Q =\left[\begin{array}{cc}
50000 & 0 & 0 & 0\newline
0 & 2000 & 0 & 0 \newline
0 & 0 & 2000 & 0 \newline
0 & 0 & 0 & 100 \newline
\end{array}\right],
R = 10000$$

The optimal state feedback control gains are then found to be,

$$K = [-2.2361 \ -2.7209 \ -17.5208 \ -6.7791]^T \tag {35}$$


Finally, the closed-loop poles, i.e., the eigen-values of (<span class="fontCss2">A – BK</span>) are obtained as -2.8862 &plusmn; 2.1606 <span class="fontCss2">i</span>, -2.58 &plusmn; 0.1461 <span class="fontCss2">i</span>
<br/><br/>
Now, with four closed-loop poles and choosing the fifth pole to be six times the real part of the 
dominant one among these four poles, the coefficients of (28) are obtained as, <span class="fontCss">p</span><sub>1</sub>= 26.4, <span class="fontCss">p</span><sub>2</sub>= 218.6, <span class="fontCss">p</span><sub>3</sub>= 871.3, <span class="fontCss">p</span><sub>4</sub>= 1721.8, <span class="fontCss">p</span><sub>5</sub>= 1343.7.
<br/><br/>
Next, by substituting these <span class="fontCss">p</span><sub>1</sub>, <span class="fontCss">p</span><sub>2</sub>, <span class="fontCss">p</span><sub>3</sub>, <span class="fontCss">p</span><sub>4</sub>, <span class="fontCss">p</span><sub>5</sub> and <span class="fontCss">b</span><sub>1</sub>, <span class="fontCss">b</span><sub>2</sub>, <span class="fontCss">a</span><sub>2</sub></span> obtained from (21), (22) in (29), we get
				
$$\left[\begin{array}{cc}
-5.703 & 0 & 0 & -3.863 & 0 & 0\newline
0 & -5.703 & 0 & 0 & -3.863 & 0\newline
37.9021 & 0 & -5.703 & 0 & 0 & -3.863\newline
0 & 37.9021 & 0 & 0 & 0 & 0\newline
0 & 0 & 37.9021 & 0 & 0 & 0\newline				
\end{array}\right]
\left[\begin{array}{cc}
k^1_d\newline
k^1_p \newline
k^1_i\newline
k^2_d\newline
k^2_p\newline
k^2_i\newline				
\end{array}\right]=\left[\begin{array}{cc}
26.4\newline
225.25\newline
871.3\newline
1721.8\newline
1343.7\newline
\end{array}\right]
\tag {36}$$			

In (36), five poles need to be placed and we have six parameters. So we need to fix one parameter. 

On choosing <span class="fontCss">k<sub>d</sub></span><b><sup>2</sup></b> = 10 (say), the PID parameters are obtained as

$$k^1_p =45.429 $$

$$k^1_d =-11.403 $$

$$k^1_i =35.453 $$

$$k^2_p =-125.442 $$

$$k^2_i = -389.786$$

<br>
<b>Application</b><br/>
<ul>
<li>The Segway</li>
<li>The human posture systems</li>
<li>The launching of a rocket etc.</li>
</ul>				
Basically, any system that requires vertical stabilization has dynamics that are similar to an inverted pendulum. The work involved in modeling and 
controlling an inverted pendulum can be carried over to many engineering areas.<br/><br/>

<b>Observations</b> :<br/>
<ul><li>It has been observed that the derived controller works for real time plant for an initial angle approximately -6&deg; (&approx;-0.1 rad) &le; <span class="fontCss2"style="font-weight:bold">θ</span> &le; +6&deg; (&approx;+0.1 rad).</li><br/>
<li>For an initial angle -6&deg; (&approx;-0.1 rad) &gt; <span class="fontCss2"style="font-weight:bold">θ</span> or <span class="fontCss2"style="font-weight:bold">θ</span> &gt; +6&deg; (&approx;+0.1 rad) the real time plant becomes unstable 
as the controller doesnot get activated, i.e., the initial angle value comes under unstable zone.</li><br/>

<li>The experiment has been developed based on pure mathematical modelling. In practical case, results may defer due to some additional environmental or physical factors.</li>

</ul>


<b> Integral Square Error (<span class="fontCss2">ISE</span>):</b>
In control system engineering, performance indices (PP-182 (Reference [3]), PP-654 (Reference [4])) are critical in evaluating the effectiveness of controller parameters. 
One of the most widely used performance indices is <span class="fontCss2">ISE</span>. It provides a quantitative measure of how well a system tracks a reference signal.
<span class="fontCss2">ISE</span> is defined as the integral of square of the error signal over a specified time interval <span class="fontCss2">T</span>. Mathematically, 
the integral computes the area under the curve of squared error over time and it is denoted in (37).

$$ISE = \int_{0}^{T} e^2 (t) dt \tag{37}$$

where,
<ul><li><span class="fontCss">e</span>(<span class="fontCss">t</span>) - error between reference signal <span class="fontCss">r</span>(<span class="fontCss">t</span>)</span> and actual output <span class="fontCss">y</span>(<span class="fontCss">t</span>).</li>
<li><span class="fontCss2">T</span> - total simulation time.
<li><span class="fontCss">e<sup>2</sup></span>(<span class="fontCss">t</span>) - square of error at <span class="fontCss">t</span> th time instant.
</ul>

<b>Utilization of <span class="fontCss2">ISE</span> in Inverted Cart-Pendulum</b><br/>
In the context of the inverted cart-pendulum system,
<li><span class="fontCss">e</span><sub><span class="fontCss2"style="font-weight:bold">θ</span></sub>(<span class="fontCss">t</span>) = <span class="fontCss2"style="font-weight:bold">θ</span><sub>desired</sub>(<span class="fontCss">t</span>) − <span class="fontCss2"style="font-weight:bold">θ</span><sub>actual</sub>(<span class="fontCss">t</span>)
; <span class="fontCss2"style="font-weight:bold">θ</span> - pendulum angle in &deg;.</li>
<li>Since, <span class="fontCss2"style="font-weight:bold">θ</span><sub>desired</sub>(<span class="fontCss">t</span>) = 0, <span class="fontCss">e</span><sub><span class="fontCss2"style="font-weight:bold">θ</span></sub>(<span class="fontCss">t</span>) = −<span class="fontCss2"style="font-weight:bold">θ</span><sub>actual</sub>(<span class="fontCss">t</span>).</li>

In (38), <span class="fontCss2">ISE</span> represents a quantitative measure of how much the pendulum angle deviates from its vertical upright (zero-angle) position over time <span class="fontCss2">T</span>. 

$$ISE = \int_{0}^{T} e_{\theta}^2 (t) dt \tag{38}$$

A lower value of <span class="fontCss2">ISE</span> indicates superior controller performance.
<br/><br/>

<div align="center">
<b> Effect of changing <span class="fontCss">k<sub>d</sub></span><b><sup>2</sup></b> on other gains and <span class="fontCss2">ISE</span> values</b>
<table class="table text-center" style="width:50%:border:none">
<tr>
<th colspan=5><b>Table 2</b></th>
</tr>				
<tr>
<th>Initial angle (&deg;)</th>
<th><span class="fontCss">k<sub>d</sub></span><b><sup>2</sup></b></th>
<th><span class="fontCss">k<sub>d</sub></span><b><sup>1</sup></b></th>
<th><span class="fontCss">k<sub>i</sub></span><b><sup>2</sup></b></th>
<th><span class="fontCss2">ISE</span></th>
</tr>
<tr>
<td>6</td>
<td>10</td>
<td>-11.403</td>
<td>-389.768</td>
<td>0.012937</td>
</tr>
<tr>
<td>6</td>
<td>20</td>
<td>-18.176</td>
<td>-456.220</td>
<td>130.36807</td>
</tr>
</table>
</div>
<br/><br/>

<b>Conclusion :</b><br/>
Table 2 data reveals that,
<ul>
<li>The value of <span class="fontCss">k<sub>d</sub></span><b><sup>2</sup></b> must be a positive integer, i.e. <span class="fontCss">k<sub>d</sub></span><b><sup>2</sup></b> &isin; <span class="fontCss">Z<sup>+</sup></span>
where, <span class="fontCss">Z<sup>+</sup></span> denotes the set of positive integers.</li>
<li>A moderate value of <span class="fontCss">k<sub>d</sub></span><b><sup>2</sup></b> (say 10) provides a good system performance.</li>
<li>A high values of <span class="fontCss">k<sub>d</sub></span><b><sup>2</sup></b> (say 20) lead to poor system performance, as indicated by high <span class="fontCss2">ISE</span> value.</li>
</ul>


<link rel="stylesheet" href="simulation/css/PC.css">

<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>								
