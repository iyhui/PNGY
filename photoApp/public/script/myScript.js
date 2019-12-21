//---------validate AlphaNumeric
function validateAlpha() {

    var name = document.getElementById("user").value;
    var password = document.getElementById("pwd").value;
    var cpassword = document.getElementById("cpwd").value;


    var nonAlphaNumeric = /[^a-zA-Z0-9]/g;
    if (name.match(nonAlphaNumeric)) {
        alert('Username must contain alphanumeric characters only');
        return false;
    }


    if (!password.match(/^(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?=.*[A-Z])(?=.*[a-z]).*$/)) {
        alert('Your password does not meet requirements');
        return false;
    }

    if (password != cpassword) {
        alert('Passwords do not match!');
        return false;
    }


    return true;

}
//---------validate Length
function validateLength() {

    var name = document.getElementById("user").value;
    var password = document.getElementById("pwd").value;

    if (name.length < 3) {
        alert('Username must be 3 or more alphanumeric characters.');
        return false;
    }

    if (password.length < 8) {
        alert('Password must be 8 characters long.');
        return false;
    }
    return true;

}
//---------validate post

function validatePost() {
    var title = document.getElementById("title").value;
    var description = document.getElementById("desc").value;

    if (title.length < 1) {
        alert('You must enter a title.');
        return false;
    }

    if (description.length < 1) {
        alert('You must enter a description.');
        return false;
    }
    
    var fuData = document.getElementById('fileChooser');
    var FileUploadPath = fuData.value;

    //To check if user upload any file
    if (FileUploadPath == '') {
        alert("Please upload an image");
        return false;

    } else {
        var Extension = FileUploadPath.substring(
            FileUploadPath.lastIndexOf('.') + 1).toLowerCase();

        //The file uploaded is an image

        if (Extension == "gif" || Extension == "png" || Extension == "bmp"
            || Extension == "jpeg" || Extension == "jpg") {

            // To Display
            if (fuData.files && fuData.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#blah').attr('src', e.target.result);
                }

                reader.readAsDataURL(fuData.files[0]);
            }

        }

        //The file upload is NOT an image
        else {
            alert("Photo only allows file types of GIF, PNG, JPG, JPEG and BMP. ");
            return false;
        }
    }

    return true;
}

//---------OnClick Print values
function myFunction() {
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Array.from(formData.entries()).reduce((memo, pair) => ({
            ...memo,
            [pair[0]]: pair[1],
        }), {});
        document.getElementById('output').innerHTML = JSON.stringify(data);

    });
}

