# Tanto faz o nome das pastas, o que importa são padrões e convenções


## Processos de Softwares do mundo real

### Usuário
> Twitter

- Clicamos num botão "Tweet"
- Abriu um Modal com a caixa para digitarmos um tweet
- Digitei mu tweet, para liberar o botão de envio
- Cliquei para enviar
- Aparecer uma mensagem de "Publicado com sucesso"

### Trabalho dos Devs por trás

#### Front End
- Programar a tela
    - HTML, CSS (Visual da tela)
- Ter o comportamento de escutar toda vez que o usuário digitar
    - **Validar** se tiver mais de 1 caracter, remove o atributo disabled
- Adicionar um evento que escuta quanto o botão de Tweetar foi apertado
    - Pegar o conteúdo do Tweet
    - Mandar para o servidor

#### Back End
- Vamos receber as infos do Tweet no Body da Request
- **Validar** se o tweet é um tweet valido
    - Se não for valido, retorna um erro
- Salvar o tweet no BD
    - Se não for possível, retorna um erro
- Retornar a mensagem de sucesso

### O que é comum nesses processos?
[view]
- HTML e CSS
- Resposta do backend
[controller]
- Executar funções de validação, vamos garantir que os dados estejam corretos
- enviar para a parte que "salva"
[repository]
- Responsável por PEGAR dados e ENVIAR dados

## Resumo
- Isso tudo faz link com a aula anterior de `Input -> Processamento -> Outpout`
- `Input (Usuário, FrontEnd, Serviço) -> Processamento (Controller, Repository) -> Output (Response)`
    - CRUDs