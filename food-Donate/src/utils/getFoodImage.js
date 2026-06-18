// =================  FOOD IMAGE MAPPER =================
export const getFoodImage = (foodName) => {
  const defaultImage = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop";

  if (!foodName) return defaultImage;
  const name = foodName.toLowerCase();

  //  CLEAN DICTIONARY:
  const foodCatalog = [
    {
      keywords: ["curd", "yoghurt", "thayir"],
      url: "https://images.unsplash.com/photo-1571244856341-4f3dd95db33e"
    },
    {
      keywords: ["biryani", "briyani", "pulao"],
      url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8"
    },
    {
      keywords: ["rice", "saadham", "meals", "veg meals", "non veg meals"],
      url: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906"
    },
    {
      keywords: ["roti", "chapati", "naan", "paratha", "poori"],
      url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641"
    },
    {
      keywords: ["idli", "dosa", "vada", "tiffin", "pongal"],
      url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976" 
    },
    {
      keywords: ["fruit", "apple", "banana", "orange"],
      url: "https://images.unsplash.com/photo-1610832958506-aa56368176cf"
    },
    {
      keywords: ["sweet", "dessert", "cake", "payasam", "laddu", "halwa"],
      url: "https://images.unsplash.com/photo-1551024601-bec78aea704b"
    }
  ];

  //  SMART SEARCH:
  const matchedFood = foodCatalog.find(item => 
    item.keywords.some(keyword => name.includes(keyword))
  );

  // 
  return matchedFood 
    ? `${matchedFood.url}?q=80&w=800&auto=format&fit=crop`
    : defaultImage;
};