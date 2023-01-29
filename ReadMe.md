This is **Craig Reynolds'** Flocking simulation algorithm, implemented with p5.js. The simulated objects **(boids)** have three property<br>
<ul>
<li>**Separation** Each boids attempts to maintain a resonable amount of distance between itself and any nearby boids to prevent overcrowding.</li>
<li>**Allignment** Boids try to change their position so that it corresponds with the average alignment of other nearby boids.</li>
<li>**Cohesion** Every boid attempts to move towards the average position of other nearby boids.</li>
</ul>
<br><br>

The algorithm is further optimized using the **Quad Tree** data structure.<br>At each iteration the boids are inserted into the quadtree and each boid get to know about their neighbor using the quadtree in O(log(n)) time.
