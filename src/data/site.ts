// All visible copy lives here, so the owner can edit words without touching markup.
// Source: the current geteffectivemarketing.com, rewritten for clarity. Facts, prices and claims
// are the owner's own. Assumptions (also listed in DESIGN.md):
// - "41+ clients", "7+ years" and "72% of searches go to the top 3" are kept from the current site.
// - The before/after map has no stated time span, so it is never captioned "in 90 days".
// - The form posts to NEXT_PUBLIC_FORM_ENDPOINT (Formspree or any webhook); without it, mailto.

export const site = {
  name: 'Get Effective Marketing',
  legalName: 'Get Effective Marketing LLC',
  url: 'https://geteffectivemarketing.com',
  phone: '+36 30 547 6488',
  phoneHref: 'tel:+36305476488',
  email: 'info@geteffectivemarketing.com',
  address: { street: 'Lange Noordstraat 19-21', city: '2000 Antwerpen', region: 'Flanders', country: 'Belgium' },
  hours: 'Every day, 09:00 to 17:00',
  claims: { clients: '41+', years: '7+' },
  cta: 'Get a free ranking check',
  description:
    'Antwerp marketing agency that gets local businesses into Google’s top 3. Local SEO, Google Business Profile, Google Ads and WordPress websites. Free ranking check.',
};

export const nav = [
  { href: '/', label: 'Local SEO' },
  { href: '/google-business-profile-optimization/', label: 'Business Profile' },
  { href: '/google-ads-management/', label: 'Google Ads' },
  { href: '/wordpress-web-design/', label: 'Websites' },
  { href: '/contact/', label: 'Contact' },
];

export type Item = { title: string; text: string; link?: { href: string; label: string } };
export type Faq = { q: string; a: string; link?: { href: string; label: string } };

export const plans = [
  { name: 'Starter', price: 750, target: 'Page 1', pin: 10, ad: false, promise: 'First page on Google within 90 days.' },
  { name: 'Advanced', price: 1250, target: 'Top 3', pin: 3, ad: false, promise: 'Top 3 on Google within 90 days, guaranteed.' },
  { name: 'Diamond', price: 1990, target: 'Top 3 + ad', pin: 1, ad: true, promise: 'Guaranteed top 3 within 90 days, with a Google Ads campaign on top while you climb.' },
];

// One row per feature, one value per plan (same order as `plans`). true / false = included or not.
// As listed on the current site: Diamond does not list the main service term. Owner to confirm.
export const planRows: { label: string; values: (string | boolean)[] }[] = [
  { label: 'Visible on search results', values: ['30%', '75%+', '75%+'] },
  { label: 'Competitor analysis', values: ['Main competitor', 'Full', 'Full'] },
  { label: 'Ranking for your main search term', values: [true, true, true] },
  { label: 'Ranking for your main service term', values: [false, true, false] },
  { label: 'Google Ads campaign, fully managed', values: [false, false, true] },
  { label: 'Website optimization', values: ['Standard', 'Advanced', 'Full'] },
  { label: 'High-quality backlinks', values: [true, true, true] },
  { label: 'Progress updates', values: ['Every two weeks', 'Every two weeks', 'Every week'] },
];

export const plansNote = 'Every plan starts with three months. After that it runs month to month.';

