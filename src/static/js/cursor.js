import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';

// シーンとカメラの作成
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);  // カメラを少し離れた位置に配置

// レンダラーの作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// カメラのコントロール（OrbitControlsを使って視点を操作）
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);  // カメラが常に中心の立方体を見るように設定
controls.update();  // コントロールの初期設定を適用

// 回転する正方形の物体（立方体）
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);  // 正方形の立方体
const cubeMaterial = new THREE.MeshNormalMaterial();  // カラフルな面を持つ材質
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// 環境光を追加（オブジェクトを少し明るくする）
const light = new THREE.HemisphericLight(0xffffff, 0x444444, 1);
light.position.set(0, 1, 0);
scene.add(light);

// ウィンドウのリサイズ対応
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);

    // 立方体を回転させる
    cube.rotation.x += 0.01;  // X軸方向に回転
    cube.rotation.y += 0.01;  // Y軸方向にも回転

    controls.update();  // カメラコントロールを更新
    renderer.render(scene, camera);
}

animate();
