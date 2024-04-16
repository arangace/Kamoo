export function displayDialogue(text: string, onDisplayEnd: () => void) {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");
  const closeButton = document.getElementById("close");

  let index = 0;
  let currentText = "";
  let timeout = 0;
  let dialogueModalOpen = false;
  if (dialogueUI && dialogue && closeButton) {
    const displayText = () => {
      if (dialogueUI && dialogue) {
        dialogueModalOpen = true;
        dialogueUI.style.display = "block";

        if (index < text.length) {
          currentText += text[index];
          dialogue.innerHTML = currentText;
          index++;
        } else {
          dialogueModalOpen = false;
          // Dialogue display complete (optional: handle completion here)
          return;
        }

        timeout = setTimeout(displayText, 0);
      }
    };
    // Start the text display process
    displayText();

    const handleCloseBtnClick = () => {
      onDisplayEnd();
      dialogueUI.style.display = "none";
      dialogue.innerHTML = "";
      clearTimeout(timeout);
      closeButton.removeEventListener("click", handleCloseBtnClick);
      dialogueModalOpen = false;
    };

    const handleEscapeClick = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseBtnClick();
        document.body.removeEventListener("keydown", handleEscapeClick);
      }
    };

    // Handle close button interactions
    closeButton.addEventListener("click", handleCloseBtnClick);
    if (dialogueModalOpen) {
      document.body.addEventListener("keydown", (e) => handleEscapeClick(e));
    }
  }
}
