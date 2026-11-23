export default function ErrorState({
  error,
  resetErrorBoundary,
}: {
  error: unknown;
  resetErrorBoundary: (...args: unknown[]) => void;
}) {
  console.log(error);

  return (
    <div>
      <h1>Something went wrong</h1>

      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
