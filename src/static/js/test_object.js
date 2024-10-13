import * as THREE from "three";

// グローバル変数からシーンを取得して平面を追加
window.addEventListener("load", () => {
    const scene = window.scene;  // script.jsで設定されたグローバル変数を参照

    if (scene) {
        const planeGeometry = new THREE.PlaneGeometry(600, 600);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);
    } else {
        console.error("Scene not found.");
    }
});
