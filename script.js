const VALID_TYPES = [
    "image/jpeg",
];

const gallery = document.querySelector("#gallery");

gallery.addEventListener("dragover", function (e) {
  e.preventDefault();
});

gallery.addEventListener("drop", handleDrop);

function handleDrop(e) {
  e.preventDefault();

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

      const buttons = document.createElement("div");
      buttons.classList.add("gallery-buttons");


      const deleteButton = document.createElement("button");
      deleteButton.classList.add("gallery-delete");
      deleteButton.textContent = "X";

      const previewButton = document.createElement("button");
      previewButton.classList.add("gallery-preview")
      previewButton.textContent = "🔍";
      

      deleteButton.addEventListener("click", deleteGalleryItem);
      previewButton.addEventListener("click", previewImage);

      buttons.appendChild(deleteButton)
      buttons.appendChild(previewButton)
      overlay.appendChild(buttons);
      itemDiv.appendChild(overlay);
      itemDiv.appendChild(img);
      gallery.appendChild(itemDiv);
    };
}

function previewImage(e){
  const selectedImage = e.target.closest(".gallery-item").querySelector("img");

  const previewImage = document.createElement("div");
  previewImage.classList.add("preview-image");

  const image = document.createElement("img");
  image.src = selectedImage.src;

  previewImage.addEventListener("click",handleClosePreview);

  previewImage.appendChild(image);
  gallery.appendChild(previewImage);
}

function handleClosePreview(e){
  const preview = gallery.querySelector(".preview-image");
  if(e.target == preview){
    preview.remove();
  }
}

function isValidType(type){
    return VALID_TYPES.includes(type);
}
