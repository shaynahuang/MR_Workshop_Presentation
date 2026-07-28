(()=>{
    const d=document;
    if(d.body.dataset.animatedReady==="true")return;
    const style=d.createElement("style");
    style.textContent=`
      /* Animated explanation cards: pages 05–07 */
      .method,.era,.metaphor-list button{position:relative}
      .era{cursor:pointer;transition:.22s}
      .era:hover{background:#c9ff63;padding-left:16px;color:#13231d}
      .era:focus-visible,.method:focus-visible,.metaphor-list button:focus-visible{outline:4px solid #82b8ff;outline-offset:3px}
      .era::after{content:"CLICK TO EXPLAIN";display:block;margin-top:16px;font:800 9px/1 var(--sans);letter-spacing:.12em;color:#68766f}
      .modal-body{padding-bottom:28px}
      .modal-body .lede{font-size:18px}
      .viz-stage{
        --v-accent:#c9ff63;--v-hot:#ff735e;--v-blue:#82b8ff;
        height:250px;margin:26px 0 18px;border:1px solid #13231d;background:#13231d;
        position:relative;overflow:hidden;color:#f3f0e8
      }
      .viz-stage::before{content:"";position:absolute;inset:0;opacity:.2;
        background:linear-gradient(#53645a 1px,transparent 1px),linear-gradient(90deg,#53645a 1px,transparent 1px);
        background-size:28px 28px}
      .viz-label{position:absolute;left:15px;top:14px;z-index:8;font:800 9px/1 var(--sans);letter-spacing:.16em;color:#aab8b0}
      .viz-object{position:absolute;left:62%;top:42%;width:58px;height:58px;background:var(--v-hot);
        box-shadow:10px 10px 0 rgba(255,115,94,.24);animation:vFloat 2.4s ease-in-out infinite}
      .viz-hand{position:absolute;left:18%;top:58%;width:75px;height:28px;border:3px solid var(--v-accent);
        border-radius:30px 8px 8px 30px;transform-origin:90% 50%;animation:vHand 2.4s ease-in-out infinite}
      .viz-hand::after{content:"";position:absolute;right:-24px;top:8px;width:30px;height:9px;background:var(--v-accent);border-radius:6px}
      .viz-ray{position:absolute;height:2px;width:46%;left:25%;top:58%;background:var(--v-blue);transform-origin:left;
        animation:vRay 2.4s ease-in-out infinite}
      .viz-ray::after{content:"";position:absolute;right:-2px;top:-4px;border-left:9px solid var(--v-blue);border-top:5px solid transparent;border-bottom:5px solid transparent}
      .viz-orbit{position:absolute;left:54%;top:23%;width:110px;height:110px;border:1px solid var(--v-blue);border-radius:50%;animation:vSpin 5s linear infinite}
      .viz-orbit::before{content:"";position:absolute;inset:18px -18px;border:1px solid var(--v-accent);border-radius:50%}
      .viz-proxy{position:absolute;left:24%;top:30%;width:70px;height:70px;border:3px solid var(--v-accent);
        transform:rotate(18deg);animation:vProxy 2.4s ease-in-out infinite}
      .viz-copy{position:absolute;right:19%;top:35%;width:70px;height:70px;background:var(--v-hot);
        transform:rotate(18deg);animation:vCopy 2.4s ease-in-out infinite}
      .viz-link{position:absolute;left:34%;right:29%;top:48%;height:2px;border-top:2px dashed var(--v-blue);animation:vPulse 1.2s linear infinite}
      .viz-eye{position:absolute;left:18%;top:35%;width:78px;height:42px;border:3px solid var(--v-blue);border-radius:70% 10%;transform:rotate(45deg)}
      .viz-eye::after{content:"";position:absolute;width:19px;height:19px;background:var(--v-blue);border-radius:50%;left:27px;top:9px}
      .viz-speech{position:absolute;left:14%;top:24%;padding:12px 16px;border:2px solid var(--v-accent);border-radius:50%;
        font:700 13px/1 var(--sans);animation:vSpeak 1.2s ease-in-out infinite}
      .viz-speech::after{content:"";position:absolute;right:2px;bottom:-10px;border-top:13px solid var(--v-accent);border-left:10px solid transparent}
      .viz-world{position:absolute;left:18%;top:22%;width:150px;height:150px;border:2px solid var(--v-blue);
        transform:perspective(300px) rotateX(55deg) rotateZ(45deg);animation:vWorld 2.8s ease-in-out infinite}
      .viz-world::before,.viz-world::after{content:"";position:absolute;inset:25%;border:2px solid var(--v-accent)}
      .viz-world::after{inset:40%;background:var(--v-hot);border:0}
      .viz-bar{position:absolute;left:25%;top:50%;width:50%;height:10px;background:var(--v-blue);animation:vBar 2.4s ease-in-out infinite}
      .viz-bar::before,.viz-bar::after{content:"";position:absolute;top:-20px;width:35px;height:50px;border:3px solid var(--v-accent);border-radius:20px}
      .viz-bar::before{left:-18px}.viz-bar::after{right:-18px}
      .viz-cage{position:absolute;left:54%;top:28%;width:100px;height:100px;border:2px solid var(--v-blue);animation:vCage 2.4s ease-in-out infinite}
      .viz-cage i{position:absolute;width:13px;height:13px;background:var(--v-accent)}
      .viz-cage i:nth-child(1){left:-7px;top:-7px}.viz-cage i:nth-child(2){right:-7px;top:-7px}.viz-cage i:nth-child(3){left:-7px;bottom:-7px}.viz-cage i:nth-child(4){right:-7px;bottom:-7px}
      .viz-cut{position:absolute;left:57%;top:25%;width:115px;height:115px;background:var(--v-hot);border-radius:50%;overflow:hidden}
      .viz-cut::after{content:"";position:absolute;inset:18%;background:#13231d;border:3px dashed var(--v-accent);border-radius:50%;animation:vCut 2s ease-in-out infinite}
      .viz-caption{position:absolute;z-index:8;left:15px;right:15px;bottom:12px;display:flex;justify-content:space-between;
        font:700 10px/1 var(--sans);letter-spacing:.08em;color:#b8c2bc}
      .metaphor-view{grid-template-rows:auto 250px auto}
      .metaphor-view .viz-stage{width:min(640px,100%);height:230px;margin:12px 0 20px;align-self:end;z-index:3}
      .metaphor-view>.glyph{display:none}
      @keyframes vFloat{0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(34px,-22px) rotate(32deg)}}
      @keyframes vHand{0%,100%{transform:translate(0,0) rotate(-8deg)}50%{transform:translate(130px,-38px) rotate(8deg)}}
      @keyframes vRay{0%,100%{transform:rotate(-9deg);opacity:.45}50%{transform:rotate(5deg);opacity:1}}
      @keyframes vSpin{to{transform:rotate(360deg)}}
      @keyframes vProxy{0%,100%{transform:translate(0,0) rotate(18deg)}50%{transform:translate(35px,28px) rotate(65deg)}}
      @keyframes vCopy{0%,100%{transform:translate(0,0) rotate(18deg)}50%{transform:translate(35px,28px) rotate(65deg)}}
      @keyframes vPulse{50%{opacity:.2}}
      @keyframes vSpeak{50%{transform:scale(1.12)}}
      @keyframes vWorld{0%,100%{transform:perspective(300px) rotateX(55deg) rotateZ(45deg) scale(1)}50%{transform:perspective(300px) rotateX(55deg) rotateZ(90deg) scale(.58)}}
      @keyframes vBar{0%,100%{transform:translate(0,0) rotate(-5deg) scaleX(1)}50%{transform:translate(20px,-26px) rotate(22deg) scaleX(.72)}}
      @keyframes vCage{0%,100%{transform:scale(.8) rotate(0)}50%{transform:scale(1.25) rotate(25deg)}}
      @keyframes vCut{0%,100%{clip-path:inset(0 100% 0 0)}50%,80%{clip-path:inset(0 0 0 0)}}
      .viz-svg{position:absolute;inset:24px 18px 28px;width:calc(100% - 36px);height:calc(100% - 52px);overflow:visible}
      .viz-svg text{font-family:var(--sans);font-size:9px;font-weight:800;letter-spacing:.08em;fill:#aab8b0}
      .viz-svg .obj{fill:var(--v-hot)}.viz-svg .accent{fill:var(--v-accent)}.viz-svg .blue{fill:var(--v-blue)}
      .viz-svg .line{fill:none;stroke:var(--v-blue);stroke-width:2}.viz-svg .hotline{fill:none;stroke:var(--v-hot);stroke-width:3}
      .viz-svg .accentline{fill:none;stroke:var(--v-accent);stroke-width:3}.viz-svg .dash{stroke-dasharray:6 5}
      .viz-svg .ghost{opacity:.28}.viz-svg .thin{stroke-width:1}.viz-svg .handmark{fill:none;stroke:var(--v-accent);stroke-width:4;stroke-linecap:round}
      .vx{animation:svgX 2.6s ease-in-out infinite}.vy{animation:svgY 2.6s ease-in-out infinite}
      .vxy{animation:svgXY 2.8s ease-in-out infinite}.vscale{transform-box:fill-box;transform-origin:center;animation:svgScale 2.6s ease-in-out infinite}
      .vrotate{transform-box:fill-box;transform-origin:center;animation:svgRotate 3s ease-in-out infinite}
      .vfade{animation:svgFade 2.6s ease-in-out infinite}.vdraw{stroke-dasharray:220;stroke-dashoffset:220;animation:svgDraw 2.8s ease-in-out infinite}
      .vpulse{animation:svgPulse 1.4s ease-in-out infinite}.vstage2{animation-delay:.65s}.vstage3{animation-delay:1.3s}
      .vgain{animation:svgGain 3s cubic-bezier(.2,.05,.1,1) infinite}.vscoop{transform-box:fill-box;transform-origin:center;animation:svgScoop 3s ease-in-out infinite}
      .vclip{animation:svgClip 3s ease-in-out infinite}.vscan{animation:svgScan 2.8s linear infinite}
      @keyframes svgX{0%,15%,100%{transform:translateX(0)}55%,75%{transform:translateX(145px)}}
      @keyframes svgY{0%,15%,100%{transform:translateY(0)}55%,75%{transform:translateY(-65px)}}
      @keyframes svgXY{0%,15%,100%{transform:translate(0,0)}55%,75%{transform:translate(100px,-55px)}}
      @keyframes svgScale{0%,20%,100%{transform:scale(.65)}60%,78%{transform:scale(1.35)}}
      @keyframes svgRotate{0%,15%,100%{transform:rotate(0)}60%,80%{transform:rotate(135deg)}}
      @keyframes svgFade{0%,20%,100%{opacity:.15}50%,80%{opacity:1}}
      @keyframes svgDraw{0%,15%{stroke-dashoffset:220}65%,85%{stroke-dashoffset:0}100%{stroke-dashoffset:-220}}
      @keyframes svgPulse{50%{opacity:.25;transform:scale(.92)}}
      @keyframes svgGain{0%,15%,100%{transform:translateX(0)}45%{transform:translateX(45px)}75%{transform:translateX(190px)}}
      @keyframes svgScoop{0%,15%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(80px,-30px) rotate(-18deg)}75%{transform:translate(145px,-55px) rotate(6deg)}}
      @keyframes svgClip{0%,15%,100%{clip-path:inset(0 100% 0 0)}60%,80%{clip-path:inset(0 0 0 0)}}
      @keyframes svgScan{0%{transform:translateX(-40px)}100%{transform:translateX(250px)}}
      @media(prefers-reduced-motion:reduce){.viz-stage *{animation-play-state:paused!important}}
      @media(max-width:620px){.viz-stage{height:210px}.metaphor-view{grid-template-rows:auto 210px auto}.metaphor-view .viz-stage{height:190px}}
    `;
    d.head.appendChild(style);

    const vizNames={
      hand:"HAND ↔ OBJECT",ray:"RAY ↔ DEPTH",reach:"NON-LINEAR REACH",world:"SCALE ↔ WORLD",
      proxy:"PROXY ↔ COUNTERPART",bar:"BIMANUAL FRAME",cage:"CONSTRAINED DOF",gaze:"GAZE + ACTION",
      speech:"DEIXIS + COMMAND",cut:"SURFACE ↔ INTERIOR"
    };
    function viz(type){
      const core={
        hand:`<div class="viz-hand"></div><div class="viz-object"></div>`,
        ray:`<div class="viz-hand"></div><div class="viz-ray"></div><div class="viz-object"></div>`,
        reach:`<div class="viz-hand" style="animation-duration:3s"></div><div class="viz-ray"></div><div class="viz-object"></div>`,
        world:`<div class="viz-world"></div><div class="viz-hand" style="left:64%;top:60%"></div>`,
        proxy:`<div class="viz-proxy"></div><div class="viz-link"></div><div class="viz-copy"></div>`,
        bar:`<div class="viz-bar"></div><div class="viz-orbit"></div>`,
        cage:`<div class="viz-hand"></div><div class="viz-cage"><i></i><i></i><i></i><i></i></div>`,
        gaze:`<div class="viz-eye"></div><div class="viz-ray"></div><div class="viz-object"></div>`,
        speech:`<div class="viz-speech">ROTATE 30°</div><div class="viz-ray"></div><div class="viz-object"></div>`,
        cut:`<div class="viz-hand"></div><div class="viz-cut"></div>`
      }[type]||`<div class="viz-hand"></div><div class="viz-object"></div>`;
      return `<div class="viz-stage" aria-label="Animated visualization: ${vizNames[type]||"manipulation mapping"}">
        <div class="viz-label">${vizNames[type]||"MANIPULATION MAPPING"}</div>${core}
        <div class="viz-caption"><span>INPUT</span><span>MAPPING</span><span>OUTPUT</span></div></div>`;
    }

    const preciseNames={
      virtualHand:"1:1 CO-LOCATED GRASP",gogo:"NON-LINEAR ARM EXTENSION",homer:"RAY SELECT > HAND TRANSFER",ray:"ANGULAR POINTING + DEPTH",
      scaledGrab:"WORLD-SCALE TRANSFER",wim:"MINIATURE-TO-WORLD COUPLING",voodoo:"BIMANUAL PROXY FRAME",imagePlane:"2D PROJECTION > 3D TARGET",
      handlebar:"TWO-HAND POSE FRAME",gizmo:"SEPARATED AXIS CONTROL",articulated:"PINCH + TWO-HAND SCALE",handRay:"HAND-RAY + PINCH CLUTCH",
      gazeHand:"GAZE SELECT + HAND ACT",touchHead:"TOUCH XY + HEAD DEPTH",paddle:"PHYSICAL PADDLE CONTACT",matched:"FORM-MATCHED PHYSICAL TWIN",
      generic:"DYNAMIC GENERIC BINDING",arpen:"PHONE FRAME + PEN TIP",speechPrecise:"DEICTIC GESTURE + COMMAND",reality:"PHYSICAL OBJECT > ABSTRACT PROXY",
      dragdrop:"CROSS-REALITY TRANSFER",cutaway:"SURFACE TRACE > INTERIOR REVEAL"
    };
    function preciseScene(type){
      const O=`<svg class="viz-svg" viewBox="0 0 420 180">`,C=`</svg>`;
      const hand=`<path class="handmark" d="M38 126h42l18-15m-18 15 18 15"/>`;
      const cube=(x=280,y=80,c="obj")=>`<rect class="${c}" x="${x}" y="${y}" width="48" height="48"/><path class="line thin" d="M${x} ${y}l14-12h48v48l-14 12m0-48v48m0-48h-48"/>`;
      switch(type){
        case"virtualHand":return O+hand+`<g class="vxy">${cube(105,95)}<path class="accentline" d="M78 126h30"/></g><path class="line dash ghost" d="M105 119L300 55"/>`+C;
        case"gogo":return O+`<path class="line thin" d="M35 145h340"/><path class="hotline vdraw" d="M55 135C130 132 150 125 185 105S245 35 360 20"/><circle class="accent vgain" cx="55" cy="135" r="9"/><text x="45" y="162">PHYSICAL</text><text x="275" y="48">ACCELERATED GAIN</text>`+C;
        case"homer":return O+hand+`<path class="line vfade" d="M85 122L300 55"/><circle class="blue vfade" cx="300" cy="55" r="7"/>${cube(280,40)}<g class="vstage2 vfade"><path class="handmark" d="M260 126h35l17-14"/><path class="accentline" d="M294 112v-38"/></g><text x="30" y="166">1 POINT</text><text x="182" y="166">2 ATTACH</text><text x="322" y="166">3 MOVE</text>`+C;
        case"ray":return O+hand+`<path class="line vrotate" d="M84 122h230"/><circle class="blue vpulse" cx="314" cy="122" r="7"/><g class="vy">${cube(290,82)}</g><path class="accentline dash" d="M314 122v-72"/><text x="280" y="38">DEPTH ON RAY</text>`+C;
        case"scaledGrab":return O+`<g class="vscale"><rect class="line" x="85" y="25" width="230" height="125"/>${cube(245,70)}<circle class="accent" cx="125" cy="115" r="12"/></g><path class="hotline" d="M34 150l42-22"/><text x="255" y="166">WORLD SCALES TO REACH</text>`+C;
        case"wim":return O+`<rect class="line" x="30" y="40" width="140" height="100"/><g class="vx">${cube(62,78,"accent")}</g><rect class="line" x="225" y="20" width="165" height="130"/><g class="vx">${cube(260,68)}</g><path class="line dash vpulse" d="M170 90h55"/><text x="52" y="160">MINIATURE</text><text x="276" y="170">FULL WORLD</text>`+C;
        case"voodoo":return O+`<circle class="line" cx="95" cy="90" r="42"/><g class="vrotate">${cube(72,67,"accent")}</g><circle class="line" cx="310" cy="90" r="42"/><g class="vrotate">${cube(287,67)}</g><path class="line dash vpulse" d="M138 90h129"/><text x="32" y="158">REFERENCE DOLL</text><text x="276" y="158">TARGET DOLL</text>`+C;
        case"imagePlane":return O+`<path class="line" d="M45 25v125h125V25z"/><circle class="accent vx" cx="75" cy="105" r="10"/><path class="line dash" d="M75 105L335 50M170 105l165-55"/><g class="vy">${cube(310,35)}</g><text x="55" y="170">IMAGE PLANE</text><text x="305" y="170">3D DEPTH</text>`+C;
        case"handlebar":return O+`<g class="vrotate"><path class="accentline" d="M95 100h220"/><circle class="line" cx="95" cy="100" r="22"/><circle class="line" cx="315" cy="100" r="22"/>${cube(182,70)}</g><path class="line dash" d="M205 28v135"/><text x="145" y="174">MIDPOINT + HAND VECTOR</text>`+C;
        case"gizmo":return O+cube(178,65)+`<path class="hotline vdraw" d="M202 89h150"/><path class="accentline vdraw vstage2" d="M202 89V15"/><path class="line vdraw vstage3" d="M202 89l-95 62"/><circle class="line dash vrotate" cx="202" cy="89" r="70"/><text x="330" y="82">X</text><text x="210" y="18">Y</text><text x="92" y="166">Z</text>`+C;
        case"articulated":return O+`<path class="handmark vxy" d="M65 120q25-35 50 0m-25-18v35"/><path class="handmark vxy" d="M345 120q-25-35-50 0m25-18v35"/><g class="vscale">${cube(185,72)}</g><path class="line dash" d="M110 120h190"/><text x="145" y="166">HAND DISTANCE = SCALE</text>`+C;
        case"handRay":return O+hand+`<circle class="accent vpulse" cx="83" cy="122" r="10"/><path class="line vfade" d="M83 122L310 58"/>${cube(286,43)}<text x="25" y="165">PINCH = CLUTCH</text><text x="285" y="165">REMOTE ATTACH</text>`+C;
        case"gazeHand":return O+`<path class="blue" d="M42 65q45-40 90 0-45 40-90 0"/><circle fill="#13231d" cx="87" cy="65" r="14"/><path class="line dash vfade" d="M87 65l220 25"/>${cube(285,75)}<g class="vx">${hand}</g><text x="35" y="125">SELECT</text><text x="305" y="150">ACT</text>`+C;
        case"touchHead":return O+`<rect class="line" x="35" y="35" width="115" height="105"/><circle class="accent vxy" cx="75" cy="95" r="9"/><path class="blue" d="M280 48q40-35 80 0-40 35-80 0"/><g class="vy">${cube(296,86)}</g><text x="45" y="160">TOUCH = XY</text><text x="285" y="160">HEAD = Z</text>`+C;
        case"paddle":return O+`<g class="vscoop"><path class="accentline" d="M65 145l95-55"/><path class="accent" d="M135 68h65v42h-65z"/>${cube(160,45)}</g><path class="line" d="M25 146h365"/><text x="235" y="165">SCOOP + CARRY</text>`+C;
        case"matched":return O+`<path class="accentline vrotate" d="M40 75l45-30 45 30-45 30z"/><path class="line dash" d="M130 75h150"/><path class="hotline vrotate" d="M280 75l45-30 45 30-45 30z"/><text x="30" y="145">PHYSICAL FORM</text><text x="285" y="145">SAME VIRTUAL FORM</text>`+C;
        case"generic":return O+`<circle class="accent vrotate" cx="80" cy="85" r="38"/><path class="line dash vpulse" d="M120 85h80"/><g class="vfade">${cube(220,22)}<circle class="obj vstage2 vfade" cx="320" cy="105" r="32"/><path class="hotline vstage3 vfade" d="M210 150h150"/></g><text x="36" y="150">ONE PROXY</text><text x="225" y="170">MANY BINDINGS</text>`+C;
        case"arpen":return O+`<rect class="line" x="35" y="25" width="170" height="130"/><path class="line thin" d="M120 25v130M35 90h170"/><g class="vxy"><path class="accentline" d="M265 130l75-90"/><circle class="obj" cx="265" cy="130" r="7"/></g><path class="line dash" d="M120 90l145 40"/><text x="65" y="174">PHONE FRAME</text><text x="290" y="174">PEN TIP</text>`+C;
        case"speechPrecise":return O+`<path class="blue" d="M35 50q38-32 76 0-38 32-76 0"/><path class="line dash" d="M73 50l220 45"/>${cube(270,72)}<g class="vrotate"><path class="accentline" d="M270 55q35-35 70 0"/></g><rect class="line vpulse" x="110" y="15" width="125" height="35" rx="17"/><text x="127" y="37">ROTATE 30 DEG</text>`+C;
        case"reality":return O+`<path class="line" d="M30 35h110v115H30z"/><path class="hotline" d="M48 122l25-45 25 28 20-55"/><path class="line dash vdraw" d="M140 92h125"/><g class="vscale">${cube(280,65,"accent")}</g><text x="35" y="170">PHYSICAL OBJECT</text><text x="280" y="170">ABSTRACT PROXY</text>`+C;
        case"dragdrop":return O+`<rect class="line" x="25" y="35" width="120" height="110"/><rect class="line" x="275" y="35" width="120" height="110"/><g class="vx">${cube(62,70)}</g><path class="hotline vdraw" d="M120 55q80-75 175 0"/><text x="42" y="165">SOURCE REALITY</text><text x="292" y="165">TARGET REALITY</text>`+C;
        case"cutaway":return O+`<circle class="obj" cx="225" cy="90" r="70"/><circle class="line dash" cx="225" cy="90" r="42"/><path class="accentline vdraw" d="M145 105q75-80 155-20"/><g class="vclip"><circle fill="#13231d" cx="225" cy="90" r="42"/><path class="line" d="M190 90h70M225 55v70"/></g><path class="handmark" d="M55 135h48l20-22"/><text x="170" y="172">TRACE > REVEAL</text>`+C;
      }return O+hand+cube()+C;
    }
    function vizPrecise(type){
      return `<div class="viz-stage" aria-label="Animated visualization: ${preciseNames[type]}"><div class="viz-label">${preciseNames[type]}</div>${preciseScene(type)}<div class="viz-caption"><span>INPUT</span><span>MAPPING</span><span>OUTPUT</span></div></div>`;
    }
    const methodTypes=["virtualHand","gogo","homer","ray","scaledGrab","wim","voodoo","imagePlane","handlebar","gizmo","articulated","handRay","gazeHand","touchHead","paddle","matched","generic","arpen","speechPrecise","reality","dragdrop","cutaway"];
    const methodCards=[...d.querySelectorAll(".method")];
    methodCards.forEach((card,i)=>card.addEventListener("click",()=>{
      const body=d.querySelector("#methodDialog .modal-body");
      body.querySelector(".viz-stage")?.remove();
      body.querySelector("#dialogBody").insertAdjacentHTML("afterend",vizPrecise(methodTypes[i]));
    }));

    const lineageTypes=["wim","gogo","homer","voodoo","paddle","handlebar","arpen","generic","reality"];
    const lineageDescriptions=[
      "A miniature world makes remote objects directly reachable through an exocentric proxy.",
      "A non-linear control–display mapping extends the virtual arm beyond physical reach.",
      "Ray acquisition transitions into hand-centered manipulation of the remote object.",
      "Two transient dolls encode the target and its bimanual reference frame.",
      "A tracked physical paddle pushes, carries, and redirects virtual content.",
      "An imaginary two-handed bar integrates translation, rotation, and scale.",
      "The phone establishes context while the pen supplies precise spatial action.",
      "A reusable physical shape is dynamically bound to many virtual forms.",
      "An abstract digital proxy makes distant or occluded physical objects manageable."
    ];
    [...d.querySelectorAll(".era")].forEach((card,i)=>{
      card.tabIndex=0;card.setAttribute("role","button");
      const open=()=>{
        d.querySelector("#dialogTitle").textContent=card.querySelector("h3").textContent;
        d.querySelector("#dialogBody").textContent=lineageDescriptions[i];
        d.querySelector("#dialogRef").textContent="Timeline milestone · "+card.querySelector("time").textContent;
        d.querySelector("#methodDialog .viz-stage")?.remove();
        d.querySelector("#dialogBody").insertAdjacentHTML("afterend",vizPrecise(lineageTypes[i]));
        d.querySelector("#methodDialog").showModal();
      };
      card.addEventListener("click",open);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open()}});
    });

    const metaphorTypes=["virtualHand","gogo","ray","homer","wim","voodoo","scaledGrab","handlebar","gizmo","paddle","matched","generic","arpen","gazeHand","speechPrecise","reality"];
    const metaView=d.querySelector(".metaphor-view");
    function setMetaViz(i){
      metaView.querySelector(".viz-stage")?.remove();
      metaView.querySelector("#metaRef").insertAdjacentHTML("beforebegin",vizPrecise(metaphorTypes[i]));
    }
    [...d.querySelectorAll(".metaphor-list button")].forEach((button,i)=>button.addEventListener("click",()=>setMetaViz(i)));
    setMetaViz(0);

    // Keep page-number semantics visible to the audience.
    d.querySelector("#methods .eyebrow").textContent="05 / Method families";
    d.querySelector("#lineage .eyebrow").textContent="06 / Manipulation lineage";
    d.querySelector("#metaphors .eyebrow").textContent="07 / Interaction metaphors";
    d.body.dataset.animatedReady="true";
})();
