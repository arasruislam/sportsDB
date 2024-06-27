// All variable
const handleSearchValue = document.querySelector("#handleSearchValue");
const playerContainer = document.querySelector("#players-container");
const addPlayerName = document.querySelector("#AddPlayerName");


const searchPlayer = (player = "all") => {
  fetch(
    `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${player}`
  )
    .then((res) => res.json())
    .then((data) => {
      showPlayer(data.player);
    });
};

const showPlayer = (players) => {
  playerContainer.innerHTML = players
    .map((player, index) => {
      //   console.log(player.idPlayer);
      return `
            <div class="col player">
              <div class="card h-100">
                <img
                  src="${player?.strThumb}"
                  class="card-img-top"
                  alt="player image"
                />
                <div class="card-body">
                  <h5 class="card-title">${player?.strPlayer}</h5>
                  <p>Nationality: ${player?.strNationality}</p>
                  <p>Team: ${player?.strTeam}</p>
                  <p>Sports: ${player?.strSport}</p>
                  <p>Salary: ${player?.strSigning}</p>
                  <p>Gender: ${player?.strGender}</p>
                  <p class="card-text">${
                    player.strDescriptionEN != null
                      ? player.strDescriptionEN.slice(0, 61)
                      : "No description"
                  }...</p>
                  <div class="social-media d-flex gap-2">
                    <a target="_blank" href="${player?.strFacebook}"
                      ><ion-icon class="fs-4" name="logo-facebook"></ion-icon
                    ></a>
                    <a target="_blank" href="${player?.strTwitter}"
                      ><ion-icon class="fs-4" name="logo-twitter"></ion-icon
                    ></a>
                    <a target="_blank" href="${player?.strInstagram}"
                      ><ion-icon class="fs-4" name="logo-instagram"></ion-icon
                    ></a>
                  </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                  <button id="btn-${index}" onclick="handleAddToCart('${
        player?.strPlayer
      }', 'btn-${index}')" type="button" class="btn btn-success">Add</button>
                  <!-- Model Button -->
                  <button
                    type="button"
                    onclick="handleModalBtn('${player.idPlayer}')"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Details
                  </button>

                  <!-- Details Toggle -->
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog addModelBody">
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
    })
    .join("");
};

const handleAddToCart = (name, buttonId) => {
  let countGroupPlayer = document.querySelector(
    ".count-group-member"
  ).innerText;
  let countPlayer = parseInt(countGroupPlayer);
  countPlayer = countPlayer + 1;
  document.querySelector(".count-group-member").innerText = countPlayer;

  if (countPlayer <= 11) {
    const li = document.createElement("li");
    li.innerText = `${name}`;
    addPlayerName.appendChild(li);

    const button = document.getElementById(buttonId);
    button.innerText = "Added";
    button.classList.remove("btn-success");
    button.classList.add("btn-danger");
    button.disabled = true;
  } else {
    alert("Maximum Group Member Reach");
  }
};

const handleModalBtn = (id) => {
  console.log(id);
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const player = data.players[0];
      document.querySelector(".addModelBody").innerHTML = `
                    <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">
                            ${player?.strPlayer}
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                            <div class="modal-body">
                            <p><strong>Nationality:</strong> ${player.strNationality}</p>                     <p><strong>Team:</strong> ${player.strTeam}</p>
                            <p><strong>Sports:</strong> ${player.strSport}</p>
                            <p><strong>Salary:</strong> ${player.strSigning}</p>
                            <p><strong>Gender:</strong> ${player.strGender}</p>
                            <p><strong>Description:</strong> ${player.strDescriptionEN}</p>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                    </div>
        `;
    });
};

handleSearchValue.addEventListener("click", (e) => {
  const inputValue = document.querySelector("#inputValue").value;
  console.log(inputValue);
  searchPlayer(inputValue);
  document.querySelector("#inputValue").value = "";
});

searchPlayer();
