var empty = "      ";
const enter = "\n";
const txtInput = document.querySelector("#txtInput");
const txtEmo = document.querySelector("#txtEmo");
const outputEmo = document.querySelector(".outputEmo");
const btInput = document.querySelector(".btInput");
const btCopy = document.querySelector(".copy");

btInput.addEventListener("click", emobetPrompt);
btCopy.addEventListener("click", emoCopy);

function emoCopy() {
    outputEmo.select();
    navigator.clipboard.writeText(outputEmo.value);
}

function emobetPrompt () {
    try {
        let txt = txtInput.value;
        if (!txt) {throw "Masukkan kalimatmu"}
        let emo = txtEmo.value;
        if (!emo) {throw "Masukkan minimal satu emoji"}
        
        let arrEmo = [];

        if (emo.search(",")>0) {
            let temp="";
            emo += ",";
            
            for (let i=0;i<emo.length;i++) {
                if (emo.charAt(i)==",") {
                    if (temp.length>0) {arrEmo.push(temp); temp=""}
                } else {
                    temp += emo.charAt(i)
                }
            }

            emobetGenerator(txt,arrEmo);
        } else {
            emobetGenerator(txt,emo);
        }
    } catch (error) {
        alert(error);
    }
}

function emobetGenerator (textInput, emo="#"){
let out = "";
textInput = textInput.toString();

if (Array.isArray(emo)) {
    for (let i=0;i<textInput.length;i++) {out += getEmobet(textInput.charAt(i), emo[(i%emo.length)])}
} else {
    for (let i=0;i<textInput.length;i++) {out += getEmobet(textInput.charAt(i), emo)}
}


outputEmo.value = out;
return out;
}

function getEmobet(letter, emo){
try {
if (letter.length!=1) {throw "Masukkan SATU HURUF saja."}
if (!emo.length>0) {throw "Masukkan emojinya."}
letter = letter.toString();
letter = letter.toLowerCase();
let out;

switch (letter) {
case " ": out=getEmoPart("//", emo); break;
case ".": out=getEmoPart("==/==", emo); break;
case ",": out=getEmoPart(" =/==", emo); break;
case "!": out=getEmoPart(" =/ =/ =// =", emo); break;
case "?": out=getEmoPart("===/  =/ ==/ =// =", emo); break;
case "+": out=getEmoPart(" =/===/ =", emo); break;
case "-": out=getEmoPart("/===/", emo); break;
case "/": out=getEmoPart(" =//===// =", emo); break;
case "*": out=getEmoPart("= =/ =/= =", emo); break;
case "1": out=getEmoPart("==/ =/ =/ =/===", emo); break;
case "2": out=getEmoPart(" =/= =/  =/ =/===", emo); break;
case "3": out=getEmoPart("==/  =/ =/  =/==", emo); break;
case "4": out=getEmoPart("= =/= =/===/  =/  =", emo); break;
case "5": out=getEmoPart("===/=/ =/  =/==", emo); break;
case "6": out=getEmoPart("===/=/===/= =/===", emo); break;
case "7": out=getEmoPart("===/= =/  =/  =/  =", emo); break;
case "8": out=getEmoPart("===/= =/===/= =/===", emo); break;
case "9": out=getEmoPart("===/= =/===/  =/===", emo); break;
case "0": out=getEmoPart("===/= =/= =/= =/===", emo); break;
case "a": out=getEmoPart("===/= =/===/= =/= =", emo); break;
case "b": out=getEmoPart("==/= =/==/= =/==", emo); break;
case "c": out=getEmoPart("===/=/=/=/===", emo); break;
case "d": out=getEmoPart("==/= =/= =/= =/==", emo); break;
case "e": out=getEmoPart("===/=/===/=/===", emo); break;
case "f": out=getEmoPart("===/=/===/=/=", emo); break;
case "g": out=getEmoPart("===/=/= =/= =/===", emo); break;
case "h": out=getEmoPart("= =/= =/===/= =/= =", emo); break;
case "i": out=getEmoPart("===/ =/ =/ =/===", emo); break;
case "j": out=getEmoPart("  =/  =/= =/= =/===", emo); break;
case "k": out=getEmoPart("= =/==/=/==/= =", emo); break;
case "l": out=getEmoPart("=/=/=/=/===", emo); break;
case "m": out=getEmoPart(" = =/= = =/= = =", emo); break;
case "n": out=getEmoPart("===/= =/= =", emo); break;
case "o": out=getEmoPart("===/= =/===", emo); break;
case "p": out=getEmoPart("===/= =/===/=/=", emo); break;
case "q": out=getEmoPart("===/= =/===/ =/  =", emo); break;
case "r": out=getEmoPart("===/= =/==/= =/= =", emo); break;
case "s": out=getEmoPart("===/=/===/  =/===", emo); break;
case "t": out=getEmoPart("===/ =/ =/ =/ =", emo); break;
case "u": out=getEmoPart("= =/= =/= =/= =/===", emo); break;
case "v": out=getEmoPart("= =/= =/= =/= =/ =", emo); break;
case "w": out=getEmoPart("= = =/= = =/ = =", emo); break;
case "x": out=getEmoPart("= =/= =/ =/= =/= =", emo); break;
case "y": out=getEmoPart("= =/= =/===/ =/ =", emo); break;
case "z": out=getEmoPart("===/  =/ =/=/===", emo); break;
default: throw letter + " tidak bisa diubah.";
}

return out + enter + enter;

} catch (error) {
    console.log(error);
    return "";
}

}

function getEmoPart(structure, emo) {
/*
Usage:
"/" to enter
" " to add spacing
"*all other characters*" for masking
*/

let out="";


try {
    structure = structure.toString();
    if ((structure.length==0) || (emo.length==0)) {
        throw "Masukkan semua parameter";
    }

    for (let i=0;i<structure.length;i++) {
        if (structure.charAt(i)==" ") {
            out+=empty;
        } else if (structure.charAt(i)=="/") {
            out+=enter;
        } else {
            out+=emo;
        }
    }
    return out;
} catch (error) {
    console.log("Ada yang salah.\nError: " + error);
    return "";
}
}
