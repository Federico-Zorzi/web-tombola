import { useState } from "react";

export default function HomePage() {
  const numbersList = [];
  const [numbersExtractedList, setNumbersExtractedList] = useState([]);
  const [extractedNumber, setExtractedNumber] = useState(0);
  const nums = 90;
  let [extractionInProgress, setExtractionInProgress] = useState(false);

  //* function for generate random number
  const generateRandomNumber = (min, max) => {
    let randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    } while (numbersExtractedList.includes(randomNumber));

    return randomNumber;
  };

  //* create array of numbers for print on screen
  for (let i = 1; i <= nums; i++) {
    numbersList.push(i);
  }

  //* function for extraction number
  const extractionNumber = () => {
    let randomInterval;
    const tempDuration = 1500;
    const intervalSpeed = 100;
    setExtractionInProgress(true);

    randomInterval = setInterval(() => {
      const tempNumber = generateRandomNumber(1, nums);
      setExtractedNumber(tempNumber);
    }, intervalSpeed);

    setTimeout(() => {
      clearInterval(randomInterval);
      setExtractionInProgress(false);

      let finalNumber;
      finalNumber = generateRandomNumber(1, nums);

      setExtractedNumber(finalNumber);
      setNumbersExtractedList([...numbersExtractedList, finalNumber]);

      console.log("Final Extracted Number:", finalNumber);
    }, tempDuration);
  };

  //* function for restart game
  const resetGame = () => {
    setNumbersExtractedList([]);
    setExtractedNumber(0);
  };

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
                  "btn btn-warning fw-bold extraction-btn" +
                  (numbersExtractedList.length === nums || extractionInProgress
                    ? " disabled"
                    : "")
                }
              >
                Estrai
              </button>
            </div>

            <div className="mb-2">
              {/* End Actual Game Button */}
              <button
                type="button"
                className="btn btn-danger fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#endGame"
              >
                Termina Gioco
              </button>

              {/* modal for confirm end game */}
              <div
                className="modal fade"
                id="endGame"
                tabIndex="-1"
                aria-labelledby="endGameLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      {/* modal title */}
                      <h1 className="modal-title fs-5" id="endGameLabel">
                        Termina Partita
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Vuoi terminare la partita corrente?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={() => resetGame()}
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                      >
                        Termina Partita
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
