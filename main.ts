// Tiny stack VM for make.fun's tiny stack ISA (kit ISA.md). One run answers every
// instance under /input/<id>/ with /output/<id>/stdout.bin and /output/<id>/exit.txt.
import{readdirSync as A,readFileSync as B,mkdirSync as C,writeFileSync as D}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
const U="000112230000000022222221222122202220000000000000011000000000000012000000000000001101";
const V="011022330000000011111111111111101110000000000000000000000000000010000000000000000010";
function R(p,q){
 const s=new Int32Array(256);let a=0,t=0;
 const c=new Int32Array(64);let b=0;
 const m=new Int32Array(256);
 const o=[];let n=p.length,g=0,h=0,k=0;
 try{for(;;){
  if(g===1e6)throw 10;
  if(h<0||h>=n)throw 9;
  const x=p[h];let y=0;
  if(x===1)y=1;else if(x===2)y=4;else if(x>=48&&x<=51)y=2;
  else if(!(x<8||(x>=16&&x<=34)||(x>=48&&x<=52)||(x>=64&&x<=65)||(x>=80&&x<=83)))throw 5;
  if(h+1+y>n)throw 9;
  g++;const z=h+1+y;h=z;
  const u=U.charCodeAt(x)-48,v=V.charCodeAt(x)-48;
  if(a<u)throw 2;
  if(a-u+v>256)throw 3;
  switch(x){
   case 0:return[o,0];
   case 1:s[a++]=(p[z-1]<<24)>>24;break;
   case 2:s[a++]=p[z-4]|p[z-3]<<8|p[z-2]<<16|p[z-1]<<24;break;
   case 3:a--;break;
   case 4:s[a]=s[a-1];a++;break;
   case 5:t=s[a-1];s[a-1]=s[a-2];s[a-2]=t;break;
   case 6:s[a]=s[a-2];a++;break;
   case 7:t=s[a-3];s[a-3]=s[a-2];s[a-2]=s[a-1];s[a-1]=t;break;
   case 23:s[a-1]=-s[a-1]|0;break;
   case 27:s[a-1]=~s[a-1];break;
   case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
    const d=s[a-1],e=s[a-2];let r;
    if(x===16)r=(e+d)|0;else if(x===17)r=(e-d)|0;else if(x===18)r=Math.imul(e,d);
    else if(x===19){if(!d)throw 4;r=e===-2147483648&&d===-1?e:(e/d)|0}
    else if(x===20){if(!d)throw 4;r=d===-1?0:e%d|0}
    else if(x===21){if(!d)throw 4;r=((e>>>0)/(d>>>0))|0}
    else if(x===22){if(!d)throw 4;r=(e>>>0)%(d>>>0)|0}
    else if(x===24)r=e&d;else if(x===25)r=e|d;else if(x===26)r=e^d;
    else if(x===28)r=e<<(d&31);else if(x===29)r=e>>(d&31);else if(x===30)r=(e>>>(d&31))|0;
    else if(x===32)r=e===d?1:0;else if(x===33)r=e<d?1:0;else r=e>>>0<d>>>0?1:0;
    a-=2;s[a++]=r;break}
   case 48:h=z+((p[z-2]|p[z-1]<<8)<<16>>16);break;
   case 49:case 50:{
    const f=s[--a];
    if((x===49)===(f===0))h=z+((p[z-2]|p[z-1]<<8)<<16>>16);
    break}
   case 51:if(b===64)throw 7;c[b++]=z;h=p[z-2]|p[z-1]<<8;break;
   case 52:if(!b)throw 8;h=c[--b];break;
   case 64:{const f=s[a-1];if(f<0||f>255)throw 6;s[a-1]=m[f];break}
   case 65:{const f=s[a-1],e=s[a-2];if(f<0||f>255)throw 6;a-=2;m[f]=e;break}
   case 80:{const f=String(s[a-1]);if(o.length+f.length>65536)throw 11;a--;for(const ch of f)o.push(ch.charCodeAt(0));break}
   case 81:if(o.length+1>65536)throw 11;o.push(s[--a]&255);break;
   case 82:s[a++]=k<q.length?q[k++]:-1;break;
   case 83:return[o,s[--a]&255];
  }
 }}catch(e){return[o,e|0||9]}
}
for(const d of A(I).sort()){
 const[o,e]=R(B(I+"/"+d+"/program.bin"),B(I+"/"+d+"/input.bin"));
 C(O+"/"+d,{recursive:true});
 D(O+"/"+d+"/stdout.bin",Buffer.from(o));
 D(O+"/"+d+"/exit.txt",e+"\n");
}
