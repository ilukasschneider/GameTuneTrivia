import React from "react";
import * as THREE from "three";
import PropTypes from "prop-types";
class SoundVisualizer extends React.Component {
  componentDidMount() {
    // Basic THREE.js scene and render setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      -550,
      -250,
      1200,
      -200,
      200,
      5000,
    );
    this.camera.position.set(400, 1000, 300);
    this.camera.lookAt(400, 0, 0);

    this.dimension = Math.min(
      window.innerHeight / 1.5,
      window.innerWidth / 1.5,
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.dimension, this.dimension);
    this.mount.appendChild(this.renderer.domElement);

    // THREE.js audio and sound setup
    const listener = new THREE.AudioListener();
    this.camera.add(listener);
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(this.props.audio, function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.6);
    });
    this.sound = sound;
    this.analyser = new THREE.AudioAnalyser(sound, 128);

    // Line setup
    this.lines = new THREE.Group();
    this.scene.add(this.lines);

    this.last = 0;

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    this.mount.addEventListener("click", this.onClick.bind(this), false);

    this.animate();
  }

  animate(now) {
    this.frameId = requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);

    if (!this.last || now - this.last >= 5) {
      this.last = now;
      const data = this.analyser.getFrequencyData();
      this.moveLines();
      this.addLine(data);
    }
  }

  addLine(fftValues) {
    const planeGeometry = new THREE.PlaneGeometry(200 - 1, 1, 200 - 1, 1);

    const plane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: false,
        transparent: false,
      }),
    );
    this.lines.add(plane);

    const lineGeometry = new THREE.BufferGeometry();
    let lineVertices = [];
    for (let i = 0; i < 200; i++) {
      lineVertices.push(planeGeometry.attributes.position.array[3 * i]); // share the upper points of the plane
      lineVertices.push(planeGeometry.attributes.position.array[3 * i + 1]);
      lineVertices.push(planeGeometry.attributes.position.array[3 * i + 2]);
    }
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(lineVertices), 3),
    );

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xe1e1e1,
      transparent: true,
      opacity: 0.57,
    });
    const line = new THREE.Line(lineGeometry, lineMat);

    plane.add(line);

    for (let i = 0; i < 200; i++) {
      let y = 0;
      if (i >= 39 && i < 100) {
        y += fftValues[102 - i];
      } else if (i >= 100 && i < 161) {
        y += fftValues[i - 97];
      }
      y = Math.pow(y, 1.2);

      plane.geometry.attributes.position.array[i * 3 + 1] = y;
      line.geometry.attributes.position.array[i * 3 + 1] = y;
    }
  }

  moveLines() {
    let planesThatHaveGoneFarEnough = [];
    this.lines.children.forEach((plane) => {
      for (let i = 0; i < 400; i++) {
        plane.geometry.attributes.position.array[i * 3 + 2] -= 1;
        if (i < 200) {
          plane.children[0].geometry.attributes.position.array[i * 3 + 2] -= 1;
        }
      }

      if (plane.geometry.attributes.position.array[2] <= -1000) {
        planesThatHaveGoneFarEnough.push(plane);
      } else {
        plane.geometry.attributes.position.needsUpdate = true;
        plane.children[0].geometry.attributes.position.needsUpdate = true;
      }
    });
    planesThatHaveGoneFarEnough.forEach((plane) => this.lines.remove(plane));
  }

  onWindowResize() {
    if (this.mount) {
      this.dimension = Math.min(
        window.innerHeight / 1.5,
        window.innerWidth / 1.5,
      );
      this.renderer.setSize(this.dimension, this.dimension);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }

  onClick() {
    if (this.sound.isPlaying) {
      this.sound.pause();
    } else {
      this.sound.play();
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    if (this.sound && this.sound.isPlaying) {
      this.sound.stop();
    }

    window.removeEventListener("resize", this.onWindowResize.bind(this));
    this.mount.removeEventListener("click", this.onClick.bind(this));
    this.mount.removeChild(this.renderer.domElement);
  }

  render() {
    return (
      <div className="place-content-center grid gap-3">
        {/* The actaual canvas for three.js */}
        <div
          className="flex justify-center "
          ref={(ref) => (this.mount = ref)}
          onClick={this.onClick.bind(this)}
          onWindowResize={this.onWindowResize.bind(this)}
        />
      </div>
    );
  }
}
SoundVisualizer.propTypes = {
  audio: PropTypes.string.isRequired,
};
export default SoundVisualizer;
