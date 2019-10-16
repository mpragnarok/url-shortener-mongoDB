const copyBtn = document.getElementById("copyBtn")

// alert close automatically
$(document).ready(function() {
  // show the alert
  setTimeout(function() {
    $(".alert").alert('close');
  }, 3000);
});

function copyUrl() {
  let copyText = document.getElementById("copyUrl")
  copyText.select()
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy")
}

copyBtn.addEventListener("click", copyUrl)