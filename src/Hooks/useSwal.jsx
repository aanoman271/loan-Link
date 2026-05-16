import Swal from "sweetalert2";

const useSwal = () => {
  const success = (title = "Success!", text = "") => {
    Swal.fire({
      icon: "success",
      title,
      text,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const err = (title = "Error!", text = "") => {
    Swal.fire({ icon: "error", title, text });
  };

  const confirm = (title = "Are you sure?", text = "") => {
    return Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
  };

  const toast = (title = "Success!", icon = "success") => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      icon,
      title,
    });
  };

  return { success, err, confirm, toast };
};

export default useSwal;

