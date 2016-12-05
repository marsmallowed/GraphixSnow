var refObject = window.referenceModel;
  var clone = new THREE.Mesh( refObject.geometry, refObject.material );
  clone.position.set(50, 0, 150);
  scene.add(clone);

  var clone2 = new THREE.Mesh( refObject.geometry, refObject.material );
  clone2.position.set(-50, 0, 200);
  scene.add(clone2);

  var clone3 = new THREE.Mesh( refObject.geometry, refObject.material );
  clone3.position.set(50, 0, 200);
  scene.add(clone3);

  var clone4 = new THREE.Mesh( refObject.geometry, refObject.material );
  clone4.position.set(-50, 0, 250);
  scene.add(clone4);

  var clone5 = new THREE.Mesh( refObject.geometry, refObject.material );
  clone5.position.set(50, 0, 250);
  scene.add(clone5);
  
  var clone6 = new THREE.Mesh( refObject.geometry, refObject.material );
  clone6.position.set(-50, 0, 300);
  scene.add(clone6);

  var clone7 = new THREE.Mesh( refObject.geometry, refObject.material );
  clone6.position.set(50, 0, 300);
  scene.add(clone7);