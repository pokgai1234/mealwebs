// src/types/shopping.ts

export interface ShoppingTaskItem {
  name: string; // Friendly name for display
  dish_name: string; // Context for AI, e.g., meal name
  item_to_search: string; // Actual search query for Coles
  quantity_description: string; // Desired quantity, e.g., "500g", "2 packs"
}

export interface TriggerTaskRequestPayload {
  user_id: string;
  shopping_items: ShoppingTaskItem[];
  callback_url: string;
  request_id: string; // UUID for tracking
}

export interface OrchestratorResult {
  request_id: string;
  user_id: string;
  success: boolean;
  message: string;
  final_list_url: string | null;
  calculated_total_price: string | null;
  error_details: string | null;
}
