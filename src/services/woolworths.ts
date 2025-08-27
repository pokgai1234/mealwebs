/**
 * Represents a product available at Woolworths.
 */
export interface WoolworthsProduct {
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
 * Asynchronously searches for products at Woolworths based on a query.
 *
 * @param query The search query.
 * @returns A promise that resolves to an array of WoolworthsProduct objects.
 */
export async function searchWoolworthsProducts(query: string): Promise<WoolworthsProduct[]> {
  // TODO: Implement this by calling the Woolworths API.

  return [
    {
      id: '3',
      name: 'Woolworths Chicken Breast Fillets 1kg',
      price: 12.00,
      imageUrl: 'https://www.woolworths.com.au/shop/productdetails/138529/woolworths-chicken-breast-fillets',
    },
    {
      id: '4',
      name: 'Woolworths Bananas per kg',
      price: 3.00,
      imageUrl: 'https://www.woolworths.com.au/shop/productdetails/21812/woolworths-bananas',
    },
  ];
}

/**
 * Asynchronously retrieves a Woolworths product by its ID.
 *
 * @param productId The ID of the product to retrieve.
 * @returns A promise that resolves to a WoolworthsProduct object or null if not found.
 */
export async function getWoolworthsProduct(productId: string): Promise<WoolworthsProduct | null> {
  // TODO: Implement this by calling the Woolworths API.

  return {
    id: '3',
    name: 'Woolworths Chicken Breast Fillets 1kg',
    price: 12.00,
    imageUrl: 'https://www.woolworths.com.au/shop/productdetails/138529/woolworths-chicken-breast-fillets',
  };
}
