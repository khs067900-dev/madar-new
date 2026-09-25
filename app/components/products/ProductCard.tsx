"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  IoCartOutline,
  IoCheckmarkCircle,
  IoShieldCheckmarkOutline,
  IoCarOutline,
  IoFlash,
  IoTimeOutline,
} from "react-icons/io5";
import type { Product } from "./types";
import { useCartStore } from "../../store/cartStore";

const fmt = (n: number) => n.toLocaleString("en-US");
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const resolveImg = (src: string) =>
  src.startsWith("http") ? src : `${API}${src.startsWith("/") ? src : "/" + src}`;

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const [added, setAdded] = useState(false);
  const [toast, setToast] = useState(false);

  const {
    name,
    brief,
    originalPrice,
    salePrice,
    discountPercent = 0,
    inStock,
    installment,
    freeDelivery,
    warrantyYears,
    deliveryTime,
    brand,
    variants,
  } = product;

  const image = product.images?.[0] || product.image;
  const resolvedImage = image ? resolveImg(image) : undefined;

  const displayOriginal = originalPrice || product.price || 0;
  const displaySale = salePrice && salePrice > 0 ? salePrice : undefined;
  const hasDiscount = displaySale != null && displaySale < displayOriginal;
  const displayPrice = hasDiscount ? displaySale! : displayOriginal;
  const savings = hasDiscount ? displayOriginal - displaySale! : 0;

  // خيارات السعة من أول variant
  const storageOptions = variants?.[0]?.storageOptions ?? [];
  const minPrice = storageOptions.length
    ? Math.min(...storageOptions.map((s) => s.salePrice || s.originalPrice))
    : displayPrice;

  // ألوان فريدة من الـ variants
  const colors = variants
    ? [...new Map(variants.map((v) => [v.colorCode, v])).values()].slice(0, 5)
    : [];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (added) return;
    addItem(product);
    setAdded(true);
    setToast(true);
    setTimeout(() => {
      setToast(false);
      setAdded(false);
      window.scrollTo(0, 0);
      router.push("/cart");
    }, 1100);
  };

  return (
    <>
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold text-white shadow-xl"
            style={{ background: "#0889A2", boxShadow: "0 8px 32px rgba(8,137,162,0.4)" }}
          >
            <IoCheckmarkCircle size={18} />
            تمت إضافة المنتج للسلة
          </motion.div>
        )}
      </AnimatePresence>

      {/* الكارد */}
      <div
        onClick={() => router.push(`/product/${product._id}`)}
        className="group relative flex flex-col bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
        style={{
          border: "1.5px solid #EAF3F8",
          boxShadow: "0 2px 12px rgba(0,48,72,0.06)",
        }}
        dir="rtl"
      >
        {/* ── صورة المنتج ── */}
        <div className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: "1/1" }}>

          {/* badge خصم */}
          {discountPercent > 0 && (
            <div
              className="absolute top-2.5 right-2.5 z-10 flex items-center gap-0.5 text-white text-[10px] font-black px-2 py-1 rounded-xl leading-none"
              style={{ background: "linear-gradient(135deg, #E53E3E, #C53030)", boxShadow: "0 2px 8px rgba(229,62,62,0.4)" }}
            >
              <IoFlash size={8} />
              {discountPercent}%
            </div>
          )}

          {/* badge نفذ */}
          {!inStock && (
            <div className="absolute top-2.5 left-2.5 z-10 text-[9px] font-bold px-2 py-1 rounded-xl leading-none" style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FCA5A5" }}>
              نفذ من المخزن
            </div>
          )}

          {/* badge تقسيط */}
          {installment?.available && (
            <div
              className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 text-white text-[9px] font-black px-2.5 py-1 rounded-xl leading-none"
              style={{ background: "linear-gradient(135deg, #0889A2, #024A65)", boxShadow: "0 2px 8px rgba(8,137,162,0.35)" }}
            >
              <IoFlash size={8} />
              {installment.downPayment ? `دفعة أولى ${fmt(installment.downPayment)} ر.س` : "تقسيط متاح"}
            </div>
          )}

          {resolvedImage ? (
            <Image
              src={resolvedImage}
              alt={name}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-5xl text-gray-200">📱</div>
          )}
        </div>

        {/* ── محتوى الكارد ── */}
        <div className="flex flex-col flex-1 px-3 pt-2.5 pb-3 gap-2">

          {/* brand */}
          {brand && (
            <span
              className="self-start text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg leading-none"
              style={{ background: "#EAF6FA", color: "#0889A2", border: "1px solid #B8E0EA" }}
            >
              {brand}
            </span>
          )}

          {/* اسم المنتج */}
          <h3 className="text-[12.5px] sm:text-[13.5px] font-bold leading-snug line-clamp-2" style={{ color: "#003048" }}>
            {name}
          </h3>

          {/* brief */}
          {brief && (
            <p className="text-[10.5px] leading-relaxed line-clamp-2" style={{ color: "#6B8E9F" }}>
              {brief}
            </p>
          )}

          {/* ألوان */}
          {colors.length > 1 && (
            <div className="flex items-center gap-1.5">
              {colors.map((v) => (
                <span
                  key={v.colorCode}
                  className="w-3.5 h-3.5 rounded-full border flex-shrink-0"
                  title={v.color}
                  style={{
                    background: v.colorCode,
                    borderColor: v.colorCode === "#FFFFFF" || v.colorCode === "#E8E8E8" ? "#D4E8F2" : v.colorCode,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                  }}
                />
              ))}
              {colors.length < (variants?.length ?? 0) && (
                <span className="text-[9px] font-semibold" style={{ color: "#90AEBA" }}>
                  +{(variants?.length ?? 0) - colors.length}
                </span>
              )}
            </div>
          )}

          {/* فاصل */}
          <div className="h-px" style={{ background: "#EAF3F8" }} />

          {/* السعر */}
          <div className="flex items-end justify-between gap-1">
            <div>
              {storageOptions.length > 0 ? (
                <>
                  <p className="text-[9px] font-semibold mb-0.5" style={{ color: "#90AEBA" }}>يبدأ من</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[19px] sm:text-[21px] font-black leading-none" style={{ color: "#003048" }}>
                      {fmt(minPrice)}
                    </span>
                    <span className="text-[10px] font-bold" style={{ color: "#0889A2" }}>ر.س</span>
                  </div>
                </>
              ) : (
                <>
                  {hasDiscount && (
                    <span className="block text-[10px] line-through leading-none mb-0.5" style={{ color: "#9CA3AF" }}>
                      {fmt(displayOriginal)} ر.س
                    </span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-[19px] sm:text-[21px] font-black leading-none" style={{ color: "#003048" }}>
                      {fmt(displayPrice)}
                    </span>
                    <span className="text-[10px] font-bold" style={{ color: "#0889A2" }}>ر.س</span>
                  </div>
                </>
              )}
            </div>

            {hasDiscount && savings > 0 && (
              <div className="text-center shrink-0">
                <span className="text-[9px] text-gray-400 block leading-none mb-0.5">وفّرت</span>
                <span
                  className="text-[10px] font-black px-1.5 py-0.5 rounded-lg leading-none"
                  style={{ background: "#FEF2F2", color: "#DC2626" }}
                >
                  {fmt(savings)} ر.س
                </span>
              </div>
            )}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-1.5">
            {warrantyYears > 0 && (
              <span className="flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-lg leading-none" style={{ background: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0" }}>
                <IoShieldCheckmarkOutline size={9} />
                ضمان {warrantyYears} {warrantyYears === 1 ? "سنة" : "سنتين"}
              </span>
            )}
            {freeDelivery && (
              <span className="flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-lg leading-none" style={{ background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE" }}>
                <IoCarOutline size={9} />
                توصيل مجاني
              </span>
            )}
            {deliveryTime && (
              <span className="flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-lg leading-none" style={{ background: "#FFFBEB", color: "#D97706", border: "1px solid #FDE68A" }}>
                <IoTimeOutline size={9} />
                {deliveryTime}
              </span>
            )}
          </div>

          {/* زر الإضافة */}
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed mt-0.5"
            style={{
              background: inStock ? "linear-gradient(135deg, #0889A2, #024A65)" : "#E5E7EB",
              color: inStock ? "#fff" : "#9CA3AF",
              boxShadow: inStock ? "0 3px 12px rgba(8,137,162,0.3)" : "none",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }} className="flex items-center gap-1.5">
                  <IoCheckmarkCircle size={14} /> تمت الإضافة
                </motion.span>
              ) : (
                <motion.span key="add" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }} className="flex items-center gap-1.5">
                  <IoCartOutline size={14} /> أضف للسلة
                </motion.span>
              )}
            </AnimatePresence>
          </button>

        </div>
      </div>
    </>
  );
}
