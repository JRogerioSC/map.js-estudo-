let estudantes = [
  { name: 'Rogerio', testGrade: 7 },
  { name: 'Mario', testGrade: 5 },
  { name: 'Miguel', testGrade: 8 },
  { name: 'Laudeci', testGrade: 9 },
  { name: 'Maria', testGrade: 3 },
  { name: 'Joao', testGrade: 2 },
  { name: 'Rodolfo', testGrade: 10 },
];

const lista = document.getElementById("lista");
const filtro = document.getElementById("filtro");

function normalizeText(str) {
  return str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function gerarStatus(nota) {
  return nota >= 5 ? "Aprovado" : "Recuperação";
}

/* Renderiza lista inteira (usada no carregamento e quando muda filtro) */
function renderLista(filtroStatus) {
  lista.innerHTML = "";

  estudantes
    .filter(est => {
      if (filtroStatus === "todos") return true;
      return normalizeText(gerarStatus(est.testGrade)) === normalizeText(filtroStatus);
    })
    .forEach((est, index) => renderCard(est, index));
}

/* Renderiza apenas um card (cria ou atualiza) */
function renderCard(est, index) {
  const status = gerarStatus(est.testGrade);
  const statusClass = status === "Aprovado" ? "aprovado" : "recuperacao";

  let card = document.querySelector(`[data-id="${index}"]`);
  if (!card) {
    card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", index);

    card.innerHTML = `
      <div class="col nome"></div>
      <div class="col nota"></div>
      <div class="col status"></div>
      <div class="acoes"><button class="editarBtn">Editar</button></div>
    `;

    // evento editar ligado ao botão criado
    card.querySelector(".editarBtn").addEventListener("click", () => editarEstudante(index));
    lista.appendChild(card);
  }

  // Atualiza só os textos dentro do card
  card.querySelector(".nome").textContent = est.name;
  card.querySelector(".nota").textContent = `Nota: ${est.testGrade}`;
  const statusEl = card.querySelector(".status");
  statusEl.textContent = status;
  statusEl.className = "col status " + statusClass;
}

/* Edita somente 1 aluno e atualiza só o card */
function editarEstudante(index) {
  const aluno = estudantes[index];

  const novoNome = prompt("Editar nome:", aluno.name);
  if (novoNome === null || novoNome.trim() === "") return;

  const novaNota = prompt("Editar nota (0 a 10):", String(aluno.testGrade));
  if (novaNota === null || novaNota.trim() === "" || isNaN(novaNota)) return;

  const notaConvertida = Number(novaNota);
  if (notaConvertida < 0 || notaConvertida > 10) {
    alert("A nota deve ser entre 0 e 10.");
    return;
  }

  estudantes[index].name = novoNome;
  estudantes[index].testGrade = notaConvertida;

  // recalc status e atualiza só o card
  renderCard(estudantes[index], index);
}

/* salva filtro no localStorage para permanecer após reload */
filtro.addEventListener("change", () => {
  localStorage.setItem("filtroSelecionado", filtro.value);
  renderLista(filtro.value);
});

/* Carrega filtro salvo e renderiza */
const filtroSalvo = localStorage.getItem("filtroSelecionado") || "todos";
filtro.value = filtroSalvo;
renderLista(filtroSalvo);
