    ☕Cadastro de Usuários - CRUD Café

Um sistema simples de cadastro de usuários feito com HTML, CSS e JavaScript puro, com uma interface estilizada com tema de cafeteria/barista.

    🚀 Funcionalidades
✔️ Criar usuários (nome, idade, email e ID)
✔️ Editar usuários existentes
✔️ Remover usuários individuais
✔️ Limpar toda a lista
✔️ Ordenação:
     - A-Z
     - Mais recente
     - Mais antigo
✔️ Validação de dados
✔️ Interface estilizada com tema café
✔️ Layout responsivo básico

    🎨 Estilo do Projeto
O sistema possui um visual inspirado em cafeteria/barista, com:

Paleta bege, marrom e tons de café ☕
Layout em formato de “painel/janela”
Seções separadas (formulário, ordenação e lista)
Botões estilizados com hover e transições
Fundo com imagem temática de café

    📂 Estrutura do projeto

/projeto
 │
 ├── index.html
 ├── style.css
 ├── script.js
 └── cafe-bg.jpg

- Como funciona o CREATE?
   O CREATE funciona quando o usuário preenche os campos e clica em “Salvar usuário”. Os dados são validados e adicionados no array usuarios usando usuarios.push().
- Como os dados são salvos?
   Os dados são salvos temporariamente no array usuarios, apenas na memória do navegador. Se atualizar a página, os dados são perdidos.
- Onde está o UPDATE?
   O UPDATE está na parte em que o usuário clica em “Editar” e depois salva novamente. Os dados antigos são substituídos usando usuarios[editandoIndex].
- Qual parte foi mais difícil?
  A parte mais difícil foi a lógica de edição dos usuários, principalmente controlar qual usuário estava sendo editado e atualizar a lista dinamicamente sem recarregar a página.
