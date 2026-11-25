import { Link } from 'react-router-dom';

const libraryPages = [
  { label: 'Website navigation', to: '/website-nav' },
  { label: 'Enterprise dashboard', to: '/enterprise-nav' },
  { label: 'Ecommerce navigation', to: '/ecommerce-nav' },
  { label: 'Animated company navigation', to: '/animated-company-nav' },
  { label: 'Animated portfolio navigation', to: '/animated-portfolio-nav' },
];

export default function Home() {
  return (
    <section className="px-8 py-10">
      <h1 className="text-xl font-semibold text-primary">Component library</h1>
      <ul className="mt-6 space-y-3">
        {libraryPages.map((page) => (
          <li key={page.to}>
            <Link to={page.to} className="text-primary-400 underline">
              {page.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
