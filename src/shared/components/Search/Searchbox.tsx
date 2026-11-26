import { Icon } from '@iconify/react';
import type { SearchboxProps } from '.';
import { ICON } from '@/shared/utils/icon';
import { useId, useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, useReducedMotion, motion } from 'motion/react';

export default function Searchbox({
  placeholder = 'Search',
  searchKey = 'q',
  variant = 'default',
}: SearchboxProps) {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const sharedProps: AnimatedSearchBoxProps = {
    handleSubmit,
    handleChange,
    inputId,
    query,
    placeholder,
    searchKey,
  };

  if (variant === 'animated') return <AnimatedSearchBox {...sharedProps} />;

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
        onChange={handleChange}
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

interface AnimatedSearchBoxProps {
  handleSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputId: string;
  query: string;
  placeholder: string;
  searchKey: string;
}

// All three paths use the same commands (M L C C C C C) so motion can interpolate `d`
// Exact path from the Lottie: circle -> handle -> hook -> vertical stem
const ICON_PATH =
  'M14.565 8.253C14.604 7.945 14.625 7.631 14.625 7.312C14.625 3.273 11.351 0 7.312 0C3.273 0 0 3.273 0 7.312C0 11.351 3.273 14.625 7.312 14.625C9.31 14.625 11.121 13.823 12.441 12.525C13.541 13.625 14.642 14.727 15.742 15.827C16.736 16.738 19.236 21.737 23.736 21.737C26.236 21.737 28.736 20.737 28.736 16.237C28.736 12.637 28.736 4.737 28.736 1.237';

// Trim window along the path (fractions of total length)
const TRIM_ICON = { pathLength: 0.58, pathOffset: 0 };
const TRIM_CARET = { pathLength: 0.18, pathOffset: 0.82 };

const EASE_FOCUS = [0.93, 0, 0.1, 1] as const;
const EASE_BLUR = [0.5, 0, 0.5, 1] as const;

function AnimatedSearchBox({
  handleSubmit,
  handleChange,
  inputId,
  query,
  placeholder,
  searchKey,
}: AnimatedSearchBoxProps) {
  const [focused, setFocused] = useState(false);
  const reduce = useReducedMotion();

  const duration = reduce ? 0 : 0.5;
  const ease = focused ? EASE_FOCUS : EASE_BLUR;
  const caret = focused && !query; // once the user types, the native caret takes over

  return (
    <motion.form
      role="search"
      onSubmit={handleSubmit}
      onFocus={() => {
        setFocused(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      initial={false}
      animate={{
        boxShadow: focused ? 'inset 0 0 0 1px #9CC0F4' : 'inset 0 0 0 0px #9CC0F4',
      }}
      transition={{ duration, ease }}
      className="w-full text-neutral-50 bg-accent-500 text-sm p-3 flex-between max-w-135.25 rounded-2xl gap-4"
    >
      {/* 21px slot + gap-4 = 37px, so the text starts 49px from the left edge like in Figma */}
      <span aria-hidden className="relative self-stretch w-[21px] shrink-0">
        <motion.svg
          width={31}
          height={24}
          viewBox="-1 -1 31 24"
          fill="none"
          className="pointer-events-none absolute left-[2.76px] top-[calc(50%-8.9px)] overflow-visible"
          animate={{ opacity: caret ? [1, 1, 0, 0] : focused ? 0 : 1 }}
          transition={
            caret && !reduce
              ? {
                  delay: 0.5,
                  duration: 1,
                  times: [0, 0.5, 0.5, 1],
                  ease: 'linear',
                  repeat: Infinity,
                }
              : { duration: 0.15 }
          }
        >
          <motion.path
            d={ICON_PATH}
            stroke="currentColor"
            strokeWidth={2}
            initial={false}
            animate={focused ? TRIM_CARET : TRIM_ICON}
            transition={{ duration, ease }}
          />
        </motion.svg>
      </span>

      <label htmlFor={inputId} className="sr-only">
        {placeholder}
      </label>

      {/* overflow-hidden clips the placeholder while it is below the field */}
      <div className="relative w-full overflow-hidden">
        <input
          id={inputId}
          type="search"
          name={searchKey}
          value={query}
          onChange={handleChange}
          className={`w-full outline-0 border-0 text-neutral-50 bg-transparent ${
            caret ? 'caret-transparent' : ''
          }`}
          autoComplete="off"
          enterKeyHint="search"
        />

        <AnimatePresence initial={false}>
          {!query &&
            (focused ? (
              <motion.span
                key="focus"
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center whitespace-nowrap text-neutral-200"
                initial={{ y: 33, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration, ease: EASE_FOCUS } }}
                exit={{ y: 33, opacity: 0, transition: { duration, ease: EASE_BLUR } }}
              >
                {placeholder}
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center whitespace-nowrap text-neutral-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: duration, duration: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
              >
                {placeholder}
              </motion.span>
            ))}
        </AnimatePresence>
      </div>

      <button
        type="submit"
        className="shrink-0 rounded-lg cursor-pointer flex-center text-neutral-950 p-2 px-2.5 bg-neutral-50 font-medium"
      >
        Search
      </button>
    </motion.form>
  );
}
