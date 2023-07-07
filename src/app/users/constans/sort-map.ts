import { SortMap } from '../models/sort-map.type';
import { localeStringComparator } from '../utils/locale-string-comparator';

export const sortMap: SortMap = {
  name: (a, b) =>
    b.name && a.name ? localeStringComparator(a.name.first, b.name.first) : 1,
  age: (a, b) => b.age - a.age,
  company: (a, b) => localeStringComparator(a.company, b.company),
  email: (a, b) => localeStringComparator(a.email, b.email),
  balance: (a, b) => localeStringComparator(a.balance, b.balance),
  address: (a, b) => localeStringComparator(a.address, b.address),
  tags: (a, b) => localeStringComparator(a.tags[0], b.tags[0]),
  favorite_fruit: (a, b) =>
    localeStringComparator(a.favoriteFruit, b.favoriteFruit),
};
