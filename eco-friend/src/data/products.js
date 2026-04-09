const products = [
  {
    id: 1,
    name: "Rich Solar MEGA 200 Watt 12 Volt Monocrystalline Solar Panel",
    category: "Solar Panels",
    price: 120000,
    originalPrice: 150000,
    description: "High-efficiency 200W solar panel for home and outdoor use.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: true,
    isNew: false,
    stock: 8,
    reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/solarpanel/rich200-watt.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/solarpanel/rich200-watt2.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarpanel/rich200-watt3.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarpanel/rich200-watt4.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarpanel/rich200-watt5.webp",
        isPrimary: false,
      }
    ],
  },
  {
    id: 2,
    name: "Anker Solix C1000 Gen2 2000W 1024Wh Portable Power Station",
    category: "Solar Generators",
    price: 250000,
    description: "Reliable portable power station for backup and travel.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    stock: 2,
    reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/solargen/anker-solix-c1000-gen2-2000w.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/solargen/anker-solix-c1000-gen2-2000w1.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solargen/anker-solix-c1000-gen2-2000w2.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solargen/anker-solix-c1000-gen2-2000w3.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solargen/anker-solix-c1000-gen2-2000w4.webp",
        isPrimary: false,
      },
    ],
  },
  {
    id: 3,
    name: "Rich Solar 60 Amp MPPT Solar Charge Controller",
    category: "Solar Charge Controllers",
    price: 18000,
    description: "Bright rechargeable lantern for indoor and outdoor lighting.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    stock: 8,
    reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/solarchargecontroller/rich-solar-60-amp-mppt.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/solarchargecontroller/RichSolar60AmpMPPT1.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarchargecontroller/RichSolar60AmpMPPT2.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarchargecontroller/RichSolar60AmpMPPT3.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarchargecontroller/RichSolar60AmpMPPT4.webp",
        isPrimary: false,
      },
    ],
  },
  {
    id: 4,
    name: "Rich Solar NOVA PURE MAX 3k 3000 Watt 24V Industrial Pure Sine Wave Inverter",
    category: "Inverters",
    price: 95000,
    description: "Efficient inverter designed for small home solar systems.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    stock: 8,
    reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/powerinverters/rich-solar-nova-pure-max-3k-3000-watt-24v.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/powerinverters/rich-solar-nova-pure-max-3k-3000-watt-24v2.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/powerinverters/rich-solar-nova-pure-max-3k-3000-watt-24v3.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/powerinverters/rich-solar-nova-pure-max-3k-3000-watt-24v1.webp",
        isPrimary: false,
      }
    ],
  },
  {
    id: 5,
    name: "EcoFlow DELTA 3 Plus 1024Wh 1800W Solar Generator & Kits",
    category: "Solar Generators",
    price: 120000,
    description: "Reliable portable power station for backup and travel.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    stock: 8,
    reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/solargen/ecoflow-delta-3.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/solargen/ecoflow-delta-31.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solargen/ecoflow-delta-32.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solargen/ecoflow-delta-33.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solargen/ecoflow-delta-34.webp",
        isPrimary: false,
      }
    ],
  },
  {
    id: 6,
    name: "Jackery Explorer 1000 V2 Portable Power Station",
    category: "Solar Generators",
    price: 120000,
    originalPrice: 150000,
    description: "Reliable portable power station for backup and travel.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: true,
    isNew: false,
    stock: 8,
    reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/solargen/jackery-explorer-1000-v2.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/solargen/jackery-explorer-1000-v2-1.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solargen/jackery-explorer-1000-v2-2.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solargen/jackery-explorer-1000-v2-3.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solargen/jackery-explorer-1000-v2-4.webp",
        isPrimary: false,
      }
    ],
  },
  {
    id: 7,
    name: "Jackery HomePower 3000 Solar Generator + 2 x SolarSaga 200W Portable Solar Panel",
    category: "Solar Generators",
    price: 120000,
    description: "Reliable portable power station for backup and travel.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    stock: 8,
    reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/solargen/jackery-homepower-3000.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/solargen/jackery-homepower-3000-1.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solargen/jackery-homepower-3000-2.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solargen/jackery-homepower-3000-3.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solargen/jackery-homepower-3000-4.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solargen/jackery-homepower-3000-5.webp",
        isPrimary: false,
      }
    ],
  },
  {
    id: 8,
    name: "Rich Solar MEGA 200 Watt Portable Briefcase Solar Panel",
    category: "Solar Panels",
    price: 120000,
    description: "High-efficiency 200W solar panel for home and outdoor use.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    stock: 8,
    reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/solarpanel/rich-solar-mega-200-watt-portable.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/solarpanel/rich-solar-mega-200-watt-portable1.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarpanel/rich-solar-mega-200-watt-portable2.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarpanel/rich-solar-mega-200-watt-portable3.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarpanel/rich-solar-mega-200-watt-portable4.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarpanel/rich-solar-mega-200-watt-portable5.webp",
        isPrimary: false,
      }
    ],
  },
  {
    id: 9,
    name: "2 x EcoFlow 100W Rigid Solar Panels + 2 x Rigid Solar Panel Mounting Feet",
    category: "Solar Panels",
    price: 120000,
    description: "High-efficiency 100W solar panel for home and outdoor use.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    stock: 8,
    reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/solarpanel/2-x-ecoflow-100w-rigid-solar-panels-2.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/solarpanel/2-x-ecoflow-100w-rigid-solar-panels-2-1.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarpanel/2-x-ecoflow-100w-rigid-solar-panels-2-2.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarpanel/2-x-ecoflow-100w-rigid-solar-panels-2-3.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarpanel/ecoflow-us-ecoflow-100w-rigid-solar-panel-2x-100w-rigid-solar-panel-2x.webp",
        isPrimary: false,
      }
    ],
  },
  {
    id: 10,
    name: "Renogy 400W Lightweight Portable Solar Suitcase",
    category: "Solar Panels",
    price: 120000,
    description: "High-efficiency 200W solar panel for home and outdoor use.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    stock: 8,
        reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/solarpanel/renogy-400w.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/solarpanel/renogy-400w-1.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarpanel/renogy-400w-2.jpg",
        isPrimary: false,
      },
      {
        url: "/images/products/solarpanel/renogy-400w-3.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarpanel/renogy-400w-4.webp",
        isPrimary: false,
      }
    ],
  },
  {
    id: 11,
    name: "Rich Solar 20 Amp PWM Waterproof Solar Charge Controller",
    category: "Solar Charge Controllers",
    price: 18000,
    description: "Bright rechargeable lantern for indoor and outdoor lighting.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    stock: 8,
    reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/solarchargecontroller/rich-solar-20-amp.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/solarchargecontroller/rich-solar-20-amp1.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarchargecontroller/rich-solar-20-amp2.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarchargecontroller/rich-solar-20-amp3.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarchargecontroller/rich-solar-20-amp4.webp",
        isPrimary: false,
      },
    ],
  },
  {
    id: 12,
    name: "Renogy Adventurer Li- 30A PWM Flush Mount Charge Controller w/ LCD Display",
    category: "Solar Charge Controllers",
    price: 18000,
    description: "Bright rechargeable lantern for indoor and outdoor lighting.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    stock: 8,
    reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/solarchargecontroller/renogy-adventurer-li-30a.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/solarchargecontroller/renogy-adventurer-li-30a1.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarchargecontroller/renogy-adventurer-li-30a2.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarchargecontroller/renogy-adventurer-li-30a3.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarchargecontroller/renogy-adventurer-li-30a4.webp",
        isPrimary: false,
      },
    ],
  },
  {
    id: 13,
    name: "Renogy Wanderer 10A PWM Solar Charge Controller",
    category: "Solar Charge Controllers",
    price: 18000,
    description: "Bright rechargeable lantern for indoor and outdoor lighting.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    stock: 8,
    reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/solarchargecontroller/renogy-wanderer-10a.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/solarchargecontroller/renogy-wanderer-10a-1.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarchargecontroller/renogy-wanderer-10a-2.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarchargecontroller/renogy-wanderer-10a-3.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/solarchargecontroller/renogy-wanderer-10a-4.webp",
        isPrimary: false,
      },
    ],
  },
  {
    id: 14,
    name: "SunGoldPower 10KW 48V Split Phase Solar Inverter",
    category: "Inverters",
    price: 95000,
    description: "Efficient inverter designed for small home solar systems.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    stock: 8,
    reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/powerinverters/sungoldpower-10kw-48v.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/powerinverters/sungoldpower-10kw-48v-1.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/powerinverters/sungoldpower-10kw-48v-2.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/powerinverters/sungoldpower-10kw-48v-3.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/powerinverters/sungoldpower-10kw-48v-4.webp",
        isPrimary: false,
      }
    ],
  },
  {
    id: 15,
    name: "EG4 FlexBOSS21 AC Hybrid Inverter | 16,000W Output | 21,000W PV Input | 48V Split Phase Inverter",
    category: "Inverters",
    price: 95000,
    description: "Efficient inverter designed for small home solar systems.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    stock: 8,
    reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/powerinverters/eg4-flexboss21.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/powerinverters/eg4-flexboss211.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/powerinverters/eg4-flexboss212.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/powerinverters/eg4-flexboss213.webp",
        isPrimary: false,
      }
    ],
  },
  {
    id: 16,
    name: "RUiXU Split Phase Hybrid Inverter | RX-12K | UL1741",
    category: "Inverters",
    price: 95000,
    description: "Efficient inverter designed for small home solar systems.",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true,
    isOnSale: true,
    isNew: true,
    stock: 5,
    reviews: [
      {
        id: 1,
        name: "Daniel A.",
        rating: 5,
        date: "2026-03-10",
        comment: "Very reliable and easy to set up. It has been a strong addition to my backup power setup.",
      },
      {
        id: 2,
        name: "Grace O.",
        rating: 4,
        date: "2026-02-21",
        comment: "Good product quality and clean finish. Delivery was smooth and the performance has been solid so far.",
      },
    ],
    images: [
      {
        url: "/images/products/powerinverters/ruixu-split.webp",
        isPrimary: true,
      },
      {
        url: "/images/products/powerinverters/ruixu-split1.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/powerinverters/ruixu-split2.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/powerinverters/ruixu-split3.webp",
        isPrimary: false,
      },
      {
        url: "/images/products/powerinverters/ruixu-split4.jpeg",
        isPrimary: false,
      }
    ],
  }
];

export default products;