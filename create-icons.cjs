const fs = require('fs');
const path = require('path');

// Create placeholder PNG icons
const createPlaceholderPNG = (size) => {
  // Minimal valid PNG: solid blue square
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]); // PNG signature
  
  // IHDR chunk
  const width = Buffer.alloc(4);
  width.writeUInt32BE(size);
  const height = Buffer.alloc(4);
  height.writeUInt32BE(size);
  
  const ihdr = Buffer.concat([
    Buffer.from([0, 0, 0, 13]), // chunk length
    Buffer.from('IHDR'),
    width,
    height,
    Buffer.from([8, 2, 0, 0, 0]) // 8-bit RGB
  ]);
  
  const ihdrcrc = Buffer.from([0x90, 0x77, 0x3d, 0xfd]);
  
  // IDAT chunk with solid blue color
  const idat = Buffer.concat([
    Buffer.from([0, 0, 0, 22]), // chunk length
    Buffer.from('IDAT'),
    Buffer.from([120, 156, 99, 252, 207, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 0])
  ]);
  
  const idatcrc = Buffer.from([0x5e, 0xf8, 0x97, 0x6f]);
  
  // IEND chunk
  const iend = Buffer.concat([
    Buffer.from([0, 0, 0, 0]),
    Buffer.from('IEND'),
    Buffer.from([0xae, 0x42, 0x60, 0x82])
  ]);
  
  return Buffer.concat([header, ihdr, ihdrcrc, idat, idatcrc, iend]);
};

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create placeholder icons
[192, 512].forEach(size => {
  const png = createPlaceholderPNG(size);
  fs.writeFileSync(path.join(publicDir, `icon-${size}x${size}.png`), png);
  console.log(`✓ Created public/icon-${size}x${size}.png`);
  fs.writeFileSync(path.join(publicDir, `icon-maskable-${size}x${size}.png`), png);
  console.log(`✓ Created public/icon-maskable-${size}x${size}.png`);
});

console.log('\nIcons created successfully!');
