// ═══════════════════════════════════════════════════════════════
// SHAMBHU SERENITY FOOD SERVICE — Menu Data & Translations
// ═══════════════════════════════════════════════════════════════

const AppData = {

  // ─── Brand ───────────────────────────────────────────────────
  brand: {
    name: { hi: 'शंभू सेरिनिटी फूड सर्विस', en: 'Shambhu Serenity Food Service' },
    tagline: { hi: 'घर जैसा स्वाद, अपनापन हर निवाले में', en: 'Ghar Jaisa Swaad, Apnapan Har Niwale Mein' },
    phone: '+91 98277 85483',
    whatsapp: '919827785483',
  },

  // ─── Categories ──────────────────────────────────────────────
  categories: [
    { id: 'drinks',       name: { hi: 'पेय पदार्थ',       en: 'Drinks' },        emoji: '☕' },
    { id: 'nashta',       name: { hi: 'नाश्ता',           en: 'Nashta' },        emoji: '🍳' },
    { id: 'roti-paratha', name: { hi: 'रोटी और पराठा',    en: 'Roti & Paratha' }, emoji: '🫓' },
    { id: 'rice',         name: { hi: 'चावल',             en: 'Rice' },          emoji: '🍚' },
    { id: 'other',        name: { hi: 'अन्य व्यंजन',      en: 'Other Dishes' },  emoji: '🍽️' },
    { id: 'thali',        name: { hi: 'थाली',             en: 'Thali' },         emoji: '🥘' },
  ],

  // ─── Menu Items ──────────────────────────────────────────────
  menuItems: [
    // ── Drinks ──
    { id: 'chai',           category: 'drinks',       name: { hi: 'चाय',              en: 'Chai' },           price: 25,  isVeg: true },
    { id: 'coffee',         category: 'drinks',       name: { hi: 'कॉफी',             en: 'Coffee' },         price: 40,  isVeg: true },
    { id: 'cold-coffee',    category: 'drinks',       name: { hi: 'कोल्ड कॉफी',       en: 'Cold Coffee' },    price: 80,  isVeg: true },
    { id: 'black-coffee',   category: 'drinks',       name: { hi: 'ब्लैक कॉफी',       en: 'Black Coffee' },   price: 50,  isVeg: true },
    { id: 'plain-milk',     category: 'drinks',       name: { hi: 'दूध (सादा)',        en: 'Plain Milk' },     price: 40,  isVeg: true },
    { id: 'black-tea',      category: 'drinks',       name: { hi: 'ब्लैक टी',         en: 'Black Tea' },      price: 25,  isVeg: true },
    { id: 'lassi',          category: 'drinks',       name: { hi: 'लस्सी',            en: 'Lassi' },          price: 40,  isVeg: true },
    { id: 'banana-shake',   category: 'drinks',       name: { hi: 'बनाना शेक',        en: 'Banana Shake' },   price: 75,  isVeg: true },

    // ── Nashta ──
    { id: 'poha',           category: 'nashta',       name: { hi: 'पोहा (1 प्लेट)',    en: 'Poha (1 Plate)' },  price: 25,  isVeg: true },
    { id: 'upma',           category: 'nashta',       name: { hi: 'उपमा (1 प्लेट)',    en: 'Upma (1 Plate)' },  price: 50,  isVeg: true },
    { id: 'sooji-halwa',    category: 'nashta',       name: { hi: 'सूजी का हलवा',     en: 'Sooji Halwa' },     price: 100, isVeg: true },
    { id: 'pakode',         category: 'nashta',       name: { hi: 'पकौड़े',            en: 'Pakode' },          price: 30,  isVeg: true },
    { id: 'plain-maggi',    category: 'nashta',       name: { hi: 'प्लेन मैगी',        en: 'Plain Maggi' },     price: 50,  isVeg: true },
    { id: 'masala-maggi',   category: 'nashta',       name: { hi: 'मसाला मैगी',        en: 'Masala Maggi' },    price: 100, isVeg: true },

    // ── Roti & Paratha ──
    { id: 'tawa-roti',        category: 'roti-paratha', name: { hi: 'तवा रोटी',          en: 'Tawa Roti' },         price: 10,  isVeg: true },
    { id: 'butter-tawa-roti', category: 'roti-paratha', name: { hi: 'तवा रोटी (बटर)',    en: 'Butter Tawa Roti' },  price: 12,  isVeg: true },
    { id: 'plain-paratha',    category: 'roti-paratha', name: { hi: 'सादा पराठा',        en: 'Plain Paratha' },     price: 30,  isVeg: true },
    { id: 'aloo-paratha',     category: 'roti-paratha', name: { hi: 'आलू पराठा',         en: 'Aloo Paratha' },      price: 50,  isVeg: true },
    { id: 'sev-paratha',      category: 'roti-paratha', name: { hi: 'सेव पराठा',         en: 'Sev Paratha' },       price: 50,  isVeg: true },
    { id: 'mix-paratha',      category: 'roti-paratha', name: { hi: 'मिक्स पराठा',       en: 'Mix Paratha' },       price: 50,  isVeg: true },
    { id: 'pyaz-paratha',     category: 'roti-paratha', name: { hi: 'प्याज पराठा',       en: 'Pyaz Paratha' },      price: 50,  isVeg: true },
    { id: 'paneer-paratha',   category: 'roti-paratha', name: { hi: 'पनीर पराठा',        en: 'Paneer Paratha' },    price: 60,  isVeg: true },

    // ── Rice ──
    { id: 'plain-khichdi',       category: 'rice', name: { hi: 'सादा खिचड़ी',        en: 'Plain Khichdi' },       price: 100, isVeg: true },
    { id: 'aloo-matar-khichdi',  category: 'rice', name: { hi: 'आलू मटर खिचड़ी',     en: 'Aloo Matar Khichdi' },  price: 120, isVeg: true },
    { id: 'cheesy-khichdi',      category: 'rice', name: { hi: 'चीज़वाली खिचड़ी',     en: 'Cheesy Khichdi' },      price: 130, isVeg: true },

    // ── Other Dishes ──
    { id: 'fried-papad',    category: 'other', name: { hi: 'पापड़ (फ्राइड)',   en: 'Fried Papad' },    price: 35,  isVeg: true },
    { id: 'roasted-papad',  category: 'other', name: { hi: 'पापड़ (रोस्टेड)',  en: 'Roasted Papad' },  price: 30,  isVeg: true },
    { id: 'plain-curd',     category: 'other', name: { hi: 'दही (सादा)',       en: 'Plain Curd' },     price: 25,  isVeg: true },
    { id: 'chaas',           category: 'other', name: { hi: 'छाछ',             en: 'Chaas' },          price: 30,  isVeg: true },
    { id: 'pickle',          category: 'other', name: { hi: 'अचार',            en: 'Pickle' },         price: 20,  isVeg: true },
    { id: 'chilli-paneer',   category: 'other', name: { hi: 'चिली पनीर',       en: 'Chilli Paneer' },  price: 220, isVeg: true },
  ],

  // ─── Thali Items ─────────────────────────────────────────────
  thalis: [
    {
      id: 'saada-thali',
      category: 'thali',
      name: { hi: 'सादा थाली', en: 'Saada Thali' },
      price: 160,
      isVeg: true,
      contents: {
        hi: '2 रोटी + मसाला दाल + सब्जी + दाल + चावल + अचार + सलाद + रायता',
        en: '2 Roti + Masala Dal + Sabzi + Dal + Chawal + Pickle + Salad + Raita',
      },
    },
    {
      id: 'special-thali',
      category: 'thali',
      name: { hi: 'स्पेशल थाली', en: 'Special Thali' },
      price: 180,
      isVeg: true,
      contents: {
        hi: '6 पूरी + मसाला दाल + दाल + चावल + सलाद + रायता',
        en: '6 Puri + Masala Dal + Dal + Chawal + Salad + Raita',
      },
    },
    {
      id: 'malvi-thali',
      category: 'thali',
      name: { hi: 'मालवी थाली', en: 'Malvi Thali' },
      price: 220,
      isVeg: true,
      contents: {
        hi: 'दाल + 2 बाटी + चूरमा + दाल + सब्जी + चटनी + अचार + रायता',
        en: 'Dal + 2 Baati + Churma + Dal + Sabzi + Chutney + Pickle + Raita',
      },
    },
  ],

  // ─── UI Translations ────────────────────────────────────────
  translations: {
    // Navigation
    menu:            { hi: 'मेन्यू',          en: 'Menu' },
    thalis:          { hi: 'थाली',            en: 'Thalis' },
    about:           { hi: 'हमारे बारे में',   en: 'About' },
    contact:         { hi: 'संपर्क',           en: 'Contact' },

    // Hero
    heroSubtitle:    { hi: 'ताज़ा, आरामदायक और घर जैसा खाना, प्यार से बनाया गया।', en: 'Fresh, comforting and homely food made with warmth.' },
    viewMenu:        { hi: 'मेन्यू देखें',     en: 'View Menu' },
    orderNow:        { hi: 'ऑर्डर करें',       en: 'Order Now' },

    // Brand Story
    brandStoryTitle: { hi: 'घर जैसा स्वाद',   en: 'Home-like Taste' },
    brandStoryText:  {
      hi: 'सादा खाना। गर्मजोशी भरी मेहमाननवाज़ी। दिल को छू जाने वाले भारतीय स्वाद। ऐसा खाना जो घर की याद दिला दे।',
      en: 'Simple food. Warm hospitality. Comforting Indian flavours. Food made to feel like home.',
    },

    // Menu Section
    searchPlaceholder: { hi: 'खाना खोजें...',     en: 'Search food...' },
    allCategories:     { hi: 'सभी',              en: 'All' },
    addToCart:          { hi: 'जोड़ें',            en: 'Add' },
    vegLabel:          { hi: 'शाकाहारी',         en: 'Veg' },

    // Featured Thalis
    ourSpecialThalis:  { hi: 'हमारी खास थालियाँ',  en: 'Our Special Thalis' },
    contents:          { hi: 'सामग्री',            en: 'Contents' },

    // Cart
    yourCart:           { hi: 'आपका कार्ट',                         en: 'Your Cart' },
    cartEmpty:          { hi: 'आपका कार्ट अभी खाली है',              en: 'Your cart is waiting for something delicious.' },
    subtotal:           { hi: 'उप-योग',                             en: 'Subtotal' },
    total:              { hi: 'कुल',                                en: 'Total' },
    proceedToBilling:   { hi: 'बिलिंग पर जाएँ',                     en: 'Proceed to Billing' },
    clearCart:          { hi: 'कार्ट खाली करें',                     en: 'Clear Cart' },
    addedToCart:        { hi: 'कार्ट में जोड़ दी गई',                en: 'added to cart' },
    removeItem:        { hi: 'हटाएँ',                              en: 'Remove' },

    // Billing
    billingDetails:     { hi: 'बिलिंग विवरण',         en: 'Billing Details' },
    orderSummary:       { hi: 'ऑर्डर सारांश',          en: 'Order Summary' },
    item:               { hi: 'आइटम',                 en: 'Item' },
    quantity:           { hi: 'मात्रा',                en: 'Quantity' },
    price:              { hi: 'कीमत',                  en: 'Price' },
    customerDetails:    { hi: 'ग्राहक विवरण',          en: 'Customer Details' },
    fullName:           { hi: 'पूरा नाम',              en: 'Full Name' },
    mobileNumber:       { hi: 'मोबाइल नंबर',           en: 'Mobile Number' },
    email:              { hi: 'ईमेल (वैकल्पिक)',       en: 'Email (Optional)' },
    address:            { hi: 'पता',                   en: 'Address' },
    specialInstructions:{ hi: 'विशेष निर्देश (वैकल्पिक)', en: 'Special Instructions (Optional)' },
    namePlaceholder:    { hi: 'अपना नाम लिखें',        en: 'Enter your name' },
    mobilePlaceholder:  { hi: 'मोबाइल नंबर',           en: 'Mobile number' },
    emailPlaceholder:   { hi: 'ईमेल',                  en: 'Email' },
    addressPlaceholder: { hi: 'डिलीवरी/सेवा का पता',   en: 'Delivery/service address' },
    instructionsPlaceholder: { hi: 'कोई विशेष निर्देश?', en: 'Any special instructions?' },
    paymentMethod:      { hi: 'भुगतान का तरीका',       en: 'Payment Method' },
    cash:               { hi: 'नकद',                   en: 'Cash' },
    upi:                { hi: 'यूपीआई',                en: 'UPI' },
    payOnDelivery:      { hi: 'डिलीवरी पर भुगतान',     en: 'Pay on Delivery' },
    placeOrder:         { hi: 'ऑर्डर दें',              en: 'Place Order' },
    optional:           { hi: 'वैकल्पिक',              en: 'Optional' },
    required:           { hi: 'आवश्यक',               en: 'Required' },
    invalidMobile:      { hi: 'कृपया सही मोबाइल नंबर दें', en: 'Please enter a valid mobile number' },
    fillRequired:       { hi: 'कृपया सभी आवश्यक फ़ील्ड भरें', en: 'Please fill all required fields' },

    // Order Confirmation
    thankYou:           { hi: 'धन्यवाद',                         en: 'Thank You' },
    orderReceived:      { hi: 'आपका ऑर्डर मिल गया है!',           en: 'Your order has been received!' },
    orderId:            { hi: 'ऑर्डर आईडी',                      en: 'Order ID' },
    customerName:       { hi: 'ग्राहक का नाम',                    en: 'Customer Name' },
    items:              { hi: 'आइटम',                            en: 'Items' },
    totalAmount:        { hi: 'कुल राशि',                        en: 'Total Amount' },
    backToMenu:         { hi: 'मेन्यू पर वापस',                   en: 'Back to Menu' },
    callForOrder:       { hi: 'ऑर्डर के लिए कॉल करें',            en: 'Call for Order' },

    // Contact
    contactTitle:       { hi: 'ऑर्डर के लिए संपर्क करें',          en: 'Contact us for orders' },
    callNow:            { hi: 'अभी कॉल करें',                    en: 'Call Now' },
    whatsapp:           { hi: 'व्हाट्सएप',                       en: 'WhatsApp' },

    // Footer
    rights:             { hi: '© सर्वाधिकार सुरक्षित',             en: '© All rights reserved' },

    // Mobile Bottom Bar
    home:               { hi: 'होम',      en: 'Home' },
    cart:               { hi: 'कार्ट',    en: 'Cart' },
    call:               { hi: 'कॉल',      en: 'Call' },
  },
};
