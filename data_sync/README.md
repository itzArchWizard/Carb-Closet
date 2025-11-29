# Data Synchronization

This directory contains scripts to fetch food data from public APIs and sync it to your Supabase database.

## OpenFoodFacts Sync (`openFoodFacts.js`)

This script searches OpenFoodFacts for products and maps them to your `foods` table schema.

### Usage

1.  Open `openFoodFacts.js`.
2.  Update the `supabase` initialization with your actual Project URL and Anon Key.
3.  Uncomment the Supabase insertion logic at the bottom.
4.  Run the script (requires Node.js v18+ or Deno):

```bash
node openFoodFacts.js
```

### Customization

You can change the `query` variable in the script to search for different food categories (e.g., "pasta", "rice", "cookies").
