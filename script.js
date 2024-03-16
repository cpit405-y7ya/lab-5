const VALID_TYPES = [
    "image/jpeg",
];

let gallery = document.querySelector("#gallery");

gallery.addEventListener("dragover", function (e) {
  e.preventDefault();
});

gallery.addEventListener("drop", handleDrop);

function handleDrop(e) {
  e.preventDefault();

  console.log(e.dataTransfer.files);
  for (let file of e.dataTransfer.files) {
    if(!isValidType(file.type)){
        // TODO: handle file type is not supported exception
        continue;
    }

    addGalleryItem(file);
  }
}

function deleteGalleryItem(e) {
  e.target.closest(".gallery-item").remove();
}

function addGalleryItem(file){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("gallery-item");

      const img = document.createElement("img");
      img.src = reader.result;
      img.classList.add("gallery-image");

      const overlay = document.createElement("div");
      overlay.classList.add("gallery-overlay");

      let deleteButton = document.createElement("button");
      deleteButton.classList.add("gallery-delete");
      deleteButton.textContent = "X";

      deleteButton.addEventListener("click", deleteGalleryItem);

      overlay.appendChild(deleteButton);
      itemDiv.appendChild(overlay);
      itemDiv.appendChild(img);
      gallery.appendChild(itemDiv);
    };
}


function isValidType(type){
    return VALID_TYPES.includes(type);
}
