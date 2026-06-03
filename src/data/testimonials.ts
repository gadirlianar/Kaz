/* ============================================================
   AYSHAN — Testimonials & Reviews Dataset
   Customer reviews for both Sky Eagle and Kais Exchange branches.
   All content in Kazakh language.
   ============================================================ */

import type { Testimonial } from "@/lib/types";

export const testimonials: Testimonial[] = [
  {
    id: "review-001",
    name: "Айгерім Нұрланқызы",
    avatarUrl: "/images/avatars/avatar-1.jpg",
    branch: "education",
    rating: 5,
    text: "Kais Exchange арқылы Малайзияда оқуға түстім. Құжаттарды дайындаудан бастап виза алуға дейін барлық кезеңде көмек көрсетті. Қазір UCSI University-де бағдарламалық жасақтама мамандығын оқып жатырмын. Өте ризамын!",
    date: "2025-12-15",
    destination: "UCSI University, Малайзия",
  },
  {
    id: "review-002",
    name: "Бекзат Серікұлы",
    avatarUrl: "/images/avatars/avatar-2.jpg",
    branch: "tourism",
    rating: 5,
    text: "Sky Eagle арқылы отбасымен бірге Түркияға демалысқа бардық. Барлығы жоғары деңгейде ұйымдастырылды — қонақ үй, трансфер, экскурсиялар. Ең жақсы демалыстарымыздың бірі болды!",
    date: "2025-11-20",
    destination: "Анталия, Түркия",
  },
  {
    id: "review-003",
    name: "Дана Ерланқызы",
    avatarUrl: "/images/avatars/avatar-3.jpg",
    branch: "education",
    rating: 5,
    text: "Италиядағы Politecnico di Milano-ға түсу арманым болатын. Kais Exchange командасы менің мотивациялық хатымды, портфолиомды дайындауға көмектесті. Қазір Миланда сәулет мамандығын оқып жүрмін!",
    date: "2026-01-10",
    destination: "Politecnico di Milano, Италия",
  },
  {
    id: "review-004",
    name: "Арман Қайратұлы",
    avatarUrl: "/images/avatars/avatar-4.jpg",
    branch: "tourism",
    rating: 4,
    text: "Дубайға жеке тур ұйымдастырды. Шөл сафариі, Бурдж Халифа — барлығы тамаша болды. Баға да қолжетімді. Келесі жолы да Sky Eagle-ге хабарласамын.",
    date: "2025-10-05",
    destination: "Дубай, БАӘ",
  },
  {
    id: "review-005",
    name: "Мадина Асқарқызы",
    avatarUrl: "/images/avatars/avatar-5.jpg",
    branch: "education",
    rating: 5,
    text: "Шетелде оқу жоспарым бар, бірақ неден бастау керектігін білмедім. Kais Exchange маған университеттерді таңдауға, стипендия мүмкіндіктерін іздеуге көмектесті. Өте кәсіби команда!",
    date: "2026-02-28",
    destination: "Taylor's University, Малайзия",
  },
  {
    id: "review-006",
    name: "Нұрсұлтан Бақытұлы",
    avatarUrl: "/images/avatars/avatar-6.jpg",
    branch: "tourism",
    rating: 5,
    text: "Көлсай көлдеріне ұйымдастырылған тур тамаша болды. Гид білімді, табиғат керемет. Достарыма міндетті түрде ұсынамын. Рахмет, Sky Eagle!",
    date: "2026-03-15",
    destination: "Көлсай көлдері, Қазақстан",
  },
];
