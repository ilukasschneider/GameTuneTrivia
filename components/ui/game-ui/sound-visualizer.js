"use client";
import * as THREE from "three";
import React from "react";
import PropTypes from "prop-types";
import { AspectRatio } from "@/components/ui/aspect-ratio";

class SoundVisualizer extends React.Component {
  componentDidMount() {
    console.log("time:", this.props.length);
    // Log to indicate the component has been mounted successfully
    console.log("Component did mount - Initializing scene");

    // Initialize the THREE.js scene
    this.scene = new THREE.Scene();

    // Set up an orthographic camera for the scene
    this.camera = new THREE.OrthographicCamera(
      -550, // left
      -250, // right
      1200, // top
      -200, // bottom
      200, // near
      5000, // far
    );
    // Position the camera in the scene
    this.camera.position.set(400, 1000, 300);
    // Make the camera look towards a specific point in the scene
    this.camera.lookAt(400, 0, 0);

    // Updated dimension calculation
    this.dimension = Math.min(
      window.innerHeight / 1.5,
      window.innerWidth / 1.5,
    );
    this.dimension = Math.max(this.dimension, 400); // Minimum size

    // Set up the WebGL renderer with antialiasing and transparency
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    // Set the size of the renderer based on the calculated dimension
    this.renderer.setSize(this.dimension, this.dimension);

    // Append the renderer's canvas element to the React component's mount point
    this.mount.appendChild(this.renderer.domElement);

    // Create an audio listener and add it to the camera
    const listener = new THREE.AudioListener();
    this.camera.add(listener);

    // Create an audio source and load the provided audio file
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(this.props.audio, function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(false);
      sound.setVolume(0.6);
    });
    this.sound = sound;
    this.sound.duration = this.props.length;

    // Log to indicate the sound has been initialized
    console.log("Sound initialized", this.sound);

    // Create an audio analyser for visualizing audio data
    this.analyser = new THREE.AudioAnalyser(sound, 128);

    // Create a group to hold the line meshes
    this.lines = new THREE.Group();
    this.scene.add(this.lines);

    // Variable to store the timestamp of the last animation frame
    this.last = 0;

    // Add a resize event listener to update the scene on window resize
    window.addEventListener("resize", this.onWindowResize.bind(this), false);

    // Start the animation loop
    console.log("Starting animation loop");
    this.animate();
  }

  animate(now) {
    this.sound.duration = this.props.length;
    this.theme = localStorage.getItem("theme");
    // Request the next animation frame
    this.frameId = requestAnimationFrame(this.animate.bind(this));
    // Render the scene with the current camera setup
    this.renderer.render(this.scene, this.camera);

    // Update the scene if enough time has passed since the last update
    if (!this.last || now - this.last >= 1) {
      this.last = now;
      // Get the current frequency data from the analyser
      const data = this.analyser.getFrequencyData();
      // Move existing lines in the scene
      this.moveLines();
      // Add a new line to the scene based on the frequency data
      this.addLine(data);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.length !== prevProps.length) {
      console.log(
        `Time updated from ${prevProps.length} to ${this.props.length}`,
      );
      // Update relevant properties or states based on the new length
      this.sound.duration = this.props.length;
      // Perform cleanup when the component is about to unmount
      cancelAnimationFrame(this.frameId);
      if (this.sound && this.sound.isPlaying) {
        this.sound.stop();
      }

      // Remove the renderer's canvas element from the DOM
      this.mount.removeChild(this.renderer.domElement);
      console.log("Component will unmount - Cleanup done");
      this.componentDidMount();
    }
  }

  addLine(fftValues) {
    // Create a plane geometry to represent an audio frequency line
    const planeGeometry = new THREE.PlaneGeometry(800 - 1, 1, 200 - 1, 1);

    // Create a mesh for the plane with basic material settings
    const plane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshBasicMaterial({
        color: this.theme == "dark" ? 0x0b0d0e : 0xf2f2f2, //First Value if dark, second if light
        wireframe: false, // No wireframe
        transparent: true, // Make the plane transparent
      }),
    );
    // Add the plane to the group of lines
    this.lines.add(plane);

    // Create a buffer geometry for a line that will sit on top of the plane
    const lineGeometry = new THREE.BufferGeometry();
    let lineVertices = [];
    // Populate the line geometry with vertices based on the plane's position
    for (let i = 0; i < 200; i++) {
      lineVertices.push(planeGeometry.attributes.position.array[3 * i]);
      lineVertices.push(planeGeometry.attributes.position.array[3 * i + 1]);
      lineVertices.push(planeGeometry.attributes.position.array[3 * i + 2]);
    }
    // Set the position attribute of the line geometry
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(lineVertices), 3),
    );

    // Create a material for the line
    const lineMat = new THREE.LineBasicMaterial({
      color: this.theme == "light" ? 0xc9d1cd : 0x242a27,
      transparent: false, // Line is not transparent
      opacity: 1, // Set the opacity of the line
    });
    // Create the line mesh and add it to the plane
    const line = new THREE.Line(lineGeometry, lineMat);
    plane.add(line);

    // Adjust the y position of vertices based on the FFT values
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
    // Initialize an array to hold planes that have moved beyond a certain point
    let planesThatHaveGoneFarEnough = [];
    // Iterate over each plane in the lines group
    this.lines.children.forEach((plane) => {
      // Move the plane and its line along the z-axis
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
    // Update the dimensions and renderer size when the window is resized
    if (this.mount) {
      this.dimension = Math.min(
        window.innerHeight / 1.5,
        window.innerWidth / 1.5,
      );
      this.dimension = Math.max(this.dimension, 400);
      this.renderer.setSize(this.dimension, this.dimension);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      // Log the new dimension for debugging purposes
      console.log("Window resized, new dimension:", this.dimension);
    }
  }

  onClick() {
    // Toggle sound playback on click
    if (this.sound.isPlaying) {
      this.sound.pause();
      console.log("Sound paused");
    } else {
      this.sound.play();
      console.log("Sound played");
    }
  }

  componentWillUnmount() {
    // Perform cleanup when the component is about to unmount
    cancelAnimationFrame(this.frameId);
    if (this.sound && this.sound.isPlaying) {
      this.sound.stop();
    }

    // Remove the renderer's canvas element from the DOM
    this.mount.removeChild(this.renderer.domElement);
    console.log("Component will unmount - Cleanup done");
  }

  render() {
    // Render a div that will serve as the mount point for the THREE.js scene
    return (
      <>
        <div
          style={{ cursor: "pointer" }}
          ref={(ref) => (this.mount = ref)}
          onClick={this.onClick.bind(this)}
          onWindowResize={this.onWindowResize.bind(this)}
        />
      </>
    );
  }
}

// Define prop types for the SoundVisualizer component
SoundVisualizer.propTypes = {
  audio: PropTypes.string.isRequired, // The audio prop is required and must be a string
  length: PropTypes.number.isRequired, // The duration prop is required and must be a number
};
export default SoundVisualizer;
