import { useEffect, useState } from "react";
import "./quote.css";

export default function RandomQuoteGenerator() {
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState(null);
    const [author, setAuthor] = useState(null);

    async function fetchQuote() {
        try {
            setLoading(true);
            const response = await fetch(
                "https://quotes-api-self.vercel.app/quote",
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            if(data && Object.keys(data).length > 0) {
                setLoading(false);
                setQuote(data.quote);
                setAuthor(data.author);
            }

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="random-quote-generator">
            <h1 className="title quote-title">4. Random Quote Generator</h1>
            <div className="quote-wrapper">
                <p>{quote}</p>
                <h5>~ {author}</h5>
                <button onClick={fetchQuote} className="quote-button">
                    {loading ? "Loading..." : "Get New Quote"}
                </button>
            </div>
        </div>
    );
}
