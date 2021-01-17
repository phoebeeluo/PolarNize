const inputForm = document.querySelector('.sentenceInput');
const app = document.querySelector('.app');


inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var nameValue = document.getElementById("userInput").value;
    console.log(nameValue);

    const threshold = 0.6; //0.9
    var counter = 0;
    let html = '';

    // Load the model. Users optionally pass in a threshold and an array of
    // labels to include.
    async function run() {
        const sentences = [nameValue]; //'you suck'
        console.log("sentece:" + sentences);

        const model = await toxicity.load(threshold);

        model.classify(sentences).then((predictions) => {
            // `predictions` is an array of objects, one for each prediction head,
            // that contains the raw probabilities for each input along with the
            // final prediction in `match` (either `true` or `false`).
            // If neither prediction exceeds the threshold, `match` is `null`.
            predictions.forEach((predictions) => {

                console.log("full jason");
                console.log(predictions);

                console.log("label");
                console.log(predictions.label);
                var title = predictions.label;

                console.log("results probability");
                console.log(predictions.results[0].probabilities[1]);
                var raw = predictions.results[0].probabilities[1];
                var desc = raw.toFixed(3);

                var toxicMatch = "";
                console.log("match");
                console.log(predictions.results[0].match);
                if (predictions.results[0].match) {
                    toxicMatch = "Yes";
                } else {
                    toxicMatch = "No";

                }

                const li = `
                <li>
                  <div> <b>Type of Toxicity: </b> ${title} </div>
                  <div> <b>Probability of Toxicity:</b> ${desc} </div>
                  <div> <b>Is it Toxic?</b> ${toxicMatch} </div>
                </li>
                `;

                html += li;

                app.innerHTML = html;

                console.log("Hi console! Iteration number");

            });
            /*
            prints:
            {
              "label": "identity_attack",
              "results": [{
                "probabilities": [0.9659664034843445, 0.03403361141681671],
                "match": false
              }]
            },
            {
              "label": "insult",
              "results": [{
                "probabilities": [0.08124706149101257, 0.9187529683113098],
                "match": true
              }]
            },
            ...
             */
        });


    }

    run();
});