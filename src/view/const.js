export const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const DateFormat = {
  MAIN: 'DD MMM',
  VIEW: 'hh:mm',
  EDIT: 'DD/MM/YY hh:mm',
  SERVICE: 'YYYY-MM-DDThh:mm',
  SERVISE_MAIN: 'YYYY-MM-DD',
};

export const getDefaultEvent = () => ({
  'basePrice': 0,
  'dateFrom': new Date().getTime(),
  'dateTo': new Date().getTime(),
  'destination': 0,
  'isFavorite': false,
  'offers': [],
  'type': EVENT_TYPES[0]
});
