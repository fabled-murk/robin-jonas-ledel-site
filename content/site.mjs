// Single source of truth for page copy. CAT-8: wording pending Jonas's approval.
export const site = {
  lang: "en",
  name: "Jonas Ledel",
  role: "Co-founder & platform engineer, Fabled AB",
  location: "Göteborg, Sweden",
  // Public origin, no trailing slash. Override with SITE_ORIGIN when a real domain is pointed at it.
  origin: process.env.SITE_ORIGIN ?? "https://fabled-murk.github.io/robin-jonas-ledel-site",
  description:
    "Jonas Ledel — co-founder of Fabled AB in Göteborg. Platform engineering, Kubernetes and cloud-native infrastructure for teams that want to move faster.",
  hero: {
    kicker: "Platform engineering · Göteborg",
    title: "I build the boring layer\nso your product can be interesting.",
    lead:
      "I'm Jonas Ledel. I co-founded Fabled, a software and platform consultancy in Göteborg. I spend my days on Kubernetes, cloud-native plumbing and the delivery pipelines that decide whether a good idea ever reaches production.",
    actions: [
      { label: "Get in touch", href: "mailto:jonas@fabled.se", variant: "primary" },
      { label: "Fabled AB", href: "https://fabled.se", variant: "ghost" },
    ],
  },
  about: {
    title: "About",
    body: [
      "Fabled is small on purpose. We're a value-driven IT company that favours modern, lightweight infrastructure over ceremony — ephemeral vClusters, Cilium for networking, databases of most persuasions, and CI/CD that people actually trust.",
      "My own work sits where infrastructure meets delivery: making platforms that developers like using, untangling integrations that grew in the dark, and being the friendly face you can argue architecture with before anything is built.",
    ],
  },
  services: {
    title: "What I do",
    items: [
      { n: "01", title: "Platform engineering", body: "Kubernetes, Cilium, ephemeral vClusters, cloud-native tooling. Platforms that a team can run without a priesthood." },
      { n: "02", title: "Delivery & CI/CD", body: "Pipelines that are fast, boring and honest. If the build is green, it ships." },
      { n: "03", title: "Architecture & advisory", body: "Reference architectures, open source assessment, tech radar. Opinions backed by having had to operate the thing." },
      { n: "04", title: "Prototypes", body: "A proof-of-concept in under a month, so the argument is about something real." },
    ],
  },
  approach: {
    title: "How I work",
    items: [
      { title: "Work hard, play fair", body: "Fabled's line, and it holds: be tolerant, be reasonable, solve more problems than you create." },
      { title: "Lightweight beats large", body: "The smallest system that survives contact with production wins." },
      { title: "Show, don't slide", body: "A running prototype ends more arguments than a deck ever has." },
    ],
  },
  fabled: {
    title: "Fabled AB",
    body:
      "Fabled is a software and platform consultancy in Göteborg. We offer complete development teams, specialist consultants and full project deliveries across infrastructure, backend and frontend — with DevOps and cloud-native as the speciality. We're hiring platform engineers and developers.",
    link: { label: "fabled.se", href: "https://fabled.se" },
    address: "Kyrkogatan 44, 411 15 Göteborg",
  },
  contact: {
    title: "Contact",
    lead: "Work inquiries, a second opinion, or an argument about service meshes — all welcome.",
    items: [
      { label: "Email", value: "jonas@fabled.se", href: "mailto:jonas@fabled.se" },
      { label: "Phone", value: "+46 738 31 20 34", href: "tel:+46738312034" },
      { label: "Company", value: "fabled.se", href: "https://fabled.se" },
    ],
  },
  colophon:
    "Built with Vite and stubborn CSS. IBM Plex, IBM Blue 60, and borders thick enough to lean on. No trackers, no cookie banner, nothing to accept.",
};
