import{mkdirSync as M,readdirSync as D,readFileSync as R,writeFileSync as W}from'node:fs';
import{join as J}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
function run(p:Uint8Array,q:Uint8Array){
 const n=p.length,v=new DataView(p.buffer,p.byteOffset,n),s=new Int32Array(256),c=new Int32Array(64),m=new Int32Array(256),o=new Uint8Array(65536);
 let sp=0,cp=0,pc=0,ip=0,op=0,st=0,t=0,x=0,y=0,im=0,np=0;
 const E=(k:number)=>[o.subarray(0,op),k]as const;
 for(;;){
  if(st++>=1e6)return E(10);
  if(pc<0||pc>=n)return E(9);
  const b=p[pc];np=pc+1;
  if(b===1){if(pc+2>n)return E(9);im=v.getInt8(pc+1);np=pc+2;}
  else if(b===2){if(pc+5>n)return E(9);im=v.getInt32(pc+1,true);np=pc+5;}
  else if(b>=48&&b<=51){if(pc+3>n)return E(9);im=b===51?v.getUint16(pc+1,true):v.getInt16(pc+1,true);np=pc+3;}
  if(!b)return E(0);
  if(b<3){if(sp>255)return E(3);s[sp++]=im;}
  else if(b===3){if(!sp)return E(2);sp--;}
  else if(b===4){if(!sp)return E(2);if(sp>255)return E(3);s[sp]=s[sp-1];sp++;}
  else if(b===5){if(sp<2)return E(2);t=s[sp-1];s[sp-1]=s[sp-2];s[sp-2]=t;}
  else if(b===6){if(sp<2)return E(2);if(sp>255)return E(3);s[sp]=s[sp-2];sp++;}
  else if(b===7){if(sp<3)return E(2);t=s[sp-3];s[sp-3]=s[sp-2];s[sp-2]=s[sp-1];s[sp-1]=t;}
  else if(b===23){if(!sp)return E(2);s[sp-1]=-s[sp-1]|0;}
  else if(b===27){if(!sp)return E(2);s[sp-1]=~s[sp-1];}
  else if(b>15&&b<35&&b!==31){
   if(sp<2)return E(2);x=s[sp-2];y=s[sp-1];
   if(b===16)x=x+y|0;else if(b===17)x=x-y|0;else if(b===18)x=Math.imul(x,y);
   else if(b<23){if(!y)return E(4);x=b===19?(x===-2147483648&&y===-1?x:Math.trunc(x/y)|0):b===20?(y===-1?0:x%y|0):b===21?Math.trunc((x>>>0)/(y>>>0))|0:((x>>>0)%(y>>>0))|0;}
   else if(b===24)x&=y;else if(b===25)x|=y;else if(b===26)x^=y;
   else if(b===28)x<<=y&31;else if(b===29)x>>=y&31;else if(b===30)x=(x>>>(y&31))|0;
   else x=(b===32?x===y:b===33?x<y:(x>>>0)<(y>>>0))?1:0;
   s[sp-2]=x;sp--;
  }else if(b===48)np+=im;
  else if(b===49||b===50){if(!sp)return E(2);if((!s[--sp])===(b===49))np+=im;}
  else if(b===51){if(cp>63)return E(7);c[cp++]=np;np=im;}
  else if(b===52){if(!cp)return E(8);np=c[--cp];}
  else if(b===64){if(!sp)return E(2);t=s[sp-1];if(t<0||t>255)return E(6);s[sp-1]=m[t];}
  else if(b===65){if(sp<2)return E(2);t=s[sp-1];if(t<0||t>255)return E(6);m[t]=s[sp-2];sp-=2;}
  else if(b===80){if(!sp)return E(2);const z=''+s[sp-1];if(op+z.length>65536)return E(11);for(let i=0;i<z.length;i++)o[op++]=z.charCodeAt(i);sp--;}
  else if(b===81){if(!sp)return E(2);if(op>65535)return E(11);o[op++]=s[--sp]&255;}
  else if(b===82){if(sp>255)return E(3);s[sp++]=ip<q.length?q[ip++]:-1;}
  else if(b===83){if(!sp)return E(2);return E(s[--sp]&255);}
  else return E(5);
  pc=np;
 }
}
for(const d of D(I).sort()){
 const[o,k]=run(R(J(I,d,'program.bin')),R(J(I,d,'input.bin'))),t=J(O,d);
 M(t,{recursive:true});W(J(t,'stdout.bin'),o);W(J(t,'exit.txt'),k+'\n');
}