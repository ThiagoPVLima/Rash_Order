        // Preços dos produtos
        const precos = {
            rashCurta: 120.0,
            rashLonga: 150.0,
            short: 100.0,
        };

        // Caminhos das imagens
        const imagens = {
            'rash-curta': {
                branca: 'imagens/curta-branca.jpg',
                cinza: 'imagens/curta-cinza.jpg',
                amarela: 'imagens/curta-amarela.jpg',
                azul: 'imagens/curta-azul.jpg',
                roxa: 'imagens/curta-roxa.jpg',
                marrom: 'imagens/curta-marrom.jpg',
                preta: 'imagens/curta-preta.jpg',
            },
            'rash-longa': {
                branca: 'imagens/longa-branca.jpg',
                cinza: 'imagens/longa-cinza.jpg',
                amarela: 'imagens/longa-amarela.jpg',
                azul: 'imagens/longa-azul.jpg',
                roxa: 'imagens/longa-roxa.jpg',
                marrom: 'imagens/longa-marrom.jpg',
                preta: 'imagens/longa-preta.jpg',
            },
            short: {
                branca: 'imagens/short-branca.jpg',
                cinza: 'imagens/short-cinza.jpg',
                amarela: 'imagens/short-amarela.jpg',
                azul: 'imagens/short-azul.jpg',
                roxa: 'imagens/short-roxa.jpg',
                marrom: 'imagens/short-marrom.jpg',
                preta: 'imagens/short-preta.jpg',
            },
        };

        // Formatar preço para exibir vírgula decimal
        function formatarPreco(valor) {
            return valor.toFixed(2).replace('.', ',');
        }

        // Atualiza a imagem de acordo com a cor selecionada
        function atualizarImagem(elementId, selectId, tipo) {
            const imagem = document.getElementById(elementId);
            const cor = document.getElementById(selectId).value;
            const caminhoImagem = imagens[tipo][cor];

            if (caminhoImagem) {
                imagem.src = caminhoImagem;
                imagem.alt = `${tipo} ${cor}`;
            } else {
                imagem.src = '';
                imagem.alt = '';
            }
            atualizarResumo();
        }

        // Função para trocar abas
        function openTab(event, tabId) {
            document.querySelectorAll('.tab-content, .tab-btn').forEach(item => {
                item.classList.remove('active');
            });

            document.getElementById(tabId).classList.add('active');
            event.currentTarget.classList.add('active');
        }

        // Botões de + e - para quantidade
        document.querySelectorAll('.btn-maior').forEach(btn => {
            btn.addEventListener('click', () => {
                const input = document.getElementById(btn.dataset.target);
                input.value = parseInt(input.value) + 1;
                atualizarResumo();
            });
        });

        document.querySelectorAll('.btn-menor').forEach(btn => {
            btn.addEventListener('click', () => {
                const input = document.getElementById(btn.dataset.target);
                input.value = Math.max(0, parseInt(input.value) - 1);
                atualizarResumo();
            });
        });

        // Atualiza o resumo do pedido
        function atualizarResumo() {
            const resumo = document.getElementById('resumo-itens');
            const totalSpan = document.getElementById('total-pedido');
            resumo.innerHTML = '';
            let total = 0;

            const produtos = [
                {
                    id: 'rash-curta',
                    nome: 'Rash Guard Manga Curta',
                    preco: precos.rashCurta,
                },
                {
                    id: 'rash-longa',
                    nome: 'Rash Guard Manga Longa',
                    preco: precos.rashLonga,
                },
                {
                    id: 'short',
                    nome: 'Short',
                    preco: precos.short,
                }
            ];

            produtos.forEach(({ id, nome, preco }) => {
                const cor = document.getElementById(`cor-${id}`).value;
                const tamanho = document.getElementById(`tamanho-${id}`).value;
                const quantidade = parseInt(document.getElementById(`quantidade-${id}`).value) || 0;

                if (quantidade > 0) {
                    const subtotal = preco * quantidade;
                    total += subtotal;

                    const item = document.createElement('div');
                    item.className = 'resumo-item';
                    item.innerHTML = `
                        <span>${nome} (${cor.toUpperCase()} - ${tamanho}) x${quantidade}</span>
                        <span>R$ ${formatarPreco(subtotal)}</span>
                    `;
                    resumo.appendChild(item);
                }
            });

            totalSpan.textContent = formatarPreco(total);
        }

        // Atualiza imagem ao trocar cor
        document.querySelectorAll('.cor-select').forEach(select => {
            select.addEventListener('change', () => {
                const tipo = select.id.replace('cor-', '');
                const imgId = tipo === 'rash-curta' ? 'rash-guard-curta'
                             : tipo === 'rash-longa' ? 'rash-guard-longa'
                             : 'short-guard';
                atualizarImagem(imgId, select.id, tipo);
            });
        });

        // Inicializar imagens no carregamento
        window.addEventListener('DOMContentLoaded', () => {
            atualizarImagem('rash-guard-curta', 'cor-rash-curta', 'rash-curta');
            atualizarImagem('rash-guard-longa', 'cor-rash-longa', 'rash-longa');
            atualizarImagem('short-guard', 'cor-short', 'short');
            atualizarResumo();
        });

        // Atualizar resumo ao digitar manualmente a quantidade
        document.querySelectorAll('.quantidade-input').forEach(input => {
            input.addEventListener('input', atualizarResumo);
        });

        // Mostrar opções de parcelas se "Cartão de Crédito" for selecionado
        document.getElementById('forma-pagamento').addEventListener('change', function () {
            const parcelas = document.getElementById('parcelamento-container');
            parcelas.style.display = this.value === 'credito' ? 'block' : 'none';
        });

        // Enviar formulário (substituir alerta por resumo na tela, se quiser)
        document.getElementById('pedidoForm').addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Pedido enviado com sucesso!');
        });