export const home = {
  title: 'Marketing Agency Antwerp | Local SEO & Google Ads Agency',
  description:
    'Antwerp marketing agency: get your local business into Google’s top 3. Local SEO, WordPress, Google Business Profile, and Google & Meta Ads management. Free analysis.',
  h1: 'Local SEO that gets you into Google’s top 3 in 90 days',
  lead: '72% of local searches go to the three businesses under the map. Below them, you are close to invisible.',
  map: {
    label: 'One client, one keyword',
    caption:
      'Each pin is one spot on a 13 by 13 grid over the city. The number is where the business ranked when someone searched from there. 20 means 20th or lower.',
    before: 'Ranked 11th next to their own door. 20th or lower everywhere else.',
    after: 'In the top 3 across most of the city. Even downtown, where competition is thickest, they made the top 20.',
  },
  what: {
    h2: 'What local SEO actually is',
    statement:
      'When someone nearby searches for what you sell, Google shows a map with three businesses under it, then the regular results. Those three get most of the calls. Local SEO is the work that gets you into that box and keeps you there, without paying for every click.',
    factorsH: 'How Google picks those three',
    factors: [
      { title: 'Relevance', text: 'How well your profile and website match what was searched.' },
      { title: 'Distance', text: 'How close you are to the person searching. Nobody can change this one.' },
      { title: 'Prominence', text: 'How known and trusted you look online: reviews, links, listings.' },
    ],
    after: 'You can’t move your address. Relevance and prominence are exactly what we work on.',
    source: { href: 'https://support.google.com/business/answer/7091', label: 'Google explains it in its own guide' },
  },
  included: {
    h2: 'What our local SEO service includes',
    items: [
      { title: 'Ranking benchmark and competitor check', text: 'We run a ranking map for your main keyword, so you see where you show up across your area today, and we compare you with the businesses in the top 10.' },
      { title: 'Google Business Profile optimization', text: 'The right categories, a full services list, a complete profile, weekly posts and photos. Your profile is the biggest lever on the map, so it gets most of our attention.', link: { href: '/google-business-profile-optimization/', label: 'More on Business Profile optimization' } },
      { title: 'On-page SEO for your website', text: 'Page titles and headings that name your service and city, contact details that match your profile exactly, local business schema and a map on your site.' },
      { title: 'Service and area pages', text: 'A page for each main service and each area you serve, linked together, so Google understands what you do and where you do it.' },
      { title: 'AI search visibility (GEO)', text: 'We set up your llms.txt and robots.txt so AI assistants know what your business does and which pages matter. Then we look for the hidden setting that can keep ChatGPT, Claude and other assistants off your site entirely. We have found it before, and we know how to remove it.' },
      { title: 'Citations and reviews', text: 'Your business listed on the directories Google trusts, like Bing Maps and Apple Business Connect, with matching details everywhere, plus a simple routine that keeps new reviews coming in.' },
    ] as Item[],
  },
  compare: {
    h2: 'Local SEO or Google Ads?',
    head: ['', 'Local SEO', 'Google Ads'],
    rows: [
      ['Time to results', 'Usually within 90 days', 'Days'],
      ['Cost per click', 'Free', 'You pay for every click'],
      ['When you stop paying', 'Rankings keep working', 'Leads stop'],
    ],
    figure: 'Where each service puts you on a local results page.',
  },
  rules: {
    h2: 'We play by Google’s rules',
    lines: ['No fake addresses.', 'No keyword-stuffed business names.', 'No spam links.'],
    text: 'Those tricks can get a profile suspended. We only use methods that follow Google’s guidelines, because your listing is too valuable to risk.',
  },
  who: {
    h2: 'Who it’s for',
    items: [
      'Local businesses that serve customers in a specific city or area',
      'Businesses that show up on page 2 of the map, or not at all',
      'Owners who want more calls without paying for every click',
    ],
  },
  process: {
    h2: 'How it works',
    steps: [
      { title: 'Free analysis', text: 'Pick a package and fill in the form. We run a ranking check for your main keyword and show you what is holding you back.' },
      { title: 'Onboarding', text: 'We send clear instructions for giving us secure access to your profile and website.' },
      { title: 'Execution', text: 'We do the work and walk you through each step, so you always know what changed.' },
      { title: 'Track and repeat', text: 'We re-check your rankings, see what actually moved them and do more of it.' },
    ] as Item[],
  },
  faq: [
    { q: 'What is local SEO?', a: 'It is the work of getting a business to show up when people nearby search for what it offers, both in the top 3 on Google Maps and in the regular results below.' },
    { q: 'How long does local SEO take?', a: 'Most businesses see movement within the first few weeks. Our Advanced and Diamond plans guarantee the top 3 within 90 days.' },
    { q: 'What makes Google Ads and SEO different?', a: 'Google Ads buys you the first spot: you pay for every click and the campaign needs weekly care. SEO takes longer, around 90 days, but once it is in place the clicks are free and the results usually last. Both together work best, with the SEO foundation in place first.' },
    { q: 'Which businesses do you work with?', a: 'Local businesses that want to own their local search results and get more calls from them.' },
    { q: 'What do I need to do?', a: 'Ask happy customers for reviews and send us new photos of your work when you can. We handle the rest.' },
    { q: 'Is there a long contract?', a: 'No. Plans start with a 3-month commitment and can be cancelled monthly after that.' },
  ] as Faq[],
};

