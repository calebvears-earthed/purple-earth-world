export type Frame = { src: string; alt: string; width: number; height: number };

export type Colourway = {
  id: string;
  name: string;
  swatch: string;
  images: Frame[];
};

export type Product = {
  handle: string;
  name: string;
  priceAud: number;
  story: string;
  cloth: string;
  fit: string;
  pairsWith: string[];
  colourways: Colourway[];
};

const portrait = (file: string, alt: string): Frame => ({
  src: `/campaign/${file}`,
  alt,
  width: 864,
  height: 1152,
});

const wide = (file: string, alt: string): Frame => ({
  src: `/campaign/${file}`,
  alt,
  width: 1280,
  height: 720,
});

export const sizes = ["XS", "S", "M", "L", "XL"] as const;
export type Size = (typeof sizes)[number];

const none: Frame[] = [];

export const products: Product[] = [
  {
    handle: "ground-hoodie",
    name: "Ground Hoodie",
    priceAud: 149,
    cloth: "Oversized fleeced hoodie, 350 gsm.",
    story: "An oversized fleeced hoodie at 350 gsm. Relaxed through the body, with a rib at the cuff and the hem.",
    fit: "Relaxed body. A measured size guide is not ready. Labels run XS to XL.",
    pairsWith: ["ground-jogger", "mineral-barrel-pant"],
    colourways: [
      {
        id: "dusk-mauve",
        name: "Dusk Mauve",
        swatch: "#A98FA6",
        images: [
          portrait("ground-hoodie-dusk-mauve-01.jpg", "Woman in the Dusk Mauve Ground Hoodie and taupe barrel pants, standing on a salt lake at dawn."),
          portrait("detail-hoodie-fleece-01.jpg", "Hands in the pocket of the Dusk Mauve Ground Hoodie, showing the fleece."),
          wide("hero-01.jpg", "Two figures at dawn on a salt lake, one in the Dusk Mauve Ground Hoodie."),
        ],
      },
      {
        id: "mist-grey",
        name: "Mist Grey",
        swatch: "#D4D4D9",
        images: [
          portrait("mist-grey-fleece-set-01.jpg", "The Mist Grey fleece set, hoodie and jogger, worn together."),
          portrait("movement-walk-01.jpg", "A walk in the Mist Grey fleece."),
        ],
      },
    ],
  },
  {
    handle: "dusk-mock-neck-crew",
    name: "Dusk Mock-Neck Crew",
    priceAud: 139,
    cloth: "350 gsm fleece, women's fit, mock neck.",
    story: "A 350 gsm fleece with a mock neck, cut as a women's fit. Close at the neck, easy through the body.",
    fit: "Women's fit. Mock neck, not a full turtleneck. A measured size guide is not ready.",
    pairsWith: ["ground-jogger"],
    colourways: [
      {
        id: "aubergine",
        name: "Aubergine",
        swatch: "#2B1830",
        images: [
          portrait("dusk-mock-neck-crew-aubergine-01.jpg", "Woman in the aubergine Dusk Mock-Neck Crew and espresso joggers on the salt lake."),
          portrait("lookbook-aubergine-01.jpg", "A closer frame of the aubergine Dusk Mock-Neck Crew at dawn."),
          wide("hero-01.jpg", "The aubergine mock neck beside the Dusk Mauve hoodie, at dawn."),
        ],
      },
      { id: "lilac", name: "Lilac", swatch: "#DCD0EA", images: none },
    ],
  },
  {
    handle: "ground-jogger",
    name: "Ground Jogger",
    priceAud: 129,
    cloth: "Heavyweight fleece jogger.",
    story: "A heavyweight fleece jogger with a rib at the ankle. The Mist Grey jogger is worn as a set with the Mist Grey hoodie.",
    fit: "Tapered leg, rib ankle. A measured size guide is not ready.",
    pairsWith: ["ground-hoodie"],
    colourways: [
      {
        id: "mist-grey",
        name: "Mist Grey",
        swatch: "#D4D4D9",
        images: [
          portrait("mist-grey-fleece-set-01.jpg", "Mist Grey hoodie and Ground Jogger worn as a set."),
          portrait("movement-walk-01.jpg", "Movement frame of the Mist Grey fleece."),
        ],
      },
      { id: "espresso", name: "Espresso", swatch: "#544028", images: none },
    ],
  },
  {
    handle: "mineral-barrel-pant",
    name: "Mineral Barrel Pant",
    priceAud: 159,
    cloth: "100 percent cotton, 320 gsm, mineral wash, barrel leg.",
    story: "A barrel leg in 100 percent cotton, 320 gsm, with a mineral wash. Full through the thigh, narrower at the hem.",
    fit: "Full thigh, narrower hem. A measured size guide is not ready.",
    pairsWith: ["ground-hoodie", "dusk-boxy-tee"],
    colourways: [
      {
        id: "taupe",
        name: "Taupe",
        swatch: "#BDAD95",
        images: [
          portrait("mineral-barrel-pant-taupe-01.jpg", "Taupe Mineral Barrel Pant with the bone boxy tee."),
          portrait("detail-barrel-pant-01.jpg", "Close frame of the taupe barrel pant and the mineral wash."),
          wide("hero-01.jpg", "The taupe barrel pant worn with the Dusk Mauve hoodie on the salt lake."),
        ],
      },
      { id: "charcoal", name: "Charcoal", swatch: "#52524F", images: none },
    ],
  },
  {
    handle: "dusk-boxy-tee",
    name: "Dusk Boxy Tee",
    priceAud: 79,
    cloth: "Boxy tee, 220 gsm.",
    story: "A boxy tee at 220 gsm. Dropped shoulder and a straight hem.",
    fit: "Dropped shoulder, straight hem, boxy body. A measured size guide is not ready.",
    pairsWith: ["mineral-barrel-pant", "earth-biker-short"],
    colourways: [
      {
        id: "bone",
        name: "Bone",
        swatch: "#F2EDE4",
        images: [
          portrait("dusk-boxy-tee-bone-01.jpg", "Bone Dusk Boxy Tee with the taupe barrel pant."),
          portrait("mineral-barrel-pant-taupe-01.jpg", "The same look, tee and taupe barrels, from a little further back."),
        ],
      },
      { id: "mist-grey", name: "Mist Grey", swatch: "#D4D4D9", images: none },
    ],
  },
  {
    handle: "earth-biker-short",
    name: "Earth Biker Short",
    priceAud: 79,
    cloth: "Women's high-waisted mid-thigh short, nylon and spandex.",
    story: "A women's high-waisted short, to the mid thigh, in nylon and spandex.",
    fit: "High waist, mid thigh. A measured size guide is not ready.",
    pairsWith: ["ritual-crop-tank"],
    colourways: [
      {
        id: "charcoal",
        name: "Charcoal",
        swatch: "#52524F",
        images: [
          portrait("ritual-crop-tank-lilac-01.jpg", "Charcoal Earth Biker Short with the lilac crop tank, on the dunes."),
          portrait("training-01.jpg", "A training frame in the charcoal short and lilac tank."),
          wide("hero-02.jpg", "Woman walking the dunes in the lilac tank and charcoal short."),
        ],
      },
      { id: "bone-white", name: "Bone White", swatch: "#F7F4EF", images: none },
    ],
  },
  {
    handle: "ritual-crop-tank",
    name: "Ritual Crop Tank",
    priceAud: 59,
    cloth: "Women's fitted crew-neck crop.",
    story: "A women's fitted crew-neck crop. The lightest piece in the drop.",
    fit: "Fitted, cropped hem, wide strap. A measured size guide is not ready.",
    pairsWith: ["earth-biker-short"],
    colourways: [
      {
        id: "lilac",
        name: "Lilac",
        swatch: "#DCD0EA",
        images: [
          portrait("ritual-crop-tank-lilac-01.jpg", "Lilac Ritual Crop Tank and charcoal short, walking the dunes."),
          portrait("detail-lilac-tank-01.jpg", "Close frame of the lilac crop tank."),
          wide("hero-02.jpg", "The lilac tank on the dunes, full figure."),
        ],
      },
      { id: "espresso", name: "Espresso", swatch: "#544028", images: none },
    ],
  },
];

