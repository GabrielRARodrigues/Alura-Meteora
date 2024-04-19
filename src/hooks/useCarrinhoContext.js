import { useContext } from 'react'

import { CarrinhoContext } from '@/context/CarrinhoContext'

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext)

  function mudarQuantidade(id, quantidade) {
    return carrinho.map(itemDoCarrinho => {
      if (itemDoCarrinho.id === id) {
        itemDoCarrinho.quantidade += quantidade
      }

      return itemDoCarrinho
    })
  }

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some(
      itemDoCarrinho => itemDoCarrinho.id === novoProduto.id
    )

    if (!temOProduto) {
      novoProduto.quantidade = 1

      return setCarrinho(carrinhoAnterior => [...carrinhoAnterior, novoProduto])
    }

    const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1)

    setCarrinho([...carrinhoAtualizado])
  }

  function removerProduto(idDoProduto) {
    const produtoASerRemovido = carrinho.find(
      itemDoCarrinho => itemDoCarrinho.id === idDoProduto
    )

    if (!produtoASerRemovido) {
      return
    }

    const ultimoProduto = produtoASerRemovido.quantidade === 1

    if (ultimoProduto) {
      return setCarrinho(carrinhoAnterior =>
        carrinhoAnterior.filter(
          itemDoCarrinho => itemDoCarrinho.id !== idDoProduto
        )
      )
    }

    const carrinhoAtualizado = mudarQuantidade(idDoProduto, -1)

    setCarrinho([...carrinhoAtualizado])
  }

  function removerProdutoCarrinho(id) {
    const produtosAtualizados = carrinho.filter(
      itemDoCarrinho => itemDoCarrinho.id !== id
    )

    setCarrinho([...produtosAtualizados])
  }

  return {
    carrinho,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho
  }
}
