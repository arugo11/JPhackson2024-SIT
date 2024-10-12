import * as THREE from 'three';

export class Edge {
  constructor(scene, startNode, endNode, color = 0xffff00, arrowThickness = 0.1) {
    this.scene = scene;
    this.startNode = startNode;
    this.endNode = endNode;
    this.color = color;
    this.arrowThickness = arrowThickness;

    // 矢印を作成してシーンに追加
    this.createArrow();
  }

  // 矢印の作成
  createArrow() {
    const startPos = this.startNode.getEdgePoint(this.endNode.getPosition()); // 開始位置は正方形の端
    const endPos = this.endNode.getEdgePoint(this.startNode.getPosition());   // 終了位置も正方形の端
    const direction = new THREE.Vector3().subVectors(endPos, startPos).normalize(); // 開始点から終了点への方向ベクトル
    const length = startPos.distanceTo(endPos); // 開始点と終了点の距離

    // --- 矢印の胴体部分を作成（CylinderGeometry） ---
    const cylinderLength = length - 0.5; // 胴体部分の長さを先端部分を除いたものに設定
    const cylinderGeometry = new THREE.CylinderGeometry(this.arrowThickness, this.arrowThickness, cylinderLength, 32);
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: this.color });
    this.cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

    // 胴体部分の位置を設定（開始点と終了点の中間位置）
    this.cylinder.position.copy(startPos).add(direction.clone().multiplyScalar(cylinderLength / 2));

    // 胴体部分の向きを設定（矢印が正しい方向を向くように回転）
    this.cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction); // Y軸からdirectionベクトルに向けて回転

    // --- 矢印の先端部分を作成（ConeGeometry） ---
    const coneGeometry = new THREE.ConeGeometry(this.arrowThickness * 2, 0.5, 32); // 円錐（先端）
    const coneMaterial = new THREE.MeshBasicMaterial({ color: this.color });
    this.cone = new THREE.Mesh(coneGeometry, coneMaterial);

    // 先端部分の位置を設定（終了点に配置し、胴体部分の終わりにぴったりくっつける）
    this.cone.position.copy(startPos).add(direction.clone().multiplyScalar(cylinderLength));

    // 先端部分の向きを設定（終了点に向くように回転）
    this.cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction); // Y軸からdirectionベクトルに向けて回転

    // シーンに追加
    this.scene.add(this.cylinder);
    this.scene.add(this.cone);
  }

  // 矢印の太さを設定
  setThickness(thickness) {
    this.arrowThickness = thickness;
    this.update();
  }

  // 矢印を再描画する（ノードの位置が変更されたときに更新）
  update() {
    // 矢印を再生成
    this.scene.remove(this.cylinder);
    this.scene.remove(this.cone);
    this.createArrow();
  }
}
