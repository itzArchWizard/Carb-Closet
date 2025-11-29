import { supabase } from './supabaseClient.js';

// --- The Database ---
// Fallback/Local Data
const localCarbData = [
    // Fruits
    {
        id: 1,
        name: "Apple",
        emoji: "🍎",
        category: "fruit",
        nakedRisk: "Fructose hits the liver quickly; plain fruit causes moderate spikes.",
        tips: "Always eat the skin for extra fiber!",
        clothes: [
            { name: "Peanut Butter Coat", desc: "1 tbsp natural peanut butter", type: "Fat + Protein" },
            { name: "Cheese Hat", desc: "1 string cheese or slice of cheddar", type: "Fat + Protein" },
            { name: "Walnut Crunch", desc: "A small handful of raw walnuts", type: "Healthy Fat" }
        ]
    },
    {
        id: 2,
        name: "Banana",
        emoji: "🍌",
        category: "fruit",
        nakedRisk: "Very high glycemic index, especially when ripe. Can cause rapid spikes.",
        tips: "Choose slightly green bananas for more resistant starch (gut healthy!).",
        clothes: [
            { name: "Yogurt Dip", desc: "Dip in full-fat Greek yogurt", type: "Protein" },
            { name: "Almond Butter Boat", desc: "Slice lengthwise and spread almond butter", type: "Fat" },
            { name: "Protein Smoothie", desc: "Blend with protein powder and spinach", type: "Complete Meal" }
        ]
    },
    {
        id: 3,
        name: "Grapes",
        emoji: "🍇",
        category: "fruit",
        nakedRisk: "Often called 'sugar bombs' because they are easy to overeat and high in fast sugar.",
        tips: "Freeze them for a slower-to-eat treat!",
        clothes: [
            { name: "Cheese Cube Skewers", desc: "Alternate grape and cheddar cube on a toothpick", type: "Fat + Protein" },
            { name: "Walnut Pairings", desc: "Eat one walnut for every 2 grapes", type: "Fat" },
            { name: "Charcuterie Board", desc: "Pair with salami or turkey slices", type: "Protein" }
        ]
    },
    {
        id: 4,
        name: "Berries",
        emoji: "🍓",
        category: "fruit",
        nakedRisk: "Lower glycemic than most fruits, but still better with friends!",
        tips: "Berries are the best fruit choice for PCOS due to antioxidants.",
        clothes: [
            { name: "Cream Swim", desc: "Bowl of heavy whipping cream or coconut cream", type: "Fat" },
            { name: "Cottage Cheese Mix", desc: "Mix into cottage cheese", type: "High Protein" },
            { name: "Seed Sprinkle", desc: "Top with chia and hemp seeds", type: "Fiber + Fat" }
        ]
    },
    // Grains
    {
        id: 5,
        name: "White Rice",
        emoji: "🍚",
        category: "grain",
        nakedRisk: "Pure starch that converts to glucose almost instantly.",
        tips: "Cooling cooked rice and reheating it increases resistant starch!",
        clothes: [
            { name: "The Salmon Tuxedo", desc: "Top with fatty salmon and avocado", type: "Omega-3 Fats" },
            { name: "Vinegar Hack", desc: "Eat a side salad with vinegar dressing before the rice", type: "Hack" },
            { name: "Veggie Volume", desc: "Mix 50/50 with cauliflower rice", type: "Fiber" }
        ]
    },
    {
        id: 6,
        name: "Toast",
        emoji: "🍞",
        category: "breakfast",
        nakedRisk: "Porous texture allows rapid digestion.",
        tips: "Sourdough is better than standard wheat due to fermentation.",
        clothes: [
            { name: "Avocado Smash", desc: "1/2 Avocado + Hemp seeds + Chili flakes", type: "Healthy Fat" },
            { name: "Egg Top", desc: "2 Poached or scrambled eggs on top", type: "Protein" },
            { name: "Savory Spread", desc: "Hummus + Cucumber slices", type: "Fiber + Fat" }
        ]
    },
    {
        id: 7,
        name: "Oatmeal",
        emoji: "🥣",
        category: "breakfast",
        nakedRisk: "Often marketed as healthy, but plain instant oats are a glucose spike waiting to happen.",
        tips: "Use steel-cut or rolled oats instead of instant.",
        clothes: [
            { name: "Protein Porridge", desc: "Stir in a scoop of protein powder while cooking", type: "Protein" },
            { name: "The Fat Bomb", desc: "Top with tbsp butter/ghee and flax seeds", type: "Fat" },
            { name: "Greek Style", desc: "Add a dollop of full-fat Greek yogurt", type: "Protein + Fat" }
        ]
    },
    {
        id: 8,
        name: "Pasta",
        emoji: "🍝",
        category: "grain",
        nakedRisk: "Dense carbohydrate source that adds up quickly.",
        tips: "Cook 'al dente' (firm) for a lower glycemic response.",
        clothes: [
            { name: "Meat Sauce Heavy", desc: "Focus on the Bolognese (meat), light on the noodles", type: "Protein" },
            { name: "Veggie Starter", desc: "Eat a plate of roasted broccoli before the pasta", type: "Fiber Coating" },
            { name: "Creamy Pesto", desc: "Use a high-fat pesto sauce with pine nuts", type: "Fat" }
        ]
    },
    // Snacks
    {
        id: 9,
        name: "Potato Chips",
        emoji: "🥔",
        category: "snack",
        nakedRisk: "Starch fried in inflammatory oils.",
        tips: "Portion them out into a bowl, never eat from the bag.",
        clothes: [
            { name: "Guacamole Dip", desc: "Dip every chip in guac", type: "Healthy Fat" },
            { name: "Tuna Salad Scoop", desc: "Use chips as a spoon for tuna salad", type: "Protein" },
            { name: "Vinegar Shot", desc: "Have a tall glass of water with 1 tbsp ACV before snacking", type: "Hack" }
        ]
    },
    {
        id: 10,
        name: "Chocolate",
        emoji: "🍫",
        category: "snack",
        nakedRisk: "High sugar content leads to immediate dopamine and glucose hits.",
        tips: "Dark chocolate (>70%) is much safer than milk chocolate.",
        clothes: [
            { name: "Dessert Timing", desc: "Eat it immediately after a savory meal, not on an empty stomach", type: "Timing" },
            { name: "Nut Butter Sandwich", desc: "Sandwich a layer of almond butter between two squares", type: "Fat" },
            { name: "Almond Chaser", desc: "Follow every piece with 3 almonds", type: "Fiber/Fat" }
        ]
    },
    {
        id: 11,
        name: "Crackers",
        emoji: "🍘",
        category: "snack",
        nakedRisk: "Dry, processed flour that spikes sugar fast.",
        tips: "Look for seed-based crackers for better baseline stats.",
        clothes: [
            { name: "Tuna Boat", desc: "Top with canned tuna mixed with mayo", type: "Protein + Fat" },
            { name: "Cheese Plate", desc: "Thick slice of cheddar on every cracker", type: "Fat" },
            { name: "Hummus Heavy", desc: "More hummus than cracker!", type: "Fiber" }
        ]
    },
    {
        id: 12,
        name: "Popcorn",
        emoji: "🍿",
        category: "snack",
        nakedRisk: "It's a whole grain, but high volume means high carb load.",
        tips: "Air popped is best, but needs fat added back in.",
        clothes: [
            { name: "Parmesan Shower", desc: "Douse in olive oil and parmesan cheese", type: "Fat + Protein" },
            { name: "Nut Mix", desc: "Mix 1:1 with peanuts or pecans", type: "Fat" },
            { name: "Beef Jerky Side", desc: "Eat alongside a stick of beef jerky", type: "Protein" }
        ]
    },
];

