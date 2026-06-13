export const getFoodImage = (foodName) => {
  if (!foodName) return "https://images.unsplash.com/photo-1504674900247-0877df9cc836"; // default image

  const name = foodName.toLowerCase();

  if (name.includes("curd") || name.includes("yoghurt") || name.includes("thayir")) {
    return "https://images.unsplash.com/photo-1626545199652-3d712ce65b59?q=80&w=800&auto=format&fit=crop"; 
  }
  if (name.includes("biryani") || name.includes("briyani") || name.includes("pulao")) {
    return "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop"; 
  }
  if (name.includes("rice") || name.includes("saadham") || name.includes("meals")) {
    return "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?q=80&w=800&auto=format&fit=crop";
  }
  if (name.includes("roti") || name.includes("chapati") || name.includes("naan") || name.includes("paratha")) {
    return "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop";
  }
  if (name.includes("idli") || name.includes("dosa") || name.includes("vada") || name.includes("tiffin")) {
    return "https://images.unsplash.com/photo-1610192773928-761159846b9a?q=80&w=800&auto=format&fit=crop";
  }
  if (name.includes("fruit") || name.includes("apple") || name.includes("banana")) {
    return "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop";
  }
  if (name.includes("sweet") || name.includes("dessert") || name.includes("cake") || name.includes("payasam")) {
    return "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop";
  }

  // Fallback generic food image
  return "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop";
};
