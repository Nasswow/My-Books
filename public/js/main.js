$(document).ready(() => {
  $(".delete-book").on("click", (e) => {
    $target = $(e.target);
    const id = $target.attr("data-id");
    $.ajax({
      type: "DELETE",
      url: "/books/" + id,
      success: (response) => {
        alert("Deleting Book");
        window.location.href = "/books";
      },
      error: (err) => {
        console.log(err);
      },
    });
  });
});
