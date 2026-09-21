// SPDX-FileCopyrightText: 2026 Schmiedmayer Lab and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

export const foundations = [
  'HL7 FHIR',
  'Open mHealth',
  'IEEE',
  'OMOP',
  'LOINC',
  'SNOMED CT',
] as const;

export const goals = [
  {
    verb: 'Convene',
    title: 'Establish the consortium',
    description:
      'Bring researchers, clinicians, device manufacturers, standards experts, regulators, and people with lived experience into a practical, transparent process.',
  },
  {
    verb: 'Assess',
    title: 'Assess existing standards and formats',
    description:
      'Evaluate FHIR, Open mHealth, IEEE, OMOP, established terminologies, and manufacturer formats to identify practical adoption gaps—not create another isolated standard.',
  },
  {
    verb: 'Bridge',
    title: 'Publish profiles, mappings, and tools',
    description:
      'Define focused data and metadata profiles, mappings, reference implementations, documentation, and automated validation tools that research teams can use.',
  },
  {
    verb: 'Validate',
    title: 'Test across real devices and platforms',
    description:
      'Evaluate whether shared representations preserve meaning across wearable and smartphone platforms and support reliable cross-device analysis.',
  },
  {
    verb: 'Adopt',
    title: 'Support adoption and stewardship',
    description:
      'Work with manufacturers and researchers on voluntary implementation, public training, versioned releases, and long-term community stewardship.',
  },
] as const;

export const aiPipeline = [
  { label: 'Collect', detail: 'Wearables, phones, and connected sensors' },
  { label: 'Interpret', detail: 'Portable data, metadata, quality, and provenance' },
  { label: 'Combine', detail: 'Multi-site cohorts and longitudinal evidence' },
  { label: 'Analyze', detail: 'Multimodal models and agentic research systems' },
] as const;

export const leaders = [
  {
    initials: 'JT',
    name: 'John Torous, MD, MBI',
    role: 'Clinical co-chair',
    affiliation: 'Beth Israel Deaconess Medical Center · Harvard Medical School',
    image: '/images/team/john-torous.jpg',
    imageAlt: 'Portrait of John Torous',
    imagePosition: 'center 6%',
    profile: 'https://research.bidmc.org/translational-hubs/people/dr-john-torous',
  },
  {
    initials: 'PS',
    name: 'Paul Schmiedmayer, PhD',
    role: 'Informatics & AI Co-Chair',
    affiliation: 'Stanford University · Division of Computational Medicine',
    image: '/images/team/paul-schmiedmayer.jpg',
    imageAlt: 'Portrait of Paul Schmiedmayer',
    imagePosition: 'center 22%',
    profile: 'https://profiles.stanford.edu/schmiedmayer',
  },
  {
    initials: 'BN',
    name: 'Benjamin W. Nelson, PhD',
    role: 'Industry technology co-chair',
    affiliation: 'Verily Life Sciences',
    image: '/images/team/benjamin-nelson.jpg',
    imageAlt: 'Portrait of Benjamin W. Nelson',
    imagePosition: 'center 38%',
    profile: 'https://github.com/benjaminwnelson',
  },
] as const;

export const governanceGroups = [
  { name: 'Interoperability', detail: 'Mappings, profiles, metadata, and validation' },
  { name: 'Device manufacturers', detail: 'Feasibility, APIs, and adoption paths' },
  { name: 'Researchers', detail: 'Use cases, implementation, and evidence' },
  { name: 'Training + education', detail: 'Documentation, examples, and community learning' },
] as const;

export const participation = [
  {
    audience: 'Device and platform teams',
    description:
      'Build and validate adapters to your systems, help set feasible implementation priorities, and make your platform usable in multi-site research.',
    action: 'Contribute an adapter or implementation',
  },
  {
    audience: 'Research and clinical experts',
    description:
      'Define priority use cases, evaluate essential metadata, test emerging mappings, and ensure that outputs support rigorous multi-site research.',
    action: 'Join a working group or pilot',
  },
  {
    audience: 'Standards and data experts',
    description:
      'Help DIGITS extend and connect existing standards, vocabularies, and infrastructure instead of creating competing frameworks.',
    action: 'Review the technical approach',
  },
  {
    audience: 'Community, ethics, and regulatory voices',
    description:
      'Guide governance, accessibility, privacy, representation, and real-world relevance for people and communities represented in the data.',
    action: 'Shape oversight and adoption',
  },
] as const;

export const timeline = [
  {
    period: 'Year 1',
    title: 'Convene and set priorities',
    detail:
      'Form governance and working groups, review existing standards and manufacturer formats, and select the first high-value use cases.',
    engagement: 'Join the founding consortium',
  },
  {
    period: 'Year 2',
    title: 'Build and pilot',
    detail:
      'Turn shared priorities into focused profiles, mappings, adapters, reference implementations, and research pilots.',
    engagement: 'Build an adapter or pilot',
  },
  {
    period: 'Year 3',
    title: 'Validate across platforms',
    detail:
      'Evaluate implementations across devices, studies, and settings, with workshops that connect manufacturers and research teams.',
    engagement: 'Test and refine implementations',
  },
  {
    period: 'Year 4',
    title: 'Scale adoption and stewardship',
    detail:
      'Grow implementation support, training, conformance tooling, and a durable community process connected to established standards bodies.',
    engagement: 'Adopt, teach, and extend',
  },
] as const;
