# Criar usuário
- [x] O usuário deve poder criar uma conta com nome, e-mail e senha;
- [x] O usuário deve informar uma confirmação de senha;
- [x] O e-mail deve ser único;
- [x] A senha dever ter no mínimo 6 caractéres e no máximo 16 caracteres;

# Atualizar usuário
- [x] O usuário dever poder alterar seu nome, e-mail e senha;
- [ ] O usuário dever poder alterar seu avatar;
- [x] O usuário não pode mudar e-mail para um já cadastrado;
- [x] Ao alterar a senha, deve ser informada a senha antiga;
- [x] Ao alterar a senha, uma confirmação da nova senha deve ser enviada;

# Login
- [x] O usuário deve poder se logar utilizando e-mail e senha;
- [x] O usuário deve permanceer logado por 1d;

# Criar tarefa
- [x] O usuário deve poder criar um tarefa, informando nome, horário e data;
- [x] O usuário deve poder adicionar uma descrição para a tarefa;
- [x] O usuário deve poder adicionar uma subcategoria para a tarefa;

# Editar tarefa
- [x] O usuário deve poder editar o nome, horário, data e descrição da tarefa;
- [x] O usuário deve poder editar a subcategoria da tarefa;
- [x] O usuário deve poder marcar uma tarefa como importante;
- [x] O usuário deve poder marcar uma tarefa como completa;
- [x] Não podem haver duas tarefas no mesma data e horário;

# Deletar Tarefa
- [x] O usuário deve poder deletar uma tarefa;

# Visualizar tarefas
- [x] O usuário deve poder visualizar as tarefas de acordo com o dia;
- [x] O usuário deve poder visualizar todas as tarefas de acordo com a subcategoria;
- [x] O usuário deve poder visualizar as tarefas feitas;
- [x] O usuário deve poder visualizar as tarefas importantes;

- [ ] Ao visualizar por subcategoria, só as tarefas não completadas devem ser retornadas;
- [x] Ao visualizar por feitas, todas as tarefas devem ser ordenadas por horário de finalização;
- [x] Ao visualizar por importância, só as tarefas não completadas devem ser retornadas;

# Criar categoria
- [x] O usuário deve poder criar uma categoria com nome; 
- [x] O nome da categoria deve ser único para o usuário; 

# Atualizar categorias
- [x] O usuário deve poder atualizar suas categorias;
- [x] O nome da categoria deve ser único para o usuário; 

# Visualizar categorias
- [x] O usuário deve poder visualizar suas categorias;

# Deletar categoria
- [x] O usuário deve poder deletar uma categoria; 
- [x] Ao deletar um categoria, suas subcategorias devem ser deletadas;

# Criar subcategoria
- [x] O usuário deve poder criar uma subcategoria com nome e categoria;
- [x] O nome da subcategoria deve ser único para cada categoria;

# Deletar subcategoria
- [x] O usuário deve poder deletar uma subcategoria;

# Visualizar subcategorias
- [x] O usuário deve poder visualizar subcategorias de acordo com a categoria;

# Recuperar senha

- [ ] O usuário deve poder recuperar sua senha informando seu e-mail;
- [ ] O usuário receberá um e-mail com um link para resetar a senha;
- [ ] O usuário deve poder resetar sua senha, informando uma nova senha e uma confirmação;

# Geral

- [ ] Cache
- [ ] Máximo de requisições

# Futuro

- [ ] Notificações