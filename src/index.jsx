import { render } from 'preact';

import { useRef, useEffect } from 'preact/hooks';

import './style.css';

export function App() {
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();

    // Handler for when user types anywhere
    // Works with CTRL + A, CTRL + C, CTRL + BACKSPACE, CTRL + [any key that the browser doesn't override]
    // Because there's no preventDefault() call, the default command then runs after the handler
    // now targeting the newly focused input so Select All, Paste, Delete Word work.
    // Why does no call to preventDefault() help?
    // Focus behavior works because keydown runs before default actions
    // with Ctrl/Cmd combos, the default is a command (Select All, Paste, Delete Word)
    // rather than text insertion, so after your focus change the command applies to the input.
    // Interesting combos: CTRL + A, CTRL + V, CTRL + BACKSPACE (Delete Previous Word),
    // CTRL + Z (Undo), CTRL + Y (Redo), CTRL + DELETE (Delete Next Word)
    // Also, Inputs keep their selection state (selectionStart/selectionEnd) across blur/focus in modern browsers.
    // On refocus, the caret/selection is restored
    // (try selecting text in the input, then blurring it and type CTRL + BACKSPACE)
    const handleKeyDown = (event) => {
      // If you call preventDefault() in the handler, the default command is not executed
      const isTypingKey =
        event.key.length === 1 ||
        event.key === "Backspace" ||
        event.key === "Delete";

      if (
        isTypingKey &&
        document.activeElement !== inputRef.current &&
        inputRef.current
      ) {
        inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <h1>Autofocus Input</h1>
      <label htmlFor="focus">Email Address</label>
      <input
        id="focus"
        ref={inputRef}
        type="email"
        placeholder="Enter your email"
      />
    </div>
  );
}

render(<App />, document.getElementById('app'));
