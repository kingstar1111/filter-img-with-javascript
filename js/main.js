let saturate= document.getElementById("saturate");
let contrast= document.getElementById("contrast");
let brightness= document.getElementById("brightness");
let sepia= document.getElementById("sepia");
let grayscale= document.getElementById("grayscale");
let blur= document.getElementById("blur");
let hueRotate= document.getElementById("hue-rotate");
let upload= document.getElementById("upload");
let download= document.getElementById("download");
let img= document.getElementById("img");
let reset = document.querySelector('span');
let imgBox= document.querySelector('.img-box');
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d');

function resetValue(){
    ctx.filter='none';
    saturate.value='100';
    contrast.value='100';
    brightness.value='100';
    sepia.value='0';
    grayscale.value='0';
    blur.value='0';
    hueRotate.value='0';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
reset.addEventListener('click',resetValue)

window.onload=function(){
    reset.style.display= 'none';
    download.style.display= 'none';
    imgBox.style.display= 'none';
}
upload.onchange = function() {
    reset.style.display = 'block';
    download.style.display = 'block';
    imgBox.style.display = 'block';

    const file = upload.files[0];

    if (!file) {
        // Handle the case when no file is selected
        return;
    }

    // Check if the selected file is an image (you can customize the allowed types)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, or GIF).");
        return;
    }

    const reader = new FileReader();

    reader.onload = function() {
        const imgTemp = new Image();

        imgTemp.onload = function() {
            canvas.width = imgTemp.width;
            canvas.height = imgTemp.height;
            ctx.drawImage(imgTemp, 0, 0, canvas.width, canvas.height);
            img.style.display = 'none';
            resetValue();
        };

        imgTemp.src = reader.result;
        img.src = reader.result;
    };

    reader.onerror = function() {
        alert("Error occurred while reading the file.");
    };

    reader.readAsDataURL(file);
};

let filters = document.querySelectorAll("ul li input");
filters.forEach(filter => {
    filter.addEventListener('input', function() {
        ctx.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)

        `;
        ctx.drawImage(img, 0, 0 ,canvas.width ,canvas.height );
    });
});


download.onclick= function(){
    download.href = canvas.toDataURL('image/jpeg',1.0);

}
