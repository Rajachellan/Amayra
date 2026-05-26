export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Timeless Allure of Heritage Kundan Artistry",
    slug: "heritage-kundan-artistry",
    excerpt: "Explore the rich history and meticulous craftsmanship behind one of India's most celebrated jewellery traditions.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
    date: "May 10, 2026",
    category: "Heritage",
    readTime: "5 min read",
    content: `
      <p>Kundan jewellery, one of the oldest forms of jewellery in India, is a testament to the country's rich cultural heritage and artistic brilliance. Originating in the royal courts of Rajasthan and Gujarat, Kundan work involves the meticulous setting of precious stones in a base of pure gold.</p>
      
      <h3>The Art of Jadau</h3>
      <p>The process of creating Kundan jewellery, known as 'Jadau', is a collaborative effort between various skilled artisans. Each piece undergoes multiple stages, from the initial design and framework (Ghaat) to the enameling (Meenakari) and the final setting of stones.</p>
      
      <blockquote>
        "Kundan is not just jewellery; it's a wearable piece of history that captures the essence of royal Indian craftsmanship."
      </blockquote>

      <h3>Modern Interpretation</h3>
      <p>While traditional designs remain popular, modern jewellers are reimagining Kundan work to suit contemporary tastes. From minimalist chokers to statement earrings, Kundan is being blended with modern aesthetics to create pieces that are both timeless and trendy.</p>
      
      <p>At Amayra, we take pride in preserving this ancient art form while ensuring each piece meets the highest standards of quality and design. Our heritage collection is a tribute to the master craftsmen who have kept this tradition alive for generations.</p>
    `,
  },
  {
    id: "2",
    title: "Bridal Jewellery Trends for the Modern 2026 Bride",
    slug: "bridal-jewellery-trends-2026",
    excerpt: "From minimalist diamonds to statement polki, discover what's trending in the world of luxury bridal couture.",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1000&auto=format&fit=crop",
    date: "May 05, 2026",
    category: "Bridal",
    readTime: "7 min read",
    content: `
      <p>The bridal jewellery landscape is evolving, with 2026 brides seeking a perfect balance between tradition and individuality. This year, we're seeing a shift towards pieces that tell a personal story while maintaining a royal aesthetic.</p>
      
      <h3>1. The Return of Polki</h3>
      <p>Uncut diamonds, or Polki, are making a significant comeback. Their raw, natural brilliance offers a unique charm that perfectly complements both traditional red lehengas and modern pastel ensembles.</p>
      
      <h3>2. Minimalist Diamonds</h3>
      <p>For the bride who prefers understated elegance, minimalist diamond sets are the way to go. Delicate necklaces and stud earrings are being layered to create a sophisticated yet effortless look.</p>
      
      <h3>3. Statement Chokers</h3>
      <p>A statement choker remains a bridal essential. This season, we're seeing oversized designs featuring a mix of precious stones, intricate gold work, and delicate pearls.</p>
      
      <p>Choosing your bridal jewellery is a journey of self-expression. At Amayra, our bridal consultants are dedicated to helping you find the perfect pieces that reflect your style and celebrate your special day.</p>
    `,
  },
  {
    id: "3",
    title: "How to Care for Your Heirloom Diamond Pieces",
    slug: "caring-for-diamond-jewellery",
    excerpt: "Essential tips and professional advice on maintaining the sparkle and integrity of your most precious investments.",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop",
    date: "April 28, 2026",
    category: "Care Guide",
    readTime: "4 min read",
    content: `
      <p>Diamonds are known for their durability, but they still require proper care to maintain their brilliance over time. Whether it's an engagement ring or a family heirloom, these tips will help you keep your diamonds sparkling for generations.</p>
      
      <h3>Regular Cleaning</h3>
      <p>To remove everyday dirt and oils, soak your jewellery in a gentle solution of warm water and mild dish soap. Use a soft-bristled toothbrush to gently scrub the stones and the setting, then rinse thoroughly and pat dry with a lint-free cloth.</p>
      
      <h3>Safe Storage</h3>
      <p>Diamonds are one of the hardest substances on earth, which means they can scratch other jewellery. Store each piece in its own soft pouch or a separate compartment in your jewellery box to prevent scratches.</p>
      
      <h3>Professional Inspections</h3>
      <p>We recommend having your diamond jewellery inspected by a professional at least once a year. This ensures that the prongs are secure and the stones are not loose, preventing potential loss.</p>
      
      <p>At Amayra, we offer complimentary cleaning and inspection services for all our clients. Visit our atelier to ensure your precious pieces continue to shine as brightly as the day you first wore them.</p>
    `,
  },
  {
    id: "4",
    title: "The Science of Brilliance: Understanding Diamond Cuts",
    slug: "understanding-diamond-cuts",
    excerpt: "A deep dive into how different cuts affect light performance and the overall aesthetic of a diamond.",
    image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=1000&auto=format&fit=crop",
    date: "April 15, 2026",
    category: "Education",
    readTime: "6 min read",
    content: `
      <p>The cut of a diamond is perhaps the most crucial of the 4Cs, as it directly impacts the stone's ability to reflect light. While often confused with the shape, the 'cut' refers to the symmetry, proportion, and polish of the diamond's facets.</p>
      
      <h3>The Ideal Cut</h3>
      <p>A well-cut diamond allows light to enter through the table, bounce off the pavilion facets, and return through the table, creating maximum brilliance and fire. If a cut is too shallow or too deep, light escapes through the bottom or sides, resulting in a dull appearance.</p>
      
      <h3>Popular Shapes</h3>
      <p>From the classic Round Brilliant to the sophisticated Emerald and the romantic Pear, each diamond shape offers a different aesthetic. However, the quality of the cut remains paramount regardless of the shape.</p>
      
      <p>Understanding the nuances of diamond cuts can help you make an informed decision when selecting your next piece of fine jewellery. Our experts at Amayra are always available to guide you through the process of finding the perfect diamond.</p>
    `,
  },
  {
    id: "5",
    title: "Ethical Sourcing: The Amayra Commitment",
    slug: "ethical-sourcing-commitment",
    excerpt: "Learn about our journey towards sustainable luxury and how we ensure every gem is responsibly sourced.",
    image: "https://images.unsplash.com/photo-1573408302185-9127ff5f6133?q=80&w=1000&auto=format&fit=crop",
    date: "April 02, 2026",
    category: "Ethics",
    readTime: "5 min read",
    content: `
      <p>In the world of luxury, true beauty lies in the integrity of the process. At Amayra, we are committed to ensuring that every gemstone and every gram of gold in our collections is sourced ethically and responsibly.</p>
      
      <h3>Conflict-Free Diamonds</h3>
      <p>We strictly adhere to the Kimberley Process and work only with trusted suppliers who share our commitment to human rights and environmental protection. Every diamond we sell is certified conflict-free.</p>
      
      <h3>Sustainable Practices</h3>
      <p>Beyond sourcing, we are constantly working to reduce our environmental footprint. This includes using recycled gold where possible and implementing sustainable practices in our atelier and showrooms.</p>
      
      <p>By choosing Amayra, you are not just investing in a piece of jewellery; you are supporting a more ethical and sustainable future for the luxury industry.</p>
    `,
  },
  {
    id: "6",
    title: "Layering Gold: A Guide to Effortless Sophistication",
    slug: "layering-gold-guide",
    excerpt: "Master the art of layering necklaces and bracelets to create a unique and personalized jewellery statement.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
    date: "March 20, 2026",
    category: "Style",
    readTime: "4 min read",
    content: `
      <p>Layering gold jewellery is an art form that allows you to express your personality and elevate any outfit. Whether you prefer delicate chains or bold statement pieces, Master the art of layering with these simple tips.</p>
      
      <h3>Start with a Base</h3>
      <p>Begin with a simple, fine chain as your base layer. This provides a foundation upon which you can build more complex layers. Varying the lengths of your necklaces is key to creating a balanced look.</p>
      
      <h3>Mix Textures and Tones</h3>
      <p>Don't be afraid to mix different textures—like a smooth herringbone chain with a delicate box chain. While staying within the same gold tone (like yellow gold) provides a cohesive look, mixing metals can also create a modern, edgy vibe.</p>
      
      <h3>The Rule of Three</h3>
      <p>A good rule of thumb is to start with three layers. For necklaces, this could be a short choker, a medium-length pendant, and a longer chain. This creates a pleasing visual gradient without overwhelming your look.</p>
      
      <p>Mastering the art of layering is about experimentation and finding what works for you. Explore our collection of gold essentials at Amayra and start building your own unique jewellery story.</p>
    `,
  },
];
