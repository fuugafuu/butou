// 基本的なThree.jsのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webglCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// GLTFLoaderを使用してモデルを読み込む
const loader = new THREE.GLTFLoader();
loader.load('models/bird_model.gltf', function(gltf) {
  scene.add(gltf.scene);
  gltf.scene.scale.set(0.5, 0.5, 0.5); // モデルのスケールを調整
  gltf.scene.position.set(0, -1, 0); // モデルの位置を調整
}, undefined, function(error) {
  console.error('An error happened loading the model:', error);
});

// カメラの位置
camera.position.z = 5;

// レンダリングループ
function animate() {
  requestAnimationFrame(animate);

  // 必要に応じてモデルを回転させる
  scene.traverse(function(object) {
    if (object.isMesh) {
      object.rotation.y += 0.01;
    }
  });

  renderer.render(scene, camera);
}

// イベントリスナー: マウスクリックでRaycasterを更新
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  // マウス座標を正規化
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycasterを更新してクリック位置をチェック
  raycaster.update(mouse, camera);
}, false);

// ウィンドウサイズが変更された場合の対応
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// アニメーション開始
animate();
