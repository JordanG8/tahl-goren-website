
import Link from 'next/link';
import { faqSeries } from '@/data/faqData';
import { faqArticles } from '@/data/faqArticles';
import Breadcrumb from '@/components/Breadcrumb';
import FAQArticleCard from '@/components/FAQ/FAQArticleCard';

export default async function Faq() {
  return (
    <main className="min-h-screen bg-white pb-20 pt-16" dir="rtl">
      {/* Hero Section */}
      <section className="py-20 px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[
            { label: 'ראשי', to: '/' },
            { label: 'שאלות ומדריכים' },
          ]} />
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mt-8 mb-6 tracking-tight">
            מרכז המידע והשאלות
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            כל מה שצריך לדעת על תכנון ובניית בית פרטי בישראל. מדריכים מפורטים, תשובות לשאלות נפוצות וכלים שיעזרו לכם לצאת לדרך בביטחון.
          </p>
        </div>
      </section>

      {/* Series Grid */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          {faqSeries.map((series) => (
            <div key={series.id} className="mb-24 last:mb-0">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl text-right">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                    {series.title}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {series.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm">
                    {series.articles.length} מאמרים בסדרה
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {series.articles.map((slug) => {
                  const article = faqArticles.find(a => a.slug === slug);
                  if (!article) return null;
                  return (
                    <FAQArticleCard 
                      key={slug} 
                      article={article} 
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center bg-gray-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-8 relative z-10">
            יש לכם שאלה שעדיין לא קיבלה מענה?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto relative z-10">
            אני כאן כדי לעזור לכם לעשות סדר בכל הבלאגן. פגישת ייעוץ ראשונה ללא עלות וללא התחייבות.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all transform hover:scale-105 relative z-10"
          >
            צרו קשר עכשיו
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
