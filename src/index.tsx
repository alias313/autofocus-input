import { render } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import './tw.css';

export function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      const isTypingKey =
        event.key.length === 1 ||
        event.key === 'Backspace' ||
        event.key === 'Delete';

      if (
        isTypingKey &&
        document.activeElement !== inputRef.current &&
        inputRef.current
      ) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-3xl font-bold">Autofocus Input</h1>
        <input
          id="focus"
          ref={inputRef}
          placeholder="Type something"
          class="mt-4 border rounded-md px-3 py-2"
        />
      </div>
    </div>
  );
}

render(<App />, document.getElementById('app')!);

