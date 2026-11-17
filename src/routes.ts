export interface Route {
  path: string;
  label: string;
  pageFile: string;
}

export const routes: Route[] = [
  { path: '/', label: 'Home', pageFile: 'HomePage' },
  { path: '/tickets', label: 'Tickets', pageFile: 'TicketsPage' },
  { path: '/merch', label: 'Merch', pageFile: 'MerchPage' },
];
