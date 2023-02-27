var empty = "      ";
var enter = "\n";
const txtInput = document.querySelector("#txtInput");
const txtEmo = document.querySelector("#txtEmo");
const outputEmo = document.querySelector(".outputEmo");
const btInput = document.querySelector(".btInput");
const btCopy = document.querySelector(".copy");

var emoTemplate = {
    " ": "//",
    ".": "==/==",
    ",": " =/==",
    "!": " =/ =/ =// =",
    "?": "===/  =/ ==/ =// =",
    "+": " =/===/ =",
    "-": "/===/",
    "/": " =//===// =",
    "*": "= =/ =/= =",
    "1": "==/ =/ =/ =/===",
    "2": "===/  =/===/=/===",
    "3": "===/  =/===/  =/===",
    "4": "= =/= =/===/  =/  =",
    "5": "===/=/===/  =/===",
    "6": "===/=/===/= =/===",
    "7": "===/= =/  =/  =/  =",
    "8": "===/= =/===/= =/===",
    "9": "===/= =/===/  =/===",
    "0": "===/= =/= =/= =/===",
    "A": "===/= =/===/= =/= =",
    "B": "==/= =/==/= =/==",
    "C": "===/=/=/=/===",
    "D": "==/= =/= =/= =/==",
    "E": "===/=/===/=/===",
    "F": "===/=/===/=/=",
    "G": "===/=/= =/= =/===",
    "H": "= =/= =/===/= =/= =",
    "I": "===/ =/ =/ =/===",
    "J": "  =/  =/= =/= =/===",
    "K": "= =/==/=/==/= =",
    "L": "=/=/=/=/===",
    "M": " = =/= = =/= = =",
    "N": "===/= =/= =",
    "O": "===/= =/===",
    "P": "===/= =/===/=/=",
    "Q": "===/= =/===/ =/  =",
    "R": "===/= =/==/= =/= =",
    "S": "===/=/ = /  =/===",
    "T": "===/ =/ =/ =/ =",
    "U": "= =/= =/= =/= =/===",
    "V": "= =/= =/= =/= =/ =",
    "W": "= = =/= = =/ = =",
    "X": "= =/= =/ =/= =/= =",
    "Y": "= =/= =/===/ =/ =",
    "Z": "===/  =/ =/=/===",
    "a": "===/  =/===/= =/===",
    "b": "=/=/===/= =/===",
    "c": "===/=/===",
    "d": "  =/  =/===/= =/===",
    "e": " =/= =/===/=/ ==",
    "f": " ==/=/===/=/=",
    "g": "===/= =/===/  =/==",
    "h": "=/=/===/= =/= =",
    "i": " =// =/ =/ =",
    "j": " =// =/ =/==",
    "k": "=/=/= =/==/= =",
    "l": "=/=/=/=/=",
    "m": " = =/= = =/= = =",
    "n": "===/= =/= =",
    "o": "===/= =/===",
    "p": "===/= =/===/=/=",
    "q": "===/= =/===/  =/  =",
    "r": "===/=/=",
    "s": " ==/=/ = /  =/==",
    "t": "=/=/==/=/==",
    "u": "= =/= =/===",
    "v": "= =/= =/ =",
    "w": "= = =/= = =/ = =",
    "x": "= =/ =/= =",
    "y": "= =/= =/===/  =/===",
    "z": "===/  =/ =/=/==="
}

btInput.addEventListener("click", executor);
btCopy.addEventListener("click", copyText);
txtInput.addEventListener("keypress", function (ev) {
    txtInput.classList.remove("is-invalid");
    if (ev.keyCode == 13) {
        btInput.click();
    }
})
txtEmo.addEventListener("keypress", function (ev) {
    txtEmo.classList.remove("is-invalid");
    if (ev.keyCode == 13) {
        btInput.click();
    }
})

function copyText() {
    outputEmo.select();
    navigator.clipboard.writeText(outputEmo.value);
}

function executor() {
    let txt = txtInput.value;
    let emo = txtEmo.value;

    if (!txt || !emo) {
        if (!txt) { txtInput.classList.add("is-invalid"); }
        if (!emo) { txtEmo.classList.add("is-invalid"); }
    } else { 
        txtInput.classList.remove("is-invalid");
        txtEmo.classList.remove("is-invalid");
        let arrEmo = [];

        if (emo.search(",") > 0) {
            let temp = "";
            emo += ",";
            
            for (let i = 0; i < emo.length; i++) {
                if (emo.charAt(i) == ",") {
                    if (temp.length > 0) {
                        arrEmo.push(temp);
                        temp = ""
                    }
                } else {
                    temp += emo.charAt(i)
                }
            }
            outputEmo.value = emobetGenerator(txt, arrEmo);
        } else {
            outputEmo.value = emobetGenerator(txt, emo);
        }
    }
}

function emobetGenerator(textInput, emo = "#") {
    let out = "";
    textInput = textInput.toString();

    if (Array.isArray(emo)) {
        for (let i = 0; i < textInput.length; i++) {
            out += getEmobet(textInput.charAt(i), emo[(i % emo.length)])
        }
    } else {
        for (let i = 0; i < textInput.length; i++) {
            out += getEmobet(textInput.charAt(i), emo)
        }
    }

    return out;
}

function getEmobet(letter, emo) {
    letter = letter.toString();
    let out;

    if (emoTemplate[letter] == undefined) {
        console.log(letter + " tidak bisa diubah.");
        out = "";
    } else {
        out = getEmoPart(emoTemplate[letter], emo);
    }

    return out + enter + enter;
}

function getEmoPart(structure, emo = "#") {
    /*
    Usage:
    "/" to enter
    " " to add spacing
    "*all other characters*" for masking
    */

    let out = "";

    for (let i = 0; i < structure.length; i++) {
        if (structure.charAt(i) == " ") {
            out += empty;
        } else if (structure.charAt(i) == "/") {
            out += enter;
        } else {
            out += emo;
        }
    }
    return out;
}