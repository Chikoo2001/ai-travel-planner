export const travelerOptions = [
  {
    id: 1,
    type: "solo",
    members: 1,
    desc: "Solo adventure awaits!",
    icon: "✈️",
  },
  {
    id: 2,
    type: "couple",
    members: 2,
    desc: "Romantic getaway!",
    icon: "🥂",
  },
  {
    id: 3,
    type: "family",
    members: 4,
    desc: "Family fun trip!",
    icon: "🏡",
  },
  {
    id: 4,
    type: "friends",
    members: 5,
    desc: "Epic friends' journey!",
    icon: "🛥️",
  },
];

export const budgetOptions = [
  {
    id: 1,
    type: "cheap",
    desc: "stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    type: "Moderate",
    desc: "Keep cost on average side",
    icon: "💰",
  },
  {
    id: 3,
    type: "Luxury",
    desc: "Don't worry about cost",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location : {location}, for {totalDays} Days and {totalNights} Nights for {tripType} with a {budget} budget with a Flight details, Flight price with Booking url, Hotels options list with HotelName, Hotel address, Price, Hotel image url, geo coordinates, rating, descriptions and places to visit nearby with placename, place details, place image url, geo coordinates, ticket pricing, time to travel each of the location for {totalDays} days and {totalNights} night with each day plan with best time to visit in JSON format.";
