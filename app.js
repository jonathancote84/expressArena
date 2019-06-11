const express = require( 'express' );
const morgan = require( 'morgan' );

const app = express();
//this is the middleware that requests pass through
//on their way to the final handler 
app.use(morgan('common'));



// first drill 
app.get('/sum', (req, res) => {
   const {a, b} = req.query;

   //Validation - a and b are required and should be numbers
   if(!a) {
       return res 
            .status(400)
            .send('a is required');
    }

   if(!b) {
       return res 
            .status(400)
            .send('b is required');
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if(Number.isNaN(numA)) {
        return res 
            .status(400)
            .send('a must be a number');
    }

    if(Number.isNaN(numB)) {
        return res
            .status(400)
            .send('be must be a number')
    }
    
    //validation passed so perform the task
    const c = numA + numB;

    //format the response string 
    const responseString = `The sum of ${numA} and ${numB} is ${c}`;

    //send the response
    res
        .status(200)
        .send(responseString);
}); 

//Drill 2
app.get('/cipher', (req, res) => {
    const { text, shift } = req.query;

    // validation: both values are required, shift must be a number 
    if(!text) {
        return res
            .status(400)
            .send('shift is required');
    }

    if(!shift) {
        return res 
            .status(400)
            .send('text is required');
    }

    const numShift = parseFloat(shift);

    if(Number.isNaN(numShift)) {
        return res
            .status(400)
            .send('shift must be a number');
    }

    //all valid perform the task
    //Make the text uppercase for convenience
    //the question did not say what to do with punctuation marks
    //and numbers so we will ignore them and only convert letters. 
    //Also just the 26 letters of the alphabet in typical use in the US
    //and UK today. To support an international audience we will have to 
    //do more 
    //create a loop over the characters, for each letter, covert 
    //using the shift

    const base = 'A'.charCodeAt(0); //get char code

    const cipher = text
        .toUpperCase()
        .split('') //create an array of characters 
        .map(char => { // map each original char to a converted char
            const code = char.charCodeAt(0); //get the char code

            // if it is not one of the 26 letters ignore it 
            if (code < base || code > (base + 26)) {
                return char;
            }

            //otherwise convert it 
            //get the distance from A
            let diff = code - base;
            diff = diff + numShift;

            // in case shift takes the value past Z, cycle back to the beginning
            diff = diff % 26;

            //convert back to a character 
            const shiftedChar = String.fromCharCode(base + diff);
            return shiftedChar;
        })
        .join(''); // construct a String from the array

    // Return the response
    res
        .status(200)
        .send(cipher);
});

//Drill 3 
app.get('/lotto', (req, res) => {
    const { numbers } = req.query;

    //validation: 
    //1. the numbers array must exist
    //2. must be an array
    //3. must be 6 numbers
    //4. numbers must be between 1 and 20 

    if(!numbers) {
        return res 
            .status(200)
            .send("numbers is required");
    }

    if(!Array.isArray(numbers)) {
        return res 
            .status(200)
            .send("numbers must be an array");
    }

    const guesses = numbers 
            .map(n => parseInt(n))
            .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));

    if(guesses.length != 6) {
        return res 
            .status(400)
            .send("numbers must contain 6 integers between 1 and 20");
    }

    // fully validated numbers 

    //here are the 20 numbers to choose form 
    const stockNumbers = Array(20).fill(1).map((_, i))
})



app.listen(8000, () => {
    console.log('Express server is listening on port 8000! ');
});

