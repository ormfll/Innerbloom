let illo = new Zdog.Illustration({
  element: 'canvas',
  zoom: 1.5,
  resize: true,
  dragRotate: false,
});

const flowerStyles = [
  { petal: '#556CBA', center: '#ffda7b' },
  { petal: '#556CBC', center: '#ffe68c' },
  { petal: '#556CBC', center: '#fff0a8' },
];

const centerBack = '#76A24C';
const stemColor = '#5e853a';
const strokeWidth = 8;

let petalsToAnimate = [];
let flowers = [];

// Grass
const grassColors = ['#8CC699', '#6fa36a', '#6fa35a', '#6fa34a'];
grassColors.forEach((color, index) => {
  new Zdog.Rect({
    addTo: illo,
    width: 1400,
    height: 150,
    translate: { y: 170 + index * 15, z: -100 },
    color: color,
    fill: true,
    stroke: 0,
  });
});

function createFlower({ x = 0, scale = 1, petalColor, centerFront }) {
  let flower = new Zdog.Anchor({
    addTo: illo,
    translate: { x, y: 70 },
    scale: scale,
  });

  // Centro frontal
  new Zdog.Hemisphere({
    addTo: flower,
    diameter: 40,
    stroke: false,
    color: centerFront,
    backface: centerBack,
    translate: { z: 0 },
  });

  let petalCount = 9;
  let radius = 10;

  for (let i = 0; i < petalCount; i++) {
    let angle = (Zdog.TAU / petalCount) * i;
    let petalAnchor = new Zdog.Anchor({
      addTo: flower,
      rotate: { z: angle },
    });

    let originalPath = [
      { x: 0, y: 0 },
      {
        bezier: [
          { x: 20, y: -22 },
          { x: 30, y: 20 },
          { x: 0, y: 28 },
        ],
      },
      {
        bezier: [
          { x: -2, y: 12 },
          { x: -20, y: -22 },
          { x: 0, y: 0 },
        ],
      },
    ];

    let petal = new Zdog.Shape({
      addTo: petalAnchor,
      path: JSON.parse(JSON.stringify(originalPath)),
      translate: { y: -radius },
      color: petalColor,
      fill: true,
      stroke: strokeWidth,
    });

    petalsToAnimate.push({ petal, originalPath });
  }

  // Back of the flower
  new Zdog.Hemisphere({
    addTo: flower,
    diameter: 40,
    stroke: false,
    color: centerBack,
    backface: centerBack,
    rotate: { x: Zdog.TAU / 2 },
    translate: { z: 0 },
  });

  // Stem
  new Zdog.Shape({
    addTo: flower,
    path: [
      { x: 0, y: 10, z: 0 },
      {
        bezier: [
          { x: 0, y: 150, z: 0 },
          { x: -5, y: 250, z: 0 },
          { x: 0, y: 430, z: 0 },
        ],
      },
    ],
    color: stemColor,
    stroke: 6,
    fill: false,
  });

  return flower;
}

// Flowers
flowers.push(createFlower({
  x: -250,
  scale: 0.8,
  petalColor: flowerStyles[0].petal,
  centerFront: flowerStyles[0].center,
}));
flowers.push(createFlower({
  x: 0,
  scale: 2,
  petalColor: flowerStyles[1].petal,
  centerFront: flowerStyles[1].center,
}));
flowers.push(createFlower({
  x: 250,
  scale: 0.6,
  petalColor: flowerStyles[2].petal,
  centerFront: flowerStyles[2].center,
}));

flowers.forEach((flower, index) => {
  flower.baseX = flower.translate.x;
  flower.baseY = flower.translate.y;
  flower.offset = index * 0.7;
});

//Clouds
let clouds = [];

function createCloud(x, y, scale = 1) {
  const cloud = new Zdog.Anchor({
    addTo: illo,
    translate: { x, y, z: -200 },
    scale,
  });

  const softBlue = '#eef7fa';

  const ellipseData = [
    { diameter: 20, x: -10 },
    { diameter: 30, x: 20 },
    { diameter: 40, x: 0 },
    { diameter: 30, x: 0 },
  ];

  ellipseData.forEach(({ diameter, x }) => {
    new Zdog.Ellipse({
      addTo: cloud,
      diameter,
      stroke: 18,
      color: softBlue,
      translate: { x },
    });
  });

  cloud.baseX = x;
  cloud.offset = Math.random() * Math.PI * 2;
  clouds.push(cloud);
}

