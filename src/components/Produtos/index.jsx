import { useContext } from 'react'

import { CarrinhoContext } from '@/context/CarrinhoContext'

import Produto from './Produto'
import Titulo from '@/components/Titulo'

import produtos from '@/mocks/produtos.json'

const Produtos = () => {
  const { adicionarProduto } = useContext(CarrinhoContext)

  return (
    <section role="produtos" aria-label="Produtos que estão bombando!">
      <Titulo>Produtos que estão bombando!</Titulo>
      <div className="container row mx-auto">
        {produtos.map(produto => (
          <Produto
            key={produto.id}
            {...produto}
            adicionarProduto={adicionarProduto}
          />
        ))}
      </div>
    </section>
  )
}

export default Produtos
