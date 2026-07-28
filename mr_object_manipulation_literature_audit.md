# Object Manipulation and Transformation in Mixed Reality

## Literature audit, version 1 — 28 July 2026

### Scope and interpretation

This report treats **object manipulation** as acquiring/selecting an object, changing its spatial or intrinsic state, and releasing/confirming it. Spatial transformation includes translation, rotation, and scaling (3 + 3 + 3 degrees of freedom, often called 9-DOF manipulation). Intrinsic transformation includes deformation, editing, duplication, grouping, assembly, cutting, and property changes. “Mixed reality” is used broadly enough to include optical/video see-through AR and immersive XR when a technique is foundational to later MR systems.

No finite search can literally establish “all papers.” This first audit is a **high-recall conceptual map and seed set**, centered on surveys, seminal techniques, MR-specific comparisons, and implementation sources. It excludes papers in robotics where “object manipulation” means autonomous robot control, papers that only visualize objects, and application papers that use an off-the-shelf grab interaction without making an interaction contribution.

### Search protocol

- Sources searched: ACM Digital Library, IEEE/ISMAR/VR proceedings, Wiley Computer Graphics Forum, ScienceDirect, publisher/repository copies, and official SDK documentation.
- Query families: `"mixed reality" object manipulation`, `"augmented reality" 3D object manipulation`, distant/remote manipulation, tangible AR, bimanual manipulation, hand/gaze/speech manipulation, object transformation/deformation, and names found by backward chaining from surveys.
- Anchor survey: Mendes et al., *A Survey on 3D Virtual Object Manipulation: From the Desktop to Immersive Virtual Environments*, CGF 2019, DOI [10.1111/cgf.13390](https://doi.org/10.1111/cgf.13390).
- Inclusion labels used below:
  - **F** — foundational immersive 3D/VR work inherited by MR;
  - **MR** — evaluated or designed specifically for AR/MR;
  - **S** — survey/taxonomy;
  - **SDK** — implementation framework or design documentation.

## 1. Key concepts and their references

| Key concept | Meaning in manipulation research | Representative reference(s) |
|---|---|---|
| Selection–manipulation–release | Manipulation is a compound task: acquire a target, transform it, and terminate/confirm. Selection and manipulation may use the same or different techniques. | Bowman & Hodges, 1997 [F]; Mendes et al., 2019 [S] |
| Degrees of freedom (DOF) | Translation is 3 DOF, rotation is 3 DOF, and uniform/nonuniform scale adds 1 or 3; full spatial transform is commonly treated as 7 or 9 DOF. | Mendes et al., 2019 [S]; Caputo et al., 2024 [MR] |
| Integrated vs. separated DOF | All transform dimensions can be controlled simultaneously, or position/orientation/scale can be decomposed into modes/widgets. Integration is fluid but can introduce unwanted motion; separation generally improves precision. | Mendes et al., 2019 [S]; Caputo et al., 2024 [MR] |
| Direct vs. indirect manipulation | Direct techniques couple a hand/prop to the object; indirect techniques use rays, widgets, screens, gaze, controllers, or proxies. “Direct” can be perceptual rather than physically co-located. | Poupyrev et al., 1998 [F]; Microsoft direct-manipulation guidance [SDK] |
| Egocentric vs. exocentric manipulation | Egocentric techniques operate from the user/body/viewpoint; exocentric techniques manipulate a world or object proxy from outside, often at miniature scale. | Poupyrev et al., 1998 [F]; Stoakley et al., 1995 [F] |
| Near vs. far interaction | Near interaction approximates touching/grasping; far interaction targets beyond arm’s reach via ray, gaze, nonlinear reach, or proxy. Hybrid techniques transition between them. | Bowman & Hodges, 1997 [F]; MRTK ObjectManipulator [SDK] |
| Isomorphic vs. non-isomorphic mapping | Isomorphic input maps physical motion 1:1 to virtual motion. Non-isomorphic mappings use gain, nonlinear reach, snapping, constraints, clutching, or scale changes. | Poupyrev et al., Go-Go, 1996 [F]; Mendes et al., 2019 [S] |
| Control–display gain | Ratio between physical input motion and virtual result. Dynamic gain can combine coarse reach with fine positioning. | Poupyrev et al., 1996 [F]; Ro et al., 2017 [MR] |
| Reference frame | Transformations may be expressed in world, object, view, hand, surface, or user coordinates. Frame choice affects predictability, especially for rotation and bimanual work. | Pierce et al., 1999 [F]; Mendes et al., 2019 [S] |
| Position–orientation coupling | Free 6-DOF hand motion naturally couples translation and rotation, which is fast but can create accidental changes. Widgets and constraints decouple them. | Mendes et al., 2019 [S]; Caputo et al., 2024 [MR] |
| Bimanual asymmetric interaction | The nondominant hand establishes context/frame/scale while the dominant hand performs precise action; based on Guiard’s kinematic-chain model. | Guiard, 1987; Cutler et al., 1997 [F]; Pierce et al., 1999 [F] |
| Symmetric bimanual manipulation | Both hands jointly define translation, rotation, and scale (e.g., midpoint, hand-to-hand vector, and distance). | Schultheis et al., 2012 [F]; MRTK ObjectManipulator [SDK] |
| Proprioception and kinesthetic correspondence | Users exploit knowledge of hand/body location even without visual attention; co-located input generally aids spatial control. | Mine et al., 1997; Hinckley et al., 1994 |
| Tangible/proxy manipulation | A tracked physical prop controls a virtual object, providing passive haptics and a stable grasp. Proxies may be form-matched, generic, or dynamically assigned. | Kato et al., 2000 [MR]; Ha & Woo, 2010 [MR]; Englmeier et al., 2020 [MR] |
| Space- vs. time-multiplexed input | Space-multiplexed props maintain dedicated physical controls/objects; time-multiplexed controllers reuse one device for multiple objects/functions. | Fitzmaurice et al., 1995; Bozgeyikli & Bozgeyikli, 2020 [MR] |
| Passive haptics | Real surfaces/props supply contact, shape, resistance, or support without active force feedback. | Hinckley et al., 1994; Englmeier et al., 2020 [MR] |
| Constraints, snapping, and semantic placement | Transform updates may be restricted to axes, planes, surfaces, valid sockets, collision-free poses, or semantic relations. These reduce DOF and improve accuracy. | Mendes et al., 2019 [S]; MRTK Constraints/BoundsControl [SDK] |
| Affordances and handles | Bounding boxes, corners, edges, axes, and rings expose which transformations are available and separate their control. | Microsoft BoundsControl/direct manipulation [SDK] |
| Clutching and remapping | A user temporarily disengages input to reposition the hand/controller or change mapping without moving the object. | Mendes et al., 2019 [S] |
| Occlusion and disocclusion | Hands, real objects, and virtual geometry can hide targets or feedback. Remedies include rays, proxies, transparency, cutaways, and viewpoint-dependent techniques. | Yu et al., 2020; eye-gaze/controller AR method, 2022 [MR] |
| Registration and anchoring | MR manipulation depends on stable alignment between real and virtual coordinate systems; errors produce drift, misplacement, and incorrect contact. | Azuma, 1997; Kato et al., 2000 [MR] |
| Scene understanding and physical plausibility | Spatial meshes, planes, semantics, gravity, collision, and physics allow holograms to rest on and interact with the real environment. | MRTK spatial manipulation [SDK]; OpenXR/engine spatial APIs |
| Feedback and feedforward | Highlighting, proximity response, ghost poses, rays, handles, shadows, audio, and haptics communicate eligibility, state, depth, and consequences. | Microsoft BoundsControl [SDK]; Bowman & Hodges, 1997 [F] |
| Precision–speed trade-off | Natural mid-air control is expressive but noisy and fatiguing; widgets, constraints, gain adjustment, and DOF separation improve precision at a cost in fluidity. | Mendes et al., 2019 [S]; Caputo et al., 2024 [MR] |
| Gorilla-arm fatigue | Sustained mid-air manipulation produces fatigue; distant rays, gaze, rested handheld input, and tangible surfaces can mitigate it. | Eye-gaze/controller AR method, 2022 [MR]; Caputo et al., 2024 [MR] |
| Docking task | Standard evaluation task: align an object with a target pose, often measuring time, positional/angular error, errors, workload, and usability. | Bowman & Hodges, 1997 [F]; Caputo et al., 2024 [MR] |
| Fitts’ law / throughput | Target acquisition and positioning performance can be modeled by movement distance and target tolerance; extended to 3D/TAR in some studies. | Ha & Woo, 2010 [MR] |
| Multimodal interaction | Gaze selects, hand/controller transforms, and speech specifies object, operation, axis, amount, or relation; modalities can be complementary or redundant. | Zhou et al., 2022 [MR]; Piumsomboon et al., 2014/2015 |
| Real–virtual object duality | Manipulation can affect a purely virtual object, a virtual proxy of a real object, or a physical object through an MR intermediary/robot. | Kato et al., 2000 [MR]; Reality Proxy, 2025 [MR]; HoloBots, 2023 [MR] |
| Intrinsic transformation | Beyond rigid transforms: deforming geometry, sculpting, cutting/cutaway, changing attributes/material, assembling, duplicating, and grouping. | Mendes et al., 2019 [S]; ARPen, 2019 [MR]; MR cutaway interface, 2025 [MR] |

## 2. Key interaction methods and implementation sources

### 2.1 Technique families

| Method / technique | Core mechanism | Origin / source |
|---|---|---|
| Simple Virtual Hand | 1:1 tracked hand/controller grabs and moves a reachable object; rotation follows hand orientation. | Poupyrev et al., *Egocentric Object Manipulation…*, CGF 1998, [DOI](https://doi.org/10.1111/1467-8659.00252) |
| Go-Go | Virtual arm follows the real arm near the body, then extends nonlinearly beyond a threshold. | Poupyrev et al., *The Go-Go Interaction Technique*, UIST 1996, [DOI](https://doi.org/10.1145/237091.237102) |
| HOMER | Ray-cast to select a remote object; virtual hand jumps to it, then hand-centered manipulation maps physical hand motion to object depth/motion. | Bowman & Hodges, *An Evaluation of Techniques for Grabbing and Manipulating Remote Objects…*, I3D 1997, [paper](https://www.cs.princeton.edu/courses/archive/spr01/cs598b/papers/bowman97.pdf) |
| Ray casting / laser pointer | Point a ray at an object; translate along/relative to the ray and rotate/scale using controller, touch, or gesture mappings. | Bowman & Hodges, 1997; Ro et al., *AR Pointer*, 2018 |
| Dynamic-depth ray casting | Ray depth and distance-sensitive gain allow arbitrary 3D placement and finer distant control. | Ro et al., SMC 2017, [DOI](https://doi.org/10.1109/SMC.2017.8123063) |
| Scaled-world grab | Temporarily scale the world/user relationship so a distant object becomes reachable, then manipulate directly. | Mine et al./Bowman taxonomy; evaluated by Bowman & Hodges, 1997 |
| World-in-Miniature (WIM) | Hold a miniature copy of the environment and manipulate corresponding small objects. | Stoakley, Conway & Pausch, CHI 1995, [full text](https://www.cs.cmu.edu/~stage3/publications/95/conferences/chi/paper.html) |
| Voodoo Dolls | Create transient handheld copies; the nondominant doll supplies a reference frame and the dominant doll controls the target across scale. | Pierce, Stearns & Pausch, I3D 1999, [paper](https://citeseerx.ist.psu.edu/document?doi=78361325d937304ed78413adbdb9ce2aba408388&repid=rep1&type=pdf) |
| Image-plane / sticky-finger selection | Select using 2D projection/image-plane coincidence, then map hand/finger motion into 3D. | Pierce et al., *Image Plane Interaction Techniques in 3D Immersive Environments*, I3D 1997 |
| Handle-bar metaphor | Two hands grasp an imaginary bar attached to an object; bar motion controls translation/rotation and hand distance can control scale. | Song et al., CHI 2012, [DOI](https://doi.org/10.1145/2208516.2208585) |
| Bounding box / 3D widgets | Explicit handles separate move, axis rotation, and scale operations; enables precise constrained control. | Microsoft BoundsControl [documentation](https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk2/features/ux-building-blocks/bounds-control?view=mrtkunity-2022-05) |
| Direct articulated-hand grab | Pinch/grasp near the hologram; one hand moves/rotates, two hands additionally scale/rotate. | Microsoft HoloLens 2 direct manipulation [guidance](https://learn.microsoft.com/en-us/windows/mixed-reality/design/direct-manipulation) |
| Hand ray / pinch at distance | Gaze/head or hand ray targets a remote object, pinch selects, and hand motion manipulates it. | MRTK ObjectManipulator [documentation](https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk2/features/ux-building-blocks/object-manipulator?view=mrtkunity-2022-05) |
| Gaze + hand/controller | Gaze chooses the target; a rested hand/controller performs the transform, reducing reach and occlusion. | *Object Manipulation Method Using Eye Gaze and Hand-held Controller in AR Space*, VRST 2022, [DOI](https://doi.org/10.1145/3562939.3565659) |
| Touch + head/device motion | Touch controls some DOF while head or handheld-device motion supplies depth/orientation or mode separation. | Lee et al., *Virtual Object Manipulation by Combining Touch and Head Interactions…*, 2019, [DOI](https://doi.org/10.3390/app9142933) |
| Tangible AR paddle | A tracked paddle pushes, carries, selects, or reorients virtual objects on a tabletop. | Kato et al., ISAR 2000, [DOI](https://doi.org/10.1109/ISAR.2000.880934) |
| Form-matched tangible proxy | A physical object with matching shape/size represents the virtual target, maximizing passive-haptic correspondence. | Bozgeyikli & Bozgeyikli, 2020; Englmeier et al., 2020 |
| Generic tangible proxy | A reusable sphere/cube/controller is dynamically bound to differently shaped virtual objects. | Englmeier et al., IEEE VR 2020, [DOI](https://doi.org/10.1109/VR46266.2020.00040) |
| Pen + phone (ARPen) | Smartphone supplies the AR view/context; tracked pen provides precise bimanual mid-air modeling/manipulation. | Wacker et al., CHI 2019, [paper](https://hci.rwth-aachen.de/publications/wacker2019a.pdf) |
| Gesture + speech | Deictic gestures identify targets/directions while speech names actions, axes, quantities, or relations. | Zhou, Williams & Ortega, 2022, [arXiv](https://arxiv.org/abs/2207.12566) |
| Proxy of a real object | Generate an abstract digital proxy for a distant/occluded/large real object and manipulate the proxy. | *Reality Proxy*, UIST 2025, [DOI](https://doi.org/10.1145/3746059.3747709) |
| MR drag-and-drop across real/virtual | Select a real/virtual source object and transfer/place its digital representation at another physical location. | *HoloSpot: Intuitive Object Manipulation via Mixed Reality Drag-and-Drop*, 2025, [paper](https://holospot.github.io/static/pdf/holospot_paper.pdf) |

### 2.2 Toolkits, engines, standards, and libraries

These are implementation methods, not research metaphors. A paper should cite the exact version used.

| Toolkit / API | Relevant components or role | Primary source |
|---|---|---|
| Microsoft Mixed Reality Toolkit (MRTK2) | `ObjectManipulator`, `NearInteractionGrabbable`, `BoundsControl`, constraints, near/far pointers, one/two-hand transforms. | [MRTK2 ObjectManipulator](https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk2/features/ux-building-blocks/object-manipulator?view=mrtkunity-2022-05); [GitHub](https://github.com/microsoft/MixedRealityToolkit-Unity) |
| MRTK3 | Modular spatial manipulation built around interactors/interactables; `ObjectManipulator`, constraints, injected manipulation and smoothing logic; interoperates with XRI. | [MRTK3 ObjectManipulator](https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk3-spatialmanipulation/packages/spatialmanipulation/object-manipulator); [GitHub](https://github.com/MixedRealityToolkit/MixedRealityToolkit-Unity) |
| Unity XR Interaction Toolkit (XRI) | `XRGrabInteractable`, direct/ray/socket interactors, attach transforms, movement modes, throw, two-hand extensions through custom transformers. | [Unity XRI manual](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@latest) |
| Unity AR Foundation | Cross-platform planes, anchors, raycasts, meshing, occlusion, image/object tracking; typically paired with XRI for manipulation. | [AR Foundation manual](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@latest) |
| OpenXR | Cross-vendor XR application/device interface; actions, spaces, hand tracking, eye gaze, spatial entities via core/extensions. It does not prescribe a manipulation metaphor. | [Khronos OpenXR](https://www.khronos.org/openxr/) |
| Unreal Engine XR / OpenXR | Interaction implemented with Enhanced Input, motion-controller/hand poses, traces, physics handles, and OpenXR plugins. | [Unreal OpenXR documentation](https://dev.epicgames.com/documentation/en-us/unreal-engine/openxr-in-unreal-engine) |
| Meta XR Interaction SDK | Hand/controller interactors, grab interactables, distance interaction, hand poses, transformers, and building blocks. | [Meta XR Interaction SDK repository](https://github.com/oculus-samples/Unity-InteractionSDK-Samples) |
| Ultraleap Unity Plugin / Interaction Engine | Optical hand tracking, physical hands, contact/grasp logic, pose detection, near/far hand interaction. | [Ultraleap Unity documentation](https://docs.ultraleap.com/xr-and-tabletop/xr/unity/) |
| Magic Leap 2 SDK / MRTK support | OpenXR hand/controller input, spatial anchors/meshing, eye gaze; manipulation commonly implemented with Unity XRI/MRTK. | [Magic Leap developer documentation](https://developer-docs.magicleap.cloud/docs/guides/unity-openxr/getting-started/openxr-overview/) |
| Vuforia Engine | Image/model/area targets and tracking for mobile/head-worn AR; manipulation logic is supplied by Unity/application code. | [Vuforia Engine library](https://developer.vuforia.com/library/) |
| ARToolKit | Seminal open-source fiducial tracking library used by early tangible/tabletop AR manipulation systems. | Kato et al., 2000; [ARToolKitX](https://www.artoolkitx.org/) |
| WebXR Device API | Browser XR sessions, reference spaces, input sources, hit testing, anchors, and hand input; manipulation is application-defined (often Three.js/Babylon.js). | [W3C WebXR Device API](https://www.w3.org/TR/webxr/) |
| three.js / Babylon.js | Web rendering, transforms, ray casting, gizmos, controllers and WebXR integration. | [three.js WebXR](https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content); [Babylon.js WebXR](https://doc.babylonjs.com/features/featuresDeepDive/webXR/) |

## 3. Key metaphors proposed or adopted in the field

“Metaphor” is used strictly here: the conceptual model presented to the user, not merely the sensor or software stack.

| Metaphor | User’s mental model | Typical strengths / limits | Reference |
|---|---|---|---|
| Virtual hand / grasp | “My tracked hand is the hand in the mixed world.” | Natural and learnable; limited by reach, tracking, occlusion, and absent haptics. | Poupyrev et al., 1998 |
| Arm extension (Go-Go) | “My arm can stretch supernaturally.” | Keeps hand metaphor at distance; nonlinear gain can reduce precision/predictability. | Poupyrev et al., 1996 |
| Laser pointer / ray | “I point at the object with a beam.” | Fast distant selection; depth and rotation need extra mappings. | Bowman & Hodges, 1997; AR Pointer |
| HOMER | “I point, then my hand reaches the object.” | Combines ray acquisition with hand-centered manipulation; mode transition and depth mapping require care. | Bowman & Hodges, 1997 |
| World-in-Miniature / dollhouse | “I hold and edit a small copy of the world.” | Excellent reach and overview; small targets, occlusion, scale, and correspondence can be difficult. | Stoakley et al., 1995 |
| Voodoo Dolls | “A handheld doll/proxy controls its remote counterpart.” | Supports distance, multiple scales, and explicit reference frames; creates/manages proxies and is bimanually demanding. | Pierce et al., 1999 |
| Scaled world / giant user | “The world shrinks, or I become large, so everything is reachable.” | Preserves direct grasp; changes scale/context and may disorient. | Bowman & Hodges, 1997 |
| Image plane / sticky finger | “I touch or pinch the object’s projection in my view.” | Rapid for visible targets; ambiguous depth and sensitive to viewpoint/occlusion. | Pierce et al., 1997 |
| Handle bar | “I hold an invisible bar fixed to the object.” | Natural bimanual 6/7-DOF control and scale; hands may occlude and coupled DOF can reduce precision. | Song et al., 2012 |
| Bounding box / cage | “The object is inside an editable box with handles.” | Discoverable, precise, constrains DOF; visual clutter and mode/handle acquisition. | Microsoft BoundsControl |
| 3D gizmo / axis handle | “I drag the object along axes, planes, rings, or scale handles.” | Precise and familiar to CAD users; less natural and small handles are hard in mid-air. | Mendes et al., 2019 |
| Direct touch / push | “The hologram behaves like a nearby physical object.” | Strong co-location and immediacy; lacks real contact and is vulnerable to depth error. | HoloLens 2 direct manipulation |
| Magic paddle | “A physical paddle scoops, pushes, carries, or reveals virtual content.” | Tangible, collaborative, passive-haptic; prop/marker and tracking constraints. | Kato et al., 2000 |
| Physical twin / tangible proxy | “This real object stands for the virtual object.” | Stable grasp and passive haptics; one-to-one props do not scale to many forms. | Ha & Woo, 2010; Bozgeyikli & Bozgeyikli, 2020 |
| Generic graspable proxy | “This reusable ball/cube becomes whichever object I bind to it.” | Scalable and tactile; shape mismatch weakens correspondence. | Englmeier et al., 2020 |
| Tool / pen | “I edit the scene with a familiar precision instrument.” | Precise pointing, drawing, and modeling; requires a prop and mappings for 6+ DOF. | ARPen, 2019 |
| Touchscreen as window/controller | “I manipulate through a handheld window onto the mixed world.” | Familiar multi-touch and rested input; splits attention and maps 2D to 3D. | Lee et al., 2019; Dual-MR |
| Gaze-and-grab | “I look at what I want, then operate it with my hand/controller.” | Very fast target specification and less arm motion; Midas-touch and gaze precision issues. | VRST 2022 gaze/controller method |
| Speech + gesture | “I point to the thing and say what should happen.” | Efficient semantic commands and DOF disambiguation; recognition, social, and timing ambiguity. | Zhou et al., 2022 |
| Drag-and-drop | “I pick something up here and drop it there,” including across real/virtual representations. | Familiar transfer model; correspondence and target feedback are crucial. | HoloSpot, 2025 |
| Abstract reality proxy | “I bring a manageable representation of a real thing to me.” | Works around distance, size, clutter, and occlusion; depends on sensing and proxy fidelity. | Reality Proxy, 2025 |
| Cutaway / X-ray tool | “I trace/cut a window to reveal what is inside.” | Natural for inspection and intrinsic transformation; requires robust surface registration. | MR tangible cutaway interface, 2025 |
| Ghost / snapping target | “I align the object with a preview/socket and it settles into place.” | Excellent for assembly and docking; restricts free placement and requires valid-target semantics. | Common in XRI/MRTK socket/constraint systems |

## 4. Core paper set for audit

### Surveys and taxonomies

1. Mendes, Caputo, Giachetti, Ferreira & Jorge (2019). *A Survey on 3D Virtual Object Manipulation: From the Desktop to Immersive Virtual Environments*. Computer Graphics Forum 38(1), 21–45. [DOI](https://doi.org/10.1111/cgf.13390). **S**
2. Bowman & Hodges (1999). *Formalizing the Design, Evaluation, and Application of Interaction Techniques for Immersive Virtual Environments*. Journal of Visual Languages & Computing. **F/S**
3. LaViola et al. (2017). *3D User Interfaces: Theory and Practice*, 2nd ed. (book synthesis; manipulation taxonomy). **S**
4. Azuma (1997). *A Survey of Augmented Reality*. Presence. [DOI](https://doi.org/10.1162/pres.1997.6.4.355). **S/MR**

### Foundational technique papers inherited by MR

5. Stoakley, Conway & Pausch (1995). *Virtual Reality on a WIM: Interactive Worlds in Miniature*. CHI. [Full text](https://www.cs.cmu.edu/~stage3/publications/95/conferences/chi/paper.html). **F**
6. Poupyrev, Billinghurst, Weghorst & Ichikawa (1996). *The Go-Go Interaction Technique: Non-linear Mapping for Direct Manipulation in VR*. UIST. [DOI](https://doi.org/10.1145/237091.237102). **F**
7. Bowman & Hodges (1997). *An Evaluation of Techniques for Grabbing and Manipulating Remote Objects in Immersive Virtual Environments*. I3D. [Paper](https://www.cs.princeton.edu/courses/archive/spr01/cs598b/papers/bowman97.pdf). **F**
8. Pierce et al. (1997). *Image Plane Interaction Techniques in 3D Immersive Environments*. I3D. **F**
9. Poupyrev, Weghorst, Billinghurst & Ichikawa (1998). *Egocentric Object Manipulation in Virtual Environments: Empirical Evaluation of Interaction Techniques*. CGF. [DOI](https://doi.org/10.1111/1467-8659.00252). **F**
10. Pierce, Stearns & Pausch (1999). *Voodoo Dolls: Seamless Interaction at Multiple Scales in Virtual Environments*. I3D. [Paper](https://citeseerx.ist.psu.edu/document?doi=78361325d937304ed78413adbdb9ce2aba408388&repid=rep1&type=pdf). **F**
11. Song et al. (2012). *A Handle Bar Metaphor for Virtual Object Manipulation with Mid-air Interaction*. CHI. [DOI](https://doi.org/10.1145/2208516.2208585). **F**

### AR/MR-specific manipulation papers

12. Kato, Billinghurst, Poupyrev, Imamoto & Tachibana (2000). *Virtual Object Manipulation on a Table-top AR Environment*. ISAR. [DOI](https://doi.org/10.1109/ISAR.2000.880934). **MR**
13. Ha & Woo (2010). *An Empirical Evaluation of Virtual Hand Techniques for 3D Object Manipulation in a Tangible Augmented Reality Environment*. **MR**
14. Ro et al. (2017). *A Dynamic Depth-variable Ray-casting Interface for Object Manipulation in AR Environments*. SMC. [DOI](https://doi.org/10.1109/SMC.2017.8123063). **MR**
15. Ohlei, Winkler, Wessel & Herczeg (2018). *Evaluation of Direct Manipulation Methods in Augmented Reality Environments Using Google Glass*. ISMAR Adjunct. [DOI](https://doi.org/10.1109/ISMAR-Adjunct.2018.00083). **MR**
16. Goh, Sunar, Ismail & Andias (2018). *An Inertial Device-based User Interaction with Occlusion-free Object Handling in Handheld AR*. [Article](https://publisher.uthm.edu.my/ojs/index.php/ijie/article/view/2831). **MR**
17. Wacker et al. (2019). *ARPen: Mid-Air Object Manipulation Techniques for a Bimanual AR System with Pen & Smartphone*. CHI. [Paper](https://hci.rwth-aachen.de/publications/wacker2019a.pdf). **MR**
18. Lee et al. (2019). *Virtual Object Manipulation by Combining Touch and Head Interactions for Mobile AR*. Applied Sciences. [DOI](https://doi.org/10.3390/app9142933). **MR**
19. Nomura et al. (2020). *Object Manipulation for Perceiving a Sense of Material using User-Perspective Mobile AR*. [DOI](https://doi.org/10.3169/mta.8.245). **MR**
20. Englmeier, Doerner, Butz & Höllerer (2020). *A Tangible Spherical Proxy for Object Manipulation in AR*. IEEE VR. [DOI](https://doi.org/10.1109/VR46266.2020.00040). **MR**
21. Bozgeyikli & Bozgeyikli (2020). *Evaluating Object Manipulation Interaction Techniques in Mixed Reality: Tangible User Interfaces and Gesture*. **MR**
22. Zhou, Williams & Ortega (2022). *Eliciting Multimodal Gesture+Speech Interactions in a Multi-Object AR Environment*. [arXiv](https://arxiv.org/abs/2207.12566). **MR**
23. *Object Manipulation Method Using Eye Gaze and Hand-held Controller in AR Space* (2022). VRST. [DOI](https://doi.org/10.1145/3562939.3565659). **MR**
24. Caputo et al. (2024). *Comparison of Deviceless Methods for Distant Object Manipulation in Mixed Reality*. Computers & Graphics. [Publisher page](https://www.sciencedirect.com/science/article/abs/pii/S0097849324000943). **MR**
25. Ihara et al. (2023). *HoloBots: Augmenting Holographic Telepresence with Mobile Robots for Tangible Remote Collaboration in MR*. [arXiv](https://arxiv.org/abs/2307.16114). **MR**
26. *Creating and Manipulating 3D Paths with Mixed Reality Spatial Interfaces* (2023). Frontiers in Virtual Reality. [Article](https://www.frontiersin.org/journals/virtual-reality/articles/10.3389/frvir.2023.1192757/full). **MR**
27. *HoloSpot: Intuitive Object Manipulation via Mixed Reality Drag-and-Drop* (2025). [Paper](https://holospot.github.io/static/pdf/holospot_paper.pdf). **MR**
28. *Reality Proxy: Fluid Interactions with Real-World Objects in MR via Abstract Representations* (2025). UIST. [DOI](https://doi.org/10.1145/3746059.3747709). **MR**
29. *The Design and Evaluation of a Tangible Interface for Cutaway Visualization in Mixed Reality* (2025). Computers & Graphics. [Publisher page](https://www.sciencedirect.com/science/article/abs/pii/S009784932500295X). **MR**

## 5. Synthesis and research gaps

1. **Most MR systems recombine established metaphors rather than inventing entirely new ones.** HoloLens-style hand rays combine ray selection, HOMER-like remote acquisition, and virtual-hand transformation; bounding controls translate desktop 3D gizmos into spatial UI.
2. **The central design decision is not the sensor but the control mapping.** Important dimensions are direct/indirect, near/far, integrated/separated DOF, one/two hand, egocentric/exocentric, and isomorphic/non-isomorphic.
3. **Rigid transformation dominates.** Translation and rotation appear almost universally; scale is less consistent; deformation, topology change, grouping, and semantic transformation are comparatively under-studied in head-worn MR.
4. **Remote deviceless manipulation remains unresolved.** Hand rays are accessible but offer weak depth control, no contact force, tracking noise, fatigue, and coupled-DOF errors.
5. **Tangible interaction reliably improves contact and stability but creates deployment costs.** Generic proxies, encountered-type haptics, and real-object proxies are attempts to balance tactile benefit against prop proliferation.
6. **Comparability is weak.** Studies differ in target distance, object size, DOF, tracking, device, constraints, and dependent measures. A useful audit should record these variables rather than compare completion times directly.
7. **Real-object manipulation through MR is an emerging frontier.** Reality Proxy, HoloBots, and drag-and-drop systems extend the question from “how do I move a hologram?” to “how does a virtual representation safely and legibly act on a physical object?”

## 6. Audit flags

- Confirm the bibliographic metadata and final publication venue for items 21, 27, and 29 before formal citation.
- Decide whether the target review should include **VR-only foundational work**, **mobile AR**, **spatial modeling/deformation**, **robot-mediated physical manipulation**, and **collaborative multi-user manipulation**. They are mapped here but could become separate review strata.
- “MRTK” is a toolkit, not an experimental method. A paper should describe the actual configured interaction: near grab vs. hand ray, one vs. two hand, constraints, smoothing, physics, and visual affordances.
- SDK URLs labeled “latest” are moving targets; archive a version or cite a package/release tag in a paper.
