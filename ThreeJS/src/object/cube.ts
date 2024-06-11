import * as THREE from 'three';

export class Cube{
    cube: THREE.Mesh | null = null;

    constructor(scene: THREE.Scene){
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 0xffffff});

        this.cube = new THREE.Mesh(geometry, material);
        scene.add(this.cube);
    }

    render = () => {
        this.cube?.rotateY(-Math.PI / 360);
    }
}