export type ServicePage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  sub: string;
  figure: 'berlin' | 'ads' | 'organic';
  figureCaption: string;
  benefits: Item[];
  intro: { h2: string; paras: string[] };
  problems: { h2: string; intro?: string; items: Item[] };
  included: { h2: string; items: Item[] };
  table?: { h2: string; intro?: string; head: string[]; rows: string[][]; after?: string };
  extra?: { h2: string; paras: string[]; links?: { href: string; label: string }[] };
  who: string[];
  process: { h2: string; steps: Item[] };
  faqH: string;
  faq: Faq[];
  plans?: { featured: string; note: string };
};

export const services: ServicePage[] = [
  {
    slug: 'google-business-profile-optimization',
    title: 'Google Business Profile Optimization: Proven Top 3 Results',
    description:
      'Google Business Profile optimization that gets local businesses into the Google Maps top 3: categories, services, posts, photos and reviews. Free check.',
    h1: 'Google Business Profile optimization that gets you into the map’s top 3',
    lead: 'Your profile decides most of who shows up under the map. Most businesses set theirs up once and never touch it again.',
    sub: 'We turn that forgotten listing into the strongest profile in your area.',
    figure: 'berlin',
    figureCaption: 'Another client, same scan. Rank 1 at every one of the 137 points on the grid.',
    benefits: [
      { title: 'Visibility', text: 'At least 72% of searches for services like yours go straight to the top 3.' },
      { title: 'It lasts', text: 'Once you are in the top three, we keep you there without extra ad spend.' },
      { title: 'No ad fees', text: 'No pay-per-click and no ad budget. The map results are free.' },
    ],
    intro: {
      h2: 'What profile optimization means',
      paras: [
        'When someone searches for a service near them, Google shows a map with three businesses under it. That is the Map Pack. Those three get most of the calls, and getting in there doesn’t cost a cent per click.',
        'What decides who shows up is mostly your Google Business Profile. Optimizing it means fixing what holds it back, then keeping it more active and more complete than anyone else’s in your area.',
      ],
    },
    problems: {
      h2: 'Why your profile isn’t in the top 3 yet',
      intro: 'When we compare a profile with the businesses ranking above it, the gaps are usually easy to spot.',
      items: [
        { title: 'Too many categories', text: 'Picking every category that sort of fits dilutes your relevance. Most top-ranking profiles use one main category and a few close ones.' },
        { title: 'A thin services list', text: 'Google lets you add up to 99 services. Competitors in the top 20 often list dozens, and every one is a search they can show up for.' },
        { title: 'An incomplete profile', text: 'Missing hours, no booking link, no photos, no questions answered. Google favors profiles it can trust to be complete.' },
        { title: 'No recent activity', text: 'No new posts, photos or reviews for months tells Google the business might not be active anymore.' },
        { title: 'Details that don’t match', text: 'If your name, address and phone number differ between your website, your profile and directories, Google is less confident about ranking you.' },
      ],
    },
    included: {
      h2: 'What we do to your profile',
      items: [
        { title: 'Ranking check and competitor analysis', text: 'We map where you show up today, then study the profiles in the top 10: their categories, services, photos and review counts. That tells us what it takes to beat them.' },
        { title: 'Categories and services set up properly', text: 'The right main category, the ones holding you back removed, and a full services list with short descriptions for the ones that matter most.' },
        { title: 'A complete, trustworthy profile', text: 'Hours, description, booking link, service areas, questions and photos, all filled in and consistent with your website.' },
        { title: 'Weekly posts and geotagged photos', text: 'Every week your profile gets a new post and fresh photos tagged with your location, so Google keeps seeing an active business.' },
        { title: 'Reviews and citations', text: 'A simple way to ask every happy customer for a review, and your business listed on the directories Google trusts with matching details everywhere.' },
      ],
    },
    table: {
      h2: 'What we work on, and why it matters',
      head: ['What we work on', 'Why it matters'],
      rows: [
        ['Main and secondary categories', 'One of the strongest ranking signals on Google Maps'],
        ['Services list (up to 99)', 'Lets you appear for many more specific searches'],
        ['Profile completeness', 'Complete profiles earn more trust from Google and from customers'],
        ['Weekly posts and photos', 'Shows Google the business is active'],
        ['Reviews', 'A steady flow helps both ranking and the decision to call'],
        ['Citations and matching details', 'Confirms your name, address and phone number across the web'],
      ],
    },
    extra: {
      h2: 'It works best with SEO and ads',
      paras: [
        'Your profile gets you into the Map Pack. SEO for your website helps you rank in the regular results under it, and Google Ads put you at the very top while your free rankings grow. Our packages combine them depending on how fast you want to move.',
        'We never stuff keywords into your business name or use fake addresses. It can work for a while, until the profile gets suspended.',
      ],
      links: [
        { href: '/', label: 'Local SEO for your website' },
        { href: '/google-ads-management/', label: 'Google Ads management' },
        { href: 'https://support.google.com/business/answer/3038177', label: 'Google Business Profile guidelines' },
      ],
    },
    who: [
      'Local businesses that serve customers in a specific city or area',
      'Businesses whose profile shows up on page 2 of the map, or not at all',
      'Owners who want more calls without paying for every click',
    ],
    process: {
      h2: 'Four steps to the Map Pack',
      steps: [
        { title: 'Free ranking check', text: 'We map where you rank across your area and compare your profile with the top 10.' },
        { title: 'Profile rebuild', text: 'Categories, services, description, photos and booking link, set up the way top-ranked profiles do it.' },
        { title: 'Weekly activity', text: 'New posts and geotagged photos every week, plus a simple system for more reviews.' },
        { title: 'Track and report', text: 'We re-check your rankings and show you where you moved, so you know what you are paying for.' },
      ],
    },
    faqH: 'Business Profile questions',
    faq: [
      { q: 'What is Google Business Profile optimization?', a: 'Improving your Google Business Profile (formerly Google My Business) so it ranks higher on Google Maps and in the Map Pack: the right categories, a full services list, complete details, regular posts, photos and reviews.' },
      { q: 'How long does it take to work?', a: 'It depends on your competition. Many businesses see movement within the first few weeks, and our Advanced and Diamond plans guarantee the top 3 within 90 days.' },
      { q: 'Do I need a website for this?', a: 'A website helps, because Google checks that your details match. If you don’t have one, our packages include website optimization, or we can talk about building one.' },
      { q: 'Will you change my business name?', a: 'No. We keep your real business name. Stuffing keywords into it breaks Google’s rules and can get a profile suspended.' },
      { q: 'What do I need to do?', a: 'Two things: ask happy customers for reviews regularly, and send us new photos of your work when you can. We handle everything else.' },
      { q: 'Is there a long contract?', a: 'No. Plans start with a 3-month commitment and can be cancelled monthly after that.' },
      { q: 'Should I also run Google Ads?', a: 'If you want calls this week, yes. Ads fill the gap while your profile climbs.', link: { href: '/google-ads-management/', label: 'How ads and your profile work together' } },
    ],
  },
  {
    slug: 'google-ads-management',
    title: 'Google Ads Management: Get to the Top of Google in 1 Day',
    description:
      'Google Ads management for local businesses: buying-intent keywords, ads per service, call and form tracking, weekly optimization and simple reports. Free ads audit.',
    h1: 'Google Ads management that puts you on top of Google tomorrow',
    lead: 'Your ad can sit above every competitor from the day it goes live.',
    sub: 'We make sure the clicks you pay for turn into phone calls.',
    figure: 'ads',
    figureCaption: 'A local results page, simplified. Ads sit above the map from day one.',
    benefits: [
      { title: 'Every click tracked', text: 'Calls, forms and bookings tracked, so you know which keywords make you money.' },
      { title: 'Local targeting', text: 'Your ads only show to people in the areas you serve, searching for what you offer.' },
      { title: 'Less wasted spend', text: 'Weekly negative keywords and bid changes keep your budget away from people who will never buy.' },
    ],
    intro: {
      h2: 'Ads for local businesses, done properly',
      paras: [
        'When someone in your area searches “plumber near me” or “dentist open Saturday”, the first results they see are ads. With Google Ads, your business can sit in that spot from the day your campaign goes live.',
        'The catch: Google charges for every click, whether that person calls you or not. A campaign nobody watches can spend a month’s budget and bring back two phone calls. Ours is built for the other outcome, and you can see exactly which clicks became calls, forms and bookings.',
      ],
    },
    problems: {
      h2: 'Where ad budgets usually go wrong',
      intro: 'When an owner tells us “Google Ads doesn’t work for us”, the cause is almost always one of these.',
      items: [
        { title: 'Nothing is tracked', text: 'Without conversion tracking you can’t tell which keyword brought in a customer and which one just cost money.' },
        { title: 'Keywords are too broad', text: 'An ad for “plumber” can show for “plumber salary” or “plumbing course”. Those people will never hire you.' },
        { title: 'No negative keyword list', text: 'This list tells Google which searches to ignore. Without one, Google decides for you.' },
        { title: 'One ad for every service', text: 'Google rewards ads that closely match the search. Generic ads get a lower Quality Score, so each click costs more.' },
        { title: 'Nobody checks the account', text: 'Competitors adjust their bids every week. A campaign left alone slowly gets more expensive.' },
      ],
    },
    included: {
      h2: 'What our Google Ads management includes',
      items: [
        { title: 'Account audit and plan', text: 'We look at your market, your competitors’ ads and your current account if you have one. You get a short plan: which services to advertise, which areas to target and what budget to start with.' },
        { title: 'Keywords people use when they’re ready to call', text: 'Searches with buying intent, like “emergency electrician near me”, and none from people who are only researching.' },
        { title: 'Ads written for each service', text: 'Every service gets its own ad group and copy, plus call, location and sitelink extensions, so your ad takes more space and gives more reasons to click.' },
        { title: 'Tracking calls, forms and bookings', text: 'Conversion tracking goes in before launch. Every decision after that is based on leads, not clicks or impressions.' },
        { title: 'Weekly optimization and simple reports', text: 'Every week we adjust bids, add negative keywords and test new ads. Your report shows three things: how many leads, what each cost and what we changed.' },
      ],
    },
    table: {
      h2: 'Google Ads or SEO?',
      intro: 'Both put you at the top of Google. They work on different timelines.',
      head: ['', 'Google Ads', 'SEO'],
      rows: [
        ['Time to first leads', 'Days', 'Usually 60 to 90 days'],
        ['Cost per click', 'You pay for every click', 'Clicks are free'],
        ['When you stop paying', 'Leads stop the same day', 'Rankings keep working'],
        ['Best for', 'Filling your calendar now', 'Lowering your cost per lead over time'],
      ],
      after: 'For most local businesses the answer is both. Ads bring in work while SEO and an optimized Business Profile build free rankings. As those grow, you can spend less on ads without losing leads. That is why our Diamond package includes all three.',
    },
    extra: {
      h2: 'Running ads yourself vs hiring help',
      paras: [
        'You can run Google Ads yourself, and Google makes starting easy. The default settings, though, are built to spend your budget, not to protect it.',
        'With managed ads, someone checks your account every week, knows which settings to switch off and is accountable for your cost per lead.',
      ],
      links: [
        { href: '/', label: 'Local SEO' },
        { href: '/google-business-profile-optimization/', label: 'Business Profile optimization' },
        { href: 'https://support.google.com/google-ads/', label: 'Google Ads Help Center' },
      ],
    },
    who: [
      'Local service businesses: trades, clinics, salons, restaurants, law and real-estate offices',
      'Businesses already running ads that aren’t sure where the money goes',
      'Owners who want one person accountable for results',
    ],
    process: {
      h2: 'From audit to leads in four steps',
      steps: [
        { title: 'Free ads audit', text: 'We look at your current account, or your market if you are starting fresh, and show you where the money goes.' },
        { title: 'Campaign build', text: 'Keyword research, ad copy, landing page alignment and conversion tracking, set up properly from day one.' },
        { title: 'Launch and optimize', text: 'We launch, then refine bids, keywords and ads every week based on real lead data.' },
        { title: 'Scale what works', text: 'Once we know which campaigns bring profitable leads, we put more budget behind them and cut the rest.' },
      ],
    },
    plans: { featured: 'Diamond', note: 'Google Ads management comes with the Diamond package. Your ad spend is paid to Google directly, so the budget stays yours.' },
    faqH: 'Google Ads questions',
    faq: [
      { q: 'How much does Google Ads management cost?', a: 'It is part of our Diamond plan at €1,990 per month, which also includes SEO and website optimization. Your ad spend is paid directly to Google, so you stay in control of the budget.' },
      { q: 'What does it include?', a: 'Everything after you decide to advertise: keyword research, writing the ads, conversion tracking, weekly bid and keyword changes, and a monthly report of leads and cost per lead.' },
      { q: 'How fast will I see results?', a: 'Ads can start showing the day the campaign goes live, so calls often come in during the first week. The first 2 to 4 weeks also give us the data to bring your cost per lead down.' },
      { q: 'How much should I spend on ads?', a: 'It depends on your market and how competitive your keywords are. In the free audit we check what clicks cost in your area and recommend a starting budget that can realistically bring in leads.' },
      { q: 'Do you manage existing accounts?', a: 'Yes. We audit your current account first, keep what works and rebuild what doesn’t. You keep full ownership of your account at all times.' },
      { q: 'Is there a long contract?', a: 'No. Plans start with a 3-month commitment and can be cancelled monthly after that.' },
      { q: 'Should I run ads or invest in SEO?', a: 'Ads bring leads now, SEO brings free leads over time. Most local businesses do best with both.', link: { href: '/', label: 'See how local SEO works' } },
    ],
  },
  {
    slug: 'wordpress-web-design',
    title: 'WordPress Web Design: 5 Proven Ways to Get More Customers',
    description:
      'WordPress web design for local businesses: fast, mobile-first websites with SEO built in, click-to-call and tracking. You own it and can edit it. Free website review.',
    h1: 'WordPress websites that turn visitors into customers',
    lead: 'Most local websites look fine but never make the phone ring.',
    sub: 'We build fast, mobile-friendly sites that rank on Google and AI search, and get you calls.',
    figure: 'organic',
    figureCaption: 'A local results page, simplified. Your website is where the regular results and the map both send people.',
    benefits: [
      { title: 'Found on Google', text: 'SEO built into every page, so your site shows up when locals search for what you do.' },
      { title: 'Fast on every phone', text: 'Mobile-first pages that load quickly, so visitors stay instead of hitting back.' },
      { title: 'You own it', text: 'Built on WordPress, so the site is yours and you can edit it. No closed builder, no lock-in.' },
    ],
    intro: {
      h2: 'Your website has one job',
      paras: [
        'Turn visitors into calls, bookings and enquiries. A site that looks nice but loads slowly, confuses people on their phone or never shows up on Google isn’t doing that job.',
        'We design and build websites for local businesses that load fast, work on every screen, rank on Google and make it easy to contact you.',
      ],
    },
    problems: {
      h2: 'Signs your website is losing you customers',
      items: [
        { title: 'It’s slow', text: 'People leave pages that take too long to load, especially on mobile data.' },
        { title: 'It’s hard to use on a phone', text: 'Most local searches happen on phones. Tiny buttons and text that needs zooming send people back to Google.' },
        { title: 'Nobody can find it', text: 'Without proper page titles, headings and content, Google has no reason to show your site.' },
        { title: 'There’s no clear next step', text: 'If your phone number or booking button is hard to find, visitors don’t call.' },
        { title: 'Your details don’t match', text: 'Your name, address and phone number should match your Business Profile exactly. When they don’t, it can hold your local rankings back.' },
      ],
    },
    included: {
      h2: 'What our web design includes',
      items: [
        { title: 'Planning around your customers', text: 'We start with what your customers search for and what they need to see before they call. That shapes the pages, the structure and the calls to action.' },
        { title: 'Design that fits your brand', text: 'A clean, professional design built in Elementor, so you can update text and images later without touching code.' },
        { title: 'Mobile-first and fast', text: 'Every page is built for phones first, with optimized images and caching so it loads quickly.' },
        { title: 'SEO built in from day one', text: 'Titles, meta descriptions, headings, alt text, schema markup and a service page for each thing you sell, so Google understands what you do and where.' },
        { title: 'Tracking and contact forms', text: 'Contact forms, click-to-call buttons and analytics set up and tested, so you know which pages bring in leads.' },
      ],
    },
    table: {
      h2: 'New website, or fix the one you have?',
      head: ['', 'New WordPress website', 'Optimize your current site'],
      rows: [
        ['Best when', 'Your site is outdated, slow or on a closed builder', 'Your site is decent but not ranking or converting'],
        ['What we do', 'Plan, design, build and launch', 'Fix speed, structure, SEO and calls to action'],
        ['Included in', 'Quoted separately', 'Every package (standard, advanced or full optimization)'],
      ],
    },
    extra: {
      h2: 'Why we build on WordPress',
      paras: [
        'You own your site and your content, you can edit it yourself, and it works with the SEO and tracking tools that matter for local businesses. No monthly lock-in to a closed website builder.',
        'A website works best as part of a system: local SEO and your Business Profile bring people to it, and Google Ads can send traffic from day one. The website’s job is to turn that traffic into customers.',
      ],
      links: [
        { href: '/', label: 'Local SEO' },
        { href: '/google-business-profile-optimization/', label: 'Business Profile optimization' },
        { href: 'https://wordpress.org/', label: 'WordPress.org' },
      ],
    },
    who: [
      'Local businesses without a website, or with one they’re embarrassed to share',
      'Businesses on a website builder that limits SEO and charges a monthly fee forever',
      'Owners who want a site they can edit themselves',
    ],
    process: {
      h2: 'From first call to launch in four steps',
      steps: [
        { title: 'Free website review', text: 'We look at your current site, or your market if you are starting fresh, and show you what to fix first.' },
        { title: 'Plan and design', text: 'Pages, structure and design planned around what your customers search for and need to see.' },
        { title: 'Build and launch', text: 'We build, test on every device, set up tracking and launch without breaking your current rankings.' },
        { title: 'Improve over time', text: 'We track which pages bring leads and keep improving speed, content and calls to action.' },
      ],
    },
    plans: { featured: 'Advanced', note: 'A new website gets a fixed quote after a free call. Optimizing the site you already have is part of every package below.' },
    faqH: 'Website questions',
    faq: [
      { q: 'How much does a WordPress website cost?', a: 'It depends on the pages and features you need. After a free call we give you a fixed quote, so there are no surprises. Optimizing an existing website is included in all our packages.' },
      { q: 'How long does it take?', a: 'A typical local business website takes a few weeks from the first call to launch, depending on how quickly content and feedback come in.' },
      { q: 'Can I edit the website myself?', a: 'Yes. We build in WordPress and Elementor, so you can change text and images without touching code. We show you how.' },
      { q: 'Will my new website be SEO friendly?', a: 'Yes. Titles, meta descriptions, headings, image alt text, schema and separate service pages are part of every build.' },
      { q: 'Can you redesign my site without losing rankings?', a: 'Yes. We keep your important URLs or redirect them properly, so the rankings you already have carry over.' },
      { q: 'Do I own the website?', a: 'Yes. The site, the content and the domain are yours.' },
      { q: 'Why WordPress instead of Wix or Squarespace?', a: 'WordPress gives you full ownership, more control over SEO and no dependence on one company’s monthly plan. For local businesses that want to rank, that control matters.' },
    ],
  },
];

export const contact = {
  title: 'Contact Us | Free Local SEO & Google Ads Analysis',
  description:
    'Ask for a free ranking check: tell us your business and main keyword, and we show you where you rank today, what holds you back and what we would do first.',
  h1: 'Get your free ranking check',
  lead: 'Tell us a bit about your business. We run a ranking map for your main keyword and come back with what is holding you back and what we would do first.',
  next: [
    { title: 'We map your keyword', text: 'A grid scan of your area, like the maps on this site, so you see where you rank from every spot.' },
    { title: 'We compare the top 3', text: 'What the businesses above you have that you don’t: categories, services, reviews, pages.' },
    { title: 'You get a short plan', text: 'What we would fix first, which package fits, and no obligation to take it.' },
  ] as Item[],
  plans: ['Starter (€750/month)', 'Advanced (€1,250/month)', 'Diamond (€1,990/month)', 'Not sure yet'],
};
