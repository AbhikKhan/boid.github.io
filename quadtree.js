class Boundary{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    intersects(range){
        let x = abs(range.x - this.x);
        let y = abs(range.y - this.y);

        if (x > (this.width + range.r)) { return false; }
        if (y > (this.height + range.r)) { return false; }

        if (x <= (this.width)) { return true; } 
        if (y <= (this.height)) { return true; }

        let cd = (x - this.width) * (x - this.width) + (y - this.height) * (y - this.height);

        return (cd <= (range.r * range.r));
    }
}

class Range{
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    is_inside(bird){
        let d = dist(this.x, this.y, bird.position.x, bird.position.y);
        return d<=this.r;
    }
}

class QuadTree{
    constructor(boundary, capacity){
        this.boundary = boundary;
        this.capacity = capacity;
        this.divide = false;
        this.birds = [];
    }

    divide_tree(){
        this.divide = true;

        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.width;
        let h = this.boundary.height;

        let top_left = new Boundary(x - w/2, y - h/2, w/2, h/2);
        let top_right = new Boundary(x + w/2, y - h/2, w/2, h/2);
        let bottom_left = new Boundary(x - w/2, y + h/2, w/2, h/2);
        let bottom_right = new Boundary(x + w/2, y + h/2, w/2, h/2);

        this.north_west = new QuadTree(top_left, this.capacity);
        this.north_east = new QuadTree(top_right, this.capacity);
        this.south_west = new QuadTree(bottom_left, this.capacity);
        this.south_east = new QuadTree(bottom_right, this.capacity);

    }

    is_inside(bird){
        let x = bird.position.x;
        let y = bird.position.y;

        return (x >= this.boundary.x - this.boundary.width) && (x <= this.boundary.x + this.boundary.width) && (y >= this.boundary.y - this.boundary.height) && (y <= this.boundary.y + this.boundary.height);

    }

    insert(bird){
        if(!this.is_inside(bird))return false;

        if(this.birds.length < this.capacity){
            this.birds.push(bird);
        }
        else{
            if(!this.divide){
                this.divide_tree();
                this.divide = true;
            }
            return this.north_west.insert(bird) || this.north_east.insert(bird) || 
            this.south_west.insert(bird)|| this.south_east.insert(bird);

        }
    }

    display(){
        rectMode(CENTER);
        noFill();
        stroke(255);
        rect(this.boundary.x, this.boundary.y, this.boundary.width * 2, this.boundary.height * 2);
        if(this.divide){
            this.north_east.display();
            this.south_east.display();
            this.north_west.display();
            this.south_west.display();
        }
    }

    get_points(range, points){
        if(!points){
            points = [];
        }
        if(!this.boundary.intersects(range)){
            return;
        }
        for(let b of this.birds){
            // range.x != b.position.x && range.y != b.position.y
            if((range.x != b.position.x && range.y != b.position.y) && range.is_inside(b)){
                points.push(b);
            }
        }
        if(this.divide){
            this.north_west.get_points(range, points);
            this.north_east.get_points(range, points);
            this.south_west.get_points(range, points);
            this.south_east.get_points(range, points);
        }
        return points;

    }

}