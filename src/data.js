const WALLETS_DATA = [
  {
    id: 1,
    name: 'RHB Debit Card',
    image: 'credit.png',
    initialBalance: 1000,
  },
  {
    id: 2,
    name: 'RHB Platinum Credit Card',
    image: 'credit-plat.png',
    initialBalance: 0,
  },
  {
    id: 3,
    name: 'Cash',
    image: 'cash.png',
    initialBalance: 100,
  },
];

const CATEGORIES_DATA = [
  {
    id: 1,
    name: 'Food',
    type: 'expense',
  },
  {
    id: 2,
    name: 'Transport',
    type: 'expense',
  },
  {
    id: 3,
    name: 'Entertainment',
    type: 'expense',
  },
  {
    id: 4,
    name: 'Shopping',
    type: 'expense',
  },
  {
    id: 5,
    name: 'Others',
    type: 'expense',
  },
  {
    id: 6,
    name: 'Salary',
    type: 'income',
  },
  {
    id: 7,
    name: 'Allowance',
    type: 'income',
  },
  {
    id: 8,
    name: 'Others',
    type: 'income',
  },
  {
    id: 9,
    name: 'Repayment',
    type: 'income',
  },
];

const TRANSACTIONS_DATA = [
  {
    wallet_id: 1,
    category_id: 1,
    description: 'Chicken Rice - lunch',
    entry_date: '2023-01-14',
    amount: 25.4,
  },
  {
    wallet_id: 1,
    category_id: 2,
    description: 'Grab to work',
    entry_date: '2023-01-14',
    amount: 10.0,
  },
  {
    wallet_id: 1,
    category_id: 3,
    description: 'Movie date',
    entry_date: '2023-01-14',
    amount: 50.1,
  },
  {
    wallet_id: 1,
    category_id: 4,
    description: 'Shopping',
    entry_date: '2023-01-14',
    amount: 100.3,
  },
  {
    wallet_id: 1,
    category_id: 5,
    description: 'Others',
    entry_date: '2023-01-14',
    amount: 10.0,
  },
  {
    wallet_id: 1,
    category_id: 1,
    description: 'McDonalds',
    entry_date: '2023-01-14',
    amount: 20.1,
  },
  {
    wallet_id: 1,
    category_id: 1,
    description: 'Nasi Lemak',
    entry_date: '2023-01-14',
    amount: 20.0,
  },
  {
    wallet_id: 1,
    category_id: 1,
    description: 'Chicken Rice',
    entry_date: '2023-01-14',
    amount: 25.4,
  },
  {
    wallet_id: 1,
    category_id: 1,
    description: 'Nasi Briyani',
    entry_date: '2023-01-14',
    amount: 20.0,
  },
  {
    wallet_id: 1,
    category_id: 1,
    description: 'Chicken Rice',
    entry_date: '2023-01-14',
    amount: 15.4,
  },
  {
    wallet_id: 1,
    category_id: 6,
    description: 'MyCompany',
    entry_date: '2023-01-14',
    amount: 900.0,
  },
  {
    wallet_id: 1,
    category_id: 7,
    description: 'from parents',
    entry_date: '2023-01-14',
    amount: 250.0,
  }
];

const OLD_TRANSACTIONS_DATA = [
  {
    id: 1,
    walletId: 1,
    categoryId: 1,
    date: '2021-01-01',
    description: 'Chicken Rice - lunch',
    amount: 25.4,
  },
  {
    id: 2,
    walletId: 1,
    categoryId: 2,
    date: '2021-01-01',
    description: 'Grab to work',
    amount: 10.0,
  },
  {
    id: 3,
    walletId: 1,
    categoryId: 3,
    date: '2021-01-01',
    description: 'Movie date',
    amount: 50.1,
  },
  {
    id: 4,
    walletId: 1,
    categoryId: 4,
    date: '2021-01-01',
    description: 'Shopping',
    amount: 100.3,
  },
  {
    id: 5,
    walletId: 1,
    categoryId: 5,
    date: '2021-01-01',
    description: 'Others',
    amount: 10.0,
  },
  {
    id: 6,
    walletId: 1,
    categoryId: 1,
    date: '2021-01-02',
    description: 'McDonalds',
    amount: 20.1,
  },
  {
    id: 7,
    walletId: 1,
    categoryId: 1,
    date: '2021-01-03',
    description: 'Nasi Lemak',
    amount: 20.0,
  },
  {
    id: 8,
    walletId: 1,
    categoryId: 1,
    date: '2021-01-04',
    description: 'Chicken Rice',
    amount: 25.4,
  },
  {
    id: 9,
    walletId: 1,
    categoryId: 1,
    date: '2021-01-05',
    description: 'Nasi Briyani',
    amount: 20.0,
  },
  {
    id: 10,
    walletId: 1,
    categoryId: 1,
    date: '2021-01-06',
    description: 'Chicken Rice',
    amount: 25.4,
  },
];

const REWARD_DATA = [
  {
    label: 'Budget! Budget! Budget!',
    description: 'Stay within your budget for any one of the categories for a single month.',
    expired: '11/10/2023',
    lottie: 'https://assets4.lottiefiles.com/packages/lf20_yZpLO2.json',
    earned: true,
    completion: 15,
  },
  {
    label: 'Turn Around',
    description:
      'Spend at least 10% lesser compared to your previous month\'s expenses.',
    expired: '11/10/2023',
    lottie: 'https://assets4.lottiefiles.com/packages/lf20_ep1tn2ew.json',
    earned: true,
    completion: 37,
  },
  {
    label: 'On The Way!',
    description: 'Save RM1000 for at least one item in your Piggy Bank.',
    expired: '11/10/2023',
    lottie: 'https://assets5.lottiefiles.com/private_files/lf30_omlrftyq.json',
    earned: false,
    completion: 20,
  },
  {
    label: 'Sleep is Better',
    description: 'Spend less than RM200 in the Entertainment category for a single month.',
    expired: '11/10/2023',
    lottie: 'https://assets4.lottiefiles.com/packages/lf20_lFRXJJKwS5.json',
    earned: false,
    completion: 5,
  },
  {
    label: 'Omega Spender',
    description: 'Spend more than RM3000 for a single month.',
    expired: '11/10/2023',
    lottie: 'https://assets4.lottiefiles.com/packages/lf20_OdVhgq.json',
    earned: false,
    completion: 56,
  },
];

const SUMMARY_DATA = [
  {
    label: 'Food',
    totalSpend: 1200,
    averageSpend: 800,
    lastMonth: 700,
  },
  {
    label: 'Transport',
    totalSpend: 400,
    averageSpend: 300,
    lastMonth: 300,
  },
  {
    label: 'Shopping',
    totalSpend: 600,
    averageSpend: 200,
    lastMonth: 300,
  },
  {
    label: 'Entertainment',
    totalSpend: 500,
    averageSpend: 600,
    lastMonth: 700,
  },
];

export {
  WALLETS_DATA,
  CATEGORIES_DATA,
  TRANSACTIONS_DATA,
  REWARD_DATA,
  SUMMARY_DATA,
};
