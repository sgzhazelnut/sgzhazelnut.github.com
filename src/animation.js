"use strict";

var hasWebGL = function () {
    // Create canvas element. The canvas is not added to the
    // document itself, so it is never displayed in the
    // browser window.
    var canvas = document.createElement("canvas");
    // Get WebGLRenderingContext from canvas element.
    var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    // Report the result.
    return gl && gl instanceof WebGLRenderingContext;
};

var startup = (function () {
    const COLOR = 0x009b64;
    const divId = "animation";
    const cameraZoom = 2;
    // Vars
    var isResizing = false;
    var t = 0.0;
    var renderer;
    var composer;
    var edges = [];
    var vertexCoords = [];
    var vertexCoords2 = [];
    var vertexJoins = [];
    var path = function (p1, p2, p3, p4, i) {
        var vector = new THREE.Vector3(0, 0, 0);
        if (i >= 0 && i < 0.25) {
            vector.x = p4.x + (p1.x - p4.x) * i * 4;
            vector.y = p4.y + (p1.y - p4.y) * i * 4;
            vector.z = p4.z + (p1.z - p4.z) * i * 4;
        } else if (i >= 0.25 && i < 0.5) {
            vector.x = p1.x + (p2.x - p1.x) * (i - 0.25) * 4;
            vector.y = p1.y + (p2.y - p1.y) * (i - 0.25) * 4;
            vector.z = p1.z + (p2.z - p1.z) * (i - 0.25) * 4;
        } else if (i >= 0.5 && i < 0.75) {
            vector.x = p2.x + (p3.x - p2.x) * (i - 0.5) * 4;
            vector.y = p2.y + (p3.y - p2.y) * (i - 0.5) * 4;
            vector.z = p2.z + (p3.z - p2.z) * (i - 0.5) * 4;
        } else if (i >= 0.75 && i < 1.0) {
            vector.x = p3.x + (p4.x - p3.x) * (i - 0.75) * 4;
            vector.y = p3.y + (p4.y - p3.y) * (i - 0.75) * 4;
            vector.z = p3.z + (p4.z - p3.z) * (i - 0.75) * 4;
        }
        return vector;
    }
    // Init
    var init = function () {
        vertexCoords[0] = new THREE.Vector3(-50, -50, -50);
        vertexCoords[1] = new THREE.Vector3(50, -50, -50);
        vertexCoords[2] = new THREE.Vector3(50, 50, -50);
        vertexCoords[3] = new THREE.Vector3(-50, 50, -50);
        vertexCoords[4] = new THREE.Vector3(-50, -50, 50);
        vertexCoords[5] = new THREE.Vector3(50, -50, 50);
        vertexCoords[6] = new THREE.Vector3(50, 50, 50);
        vertexCoords[7] = new THREE.Vector3(-50, 50, 50);
        vertexCoords[8] = new THREE.Vector3(-100, -100, -100);
        vertexCoords[9] = new THREE.Vector3(100, -100, -100);
        vertexCoords[10] = new THREE.Vector3(100, 100, -100);
        vertexCoords[11] = new THREE.Vector3(-100, 100, -100);
        vertexCoords[12] = new THREE.Vector3(-100, -100, 100);
        vertexCoords[13] = new THREE.Vector3(100, -100, 100);
        vertexCoords[14] = new THREE.Vector3(100, 100, 100);
        vertexCoords[15] = new THREE.Vector3(-100, 100, 100);

        vertexJoins = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [0, 4], [1, 5], [2, 6], [3, 7],
            [4, 5], [5, 6], [6, 7], [7, 4],

            [0, 8], [1, 9], [2, 10], [3, 11],
            [4, 12], [5, 13], [6, 14], [7, 15],

            [8, 9], [9, 10], [10, 11], [11, 8],
            [8, 12], [9, 13], [10, 14], [11, 15],
            [12, 13], [13, 14], [14, 15], [15, 12]
        ];
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(0x000000));
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        document.getElementById(divId).appendChild(renderer.domElement);

        var camera = new THREE.OrthographicCamera(width / - cameraZoom, width / cameraZoom, height / cameraZoom, height / - cameraZoom, 1, 1000);
        camera.position.set(200, -100, -300);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        var scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 1, 1000);

        for (let i = 0; i < vertexJoins.length; i++) {
            var geometry = new THREE.Geometry();
            geometry.vertices.push(vertexCoords[vertexJoins[i][0]]);
            geometry.vertices.push(vertexCoords[vertexJoins[i][1]]);
            let line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: COLOR,
                linewidth: 1
            }));
            line.computeLineDistances();
            scene.add(line);
            edges[i] = line;
        }

        composer = new THREE.EffectComposer(renderer);
        composer.addPass(new THREE.RenderPass(scene, camera));

        var glitchPass = new THREE.GlitchPass();
        glitchPass.renderToScreen = true;
        composer.addPass(glitchPass);
        window.addEventListener("resize", prepareResize);
    };

    var prepareResize = function () {
        if (!isResizing) {
            isResizing = true;
            setTimeout(resetCanvasSize, 250);
        }
    };

    var resetCanvasSize = function () {
        var element = document.getElementById(divId);
        while (element.hasChildNodes()) {
            element.removeChild(element.lastChild);
        }
        init();
        isResizing = false;
    };

    // Render
    var render = function () {
        t = (t + 0.002) % 1;

        vertexCoords2[0] = path(vertexCoords[8], vertexCoords[9], vertexCoords[1], vertexCoords[0], t);
        vertexCoords2[1] = path(vertexCoords[0], vertexCoords[8], vertexCoords[9], vertexCoords[1], t);
        vertexCoords2[9] = path(vertexCoords[1], vertexCoords[0], vertexCoords[8], vertexCoords[9], t);
        vertexCoords2[8] = path(vertexCoords[9], vertexCoords[1], vertexCoords[0], vertexCoords[8], t);

        vertexCoords2[3] = path(vertexCoords[11], vertexCoords[10], vertexCoords[2], vertexCoords[3], t);
        vertexCoords2[2] = path(vertexCoords[3], vertexCoords[11], vertexCoords[10], vertexCoords[2], t);
        vertexCoords2[10] = path(vertexCoords[2], vertexCoords[3], vertexCoords[11], vertexCoords[10], t);
        vertexCoords2[11] = path(vertexCoords[10], vertexCoords[2], vertexCoords[3], vertexCoords[11], t);

        vertexCoords2[4] = path(vertexCoords[12], vertexCoords[13], vertexCoords[5], vertexCoords[4], t);
        vertexCoords2[5] = path(vertexCoords[4], vertexCoords[12], vertexCoords[13], vertexCoords[5], t);
        vertexCoords2[13] = path(vertexCoords[5], vertexCoords[4], vertexCoords[12], vertexCoords[13], t);
        vertexCoords2[12] = path(vertexCoords[13], vertexCoords[5], vertexCoords[4], vertexCoords[12], t);

        vertexCoords2[7] = path(vertexCoords[15], vertexCoords[14], vertexCoords[6], vertexCoords[7], t);
        vertexCoords2[6] = path(vertexCoords[7], vertexCoords[15], vertexCoords[14], vertexCoords[6], t);
        vertexCoords2[14] = path(vertexCoords[6], vertexCoords[7], vertexCoords[15], vertexCoords[14], t);
        vertexCoords2[15] = path(vertexCoords[14], vertexCoords[6], vertexCoords[7], vertexCoords[15], t);

        requestAnimationFrame(render);

        for (let i = 0; i < edges.length; i++) {

            edges[i].geometry.vertices[0] = vertexCoords2[vertexJoins[i][0]];
            edges[i].geometry.vertices[1] = vertexCoords2[vertexJoins[i][1]];
            edges[i].rotation.x = 0;
            edges[i].rotation.y = 0;
            edges[i].rotation.z = 0;
            edges[i].geometry.verticesNeedUpdate = true;
        }

        composer.render();
    };
    return function () {
        init();
        render();
    };
})();

hasWebGL() && (window.onload = startup);
