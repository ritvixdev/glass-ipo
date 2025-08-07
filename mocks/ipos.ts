import { IPO } from '@/types/ipo';

export const mainlineIPOs: IPO[] = [
  {
    id: '1',
    companyName: 'Bajaj Housing Finance',
    symbol: 'BAJAJHFL',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=100&auto=format&fit=crop',
    priceRange: '₹ 218 - ₹ 230',
    lotSize: 65,
    issueSize: '₹ 7,000 Cr',
    openDate: '2023-09-10',
    closeDate: '2023-09-12',
    listingDate: '2023-09-20',
    status: 'live',
    subscriptionRate: 3.57,
    sector: 'Financial Services',
    description: 'Bajaj Housing Finance Limited is a housing finance company registered with the National Housing Bank (NHB) and is a 100% subsidiary of Bajaj Finance Limited.',
    financialHighlights: {
      revenue: '₹ 5,736 Cr',
      profit: '₹ 1,258 Cr',
      debtToEquity: '6.2',
      roe: '12.8%'
    },
    leadManagers: ['Kotak Mahindra Capital', 'Axis Capital', 'IIFL Securities'],
    registrar: 'KFin Technologies'
  },
  {
    id: '2',
    companyName: 'Ola Electric Mobility',
    symbol: 'OLAELEC',
    logo: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=100&auto=format&fit=crop',
    priceRange: '₹ 115 - ₹ 135',
    lotSize: 110,
    issueSize: '₹ 5,500 Cr',
    openDate: '2023-08-20',
    closeDate: '2023-08-22',
    listingDate: '2023-08-31',
    status: 'listed',
    subscriptionRate: 2.95,
    listingGain: 12.5,
    sector: 'Electric Vehicles',
    description: 'Ola Electric Mobility is an electric vehicle manufacturer focused on building electric two-wheelers and developing charging infrastructure.',
    financialHighlights: {
      revenue: '₹ 2,630 Cr',
      profit: '₹ -1,472 Cr',
      debtToEquity: '0.8',
      roe: 'N/A'
    },
    leadManagers: ['Kotak Mahindra Capital', 'Citigroup', 'BofA Securities'],
    registrar: 'Link Intime India'
  },
  {
    id: '3',
    companyName: 'Swiggy',
    symbol: 'SWIGGY',
    logo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=100&auto=format&fit=crop',
    priceRange: '₹ 350 - ₹ 375',
    lotSize: 40,
    issueSize: '₹ 10,000 Cr',
    openDate: '2023-10-15',
    closeDate: '2023-10-18',
    listingDate: '2023-10-27',
    status: 'upcoming',
    sector: 'Food Delivery',
    description: 'Swiggy is an Indian online food ordering and delivery platform that also offers grocery deliveries through its Instamart service.',
    financialHighlights: {
      revenue: '₹ 8,265 Cr',
      profit: '₹ -3,628 Cr',
      debtToEquity: '1.2',
      roe: 'N/A'
    },
    leadManagers: ['JP Morgan', 'ICICI Securities', 'Jefferies'],
    registrar: 'KFin Technologies'
  },
  {
    id: '4',
    companyName: 'Tata Technologies',
    symbol: 'TATATEQ',
    logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=100&auto=format&fit=crop',
    priceRange: '₹ 475 - ₹ 500',
    lotSize: 30,
    issueSize: '₹ 3,000 Cr',
    openDate: '2023-07-05',
    closeDate: '2023-07-07',
    listingDate: '2023-07-17',
    status: 'listed',
    subscriptionRate: 69.43,
    listingGain: 85.2,
    sector: 'IT Services',
    description: 'Tata Technologies is a global engineering and product development digital services company focused on the automotive and aerospace industries.',
    financialHighlights: {
      revenue: '₹ 4,414 Cr',
      profit: '₹ 624 Cr',
      debtToEquity: '0.1',
      roe: '25.6%'
    },
    leadManagers: ['Morgan Stanley', 'Kotak Mahindra Capital'],
    registrar: 'Link Intime India'
  }
];

