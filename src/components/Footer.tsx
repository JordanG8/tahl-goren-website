import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-8 lg:px-12 py-20 max-w-[1920px] mx-auto gap-12">
        <div className="space-y-4">
          <Link href="/" className="block">
            <Image 
              src="/images/logo-v2.png" 
              alt="TAL GOREN ARCHITECTS" 
              width={200} 
              height={70} 
              className="h-12 w-auto object-contain brightness-90"
            />
          </Link>
          <p className="font-label text-sm tracking-wide text-secondary max-w-sm leading-relaxed">
            ליווי מקצועי ואישי לחווית בניה רגועה. תכנון אדריכלי חכם לבית שגדל עם המשפחה. למעלה מ-25 שנות ניסיון.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="space-y-4">
            <h4 className="text-primary font-headline font-bold text-xs uppercase tracking-[0.2em]">ניווט</h4>
            <div className="flex flex-col gap-2 font-label text-sm text-secondary">
              <Link href="/projects" className="hover:text-primary transition-colors">פרויקטים</Link>

              <Link href="/about" className="hover:text-primary transition-colors">אודות</Link>
              <Link href="/articles" className="hover:text-primary transition-colors">מאמרים</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-primary font-headline font-bold text-xs uppercase tracking-[0.2em]">צור קשר</h4>
            <div className="flex flex-col gap-2 font-label text-sm text-secondary">
              <a href="tel:0528345799" className="hover:text-primary transition-colors">052-8345799</a>
              <a href="mailto:tahl.goren.arch@gmail.com" className="hover:text-primary transition-colors">tahl.goren.arch@gmail.com</a>
              <span>רחוב האלה 22, גבעת עדה</span>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-primary font-headline font-bold text-xs uppercase tracking-[0.2em]">עקבו אחריי</h4>
            <div className="flex gap-6 font-label text-sm">
              <a href="https://www.instagram.com/tahlgoren/" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors">Instagram</a>
              <a href="https://www.facebook.com/tahlgoren" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors">Facebook</a>
              <a href="https://www.youtube.com/channel/UCme0hzUzQzMlsqO394pF3mg/" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors">YouTube</a>
            </div>
          </div>
        </div>
      </div>
      <div className="px-12 py-8 border-t border-outline/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">&copy; 2025 TAL GOREN ARCHITECTS. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-6 font-label text-[10px] tracking-[0.2em] uppercase">
          <Link href="/privacy" className="text-secondary hover:text-primary transition-colors">מדיניות פרטיות</Link>
          <Link href="/accessibility" className="text-secondary hover:text-primary transition-colors">הצהרת נגישות</Link>
          <Link href="/terms" className="text-secondary hover:text-primary transition-colors">תנאי שימוש</Link>
        </div>
      </div>
    </footer>
  );
}
