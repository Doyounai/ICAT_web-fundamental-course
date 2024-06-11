import * as THREE from 'three';
import { Cube } from '../object/cube';

export class MainScene{
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    container: HTMLElement;

    cube: THREE.Mesh | null = null;

    cubeClass1: Cube | null = null;
    cubeClass2: Cube | null = null;
    cubeClass3: Cube | null = null;

    constructor(container: HTMLElement){
        // สร้าง class ที่จำเป็น
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.container = container;
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);

        // config renderer
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);

        this.onStart();

        this.container.addEventListener('click', this.onClick);

        // Render
        // this.renderer.render(this.scene, this.camera);
        this.renderer.setAnimationLoop(this.render);
    }

    onClick = (event: any) => {
        // คำนวณหาตำแหน่ง mouse ที่ normalize
        const rectBox = this.container.getBoundingClientRect();
        const mousePositionNormalize = {
            x: ((event.x - rectBox.left) / rectBox.width) * 2 - 1,
            y: -((event.y - rectBox.top) / rectBox.height) * 2 + 1
        }

        // สร้าง raycaster พร้อมใส่ config ให้มัน
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(mousePositionNormalize.x, mousePositionNormalize.y), this.camera);

        // สร้างตัวแปรมารับ object ที่ใดนคลิ๊ก
        const intersects = raycaster.intersectObjects( this.scene.children );

        if(intersects.length > 0){
            intersects[0].object.position.x = Math.random() * 10;
        }
    }

    onStart = () => {
        // สร้างส่วนประกอบพื้นฐานของกล่อง
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 

        // สร้าง mesh ของกล้อง
        this.cube = new THREE.Mesh(geometry, material);

        // เพิ่มกล้องเข้าไปใน scene
        this.scene.add(this.cube);
        this.camera.position.z = 5;
        this.camera.position.y = 2;
        this.camera.position.x = 2;

        // // 360 / 36 = 10
        // // this.cube.rotation.y = Math.PI / 3;

        const v0 = new THREE.Vector3(0, 0, 0);
        // const v1 = new THREE.Vector3(1, 1, 1);
        // const v2 = new THREE.Vector3(2, 2, 2);

        // const v3 = new THREE.Vector3();
        // v3.copy(v1);

        // // v1 + v2
        // // (v1.x + 3, v1.y + 3, v1.z + 3)
        // console.log(v3);

        this.cube.position.copy(v0);

        this.cubeClass1 = new Cube(this.scene);
        this.cubeClass2 = new Cube(this.scene);
        this.cubeClass3 = new Cube(this.scene);
    }

    render = () => {
        this.cube?.rotateY(Math.PI / 360);

        this.cubeClass1?.render();
        this.cubeClass2?.render();
        this.cubeClass3?.render();

        this.renderer.render(this.scene, this.camera);
    }
}