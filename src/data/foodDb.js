export const FOOD_DB = [
  { 
    name: "杂菜饭 (Zapfan)", 
    kcalPerPortion: 0,
    type: "composite",
    category: "主食",
    items: [
      { name: "饭 (Rice)", kcal: 260, group: "饭类 (Rice)" },
      { name: "包菜 (Cabbage)", kcal: 50, group: "蔬菜类 (Veg)" },
      { name: "油麦菜 (Lettuce / You Mai Vegetable)", kcal: 30, group: "蔬菜类 (Veg)" },
      { name: "豆芽 (Bean Sprouts)", kcal: 30, group: "蔬菜类 (Veg)" },
      { name: "菜心 (Choy Sum)", kcal: 30, group: "蔬菜类 (Veg)" },
      { name: "马铃薯 (Potato)", kcal: 80, group: "蔬菜类 (Veg)" },
      { name: "红萝卜 (Carrot)", kcal: 20, group: "蔬菜类 (Veg)" },
      { name: "洋葱 (Onion)", kcal: 20, group: "蔬菜类 (Veg)" },
      { name: "咖喱菜 (Curry Vegetables)", kcal: 150, group: "蔬菜类 (Veg)" },
      { name: "炸马铃薯块 (Fried Potato Wedges)", kcal: 180, group: "蔬菜类 (Veg)" },
      { name: "煎蛋 (Fried Egg)", kcal: 100, group: "蛋/豆腐 (Egg/Tofu)" },
      { name: "芙蓉蛋 (Fu Yong Egg / Omelette)", kcal: 180, group: "蛋/豆腐 (Egg/Tofu)" },
      { name: "水煮蛋 (Boiled Egg)", kcal: 70, group: "蛋/豆腐 (Egg/Tofu)" },
      { name: "半颗鸡蛋 (Half Egg)", kcal: 35, group: "蛋/豆腐 (Egg/Tofu)" },
      { name: "蛋白 (Egg White)", kcal: 17, group: "蛋/豆腐 (Egg/Tofu)" },
      { name: "豆腐 (Tofu)", kcal: 100, group: "蛋/豆腐 (Egg/Tofu)" },
      { name: "酸甜鸡 (Sweet & Sour Chicken)", kcal: 250, group: "肉类 (Meat)" },
      { name: "柠檬鸡 (Lemon Chicken)", kcal: 250, group: "肉类 (Meat)" },
      { name: "辣子鸡 (Spicy Chicken)", kcal: 300, group: "肉类 (Meat)" },
      { name: "鸡肉片 (Chicken Slices)", kcal: 170, group: "肉类 (Meat)" },
      { name: "芽菜鸡 (Bean Sprout Chicken)", kcal: 180, group: "肉类 (Meat)" },
      { name: "白斩鸡 (Steamed Chicken)", kcal: 180, group: "肉类 (Meat)" },
      { name: "奶油鸡 (Butter Chicken)", kcal: 250, group: "肉类 (Meat)" },
      { name: "妈蜜鸡 (Marmite Chicken)", kcal: 270, group: "肉类 (Meat)" },
      { name: "食堂炸鸡 (Canteen Fried Chicken)", kcal: 280, group: "肉类 (Meat)" },
      { name: "叉烧 (Char Siu)", kcal: 250, group: "肉类 (Meat)" },
      { name: "烧肉 (Roast Pork)", kcal: 300, group: "肉类 (Meat)" },
      { name: "猪肉片 (Pork Slices)", kcal: 220, group: "肉类 (Meat)" },
      { name: "猪肉碎 (Minced Pork)", kcal: 250, group: "肉类 (Meat)" },
      { name: "午餐肉 (Luncheon Meat)", kcal: 90, group: "肉类 (Meat)" },
      { name: "香肠 (Sausage)", kcal: 150, group: "肉类 (Meat)" },
      { name: "鱼丸 (Fish Ball)", kcal: 35, group: "海鲜类 (Seafood)" },
      { name: "鱼饼 (Fish Cake)", kcal: 35, group: "海鲜类 (Seafood)" },
      { name: "虾姑肉 (Mantis Shrimp Meat)", kcal: 90, group: "海鲜类 (Seafood)" },
      { name: "虾仁 (Prawn)", kcal: 60, group: "海鲜类 (Seafood)" },
      { name: "鱿鱼 (Squid)", kcal: 45, group: "海鲜类 (Seafood)" },
      { name: "金枪鱼 (Tuna)", kcal: 250, group: "海鲜类 (Seafood)" }
    ]
  },
  {
    name: "麦当劳 (MCD)",
    kcalPerPortion: 0,
    type: "composite",
    category: "主食",
    items: [
      { name: "炸鸡 (Fried Chicken)", kcal: 300 },
      { 
        name: "薯条 (French Fries)", 
        variants: [
          { name: "Small", kcal: 220 },
          { name: "Medium", kcal: 320 },
          { name: "Large", kcal: 430 }
        ],
        defaultVariant: 1
      },
      { name: "圣代冰淇淋 (Sundae cone)", kcal: 200 },
      { name: "麦旋风 (Mcflurry)", kcal: 320 },
      { 
        name: "麦乐鸡 (Nugget)", 
        variants: [
          { name: "6 pc", kcal: 260 },
          { name: "9 pc", kcal: 390 }
        ],
        defaultVariant: 0
      },
      { name: "冰柠檬茶 (Ice lemon tea)", kcal: 81 }
    ]
  },
  {
    name: "火鸡面 (Hot Chicken Flavor Ramen)",
    kcalPerPortion: 440,
    category: "主食",
    addons: [
      { name: "加紫菜 (Add Seaweed)", kcal: 20 }
    ]
  },
  {
    name: "霸王茶姬伯牙绝弦 (Chagee Boya)",
    kcalPerPortion: 150,
    category: "甜点"
  },
  {
    name: "茶仙子伯牙 (Beutea Boya)",
    kcalPerPortion: 220,
    category: "甜点"
  },
  {
    name: "经典珍珠奶茶 (Tealive Signature Milk Tea)",
    kcalPerPortion: 250,
    category: "甜点"
  },
  {
    name: "热狗面包 (Hotdog Bread)",
    kcalPerPortion: 340,
    category: "甜点"
  },
  {
    name: "芒果西米露 (Mango Sago)",
    kcalPerPortion: 300,
    category: "甜点"
  },
  {
    name: "餐蛋面 (Luncheon Meat Noodles)",
    kcalPerPortion: 0,
    type: "composite",
    preselectAll: true,
    category: "主食",
    items: [
      { name: "快熟面 (Instant Noodles)", kcal: 350 },
      { name: "午餐肉 2片 (Luncheon Meat 2 slices)", kcal: 160 },
      { name: "鸡蛋 1粒 (Egg 1 pc)", kcal: 70 },
      { name: "青菜 (Vegetables)", kcal: 15 },
      { name: "汤底 (Soup Base)", kcal: 20 },
      { name: "葱花/配料 (Garnish/Toppings)", kcal: 5 }
    ]
  },
  {
    name: "Maggi 杯面 (Maggi Cup Noodles)",
    kcalPerPortion: 0,
    type: "composite",
    category: "主食",
    items: [
      { name: "咖喱 (Kari)", kcal: 290 },
      { name: "冬炎 (Tomyam)", kcal: 280 }
    ]
  },
  {
    name: "ABC汤 (ABC Soup)",
    kcalPerPortion: 0,
    type: "composite",
    preselectAll: true,
    category: "主食",
    items: [
      { name: "鸡肉无皮 (Skinless Chicken)", kcal: 165 },
      { name: "马铃薯 (Potato)", kcal: 80 },
      { name: "萝卜 (Carrot)", kcal: 20 },
      { name: "洋葱 (Onion)", kcal: 20 },
      { name: "汤底 (Soup Base)", kcal: 10 }
    ]
  },
  {
    name: "叫菜吃饭 (Order Dishes with Rice)",
    kcalPerPortion: 0,
    type: "composite",
    category: "主食",
    items: [
      { name: "姜葱鸡 (Ginger Scallion Chicken)", kcal: 320, group: "鸡肉类" },
      { name: "白斩鸡 (White Cut Chicken)", kcal: 280, group: "鸡肉类" },
      { name: "烧鸡 (Roasted Chicken)", kcal: 350, group: "鸡肉类" },
      { name: "黑椒鸡 (Black Pepper Chicken)", kcal: 380, group: "鸡肉类" },
      { name: "宫保鸡丁 (Kung Pao Chicken)", kcal: 420, group: "鸡肉类" },
      { name: "咖喱鸡 (Curry Chicken)", kcal: 430, group: "鸡肉类" },
      
      { name: "叉烧 (Char Siew)", kcal: 400, group: "猪肉类" },
      { name: "烧肉 (Roasted Pork)", kcal: 520, group: "猪肉类" },
      { name: "咕噜肉 (Sweet and Sour Pork)", kcal: 480, group: "猪肉类" },
      { name: "红烧肉 (Braised Pork)", kcal: 600, group: "猪肉类" },
      { name: "梅菜扣肉 (Braised Pork with Preserved Mustard Greens)", kcal: 580, group: "猪肉类" },
      { name: "虾姑肉 (Mantis Shrimp)", kcal: 150, group: "猪肉类" },
      
 
      { name: "清蒸鱼 (Steamed Fish)", kcal: 300, group: "海鲜类" },
      { name: "酱油鱼 (Soy Sauce Fish)", kcal: 350, group: "海鲜类" },
      { name: "酸甜鱼 (Sweet and Sour Fish)", kcal: 450, group: "海鲜类" },
      { name: "炸鱼 (Fried Fish)", kcal: 430, group: "海鲜类" },
      { name: "咸蛋虾 (Salted Egg Prawns)", kcal: 550, group: "海鲜类" },
      { name: "奶油虾 (Butter Prawns)", kcal: 600, group: "海鲜类" },
      
      { name: "煎蛋 (Fried Egg)", kcal: 120, group: "蛋/豆腐类" },
      { name: "芙蓉蛋 (Fu Yong Egg)", kcal: 250, group: "蛋/豆腐类" },
      { name: "麻婆豆腐 (Mapo Tofu)", kcal: 300, group: "蛋/豆腐类" },
      { name: "红烧豆腐 (Braised Tofu)", kcal: 250, group: "蛋/豆腐类" },
      
      { name: "炒白菜 (Stir-fried Chinese Cabbage)", kcal: 100, group: "蔬菜类" },
      { name: "炒包菜 (Stir-fried Cabbage)", kcal: 110, group: "蔬菜类" },
      { name: "蒜蓉芥兰 (Garlic Kailan)", kcal: 120, group: "蔬菜类" },
      { name: "炒豆芽 (Stir-fried Bean Sprouts)", kcal: 90, group: "蔬菜类" },
      { name: "参峇空心菜 (Sambal Kangkong)", kcal: 150, group: "蔬菜类" },
      { name: "杂菜 (Mixed Vegetables)", kcal: 120, group: "蔬菜类" }
    ]
  },
  {
    name: "辣椒板面 (Chilli Pan Mee)",
    kcalPerPortion: 0,
    type: "composite",
    preselectAll: true,
    category: "主食",
    items: [
      { name: "板面 (Pan Mee noodles)", kcal: 400 },
      { name: "辣椒酱 (Chilli sauce)", kcal: 100 },
      { name: "煎蛋 (Fried egg)", kcal: 100 },
      { name: "蔬菜 (Vegetables)", kcal: 30 },
      { name: "鱼丸 x2 (Fish balls x2)", kcal: 70 }
    ]
  },
  {
    name: "番茄汤米粉 (Tomato Soup Rice Vermicelli)",
    kcalPerPortion: 0,
    type: "composite",
    preselectAll: true,
    category: "主食",
    items: [
      { name: "米粉 (Rice vermicelli)", kcal: 250 },
      { name: "番茄汤 (Tomato soup)", kcal: 50 },
      { name: "鸡肉片 (Chicken slices)", kcal: 170 },
      { name: "油麦菜 (Lettuce)", kcal: 30 }
    ],
    addons: [
      { name: "水饺 (Dumplings)", kcal: 40, defaultQty: 6 }
    ]
  },
  {
    name: "番茄汤伊面 (Tomato Soup Yee Mee)",
    kcalPerPortion: 0,
    type: "composite",
    preselectAll: true,
    category: "主食",
    items: [
      { name: "伊面 (Yee Mee)", kcal: 350 },
      { name: "番茄汤 (Tomato soup)", kcal: 50 },
      { name: "鸡肉片 (Chicken slices)", kcal: 170 },
      { name: "油麦菜 (Lettuce)", kcal: 30 }
    ]
  },
  {
    name: "芽菜鸡饭 (Bean Sprout Chicken Rice)",
    kcalPerPortion: 0,
    type: "composite",
    preselectAll: true,
    category: "主食",
    items: [
      { name: "白米饭 (White Rice)", kcal: 260 },
      { name: "白斩鸡 (White Cut Chicken)", kcal: 250 },
      { name: "豆芽 (Bean Sprouts)", kcal: 90 }
    ]
  },
  {
    name: "海鲜炒饭 (Seafood Fried Rice)",
    kcalPerPortion: 0,
    type: "composite",
    preselectAll: true,
    category: "主食",
    items: [
      { name: "白饭 (White Rice)", kcal: 260 },
      { name: "鸡蛋 (Egg)", kcal: 70 },
      { name: "虾仁 (Shrimp)", kcal: 60 },
      { name: "鱿鱼 (Squid)", kcal: 45 },
      { name: "青豆 (Green Beans)", kcal: 15 },
      { name: "红萝卜 (Carrot)", kcal: 8 },
      { name: "洋葱 (Onion)", kcal: 8 },
      { name: "葱花 (Scallion)", kcal: 2 },
      { name: "食用油 (Cooking Oil)", kcal: 120 },
      { name: "酱油、调味料 (Soy Sauce & Seasonings)", kcal: 12 }
    ]
  },
  {
    name: "冬炎炒饭 半份 (Tom Yum Fried Rice ½ plate)",
    kcalPerPortion: 450,
    category: "主食"
  },
  {
    name: "海底捞辣子鸡自热米饭 (HaiDiLao Spicy Chicken Self-heating Rice)",
    kcalPerPortion: 600,
    category: "主食"
  },
  {
    name: "Lexus 巧克力饼",
    kcalPerPortion: 40,
    category: "零食"
  },
  {
    name: "费列罗巧克力 (Ferrero Rocher)",
    kcalPerPortion: 73,
    category: "零食"
  },
  {
    name: "葡式蛋挞 (Portuguese Egg Tart)",
    kcalPerPortion: 220,
    category: "甜点"
  },
  {
    name: "Mister Potato薯片",
    kcalPerPortion: 75,
    category: "零食",
    portions: [0.2, 0.4, 0.5, 0.6, 0.8, 1]
  },
  {
    name: "Oat Krunch 巧克力饼干",
    kcalPerPortion: 280,
    category: "零食"
  },
  {
    name: "Subway 巧克力曲奇",
    kcalPerPortion: 215,
    category: "零食"
  },
  { name: "香蕉 (Banana)", kcalPerPortion: 105, category: "水果" },
  { name: "苹果 (Apple)", kcalPerPortion: 95, category: "水果" },
  { name: "橙 (Orange)", kcalPerPortion: 60, category: "水果" },
  { name: "芒果 (Mango)", kcalPerPortion: 135, category: "水果" },
  { name: "西瓜 (Watermelon)", kcalPerPortion: 90, category: "水果" },
  { name: "哈密瓜 (Cantaloupe)", kcalPerPortion: 50, category: "水果" },
  { name: "蜜瓜 (Honeydew Melon)", kcalPerPortion: 55, category: "水果" },
  { name: "菠萝 (Pineapple)", kcalPerPortion: 80, category: "水果" },
  { name: "木瓜 (Papaya)", kcalPerPortion: 85, category: "水果" },
  { name: "猕猴桃 (Kiwi)", kcalPerPortion: 45, category: "水果" },
  { name: "草莓 (Strawberry)", kcalPerPortion: 20, category: "水果" },
  { name: "蓝莓 (Blueberry)", kcalPerPortion: 30, category: "水果" },
  { name: "覆盆子 (Raspberry)", kcalPerPortion: 25, category: "水果" },
  { name: "葡萄 (Grapes)", kcalPerPortion: 3.5, category: "水果", portions: [5, 10, 15, 20, 25, 30] },
  { name: "樱桃 (Cherry)", kcalPerPortion: 5, category: "水果", portions: [5, 10, 15, 20, 25, 30] },
  { name: "荔枝 (Lychee)", kcalPerPortion: 7, category: "水果", portions: [5, 10, 15, 20, 25, 30] },
  { name: "龙眼 (Longan)", kcalPerPortion: 3.5, category: "水果", portions: [5, 10, 15, 20, 25, 30] },
  { name: "山竹 (Mangosteen)", kcalPerPortion: 50, category: "水果" },
  { name: "榴莲 (Durian)", kcalPerPortion: 135, category: "水果" },
  { name: "牛油果 (Avocado)", kcalPerPortion: 240, category: "水果" },
  { name: "椰子肉 (Coconut Flesh)", kcalPerPortion: 175, category: "水果" },
  { name: "椰水 (Coconut Water)", kcalPerPortion: 45, category: "水果" },
  { name: "火龙果 (Dragon Fruit)", kcalPerPortion: 180, category: "水果" },
  { name: "百香果 (Passion Fruit)", kcalPerPortion: 50, category: "水果" },
  { name: "石榴 (Pomegranate)", kcalPerPortion: 145, category: "水果" },
  { name: "桃子 (Peach)", kcalPerPortion: 60, category: "水果" },
  { name: "李子 (Plum)", kcalPerPortion: 30, category: "水果" },
  { name: "杏 (Apricot)", kcalPerPortion: 50, category: "水果" },
  { name: "柿子 (Persimmon)", kcalPerPortion: 120, category: "水果" },
  { name: "无花果 (Fig)", kcalPerPortion: 75, category: "水果" },
  { name: "枣 (Date)", kcalPerPortion: 60, category: "水果" },
  { name: "栗子 (Chestnut)", kcalPerPortion: 100, category: "水果" },
  { name: "红毛丹 (Rambutan)", kcalPerPortion: 50, category: "水果" },
  { name: "蛇皮果 (Salak / Snake Fruit)", kcalPerPortion: 70, category: "水果" },
  { name: "杨桃 (Starfruit)", kcalPerPortion: 30, category: "水果" },
  { name: "菠萝蜜 (Jackfruit)", kcalPerPortion: 95, category: "水果" },
  { name: "榴莲蜜 (Cempedak)", kcalPerPortion: 150, category: "水果" },
  { name: "酪梨 (Avocado)", kcalPerPortion: 240, category: "水果" },
  { name: "柑橘 (Mandarin Orange)", kcalPerPortion: 45, category: "水果" },
  { name: "柚子 (Pomelo)", kcalPerPortion: 70, category: "水果" },
  { name: "柠檬 (Lemon)", kcalPerPortion: 20, category: "水果" },
  { name: "青柠 (Lime)", kcalPerPortion: 10, category: "水果" },
  { name: "无籽西瓜 (Seedless Watermelon)", kcalPerPortion: 90, category: "水果" },
  { name: "黑加仑 (Blackcurrant)", kcalPerPortion: 30, category: "水果" },
  { name: "蔓越莓 (Cranberry)", kcalPerPortion: 25, category: "水果" },
  { name: "番石榴 (Guava)", kcalPerPortion: 7, category: "水果", portions: [5, 10, 15, 20, 25, 30] }
];
