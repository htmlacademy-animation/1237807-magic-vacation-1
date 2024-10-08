import * as THREE from "three";

class Carpet extends THREE.Group {
  constructor(materialsFactory, config) {
    super();
    this.materialsFactory = materialsFactory;
    this.options = config.options;
    this.constructChildren();
  }

  constructChildren() {
    this.addCarpet();
  }

  addCarpet() {
    const {width, height, radius, segments, startAngle, endAngle, material} = this.options;
    const points = [];

    points.push(new THREE.Vector2(radius + width, 0));
    points.push(new THREE.Vector2(radius + width, height));
    points.push(new THREE.Vector2(radius, height));
    points.push(new THREE.Vector2(radius, 0));
    points.push(new THREE.Vector2(radius + width, 0));

    const phiStart = startAngle * Math.PI / 180;
    const phiLength = (endAngle - startAngle) * Math.PI / 180;
    const carpetGeometry = new THREE.LatheGeometry(
        points,
        segments,
        phiStart,
        phiLength
    );
    const carpetMaterial = this.materialsFactory.get(material);
    let mesh = new THREE.Mesh(
        carpetGeometry,
        carpetMaterial
    );

    this.add(mesh);
  }
}

export default Carpet;
