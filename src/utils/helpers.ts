import Swal from "sweetalert2";

export const swalConfirm = (msg:string, title:string, cText:string) => {
  try {
    const result = Swal.fire({
      title: title || "Are you sure",
      text: msg ? msg : "you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: cText || "Yes, Confirm",
      allowOutsideClick: false,
    });
    return result;
  } catch (e) {
    // Fail!
    console.error(e);
    return false;
  }
};

//Error Message
export const swalError = (msg:string | any, title = "Oops...") => {
  try {
    const result = Swal.fire({
      icon: "error",
      title: title,
      text: msg,
      allowOutsideClick: false,
    });
    return result;
  } catch (e) {
    // Fail!
    console.error(e);
    return false;
  }
};

//Success Message
export const swalSuccess = (
  text:string | any = "Your work has been saved!",
  title = "Success!",
  html = false
) => {
  try {
    let result = null;
    if (html != false) {
      result = Swal.fire({
        icon: "success",
        title: title,
        html: html,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 2500,
      });
    } else {
      result = Swal.fire({
        icon: "success",
        title: title,
        text: text,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 2500,
      });
    }
    return result;
  } catch (e) {
    // Fail!
    console.error(e);
    return false;
  }
};