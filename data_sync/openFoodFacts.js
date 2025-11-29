
import { createClient } from '@supabase/supabase-js'

// Configuration
const OFF_API_URL = 'https://world.openfoodfacts.org/cgi/search.pl';

// Helper to fetch from OpenFoodFacts
async function searchOpenFoodFacts(query, pageSize = 5) {
    const url = `${OFF_API_URL}?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=${pageSize}`;
    console.log(`Fetching from: ${url}`);

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.products || [];
    } catch (error) {
        console.error("Error fetching from OpenFoodFacts:", error);
        return [];
    }
}

// Map OFF product to our schema
function mapProductToSchema(product) {
    const nutriments = product.nutriments || {};

    return {
        name: product.product_name || 'Unknown Product',
        brand: product.brands || 'Unknown Brand',
        barcode: product.code,
        calories_per_100g: nutriments['energy-kcal_100g'] || 0,
        protein_per_100g: nutriments.protein_100g || 0,
        carbs_per_100g: nutriments.carbohydrates_100g || 0,
        fat_per_100g: nutriments.fat_100g || 0,
        fiber_per_100g: nutriments.fiber_100g || 0,
        sugar_per_100g: nutriments.sugars_100g || 0,
        source: 'OpenFoodFacts',
        // Note: OFF doesn't always have GI, so we default to null or estimate
        glycemic_index: null
    };
}

// Main function to run the sync
async function runSync(query) {
    console.log(`Starting sync for query: "${query}"...`);

    const products = await searchOpenFoodFacts(query);
    console.log(`Found ${products.length} products.`);

    const mappedProducts = products.map(mapProductToSchema);

    // Log the first result to show structure
    if (mappedProducts.length > 0) {
        console.log("Example mapped product:", mappedProducts[0]);
    }

    // Initialize Supabase with the Service Role Key to bypass RLS (Row Level Security)
    // This allows us to insert foods without needing a logged-in user.
    const supabaseUrl = 'https://mckqnzinfnnsduhzlaht.supabase.co';
    const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ja3FuemluZm5uc2R1aHpsYWh0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDQyNDQ2MCwiZXhwIjoyMDgwMDAwNDYwfQ.83zRCrh7E_VnbnYyRI30Prr8pVYBG-C-LRhumYNnb88'; // Settings > API > Service Role Key (secret)

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
        .from('foods')
        .upsert(mappedProducts, { onConflict: 'barcode' });

    if (error) console.error('Supabase Error:', error);
    else console.log(`Successfully synced ${data ? data.length : mappedProducts.length} items to Supabase!`);
}

// Allow running from command line with an argument
// e.g., node data_sync/openFoodFacts.js "bread"
// Note: In a browser/Deno environment, arguments handling differs.
// This is a generic script structure.

const query = 'bread'; // Default query
runSync(query);
