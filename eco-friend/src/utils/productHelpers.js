export function getPrimaryImage(product) {
  return (
    product.images?.find((image) => image.isPrimary)?.url ||
    product.images?.[0]?.url ||
    ""
  );
}