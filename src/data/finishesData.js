export const finishesData = [
  {
    id: 'as-machined',
    name: 'As-Machined Standard',
    processTypes: ['CNC Machining', 'Sheet Metal'],
    roughness: 'Ra 3.2 μm (125 μin)',
    description: 'Parts retain standard fine tool marks from end mills, facing cutters, and turning inserts. Edges deburred.',
    benefits: ['Lowest cost & fastest lead time', 'Retains exact CAD dimensions without plating buildup', 'Clean deburred edges'],
    leadTimeImpact: 'Standard (0 days added)',
    compatibleMaterials: ['All Metals', 'All Plastics']
  },
  {
    id: 'bead-blast',
    name: 'Bead Blasting (Glass Bead)',
    processTypes: ['CNC Machining', 'Sheet Metal', '3D Printing'],
    roughness: 'Ra 1.6 - 2.5 μm (63 - 100 μin)',
    description: 'Fine spherical glass beads propelled by compressed air create a uniform, non-directional satin matte finish that obscures machining lines.',
    benefits: ['Eliminates tool marks and small surface imperfections', 'Creates optimal mechanical tooth for subsequent anodizing or painting', 'Glare-free satin appearance'],
    leadTimeImpact: '+1 business day',
    compatibleMaterials: ['Aluminum alloys', 'Stainless steels', 'Titanium', 'Brass']
  },
  {
    id: 'anodize-type-ii',
    name: 'Anodize Type II (Sulfuric)',
    processTypes: ['CNC Machining', 'Sheet Metal'],
    roughness: 'Preserves base finish',
    description: 'Electrochemical conversion coating that builds an aluminum oxide layer (10 - 25 μm) providing atmospheric corrosion protection and rich dye coloring.',
    benefits: ['Corrosion and moderate wear protection', 'Available in Clear, Black, Blue, Red, Gold, Green', 'Electrically insulating surface layer'],
    leadTimeImpact: '+2 to 3 business days',
    compatibleMaterials: ['Aluminum 6061-T6', 'Aluminum 5052', 'Aluminum 7075']
  },
  {
    id: 'anodize-type-iii',
    name: 'Anodize Type III (Hardcoat)',
    processTypes: ['CNC Machining'],
    roughness: 'Preserves base finish',
    description: 'Heavy-duty electrochemical process producing a dense 50 μm thick ceramic oxide layer with surface hardness exceeding 60 Rockwell C.',
    benefits: ['Extreme wear, abrasion, and erosion resistance', 'Mil-A-8625 Type III Class 1 & 2 compliant', 'Withstands harsh industrial environments'],
    leadTimeImpact: '+3 business days',
    compatibleMaterials: ['Aluminum 6061', 'Aluminum 7075']
  },
  {
    id: 'electropolish',
    name: 'Electropolishing',
    processTypes: ['CNC Machining', 'Sheet Metal'],
    roughness: 'Ra 0.2 - 0.4 μm (8 - 16 μin)',
    description: 'Electrochemical dissolution process that removes microscopic peaks from metal surfaces, resulting in a mirror-like shine and ultra-clean passivated surface.',
    benefits: ['Maximum corrosion resistance', 'Eliminates micro-cracks and burrs', 'Crucial for medical, pharmaceutical, and vacuum cleanrooms'],
    leadTimeImpact: '+3 to 4 business days',
    compatibleMaterials: ['Stainless Steel 304', 'Stainless Steel 316L', 'Titanium']
  },
  {
    id: 'powder-coat',
    name: 'Industrial Powder Coating',
    processTypes: ['CNC Machining', 'Sheet Metal Fabrication'],
    roughness: 'Smooth or Fine Texture (50 - 100 μm coat)',
    description: 'Dry polymer powder applied electrostatically and baked in an industrial oven. Creates a thick, resilient, chip-proof protective shell.',
    benefits: ['High impact and chemical resistance', 'Available in full RAL/Pantone color library', 'Superior exterior UV durability compared to wet paint'],
    leadTimeImpact: '+2 to 3 business days',
    compatibleMaterials: ['Aluminum', 'Steel', 'Stainless Steel']
  },
  {
    id: 'passivation',
    name: 'Passivation (ASTM A967)',
    processTypes: ['CNC Machining', 'Sheet Metal'],
    roughness: 'Unchanged',
    description: 'Chemical acid immersion (citric or nitric) that removes free iron and foreign contaminants from stainless steel, building a chromium-rich passive oxide film.',
    benefits: ['Prevents galvanic and rust corrosion', 'Zero dimensional dimensional change', 'Required for aerospace and medical stainless hardware'],
    leadTimeImpact: '+1 to 2 business days',
    compatibleMaterials: ['Stainless Steel 304', '316L', '17-4 PH']
  },
  {
    id: 'vapor-smooth',
    name: 'Vapor Smoothing',
    processTypes: ['3D Printing (MJF / SLS)'],
    roughness: 'Ra < 1.0 μm (Glossy smooth)',
    description: 'Controlled solvent vapor condensation that melts and re-flows microscopic surface roughness on 3D printed polymer parts.',
    benefits: ['Seals porosity for air/liquid tightness', 'Injection-mold-like aesthetic gloss', 'Improves elongation at break and fatigue resistance'],
    leadTimeImpact: '+2 business days',
    compatibleMaterials: ['PA12 Nylon', 'PA11 Nylon', 'TPU']
  }
];
