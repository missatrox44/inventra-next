export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  expiration_date: string;
  image_url: string;
  created_by: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  // role: 'admin' | 'editor' | 'viewer';
  role: 'admin' | 'editor';
  created_at: string;
}

export const inventoryData: InventoryItem[] = [
  {
    id: '1',
    name: 'Organic Apples',
    description: 'Fresh organic apples from local orchards. Perfect for snacking or baking.',
    quantity: 150,
    expiration_date: '2024-02-15',
    image_url: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=500',
    created_by: 'John Doe',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Premium Coffee Beans',
    description: 'Single-origin Arabica coffee beans with rich, complex flavor profile.',
    quantity: 45,
    expiration_date: '2024-12-31',
    image_url: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=500',
    created_by: 'Sarah Wilson',
    updated_at: '2024-01-14T14:20:00Z'
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life.',
    quantity: 25,
    expiration_date: '2026-06-30',
    image_url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    created_by: 'Mike Johnson',
    updated_at: '2024-01-13T09:15:00Z'
  },
  {
    id: '4',
    name: 'Eco-Friendly Water Bottles',
    description: 'Sustainable water bottles made from recycled materials. BPA-free and dishwasher safe.',
    quantity: 80,
    expiration_date: '2025-12-31',
    image_url: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=500',
    created_by: 'Emma Davis',
    updated_at: '2024-01-12T16:45:00Z'
  },
  {
    id: '5',
    name: 'Artisan Chocolate Box',
    description: 'Handcrafted chocolate assortment with premium cocoa and natural ingredients.',
    quantity: 30,
    expiration_date: '2024-03-20',
    image_url: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=500',
    created_by: 'James Brown',
    updated_at: '2024-01-11T11:30:00Z'
  },
  {
    id: '6',
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with extra cushioning for comfort during practice.',
    quantity: 40,
    expiration_date: '2027-01-01',
    image_url: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=500',
    created_by: 'Lisa Garcia',
    updated_at: '2024-01-10T13:20:00Z'
  }
];

export const usersData: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@inventra.com',
    role: 'admin',
    created_at: '2023-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@inventra.com',
    role: 'editor',
    created_at: '2023-02-20T14:20:00Z'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@inventra.com',
    role: 'editor',
    created_at: '2023-03-10T09:15:00Z'
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma@inventra.com',
    role: 'editor',
    created_at: '2023-04-05T16:45:00Z'
  },
  {
    id: '5',
    name: 'James Brown',
    email: 'james@inventra.com',
    role: 'editor',
    created_at: '2023-05-12T11:30:00Z'
  }
];

export const dummyChangelog = [
  { user: 'Alice', action: 'Updated quantity', date: '2025-06-08 14:22' },
  { user: 'Bob', action: 'Changed location', date: '2025-06-07 09:10' },
  { user: 'Charlie', action: 'Created item', date: '2025-06-01 16:45' },
];