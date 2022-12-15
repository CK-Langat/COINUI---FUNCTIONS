


// const history = document.getElementById('history');
const input = document.getElementById('input1');
const input1 = document.getElementById('input11');

const engaged = document.getElementById("engaged")
const engaged1 = document.getElementById("engaged1")
const next = document.getElementById("next")
const previous = document.getElementById("previous")
const finished = document.getElementById("finished")
const finished1 = document.getElementById("finished1")
const previousClear = document.getElementById("previous-clear")
const nextClear = document.getElementById("next-clear")
const clearPass = document.getElementById("clear-pass")
const clearEmail = document.getElementById("clear-email")

let positioninput = document.getElementById("input2");
let positioninput1 = document.getElementById("input21");
const cursor = document.getElementById('cursor');
let cursorPosition = -1
function focusAndMoveCursorToTheEnd(e) {
    input.focus();


    const range = document.createRange();
    const selection = window.getSelection();
    const { childNodes } = input;
    const lastChildNode = childNodes && childNodes.length - 1;

    range.selectNodeContents(lastChildNode === -1 ? input : childNodes[lastChildNode]);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
}

function handleCommand(command) {
    const line = document.createElement('DIV');

    line.textContent = `C:\\WIKIPEDIA > ${command}`;

    // history.appendChild(line);
}

// Every time the selection changes, add or remove the .noCursor
// class to show or hide, respectively, the bug square cursor.
// Note this function could also be used to enforce showing always
// a big square cursor by always selecting 1 chracter from the current
// cursor position, unless it's already at the end, in which case the
// #cursor element should be displayed instead.
document.addEventListener('selectionchange', (e) => {
    // console.log('selectionchange func called')

    //     if (document.activeElement.id !== 'input2') return;
    let select = 'selectionchange'


    // console.log(select, positioninput)
    // const range = window.getSelection().getRangeAt(0);
    // console.log('currently at', e.target.activeElement.id)
    const active = e.target.activeElement.id
    removeBlinkingCursor(active)
    const start = $(`#${active}`)[0].selectionStart;;
    cursorPosition = start
    const end = $(`#${active}`)[0].selectionEnd;;

    let inputSource = active == 'input1' ? input : input1


    const length = inputSource.value.length;
    // console.log("selection changed...")

    let currentOutput = null


    currentOutput = active == 'input1' ? positioninput : positioninput1
    inactiveOutput = active == 'input1' ? positioninput1 : positioninput

    inactiveOutput.classList.add('noCaret')

    let temp = ""
    for (let i = 0; i < currentOutput.children.length; i++) {
        // if(start == positioninput.children.length){
        // continue
        // }
        if (i == start || (start != end && (i < end && i >= start))) {
            temp += `<span class="black">${currentOutput.children[i].textContent}</span>`
            // positioninput.children[i].classList.add('black')
            // console.log(positioninput.children[i].textContent)
        }
        else {
            temp += `<span>${currentOutput.children[i].textContent}</span>`
            // positioninput.children[i].classList.remove('black')

        }

    }
    currentOutput.innerHTML = temp
    if (end < length) {
        currentOutput.classList.add('noCaret');
    } else {
        currentOutput.classList.remove('noCaret');
    }
});

input.addEventListener('input', onInputFunc);
input.addEventListener('blur', hideCarret);
input.addEventListener('focus', onfocus);
input1.addEventListener('input', onInputFunc);
input1.addEventListener('blur', hideCarret);
input1.addEventListener('focus', onfocus);

function onInputFunc(e) {
    const origin = e.target.id
    inputSource = origin == 'input1' ? input : input1
    // If we paste HTML, format it as plain text and break it up
    // input individual lines/commands:
    refresh(origin)
    // If we press delete key, re-render the output
    // so that it reflects the current state of the 
    // input
    // also check if we are deleting backwards or
    // deleteing forwards
    if (e.inputType.match('delete')) {
        if (cursorPosition > 0 && e.inputType == 'deleteContentBackward') {
            cursorPosition--
        }
        refresh(origin)
    }
    if (input.childElementCount > 0) {
        const lines = inputSource.innerText.replace(/\n$/, '').split('\n');
        const lastLine = lines[lines.length - 1];

        for (let i = 0; i <= lines.length - 2; ++i) {
            handleCommand(lines[i]);
        }

        inputSource.textContent = lastLine;

        //focusAndMoveCursorToTheEnd();
    }

    // If we delete everything, display the square caret again:
    let outputToTarget = null
    outputToTarget = origin == 'input1' ? positioninput : positioninput1

    if (inputSource.value === 0) {
        outputToTarget.classList.remove('noCaret');
    }
}

document.addEventListener('keydown', (e) => {
    // If some key is pressed outside the input, focus it and move the cursor
    // to the end:
    // if (e.target !== input) focusAndMoveCursorToTheEnd();
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();

        handleCommand(input.textContent);
        input.textContent = '';
        //focusAndMoveCursorToTheEnd();
    }
});

// Set the focus to the input so that you can start typing straigh away:
// input.focus();


function refresh(id) {

    removeBlinkingCursor(id)
    let outputToTarget = null
    outputToTarget = id == 'input1' ? positioninput : positioninput1
    inputSource = id == 'input1' ? input : input1

    inactiveOutput = id == 'input1' ? positioninput1 : positioninput
    inactiveOutput.classList.add('noCaret')

    outputToTarget.innerHTML = ''
    const inputText = inputSource.value
    // console.log({ inputText })
    for (let i = 0; i < inputText.length; i++) {
        var textspan = document.createElement("span");
        textspan.innerText = inputText[i]
        if (i == cursorPosition) {
            textspan.classList.add('black')
        }
        outputToTarget.appendChild(textspan)
    }

    const end = $(`#${id}`)[0].selectionEnd;;


    const length = inputSource.value.length;
    // console.log({ end, length })
    if (end < length) {
        // console.log('removing carret')
        outputToTarget.classList.add('noCaret');
    } else {
        outputToTarget.classList.remove('noCaret');
    }
    // console.log('Refreshed..')
    //console.log({length:positioninput.children.length})

}

function hideCarret(e) {
    const id = e.target.id
    if (!e.target.value && id == 'input1') {
        clearEmail.click()
    }
    if (!e.target.value && id == 'input11') {
        clearPass.click()
    }
    console.log('blurred...', id)
    outputToTarget = id == 'input1' ? positioninput : positioninput1
    outputToTarget.classList.add('noCaret');
    //removeBlinkingCursor(id)
}

function onfocus(e) {
    const id = e.target.id
    const data = input.value
    const data1 = input1.value

    if (!data && id == 'input11') {
        nextClear.click()
    } else if (!data1 && id == 'input1') {
        previousClear.click()
    } else if (data && id == 'input11') {
        next.click()
    } else if (data1 && id == 'input1') {
        previous.click()
    }

}

// looop through all the spans of the output that is supposed to be 
// inactive and remove the 'black' class
function removeBlinkingCursor(id) {
    let outputToTarget = null
    // check the id of the source input and determine which output to alter
    outputToTarget = id == 'input1' ? positioninput1 : positioninput

    if (outputToTarget.children.length == 0) return
    // console.log(outputToTarget.children)
    for (let i = 0; i < outputToTarget.children.length; i++) {
        outputToTarget.children[i].classList.remove('black')
    }

}

positioninput.classList.add('noCaret')
positioninput1.classList.add('noCaret')
