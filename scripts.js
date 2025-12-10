const estudantes = [
    { name: 'Rogerio', testGrade: 7},
    { name: 'Mario', testGrade: 5},
    { name: 'Miguel', testGrade: 8},
    { name: 'Laudeci', testGrade: 9},
    { name: 'Maria', testGrade: 3},
    { name: 'Joao', testGrade: 2},
    { name: 'Rodolfo', testGrade: 10},
];

const newEstudantes = estudantes.map(estudante => {
    return {
        name: estudante.name,
        // mantém o rótulo exibido com acento
        status: estudante.testGrade >= 5 ? 'Aprovado' : 'Recuperação'
    };
});

const lista = document.getElementById("lista");
const filtro = document.getElementById("filtro");

// função utilitária que remove acentos e deixa em minúsculas
function normalizeText(str) {
    return str
        .normalize('NFD')                 // separa diacríticos
        .replace(/\p{Diacritic}/gu, '')   // remove diacríticos (acentos)
        .toLowerCase();
}

// Função para renderizar os cards
function renderLista(filtroStatus) {
    lista.innerHTML = "";

    newEstudantes
        .filter(est => {
            if (filtroStatus === "todos") return true;
            // compara normalizado (sem acento, em minúsculas)
            return normalizeText(est.status) === normalizeText(filtroStatus);
        })
        .forEach(est => {
            const div = document.createElement("div");
            div.classList.add("card");

            const statusClass = est.status === 'Aprovado' ? 'aprovado' : 'recuperacao';

            div.innerHTML = `
                <span>${est.name}</span>
                <span class="${statusClass}">${est.status}</span>
            `;

            lista.appendChild(div);
        });
}

// Renderiza tudo no início
renderLista("todos");

// Atualiza quando muda o filtro
filtro.addEventListener("change", () => {
    renderLista(filtro.value);
});
