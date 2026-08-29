export const merchProducts = [
  {
    id: 'merch-2025-01',
    name: 'N.E.R.D.S. Official Merch 2025',
    year: 2025,
    status: 'archived',
    description: 'The official N.E.R.D.S. T-Shirt for 2025.',
    model: '/BumbleBee GLB.glb',
    thumbnail: '/tshirt/niggerman.jpg',
    colors: ['Black'],
    specs: ['240 GSM', 'Oversized', 'Regular'],
    designer: 'Ahiron Sharma',
    featured: true,
    collection: '2025 Collection',
  },
  {
    id: 'merch-2026-01',
    name: 'N.E.R.D.S. Official Merch 2026 V1',
    year: 2026,
    status: 'upcoming',
    description: 'New merch from the 2026 collection, releasing soon.',
    model: null,
    thumbnail: '/tshirt/logo2web1.png',
    colors: [],
    specs: [],
    designer: null,
    featured: false,
    collection: '2026 Collection',
  },
  {
    id: 'merch-2026-02',
    name: 'N.E.R.D.S. Official Merch 2026 V2',
    year: 2026,
    status: 'upcoming',
    description: 'New merch from the 2026 collection, releasing soon.',
    model: null,
    thumbnail: '/tshirt/logo2web2.png',
    colors: [],
    specs: [],
    designer: null,
    featured: false,
    collection: '2026 Collection',
  },
];

export const getProductsByStatus = (status) => {
  return merchProducts.filter((p) => p.status === status);
};

export const getArchivedProducts = () => getProductsByStatus('archived');
export const getUpcomingProducts = () => getProductsByStatus('upcoming');
export const getAvailableProducts = () => getProductsByStatus('available');
