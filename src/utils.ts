import { KaboomCtx } from "kaboom";

export function displayDialogue(text: string, onDisplayEnd: () => void) {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");
  const closeButton = document.getElementById("close");

  let index = 0;
  let currentText = "";
  let timeout = 0;

  function displayText() {
    if (dialogueUI && dialogue) {
      dialogueUI.style.display = "block";

      if (index < text.length) {
        currentText += text[index];
        dialogue.innerHTML = currentText;
        index++;
      } else {
        // Dialogue display complete (optional: handle completion here)
        return;
      }

      timeout = setTimeout(displayText, 0);
    } else {
      // Handle cases where dialogueUI or dialogue might not exist
      console.warn("Dialogue elements not found!");
    }
  }

  if (dialogueUI && dialogue) {
    displayText(); // Start the text display process

    if (closeButton) {
      const onCloseBtnClick = () => {
        onDisplayEnd();
        dialogueUI.style.display = "none";
        dialogue.innerHTML = "";
        clearTimeout(timeout); // Assuming 'timeout' variable is in scope here
        closeButton.removeEventListener("click", onCloseBtnClick);
      };
      closeButton.addEventListener("click", onCloseBtnClick);
    }
  }
}
export function setCamScale(k: KaboomCtx) {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    k.camScale(k.vec2(1));
  } else {
    k.camScale(k.vec2(1.5));
  }
}
