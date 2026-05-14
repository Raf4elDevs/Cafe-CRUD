let usuarios = [];
let editandoIndex = null;

const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputEmail = document.getElementById("email");
const inputId = document.getElementById("Id");

const ordenacao = document.getElementById("ordenacao");
const btnSalvar = document.getElementById("btnSalvar");
const btnLimpar = document.getElementById("btnLimpar");

const lista = document.getElementById("lista");
const mensagemVazia = document.getElementById("mensagemVazia");


// TOAST
function mostrarToast(texto, cor) {

    Toastify({
        text: texto,
        duration: 3000,

        gravity: "top",
        position: "right",

        style: {
            background: cor,
            borderRadius: "10px"
        }

    }).showToast();
}


// ADICIONA USUÁRIO
btnSalvar.addEventListener("click", () => {

    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value.trim());
    const email = inputEmail.value.trim();
    const id = inputId.value.trim();


    // VALIDAÇÕES
    if (nome.length < 3) {

        mostrarToast(
            "O nome precisa ter pelo menos 3 letras.",
            "#c85a4a"
        );

        return;
    }

    if (!idade || idade <= 17 || idade > 120) {

        mostrarToast(
            "Digite uma idade válida.",
            "#c85a4a"
        );

        return;
    }

    if (!email.includes("@") || !email.includes(".")) {

        mostrarToast(
            "Digite um email válido.",
            "#c85a4a"
        );

        return;
    }

    if (id.length !== 8) {

        mostrarToast(
            "Digite um ID com 8 dígitos.",
            "#c85a4a"
        );

        return;
    }


    // CREATE
    if (editandoIndex === null) {

        usuarios.push({
            nome,
            idade,
            email,
            id,
            criadoEm: new Date()
        });

        mostrarToast(
            "Usuário salvo com sucesso!",
            "#5d8839"
        );

    } else {

        // UPDATE
        usuarios[editandoIndex] = {
            nome,
            idade,
            email,
            id,
            criadoEm: usuarios[editandoIndex].criadoEm
        };

        editandoIndex = null;

        btnSalvar.textContent = "Salvar";

        mostrarToast(
            "Usuário atualizado!",
            "#8b6a45"
        );
    }

    limparCampos();
    listar();
});


// LIMPAR LISTA
btnLimpar.addEventListener("click", () => {

    if (confirm("Tem certeza que deseja apagar toda a lista?")) {

        usuarios = [];

        mostrarToast(
            "Lista apagada com sucesso!",
            "#c85a4a"
        );

        listar();
    }
});


// LISTAR
function listar() {

    lista.innerHTML = "";

    if (usuarios.length === 0) {

        mensagemVazia.style.display = "block";
        return;

    } else {

        mensagemVazia.style.display = "none";
    }

    usuarios.forEach((usuario, index) => {

        const li = document.createElement("li");

        const texto = document.createElement("span");

        texto.textContent =
            `${usuario.nome} | ${usuario.email} | ${usuario.idade} anos | ID: ${usuario.id}`;


        // BOTÃO EDITAR
        const btnEditar = document.createElement("button");

        btnEditar.textContent = "Editar";

        btnEditar.addEventListener("click", () => {
            editar(index);
        });


        // BOTÃO REMOVER
        const btnRemover = document.createElement("button");

        btnRemover.textContent = "Remover";

        btnRemover.addEventListener("click", () => {
            remover(index);
        });


        const divBotoes = document.createElement("div");

        divBotoes.classList.add("botoes-lista");

        divBotoes.appendChild(btnEditar);
        divBotoes.appendChild(btnRemover);

        li.appendChild(texto);
        li.appendChild(divBotoes);

        lista.appendChild(li);
    });
}


// EDITAR
function editar(index) {

    const usuario = usuarios[index];

    inputNome.value = usuario.nome;
    inputIdade.value = usuario.idade;
    inputEmail.value = usuario.email;
    inputId.value = usuario.id;

    editandoIndex = index;

    btnSalvar.textContent = "Atualizar";

    mostrarToast(
        "Modo edição ativado!",
        "#8b6a45"
    );
}


// REMOVER
function remover(index) {

    usuarios.splice(index, 1);

    mostrarToast(
        "Usuário removido!",
        "#c85a4a"
    );

    listar();
}


// LIMPAR CAMPOS
function limparCampos() {

    inputNome.value = "";
    inputIdade.value = "";
    inputEmail.value = "";
    inputId.value = "";
}


// ORDENAÇÃO
ordenacao.addEventListener("change", () => {

    if (ordenacao.value === "az") {

        usuarios.sort((a, b) =>
            a.nome.localeCompare(b.nome)
        );
    }

    if (ordenacao.value === "novo") {

        usuarios.sort((a, b) =>
            b.criadoEm - a.criadoEm
        );
    }

    if (ordenacao.value === "antigo") {

        usuarios.sort((a, b) =>
            a.criadoEm - b.criadoEm
        );
    }

    listar();
});