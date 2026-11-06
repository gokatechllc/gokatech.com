export interface OfficeLocation {
  id: string;
  name: string;
  type: 'Global Headquarters' | 'Regional Hub' | 'European Delivery Center' | 'APAC Delivery Center';
  address: string;
  city: string;
  stateCountry: string;
  phone?: string;
  altPhone?: string;
  email: string;
  mapUrl: string;
  timezone: string;
  hours: string;
  image?: string;
}

export const officesData: OfficeLocation[] = [
  {
    id: 'frisco-hq',
    name: 'Frisco Headquarters',
    type: 'Global Headquarters',
    address: '425 Old Newman Rd, Suite 503',
    city: 'Frisco',
    stateCountry: 'Texas 75036, USA',
    phone: '+1 425 971 2345',
    altPhone: '+1 469 519 6959',
    email: 'info@gokatech.com',
    mapUrl: 'https://www.google.com/maps?q=425+OLDNEWMAN+ROAD,+SUITE+503,+FRISCO,+TEXAS+75036',
    timezone: 'Central Time (CST/CDT)',
    hours: 'Mon - Fri: 8:00 AM - 6:00 PM CST'
  },
  {
    id: 'edison-nj',
    name: 'New Jersey Technology Hub',
    type: 'Regional Hub',
    address: '30-A Reading Road',
    city: 'Edison',
    stateCountry: 'New Jersey 08817, USA',
    phone: '+1 469 734 7104',
    altPhone: '+1 469 519 6959',
    email: 'info@gokatech.com',
    mapUrl: 'https://www.google.com/maps?q=30-A+Reading+Road+Edison+NJ+08817',
    timezone: 'Eastern Time (EST/EDT)',
    hours: 'Mon - Fri: 8:30 AM - 5:30 PM EST'
  },
  {
    id: 'indianapolis-in',
    name: 'Midwest Delivery Hub',
    type: 'Regional Hub',
    address: '6058 Georgetown Rd',
    city: 'Indianapolis',
    stateCountry: 'Indiana 46254, USA',
    phone: '+1 469 288 6243',
    altPhone: '+1 469 519 6959',
    email: 'info@gokatech.com',
    mapUrl: 'https://www.google.com/maps?q=6058+Georgetown+Rd+Indianapolis+IN+46254',
    timezone: 'Eastern Time (EST/EDT)',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM EST'
  },
  {
    id: 'cologne-de',
    name: 'European Delivery Center',
    type: 'European Delivery Center',
    address: 'Etzelstrasse 231',
    city: 'Cologne (Köln)',
    stateCountry: '50739, Germany',
    phone: '+49 221 890 1200',
    email: 'europe@gokatech.com',
    mapUrl: 'https://www.google.com/maps?q=Etzelstrasse+231+Koln+50739',
    timezone: 'Central European Time (CET/CEST)',
    hours: 'Mon - Fri: 9:00 AM - 6:00 PM CET'
  },
  {
    id: 'hyderabad-in',
    name: 'Asia-Pacific R&D Center',
    type: 'APAC Delivery Center',
    address: 'First Ave, Venkanna Hills, Bhagyalaxmi Nagar, Quthbullapur',
    city: 'Hyderabad',
    stateCountry: 'Telangana 500055, India',
    phone: '+91 40 4859 2300',
    email: 'apac@gokatech.com',
    mapUrl: 'https://www.google.com/maps?q=Quthbullapur+Hyderabad+Telangana+500055',
    timezone: 'Indian Standard Time (IST)',
    hours: 'Mon - Fri: 9:30 AM - 6:30 PM IST'
  }
];

