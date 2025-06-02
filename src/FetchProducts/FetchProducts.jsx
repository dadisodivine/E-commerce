export async function fetchProducts() {
    const url = "https://fakestoreapi.in/api/products?limit=150";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return { products: data, error: null };
    } catch (error) {
        return { products: [], error };
    }
}
