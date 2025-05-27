// src/data/notes.js
export const dummyNotes = [
  {
    id: '1',
    user_id: 'user123', // Foreign key referencing a user
    title: 'Meeting Agendas Q2',
    content: 'Discuss budget allocations, marketing strategies for the new product line, and team performance reviews. Finalize the Q2 roadmap.',
    lastEditDate: '24/4/25',
  },
  {
    id: '2',
    user_id: 'user123',
    title: 'Grocery List',
    content: 'Milk, Eggs, Bread, Cheese, Apples, Bananas, Chicken Breast, Spinach, Coffee Beans. Check for coupons before going.',
    lastEditDate: '23/4/25',
  },
  {
    id: '3',
    user_id: 'user123',
    title: 'Project Ideas Brainstorm',
    content: 'AI-powered personal assistant, Eco-friendly packaging solutions, Community gardening app, Interactive learning platform for kids.',
    lastEditDate: '22/4/25',
  },
  {
    id: '4',
    user_id: 'user123',
    title: 'Book Recommendations',
    content: 'Sapiens by Yuval Noah Harari, Atomic Habits by James Clear, The Midnight Library by Matt Haig. Also, re-read Dune.',
    lastEditDate: '21/4/25',
  },
  {
    id: '5',
    user_id: 'user123',
    title: 'Vacation Plans Summer 2025',
    content: 'Research destinations: Italy, Japan, or a national parks road trip. Check flight prices and accommodation options. Plan itinerary.',
    lastEditDate: '20/4/25',
  },
];
