import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
    // This state saves the text as you type so it's ready for the API call
    const [location, setLocation] = useState("");

    const handleInput = (e) => {
        // Updated to use e.target.value for proper text extraction
        setLocation(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the page from refreshing
        if (location.trim()) {
            // Sends the typed city name back to App.jsx to trigger the API
            onSearch(location);
        }
    };

    return (
        /* Inline style for safety to ensure medium width and centering */
        <div style={{ maxWidth: '450px', margin: '0 auto', width: '100%', padding: '0 20px' }}>
            <form 
                onSubmit={handleSubmit} 
                style={{ display: 'flex', gap: '8px' }}
            >
                <input
                    type="text"
                    value={location}
                    onChange={handleInput}
                    placeholder="Search city..."
                    style={{
                        flex: 1,
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        fontSize: '16px',
                        outline: 'none'
                    }}
                    className="focus:border-blue-500 shadow-sm transition-all"
                />
                <button
                    type="submit"
                    style={{
                        padding: '0 20px',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    className="hover:bg-blue-700 active:scale-95 transition-all"
                >
                    Go
                </button>
            </form>
            
            {/* Displaying the saved input as requested */}
            <p style={{ marginTop: '12px', textAlign: 'center', fontSize: '12px', color: '#94a3b8', fontWeight: 'bold' }}>
                TYPING: <span style={{ color: '#2563eb', textTransform: 'uppercase' }}>{location || "..."}</span>
            </p>
        </div>
    );
}

export default SearchBar;