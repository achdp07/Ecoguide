export interface City {
  id: string;
  name: string;
  country: string;
  foundingCentury: string;
  description: string;
  historicalSignificance: string;
  image: string;
  coordinates: { lat: string; lng: string };
  badgeText: string;
}

export const cities: City[] = [
  {
    id: "chinguetti",
    name: "Chinguetti",
    country: "Mauritania",
    foundingCentury: "13th Century AD",
    description: "Chinguetti rises like a stone sentinel from the sweeping dunes of the Sahara. Once a vital oasis crossroads for ancient camel caravans, its sand-swept libraries preserve a timeless legacy of deep scholarship and medieval Islamic manuscript collection.",
    historicalSignificance: "A major scholarly center of the trans-Saharan trade routes. Its world-renowned desert libraries contain thousands of rare, medieval scientific, mathematical, and Quranic manuscripts written on sheepskin and paper.",
    image: "/src/assets/images/chinguitti.png",
    coordinates: { lat: "20° 27' N", lng: "12° 21' W" },
    badgeText: "The Desert Sanctuary"
  },
  {
    id: "ghardaia",
    name: "Ghardaïa",
    country: "Algeria",
    foundingCentury: "11th Century AD (1012)",
    description: "Ghardaïa is a fortified oasis city of unparalleled architectural harmony nestled in the northern Sahara. Its pastel-colored, cubic clay houses form majestic concentric rings rising gracefully up the valley hillside.",
    historicalSignificance: "The crown jewel of the M'Zab Valley (UNESCO World Heritage Site), celebrated for its highly advanced, climate-adapted communal architecture and ingenious traditional water-sharing systems that sustain life in the hyper-arid desert.",
    image: "/src/assets/images/ghardaia.jpg",
    coordinates: { lat: "32° 29' N", lng: "3° 40' E" },
    badgeText: "The Pentapolis Citadel"
  },
  {
    id: "byblos",
    name: "Byblos",
    country: "Lebanon",
    foundingCentury: "8,000+ Years Ago (~5000 BC)",
    description: "Byblos stands on the edge of the Mediterranean, one of the oldest continuously inhabited cities on Earth. From its ancient limestone harbor, Phoenician sailors once navigated the known world, carrying precious cedarwood and bronze.",
    historicalSignificance: "A vital Phoenician city-state and the birthplace of the Phoenician alphabet—the direct ancestor of nearly all modern linear alphabets. It served as the crucial conduit for papyrus trade to Greece, which inspired the word 'Bible'.",
    image: "/src/assets/images/byblos.jpg",
    coordinates: { lat: "34° 07' N", lng: "35° 38' E" },
    badgeText: "The Phoenician Cradle"
  }
];
