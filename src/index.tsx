import { render } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import './style.css';

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
    <div>
      <h1>Autofocus Input</h1>
      <input
        id="focus"
        ref={inputRef}
        placeholder="Type something"
      />
    </div>
  );
}

render(<App />, document.getElementById('app')!);