export function getProduct(handle: string) {
  return products.find((product) => product.handle === handle);
}

export function aud(amount: number) {
  return `A$${amount}`;
}

export const campaign = {
  hero: wide("hero-01.jpg", "Dawn on a salt lake. Two figures in Drop 01, barefoot on the salt."),
  heroMobile: portrait("lookbook-aubergine-01.jpg", "Closer frame of the aubergine mock neck at dawn."),
  dunes: wide("hero-02.jpg", "A walk on coastal dunes in the lilac crop tank and charcoal short."),
  fleece: portrait("detail-hoodie-fleece-01.jpg", "Fleece texture at the pocket of the Dusk Mauve hoodie."),
  lookbook: [
    portrait("lookbook-aubergine-01.jpg", "The aubergine mock neck at dawn."),
    portrait("movement-walk-01.jpg", "A walk in the mist grey fleece."),
    portrait("training-01.jpg", "A training frame in lilac and charcoal."),
  ],
};

export const sharedFacts = {
  origin: "China",
  cloth: "The cloth and the weight are not confirmed. They will be published before the drop opens.",
  care: "The care label is not confirmed. Wash and dry instructions will be printed on the garment and published before the drop opens.",
  preorder:
    "Drop 01 is a 14 day numbered pre-order. Registering a size holds your place on the list. It does not take payment and does not give you a number. A number is given when checkout takes the order.",
  ship:
    "Made after the 14 day window closes, then dispatched. A firm ship date is shown before you pay.",
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
