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

//adiciona o usuario
btnSalvar.addEventListener("click", () => {
    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value.trim());
    const email = inputEmail.value.trim();
    const id = inputId.value.trim();

    //alerts
    if (nome.length < 3) {
        alert("O nome precisa ter pelo menos 3 letras.");
        return;
    }
    
    if (!idade || idade <= 17 || idade > 120) {
        alert("Digite uma idade válida.");
        return;
    }       
    if (!email.includes("@") || !email.includes(".")) {
        alert("Digite um email válido.");
        return;
    }
    if (id.length !== 8) {
        alert("Digite um ID com 8 dígitos.");
        return;
    }

    if (editandoIndex === null) {
        usuarios.push({ nome, idade, email, id, criadoEm: new Date() });
    } else {
        usuarios[editandoIndex] = { nome, idade, email, id, criadoEm: usuarios[editandoIndex].criadoEm };
        editandoIndex = null;
        btnSalvar.textContent = "Salvar";
    }

    limparCampos();
    listar();
});

//Excluir toda a lista
btnLimpar.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja apagar toda a lista?")) {
        usuarios = [];
        listar();
    }
});

//lista os usuarios
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
        texto.textContent = `${usuario.nome} | ${usuario.email} | ${usuario.idade} anos | ID: ${usuario.id}`;
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => {
            editar(index);
        });

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

//edita os campos
function editar(index) {
    const usuario = usuarios[index];

    inputNome.value = usuario.nome;
    inputIdade.value = usuario.idade;
    inputEmail.value = usuario.email;
    inputId.value = usuario.id;
    editandoIndex = index;
    btnSalvar.textContent = "Salvar";
}

//remove usuario conforme o pedido
function remover(index) {
    usuarios.splice(index, 1);
    listar();
}

//excluí os campos

function limparCampos() {
    inputNome.value = "";
    inputIdade.value = "";
    inputEmail.value = "";
    inputId.value = "";
}

//ordena com seleção do usuario

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