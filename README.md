# Login

**RF**

- O usuário deve poder logar utilizando e-mail e senha;

**RN**

- O usuário deve permanecer autenticado por até 3 dias;

# Alterar dados

**RF**

- O usuário deve poder mudar seu nome, e-mail e senha;

**RN**

- Caso mude a senha, o usuário deve informar a senha antiga;
- Caso mude a senha, o usuário deve confirmar a nova senha;

# Criação de tarefa

**RF**

- O usuário deve poder criar uma tarefa em um dia e mês espefífico;
- O usuário deve poder criar uma tarefa em um dia, mês e horário espefífico;
- O usuário deve poder informar se quer ou não receber notificação da tarefa;
- O usuário deve poder informar com que antecedencia quer receber a notificação da tarefa;

**RN**

- Não podem ter duas tarefas no mesmo horário;

# Alteração de tarefa

**RF**

- O usuário deve poder alterar o dia, mês e horário de um tarefa;

**RN**

- O usuário não deve poder mudar a tarefa pra um horário já ocupado;

# Deleção de tarefa

**RF**

- O usuário deve poder deletar uma tarefa;

**RN**

- Ao deletar a tarefa, suas notificações devem ser deletadas;

# Visualização de tarefa

**RF**

- O usuário deve poder visualizar suas tarefas de acordo com o dia;

**RN**

# Recuperar senha

**RF**

- O usuário deve poder recuperar a senha utilizando o e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar a senha;

**RNF**

- Usar Amazon SES para envio em produção;
- O envio deve acontecer em segundo plano;

**RN**

- O link enviado para resetar o e-mail deve expirar em 2h;
- O usuário dever confirmar sua senha ao resetar;

# Geral

- Utilizar cache para guardas as tarefas de um usuário;
- Resetar o cache quando uma nova tarefa ser criada;
- Limitar a quantidade de requisições por segundo;

# Futuro

- Notificações