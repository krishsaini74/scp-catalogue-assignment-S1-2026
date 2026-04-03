import { useMemo, useState } from "react";
import scpData from "./data/scpData.json";
import "./styles/app.css";

function App() {
  const [selectedItem, setSelectedItem] = useState(scpData[0] || null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return scpData.filter((item) => {
      const text = `${item.title} ${item.objectClass} ${item.summary}`.toLowerCase();
      return text.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm]);

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">SCP FOUNDATION ARCHIVE</p>
          <h1>SCP Catalogue</h1>
          <p className="hero-text">
            Modern single-page catalogue for field agents. Browse and inspect
            SCP entries from the JSON dataset.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search SCP by title, class, or summary..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </header>

      <main className="main-layout">
        <section className="card-panel">
          <h2>Subjects</h2>

          <div className="card-grid">
            {filteredData.map((item) => (
              <button
                key={item.id}
                className={`scp-card ${
                  selectedItem?.id === item.id ? "active" : ""
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="card-top">
                  <span className="scp-id">{item.title}</span>
                  <span className="badge">{item.objectClass}</span>
                </div>

                <p className="card-summary">{item.summary}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="detail-panel">
          {selectedItem ? (
            <>
              <div className="detail-header">
                <div>
                  <p className="eyebrow">SUBJECT FILE</p>
                  <h2>{selectedItem.title}</h2>
                </div>
                <span className="detail-badge">{selectedItem.objectClass}</span>
              </div>

              {selectedItem.image && (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="detail-image"
                />
              )}

              <div className="detail-section">
                <h3>Summary</h3>
                <p>{selectedItem.summary}</p>
              </div>

              <div className="detail-section">
                <h3>Special Containment Procedures</h3>
                <p>{selectedItem.containment}</p>
              </div>

              <div className="detail-section">
                <h3>Description</h3>
                <p>{selectedItem.description}</p>
              </div>

              {selectedItem.reference && (
                <div className="detail-section">
                  <h3>Reference</h3>
                  <p>{selectedItem.reference}</p>
                </div>
              )}
            </>
          ) : (
            <p>Select an SCP entry to view details.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;