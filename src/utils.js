function getQueryString(params) {
  var esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
}

const defaultVenueOptions = {
  client_id: '1CPAVHCZ44EOTXDVRLPYJPWXBSAVTNSWGVLG0QRST32H3DNR',
  client_secret: '51MYE2M4S0NJIBG5YOVQLTW1RS00XEV0UZD32BPYYNDYWTJI',
  openNow: 1,
  v: '20170801',
}

const fetchVenues = ({ lat, lng, radius }) => {
  const qs = {
    ...defaultVenueOptions,
    ll: `${lat},${lng}`,
    radius
  }
  return fetch('https://api.foursquare.com/v2/venues/explore?' + getQueryString(qs))
    .then(res => res.json())
    .then(({ response }) => {
      const venues = response.groups[0].items.map(({ venue }) => ({
        formattedAddress: venue.location.formattedAddress,
        phone: venue.contact.phone,
        name: venue.name,
        tier: venue.price && venue.price.tier,
        rating: venue.rating,
        url: venue.url,
        ratingColor: venue.ratingColor,
        lat: venue.location.lat,
        lng: venue.location.lng,
        tag: venue.categories[0].name
      }));
      return venues;
    })
};

export default {fetchVenues};