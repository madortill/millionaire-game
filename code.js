const termList = [
    {
        quess: "שאלה 1",
        ans0: "תשובה נכונה",
        ans1: "תשובה 1",
        ans2: "תשובה 2",
        ans3: "תשובה 3",
        img: "#"
    },
    {
        quess: "שאלה 2",
        ans0: "תשובה נכונה",
        ans1: "תשובה 1",
        ans2: "תשובה 2",
        ans3: "תשובה 3",
        img: "#"
    },
    {
        quess: "שאלה 3",
        ans0: "תשובה נכונה",
        ans1: "תשובה 1",
        ans2: "תשובה 2",
        ans3: "תשובה 3",
        img: "#"
    },
    {
        quess: "שאלה 4",
        ans0: "תשובה נכונה",
        ans1: "תשובה 1",
        ans2: "תשובה 2",
        ans3: "תשובה 3",
        img: "#"
    },
    {
        quess: "שאלה 5",
        ans0: "תשובה נכונה",
        ans1: "תשובה 1",
        ans2: "תשובה 2",
        ans3: "תשובה 3",
        img: "#"
    },
    {
        quess: "שאלה 6",
        ans0: "תשובה נכונה",
        ans1: "תשובה 1",
        ans2: "תשובה 2",
        ans3: "תשובה 3",
        img: "#"
    },
    {
        quess: "שאלה 7",
        ans0: "תשובה נכונה",
        ans1: "תשובה 1",
        ans2: "תשובה 2",
        ans3: "תשובה 3",
        img: "#"
    },
    {
        quess: "שאלה 8",
        ans0: "תשובה נכונה",
        ans1: "תשובה 1",
        ans2: "תשובה 2",
        ans3: "תשובה 3",
        img: "#"
    }
    /* an example for question template 
    {
    //     quess: "שאלה",
    //     ans0: "תשובה נכונה",
    //     ans1: "תשובה 1",
    //     ans2: "תשובה 2",
    //     ans3: "תשובה 3",
    //     img: "URL של התמונה"
    //      if there are no url put "#"" insted
     }*/

];

//value of the questions
// const quesValue = ["0", "1,000", "100,000", "500,000", "1,000,000","1,000,000"];


var quessOrder = [];
var ansArr = [0, 1, 2, 3];
var currQues = 0;
var life = 0;
var timer;

window.onload = () => {
    document.querySelector(".i-icon").addEventListener("click", onClickI);
    startGame();

};

function startGame() {
    // for (let index = 0; index < termList.length; index++) {
    //     const element = termList[index];
    //     console.log(numCommas(questionValue(termList, index)));        
    // }

    quessOrder = [];
    ansArr = [0, 1, 2, 3];
    currQues = 0;
    life = 0;
    //not on use make another order of the questions
    //createQuessOrder();

    if (document.querySelectorAll(".help.disable")[0]) {
        document.querySelector(".help.disable").style.visibility = "visible";
        document.querySelector(".help.disable").classList.remove("disable");
    }
    if (document.querySelectorAll(".help.disable")[1]) {
        document.querySelector(".help.disable").style.visibility = "visible";
        document.querySelector(".help.disable").classList.remove("disable");
    }

    document.querySelectorAll(".help")[0].addEventListener("click", onClickHelp);
    document.querySelectorAll(".help")[1].addEventListener("click", onClickHelp);

    enterText();

}

//the function enter the informaition the the specific place
function enterText() {

    //chaeck if there is an image to replace the background of the question
    if (termList[currQues].img != "#") {
        document.getElementById("quess-card").style.backgroundImage = `url("${termList[currQues].img}")`;
    }


    //enter the value of the money and the
    // document.getElementById("quess-value").innerHTML = quesValue[currQues + 1];

    document.getElementById("quess-value").innerHTML = numCommas(questionValue(termList, currQues));
    document.getElementById("money-bank").innerHTML =  numCommas(currQues > 0 ? questionValue(termList, currQues - 1) : 0);


    //change the question text
    document.getElementById("quess-card").innerHTML = termList[currQues].quess;

    //shffel the answers array to make the answers random
    ansArr = shuffle(ansArr);

    //enter to the answers card the text and adds listeners
    var allNotes = document.querySelectorAll(".ans");
    for (var i = 0; i < ansArr.length; i++) {
        allNotes[i].innerHTML = termList[currQues][`ans${ansArr[i]}`];
        allNotes[i].addEventListener("click", cheack);
    }

    // console.log("1");
    //enter the quess number
    document.getElementById("quess-count").innerHTML = `${currQues + 1}/${termList.length}`;
}


