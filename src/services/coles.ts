/**
 * Represents a product available at Coles.
 */
export interface ColesProduct {
  /**
   * The unique ID of the product.
   */
  id: string;
  /**
   * The name of the product.
   */
  name: string;
  /**
   * The price of the product.
   */
  price: number;
  /**
   * An image URL of the product.
   */
  imageUrl: string;
}

/**
 * Asynchronously searches for products at Coles based on a query.
 *
 * @param query The search query.
 * @returns A promise that resolves to an array of ColesProduct objects.
 */
export async function searchColesProducts(query: string): Promise<ColesProduct[]> {
  // TODO: Implement this by calling the Coles API.

  return [
    {
      id: '1',
      name: 'Coles Australian Beef Mince 500g',
      price: 7.50,
      imageUrl: 'https://shop.coles.com.au/wcsstore/ColesCAS/wcm/idc/1441297_1.jpg',
    },
    {
      id: '2',
      name: 'Coles Free Range Eggs 12 Pack',
      price: 6.00,
      imageUrl: 'https://shop.coles.com.au/wcsstore/ColesCAS/wcm/idc/1448888_1.jpg',
    },
  ];
}

/**
 * Asynchronously retrieves a Coles product by its ID.
 *
 * @param productId The ID of the product to retrieve.
 * @returns A promise that resolves to a ColesProduct object or null if not found.
 */
export async function getColesProduct(productId: string): Promise<ColesProduct | null> {
  // TODO: Implement this by calling the Coles API.

  return {
    id: '1',
    name: 'Coles Australian Beef Mince 500g',
    price: 7.50,
    imageUrl: 'https://shop.coles.com.au/wcsstore/ColesCAS/wcm/idc/1441297_1.jpg',
  };
}
