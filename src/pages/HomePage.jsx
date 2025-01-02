import { useState } from "react";

export default function HomePage() {
  const numbersList = [];
  const [numbersExtractedList, setNumbersExtractedList] = useState([]);
  const [extractedNumber, setExtractedNumber] = useState(0);
  const nums = 20;

  //* function for generate random number
  const generateRandomNumber = (min, max) => {
    let randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    } while (numbersExtractedList.includes(randomNumber));

    return randomNumber;
  };

  //* function for extraction number
  const extractionNumber = (min, max) => {
    setExtractedNumber(generateRandomNumber(1, nums));
    console.log("extractedNumber: " + extractedNumber);

    if (!numbersExtractedList.includes(extractedNumber)) {
      setNumbersExtractedList([...numbersExtractedList, extractedNumber]);
    }
  };
  console.log(numbersExtractedList);

  const resetGame = () => {
    setNumbersExtractedList([]);
    setExtractedNumber(0);
  };

  for (let i = 1; i <= nums; i++) {
    numbersList.push(i);
  }

  return (
    <main>
      <div className="container pt-3">
        {/* numbers */}
        <div className="row">
          <div className="col-9 d-flex justify-content-center flex-wrap gap-3">
            {numbersList.map((num, i) => (
              <span
                key={i}
                className="badge rounded-circle text-dark fs-3 number-list"
                data-num-extracted={
                  numbersExtractedList.includes(num) ? "true" : "false"
                }
              >
                {num}
              </span>
            ))}
          </div>

          {/* player interactions */}
          <div className="col-3 text-center">
            <h6 className="fw-bold">Ultimo numero estratto</h6>

            <span className="badge rounded-0 text-bg-light fs-3 number-extracted">
              {extractedNumber}
            </span>

            <hr className="border-light" />

            <div className="mb-2">
              <button
                type="button"
                onClick={() => extractionNumber()}
                className={
                  "btn btn-warning extraction-btn" +
                  (numbersExtractedList.length === nums ? " disabled" : "")
                }
              >
                Estrai
              </button>
            </div>

            <div className="mb-2">
              <button
                type="button"
                onClick={() => resetGame()}
                className="btn btn-danger"
              >
                Termina gioco
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
