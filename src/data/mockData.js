export const categories = [
  { id: 'c1', name: 'Plumbers', icon: 'wrench', description: 'Pipe repair, installations, and maintenance' },
  { id: 'c2', name: 'Electricians', icon: 'zap', description: 'Wiring, panel upgrades, and lighting' },
  { id: 'c3', name: 'Cleaners', icon: 'home', description: 'House cleaning, deep cleaning, and move-out' },
  { id: 'c4', name: 'Carpenters', icon: 'tool', description: 'Furniture repair, framing, and cabinetry' },
  { id: 'c5', name: 'HVAC', icon: 'thermometer', description: 'Heating, ventilation, and air conditioning' },
  { id: 'c6', name: 'Painters', icon: 'droplet', description: 'Interior and exterior painting services' },
];

export const locations = ['San Francisco', 'New York', 'Chicago', 'Austin', 'Seattle'];

export const professionals = [
  {
    id: 'p1',
    name: 'Michael Chen',
    category: 'Plumbers',
    city: 'San Francisco',
    rating: 4.9,
    reviewsCount: 142,
    hourlyRate: 65,
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    bio: 'Licensed master plumber with 15+ years of experience in residential and commercial plumbing. Specializing in leak detection and emergency repairs.',
    tags: ['Emergency', 'Residential', 'Commercial'],
    completedJobs: 430
  },
  {
    id: 'p2',
    name: 'Sarah Jenkins',
    category: 'Electricians',
    city: 'San Francisco',
    rating: 4.8,
    reviewsCount: 89,
    hourlyRate: 75,
    avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
    bio: 'Certified electrician specializing in smart home installations, panel upgrades, and lighting design. Safety is always my top priority.',
    tags: ['Smart Home', 'Panel Upgrade', 'Lighting'],
    completedJobs: 215
  },
  {
    id: 'p3',
    name: 'David Rodriguez',
    category: 'Plumbers',
    city: 'New York',
    rating: 4.7,
    reviewsCount: 210,
    hourlyRate: 55,
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    bio: 'Reliable plumber for all your everyday needs. Fast response times and transparent pricing.',
    tags: ['Drain Cleaning', 'Installation', 'Repair'],
    completedJobs: 512
  },
  {
    id: 'p4',
    name: 'Emily Wong',
    category: 'Cleaners',
    city: 'San Francisco',
    rating: 5.0,
    reviewsCount: 324,
    hourlyRate: 40,
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026703d',
    bio: 'Meticulous cleaner with eco-friendly products. I treat your home with the care and respect it deserves.',
    tags: ['Deep Cleaning', 'Eco-Friendly', 'Move-out'],
    completedJobs: 890
  },
  {
    id: 'p5',
    name: 'James Wilson',
    category: 'Carpenters',
    city: 'Chicago',
    rating: 4.9,
    reviewsCount: 156,
    hourlyRate: 60,
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    bio: 'Custom cabinetry and furniture restoration expert. Attention to detail is my hallmark.',
    tags: ['Cabinetry', 'Restoration', 'Custom Builds'],
    completedJobs: 275
  },
  {
    id: 'p6',
    name: 'Marcus Johnson',
    category: 'Electricians',
    city: 'San Francisco',
    rating: 4.6,
    reviewsCount: 67,
    hourlyRate: 70,
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    bio: '24/7 emergency electrical services. Troubleshooting specialist for older homes.',
    tags: ['Emergency', 'Troubleshooting', 'Rewiring'],
    completedJobs: 180
  },
  {
    id: 'p7',
    name: 'Elena Rostova',
    category: 'HVAC',
    city: 'San Francisco',
    rating: 4.8,
    reviewsCount: 112,
    hourlyRate: 85,
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    bio: 'Keep your home comfortable year-round. Expert AC repair and furnace maintenance.',
    tags: ['AC Repair', 'Furnace', 'Maintenance'],
    completedJobs: 340
  },
  {
    id: 'p8',
    name: 'Robert Fox',
    category: 'Painters',
    city: 'San Francisco',
    rating: 4.7,
    reviewsCount: 95,
    hourlyRate: 50,
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    bio: 'High-quality interior and exterior painting. We bring color to your life with precision and care.',
    tags: ['Interior', 'Exterior', 'Cabinet Painting'],
    completedJobs: 210
  }
];
