export type Product = {
  handle: string;
  name: string;
  priceAud: number;
  story: string;
  fit: string;
  pairsWith: string[];
  image?: { src: string; alt: string; width: number; height: number };
};

export const sizes = ["XS", "S", "M", "L", "XL"] as const;
export type Size = (typeof sizes)[number];

export const products: Product[] = [
  {
    handle: "ground-hoodie",
    name: "Ground Hoodie",
    priceAud: 149,
    story:
      "A hooded sweat in aubergine. Relaxed through the body, with a rib at the cuff and the hem.",
    fit: "Relaxed body. The hem sits at the hip on the sample block. A measured size guide is not ready.",
    pairsWith: ["ground-jogger"],
  },
  {
    handle: "dusk-mock-neck-crew",
    name: "Dusk Mock-Neck Crew",
    priceAud: 139,
    story: "A mock neck sweat with a short body. Close at the neck, easy below.",
    fit: "Close at the neck, straight through the body. A measured size guide is not ready.",
    pairsWith: ["mineral-barrel-pant"],
  },
  {
    handle: "ground-jogger",
    name: "Ground Jogger",
    priceAud: 129,
    story: "A tapered jogger with a rib at the ankle. Cut to sit with the Ground Hoodie.",
    fit: "Tapered leg, rib ankle. A measured size guide is not ready.",
    pairsWith: ["ground-hoodie"],
  },
  {
    handle: "mineral-barrel-pant",
    name: "Mineral Barrel Pant",
    priceAud: 159,
    story:
      "A barrel leg pant. Full through the thigh, narrower at the hem. The heavier piece in the drop.",
    fit: "Full thigh, narrower hem. A measured size guide is not ready.",
    pairsWith: ["dusk-mock-neck-crew"],
  },
  {
    handle: "dusk-boxy-tee",
    name: "Dusk Boxy Tee",
    priceAud: 79,
    story:
      "A boxy short sleeve tee with a dropped shoulder and a straight hem. The mark sits on the left chest, as on the sample.",
    fit: "Dropped shoulder, straight hem, boxy body. A measured size guide is not ready.",
    pairsWith: ["earth-biker-short"],
    image: {
      src: "/products/dusk-boxy-tee.jpg",
      alt: "Sample photograph of the Dusk Boxy Tee. An aubergine short sleeve tee on a bone cloth ground, with the Purple Earth mark on the left chest.",
      width: 1600,
      height: 1600,
    },
  },
  {
    handle: "earth-biker-short",
    name: "Earth Biker Short",
    priceAud: 79,
    story: "A short with a close leg, sitting at the waist. Made to wear with the tee or the tank.",
    fit: "Close leg, waist sitting. A measured size guide is not ready.",
    pairsWith: ["dusk-boxy-tee", "ritual-crop-tank"],
  },
  {
    handle: "ritual-crop-tank",
    name: "Ritual Crop Tank",
    priceAud: 59,
    story: "A cropped tank with a wide strap and a straight hem. The lightest piece in the drop.",
    fit: "Wide strap, cropped hem. A measured size guide is not ready.",
    pairsWith: ["earth-biker-short"],
  },
];

export function getProduct(handle: string) {
  return products.find((product) => product.handle === handle);
}

export function aud(amount: number) {
  return `A$${amount}`;
}

export const sharedFacts = {
  colour: "Aubergine",
  origin: "China",
  cloth: "The cloth and the weight are not confirmed. They will be published before the drop opens.",
  care: "The care label is not confirmed. Wash and dry instructions will be printed on the garment and published before the drop opens.",
  preorder:
    "Drop 01 is a 14 day numbered pre-order. A number is given when an order is placed at checkout. This preview does not take payment and does not reserve a number.",
};

export type Ritual = {
  slug: string;
  title: string;
  kicker: string;
  standfirst: string;
  paragraphs: string[];
};

