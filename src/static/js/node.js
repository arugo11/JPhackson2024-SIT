import * as THREE from 'three';

export class Node {
  constructor(scene, camera, imageUrl = '', text = '', size = 1) {
    this.scene = scene;
    this.camera = camera;
    this.size = size;
    this.text = text;

    // 正方形(PlaneGeometry)を作成し、画像をマテリアルとして貼り付ける
    const geometry = new THREE.PlaneGeometry(this.size, this.size);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageUrl);
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    this.plane = new THREE.Mesh(geometry, material);

    // シーンに正方形を追加
    this.scene.add(this.plane);
  }

  // カメラに対して常に平行に保つ
  alignWithCamera() {
    this.plane.quaternion.copy(this.camera.quaternion);
  }

  // 正方形の位置を設定
  setPosition(x, y, z) {
    this.plane.position.set(x, y, z);
  }

  // 正方形のサイズを設定
  setSize(newSize) {
    this.plane.scale.set(newSize, newSize, 1);
  }
}