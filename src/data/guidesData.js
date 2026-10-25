export const guidesData = [
  {
    id: 'cnc-design-guide',
    title: 'CNC Machining DFM Guide: 7 Rules to Reduce Part Cost',
    category: 'Design for Manufacturing',
    readTime: '6 min read',
    summary: 'Practical engineering tips to cut CNC milling costs by up to 40% without compromising mechanical integrity.',
    sections: [
      {
        heading: '1. Standardize Internal Corner Radii',
        text: 'Milling tools are cylindrical. Sharp internal vertical corners require EDM or micro end mills which drastically inflate cycle time. Always design internal radii at least 1/3 the pocket depth, allowing standard roughing cutters to clear material smoothly.'
      },
      {
        heading: '2. Avoid Excessively Deep Pockets',
        text: 'Tool deflection increases with the cube of tool stick-out. Limit cavity depth to 4x cavity width whenever possible. For deeper cavities, relax bottom corner radii to allow larger corner radii tools.'
      },
      {
        heading: '3. Maintain Reasonable Wall Thickness',
        text: 'Thin walls vibrate under tool pressure, forcing machinist to take microscopic light cuts. Maintain minimum 0.8 mm for aluminum and 1.5 mm for plastics.'
      },
      {
        heading: '4. Limit Tap Depth to 3x Diameter',
        text: 'More than 80% of thread clamping force is carried by the first 3 to 4 threads. Tapping deeper than 3x nominal diameter increases tap breakage risk with zero tensile benefit.'
      }
    ]
  },
  {
    id: 'sheet-metal-design',
    title: 'Sheet Metal Bend Radii & K-Factor Engineering Reference',
    category: 'Sheet Metal Fabrication',
    readTime: '5 min read',
    summary: 'Mastering bend allowances, minimum flange lengths, and hole-to-bend clearance rules for precision formed parts.',
    sections: [
      {
        heading: 'Inside Bend Radius Rules',
        text: 'For 5052-H32 aluminum and mild steel, a 1:1 inside bend radius to material thickness (R = T) prevents cracking along outer bend fibers while utilizing standard bottom vee dies.'
      },
      {
        heading: 'Minimum Flange Length',
        text: 'A bent flange must be long enough to span across the press brake die opening before bottoming out. The formula is: Minimum Flange = 4x Material Thickness + Bend Radius.'
      },
      {
        heading: 'Hole-to-Bend Safe Clearance',
        text: 'Holes placed too close to a bend line will deform into an ellipse. Keep all pierced holes at a distance of at least (2x Material Thickness + Bend Radius) away from the bend line.'
      }
    ]
  },
  {
    id: '3d-printing-vs-cnc',
    title: '3D Printing vs. CNC Machining: When to Transition to Production',
    category: 'Process Selection',
    readTime: '8 min read',
    summary: 'A quantitative crossover analysis comparing piece-part cost, lead times, geometry freedom, and mechanical properties.',
    sections: [
      {
        heading: 'The Volume Crossover Point',
        text: 'For complex organic brackets under 100 mm in size, industrial 3D printing (HP MJF or SLS) has lower piece costs for quantities 1 to 25. Beyond 25 to 50 pieces, CNC machining with multi-part fixtures typically wins on unit economics.'
      },
      {
        heading: 'Material Property Considerations',
        text: 'While DMLS metal prints achieve >99.5% density, billet 6061-T6 or forged 7075 retains superior isotropic grain structure and higher fatigue limits under cyclic vibration.'
      }
    ]
  },
  {
    id: 'surface-roughness-guide',
    title: 'Surface Finish Ra Comparison & Callout Standards',
    category: 'Finishing & Quality',
    readTime: '4 min read',
    summary: 'Understanding Ra micro-inch vs. micro-meter values, sealing surfaces, bearing journals, and cosmetic expectations.',
    sections: [
      {
        heading: 'Ra 3.2 μm (125 μin) — Standard Machined',
        text: 'Standard high-speed roughing and semi-finishing. Suitable for general mounting brackets, structural flanges, and hidden mechanical components.'
      },
      {
        heading: 'Ra 1.6 μm (63 μin) — Good Finish',
        text: 'Tight-feed finishing cuts. Required for O-ring static face seals, slip-fit bushings, and cosmetic exterior faces prior to anodizing.'
      },
      {
        heading: 'Ra 0.8 μm (32 μin) — Precision Smooth',
        text: 'Very fine finishing cuts or light grinding. Mandatory for dynamic hydraulic shaft seals, precision guide ways, and high-vacuum CF flanges.'
      }
    ]
  }
];