export const smeIPOs: IPO[] = [
  {
    id: '5',
    companyName: 'Maxposure Media Group',
    symbol: 'MAXPOSURE',
    logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=100&auto=format&fit=crop',
    priceRange: '₹ 31 - ₹ 33',
    lotSize: 4000,
    issueSize: '₹ 20.26 Cr',
    openDate: '2023-09-08',
    closeDate: '2023-09-12',
    listingDate: '2023-09-18',
    status: 'live',
    subscriptionRate: 5.12,
    sector: 'Media & Entertainment',
    description: 'Maxposure Media Group is a global content, technology, and media company that provides content marketing solutions to brands worldwide.',
    financialHighlights: {
      revenue: '₹ 86.5 Cr',
      profit: '₹ 7.2 Cr',
      debtToEquity: '0.5',
      roe: '18.3%'
    },
    leadManagers: ['Beeline Capital Advisors'],
    registrar: 'Skyline Financial Services'
  },
  {
    id: '6',
    companyName: 'Akme Fintrade',
    symbol: 'AKMEFIN',
    logo: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=100&auto=format&fit=crop',
    priceRange: '₹ 100 - ₹ 105',
    lotSize: 1200,
    issueSize: '₹ 132 Cr',
    openDate: '2023-08-14',
    closeDate: '2023-08-17',
    listingDate: '2023-08-25',
    status: 'listed',
    subscriptionRate: 32.5,
    listingGain: 28.7,
    sector: 'Financial Services',
    description: 'Akme Fintrade is a non-banking financial company (NBFC) providing vehicle loans, business loans, and personal loans in rural and semi-urban areas.',
    financialHighlights: {
      revenue: '₹ 112.3 Cr',
      profit: '₹ 18.6 Cr',
      debtToEquity: '2.1',
      roe: '15.7%'
    },
    leadManagers: ['Gretex Corporate Services'],
    registrar: 'Bigshare Services'
  },
  {
    id: '7',
    companyName: 'Diffusion Engineers',
    symbol: 'DIFFENG',
    logo: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=100&auto=format&fit=crop',
    priceRange: '₹ 162 - ₹ 170',
    lotSize: 800,
    issueSize: '₹ 41.5 Cr',
    openDate: '2023-10-20',
    closeDate: '2023-10-24',
    listingDate: '2023-11-01',
    status: 'upcoming',
    sector: 'Engineering',
    description: 'Diffusion Engineers specializes in manufacturing and supplying welding consumables, wear plates, and providing maintenance services to core sector industries.',
    financialHighlights: {
      revenue: '₹ 95.8 Cr',
      profit: '₹ 12.4 Cr',
      debtToEquity: '0.3',
      roe: '22.1%'
    },
    leadManagers: ['Hem Securities'],
    registrar: 'Link Intime India'
  }
];

export const quickStats = [
  {
    title: 'Total Live IPOs',
    value: '12',
    icon: 'trending-up'
  },
  {
    title: 'Avg. Subscription',
    value: '4.2x',
    change: '+0.8',
    isPositive: true,
    icon: 'users'
  },
  {
    title: 'Avg. Listing Gain',
    value: '32.5%',
    change: '-5.2',
    isPositive: false,
    icon: 'bar-chart-2'
  }
];

export const getAllIPOs = (category: 'mainline' | 'sme' | 'all'): IPO[] => {
  if (category === 'mainline') return mainlineIPOs;
  if (category === 'sme') return smeIPOs;
  return [...mainlineIPOs, ...smeIPOs];
};

export const getIPOsByStatus = (status: 'live' | 'upcoming' | 'listed', category: 'mainline' | 'sme' | 'all'): IPO[] => {
  const ipos = getAllIPOs(category);
  return ipos.filter(ipo => ipo.status === status);
};

export const getIPOById = (id: string): IPO | undefined => {
  return [...mainlineIPOs, ...smeIPOs].find(ipo => ipo.id === id);
};