let carbData = [...localCarbData];

// --- Logic ---

const grid = document.getElementById('carbGrid');
const searchInput = document.getElementById('searchInput');
let currentCategory = 'all';

// Fetch data from Supabase
async function fetchFoods() {
    try {
        const { data, error } = await supabase
            .from('foods')
            .select('*');

        if (error) {
            console.warn('Supabase fetch error:', error.message);
            return;
        }

        if (data && data.length > 0) {
            console.log('Fetched foods from Supabase:', data);

            const mappedFoods = data.map(item => {
                // Generate dynamic advice based on nutrition if missing
                const isHighCarb = item.carbs_per_100g > 20;
                const isLowFiber = item.fiber_per_100g < 3;

                let risk = "Contains carbohydrates.";
                if (isHighCarb && isLowFiber) risk = "High carb & low fiber. Likely to spike blood sugar fast!";
                else if (isHighCarb) risk = "High carb, but has some fiber.";

                // Default clothes if none (since our DB doesn't have them yet)
                const clothes = [
                    { name: "Protein Pair", desc: "Pair with a boiled egg or nuts", type: "Protein" },
                    { name: "Walk it off", desc: "Go for a 10m walk after eating", type: "Movement" }
                ];

                return {
                    id: item.id,
                    name: item.name,
                    emoji: '🆕', // Default emoji for new items
                    category: 'pantry', // Default category
                    nakedRisk: risk,
                    tips: `Carbs: ${item.carbs_per_100g}g | Fiber: ${item.fiber_per_100g}g`,
                    clothes: clothes
                };
            });

            // Merge with local data
            carbData = [...localCarbData, ...mappedFoods];
            renderCards(carbData);
        }
    } catch (err) {
        console.warn('Supabase not configured or network error.', err);
    }
}

