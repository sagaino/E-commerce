import { Column } from "@/services/type/cart";

export type NavItemType = {
  title: string,
  href: string,
}

const NAV_ITEM: NavItemType[] = [
  {
    title: 'Products',
    href: '/product'
  },
  {
    title: 'Carts',
    href: '/cart'
  },
]

const COLUMNS: readonly Column[] = [
  { id: 'id', label: 'Id', minWidth: 170 },
  { id: 'userId', label: 'User ID', minWidth: 100 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'totalProduct',
    label: 'Total Product',
    minWidth: 170,
    align: 'right',
  },
];

const DRAWER_WIDTH: number = 240

export { NAV_ITEM, DRAWER_WIDTH, COLUMNS }