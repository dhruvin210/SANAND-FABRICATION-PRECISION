export const servicesData = [
  {
    id: 'cnc-machining',
    name: 'CNC Machining',
    badge: 'Prototyping & Production',
    tagline: 'High-precision 3-axis, 4-axis, and 5-axis milling and turning down to ±0.001" (0.025 mm).',
    description: 'Precision CNC milling and turning for demanding applications in aerospace, automotive, medical, and robotics. Fast-turn parts from over 50 engineering metals and plastics.',
    capabilities: [
      '3-Axis, 4-Axis & Continuous 5-Axis Milling',
      'CNC Turning with Live Tooling & Sub-spindle',
      'Standard Tolerances: ISO 2768-m (±0.005" / ±0.125 mm)',
      'Precision Tolerances: down to ±0.001" (±0.025 mm)',
      'Max Part Size: Up to 60" x 30" x 28" (1524 x 762 x 711 mm)',
      'Surface Roughness: As-machined Ra 3.2 μm down to Ra 0.4 μm with grinding'
    ],
    materials: ['Aluminum 6061-T6 / 7075', 'Stainless Steel 304 / 316L / 17-4PH', 'Titanium Grade 5 (Ti-6Al-4V)', 'Brass C360', 'Delrin (POM)', 'PEEK', 'Polycarbonate'],
    finishes: ['As-Machined', 'Bead Blast', 'Anodize Type II (Color)', 'Anodize Type III (Hardcoat)', 'Electropolishing', 'Passivation', 'Powder Coating', 'Nickel Plating'],
    leadTime: 'As fast as 3 business days',
    minQuantity: '1 to 10,000+ pieces',
    designGuidelines: [
      { rule: 'Internal Corner Radii', advice: 'Use cutter radii >= 1/3 depth of cut. Minimum internal radius of 1.5mm is recommended.' },
      { rule: 'Wall Thickness', advice: 'Recommended minimum 0.8 mm for metals and 1.5 mm for plastics.' },
      { rule: 'Cavity Depth', advice: 'Limit pocket depth to 4x cavity width to prevent tool deflection.' },
      { rule: 'Threads & Tapping', advice: 'Specify standard UN / Metric threads. Maintain thread depth <= 3x nominal diameter.' }
    ],
    applications: ['Aerospace structural brackets', 'Liquid cooling manifolds', 'Robotic gearboxes & chassis', 'Downhole oil & gas housings', 'Optical sensor mounts'],
    faqs: [
      { q: 'What CAD file types are best for CNC quoting?', a: 'Native STEP (.stp, .step) files are preferred. Include 2D PDF drawings for threads, critical tolerances, and surface finish callouts.' },
      { q: 'Can you hold tighter tolerances than ±0.001"?', a: 'Yes. With jig boring, wire EDM, and cylindrical grinding, we can hold down to ±0.0002" (±0.005 mm) on specified critical dimensions.' },
      { q: 'Do you provide material certifications?', a: 'Yes, full Mill Test Reports (MTR) and Certificates of Conformance (CoC) are available upon request.' }
    ]
  },
  {
    id: '3d-printing',
    name: 'Industrial 3D Printing',
    badge: 'Additive Manufacturing',
    tagline: 'Production-grade additive manufacturing with SLS, SLA, HP Multi Jet Fusion (MJF), and DMLS metal.',
    description: 'Rapid prototyping and complex end-use production parts without tooling constraints. From resilient nylon SLS parts to high-density titanium and stainless metal prints.',
    capabilities: [
      'Selective Laser Sintering (SLS) - PA12 & PA11 Nylon',
      'HP Multi Jet Fusion (MJF) - High-density isotropic Nylon & TPU',
      'Stereolithography (SLA) - Ultra-fine detail & clear resins',
      'Direct Metal Laser Sintering (DMLS) - Titanium, Inconel, 316L, AlSi10Mg',
      'Layer Heights: 50 to 120 microns',
      'Complex internal channels and topological lattice structures'
    ],
    materials: ['PA12 Nylon (SLS/MJF)', 'PA12 Glass-Filled', 'TPU 88A (Flexible)', 'Accura 60 (Clear SLA)', 'Somos PerFORM (High-Temp)', 'AlSi10Mg Aluminum', '316L Stainless Steel', 'Ti-6Al-4V Titanium'],
    finishes: ['Raw / Depowdered', 'Vapor Smoothing', 'Dyed Black', 'Media Blasted', 'Clear Coat', 'Polished Metal (DMLS)'],
    leadTime: 'As fast as 2 business days',
    minQuantity: '1 to 1,000+ pieces',
    designGuidelines: [
      { rule: 'Minimum Wall Thickness', advice: '0.8 mm for SLS/MJF, 0.6 mm for SLA, 1.0 mm for DMLS metal.' },
      { rule: 'Clearance Between Moving Parts', advice: 'Maintain minimum 0.5 mm gap for sintered assemblies.' },
      { rule: 'Escape Holes for Hollow Parts', advice: 'Provide at least two 3mm escape holes for unsintered powder/resin drainage.' },
      { rule: 'Overhang Angle', advice: 'Features over 45° overhang require support structures in SLA and DMLS.' }
    ],
    applications: ['Functional fit prototypes', 'Custom robotics grippers', 'Fluid manifold prototypes', 'Lightweight aerospace brackets', 'Medical anatomical models'],
    faqs: [
      { q: 'Is MJF suitable for end-use functional parts?', a: 'Yes, HP Multi Jet Fusion produces nearly isotropic mechanical properties and watertight parts suitable for demanding production.' },
      { q: 'How does vapor smoothing improve 3D printed parts?', a: 'Chemical vapor smoothing seals micro-porosity, creating a smooth, glossy, liquid-tight surface comparable to injection molding.' }
    ]
  },
  {
    id: 'sheet-metal',
    name: 'Sheet Metal Fabrication',
    badge: 'Forming & Enclosures',
    tagline: 'Precision laser cutting, CNC press brake bending, stamping, hardware insertion, and welded assemblies.',
    description: 'Cost-effective custom sheet metal parts for industrial chassis, brackets, front panels, and complex enclosures. Fast prototype turnarounds to production volume stamping.',
    capabilities: [
      'Fiber Laser Cutting up to 20kW (±0.004" / ±0.1 mm accuracy)',
      'Waterjet Cutting for thick plates up to 4" (100 mm)',
      'Multi-axis CNC Press Brake Bending',
      'Hardware Insertion (PEM nuts, studs, standoffs)',
      'TIG & MIG Welding, Spot Welding, Robotic Seam Welding',
      'Graining, deburring, and edge rounding standard'
    ],
    materials: ['Aluminum 5052-H32 / 6061-T6 (0.5mm - 6.0mm)', 'Stainless Steel 304 / 316 (0.5mm - 9.5mm)', 'Cold Rolled Steel (CRS) / Galvannealed', 'Copper 110 & Brass 260'],
    finishes: ['As-Cut / Deburred', 'Grained / Brushed (#4)', 'Powder Coated', 'Zinc Plated (Clear/Yellow)', 'Anodized Aluminum', 'Silkscreen / Laser Marking'],
    leadTime: 'As fast as 4 business days',
    minQuantity: '1 to 5,000+ pieces',
    designGuidelines: [
      { rule: 'Uniform Thickness', advice: 'Maintain consistent gauge throughout sheet metal component.' },
      { rule: 'Bend Radius', advice: 'Design with internal bend radius >= material thickness (R = T).' },
      { rule: 'Hole to Edge Distance', advice: 'Keep holes at least 2x material thickness away from bends and edges to prevent distortion.' },
      { rule: 'Relief Notches', advice: 'Add corner bend reliefs with width >= material thickness.' }
    ],
    applications: ['Server rack enclosures & chassis', 'Industrial electronics housings', 'Mounting brackets & busbars', 'Control panel faceplates', 'Automotive battery trays'],
    faqs: [
      { q: 'What files are needed for sheet metal quoting?', a: 'A 3D CAD model (STEP) showing the formed part, along with a 2D DXF or flat pattern PDF specifying hardware and finishes.' },
      { q: 'Can you install PEM fasteners during fabrication?', a: 'Yes, we stock standard imperial and metric PEM nuts, studs, and standoffs and install them per manufacturer specs.' }
    ]
  },
  {
    id: 'injection-molding',
    name: 'Injection Molding',
    badge: 'High-Volume Production',
    tagline: 'Rapid aluminum tooling for bridge production and hardened steel molds for millions of plastic parts.',
    description: 'High-speed, repeatable plastic injection molding with full engineering DFM feedback. Rapid tooling delivered in 10-15 days for bridge runs, plus hardened multi-cavity production tooling.',
    capabilities: [
      'Rapid Tooling (QC-10 Aluminum & Pre-hardened P20 Steel)',
      'Production Tooling (H13 & S7 Hardened Tool Steel)',
      'Overmolding & Two-Shot (2K) Molding',
      'Insert Molding for brass threaded inserts and metal pins',
      'Tonnage range: 25 tons to 1,200 tons',
      'Full DFM moldability analysis included with every quote'
    ],
    materials: ['ABS', 'Polycarbonate (PC)', 'PC/ABS Blend', 'Nylon 6 / 66 (Glass-filled available)', 'Polypropylene (PP)', 'POM (Delrin/Acetal)', 'TPE / TPU / Silicone', 'PEEK'],
    finishes: ['SPI A-2 (High Gloss Diamond Buff)', 'SPI B-1 (Fine Paper Finish)', 'SPI C-1 (Stone Finish)', 'VDI 3400 Spark Erosion Textures', 'Mold-Tech Textures (MT-11010, MT-11020)'],
    leadTime: 'Tooling in 10-15 business days; Parts in 3-5 days',
    minQuantity: '100 to 1,000,000+ parts',
    designGuidelines: [
      { rule: 'Draft Angles', advice: 'Provide 1° to 2° draft on all vertical faces; 3° to 5° for heavy textures.' },
      { rule: 'Constant Wall Thickness', advice: 'Avoid thick sections that cause sink marks and internal voids.' },
      { rule: 'Rib Design', advice: 'Keep rib thickness between 50% - 60% of adjacent nominal wall thickness.' },
      { rule: 'Radii at Corners', advice: 'Use generous corner radii (0.5x wall thickness) to eliminate stress risers.' }
    ],
    applications: ['Medical device casings', 'Automotive interior bezels & connectors', 'Consumer electronics enclosures', 'Industrial valve components', 'Fluid pump impellers'],
    faqs: [
      { q: 'What is the difference between rapid tooling and production molds?', a: 'Rapid tooling uses aluminum or soft steel to deliver parts in 2 weeks for 100-10,000 parts. Production molds use hardened tool steel rated for 500,000+ cycles.' },
      { q: 'Do you offer Moldflow analysis?', a: 'Yes, our engineering team runs comprehensive filling, packing, cooling, and warpage simulations before cutting steel.' }
    ]
  },
  {
    id: 'urethane-casting',
    name: 'Urethane Casting',
    badge: 'Bridge & Small Batch',
    tagline: 'Silicone mold vacuum casting for 10 to 100+ production-grade polyurethane components.',
    description: 'Ideal bridge manufacturing solution for low-volume runs without high steel tooling capital costs. Matches engineering plastics with excellent surface finishes and overmolding.',
    capabilities: [
      'Silicone RTV Room-Temperature Vulcanizing Tooling',
      'Vacuum Degassing & Casting for bubble-free parts',
      'Shore Hardnesses from 20 Shore A (Soft rubber) to 85 Shore D (Rigid ABS-like)',
      'Color matching to custom Pantone or RAL codes',
      'Clear optical grades and flame-retardant (UL94-V0) resins'
    ],
    materials: ['ABS-like Polyurethane', 'PP-like Elastomeric Polyurethane', 'Polycarbonate-like Clear Resin', 'High-Temp Polyurethane (up to 140°C)', 'Rubber-like PU (30A - 90A)'],
    finishes: ['Smooth Gloss', 'Semi-Gloss / Satin', 'Custom Texture Matched', 'Custom Pigment Tinted', 'Painted & Pad Printed'],
    leadTime: '7 to 10 business days',
    minQuantity: '10 to 100+ parts per silicone mold',
    designGuidelines: [
      { rule: 'Zero Draft Allowed', advice: 'Flexible silicone molds allow zero draft on many geometries and slight undercuts.' },
      { rule: 'Wall Thickness', advice: 'Recommended 1.5 mm to 5.0 mm for uniform curing.' },
      { rule: 'Inserts & Overmolds', advice: 'Brass threaded inserts can be cast directly in place with excellent retention.' }
    ],
    applications: ['Clinical trial medical housings', 'Tradeshow and consumer test units', 'Small batch drone frames', 'Elastomeric seals and gaskets'],
    faqs: [
      { q: 'How many parts can a single silicone mold produce?', a: 'Typically 15 to 25 parts depending on resin chemistry, part geometry, and required surface finish.' },
      { q: 'Can urethane cast parts be flame rated?', a: 'Yes, we offer certified UL94 V-0 flame-retardant polyurethane casting resins.' }
    ]
  }
];
