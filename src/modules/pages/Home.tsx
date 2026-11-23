import { Link } from 'react-router-dom';

const libraryPages = [{ label: 'Website navigation', to: '/website-nav' }];

export default function Home() {
  return (
    <section className="px-8 py-10">
      <h1 className="text-xl font-semibold text-primary">Website Navigation library</h1>
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
