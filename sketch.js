const flock = [];
let radius = 30;
let num = 200;
function setup() {
	// createCanvas(600, 400);
	createCanvas(windowWidth, windowHeight);
	for(let i = 0; i< num; i++){
		flock.push(new Bird());
	}

	// let boundary = new Boundary(width/2, height/2, width/2, height/2);
	// let quadtree = new QuadTree(boundary, 4);

	// for(let i = 0; i< 10; i++){
	// 	let b = new Bird();
	// 	quadtree.insert(b);
	// }

}

function draw() {
	// put drawing code here
	background(81);
	
	// -------------------------------------------------------------------------------------------------------------------
	
	// for(let b of flock){
	// 	nearest_neighbour = [];
	// 	for(let other of flock){
	// 		let d = dist(b.position.x, b.position.y, other.position.x, other.position.y);
	// 		if(other!=b && d < radius){
	// 			nearest_neighbour.push(other);
	// 		}
	// 	}
	// 	b.apply_rules(nearest_neighbour);
	// }
	
	//--------------------------------------------------------------------------------------------------------------------
	
	let boundary = new Boundary(width/2, height/2, width/2, height/2);
	let quadtree = new QuadTree(boundary, 4);

	for(let b of flock){
		quadtree.insert(b);
	}
	
	quadtree.display();

	for(let b of flock){
		let range = new Range(b.position.x, b.position.y, radius);
		let neighbour = quadtree.get_points(range);
		b.apply_rules(neighbour);
	}
//------------------------------------------------------------------------------------------------------------------------
	// let b = flock[0];
	// let range = new Range(b.position.x, b.position.y, radius);
	// let neighbour = quadtree.get_points(range);
	// b.apply_rules(neighbour);
	// b.update();
	// console.log(neighbour.length);
//------------------------------------------------------------------------------------------------------------------------

	for(let b of flock){
		b.update();
		b.show();
	}

}
