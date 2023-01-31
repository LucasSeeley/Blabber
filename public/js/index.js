function postBlab(){
    const blab = $("#blab-input").val();
  
    $("#posts").prepend(`<div class="card text-bg-dark" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Anonymous</h5>
      <p class="card-text">${blab}</p>
    </div>
  </div>`);
  }