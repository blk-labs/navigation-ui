import { Icon } from '@iconify/react';
import type { SearchboxProps } from '.';
import { ICON } from '@/shared/utils/icon';
import { useId, useState } from 'react';
import type { SubmitEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Searchbox({ placeholder = 'Search', searchKey = 'q' }: SearchboxProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get(searchKey) ?? '';
  const inputId = useId();

  const [query, setQuery] = useState(current);
  const [prevCurrent, setPrevCurrent] = useState(current);

  if (current !== prevCurrent) {
    setPrevCurrent(current);
    setQuery(current);
  }

  const btnClass =
    'flex-center shrink-0 text-neutral-50 size-6 rounded-md cursor-pointer ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ABB4CE]';

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = query.trim();

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(searchKey, value);
        else next.delete(searchKey);
        next.delete('page');
        return next;
      },
      { replace: true },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="w-full ring transition-all hover:ring-[#5E6E99] ease-out duration-200 ring-primary-700 focus-within:ring-[#ABB4CE] gap-1.5 bg-primary-800 rounded-xl py-3 px-4 flex-between"
    >
      <button type="submit" aria-label="Submit search" className={btnClass}>
        <Icon fontSize={18} icon={ICON.SEARCH} aria-hidden="true" />
      </button>

      <label htmlFor={inputId} className="sr-only">
        {placeholder}
      </label>
      <input
        id={inputId}
        type="search"
        name={searchKey}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        autoComplete="off"
        enterKeyHint="search"
        className="shrink text-sm text-neutral-50 focus:outline-0 outline-0 border-0 w-full"
        placeholder={placeholder}
      />

      <button type="button" aria-label="Open filters" className={btnClass}>
        <Icon fontSize={18} icon={ICON.FILTER} aria-hidden="true" />
      </button>
    </form>
  );
}
