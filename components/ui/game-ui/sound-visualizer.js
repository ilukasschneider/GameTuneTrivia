"use client";
import * as THREE from "three";
import React from "react";
import PropTypes from "prop-types";

class SoundVisualizer extends React.Component {
  componentDidMount() {
    console.log("Component did mount - Initializing scene");
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
      window.innerHeight / 1.5 - 50,
      window.innerWidth / 1.5,
    );

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(this.dimension, this.dimension);

    this.mount.appendChild(this.renderer.domElement);

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
    console.log("Sound initialized", this.sound);
    this.analyser = new THREE.AudioAnalyser(sound, 128);

    this.lines = new THREE.Group();
    this.scene.add(this.lines);

    this.last = 0;
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    this.mount.addEventListener("click", this.onClick.bind(this), false);

    console.log("Starting animation loop");
    this.animate();
  }

  animate(now) {
    this.frameId = requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);

    if (!this.last || now - this.last >= 1) {
      this.last = now;
      const data = this.analyser.getFrequencyData();
      this.moveLines();
      this.addLine(data);
    }
  }

  addLine(fftValues) {
    const planeGeometry = new THREE.PlaneGeometry(800 - 1, 1, 200 - 1, 1);

    const plane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshBasicMaterial({
        color: 0xf5f5f5,
        wireframe: false,
        transparent: true,
      }),
    );
    this.lines.add(plane);

    const lineGeometry = new THREE.BufferGeometry();
    let lineVertices = [];
    for (let i = 0; i < 200; i++) {
      lineVertices.push(planeGeometry.attributes.position.array[3 * i]);
      lineVertices.push(planeGeometry.attributes.position.array[3 * i + 1]);
      lineVertices.push(planeGeometry.attributes.position.array[3 * i + 2]);
    }
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(lineVertices), 3),
    );

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x1a1a1a,
      transparent: false,
      opacity: 0.8,
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
      y = Math.pow(y, 1.22);

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

      if (plane.geometry.attributes.position.array[2] <= -600) {
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
      console.log("Window resized, new dimension:", this.dimension);
    }
  }

  async onClick() {
    console.log("Canvas clicked");
    if (!this.isStarted) {
      this.isStarted = true;
      this.sound.play();
      console.log("Sound playback started");
    } else {
      if (this.sound.isPlaying) {
        this.sound.pause();
        console.log("Sound paused");
      } else {
        this.sound.play();
        console.log("Sound resumed");
      }
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    if (this.sound && this.sound.isPlaying) {
      this.sound.stop();
    }

    this.mount.removeChild(this.renderer.domElement);
    console.log("Component will unmount - Cleanup done");
  }

  render() {
    return (
      <>
        <div
          style={{ cursor: "pointer" }}
          className="place-content-center grid gap-3"
          ref={(ref) => (this.mount = ref)}
          onClick={this.onClick.bind(this)}
          onWindowResize={this.onWindowResize.bind(this)}
        />
      </>
    );
  }
}

SoundVisualizer.propTypes = {
  audio: PropTypes.string.isRequired,
};
export default SoundVisualizer;