// the function checks if the user clicked on the right answer or not
function cheack(e) {
    currQues++;

    if (currQues == termList.length) {
        // console.log("finel choice");
        if (e.currentTarget.textContent == termList[currQues - 1].ans0) {

            //change cards color- green color
            e.currentTarget.classList.add("correct");
        }
        else {
            //remove life counter and img
            document.querySelectorAll(".heart")[life].style.visibility = "hidden";
            life++;

            //change cards color
            //red color
            e.currentTarget.classList.add("worng");

            //green color- show the right answer
            var allNotes = document.querySelectorAll(".ans");
            for (var i = 0; i < ansArr.length; i++) {
                if (allNotes[i].textContent == termList[currQues - 1].ans0) {
                    allNotes[i].classList.add("correct");
                }
            }
        }
        timer = setTimeout(winMessege, 1500, e.currentTarget, document.querySelector(".correct"));
    }
    else {

        // console.log(" not finel choice");
        // console.log(e.currentTarget.textContent);
        // console.log(termList[currQues].ans0);
        //cheack if the text in the card that has click is the same as the correct answer
        if (e.currentTarget.textContent == termList[currQues - 1].ans0) {

            //change cards color- green color
            e.currentTarget.classList.add("correct");

            timer = setTimeout(nextQuestionRight, 1500, e.currentTarget);
        }
        else {
            //remove life counter and img
            document.querySelectorAll(".heart")[life].style.visibility = "hidden";
            life++;

            //change cards color
            //red color
            e.currentTarget.classList.add("worng");

            //green color- show the right answer
            var allNotes = document.querySelectorAll(".ans");
            for (var i = 0; i < ansArr.length; i++) {
                if (allNotes[i].textContent == termList[currQues - 1].ans0) {
                    allNotes[i].classList.add("correct");
                    timer = setTimeout(nextQuestionWorng, 1500, e.currentTarget, allNotes[i]);
                }
            }
            //if the user lose the game
            if (life == 3) {
                timer = setTimeout(loseMessege, 1500, e.currentTarget, document.querySelector(".correct"));
                //clearInterval(timer);
            }
        }


    }

    //make the buttens un tocheable
    document.querySelector(".answer-place").classList.add("disable");

}

//the function make the question change and the cards came back to the original color- if the user was right
function nextQuestionRight(userAnswer) {
    document.querySelector(".answer-place").classList.remove("disable");
    userAnswer.classList.remove("correct");


    enterText();

    if (document.querySelector(".ans.disable")) {
        showHiddenAnswer();
    }
}

//the function make the question change and the cards came back to the original color- if the user was worng
function nextQuestionWorng(userAnswer, correctAnswer) {
    document.querySelector(".answer-place").classList.remove("disable");
    userAnswer.classList.remove("worng");
    correctAnswer.classList.remove("correct");

    enterText();

    if (document.querySelector(".ans.disable")) {
        showHiddenAnswer();
    }
}

//the function opens the losing page and closing the game page
function loseMessege(userAnswer, correctAnswer) {
    //remove the game page
    document.querySelector(".game").classList.add("inactive");

    //add losing page
    document.querySelector(".lose-page").classList.remove("inactive");


    //returns the cards to the right color
    document.querySelector(".answer-place").classList.remove("disable");
    userAnswer.classList.remove("worng");
    correctAnswer.classList.remove("correct");

    document.querySelector(".try-again").addEventListener("click", backToGame);
    currQues = 0;
}

