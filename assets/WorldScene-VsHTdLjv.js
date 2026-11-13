import{a as e,n as t,t as n}from"./jsx-runtime-C27Mmbu5.js";import{F as r,P as i}from"./NativeVideo-Sgj-Z1PQ.js";import{u as a}from"./index-Cx2_2q0D.js";import{D as o,E as s,H as c,K as l,M as u,P as d,T as f,V as p,X as m,Z as h,_ as g,_t as _,a as v,at as y,bt as b,c as x,dt as S,ft as C,gt as ee,it as w,k as T,o as E,ot as D,st as O,ut as k,vt as A,xt as j,y as te,yt as ne}from"./three.module-DaMKC3tO.js";import{C as M,S as re,T as N,a as P,b as F,g as I,h as L,i as R,n as z,r as B,s as V,t as H,u as U,v as ie,w as W,x as ae,y as G}from"./palette-DvTs67ux.js";import{n as K,t as q}from"./world-rules-D63uryOZ.js";var J=e(t()),Y=e=>e===Object(e)&&!Array.isArray(e)&&typeof e!=`function`;function X(e,t){let n=N(e=>e.gl),r=W(S,Y(e)?Object.values(e):e);return(0,J.useLayoutEffect)(()=>{t?.(r)},[t]),(0,J.useEffect)(()=>{if(`initTexture`in n){let e=[];Array.isArray(r)?e=r:r instanceof k?e=[r]:Y(r)&&(e=Object.values(r)),e.forEach(e=>{e instanceof k&&n.initTexture(e)})}},[n,r]),(0,J.useMemo)(()=>{if(Y(e)){let t={},n=0;for(let i in e)t[i]=r[n++];return t}else return r},[e,r])}X.preload=e=>W.preload(S,e),X.clear=e=>W.clear(S,e);var oe=parseInt(`187`.replace(/\D+/g,``));function se(e,t,n){let r=N(e=>e.size),i=N(e=>e.viewport),a=typeof e==`number`?e:r.width*i.dpr,o=typeof t==`number`?t:r.height*i.dpr,c=(typeof e==`number`?n:e)||{},{samples:l=0,depth:u,...f}=c,p=u??c.depthBuffer,m=J.useMemo(()=>{let e=new j(a,o,{minFilter:d,magFilter:d,type:T,...f});return p&&(e.depthTexture=new te(a,o,s)),e.samples=l,e},[]);return J.useLayoutEffect(()=>{m.setSize(a,o),l&&(m.samples=l)},[l,m,a,o]),J.useEffect(()=>()=>m.dispose(),[]),m}var ce=class extends D{constructor(e=new _){super({uniforms:{inputBuffer:new C(null),depthBuffer:new C(null),resolution:new C(new _),texelSize:new C(new _),halfTexelSize:new C(new _),kernel:new C(0),scale:new C(1),cameraNear:new C(0),cameraFar:new C(1),minDepthThreshold:new C(0),maxDepthThreshold:new C(1),depthScale:new C(0),depthToBlurRatioBias:new C(.25)},fragmentShader:`#include <common>
        #include <dithering_pars_fragment>      
        uniform sampler2D inputBuffer;
        uniform sampler2D depthBuffer;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          float depthFactor = 0.0;
          
          #ifdef USE_DEPTH
            vec4 depth = texture2D(depthBuffer, vUv);
            depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
            depthFactor *= depthScale;
            depthFactor = max(0.0, min(1.0, depthFactor + 0.25));
          #endif
          
          vec4 sum = texture2D(inputBuffer, mix(vUv0, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv1, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv2, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv3, vUv, depthFactor));
          gl_FragColor = sum * 0.25 ;

          #include <dithering_fragment>
          #include <tonemapping_fragment>
          #include <${oe>=154?`colorspace_fragment`:`encodings_fragment`}>
        }`,vertexShader:`uniform vec2 texelSize;
        uniform vec2 halfTexelSize;
        uniform float kernel;
        uniform float scale;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          vec2 uv = position.xy * 0.5 + 0.5;
          vUv = uv;

          vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;
          vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);
          vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);
          vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);
          vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);

          gl_Position = vec4(position.xy, 1.0, 1.0);
        }`,blending:0,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t),this.uniforms.halfTexelSize.value.set(e,t).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}},le=class{constructor({gl:e,resolution:t,width:n=500,height:r=500,minDepthThreshold:i=0,maxDepthThreshold:a=1,depthScale:o=0,depthToBlurRatioBias:s=.25}){this.renderToScreen=!1,this.renderTargetA=new j(t,t,{minFilter:d,magFilter:d,stencilBuffer:!1,depthBuffer:!1,type:T}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new ce,this.convolutionMaterial.setTexelSize(1/n,1/r),this.convolutionMaterial.setResolution(new _(n,r)),this.scene=new y,this.camera=new x,this.convolutionMaterial.uniforms.minDepthThreshold.value=i,this.convolutionMaterial.uniforms.maxDepthThreshold.value=a,this.convolutionMaterial.uniforms.depthScale.value=o,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=s,this.convolutionMaterial.defines.USE_DEPTH=o>0;let l=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),u=new Float32Array([0,0,2,0,0,2]),f=new E;f.setAttribute(`position`,new v(l,3)),f.setAttribute(`uv`,new v(u,2)),this.screen=new c(f,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,t,n){let r=this.scene,i=this.camera,a=this.renderTargetA,o=this.renderTargetB,s=this.convolutionMaterial,c=s.uniforms;c.depthBuffer.value=t.depthTexture;let l=s.kernel,u=t,d,f,p;for(f=0,p=l.length-1;f<p;++f)d=f&1?o:a,c.kernel.value=l[f],c.inputBuffer.value=u.texture,e.setRenderTarget(d),e.render(r,i),u=d;c.kernel.value=l[f],c.inputBuffer.value=u.texture,e.setRenderTarget(this.renderToScreen?null:n),e.render(r,i)}},ue=class extends l{constructor(e={}){super(e),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var t;(t=e.defines)!=null&&t.USE_UV||(e.defines.USE_UV=``),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${e.vertexShader}`,e.vertexShader=e.vertexShader.replace(`#include <project_vertex>`,`#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`),e.fragmentShader=`
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        ${e.fragmentShader}`,e.fragmentShader=e.fragmentShader.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>

      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif

      vec4 new_vUv = my_vUv;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;

      vec4 base = texture2DProj(tDiffuse, new_vUv);
      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);

      vec4 merge = base;

      #ifdef USE_NORMALMAP
        vec2 normal_uv = vec2(0.0);
        vec4 normalColor = texture2D(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
        vec4 base_normal = texture2D(tDiffuse, normal_uv);
        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
        merge = base_normal;
        blur = blur_normal;
      #endif

      float depthFactor = 0.0001;
      float blurFactor = 0.0;

      #ifdef USE_DEPTH
        vec4 depth = texture2DProj(tDepth, new_vUv);
        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
        depthFactor *= depthScale;
        depthFactor = max(0.0001, min(1.0, depthFactor));

        #ifdef USE_BLUR
          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
          merge = merge * min(1.0, depthFactor + 0.5);
        #else
          merge = merge * depthFactor;
        #endif

      #endif

      float reflectorRoughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
        reflectorRoughnessFactor *= reflectorTexelRoughness.g;
      #endif

      #ifdef USE_BLUR
        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
        merge = mix(merge, blur, blurFactor);
      #endif

      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;

      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}},de=J.forwardRef(({mixBlur:e=0,mixStrength:t=1,resolution:n=256,blur:r=[0,0],minDepthThreshold:i=.9,maxDepthThreshold:a=1,depthScale:o=0,depthToBlurRatioBias:s=.25,mirror:c=0,distortion:l=1,mixContrast:u=1,distortionMap:f,reflectorOffset:_=0,...v},y)=>{re({MeshReflectorMaterialImpl:ue});let b=N(({gl:e})=>e),x=N(({camera:e})=>e),S=N(({scene:e})=>e);r=Array.isArray(r)?r:[r,r];let C=r[0]+r[1]>0,w=r[0],E=r[1],D=J.useRef(null);J.useImperativeHandle(y,()=>D.current,[]);let[O]=J.useState(()=>new h),[k]=J.useState(()=>new A),[P]=J.useState(()=>new A),[F]=J.useState(()=>new A),[I]=J.useState(()=>new p),[L]=J.useState(()=>new A(0,0,-1)),[R]=J.useState(()=>new ne),[z]=J.useState(()=>new A),[B]=J.useState(()=>new A),[V]=J.useState(()=>new ne),[H]=J.useState(()=>new p),[U]=J.useState(()=>new m),ie=J.useCallback(()=>{var e;let t=D.current.parent||((e=D.current)==null||(e=e.__r3f.parent)==null?void 0:e.object);if(!t||(P.setFromMatrixPosition(t.matrixWorld),F.setFromMatrixPosition(x.matrixWorld),I.extractRotation(t.matrixWorld),k.set(0,0,1),k.applyMatrix4(I),P.addScaledVector(k,_),z.subVectors(P,F),z.dot(k)>0))return;z.reflect(k).negate(),z.add(P),I.extractRotation(x.matrixWorld),L.set(0,0,-1),L.applyMatrix4(I),L.add(F),B.subVectors(P,L),B.reflect(k).negate(),B.add(P),U.position.copy(z),U.up.set(0,1,0),U.up.applyMatrix4(I),U.up.reflect(k),U.lookAt(B),U.far=x.far,U.updateMatrixWorld(),U.projectionMatrix.copy(x.projectionMatrix),H.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),H.multiply(U.projectionMatrix),H.multiply(U.matrixWorldInverse),H.multiply(t.matrixWorld),O.setFromNormalAndCoplanarPoint(k,P),O.applyMatrix4(U.matrixWorldInverse),R.set(O.normal.x,O.normal.y,O.normal.z,O.constant);let n=U.projectionMatrix;V.x=(Math.sign(R.x)+n.elements[8])/n.elements[0],V.y=(Math.sign(R.y)+n.elements[9])/n.elements[5],V.z=-1,V.w=(1+n.elements[10])/n.elements[14],R.multiplyScalar(2/R.dot(V)),n.elements[2]=R.x,n.elements[6]=R.y,n.elements[10]=R.z+1,n.elements[14]=R.w},[x,_]),[W,ae,K,q]=J.useMemo(()=>{let r={minFilter:d,magFilter:d,type:T},p=new j(n,n,r);p.depthBuffer=!0,p.depthTexture=new te(n,n),p.depthTexture.format=g,p.depthTexture.type=ee;let m=new j(n,n,r);return[p,m,new le({gl:b,resolution:n,width:w,height:E,minDepthThreshold:i,maxDepthThreshold:a,depthScale:o,depthToBlurRatioBias:s}),{mirror:c,textureMatrix:H,mixBlur:e,tDiffuse:p.texture,tDepth:p.depthTexture,tDiffuseBlur:m.texture,hasBlur:C,mixStrength:t,minDepthThreshold:i,maxDepthThreshold:a,depthScale:o,depthToBlurRatioBias:s,distortion:l,distortionMap:f,mixContrast:u,"defines-USE_BLUR":C?``:void 0,"defines-USE_DEPTH":o>0?``:void 0,"defines-USE_DISTORTION":f?``:void 0}]},[b,w,E,H,n,c,C,e,t,i,a,o,s,l,f,u]);return M(()=>{var e;let t=D.current.parent||((e=D.current)==null||(e=e.__r3f.parent)==null?void 0:e.object);if(!t)return;t.visible=!1;let n=b.xr.enabled,r=b.shadowMap.autoUpdate;ie(),b.xr.enabled=!1,b.shadowMap.autoUpdate=!1,b.setRenderTarget(W),b.state.buffers.depth.setMask(!0),b.autoClear||b.clear(),b.render(S,U),C&&K.render(b,W,ae),b.xr.enabled=n,b.shadowMap.autoUpdate=r,t.visible=!0,b.setRenderTarget(null)}),J.createElement(`meshReflectorMaterialImpl`,G({attach:`material`,key:`key`+q[`defines-USE_BLUR`]+q[`defines-USE_DEPTH`]+q[`defines-USE_DISTORTION`],ref:D},q,v))});function fe(e,t){let n=e+`Geometry`;return J.forwardRef(({args:e,children:r,...i},a)=>{let o=J.useRef(null);return J.useImperativeHandle(a,()=>o.current),J.useLayoutEffect(()=>void t?.(o.current)),J.createElement(`mesh`,G({ref:o},i),J.createElement(n,{attach:`geometry`,args:e}),r)})}var pe=fe(`capsule`),Z=1e-5;function me(e,t,n){let r=new O,i=n-Z;return r.absarc(Z,Z,Z,-Math.PI/2,-Math.PI,!0),r.absarc(Z,t-i*2,Z,Math.PI,Math.PI/2,!0),r.absarc(e-i*2,t-i*2,Z,Math.PI/2,0,!0),r.absarc(e-i*2,Z,Z,0,-Math.PI/2,!0),r}var Q=J.forwardRef(function({args:[e=1,t=1,n=1]=[],radius:r=.05,steps:i=1,smoothness:a=4,bevelSegments:o=4,creaseAngle:s=.4,children:c,...l},u){return J.createElement(`mesh`,G({ref:u},l),J.createElement(he,{args:[e,t,n],radius:r,steps:i,smoothness:a,bevelSegments:o,creaseAngle:s}),c)}),he=J.forwardRef(function({args:[e=1,t=1,n=1]=[],radius:r=.05,steps:i=1,smoothness:a=4,bevelSegments:o=4,creaseAngle:s=.4,...c},l){let u=J.useMemo(()=>me(e,t,r),[e,t,r]),d=J.useMemo(()=>({depth:n-r*2,bevelEnabled:!0,bevelSegments:o*2,steps:i,bevelSize:r-Z,bevelThickness:r,curveSegments:a}),[n,r,a,o,i]),f=J.useRef(null);return J.useLayoutEffect(()=>{f.current&&(f.current.center(),ie(f.current,s))},[u,d,s]),J.useImperativeHandle(l,()=>f.current),J.createElement(`extrudeGeometry`,G({ref:f,args:[u,d]},c))}),$=n();function ge({black:e,graphite:t,purple:n}){return(0,$.jsxs)(`group`,{scale:.72,children:[[-1,1].map(n=>(0,$.jsxs)(`group`,{children:[(0,$.jsx)(pe,{args:[.77,1.1,16,64],rotation:[0,0,Math.PI/2],position:[n*.5,0,0],children:(0,$.jsx)(`meshPhysicalMaterial`,{color:e,roughness:.18,clearcoat:1,clearcoatRoughness:.12,envMapIntensity:1.5})}),(0,$.jsx)(pe,{args:[.5,.85,16,64],position:[n*1.05,-.65,0],rotation:[0,0,n*-.3],children:(0,$.jsx)(`meshPhysicalMaterial`,{color:t,metalness:.6,roughness:.3,clearcoat:1,envMapIntensity:1.4})})]},n)),(0,$.jsx)(`group`,{position:[-1,.1,.72],scale:.4,children:(0,$.jsx)(B,{kind:`dpad`,color:n,index:0})}),[0,1,2,3].map(e=>(0,$.jsx)(`group`,{position:[1+Math.sin(e*Math.PI/2)*.3,.15+Math.cos(e*Math.PI/2)*.3,.73],scale:.3,children:(0,$.jsx)(B,{kind:`button`,color:n,index:e})},e)),[-1,1].map(e=>(0,$.jsx)(`group`,{position:[e*.5,-.5,.72],scale:.4,children:(0,$.jsx)(B,{kind:`stick`,color:n,index:0})},e)),(0,$.jsx)(Q,{args:[.55,.24,.08],radius:.06,position:[0,.15,.8],children:(0,$.jsx)(`meshPhysicalMaterial`,{color:n,roughness:.25,clearcoat:1})})]})}function _e(e){let t=(0,J.useRef)(null),n=(0,J.useRef)(null),o=(0,J.useRef)([null,null]),[s,c]=(0,J.useState)(-1),[l,u]=(0,J.useState)(!1);return(0,J.useEffect)(()=>{let r=[document.createElement(`video`),document.createElement(`video`)];t.current=r[0],n.current=r[1],r.forEach((e,t)=>{e.muted=!0,e.loop=!0,e.playsInline=!0,e.preload=`none`;let n=new b(e);n.colorSpace=w,o.current[t]=n});let i=e=>{let t=e<.76||e>.94?-1:e<.83?0:1;if(t>=0){let e=r[t],n=a[t]?.trailer;n&&!e.getAttribute(`src`)&&(e.src=n)}c(t)};i(e.get()),u(!0);let s=e.on(`change`,i);return()=>{s(),r.forEach(e=>{e.pause(),e.removeAttribute(`src`),e.load()}),o.current.forEach(e=>e?.dispose()),o.current=[null,null],t.current=null,n.current=null}},[e]),i(t,l&&s===0,r.monitor),i(n,l&&s===1,r.monitor),{textures:o,videos:[t,n]}}function ve({colors:e}){let t=(0,J.useMemo)(()=>{let t=q.rings*24,n=new u(Array.from({length:t+1},(e,n)=>new _(3-Math.cos(n/24*Math.PI*2)*q.tubeRadius,-n/t*q.rings*q.spacing)),q.radialSegments),r=n.getAttribute(`position`),i=[];for(let t=0;t<r.count;t++){let n=Math.max(0,Math.min(1,-r.getY(t)/(q.rings*q.spacing))),a=e[0].clone().lerp(e[1],n);i.push(a.r,a.g,a.b)}return n.setAttribute(`color`,new f(i,3)),n},[e]);return(0,J.useEffect)(()=>()=>t.dispose(),[t]),(0,$.jsx)(`mesh`,{geometry:t,"rotation-x":Math.PI/2,children:(0,$.jsx)(`meshPhysicalMaterial`,{...K,vertexColors:!0,side:2})})}function ye({progress:e,onFailure:t,colors:n}){let{gl:r,camera:i,size:s}=N(),c=se(1280,800,{samples:4,type:T}),l=(0,J.useMemo)(()=>new y,[]),u=(0,J.useMemo)(()=>new m(54,1.6,.1,100),[]),d=(0,J.useRef)(null),f=(0,J.useRef)(null),p=(0,J.useRef)(null),h=(0,J.useRef)(e.get()),g=(0,J.useRef)(0),_=(0,J.useRef)(null),v=X([a[0].img,a[1].img]),b=_e(e),x=(0,J.useMemo)(()=>({tunnel:{value:c.texture},a:{value:v[0]},b:{value:v[1]},p:{value:0},speed:{value:0}}),[c,v]);return(0,J.useEffect)(()=>{let e=r.domElement;return e.addEventListener(`webglcontextlost`,t),()=>e.removeEventListener(`webglcontextlost`,t)},[r,t]),(0,J.useEffect)(()=>{l.fog=new o(n[6],.055)},[l,n]),M((t,n)=>{let a=e.get(),o=Math.min(n,.05);g.current+=(Math.min(1,Math.abs(a-h.current)/Math.max(n,.016))-g.current)*(1-Math.exp(-8*o)),h.current=a;let m=Math.min(1,a/.7);u.position.set(Math.sin(a*9)*.12,Math.cos(a*7)*.1,2-m*16),u.rotation.set(0,0,Math.sin(a*8)*q.barrelRoll),_.current&&_.current.position.set(.8,1.2,u.position.z-1),d.current&&(d.current.position.set(Math.sin(a*11)*.45,Math.cos(a*8)*.4,u.position.z-7),d.current.rotation.set(t.clock.elapsedTime*.17,a*9,t.clock.elapsedTime*.12));let y=r.getRenderTarget();l.environment=null,r.setRenderTarget(c),r.clear();let x=r.toneMapping;r.toneMapping=0,r.render(l,u),r.toneMapping=x,r.setRenderTarget(y);let S=Math.max(0,Math.min(1,(a-.7)/.07)),C=s.width/s.height;i.position.set(0,.15*S,Math.min(3.38/(2*Math.tan(55*Math.PI/360)),6/(2*Math.tan(55*Math.PI/360)*C))*.92+7*S),i.rotation.set(0,0,0),f.current&&(f.current.rotation.y=a>.7?Math.sin((a-.7)*8)*.07:0),p.current&&(p.current.uniforms.p.value=a,p.current.uniforms.speed.value=g.current*.06*(1-S),b.videos.forEach((e,t)=>{let n=e.current,r=b.textures.current[t],i=p.current?.uniforms[t===0?`a`:`b`];i&&(i.value=n&&!n.error&&n.readyState>=2&&r?r:v[t])})),r.domElement.dataset.progress=a.toFixed(3),r.domElement.dataset.rings=String(q.rings),r.domElement.dataset.samples=String(c.samples),r.domElement.parentElement?.setAttribute(`data-scene-ready`,`true`)},-1),(0,$.jsxs)($.Fragment,{children:[ae((0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`color`,{attach:`background`,args:[n[6]]}),(0,$.jsx)(`ambientLight`,{color:n[3],intensity:.4}),(0,$.jsx)(`pointLight`,{color:n[7],position:[0,0,-24],intensity:8,distance:25}),(0,$.jsx)(`pointLight`,{ref:_,color:n[3],intensity:28,distance:12,decay:2}),(0,$.jsx)(ve,{colors:n}),(0,$.jsxs)(`mesh`,{position:[0,0,-10.5],"rotation-x":Math.PI/2,children:[(0,$.jsx)(`cylinderGeometry`,{args:[3.3,3.3,22,64,1,!0]}),(0,$.jsx)(`meshPhysicalMaterial`,{color:n[1],...K,side:1})]}),(0,$.jsxs)(`mesh`,{position:[0,0,-24],children:[(0,$.jsx)(`circleGeometry`,{args:[1.1,64]}),(0,$.jsx)(`meshBasicMaterial`,{color:n[7].clone().multiplyScalar(4),toneMapped:!1})]}),(0,$.jsx)(`group`,{ref:d,children:(0,$.jsx)(ge,{black:n[4].getStyle(),graphite:n[5].getStyle(),purple:n[3].getStyle()})})]}),l),(0,$.jsx)(`color`,{attach:`background`,args:[n[4]]}),(0,$.jsx)(`ambientLight`,{intensity:.6}),(0,$.jsx)(`directionalLight`,{position:[0,4,5],intensity:3}),(0,$.jsx)(I,{resolution:128,children:(0,$.jsx)(L,{position:[0,4,3],"rotation-x":-.7,scale:[8,4,1],intensity:3})}),(0,$.jsxs)(`group`,{ref:f,children:[(0,$.jsx)(Q,{args:[6.35,3.72,.28],radius:.18,smoothness:4,children:(0,$.jsx)(`meshPhysicalMaterial`,{color:n[4],roughness:.15,metalness:.5,clearcoat:1})}),(0,$.jsxs)(`mesh`,{position:[0,0,.17],children:[(0,$.jsx)(`planeGeometry`,{args:[6,3.38]}),(0,$.jsx)(`shaderMaterial`,{ref:p,uniforms:x,vertexShader:`varying vec2 v;void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform sampler2D tunnel;uniform sampler2D a;uniform sampler2D b;uniform float p;uniform float speed;varying vec2 v;void main(){vec2 d=v-.5;vec3 c=vec3(0.);for(int i=0;i<8;i++){c+=texture2D(tunnel,v-d*speed*float(i)/7.).rgb/8.;}vec3 game=mix(texture2D(a,v).rgb,texture2D(b,v).rgb,smoothstep(.81,.85,p));gl_FragColor=vec4(mix(c,game,smoothstep(.76,.8,p)),1.);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`})]}),(0,$.jsx)(Q,{args:[.22,1.1,.22],radius:.07,position:[0,-2.1,-.05],children:(0,$.jsx)(`meshStandardMaterial`,{color:n[4],metalness:.5,roughness:.25})}),(0,$.jsx)(Q,{args:[2.1,.12,.8],radius:.05,position:[0,-2.66,.1],children:(0,$.jsx)(`meshStandardMaterial`,{color:n[4],metalness:.5,roughness:.25})})]}),(0,$.jsxs)(`mesh`,{position:[0,-2.78,0],"rotation-x":-Math.PI/2,children:[(0,$.jsx)(`planeGeometry`,{args:[100,100]}),(0,$.jsx)(de,{color:n[4],blur:[300,100],resolution:256,mixBlur:1,mixStrength:1.5,roughness:.22,metalness:.4,depthScale:.15,minDepthThreshold:.4,maxDepthThreshold:1.4})]})]})}function be(e){let[t,n]=(0,J.useState)(null);return(0,J.useEffect)(()=>n(H([`--tunnel-near`,`--tunnel-far`,`--media-foreground`,`--controller-purple`,`--controller-black`,`--controller-graphite`,`--tunnel-fog`,`--end-glow`])),[]),t?(0,$.jsx)(`div`,{className:`worlds-canvas`,children:(0,$.jsxs)(F,{dpr:[1,2],camera:{position:[0,0,3],fov:55,far:120},gl:{antialias:!1,alpha:!1},children:[(0,$.jsx)(z,{}),(0,$.jsx)(J.Suspense,{fallback:null,children:(0,$.jsx)(ye,{...e,colors:t})}),(0,$.jsxs)(V,{multisampling:4,children:[(0,$.jsx)(R,{intensity:.12,luminanceThreshold:2,mipmapBlur:!0}),(0,$.jsx)(P,{offset:new _(7e-4,7e-4),radialModulation:!0,modulationOffset:.65}),(0,$.jsx)(U,{})]})]})}):null}export{be as default};