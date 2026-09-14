export function asU8(v){if(v instanceof Uint8Array)return v;if(v instanceof ArrayBuffer)return new Uint8Array(v);if(ArrayBuffer.isView(v))return new Uint8Array(v.buffer,v.byteOffset,v.byteLength);throw new TypeError('Expected an ArrayBuffer or Uint8Array');}
export function u8ToBits(v){const b=asU8(v),r=new Uint8Array(b.length*8);for(let i=0;i<b.length;i++)for(let j=0;j<8;j++)r[i*8+j]=(b[i]>>>(7-j))&1;return r;}
export function bitsToBytes(v){const b=asU8(v);if(b.length%8)throw new RangeError('Bit count must be a multiple of 8');const r=new Uint8Array(b.length/8);for(let i=0;i<b.length;i++){if(b[i]!==0&&b[i]!==1)throw new RangeError('Bits may only contain 0 or 1');r[i>>>3]|=b[i]<<(7-(i&7));}return r;}
export function u32be(n){if(!Number.isSafeInteger(n)||n<0||n>0xffffffff)throw new RangeError('Value must fit in uint32');return new Uint8Array([(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255]);}
export function u16be(n){if(!Number.isSafeInteger(n)||n<0||n>0xffff)throw new RangeError('Value must fit in uint16');return new Uint8Array([(n>>>8)&255,n&255]);}
export function readU32be(v,o=0){const b=asU8(v);if(o<0||o+4>b.length)throw new RangeError('Not enough bytes to read uint32');return((b[o]*0x1000000)+(b[o+1]<<16)+(b[o+2]<<8)+b[o+3])>>>0;}
export function readU16be(v,o=0){const b=asU8(v);if(o<0||o+2>b.length)throw new RangeError('Not enough bytes to read uint16');return(b[o]<<8)|b[o+1];}
export function concatBytes(...v){const p=v.map(asU8),r=new Uint8Array(p.reduce((s,x)=>s+x.length,0));let o=0;for(const x of p){r.set(x,o);o+=x.length;}return r;}
