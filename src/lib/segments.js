const segments = [
  {
    id: "6796d5d2e7879725de824a04",
    name: "HEALTHY",
  },
  {
    id: "6796d5b50cfe8dd0f5eb6f9b",
    name: "STUCK",
  },
  {
    id: "6796d5a4df3ac89fee790782",
    name: "DAMP",
  },
  {
    id: "6796d57b47030d51f06d822b",
    name: "HOT",
  },
  {
    id: "6796d5721a891d3bca1803cd",
    name: "COLD",
  },
];

export const getSegment = (name) =>
  segments.find((segment) => segment.name === name);
