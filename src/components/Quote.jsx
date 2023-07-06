import { useState } from "react";
import Bottom from "./Bottom";

function Quote() {
  const [data, setData] = useState({ quote: "", author: "", genre: "" });
  const [fetched, setFetched] = useState(false);
  const [hover, setHover] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const [fetchAuthor, setfetchAuthor] = useState(false);

  const url = "https://quote-garden.onrender.com/api/v3/quotes/";
  //https://quote-garden.onrender.com/api/v3/quotes/?author=Bill%20Gates
  const fetchQuote = async (quo) => {
    let fullURL = quo === "random" ? url + quo : url + `?author=${quo}`;

    const res = await fetch(fullURL);
    const json = await res.json();
    const fechtedData = json.data;
    //fechtedData.length === 1 ? fechtedData[0].quoteText : fechtedData
    setData({
      quote: fechtedData.map((q) => q.quoteText),
      author: fechtedData[0].quoteAuthor,
      genre: fechtedData[0].quoteGenre,
    });
    setFetched(true);

    //  console.log(fechtedData);
  };
  if (!fetched) {
    fetchQuote("random");
  }
  if (fetchAuthor) {
    fetchQuote(data.author);
    setfetchAuthor(false);
    setShowAuthor(true);
    setFetched(true);
  }
  let line = fetched && data.quote[0].length / 40;

  return (
    <div className="">
      <div
        className="flex absolute top-8 right-10 text-4xl cursor-pointer"
        onClick={() => fetchQuote("random")}
      >
        <p className="">random</p>
        <span className="material-symbols-outlined text-4xl">autorenew</span>
      </div>
      {!showAuthor ? (
        <div className="absolute top-60 left-28 right-28">
          <div className="flex">
            <div
              className={`rounded-xl bg-amber-200 w-[15px] h-[${line * 40}px] `}
            />
            {<p className="text-4xl ml-10 font-medium">“{data.quote}”</p>}
          </div>
          <div
            className={`pt-6 pb-6 rounded-xl mt-8 ml-10 w-[90%] cursor-pointer ${
              hover ? "bg-zinc-800 text-white" : ""
            }`}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            onClick={() => setfetchAuthor(true)}
          >
            <p className="text-3xl font-medium ml-12">{data.author}</p>
            <p className="text-2xl mt-4 ml-12">{data.genre}</p>

            {hover && (
              <span className="material-symbols-outlined ml-[80%] text-4xl">
                arrow_right_alt
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="absolute top-40 left-28 right-28">
          <p className="text-3xl font-medium ml-12">{data.author}</p>
          {data.quote.map((q) => {
            return (
              <div className="flex mt-12 ">
                <div
                  className={`rounded-xl bg-amber-200 w-[15px] h-[${
                    40 * line
                  }px] `}
                />
                <p key={q} className="text-4xl  ml-10 font-medium">
                  “{q}”
                </p>
              </div>
            );
          })}
          <Bottom styled="relative left-40 top-20 " />
        </div>
      )}
      {!showAuthor && <Bottom styled="absolute left-72 bottom-16 " />}
    </div>
  );
}
export default Quote;
