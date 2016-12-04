var camera;
var scene;
var renderer;
var clock;
var deltaTime;

var particleSystem;

init();
animate();

function init() {

	clock = new THREE.Clock(true);
	
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;

    /* add sky */
	var geometry = new THREE.SphereGeometry(500, 60, 40);
	geometry.scale(-1, 1, 1);
	var material = new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load('img/bg.jpg')
	});
	sky = new THREE.Mesh( geometry, material );
	sky.rotation.x = 35;
	scene.add(sky);
    
    /* add lights */
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, -1, 1 ).normalize();
    scene.add(light);

    var light2 = new THREE.PointLight( 0xffffff, 1, 50 );
	light2.position.set( 10, 10, 10 );
	scene.add(light2);

	var light3 = new THREE.PointLight( 0xffffff, 1, 50 );
	light3.position.set( 25, -20, 10 );
	scene.add(light3);


	var light4 = new THREE.PointLight(0xffffff, 1, 50);
	light4.position.set(-10, 10, -10);
	scene.add(light4);
	

	var light5 = new THREE.PointLight( 0xffffff, 1, 50 );
	light5.position.set( 10, 10, -10 );
	scene.add(light5);

	var light6 = new THREE.PointLight( 0xffffff, 1, 50 );
	light6.position.set( 25, -20, -10 );
	scene.add(light6);

	var light7 = new THREE.PointLight( 0xffffff, 1, 200 );
	light7.position.set( 220, 10, 100 );
	scene.add(light7);

    /* load tower */
	var loader = new THREE.JSONLoader();
	loader.load("./models/bottom.json", function(geometry, materials) {
	var material = new THREE.MultiMaterial(materials);
	var tower = new THREE.Mesh(geometry, material);
		tower.position.set(0, -1, 0);
	    tower.scale.set(0.015, 0.015, 0.015);
	    scene.add(tower);
	});

	var loader = new THREE.JSONLoader();
	loader.load("./models/top.json", function(geometry, materials) {
	var material = new THREE.MultiMaterial(materials);
	var tower2 = new THREE.Mesh(geometry, material);
		tower2.position.set(0, -1, 0);
	    tower2.scale.set(0.015, 0.015, 0.015);
	    scene.add(tower2);
	});


	/* add floor */
	var floorTexture = new THREE.ImageUtils.loadTexture( 'img/floor.jpg' ); 
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set(1, 1);
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	floorMaterial.opacity = 0.5;
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -2;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);


    particleSystem = createParticleSystem();
    scene.add(particleSystem);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
//  controls = new THREE.OrbitControls( camera, renderer.domElement );
//	controls.maxPolarAngle = Math.PI/2;

    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', render);
    controls.enableDamping = true;
    controls.dampingFactor = 0.4;
  	controls.maxDistance = 5;

    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
        
    render();
}

function createParticleSystem() {
    var particleCount = 2000;
    
    /* generate multiple snowflakes */
    var particles = new THREE.Geometry();
	for (var p = 0; p < particleCount; p++) {
	
		/* directions of snowflakes */
		var x = Math.random() * 400 - 200;
		var y = Math.random() * 400 - 200;
		var z = Math.random() * 400 - 200;
		      
		var particle = new THREE.Vector3(x, y, z);
		particles.vertices.push(particle);
	}

	/* snowflake material */
	var particleMaterial = new THREE.PointsMaterial({
		color: 0xffffff, 
		size: 4,
		map: THREE.ImageUtils.loadTexture("img/sflake.png"),
		blending: THREE.AdditiveBlending,
		transparent: true,
	});
	 
	// create the particle system
	particleSystem = new THREE.Points(particles, particleMaterial);

	return particleSystem;
}

function animate() {
	deltaTime = clock.getDelta();
	
  	controls.update();
    animateParticles();
    
    render();
    requestAnimationFrame( animate );
}

function animateParticles() {
	var verts = particleSystem.geometry.vertices;
	for(var i = 0; i < verts.length; i++) {
		var vert = verts[i];
		if (vert.y < -200) {
			vert.y = Math.random() * 400 - 200;
		}
		vert.y = vert.y - (10 * deltaTime);
	}
	particleSystem.geometry.verticesNeedUpdate = true;
	
	particleSystem.rotation.y -= .1 * deltaTime;
}


function render() {
    renderer.render( scene, camera );
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}