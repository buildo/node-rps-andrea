// readLine is a NodeJs module, reads from streams as stdin
const readline = require("readline")

//createInterface is a callable of readLine module (see documentation)
//In this way, we can connect stdin and stdout

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// we need to make the function visible in our app.js file
module.exports = {

    //this is our function
    play: function (question) {
        function generateComputerMove() {
            return Math.round(Math.random() * (2))
        }
        /*
            readLine.questions can be also found in the documentation
            As arguments, it takes a string to display and a function to 
            do something with the answer. 
        */
        rl.question(question, (answer) => {

            var computerChoice = generateComputerMove()
            rl.write(`You choosed:  ${answer}\n Computer choosed:  ${computerChoice}\n`)

            if (answer == computerChoice) {
                rl.write(`Draw!\n`)
            } else if (answer == '0' & computerChoice == '2' |
                answer == '2' & computerChoice == '1' |
                answer == '1' & computerChoice == '0') {
                rl.write(`You win!\n`)
            } else {
                rl.write(`You lose :<\n`)
            }

            rl.close()
        })
    }
};




