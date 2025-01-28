import img2 from "../../assets/rooms/room2.jpeg";
import img3 from "../../assets/rooms/room3.jpeg";
import standardimg from "../../assets/rooms/standard.jpeg";

export const rooms = [
  {
    name: "Deluxe Suite",
    image: img2,
    price: 2500,
    area: 300,
    details:
      "Possessing all the elements of a contemporary design and state of the art facilities, these rooms also exude the heritage of Sundarban through elements of luxury like traditional Bengal styled cottages, comfortable bed, planter’s chair and cane wooden furniture.",
    beds: 2,
    bathrooms: 1,
    ac: 3,
    carParking: 2,
    occupancy: "Up to 3 guests. Max Adults: 2, Max Children: 1",
    adultsAllowed: 2,
    babiesAllowed: 1,
    petsAllowed: "yes",
    bedAndBath: [
      "Pillow menu",
      "A pair of Standard single beds ",
      "Infant cribs for guests aged 0-2 years available on request.",
      "Rollaway beds on additional charge on a per night basis.",
    ],
  },
  {
    name: "Standard Room",
    image: standardimg,
    price: 1500,
    area: 200,
    details:
      "Possessing all the elements of a contemporary design and state of the art facilities, these rooms also exude the heritage of Sundarban through elements of luxury like traditional Bengal styled cottages, comfortable bed, planter’s chair and cane wooden furniture.",
    beds: 1,
    bathrooms: 1,
    ac: 1,
    carParking: 0,
    occupancy: "Up to 3 guests. Max Adults: 2, Max Children: 1",
    adultsAllowed: 2,
    babiesAllowed: 1,
    petsAllowed: "no",
    bedAndBath: [
      "Pillow menu",
      "King size bed",
      "Infant cribs for guests aged 0-2 years available on request.",
      "Rollaway beds on additional charge on a per night basis.",
    ],
  },
  {
    name: "Executive  Suite",
    image: img3,
    price: 3000,
    area: 600,
    details:
      "A state-of-art suite with a separate living space connected to two spacious bedrooms. A living space enriched with books/periodicals on Wildlife. An attached kitchenette with exclusive dining hall. Impressive amenities, decoration, and tailor-made services.",
    beds: 3,
    bathrooms: 2,
    ac: 2,
    carParking: 2,
    occupancy: "Up to 6 guests. Max Adults: 4, Max Children: 2.",
    adultsAllowed: 4,
    babiesAllowed: 2,
    petsAllowed: "yes",
    bedAndBath: [
      "Pillow menu",
      "King size bed",
      "Infant cribs for guests aged 0-2 years available on request.",
      "Rollaway beds on additional charge on a per night basis.",
    ],
  },
];
