const today = new Date().toISOString().slice(0, 10);

export const mockBranches = [
  { id: 1, name: "Downtown Office", employees: 24 },
  { id: 2, name: "North Office", employees: 16 },
  { id: 3, name: "West Office", employees: 11 },
];

export const mockCategories = [
  "Food",
  "Transportation",
  "Office Supplies",
  "Utilities",
  "Other",
];

export const mockExpenses = [
  {
    id: 1,
    date: today,
    item: "Printer paper",
    category: "Office Supplies",
    branchId: 1,
    quantity: 8,
    price: 125,
    notes: "Monthly stationery order",
  },
  {
    id: 2,
    date: today,
    item: "Team lunch",
    category: "Food",
    branchId: 2,
    quantity: 12,
    price: 180,
    notes: "Project review",
  },
  {
    id: 3,
    date: "2026-08-14",
    item: "Taxi fares",
    category: "Transportation",
    branchId: 1,
    quantity: 4,
    price: 95,
    notes: "Client visits",
  },
  {
    id: 4,
    date: "2026-07-08",
    item: "Internet service",
    category: "Utilities",
    branchId: 3,
    quantity: 1,
    price: 2400,
    notes: "July invoice",
  },
  {
    id: 5,
    date: "2026-06-22",
    item: "Coffee and tea",
    category: "Food",
    branchId: 1,
    quantity: 6,
    price: 210,
    notes: "Kitchen supplies",
  },
  {
    id: 6,
    date: "2026-05-10",
    item: "Desk lamps",
    category: "Office Supplies",
    branchId: 2,
    quantity: 3,
    price: 650,
    notes: "New workstations",
  },
];