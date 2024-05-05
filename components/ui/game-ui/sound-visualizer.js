"use client";
import * as THREE from "three";
import React from "react";
import PropTypes from "prop-types";

class SoundVisualizer extends React.Component {
  async componentDidMount() {
    // Initialize the scene where all objects, cameras, and lights live.
    this.scene = new THREE.Scene();
    // Set up an orthographic camera with a specific view frustum configuration.
    this.camera = new THREE.OrthographicCamera(
      -550, // left
      -250, // right
      1200, // top
      -200, // bottom
      200, // near clipping plane
      5000, // far clipping plane
    );
    // Position the camera in the scene.
    this.camera.position.set(400, 1000, 300);
    // Make the camera look at a specific point in the scene.
    this.camera.lookAt(400, 0, 0);

    // Calculate the dimension for the renderer based on the window size.
    this.dimension = Math.min(
      window.innerHeight / 1.5 - 50,
      window.innerWidth / 1.5,
    );

    // Create a WebGL renderer with antialiasing enabled.
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    // Set the size of the rendering viewport.
    this.renderer.setSize(this.dimension, this.dimension);

    // Append the renderer's canvas element to the DOM.
    this.mount.appendChild(this.renderer.domElement);

    // Create an AudioListener and add it to the camera.
    const listener = new THREE.AudioListener();
    this.camera.add(listener);
    // Create a global audio source.
    const sound = new THREE.Audio(listener);
    // Load a sound and set it as the Audio object's buffer.
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(this.props.audio, function (buffer) {
      sound.setBuffer(buffer); // Set the buffer to the loaded audio data.
      sound.setLoop(true); // Enable looping of the audio.
      sound.setVolume(0.6);
    });
    this.sound = sound;
    // Create an analyser for the audio data.
    this.analyser = new THREE.AudioAnalyser(sound, 128);

    // Group to hold all lines in the scene.
    this.lines = new THREE.Group();
    // Add the group to the scene.
    this.scene.add(this.lines);

    // Timestamp for controlling the animation rate.
    this.last = 0;
    // Event listeners for resizing the window and clicking.
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    this.mount.addEventListener("click", this.onClick.bind(this), false);
  }

  animate(now) {
    // Request the next frame of the animation.
    this.frameId = requestAnimationFrame(this.animate.bind(this));
    // Render the scene from the perspective of the camera.
    this.renderer.render(this.scene, this.camera);

    // Check if enough time has passed to update the animation.
    if (!this.last || now - this.last >= 1) {
      this.last = now;
      // Get the frequency data from the analyser.
      const data = this.analyser.getFrequencyData();
      // Move existing lines deeper into the scene.
      this.moveLines();
      // Add a new line based on the frequency data.
      this.addLine(data);
    }
  }

  addLine(fftValues) {
    // Create a plane geometry to represent the line.
    const planeGeometry = new THREE.PlaneGeometry(800 - 1, 1, 200 - 1, 1);

    // Create a mesh for the plane with basic material.
    const plane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshBasicMaterial({
        color: 0xf5f5f5, // Black color
        wireframe: false, // No wireframe
        transparent: true, // Not transparent
      }),
    );
    // Add the plane mesh to the lines group.
    this.lines.add(plane);

    // Create a geometry for the line itself.
    const lineGeometry = new THREE.BufferGeometry();
    let lineVertices = [];
    for (let i = 0; i < 200; i++) {
      // Share the upper points of the plane to create the line vertices.
      lineVertices.push(planeGeometry.attributes.position.array[3 * i]); // x
      lineVertices.push(planeGeometry.attributes.position.array[3 * i + 1]); // y
      lineVertices.push(planeGeometry.attributes.position.array[3 * i + 2]); // z
    }
    // Set the line vertices to the line geometry.
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(lineVertices), 3),
    );

    // Create a material for the line with some transparency.
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x1a1a1a,
      transparent: false,
      opacity: 0.8,
    });
    // Create the line from the geometry and material.
    const line = new THREE.Line(lineGeometry, lineMat);

    // Add the line as a child of the plane mesh.
    plane.add(line);

    // Adjust the y position of each vertex based on the FFT values.
    for (let i = 0; i < 200; i++) {
      let y = 0;
      if (i >= 39 && i < 100) {
        y += fftValues[102 - i];
      } else if (i >= 100 && i < 161) {
        y += fftValues[i - 97];
      }
      y = Math.pow(y, 1.22); // Apply a power to exaggerate the effect.

      // Update the plane and line geometry with the new y positions.
      plane.geometry.attributes.position.array[i * 3 + 1] = y;
      line.geometry.attributes.position.array[i * 3 + 1] = y;
    }
  }

  moveLines() {
    let planesThatHaveGoneFarEnough = [];
    // Iterate through each plane in the lines group.
    this.lines.children.forEach((plane) => {
      for (let i = 0; i < 400; i++) {
        // Move each vertex of the plane and its line child deeper into the scene.
        plane.geometry.attributes.position.array[i * 3 + 2] -= 1;
        if (i < 200) {
          plane.children[0].geometry.attributes.position.array[i * 3 + 2] -= 1;
        }
      }

      // Check if the plane has moved far enough to be removed.
      if (plane.geometry.attributes.position.array[2] <= -600) {
        planesThatHaveGoneFarEnough.push(plane);
      } else {
        // Mark the geometries as needing an update.
        plane.geometry.attributes.position.needsUpdate = true;
        plane.children[0].geometry.attributes.position.needsUpdate = true;
      }
    });
    // Remove planes that have moved out of view.
    planesThatHaveGoneFarEnough.forEach((plane) => this.lines.remove(plane));
  }

  onWindowResize() {
    // Recalculate the renderer dimension based on the new window size.
    if (this.mount) {
      this.dimension = Math.min(
        window.innerHeight / 1.5,
        window.innerWidth / 1.5,
      );
      // Update the renderer size and pixel ratio.
      this.renderer.setSize(this.dimension, this.dimension);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }

  async onClick() {
    // Modified to handle initial start and subsequent play/pause actions.
    if (!this.isStarted) {
      // This block will only execute on the first click.
      this.isStarted = true; // Prevent re-entry into this initialization block.
      await this.sound.play(); // Start sound playback.
      this.animate(); // Start the animation loop.
    } else {
      // This runs on every click after the first.
      if (this.sound.isPlaying) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    }
  }

  componentWillUnmount() {
    // Clean up: cancel the animation frame, stop the sound, and remove event listeners.
    cancelAnimationFrame(this.frameId);
    if (this.sound && this.sound.isPlaying) {
      this.sound.stop();
    }

    // Remove the renderer's canvas from the DOM.
    this.mount.removeChild(this.renderer.domElement);
  }

  render() {
    // Render the component's HTML structure.
    return (
      <div
        style={{ cursor: "pointer" }} // CSS Styling to change the cursor to a pointer
        className="place-content-center grid gap-3"
        ref={(ref) => (this.mount = ref)}
        onClick={this.onClick.bind(this)}
        onWindowResize={this.onWindowResize.bind(this)}
      />
    );
  }
}

SoundVisualizer.propTypes = {
  audio: PropTypes.string.isRequired,
};
export default SoundVisualizer;