function renderCards(data) {
    grid.innerHTML = '';

    if (data.length === 0) {
        document.getElementById('emptyState').classList.remove('hidden');
        return;
    } else {
        document.getElementById('emptyState').classList.add('hidden');
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-3xl p-6 shadow-sm border border-pink-50 hover:shadow-cute transition-all cursor-pointer flex flex-col items-center text-center group';
        card.onclick = () => openModal(item);

        card.innerHTML = `
            <div class="text-5xl mb-4 transform group-hover:scale-110 transition-transform">${item.emoji || '🍽️'}</div>
            <h3 class="text-xl font-bold text-gray-700 mb-1">${item.name}</h3>
            <p class="text-xs text-gray-400 font-bold uppercase tracking-wider bg-pink-50 px-2 py-1 rounded-full">${item.category || 'General'}</p>
            <div class="mt-4 w-full bg-soft-pink text-deep-rose py-2 rounded-xl font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Dress me up! 👗
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterCarbs() {
    const query = searchInput.value.toLowerCase();
    const filtered = carbData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(query);
        const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
        return matchesSearch && matchesCategory;
    });
    renderCards(filtered);
}

function filterCategory(cat) {
    currentCategory = cat;

    // Update UI buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        // Simple way to match the category from text content for this specific implementation
        const btnText = btn.textContent.toLowerCase().trim();
        const catName = cat === 'all' ? 'all' : cat;

        if (btnText.includes(catName)) {
            btn.classList.remove('bg-white', 'text-gray-600');
            btn.classList.add('bg-deep-rose', 'text-white');
        } else {
            btn.classList.add('bg-white', 'text-gray-600');
            btn.classList.remove('bg-deep-rose', 'text-white');
        }
    });

    filterCarbs();
}

// --- Modal Logic ---

const modal = document.getElementById('detailModal');
const modalTitle = document.getElementById('modalTitle');
const modalIcon = document.getElementById('modalIcon');
const modalReason = document.getElementById('modalReason');
const modalSuggestions = document.getElementById('modalSuggestions');
const modalTip = document.getElementById('modalTip');

function openModal(item) {
    // Populate Content
    modalTitle.innerText = item.name;
    modalIcon.innerText = item.emoji || '🍽️';
    modalReason.innerText = item.nakedRisk || 'Eating this alone might spike your sugar.';
    modalTip.innerText = item.tips || 'Pair with protein or fat!';

    // Populate Suggestions
    modalSuggestions.innerHTML = '';

    const clothes = item.clothes || [];

    if (clothes.length === 0) {
        modalSuggestions.innerHTML = '<p class="text-gray-500 italic">No specific suggestions yet. Try adding some nuts or cheese!</p>';
    }

    clothes.forEach(cloth => {
        const div = document.createElement('div');
        div.className = 'bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-start gap-3';
        div.innerHTML = `
            <div class="bg-lavender p-2 rounded-full text-grape">
                <i class="ph ph-check-circle text-xl"></i>
            </div>
            <div>
                <h5 class="font-bold text-gray-800">${cloth.name}</h5>
                <p class="text-sm text-gray-500">${cloth.desc}</p>
                <span class="text-xs font-bold text-grape mt-1 inline-block bg-purple-50 px-2 py-0.5 rounded">${cloth.type}</span>
            </div>
        `;
        modalSuggestions.appendChild(div);
    });

    // Show Modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function toggleInfoModal() {
    const infoModal = document.getElementById('infoModal');
    if (infoModal.classList.contains('hidden')) {
        infoModal.classList.remove('hidden');
        infoModal.classList.add('flex');
    } else {
        infoModal.classList.add('hidden');
        infoModal.classList.remove('flex');
    }
}

// Expose functions to window for HTML onclick handlers
window.filterCarbs = filterCarbs;
window.filterCategory = filterCategory;
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleInfoModal = toggleInfoModal;

// Initialize
fetchFoods(); // Try to fetch remote data
renderCards(carbData); // Render local data immediately