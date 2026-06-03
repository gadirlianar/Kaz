/* ============================================================
   AYSHAN — Tour Dataset
   Simulated data for Sky Eagle tourism branch.
   Includes domestic + international tours, hotels, flights, transfers.
   All content in Kazakh language.
   ============================================================ */

import type { Tour } from "@/lib/types";

export const tours: Tour[] = [
  // ─── FEATURED TOURS ──────────────────────────────────────
  {
    id: "tour-001",
    title: "Алматы — Көлсай көлдері тур",
    destination: "Көлсай көлдері",
    country: "Қазақстан",
    type: "ішкі",
    category: "тур",
    price: 45000,
    currency: "KZT",
    duration: "3 күн / 2 түн",
    description:
      "Көлсай көлдерінің керемет табиғатын тамашалаңыз. Бағдарлама: шатыр лагері, жаяу жорық, таулардағы серуен. Тамақ пен жабдықтар кіреді.",
    imageUrl: "https://images.unsplash.com/photo-1542384701-c0e46e0eda04?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    featured: true,
  },
  {
    id: "tour-002",
    title: "Түркия — Анталия жағажай демалысы",
    destination: "Анталия",
    country: "Түркия",
    type: "халықаралық",
    category: "тур",
    price: 320000,
    currency: "KZT",
    duration: "7 күн / 6 түн",
    description:
      "Барлығы қамтылған (All Inclusive) 5 жұлдызды қонақ үйде демалыс. Әуе билеті, трансфер және медициналық сақтандыру кіреді.",
    imageUrl: "https://images.unsplash.com/photo-1545562083-a600704fa486?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    featured: true,
  },
  {
    id: "tour-003",
    title: "Дубай — Қала тур + Сафари",
    destination: "Дубай",
    country: "БАӘ",
    type: "халықаралық",
    category: "тур",
    price: 450000,
    currency: "KZT",
    duration: "5 күн / 4 түн",
    description:
      "Бурдж Халифа, Dubai Mall, шөл сафариі. 4-5 жұлдызды қонақ үй, гид қызметі, трансфер кіреді.",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    featured: true,
  },
  {
    id: "tour-004",
    title: "Шарын шатқалы — Бір күндік тур",
    destination: "Шарын шатқалы",
    country: "Қазақстан",
    type: "ішкі",
    category: "тур",
    price: 15000,
    currency: "KZT",
    duration: "1 күн",
    description:
      "Алматыдан бір күндік тур. «Ведьмалар сақалы» мен «Жосылған қалалар» аңғарына серуен. Түскі ас және трансфер кіреді.",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    featured: true,
  },

  // ─── FLIGHTS ─────────────────────────────────────────────
  {
    id: "flight-001",
    title: "Алматы → Стамбул",
    destination: "Стамбул",
    country: "Түркия",
    type: "халықаралық",
    category: "билет",
    price: 95000,
    currency: "KZT",
    duration: "5 сағат 30 мин",
    description:
      "Turkish Airlines тікелей рейсі. Эконом-класс, багаж 23 кг кіреді.",
    imageUrl: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    featured: false,
  },
  {
    id: "flight-002",
    title: "Астана → Куала-Лумпур",
    destination: "Куала-Лумпур",
    country: "Малайзия",
    type: "халықаралық",
    category: "билет",
    price: 180000,
    currency: "KZT",
    duration: "9 сағат 15 мин",
    description:
      "Air Astana рейсі (байланыс рейс). Студенттер үшін арнайы баға. Багаж 30 кг кіреді.",
    imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop",
    rating: 4.3,
    featured: false,
  },
  {
    id: "flight-003",
    title: "Алматы → Милан",
    destination: "Милан",
    country: "Италия",
    type: "халықаралық",
    category: "билет",
    price: 210000,
    currency: "KZT",
    duration: "7 сағат 45 мин",
    description:
      "Wizz Air немесе Turkish Airlines рейстері. Студенттік бағдарламаға қатысушыларға жеңілдік.",
    imageUrl: "https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?q=80&w=800&auto=format&fit=crop",
    rating: 4.4,
    featured: false,
  },

  // ─── HOTELS ──────────────────────────────────────────────
  {
    id: "hotel-001",
    title: "Rixos Almaty — 5 жұлдыз",
    destination: "Алматы",
    country: "Қазақстан",
    type: "ішкі",
    category: "қонақ үй",
    price: 35000,
    currency: "KZT",
    duration: "1 түн",
    description:
      "Алматының жүрегіндегі люкс қонақ үй. SPA, бассейн, ресторан, тегін Wi-Fi. Таңғы ас кіреді.",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    featured: false,
  },
  {
    id: "hotel-002",
    title: "Hilton Istanbul Bomonti — 5 жұлдыз",
    destination: "Стамбул",
    country: "Түркия",
    type: "халықаралық",
    category: "қонақ үй",
    price: 55000,
    currency: "KZT",
    duration: "1 түн",
    description:
      "Стамбулдағы ең жақсы қонақ үйлердің бірі. Босфор көрінісі, SPA, фитнес-зал. Таңғы ас кіреді.",
    imageUrl: "https://images.unsplash.com/photo-1558104240-729556013a2b?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    featured: false,
  },

  // ─── TRANSFERS ───────────────────────────────────────────
  {
    id: "transfer-001",
    title: "Алматы әуежайы — Қала орталығы",
    destination: "Алматы",
    country: "Қазақстан",
    type: "ішкі",
    category: "трансфер",
    price: 5000,
    currency: "KZT",
    duration: "30-45 мин",
    description:
      "Жайлы седан немесе минивэн. 24/7 қызмет. Ұшу кешіксе — ақысыз күту.",
    imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    featured: false,
  },
  {
    id: "transfer-002",
    title: "Стамбул әуежайы — Қонақ үй",
    destination: "Стамбул",
    country: "Түркия",
    type: "халықаралық",
    category: "трансфер",
    price: 12000,
    currency: "KZT",
    duration: "40-60 мин",
    description:
      "VIP трансфер қызметі. Жеке көлік, Wi-Fi, су және снектер. Келу залында жеке қарсы алу.",
    imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    featured: false,
  },
];
