/**
 * Returns a reliable logo URL for a given crypto symbol.
 * Uses CoinCap assets CDN as the primary source.
 */
export const getLogo = (symbol) => {
  return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
};
