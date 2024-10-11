import * as THREE from 'three';

// Edgeクラス（2つの正方形を結ぶ矢印）
export class Edge {
  constructor(scene, startNode, endNode, color = 0xffff00, arrowThickness = 1) {
    this.scene = scene;
    this.startNode = startNode;
    this.endNode = endNode;

    // 矢印のベクトルを計算
    const startPos = this.startNode.getPosition();
    const endPos = this.endNode.getPosition();
    const direction = new THREE.Vector3().subVectors(endPos, startPos).normalize();
    const length = startPos.distanceTo(endPos);

    // 矢印（ArrowHelper）を作成
    this.arrowHelper = new THREE.ArrowHelper(direction, startPos, length, color);

    // 矢印の線の太さを設定
    this.setThickness(arrowThickness);

    // シーンに追加
    this.scene.add(this.arrowHelper);
  }

  // 矢印の太さを設定
  setThickness(thickness) {
    this.arrowHelper.line.material.linewidth = thickness;
  }

  // 矢印を再描画する（ノードの位置が変更されたときに更新）
  update() {
    const startPos = this.startNode.getPosition();
    const endPos = this.endNode.getPosition();
    const direction = new THREE.Vector3().subVectors(endPos, startPos).normalize();
    const length = startPos.distanceTo(endPos);

    // 矢印の再描画
    this.arrowHelper.position.copy(startPos);
    this.arrowHelper.setDirection(direction);
    this.arrowHelper.setLength(length);
  }
}

