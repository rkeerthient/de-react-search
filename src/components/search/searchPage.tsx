import { SearchBar } from "@yext/search-ui-react";
import SearchNav from "./searchNav";
import SearchResults from "./searchResults";
import { FaMicrophone } from "react-icons/fa";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const SearchPage = () => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const searchDiv = document.getElementsByClassName("search")[0];
    if (searchDiv) {
      const input = searchDiv.querySelector("input") as HTMLInputElement;
      if (input) {
        const micIcon = document.createElement("span");
        micIcon.style.cursor = "pointer";

        const root = createRoot(micIcon);
        root.render(
          <FaMicrophone
            size={24}
            onClick={() => {
              if (typeof window !== "undefined") {
                handleSpeechToText(input);
              }
            }}
          />
        );
        input.insertAdjacentElement("afterend", micIcon);
      }
    }
  }, []);

  const handleSpeechToText = (input: HTMLInputElement) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log(transcript);

      input.value = transcript;
      setInputValue(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error detected: " + event.error);
    };
  };

  return (
    <main className="flex flex-col gap-2">
      <header className="w-full centered-container">
        <SearchBar
          placeholder="Enter your search term"
          customCssClasses={{ searchBarContainer: "search" }}
        />
        <SearchNav />
      </header>
      <section aria-label="Search Results">
        <SearchResults />
      </section>
    </main>
  );
};

export default SearchPage;
