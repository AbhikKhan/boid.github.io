class Bird{
    constructor(){
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        // this.velocity.setMag(random(0.5, 1));
        this.acceleration = createVector();
        this.speed = 3;
        this.force = 0.3;
        this.r = 2;
    }

    // inside_region(flock){ 
    //     for(let b of flock){
    //         let d = dist(this.position.x, this.position.y, b.position.x, b.position.y);
    //         if(this!=b && d<radius){
    //             this.nearest_neighbour.push(b);
    //         }
    //     }
    // }

//------------------------------------------------------------------------------------------------------------------------

    // seperation(neighbours){
    //     let average_position = createVector();
    //     let total = 0;
    //     for(let b of neighbours){
    //         let diffrence = p5.Vector.sub(this.position, b.position);
    //         let d = dist(this.position.x, this.position.y, b.position.x, b.position.y);
    //         if(d>0){
    //             diffrence.div(d);
    //             average_position.add(diffrence);
    //             total++;
    //         }
    //     }
    //     if(total>0){
    //         average_position.div(total);
    //         average_position.setMag(this.speed);
    //         average_position.sub(this.velocity);
    //         average_position.limit(this.force);
    //     }
    //     return average_position;
    // }

    // cohesion(neighbours){
    //     let average_position = createVector();
    //     let total = 0;
    //     for(let b of neighbours){
    //         average_position.add(b.position);
    //         total++;
    //     }
    //     if(total>0){
    //         average_position.div(total);
    //         average_position.sub(this.position);
    //         average_position.setMag(this.speed);
    //         average_position.sub(this.velocity);
    //         average_position.limit(this.force);
    //     }
    //     return average_position;
    // }

    // allign(neighbours){
    //     let average_velocity = createVector();
    //     let total = 0;
    //     for(let b of neighbours){
    //         average_velocity.add(b.velocity);
    //         total++;
    //     }
    //     if(total>0){
    //         average_velocity.div(total);
    //         average_velocity.setMag(this.speed);
    //         average_velocity.sub(this.velocity);
    //         average_velocity.limit(this.force);
    //     }
    //     return average_velocity;
    // }

//------------------------------------------------------------------------------------------------------------------------

    rule1(neighbours){
        let average_position = createVector();
        let total = 0;
        for(let b of neighbours){
            let d = dist(this.position.x, this.position.y, b.position.x, b.position.y);
            if(d > 0 && d < radius){
                let diffrence = p5.Vector.sub(this.position, b.position);
                diffrence.normalize();
                diffrence.div(d);
                average_position.add(diffrence);
                total++;
            }
        }
        if(total>0){
            average_position.div(total);
            average_position.normalize();
            average_position.mult(this.speed);
            average_position.sub(this.velocity);
            // average_position.limit(this.force);
            average_position.limit(0.4);
        }
        return average_position;
    }

    rule2(neighbours){
        let average_position = createVector();
        let total = 0;
        for(let b of neighbours){
            average_position.add(b.position);
            total++;
        }
        if(total>0){
            average_position.div(total);
            average_position.sub(this.position);
            average_position.normalize();
            average_position.mult(this.speed);
            average_position.sub(this.velocity);
            average_position.limit(this.force);
        }
        return average_position;
    }

    rule3(neighbours){
        let average_velocity = createVector();
        let total = 0;
        for(let b of neighbours){
            average_velocity.add(b.velocity);
            total++;
        }
        if(total>0){
            average_velocity.div(total);
            average_velocity.normalize();
            average_velocity.mult(this.speed);
            average_velocity.sub(this.velocity);
            average_velocity.limit(this.force);
        }
        return average_velocity;
    }

//------------------------------------------------------------------------------------------------------------------------

    apply_rules(neighbours){
        let force1 = this.rule1(neighbours);
        let force2 = this.rule2(neighbours);
        let force3 = this.rule3(neighbours);
        this.acceleration.add(force1);
        this.acceleration.add(force2);
        this.acceleration.add(force3);
    }

    update(){
        //this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.setMag(this.speed);
        // this.velocity.limit(this.speed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        // boundary checking
        this.position.x = (this.position.x + width) % width;
        this.position.y = (this.position.y + height) % height;
        
    }

    // show(){
    //     noStroke();
    //     fill(255, 200);
    //     circle(this.position.x, this.position.y, 5);
    // }
    
    show() {

        let theta = this.velocity.heading() + radians(90);
        noStroke();
        fill(175);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape(TRIANGLES);
        vertex(0, -this.r*2);
        vertex(-this.r, this.r*2);
        vertex(this.r, this.r*2);
        endShape();
        pop();
      }
}