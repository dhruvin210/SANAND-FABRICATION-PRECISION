import * as THREE from 'three';

export class CadViewer3D {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.options = {
      initialMaterial: 'aluminum',
      showGrid: true,
      autoRotate: true,
      ...options
    };

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.modelGroup = null;
    this.gridHelper = null;
    this.currentMaterialMode = 'metallic'; // 'metallic', 'wireframe', 'xray'
    this.materialPreset = this.options.initialMaterial;
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.autoRotateSpeed = 0.005;
    this.userInteracting = false;
    this.interactionTimeout = null;

    this.init();
  }

  init() {
    if (!this.container) return;
    this.container.innerHTML = '';

    const width = this.container.clientWidth || 400;
    const height = this.container.clientHeight || 300;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0d1527); // Deep industrial navy dark slate

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    this.camera.position.set(70, 50, 90);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting
    this.setupLighting();

    // 5. Metrology Grid Platform
    this.setupGrid();

    // 6. Build High-Detail CAD Manifold Model
    this.buildCadModel();

    // 7. Event listeners
    this.setupEventListeners();

    // 8. Animation loop
    this.animate = this.animate.bind(this);
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    // Key directional light (cool white industrial spotlight)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(60, 90, 70);
    keyLight.castShadow = true;
    this.scene.add(keyLight);

    // Rim light (subtle blue industrial accent)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    rimLight.position.set(-60, 40, -60);
    this.scene.add(rimLight);

    // Fill light (warm soft reflection from underneath floor)
    const fillLight = new THREE.DirectionalLight(0x94a3b8, 1.0);
    fillLight.position.set(0, -40, 50);
    this.scene.add(fillLight);
  }

  setupGrid() {
    // Technical CMM inspection surface grid
    const size = 120;
    const divisions = 24;
    this.gridHelper = new THREE.GridHelper(size, divisions, 0x38bdf8, 0x1e293b);
    this.gridHelper.position.y = -18;
    this.scene.add(this.gridHelper);
  }

  getMaterial(presetName, mode = 'metallic') {
    if (mode === 'wireframe') {
      return new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        wireframeLinewidth: 1.5
      });
    }

    if (mode === 'xray') {
      return new THREE.MeshPhysicalMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.45,
        roughness: 0.1,
        transmission: 0.8,
        ior: 1.5
      });
    }

    // PBR Metallic Shaders
    switch (presetName) {
      case 'aluminum':
        return new THREE.MeshStandardMaterial({
          color: 0xd4d8df, // Aerospace Aluminum 6061 silver
          metalness: 0.85,
          roughness: 0.28
        });
      case 'stainless':
        return new THREE.MeshStandardMaterial({
          color: 0xeff1f5, // Stainless Steel 304 lustrous
          metalness: 0.92,
          roughness: 0.20
        });
      case 'anodize-blue':
        return new THREE.MeshStandardMaterial({
          color: 0x1d4ed8, // Deep blue anodic oxide
          metalness: 0.45,
          roughness: 0.32
        });
      case 'anodize-black':
        return new THREE.MeshStandardMaterial({
          color: 0x1e2229, // Matte black anodized
          metalness: 0.35,
          roughness: 0.40
        });
      case 'titanium':
        return new THREE.MeshStandardMaterial({
          color: 0xbfb393, // Titanium Ti-6Al-4V champagne gold hue
          metalness: 0.78,
          roughness: 0.30
        });
      case 'delrin':
        return new THREE.MeshStandardMaterial({
          color: 0x111827, // Delrin / POM engineering black plastic
          metalness: 0.05,
          roughness: 0.55
        });
      default:
        return new THREE.MeshStandardMaterial({
          color: 0xd4d8df,
          metalness: 0.85,
          roughness: 0.28
        });
    }
  }

  buildCadModel() {
    this.modelGroup = new THREE.Group();

    const mat = this.getMaterial(this.materialPreset, this.currentMaterialMode);

    // 1. Main body: Machined Manifold Block
    const baseGeo = new THREE.BoxGeometry(48, 22, 34);
    const baseMesh = new THREE.Mesh(baseGeo, mat);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    this.modelGroup.add(baseMesh);

    // 2. Stepped cylindrical boss / flange (top hydraulic port)
    const bossGeo = new THREE.CylinderGeometry(11, 11, 12, 32);
    const bossMesh = new THREE.Mesh(bossGeo, mat);
    bossMesh.position.set(0, 15, 0);
    this.modelGroup.add(bossMesh);

    // 3. Central bore through port
    const boreGeo = new THREE.CylinderGeometry(6, 6, 14, 32);
    const darkInteriorMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      metalness: 0.9,
      roughness: 0.6
    });
    const boreMesh = new THREE.Mesh(boreGeo, darkInteriorMat);
    boreMesh.position.set(0, 16, 0);
    this.modelGroup.add(boreMesh);

    // 4. Side mounting flanges with counterbore holes
    const flangeLeftGeo = new THREE.BoxGeometry(10, 14, 28);
    const flangeLeft = new THREE.Mesh(flangeLeftGeo, mat);
    flangeLeft.position.set(-27, -4, 0);
    this.modelGroup.add(flangeLeft);

    const flangeRightGeo = new THREE.BoxGeometry(10, 14, 28);
    const flangeRight = new THREE.Mesh(flangeRightGeo, mat);
    flangeRight.position.set(27, -4, 0);
    this.modelGroup.add(flangeRight);

    // 5. Counterbore mounting holes on left & right
    const holeGeo = new THREE.CylinderGeometry(2.5, 2.5, 16, 16);
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x050811 });

    const hole1 = new THREE.Mesh(holeGeo, holeMat);
    hole1.position.set(-27, -4, 7);
    this.modelGroup.add(hole1);

    const hole2 = new THREE.Mesh(holeGeo, holeMat);
    hole2.position.set(-27, -4, -7);
    this.modelGroup.add(hole2);

    const hole3 = new THREE.Mesh(holeGeo, holeMat);
    hole3.position.set(27, -4, 7);
    this.modelGroup.add(hole3);

    const hole4 = new THREE.Mesh(holeGeo, holeMat);
    hole4.position.set(27, -4, -7);
    this.modelGroup.add(hole4);

    // 6. Machined pocket / light-weighting cavity on front face
    const pocketGeo = new THREE.BoxGeometry(26, 12, 4);
    const pocketMesh = new THREE.Mesh(pocketGeo, darkInteriorMat);
    pocketMesh.position.set(0, -2, 16);
    this.modelGroup.add(pocketMesh);

    // 7. Beveled aerospace cooling fins on rear
    for (let i = -10; i <= 10; i += 5) {
      const finGeo = new THREE.BoxGeometry(32, 2, 8);
      const finMesh = new THREE.Mesh(finGeo, mat);
      finMesh.position.set(0, i, -18);
      this.modelGroup.add(finMesh);
    }

    // Slightly elevate model above metrology grid
    this.modelGroup.position.y = 0;
    this.scene.add(this.modelGroup);

    this.camera.lookAt(0, 0, 0);
  }

  updateMaterial(presetName) {
    this.materialPreset = presetName;
    this.applyMaterialToModel();
  }

  setShadingMode(mode) {
    this.currentMaterialMode = mode;
    this.applyMaterialToModel();
  }

  applyMaterialToModel() {
    if (!this.modelGroup) return;
    const newMat = this.getMaterial(this.materialPreset, this.currentMaterialMode);
    this.modelGroup.traverse((child) => {
      if (child.isMesh && child.material.color.getHex() !== 0x050811 && child.material.color.getHex() !== 0x090d16) {
        child.material = newMat;
      }
    });
  }

  setViewPreset(preset) {
    this.userInteracting = true;
    clearTimeout(this.interactionTimeout);
    this.interactionTimeout = setTimeout(() => {
      this.userInteracting = false;
    }, 4000);

    const distance = 110;
    switch (preset) {
      case 'iso':
        this.camera.position.set(70, 50, 90);
        break;
      case 'top':
        this.camera.position.set(0.001, distance, 0);
        break;
      case 'front':
        this.camera.position.set(0, 0, distance);
        break;
      case 'right':
        this.camera.position.set(distance, 0, 0);
        break;
    }
    this.camera.lookAt(0, 0, 0);
  }

  setupEventListeners() {
    const dom = this.renderer.domElement;

    dom.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.userInteracting = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      clearTimeout(this.interactionTimeout);
      this.interactionTimeout = setTimeout(() => {
        this.userInteracting = false;
      }, 4000);
    });

    dom.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      if (this.modelGroup) {
        this.modelGroup.rotation.y += deltaX * 0.01;
        this.modelGroup.rotation.x += deltaY * 0.01;
      }

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Zoom on wheel
    dom.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.05;
      const newFov = THREE.MathUtils.clamp(this.camera.fov + zoomFactor, 20, 75);
      this.camera.fov = newFov;
      this.camera.updateProjectionMatrix();
    }, { passive: false });

    // Touch events for mobile
    let initialPinchDistance = null;
    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.userInteracting = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        initialPinchDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    });

    dom.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.isDragging && this.modelGroup) {
        const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
        const deltaY = e.touches[0].clientY - this.previousMousePosition.y;
        this.modelGroup.rotation.y += deltaX * 0.012;
        this.modelGroup.rotation.x += deltaY * 0.012;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2 && initialPinchDistance) {
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const diff = initialPinchDistance - currentDistance;
        this.camera.fov = THREE.MathUtils.clamp(this.camera.fov + diff * 0.05, 20, 75);
        this.camera.updateProjectionMatrix();
        initialPinchDistance = currentDistance;
      }
    });

    dom.addEventListener('touchend', () => {
      this.isDragging = false;
      initialPinchDistance = null;
      clearTimeout(this.interactionTimeout);
      this.interactionTimeout = setTimeout(() => {
        this.userInteracting = false;
      }, 4000);
    });

    // Resize handler
    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this.resizeObserver.observe(this.container);
  }

  handleResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Smooth auto-rotation when user isn't interacting
    if (!this.userInteracting && this.options.autoRotate && this.modelGroup) {
      this.modelGroup.rotation.y += this.autoRotateSpeed;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
  }
}
