import CategorySlider from "./CategorySlider";

const BACKEND = process.env.BACKEND_URL || "http://localhost:5000";

const categoryPageMap: Record<string, string> = {
  "الهواتف الذكية": "/smartphones",
  "ابل ايفون 18 برو ماكس": "/smartphones/iphone-18-pro-max",
  "ابل ايفون 18 برو ": "/smartphones/iphone-18-pro",
  "ابل ايفون 18 برو": "/smartphones/iphone-18-pro",
  "ابل ايفون 18 دو": "/smartphones/iphone-18-standard",
  "ابل ايفون 18": "/smartphones/iphone-18",
  "ابل ايفون 17 برو ماكس": "/smartphones/iphone-17-pro-max",
  "أبل آيفون 17 برو ماكس": "/smartphones/iphone-17-pro-max",
  "ابل ايفون 17 برو": "/smartphones/iphone-17-pro",
  "أبل آيفون 17 برو": "/smartphones/iphone-17-pro",
  "ابل ايفون 17 اير": "/smartphones/iphone-17-air",
  "أبل آيفون 17 اير": "/smartphones/iphone-17-air",
  "ابل ايفون 17": "/smartphones/iphone-17",
  "أبل آيفون 17": "/smartphones/iphone-17",
  "ابل ايفون 16 برو ماكس": "/smartphones/iphone-16-pro-max",
  "ابل ايفون 16 برو": "/smartphones/iphone-16-pro",
  "ابل ايفون 16 بلس": "/smartphones/iphone-16-plus",
  "ابل ايفون 16": "/smartphones/iphone-16",
  "ابل ايفون 15 برو ماكس": "/smartphones/iphone-15-pro-max",
  "ابل ايفون 15 برو": "/smartphones/iphone-15-pro",
  "ابل ايفون 15 بلس": "/smartphones/iphone-15-plus",
  "ابل ايفون 15": "/smartphones/iphone-15",
  "ابل ايفون 14 برو ماكس": "/smartphones/iphone-14-pro-max",
  "ابل ايفون 14 برو": "/smartphones/iphone-14-pro",
  "سامسونج جالاكسي S26": "/smartphones/samsung-s26-ultra",
  "سامسونج جالاكسي S25": "/smartphones/samsung-s25-ultra",
  "سامسونج جالاكسي S24": "/smartphones/samsung-s24-ultra",
  "سامسونج جالاكسي S23": "/smartphones/samsung-s23-ultra",
  "سامسونج جلاكسي S23 الترا": "/smartphones/samsung-s23-ultra",
  "سامسونج جالاكسي S22": "/smartphones/samsung-s22-ultra",
  "ساعات ذكية": "/smart-watches/smart-watches",
  "الساعات الذكية": "/smart-watches/smart-watches",
  "ساعات ابل": "/apple-watches/se",
  "ساعات أبل": "/apple-watches/se",
  "سماعات ابل": "/audio/airpods-pro",
  "سماعات أبل": "/audio/airpods-pro",
  "أجهزة صوت و سماعات": "/audio/airpods-pro",
  "أجهزة صوت وسماعات": "/audio/airpods-pro",
  "أجهزة بلاي ستيشن": "/playstation/ps5",
  "بلاي ستيشن": "/playstation/ps5",
  "لابتوبات وشاشات": "/laptops/macbook-pro",
  "لابتوبات": "/laptops/macbook-pro",
  "الاجهزة اللوحية ايبادات": "/tablets/ipad-pro",
  "الأجهزة اللوحية": "/tablets/ipad-pro",
  "بطاريات متنقلة وكيابل": "/accessories/anker-batteries",
  "بطاريات متنقله": "/accessories/anker-batteries",
  "ملحقات": "/accessories/anker-batteries",
  "ألعاب الفيديو": "/games/ps5-games",
  "العاب": "/games/ps5-games",
};

type Category = { name: string; count: number; image: string };
type Setting = { category: string; subCategory: string; showInHome: boolean; order: number };

function resolveHref(name: string): string {
  if (categoryPageMap[name]) return categoryPageMap[name];
  const lower = name.toLowerCase();
  const match = Object.entries(categoryPageMap)
    .filter(([k]) => {
      const kl = k.toLowerCase();
      return lower.includes(kl) || kl.includes(lower);
    })
    .sort((a, b) => b[0].length - a[0].length)[0];
  return match?.[1] ?? "/store";
}

async function getCategories(): Promise<(Category & { href: string })[]> {
  try {
    const [catRes, settingsRes] = await Promise.all([
      fetch(`${BACKEND}/api/admin/sub-categories/public`, { next: { revalidate: 3600 } }),
      fetch(`${BACKEND}/api/admin/sub-categories/home-settings`, { next: { revalidate: 3600 } }),
    ]);
    const allCats: Category[] = catRes.ok ? await catRes.json() : [];
    const settings: Setting[] = settingsRes.ok ? await settingsRes.json() : [];

    const visibleMap = new Map(
      settings.filter((s) => s.showInHome).map((s) => [s.category, s.order])
    );

    const sorted = (visibleMap.size ? allCats.filter((c) => visibleMap.has(c.name)) : allCats)
      .sort((a, b) => (visibleMap.get(a.name) ?? 0) - (visibleMap.get(b.name) ?? 0));

    return sorted.map((c) => ({ ...c, href: resolveHref(c.name) }));
  } catch {
    return [];
  }
}

export default async function ShopByCategory() {
  const categories = await getCategories();
  if (!categories.length) return null;

  return (
    <section
      className="w-full bg-white px-4 sm:px-8 lg:px-12 pt-7 pb-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* عنوان */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-base sm:text-lg font-black shrink-0" style={{ color: "#003048" }}>
            تسوق حسب القسم
          </h2>
          <div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(to left, transparent, #D4E8F2 40%, transparent)" }}
          />
          <a
            href="/store"
            className="text-xs font-bold shrink-0 transition-colors hover:text-[#003048]"
            style={{ color: "#0889A2" }}
          >
            عرض الكل ←
          </a>
        </div>

        {/* الدواير */}
        <CategorySlider categories={categories} />
      </div>
    </section>
  );
}
