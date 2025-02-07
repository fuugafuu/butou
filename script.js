// ゲームの主要要素設定
const canvas = document.getElementById('gameCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// カメラ位置
camera.position.z = 5;

// OrbitControlsでカメラ操作
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// 3Dモデルの読み込み（GLTF形式）
const loader = new THREE.GLTFLoader();
loader.load('bird_model.gltf', function(gltf) {
  const bird = gltf.scene;
  bird.scale.set(0.5, 0.5, 0.5);
  scene.add(bird);
});

// 簡単なライト
const light = new THREE.AmbientLight(0x404040); // 環境光
scene.add(light);

// レイキャスターを使用してクリックイベントを処理
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
canvas.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.update();
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    // 撫でるアクション（空腹度など）
    console.log("文鳥を撫でました！");
    // 例えば、空腹度を減らす処理
  }
});

// レンダリング関数
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // OrbitControlsの更新
  renderer.render(scene, camera);
}

animate();

// ウィンドウリサイズに対応
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