createCloud(-220, -80, 0.6);
createCloud(180, -100, 1.1);
createCloud(-500, -20, 1.1);
createCloud(500, -10, 0.8);

//Butterflies
let butterflies = [];

function createButterfly({ x = 0, y = 0, color = '#cba6f7', offset = 0 }) {
  const butterfly = new Zdog.Anchor({
    addTo: illo,
    translate: { x, y, z: -180 },
    scale: 0.6,
  });

  // Body
  new Zdog.Shape({
    addTo: butterfly,
    path: [
      { y: -4 },
      { y: 4 },
    ],
    stroke: 4,
    color: '#4a4a4a',
  });

  // Wings anchor
  const wings = new Zdog.Anchor({ addTo: butterfly });

  // Left Wing
  new Zdog.Shape({
    addTo: wings,
    path: [
      { x: 0, y: 0 },
      {
        bezier: [
          { x: -10, y: -10 },
          { x: -20, y: 5 },
          { x: -8, y: 12 },
        ],
      },
      { x: 0, y: 0 },
    ],
    fill: true,
    color: color,
    stroke: 2,
  });

  // Right Wing
  new Zdog.Shape({
    addTo: wings,
    path: [
      { x: 0, y: 0 },
      {
        bezier: [
          { x: 10, y: -10 },
          { x: 20, y: 5 },
          { x: 8, y: 12 },
        ],
      },
      { x: 0, y: 0 },
    ],
    fill: true,
    color: color,
    stroke: 2,
  });

  butterflies.push({ butterfly, wings, offset });
}

// Butterfly copies
createButterfly({ x: -300, y: -100, color: '#F0A8D5', offset: 0 });
createButterfly({ x: 200, y: -20, color: '#EBAA46', offset: 1.5 });


let t = 0;
function animate() {
  t += 0.009;

//Petals breathing
  let scaleX = 2 + 0.8 * Math.sin(t * 0.9);
  let gust = Math.pow(Math.sin(t * 0.2), 3);
  let windPetal = Math.sin(t * 0.8) * gust * 3;

  petalsToAnimate.forEach(({ petal, originalPath }) => {
    const newPath = [
      { x: 0, y: 0 },
      {
        bezier: [
          { x: originalPath[1].bezier[0].x * scaleX + windPetal, y: originalPath[1].bezier[0].y },
          { x: originalPath[1].bezier[1].x * scaleX + windPetal, y: originalPath[1].bezier[1].y },
          { x: originalPath[1].bezier[2].x + windPetal * 0.5, y: originalPath[1].bezier[2].y },
        ],
      },
      {
        bezier: [
          { x: originalPath[2].bezier[0].x * scaleX + windPetal, y: originalPath[2].bezier[0].y },
          { x: originalPath[2].bezier[1].x * scaleX + windPetal, y: originalPath[2].bezier[1].y },
          { x: originalPath[2].bezier[2].x + windPetal * 0.5, y: originalPath[2].bezier[2].y },
        ],
      },
    ];

    petal.path = newPath;
    petal.updatePath();
  });

  // Flowers movement
  flowers.forEach(flower => {
    flower.translate.x = flower.baseX + Math.sin(t + flower.offset) * 3;
    flower.translate.y = flower.baseY + Math.cos(t * 0.6 + flower.offset) * 1.5;
  });

  // Clouds movement
  clouds.forEach(cloud => {
    cloud.translate.x = cloud.baseX + Math.sin(t + cloud.offset) * 20;
  });

  //Butterflies fly
  butterflies.forEach(({ butterfly, wings, offset }) => {
    let floatX = Math.sin(t * 0.2 + offset) * 500;
    let floatY = Math.cos(t * 0.1 + offset) * 90;
    butterfly.translate.x = floatX;
    butterfly.translate.y = -60 + floatY;
  
    // Wings flap
    let wingFlap = Math.sin(t * 3 + offset) * 1;
    wings.rotate.z = wingFlap;
  });
  

  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}

animate();
