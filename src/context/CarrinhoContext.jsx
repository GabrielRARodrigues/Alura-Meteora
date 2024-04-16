import { createContext, useState } from 'react'

export const CarrinhoContext = createContext()

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([])

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some(itemDoCarrinho => {
      itemDoCarrinho.id === novoProduto.id
    })

    if (!temOProduto) {
      novoProduto.quantidade = 1

      return setCarrinho(carrinhoAnterior => [...carrinhoAnterior, novoProduto])
    }

    setCarrinho(carrinhoAnterior =>
      carrinhoAnterior.map(itemDoCarrinho => {
        if (itemDoCarrinho.id === novoProduto.id) {
          itemDoCarrinho.quantidade++
        }

        return itemDoCarrinho
      })
    )
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

    setCarrinho(carrinhoAnterior =>
      carrinhoAnterior.map(itemDoCarrinho => {
        if (itemDoCarrinho.id === idDoProduto) {
          itemDoCarrinho.quantidade--
        }

        return itemDoCarrinho
      })
    )
  }

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarProduto,
        removerProduto
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}
