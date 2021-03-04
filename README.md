# Criar usuário

**O usuário deve poder criar uma conta com nome, e-mail e senha**
**O usuário deve informar uma confirmação de senha**

**O e-mail deve ser único**
**A senha dever ter no mínimo 6 caractéres e no máximo 16 caracteres**

# Atualizar usuário

**O usuário dever poder alterar seu nome, e-mail e senha**
- O usuário dever poder alterar seu avatar;

**O usuário não pode mudar e-mail para um já cadastrado**
**Ao alterar a senha, deve ser informada a senha antiga**
**Ao alterar a senha, uma confirmação da nova senha deve ser enviada**

# Login

**O usuário deve poder se logar utilizando e-mail e senha**

**O usuário deve permanceer logado por 1d**

# Criar tarefa

**O usuário deve poder criar um tarefa, informando nome, horário e data**
**O usuário deve poder adicionar uma descrição para o tarefa**
- O usuário deve poder adicionar uma subcategoria para o tarefa;

# Editar tarefa

**O usuário deve poder editar o nome, horário, data e descrição da tarefa**
- O usuário deve poder editar a subcategoria da tarefa;
**O usuário deve poder marcar uma tarefa como importante**
**O usuário deve poder marcar uma tarefa como completa**

**Não podem haver duas tarefas no mesma data e horário**

# Deletar Tarefa

**O usuário deve poder deletar uma tarefa**

# Visualizar tarefas

**O usuário deve poder visualizar as tarefas de acordo com o dia**
- O usuário deve poder visualizar todas as tarefas de acordo com a subcategoria;
**O usuário deve poder visualizar as tarefas feitas**
**O usuário deve poder visualizar as tarefas importantes**

- Ao visualizar por subcategoria, só as tarefas não completadas devem ser retornadas;
**Ao visualizar por feitas, todas as tarefas devem ser ordenadas por horário de finalização**
**Ao visualizar por importância, só as tarefas não completadas devem ser retornadas**

# Criar categoria

- O usuário deve poder criar uma categoria com nome; 

- O nome da categoria deve ser único;

# Visualizar categorias

- O usuário deve poder visualizar categorias; 

# Deletar categoria

- O usuário deve poder deletar uma categoria; 

- Ao deletar um categoria, suas subcategorias devem ser deletadas;

# Criar subcategoria

- O usuário deve poder criar uma subcategoria com nome e categoria; 

- O nome da subcategoria deve ser único;

# Deletar subcategoria

- O usuário deve poder deletar uma subcategoria; 

# Visualizar subcategorias

- O usuário deve poder visualizar subcategorias de acordo com a categoria;

# Recuperar senha

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário receberá um e-mail com um link para resetar a senha;
- O usuário deve poder resetar sua senha, informando uma nova senha e uma confirmação;

# Geral

- Cache
- Máximo de requisições

# Futuro

- Notificações