export const faqData = [
  {
    q: 'Which manufacturing processes do you support?',
    a: 'Sanand Fabrication offers CNC Machining (3, 4, and 5-axis milling and turning), Industrial 3D Printing (SLS, SLA, HP MJF, DMLS metal), Sheet Metal Fabrication (laser cutting, waterjet, CNC press brake forming, hardware insertion), Plastic Injection Molding (rapid tooling and production molds), and Urethane Vacuum Casting.'
  },
  {
    q: 'Which CAD file formats can I upload for quotation?',
    a: 'We accept native 3D CAD files in STEP (.step, .stp), STL (.stl), IGES (.iges, .igs), and Parasolid (.x_t) formats. For sheet metal, 2D DXF and DWG flat patterns are accepted. For technical drawings detailing critical tolerances, threads, and surface finishes, please attach a PDF drawing.'
  },
  {
    q: 'Can I request a prototype or do you only handle production runs?',
    a: 'We support all volumes! You can order a single 1-off rapid prototype or scale up to production runs of 10,000+ parts. Our quoting engine provides tiered volume pricing discounts that update in real time.'
  },
  {
    q: 'Which materials are available?',
    a: 'We machine, print, and mold over 70 engineering materials, including Aluminum alloys (6061, 7075, 5052, 2024), Stainless Steels (304, 316L, 17-4 PH), Titanium Grade 5, Brass C360, Copper 110, Alloy Steels (4140, 1018), and engineering polymers including Delrin (POM), PEEK, Nylon PA12, ABS, Polycarbonate, and Ultem.'
  },
  {
    q: 'How does the quotation workflow work?',
    a: 'Simply upload your 3D CAD file in our RFQ panel, configure your desired manufacturing process, material, quantity, surface finish, and tolerances. Our engineering team reviews the geometry and requirements, verifies manufacturability, and returns a verified quotation with accurate lead times and line-item pricing.'
  },
  {
    q: 'Can I specify custom surface finishes and treatments?',
    a: 'Yes. We offer As-Machined, Bead Blasting, Type II Anodizing (in clear and multiple colors), Type III Hardcoat Anodizing, Electropolishing, Chemical Passivation (ASTM A967), Black Oxide, Industrial Powder Coating, and Zinc/Nickel Plating.'
  },
  {
    q: 'What quality inspections and certifications do you provide?',
    a: 'Every order undergoes standard in-process and final dimensional quality inspection. Upon request in your RFQ, we provide CMM Dimensional Metrology Reports, First Article Inspection (FAI) reports, Raw Material Mill Test Reports (MTR), and Certificates of Conformance (CoC).'
  },
  {
    q: 'How can I track my quotation or production order?',
    a: 'Every quotation receives a unique tracking reference (e.g. SND-2026-8942). You can check its live engineering review and manufacturing status at any time using the Track RFQ feature in our navigation bar or footer.'
  },
  {
    q: 'What information is needed to ensure accurate quotation?',
    a: 'An accurate 3D model (STEP/STP), desired material alloy, quantity, delivery speed, and an accompanying 2D PDF drawing if your part has tight tolerances (under ±0.005"), threaded or tapped holes, or specific surface roughness callouts.'
  },
  {
    q: 'How do I contact the engineering support team for DFM advice?',
    a: 'You can click "Speak with an Engineer" or use our contact form. Our senior manufacturing applications engineers review designs to suggest cost-saving DFM improvements before chips fly or molds are cut.'
  }
];
