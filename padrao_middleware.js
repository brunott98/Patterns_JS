//Middleware pattern (chain of responsability)

const passo1 = (ctx,next) => {     //ctx é o contexto, pode ser um objeto que sera transportado de um passo para outro
    ctx.valor1 = 'mid1'
    next()
}

const passo2 = (ctx,next) => {     
    ctx.valor2 = 'mid2'
    next()
}

const passo3 = ctx => ctx.valor3 = 'mid3'

const exec = (ctx,...middlewares) => {
    const execPasso = indice =>{
        middlewares && indice < middlewares.length &&
            middlewares[indice](ctx,()=>execPasso(indice+1))  //(ctx = {}, next = () => execPasso(indice + 1)) podemos ver a execução dessa forma
    }
    execPasso(0)
}

const ctx = {}
exec(ctx,passo1,passo2,passo3)   /*sinta-se livre para utilizar os passos em qualquer ordem, apenas tomando cuidado com o 3 passo, 
pois ele não chamará next. */

console.log(ctx)

  
/*

Verificando de uma forma mais explicita o que está implicito...

passo1 = (ctx = {}, next = () => execPasso(indice + 1)) => {
    ctx.valor = 'mid1' // resulta em: {valor1: 'mid1'}
    () => execPasso(indice + 1) // chama a passo2
}

*/