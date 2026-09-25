"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, ArrowRight, Check, ReceiptText } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import CartItem from "./components/CartItem";
import CustomerForm from "./components/CustomerForm";
import "./cart.css";

const fmt = (n: number) => n.toLocaleString("en-US");
export default function CartPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { items, removeItem, updateQty, totalPrice, totalItems, setCustomer, customer } = useCartStore();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  if (!mounted) return <main className="basket-page" aria-busy="true"/>;
  const total = totalPrice();
  const count = totalItems();
  const changeStep = (next: number) => { setStep(next); window.scrollTo({top:0,behavior:"smooth"}); };
  return <main className="basket-page" dir="rtl"><div className="basket-shell">
    <Link href="/store" className="basket-back"><ArrowRight size={15}/>متابعة التسوق</Link>
    <div className="basket-heading"><div><span className="basket-eyebrow">اختياراتك من مدار</span><h1>{step === 1 ? "سلة مشترياتك" : "خطة تناسبك"}</h1><p>{step === 1 ? "راجع أجهزتك، والخطوة الجاية على راحتك." : "أكمل بياناتك واختر الدفعة الأولى ومدة التقسيط."}</p></div><span className="basket-heading-icon"><ShoppingBag size={25}/></span></div>
    {!!items.length && <nav className="basket-steps" aria-label="خطوات الطلب"><button aria-current={step === 1 ? "step" : undefined} onClick={() => changeStep(1)}><b>{step === 2 ? <Check size={15}/> : "01"}</b><span>مراجعة السلة</span></button><i/><button aria-current={step === 2 ? "step" : undefined} onClick={() => changeStep(2)}><b>02</b><span>البيانات والأقساط</span></button></nav>}
    {!items.length ? <section className="basket-empty"><ShoppingBag size={48}/><h2>سلتك في انتظار اختياراتك</h2><p>تصفّح الأجهزة وأضف الجهاز المناسب لك.</p><Link className="basket-primary" href="/store">تصفّح المنتجات <ArrowLeft size={16}/></Link></section> : <div className="basket-layout"><div className="basket-main">
      {step === 1 ? <section className="basket-products"><div className="basket-section-title"><h2>الأجهزة المختارة</h2><span>{count} قطعة</span></div><div className="basket-items">{items.map(({product,qty}) => <CartItem key={product._id} product={product} qty={qty} onUpdateQty={updateQty} onRemove={removeItem}/>)}</div><div className="basket-next-note"><ReceiptText size={20}/><div><strong>نفس سعر الكاش، على دفعات</strong><p>اختَر خطة الأقساط المناسبة في الخطوة التالية.</p></div></div></section> : <><button className="basket-back" onClick={() => changeStep(1)}><ArrowRight size={15}/>تعديل المنتجات</button><CustomerForm total={total} itemCount={count} initialData={customer} installmentMonths={24} onSubmit={(info) => {setCustomer(info);router.push("/checkout");}}/></>}
    </div><aside className="basket-summary"><div className="basket-section-title"><h2>ملخص الطلب</h2><ReceiptText size={19}/></div><div className="basket-summary-list">{items.map(({product,qty}) => <div key={product._id}><span>{product.name}<small>الكمية: {qty}</small></span><b>{fmt((product.salePrice ?? product.originalPrice ?? product.price) * qty)} <small>ر.س</small></b></div>)}</div><div className="basket-total"><span>إجمالي الأجهزة</span><strong>{fmt(total)} <small>ر.س</small></strong></div><p className="basket-summary-caption">سعر الأجهزة قبل اختيار خطة السداد</p>{step === 1 && <button className="basket-primary" onClick={() => changeStep(2)}>اختيار خطة الأقساط <ArrowLeft size={17}/></button>}<div className="basket-summary-tip"><Check size={15}/><span>تقسيط بسعر الكاش بدون فوائد</span></div></aside></div>}
  </div></main>;
}
