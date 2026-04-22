
const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\yospe\\OneDrive\\Documents\\GitHub\\tahl-goren-website\\docs\\FAQ articles.md';
const content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');

const shortFaqs = [];
const extendedArticles = [];

// Parse short FAQs
for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.match(/^\d+\)\s*##/)) {
        const num = parseInt(line.match(/^(\d+)\)/)[1]);
        const question = line.replace(/^\d+\)\s*##\s*/, '').trim();
        let answer = '';
        let j = i + 1;
        while (j < lines.length && !lines[j].trim().startsWith('***[') && !lines[j].trim().match(/^\d+\)\s*##/)) {
            if (lines[j].trim()) answer += lines[j].trim() + '\n';
            j++;
        }
        shortFaqs.push({ num, question, answer: answer.trim() });
    }
    if (line.startsWith('# מאמרים מורחבים')) break;
}

// Parse extended articles
let currentArticle = null;
let inExtended = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('# מאמרים מורחבים')) {
        inExtended = true;
        continue;
    }
    if (!inExtended) continue;

    if (line.match(/^\d+\)\s*##/)) {
        if (currentArticle) extendedArticles.push(currentArticle);
        const num = parseInt(line.match(/^(\d+)\)/)[1]);
        const title = line.replace(/^\d+\)\s*##\s*/, '').trim();
        currentArticle = { num, title, intro: '', sections: [] };
        
        let j = i + 1;
        while (j < lines.length && !lines[j].trim()) j++;
        if (j < lines.length && lines[j].trim().startsWith('**')) {
            currentArticle.introTitle = lines[j].trim().replace(/\*\*/g, '');
            j++;
        }
        
        while (j < lines.length && !lines[j].trim().startsWith('---') && !lines[j].trim().startsWith('**')) {
            if (lines[j].trim()) currentArticle.intro += lines[j].trim() + '\n';
            j++;
        }
        i = j - 1;
    } else if (line.startsWith('**') && currentArticle && !line.startsWith('---')) {
        const sectionTitle = line.replace(/\*\*/g, '').replace(/:/g, '').trim();
        const section = { title: sectionTitle, content: [], list: [] };
        let j = i + 1;
        while (j < lines.length && !lines[j].trim().startsWith('**') && !lines[j].trim().startsWith('---') && !lines[j].trim().match(/^\d+\)\s*##/)) {
            const l = lines[j].trim();
            if (l.startsWith('*') || l.startsWith('-')) {
                section.list.push(l.replace(/^[\*\-]\s*/, '').replace(/^\s*•\s*/, '').trim());
            } else if (l) {
                section.content.push(l);
            }
            j++;
        }
        currentArticle.sections.push(section);
        i = j - 1;
    }
}
if (currentArticle) extendedArticles.push(currentArticle);

const slugMap = {
    1: "why-architect",
    2: "choose-architect",
    3: "how-not-to-choose-architect",
    4: "building-stages",
    5: "architect-role-stages",
    6: "when-to-involve-architect",
    7: "building-timeline",
    8: "building-cost-total",
    9: "service-area",
    10: "first-meeting-prep",
    11: "planning-cost",
    12: "interior-design-value",
    13: "first-step",
    14: "professionals-credentials",
    15: "advisors-and-roles",
    16: "real-building-cost",
    17: "budget-control",
    18: "hidden-costs",
    19: "taxes-and-fees",
    20: "building-permit",
    21: "bureaucracy-difficulty",
    22: "authorities-and-bodies",
    23: "construction-methods-overview",
    24: "what-is-tba",
    25: "housing-unit-addition",
    26: "design-style-match"
};

const seriesMap = {
    "getting-started": ["why-architect", "choose-architect", "how-not-to-choose-architect", "when-to-involve-architect", "first-meeting-prep", "first-step", "professionals-credentials", "service-area"],
    "process": ["building-stages", "architect-role-stages", "building-timeline", "building-permit", "bureaucracy-difficulty", "authorities-and-bodies", "advisors-and-roles"],
    "budget": ["building-cost-total", "planning-cost", "real-building-cost", "budget-control", "hidden-costs", "taxes-and-fees"],
    "design-and-methods": ["interior-design-value", "construction-methods-overview", "design-style-match", "what-is-tba", "housing-unit-addition"]
};

const imageMap = {
    "why-architect": "/images/projects/barak-exterior.jpg",
    "choose-architect": "/images/projects/persman-exterior.jpg",
    "building-stages": "/images/projects/katznelson-aerial.jpg",
    "interior-design-value": "/images/projects/barak-kitchen.jpg",
    "first-meeting-prep": "/images/projects/shacham-entrance.jpg",
    "building-cost-total": "/images/projects/barak-living.jpg"
};

const finalArticles = shortFaqs.map(sf => {
    const ext = extendedArticles.find(e => e.num === sf.num);
    const slug = slugMap[sf.num] || `faq-${sf.num}`;
    
    let seriesId = "getting-started";
    let orderInSeries = 0;
    
    for (const [sId, slugs] of Object.entries(seriesMap)) {
        if (slugs.includes(slug)) {
            seriesId = sId;
            orderInSeries = slugs.indexOf(slug) + 1;
            break;
        }
    }

    return {
        id: sf.num.toString(),
        slug: slug,
        title: ext ? ext.title : sf.question,
        question: sf.question,
        shortAnswer: sf.answer,
        content: ext ? {
            intro: ext.intro.trim(),
            sections: ext.sections.map(s => ({
                title: s.title,
                content: s.content,
                list: s.list.length > 0 ? s.list : undefined
            }))
        } : {
            intro: sf.answer,
            sections: []
        },
        seriesId,
        orderInSeries,
        image: imageMap[slug] || undefined
    };
});

const output = `
import { FAQArticle } from './faqData';

export const faqArticles: FAQArticle[] = ${JSON.stringify(finalArticles, null, 2)};
`;

fs.writeFileSync('c:\\Users\\yospe\\OneDrive\\Documents\\GitHub\\tahl-goren-website\\src\\data\\faqArticles.ts', output);
console.log('Successfully generated faqArticles.ts with images and series info');