export const rituals: Ritual[] = [
  {
    slug: "a-morning-in-the-hills",
    title: "A morning in the hills",
    kicker: "Walk Club",
    standfirst: "A short loop, shoes off where the path is known, then coffee.",
    paragraphs: [
      "The Walk Club meets early in the Adelaide Hills. The loop is short. People talk, or they do not.",
      "Shoes come off where the ground is even and already known. They go back on for the climb. Then there is coffee. That is the whole of it.",
      "It is a walk with other people. It is not a treatment, and it is not a test.",
    ],
  },
  {
    slug: "field-notes-from-a-tuesday",
    title: "Field notes from a Tuesday",
    kicker: "From the tools",
    standfirst: "High voltage all day. A slower label after that.",
    paragraphs: [
      "Caleb spends the working day with high voltage. The task is ordinary and strict. Know the path a fault will take, and make sure that path is sound.",
      "Purple Earth came out of that pace. A garment is a garment. The slower version is the time around it: a walk, a numbered drop, a small club.",
      "Jasmin builds the label with him. The work is shared. The clothes stay clothes.",
    ],
  },
  {
    slug: "how-a-drop-is-counted",
    title: "How a drop is counted",
    kicker: "Drop 01",
    standfirst: "Fourteen days, then a count, then a bulk order that waits for approval.",
    paragraphs: [
      "Drop 01 is seven pieces. The window is fourteen days. Orders are numbered in the order they are placed.",
      "When the window closes, quantities are summed by piece, size and colour. Ten percent is added as a buffer. A bulk order is drafted for Caleb to approve. Nothing is purchased by itself.",
      "The pieces are made in China. The mark is the supplied lockup, printed or embroidered, and it stays in one piece with its dot.",
    ],
  },
];

export function getRitual(slug: string) {
  return rituals.find((ritual) => ritual.slug === slug);
}

export type Walk = {
  id: string;
  iso: string;
  place: string;
  note: string;
};

export const walks: Walk[] = [
  {
    id: "2026-11-29-morialta",
    iso: "2026-11-29T08:00:00+10:30",
    place: "Morialta Falls, Adelaide Hills",
    note: "Draft date. Not confirmed.",
  },
  {
    id: "2026-12-13-cleland",
    iso: "2026-12-13T08:00:00+10:30",
    place: "Cleland Conservation Park",
    note: "Draft date. Not confirmed.",
  },
  {
    id: "2027-01-10-belair",
    iso: "2027-01-10T08:00:00+10:30",
    place: "Belair National Park",
    note: "Draft date. Not confirmed.",
  },
];

export function formatWalkWhen(iso: string) {
  const date = new Date(iso);
  const day = new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Adelaide",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h12",
    timeZone: "Australia/Adelaide",
  }).format(date);
  return `${day}, ${time.toLowerCase().replace(" ", "")}`;
}

export const tiers = [
  {
    name: "Lavender",
    threshold: "From the first order",
    rate: "1 Volt for each A$1",
    perk: "The base rate, and a place in the club.",
  },
  {
    name: "Orchid",
    threshold: "A$300 spent in a rolling 12 months",
    rate: "1.25 Volts for each A$1",
    perk: "The higher rate on new orders.",
  },
  {
    name: "Aubergine",
    threshold: "A$800 spent in a rolling 12 months",
    rate: "1.5 Volts for each A$1",
    perk: "Early access to drops, free shipping, and a members' Walk Club breakfast.",
  },
] as const;

export const earnRules: { action: string; volts: string }[] = [
  { action: "Each A$1 spent, at the Lavender rate", volts: "1" },
  { action: "Orchid rate on spend", volts: "1.25" },
  { action: "Aubergine rate on spend", volts: "1.5" },
  { action: "Creating an account", volts: "50" },
  { action: "A birthday held by the loyalty app", volts: "100" },
  { action: "A review with a photograph", volts: "100" },
  { action: "A referral, when the friend's first order ships", volts: "250" },
  { action: "A Walk Club check-in from the QR at the meeting", volts: "50" },
  { action: "The monthly barefoot minutes log, once a month", volts: "100" },
  { action: "A photograph you tagged, once it is approved", volts: "50" },
];

export const contentIsDraft = process.env.NEXT_PUBLIC_CONTENT_STATUS !== "final";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://purpleearth.com.au";