//the function opens the wining page and closing the game page
function winMessege(userAnswer, correctAnswer) {
    document.querySelector(".game").classList.add("inactive");

    document.getElementById("money-bank").innerHTML = quesValue[currQues + 1];

    //remove inactive class from wining page
    document.querySelector(".win-page").classList.remove("inactive");

    document.querySelector(".answer-place").classList.remove("disable");
    userAnswer.classList.remove("worng");
    correctAnswer.classList.remove("correct");
    currQues = 0;
}

//the function make 2 answer and the button disapper.it keep that the correct answer will stay
function onClickHelp(e) {
    var allNotes = document.querySelectorAll(".ans");

    for (var i = 0; i < 2; i++) {
        //if the answer we wnat to disapper is the right one
        if (allNotes[i].textContent == termList[currQues].ans0) {
            //the next 2 answer wiil disapper
            allNotes[i + 2].style.visibility = "hidden";
            allNotes[i + 2].classList.add("disable");
        }
        else {
            //disapper this answer
            allNotes[i].style.visibility = "hidden";
            allNotes[i].classList.add("disable");
        }
    }

    //disapper the button
    e.currentTarget.classList.add("disable");
    e.currentTarget.style.visibility = "hidden";
}

//make a random array of the qustion didnwt use it in this program, an option for update
function createQuessOrder() {
    for (var i = 0; i < termList.length; i++) {
        quessOrder.push(i);
    }
    quessOrder = shuffle(quessOrder);
}

//init the game
function backToGame() {
    document.querySelector(".game").classList.remove("inactive");

    //remove inactive class from wining page
    document.querySelector(".lose-page").classList.add("inactive");


    for (var i = 0; i < document.querySelectorAll(".heart").length; i++) {
        document.querySelectorAll(".heart")[i].style.visibility = "visible";
    }

    startGame();
}

//show hidden buttons of help
function showHiddenAnswer() {
    document.querySelector(".ans.disable").style.visibility = "visible";
    document.querySelector(".ans.disable").classList.remove("disable");
    document.querySelector(".ans.disable").style.visibility = "visible";
    document.querySelector(".ans.disable").classList.remove("disable");
}

/**
 * take orgnaiz array and shffel it
 * @param {Array} arr 
 */
function shuffle(arr) {
    var tmp = arr.slice();
    for (var i = 0; i < arr.length; i++) {
        var index = Math.floor(Math.random() * tmp.length);
        arr[i] = tmp[index];
        tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
    }
    return arr;
}

function onClickI() {
    // document.querySelector(".home-page").classList.add("inactive");
    // document.querySelector(".info").classList.remove("inactive");
    // void document.querySelector(".info").offsetWidth;
    document.querySelector(".info").classList.add("transition");
    document.querySelector(".play-icon").addEventListener("click", onClickPlay);

}

function onClickPlay() {
    
    document.querySelector(".info").classList.remove("transition");
    // document.querySelector(".home-page").classList.remove("inactive");

    // document.querySelector(".info").classList.add("inactive");
}


// // round number to start with 5 2 or 1
// function smoothStep(n){
//     let base = Math.floor(Math.log10(n));
//     let count = n / Math.pow(10, base);
//     count = Math.floor(count / .5) * .5;
//     return count * Math.pow(10, base);
// }

// adds commas to number
function numCommas(n){
    return n > 1 ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : n;
}

// return how much money a question worth
// arr = array of questions  
// n = number of question
// maxScore = value for last question
// after 40 something questions reapet values
function questionValue(arr, n, maxScore = 1000000) {
    n++;
    let count = Math.floor((Math.log10(maxScore) - 1) * 9 + 2);
    let stride = count / arr.length;
    let fraq = stride - Math.floor(stride);
    stride = stride - fraq;
    // if(!stride)
    //     throw new Error("Invalid stride, the {maxScore} and {arr.length} of the parameters given aren't valid together");
    n = n * stride + Math.floor(Math.fround(fraq * n));
    return ((n-1) % 9 + 1) * 5 * Math.pow(10,Math.floor((n - 1) / 9));
}