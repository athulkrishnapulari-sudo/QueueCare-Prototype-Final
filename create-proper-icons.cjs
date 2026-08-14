const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create proper PNG files with correct dimensions
function createSolidColorPNG(width, height, r, g, b) {
  // PNG signature
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk
  const ihdr = Buffer.alloc(25);
  ihdr.writeUInt32BE(13, 0);
  ihdr.write('IHDR', 4);
  ihdr.writeUInt32BE(width, 8);
  ihdr.writeUInt32BE(height, 12);
  ihdr[16] = 8; // bit depth
  ihdr[17] = 2; // color type (RGB)
  ihdr[18] = 0; // compression
  ihdr[19] = 0; // filter
  ihdr[20] = 0; // interlace
  
  // Calculate CRC32 for IHDR
  const crc32 = (buf) => {
    const CRC_TABLE = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
      }
      CRC_TABLE[n] = c;
    }
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ buf[i]) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
  };
  
  const ihdrCrc = Buffer.alloc(4);
  ihdrCrc.writeUInt32BE(crc32(ihdr.slice(4)), 0);
  
  // IDAT chunk - compressed pixel data
  // For a solid color, each row is: filter_type(1 byte) + RGB pixels
  const pixelData = Buffer.alloc(height * (1 + width * 3));
  let idx = 0;
  for (let y = 0; y < height; y++) {
    pixelData[idx++] = 0; // filter type: None
    for (let x = 0; x < width; x++) {
      pixelData[idx++] = r;
      pixelData[idx++] = g;
      pixelData[idx++] = b;
    }
  }
  
  const compressed = zlib.deflateSync(pixelData);
  const idat = Buffer.alloc(12 + compressed.length);
  idat.writeUInt32BE(compressed.length, 0);
  idat.write('IDAT', 4);
  compressed.copy(idat, 8);
  const idatCrc = Buffer.alloc(4);
  idatCrc.writeUInt32BE(crc32(idat.slice(4, 8 + compressed.length)), 0);
  
  // IEND chunk
  const iend = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82]);
  
  return Buffer.concat([signature, ihdr, ihdrCrc, idat, idatCrc, iend]);
}

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create blue (#2563eb) icons
const blue = { r: 0x25, g: 0x63, b: 0xeb };

const sizes = [192, 512];
sizes.forEach(size => {
  const png = createSolidColorPNG(size, size, blue.r, blue.g, blue.b);
  fs.writeFileSync(path.join(publicDir, `icon-${size}x${size}.png`), png);
  console.log(`✓ Created icon-${size}x${size}.png (${png.length} bytes)`);
  
  fs.writeFileSync(path.join(publicDir, `icon-maskable-${size}x${size}.png`), png);
  console.log(`✓ Created icon-maskable-${size}x${size}.png (${png.length} bytes)`);
});

console.log('\n✅ High-quality icons created successfully!');
