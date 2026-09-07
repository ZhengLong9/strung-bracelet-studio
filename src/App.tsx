import { useState } from "react";
import { Header } from "./components/Header";
import { DesignPage } from "./pages/DesignPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { SavedBraceletsPage } from "./pages/SavedBraceletsPage";
import type { Page } from "./types/bracelet";

function App() {
  const [page, setPage] = useState<Page>("design");

  return (
    <div className="min-h-screen bg-bg px-4 py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <Header page={page} onNavigate={setPage} />

        {page === "design" && <DesignPage />}
        {page === "how-it-works" && <HowItWorksPage />}
        {page === "saved" && <SavedBraceletsPage />}
      </div>
    </div>
  );
}

export default App;
